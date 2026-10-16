import { NextResponse } from "next/server";
import { db } from "@/db";
import { documents, documentLines, items, parties, stockLedger, vouchers, voucherLines } from "@/db/schema";
import { eq, and, desc, inArray, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO } from "@/lib/utils";
import { nextDocNo, computeTotals, postStock, postFinancialVoucher, deleteDocumentCascade, audit, round2 } from "@/lib/posting";
import { getTaxSettings, aitRateFor, computeInvoiceTax, validateNTN, validateSTRN, type AitSection, type FilerStatus } from "@/lib/tax";
import { getFbrSettings } from "@/lib/fbr";
import { syncDocument } from "@/app/api/fbr/route";
import { scopedWhere, resolveWriteScope, type ScopedUser } from "@/lib/scope";

const STOCK_DIR: Record<string, "in" | "out" | "none"> = {
  QUOT: "none", SO: "none", SINV: "out", POS: "out", PO: "none", PINV: "in", SRET: "in", PRET: "out", ADJ: "in",
};
const SALES_SIDE = ["QUOT", "SO", "SINV", "POS", "SRET"];
const FBR_TYPES = ["SINV", "POS", "SRET"];

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const docType = url.searchParams.get("type") ?? "";
  const id = url.searchParams.get("id");
  const partyId = url.searchParams.get("partyId");
  const scope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
  if (id) {
    const d = await db.select().from(documents).where(and(eq(documents.id, Number(id)), scope));
    if (!d[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const lines = await db.select().from(documentLines).where(eq(documentLines.documentId, Number(id)));
    return NextResponse.json({ document: d[0], lines });
  }
  const conds = [];
  if (scope) conds.push(scope);
  if (docType) {
    if (docType.includes(",")) conds.push(inArray(documents.docType, docType.split(",")));
    else conds.push(eq(documents.docType, docType));
  }
  if (partyId) conds.push(eq(documents.partyId, Number(partyId)));
  const rows = await db.select().from(documents).where(conds.length ? and(...conds) : undefined).orderBy(desc(documents.date), desc(documents.id)).limit(300);
  return NextResponse.json({ documents: rows });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();

  // Convert action: QUOT->SINV, SO->SINV, PO->PINV
  if (body.action === "convert") {
    const srcId = Number(body.id);
    const target = String(body.target);
    const viewScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
    const src = await db.select().from(documents).where(and(eq(documents.id, srcId), viewScope));
    if (!src[0]) return NextResponse.json({ error: "Source not found in your selected company/branch" }, { status: 404 });
    const writeScope = await resolveWriteScope(user as ScopedUser, src[0].companyId, src[0].branchId);
    const srcLines = await db.select().from(documentLines).where(eq(documentLines.documentId, srcId));
    const date = todayISO();
    const docNo = await nextDocNo(target, date);
    const dRows = await db.insert(documents).values({
      docType: target, docNo, date,
      partyId: src[0].partyId, warehouseId: src[0].warehouseId, salesmanId: src[0].salesmanId,
      currencyId: src[0].currencyId, exchangeRate: src[0].exchangeRate,
      subtotal: src[0].subtotal, discountPct: src[0].discountPct, discountLumpsum: src[0].discountLumpsum,
      salesTax: src[0].salesTax, salesTaxRate: src[0].salesTaxRate,
      furtherTax: src[0].furtherTax, furtherTaxRate: src[0].furtherTaxRate,
      incomeTax: src[0].incomeTax, aitRate: src[0].aitRate, aitAmount: src[0].aitAmount,
      aitSection: src[0].aitSection, buyerFilerStatus: src[0].buyerFilerStatus,
      transportCharges: src[0].transportCharges, laborCharges: src[0].laborCharges,
      grandTotal: src[0].grandTotal, paidAmount: "0", paymentMode: "credit",
      status: target === "SO" || target === "PO" ? "Open" : "Posted",
      fbrStatus: "not_synced",
       convertedFromId: srcId, companyId: writeScope.companyId, branchId: writeScope.branchId, createdBy: user.id,
       notes: `Converted from ${src[0].docType} ${src[0].docNo}`,
    }).returning();
    const newDoc = dRows[0];
    const plines = [];
    for (const l of srcLines) {
      await db.insert(documentLines).values({
        documentId: newDoc.id, itemId: l.itemId, description: l.description, qty: l.qty,
        unit: l.unit, rate: l.rate, discountPct: l.discountPct, discountAmt: l.discountAmt, amount: l.amount,
        returnCondition: l.returnCondition ?? "normal",
      });
      plines.push({ itemId: l.itemId, qty: num(l.qty), rate: num(l.rate), returnCondition: l.returnCondition ?? "normal" });
    }
    const dir = STOCK_DIR[target] ?? "none";
    await postStock(newDoc.id, target, date, newDoc.warehouseId, plines, dir, `${target} ${docNo}`, writeScope.companyId, writeScope.branchId);
    await postFinancialVoucher({
      docId: newDoc.id, docType: target, docNo, date, partyId: newDoc.partyId,
      grandTotal: num(newDoc.grandTotal), paidAmount: 0, paymentMode: "credit",
      salesTax: num(newDoc.salesTax), furtherTax: num(newDoc.furtherTax), aitAmount: num(newDoc.aitAmount),
      createdBy: user.id, companyId: writeScope.companyId, branchId: writeScope.branchId, currencyId: newDoc.currencyId,
    });
    await db.update(documents).set({ status: "Invoiced" }).where(eq(documents.id, srcId));
    await audit(user.id, user.username, "create", "documents", String(newDoc.id), { convertedFrom: srcId, target });
    return NextResponse.json({ document: newDoc });
  }

  if (body.action === "status") {
    const sVal = String(body.status);
    const docId = Number(body.id);
    const statusScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
    const docRows = await db.select().from(documents).where(and(eq(documents.id, docId), statusScope)).limit(1);
    if (!docRows[0]) return NextResponse.json({ error: "Document not found in your selected company/branch" }, { status: 404 });
    if (docRows[0] && sVal === "Cancelled") {
      if (docRows[0].fbrStatus === "synced") {
        return NextResponse.json({ error: "Synced FBR invoices cannot be cancelled. Issue a Sales Return instead." }, { status: 400 });
      }
      // Cancel stocks & vouchers
      await db.delete(stockLedger).where(eq(stockLedger.documentId, docId));
      await db.update(vouchers).set({ status: "Cancelled", narration: sql`concat('CANCELLED - ', narration)` }).where(eq(vouchers.documentId, docId));
    }
    await db.update(documents).set({ status: sVal }).where(eq(documents.id, docId));
    await audit(user.id, user.username, "update-status", "documents", String(docId), { status: sVal });
    return NextResponse.json({ ok: true });
  }

  // ---------- Create document (PK tax computed server-side) ----------
  const h = body.header ?? {};
  const docType = String(h.docType || body.docType);
  const date = String(h.date || todayISO());
  let writeScope;
  try { writeScope = await resolveWriteScope(user as ScopedUser, h.companyId ? Number(h.companyId) : undefined, h.branchId ? Number(h.branchId) : undefined); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid company/branch scope" }, { status: 400 }); }
  const rawLines = (body.lines ?? []) as Array<{ itemId?: number | null; description?: string; qty: number; unit?: string; rate: number; discountPct?: number; returnCondition?: string; itemType?: string; taxExempt?: boolean; salesTaxRate?: number | string; furtherTaxRate?: number | string; aitSection?: string; aitRate?: number | string }>;
  if (!rawLines.length) return NextResponse.json({ error: "Add at least one line item" }, { status: 400 });

  const partyId = h.partyId ? Number(h.partyId) : null;
  const pRows = partyId ? await db.select().from(parties).where(eq(parties.id, partyId)).limit(1) : [];
  const party = pRows[0] ?? null;

  // Validate the return's linked invoice so users get a clear message, not a 500
  const linkedInvoiceId = h.linkedInvoiceId ? Number(h.linkedInvoiceId) : null;
  if (linkedInvoiceId) {
    const linkedScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
    const li = await db.select({ id: documents.id, docType: documents.docType }).from(documents).where(and(eq(documents.id, linkedInvoiceId), linkedScope)).limit(1);
    if (!li[0]) return NextResponse.json({ error: `Linked invoice #${linkedInvoiceId} does not exist. Clear the "Link to Invoice" field or pick a valid one.` }, { status: 400 });
    const allowed = (docType === "SRET" && ["SINV", "POS"].includes(li[0].docType)) || (docType === "PRET" && li[0].docType === "PINV");
    if (!allowed) return NextResponse.json({ error: `A ${docType} can only be linked to ${docType === "SRET" ? "a Sales Invoice (SINV/POS)" : "a Purchase Invoice (PINV)"}.` }, { status: 400 });
  }

  const tax = await getTaxSettings();
  const fbr = await getFbrSettings();

  // ---- LINE-LEVEL PK tax: each line carries its own type & rates (goods vs services) ----
  const normLines = rawLines.map((l) => ({
    ...l,
    itemType: (l as { itemType?: string }).itemType === "services" ? "services" : "goods",
    taxExempt: (l as { taxExempt?: boolean }).taxExempt === true,
  }));

  if (tax.strictValidation && SALES_SIDE.includes(docType) && normLines.some((l) => !l.taxExempt && num(l.qty) * num(l.rate) > 0)) {
    if (!validateNTN(fbr.ntn)) return NextResponse.json({ error: "Strict tax mode: seller NTN is invalid. Fix it in Settings → FBR before posting taxable invoices." }, { status: 400 });
    if (!validateSTRN(fbr.strn)) return NextResponse.json({ error: "Strict tax mode: seller STRN is invalid. Fix it in Settings → FBR before posting taxable invoices." }, { status: 400 });
  }

  const globalRate = h.salesTaxRate !== undefined && h.salesTaxRate !== "" ? num(h.salesTaxRate) : num(tax.salesTaxRate);
  const filer = ((h.buyerFilerStatus ?? party?.filerStatus ?? "non_filer") as FilerStatus);
  const first = computeTotals(normLines, {
    discountPct: h.discountPct, discountLumpsum: h.discountLumpsum,
    defaultSalesTaxRate: globalRate,
    buyerRegistered: !!party?.salesTaxRegistered,
    chargeFurtherTax: tax.enableFurtherTax && (h.chargeFurtherTax ?? true) && SALES_SIDE.includes(docType),
    furtherTaxRate: num(tax.furtherTaxRate),
    enableAit: tax.enableAit,
    defaultAitSection: (h.aitSection ?? tax.defaultAitSection ?? "goods"),
    buyerFiler: filer,
    aitGoodsFiler: tax.aitGoodsFiler, aitGoodsLate: tax.aitGoodsLate, aitGoodsNon: tax.aitGoodsNon,
    aitServicesFiler: tax.aitServicesFiler, aitServicesLate: tax.aitServicesLate, aitServicesNon: tax.aitServicesNon,
    aitContractFiler: tax.aitContractFiler, aitContractLate: tax.aitContractLate, aitContractNon: tax.aitContractNon,
    transport: h.transportCharges, labor: h.laborCharges,
  });
  const lines = first.lines;
  const salesTax = first.salesTax;
  const furtherTax = first.furtherTax;
  const grandTotal = first.grandTotal;
  const aitAmount = first.aitAmount;
  const netPayable = first.netPayable;
  const aitSection = (lines.some((l) => l.aitSection !== "none") ? (lines.find((l) => l.aitSection !== "none")!.aitSection) : "none") as AitSection;
  const aitRate = first.subtotal ? round2((aitAmount / first.subtotal) * 100) : 0;

  const docNo = await nextDocNo(docType, date);
  const dRows = await db.insert(documents).values({
    docType, docNo, date,
    partyId,
    warehouseId: h.warehouseId ? Number(h.warehouseId) : null,
    salesmanId: h.salesmanId ? Number(h.salesmanId) : null,
    currencyId: h.currencyId ? Number(h.currencyId) : null,
    exchangeRate: String(h.exchangeRate ?? 1),
    subtotal: String(first.subtotal), discountPct: String(h.discountPct ?? 0),
    discountLumpsum: String(h.discountLumpsum ?? 0),
    salesTax: String(salesTax), salesTaxRate: String(globalRate),
    furtherTax: String(furtherTax),
    furtherTaxRate: String(furtherTax > 0 ? num(tax.furtherTaxRate) : 0),
    incomeTax: String(aitAmount),
    aitRate: String(aitRate), aitAmount: String(aitAmount),
    aitSection, buyerFilerStatus: filer,
    transportCharges: String(h.transportCharges ?? 0), laborCharges: String(h.laborCharges ?? 0),
    grandTotal: String(grandTotal), paidAmount: String(h.paidAmount ?? 0),
    paymentMode: h.paymentMode || "credit",
    status: h.status || (docType === "SO" || docType === "PO" ? "Open" : "Posted"),
    fbrStatus: FBR_TYPES.includes(docType) ? "not_synced" : "not_required",
    validUntil: h.validUntil || null, notes: h.notes || null,
    documents: h.documents || null,
    linkedInvoiceId,
    walkinName: h.walkinName || null, walkinContact: h.walkinContact || null,
    walkinPhone: h.walkinPhone || null, walkinAddress: h.walkinAddress || null, walkinCity: h.walkinCity || null,
    companyId: writeScope.companyId, branchId: writeScope.branchId, createdBy: user.id,
  }).returning();
  const doc = dRows[0];
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    const rawL = rawLines[idx];
    let desc = l.description || "";
    if (l.itemId) {
      const it = await db.select().from(items).where(eq(items.id, Number(l.itemId))).limit(1);
      if (it[0] && !desc) desc = it[0].name;
    }
    await db.insert(documentLines).values({
      documentId: doc.id, itemId: l.itemId ? Number(l.itemId) : null,
      description: desc || null, qty: String(l.qty), unit: l.unit || "PCS",
      rate: String(l.rate), discountPct: String(l.discountPct ?? 0),
      discountAmt: String(l.discountAmt), amount: String(l.amount),
      returnCondition: rawL?.returnCondition || "normal",
      itemType: l.itemType, salesTaxRate: String(l.salesTaxRate), salesTax: String(l.salesTax),
      furtherTaxRate: String(l.furtherTaxRate), furtherTax: String(l.furtherTax),
      taxExempt: l.taxExempt,
      aitSection: l.aitSection, aitRate: String(l.aitRate), aitAmount: String(l.aitAmount),
    });
  }
  const dir = STOCK_DIR[docType] ?? "none";
  await postStock(doc.id, docType, date, doc.warehouseId, lines.map((l, idx) => ({ itemId: l.itemId ? Number(l.itemId) : null, qty: num(l.qty), rate: num(l.rate), returnCondition: rawLines[idx]?.returnCondition || "normal" })), dir, `${docType} ${docNo}`, writeScope.companyId, writeScope.branchId);
  await postFinancialVoucher({
    docId: doc.id, docType, docNo, date, partyId: doc.partyId,
    grandTotal, paidAmount: num(h.paidAmount), paymentMode: doc.paymentMode,
    salesTax, furtherTax, aitAmount,
    createdBy: user.id, companyId: writeScope.companyId, branchId: writeScope.branchId, currencyId: doc.currencyId,
  });
  await audit(user.id, user.username, "create", "documents", String(doc.id), { docType, docNo, grandTotal, salesTax, furtherTax, ait: aitAmount });

  // Auto-sync to FBR
  let fbrResult: unknown = null;
  if (FBR_TYPES.includes(docType) && fbr.autoSync) {
    try {
      fbrResult = await syncDocument(doc.id, user);
    } catch (e) {
      fbrResult = { ok: false, errors: [e instanceof Error ? e.message : "FBR auto-sync failed"] };
    }
    const refreshed = await db.select().from(documents).where(eq(documents.id, doc.id)).limit(1);
    if (refreshed[0]) return NextResponse.json({ document: refreshed[0], netPayable, fbr: fbrResult });
  }
  return NextResponse.json({ document: doc, netPayable, fbr: fbrResult });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const body = await req.json();
  const url = new URL(req.url);
  const id = Number(body.id ?? url.searchParams.get("id"));

  const docRows = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
  const oldDoc = docRows[0];
  if (!oldDoc) return NextResponse.json({ error: "Document not found" }, { status: 404 });
  const editScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
  const scopedOld = await db.select({ id: documents.id }).from(documents).where(and(eq(documents.id, id), editScope)).limit(1);
  if (!scopedOld[0]) return NextResponse.json({ error: "Document not found in your selected company/branch" }, { status: 404 });
  const writeScope = { companyId: oldDoc.companyId ?? (user as ScopedUser).companyId!, branchId: oldDoc.branchId ?? (user as ScopedUser).branchId! };
  if (oldDoc.fbrStatus === "synced") {
    return NextResponse.json({ error: "FBR-synced invoice cannot be edited (fiscal record). Issue a Sales Return instead." }, { status: 400 });
  }

  // Handle Cancel action via PUT
  if (body.action === "cancel") {
    await db.delete(stockLedger).where(eq(stockLedger.documentId, id));
    await db.update(vouchers).set({ status: "Cancelled", narration: sql`concat('CANCELLED - ', narration)` }).where(eq(vouchers.documentId, id));
    await db.update(documents).set({ status: "Cancelled" }).where(eq(documents.id, id));
    await audit(user.id, user.username, "cancel", "documents", String(id), {});
    return NextResponse.json({ ok: true });
  }

  // Normal Edit:
  const h = body.header ?? {};
  const docType = oldDoc.docType;
  const date = String(h.date || oldDoc.date || todayISO());
  const rawLines = (body.lines ?? []) as Array<{ itemId?: number | null; description?: string; qty: number; unit?: string; rate: number; discountPct?: number; returnCondition?: string; itemType?: string; taxExempt?: boolean; salesTaxRate?: number | string; furtherTaxRate?: number | string; aitSection?: string; aitRate?: number | string }>;
  if (!rawLines.length) return NextResponse.json({ error: "Add at least one line item" }, { status: 400 });

  const partyId = h.partyId ? Number(h.partyId) : null;
  const pRows = partyId ? await db.select().from(parties).where(eq(parties.id, partyId)).limit(1) : [];
  const party = pRows[0] ?? null;

  const linkedInvoiceId = h.linkedInvoiceId ? Number(h.linkedInvoiceId) : null;
  if (linkedInvoiceId) {
    const linkedScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
    const li = await db.select({ id: documents.id, docType: documents.docType }).from(documents).where(and(eq(documents.id, linkedInvoiceId), linkedScope)).limit(1);
    if (!li[0]) return NextResponse.json({ error: `Linked invoice #${linkedInvoiceId} does not exist.` }, { status: 400 });
  }

  const tax = await getTaxSettings();
  const fbr = await getFbrSettings();

  // ---- LINE-LEVEL PK tax (each line may be goods or services with its own rates) ----
  const normLines = rawLines.map((l) => ({
    ...l,
    itemType: (l as { itemType?: string }).itemType === "services" ? "services" : "goods",
    taxExempt: (l as { taxExempt?: boolean }).taxExempt === true,
  }));

  if (tax.strictValidation && SALES_SIDE.includes(docType) && normLines.some((l) => !l.taxExempt && num(l.qty) * num(l.rate) > 0)) {
    if (!validateNTN(fbr.ntn)) return NextResponse.json({ error: "Strict tax mode: seller NTN is invalid." }, { status: 400 });
    if (!validateSTRN(fbr.strn)) return NextResponse.json({ error: "Strict tax mode: seller STRN is invalid." }, { status: 400 });
  }

  const globalRate = h.salesTaxRate !== undefined && h.salesTaxRate !== "" ? num(h.salesTaxRate) : num(tax.salesTaxRate);
  const filer = ((h.buyerFilerStatus ?? party?.filerStatus ?? "non_filer") as FilerStatus);
  const first = computeTotals(normLines, {
    discountPct: h.discountPct, discountLumpsum: h.discountLumpsum,
    defaultSalesTaxRate: globalRate,
    buyerRegistered: !!party?.salesTaxRegistered,
    chargeFurtherTax: tax.enableFurtherTax && (h.chargeFurtherTax ?? true) && SALES_SIDE.includes(docType),
    furtherTaxRate: num(tax.furtherTaxRate),
    enableAit: tax.enableAit,
    defaultAitSection: (h.aitSection ?? tax.defaultAitSection ?? "goods"),
    buyerFiler: filer,
    aitGoodsFiler: tax.aitGoodsFiler, aitGoodsLate: tax.aitGoodsLate, aitGoodsNon: tax.aitGoodsNon,
    aitServicesFiler: tax.aitServicesFiler, aitServicesLate: tax.aitServicesLate, aitServicesNon: tax.aitServicesNon,
    aitContractFiler: tax.aitContractFiler, aitContractLate: tax.aitContractLate, aitContractNon: tax.aitContractNon,
    transport: h.transportCharges, labor: h.laborCharges,
  });
  const lines = first.lines;
  const salesTax = first.salesTax;
  const furtherTax = first.furtherTax;
  const grandTotal = first.grandTotal;
  const aitAmount = first.aitAmount;
  const aitSection = (lines.some((l) => l.aitSection !== "none") ? (lines.find((l) => l.aitSection !== "none")!.aitSection) : "none") as AitSection;
  const aitRate = first.subtotal ? round2((aitAmount / first.subtotal) * 100) : 0;

  // Revert/Delete old lines, stock ledger & vouchers
  await db.delete(stockLedger).where(eq(stockLedger.documentId, id));
  const oldVchs = await db.select().from(vouchers).where(eq(vouchers.documentId, id));
  for (const v of oldVchs) {
    await db.delete(voucherLines).where(eq(voucherLines.voucherId, v.id));
    await db.delete(vouchers).where(eq(vouchers.id, v.id));
  }
  await db.delete(documentLines).where(eq(documentLines.documentId, id));

  // Update document
  await db.update(documents).set({
    date,
    partyId,
    warehouseId: h.warehouseId ? Number(h.warehouseId) : null,
    salesmanId: h.salesmanId ? Number(h.salesmanId) : null,
    currencyId: h.currencyId ? Number(h.currencyId) : null,
    exchangeRate: String(h.exchangeRate ?? 1),
    subtotal: String(first.subtotal), discountPct: String(h.discountPct ?? 0),
    discountLumpsum: String(h.discountLumpsum ?? 0),
    salesTax: String(salesTax), salesTaxRate: String(globalRate),
    furtherTax: String(furtherTax),
    furtherTaxRate: String(furtherTax > 0 ? num(tax.furtherTaxRate) : 0),
    incomeTax: String(aitAmount),
    aitRate: String(aitRate), aitAmount: String(aitAmount),
    aitSection, buyerFilerStatus: filer,
    transportCharges: String(h.transportCharges ?? 0), laborCharges: String(h.laborCharges ?? 0),
    grandTotal: String(grandTotal), paidAmount: String(h.paidAmount ?? 0),
    paymentMode: h.paymentMode || "credit",
    status: h.status || oldDoc.status,
    validUntil: h.validUntil || null, notes: h.notes || null,
    documents: h.documents || null,
    linkedInvoiceId,
    walkinName: h.walkinName !== undefined ? (h.walkinName || null) : oldDoc.walkinName,
    walkinContact: h.walkinContact !== undefined ? (h.walkinContact || null) : oldDoc.walkinContact,
    walkinPhone: h.walkinPhone !== undefined ? (h.walkinPhone || null) : oldDoc.walkinPhone,
    walkinAddress: h.walkinAddress !== undefined ? (h.walkinAddress || null) : oldDoc.walkinAddress,
    walkinCity: h.walkinCity !== undefined ? (h.walkinCity || null) : oldDoc.walkinCity,
    companyId: writeScope.companyId, branchId: writeScope.branchId, updatedAt: new Date(),
  }).where(eq(documents.id, id));

  // Insert new lines
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    const rawL = rawLines[idx];
    let desc = l.description || "";
    if (l.itemId) {
      const it = await db.select().from(items).where(eq(items.id, Number(l.itemId))).limit(1);
      if (it[0] && !desc) desc = it[0].name;
    }
    await db.insert(documentLines).values({
      documentId: id, itemId: l.itemId ? Number(l.itemId) : null,
      description: desc || null, qty: String(l.qty), unit: l.unit || "PCS",
      rate: String(l.rate), discountPct: String(l.discountPct ?? 0),
      discountAmt: String(l.discountAmt), amount: String(l.amount),
      returnCondition: rawL?.returnCondition || "normal",
      itemType: l.itemType, salesTaxRate: String(l.salesTaxRate), salesTax: String(l.salesTax),
      furtherTaxRate: String(l.furtherTaxRate), furtherTax: String(l.furtherTax),
      taxExempt: l.taxExempt,
      aitSection: l.aitSection, aitRate: String(l.aitRate), aitAmount: String(l.aitAmount),
    });
  }

  // Re-post stock ledger + financial vouchers
  const dir = STOCK_DIR[docType] ?? "none";
  await postStock(id, docType, date, h.warehouseId ? Number(h.warehouseId) : null, lines.map((l, idx) => ({ itemId: l.itemId ? Number(l.itemId) : null, qty: num(l.qty), rate: num(l.rate), returnCondition: rawLines[idx]?.returnCondition || "normal" })), dir, `${docType} ${oldDoc.docNo}`, writeScope.companyId, writeScope.branchId);
  await postFinancialVoucher({
    docId: id, docType, docNo: oldDoc.docNo, date, partyId,
    grandTotal, paidAmount: num(h.paidAmount), paymentMode: h.paymentMode || "credit",
    salesTax, furtherTax, aitAmount,
    createdBy: user.id, companyId: writeScope.companyId, branchId: writeScope.branchId, currencyId: oldDoc.currencyId,
  });

  await audit(user.id, user.username, "update", "documents", String(id), { docNo: oldDoc.docNo });
  return NextResponse.json({ ok: true, grandTotal });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const deleteScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
  const rows = await db.select().from(documents).where(and(eq(documents.id, id), deleteScope)).limit(1);
  if (!rows[0]) return NextResponse.json({ error: "Document not found in your selected company/branch" }, { status: 404 });
  if (rows[0]?.fbrStatus === "synced") {
    return NextResponse.json({ error: "FBR-synced invoice cannot be deleted (fiscal record). Issue a Sales Return (credit note) instead." }, { status: 400 });
  }
  await deleteDocumentCascade(id);
  await audit(user.id, user.username, "delete", "documents", String(id), {});
  return NextResponse.json({ ok: true });
}
