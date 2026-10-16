import { db } from "@/db";
import { documents, documentLines, stockLedger, vouchers, voucherLines, accounts, sequences, auditLog, items, fbrLogs } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { num, periodOf, docNoFor, DOC_PREFIX, VOUCHER_PREFIX } from "@/lib/utils";
import { aitRateFor } from "@/lib/tax";

/** Fallback when the sequence table drifts from real data (restore / manual edit):
 *  recover the highest existing number for this prefix+period so numbering never collides. */
async function recoverNextNo(table: "documents" | "vouchers", prefix: string, period: string): Promise<number> {
  const col = table === "documents" ? documents.docNo : vouchers.voucherNo;
  const rows = await db
    .select({ no: col })
    .from(table === "documents" ? documents : vouchers)
    .where(sql`${col} like ${prefix + "-" + period + "-%"}`);
  let max = 0;
  for (const r of rows) {
    const tail = Number(String(r.no).split("-").pop());
    if (Number.isFinite(tail) && tail > max) max = tail;
  }
  return max + 1;
}

async function allocateNo(table: "documents" | "vouchers", prefix: string, dateStr: string): Promise<string> {
  const period = periodOf(dateStr);
  const seqRows = await db.select().from(sequences).where(and(eq(sequences.prefix, prefix), eq(sequences.period, period)));
  let candidate: number;
  if (!seqRows[0]) {
    candidate = await recoverNextNo(table, prefix, period);
    await db.insert(sequences).values({ prefix, period, lastNo: candidate });
  } else {
    candidate = seqRows[0].lastNo + 1;
    await db.update(sequences).set({ lastNo: candidate }).where(eq(sequences.id, seqRows[0].id));
  }
  const no = docNoFor(prefix, dateStr, candidate);
  const col = table === "documents" ? documents.docNo : vouchers.voucherNo;
  const clash = await db.select({ id: col }).from(table === "documents" ? documents : vouchers).where(eq(col, no)).limit(1);
  if (clash[0]) {
    candidate = await recoverNextNo(table, prefix, period);
    if (seqRows[0]) await db.update(sequences).set({ lastNo: candidate }).where(eq(sequences.id, seqRows[0].id));
    return docNoFor(prefix, dateStr, candidate);
  }
  return no;
}

export async function nextDocNo(docType: string, dateStr: string): Promise<string> {
  const prefix = DOC_PREFIX[docType] ?? docType;
  return allocateNo("documents", prefix, dateStr);
}

export async function nextVoucherNo(vType: string, dateStr: string): Promise<string> {
  const prefix = VOUCHER_PREFIX[vType] ?? vType;
  return allocateNo("vouchers", prefix, dateStr);
}

export async function accountIdByCode(code: string): Promise<number | null> {
  const rows = await db.select().from(accounts).where(eq(accounts.code, code)).limit(1);
  return rows[0]?.id ?? null;
}

export type DocLineInput = {
  itemId?: number | null; description?: string; qty: number; unit?: string; rate: number;
  discountPct?: number; returnCondition?: string;
  itemType?: string; taxExempt?: boolean; salesTaxRate?: number | string; furtherTaxRate?: number | string;
  aitSection?: string; aitRate?: number | string;
};

/** A single line's own tax + its own AIT withholding (goods vs services vs contract). */
export function computeLineTax(l: DocLineInput, opts: {
  defaultRate: number; buyerRegistered: boolean; chargeFurtherTax: boolean; furtherRate: number;
  enableAit: boolean; defaultAitSection: string; buyerFiler: string;
  aitGoodsFiler: number | string; aitGoodsLate: number | string; aitGoodsNon: number | string;
  aitServicesFiler: number | string; aitServicesLate: number | string; aitServicesNon: number | string;
  aitContractFiler: number | string; aitContractLate: number | string; aitContractNon: number | string;
}) {
  const gross = num(l.qty) * num(l.rate);
  const dPct = num(l.discountPct);
  const discountAmt = round2((gross * dPct) / 100);
  const taxable = round2(gross - discountAmt);
  const exempt = l.taxExempt === true;
  const stRate = exempt ? 0 : Math.max(0, num(l.salesTaxRate ?? opts.defaultRate));
  const salesTax = round2((taxable * stRate) / 100);
  // Further tax u/s 3(1A) — supplies to unregistered persons, on the tax-inclusive value
  const applyFt = opts.chargeFurtherTax && !opts.buyerRegistered && !exempt && taxable > 0;
  const ftRate = applyFt ? Math.max(0, num(l.furtherTaxRate ?? opts.furtherRate)) : 0;
  const furtherTax = round2(((taxable + salesTax) * ftRate) / 100);

  // AIT u/s 153 withholding — resolved per line
  const rawSection = (l as { aitSection?: string }).aitSection;
  const section = (!opts.enableAit || rawSection === "none") ? "none"
    : (rawSection && ["goods", "services", "contract"].includes(rawSection) ? rawSection
      : (["goods", "services", "contract"].includes(opts.defaultAitSection) ? opts.defaultAitSection : "none"));
  const rawRate = (l as { aitRate?: number | string }).aitRate;
  const filer = opts.buyerFiler;
  const resolved = section === "goods"
    ? (filer === "filer" ? num(opts.aitGoodsFiler) : filer === "late_filer" ? num(opts.aitGoodsLate) : num(opts.aitGoodsNon))
    : section === "services"
      ? (filer === "filer" ? num(opts.aitServicesFiler) : filer === "late_filer" ? num(opts.aitServicesLate) : num(opts.aitServicesNon))
      : (filer === "filer" ? num(opts.aitContractFiler) : filer === "late_filer" ? num(opts.aitContractLate) : num(opts.aitContractNon));
  const aitRate = section === "none" ? 0
    : (rawRate !== undefined && rawRate !== null && rawRate !== "" ? num(rawRate) : resolved);
  const aitAmount = round2((taxable * aitRate) / 100);

  return {
    discountAmt, amount: taxable, itemType: l.itemType === "services" ? "services" : "goods",
    salesTaxRate: stRate, salesTax, furtherTaxRate: ftRate, furtherTax, taxExempt: exempt,
    aitSection: section as string, aitRate, aitAmount,
    lineTotal: round2(taxable + salesTax + furtherTax),
  };
}

/** PK-compliant invoice totals computed from LINE-level taxes + per-line AIT. */
export function computeTotals(lines: DocLineInput[], opts: {
  discountPct?: number; discountLumpsum?: number;
  defaultSalesTaxRate?: number; buyerRegistered?: boolean; chargeFurtherTax?: boolean; furtherTaxRate?: number;
  enableAit?: boolean; defaultAitSection?: string; buyerFiler?: string;
  aitGoodsFiler?: number | string; aitGoodsLate?: number | string; aitGoodsNon?: number | string;
  aitServicesFiler?: number | string; aitServicesLate?: number | string; aitServicesNon?: number | string;
  aitContractFiler?: number | string; aitContractLate?: number | string; aitContractNon?: number | string;
  transport?: number; labor?: number;
}) {
  const ctx = {
    defaultRate: num(opts.defaultSalesTaxRate ?? 18),
    buyerRegistered: !!opts.buyerRegistered,
    chargeFurtherTax: opts.chargeFurtherTax !== false,
    furtherRate: num(opts.furtherTaxRate ?? 4),
    enableAit: opts.enableAit !== false,
    defaultAitSection: opts.defaultAitSection ?? "goods",
    buyerFiler: opts.buyerFiler ?? "non_filer",
    aitGoodsFiler: opts.aitGoodsFiler ?? 0, aitGoodsLate: opts.aitGoodsLate ?? 0, aitGoodsNon: opts.aitGoodsNon ?? 0,
    aitServicesFiler: opts.aitServicesFiler ?? 0, aitServicesLate: opts.aitServicesLate ?? 0, aitServicesNon: opts.aitServicesNon ?? 0,
    aitContractFiler: opts.aitContractFiler ?? 0, aitContractLate: opts.aitContractLate ?? 0, aitContractNon: opts.aitContractNon ?? 0,
  };
  let subtotal = 0, salesTax = 0, furtherTax = 0, aitAmount = 0;
  const computed = lines.map((l) => {
    const t = computeLineTax(l, ctx);
    subtotal += t.amount;
    salesTax += t.salesTax;
    furtherTax += t.furtherTax;
    aitAmount += t.aitAmount;
    return { ...l, ...t };
  });
  const dPct = num(opts.discountPct);
  const afterPct = subtotal - (subtotal * dPct) / 100;
  const grand = afterPct - num(opts.discountLumpsum) + round2(salesTax) + round2(furtherTax) + num(opts.transport) + num(opts.labor);
  return {
    lines: computed,
    subtotal: round2(subtotal),
    salesTax: round2(salesTax),
    furtherTax: round2(furtherTax),
    aitAmount: round2(aitAmount),
    netPayable: round2(Math.max(0, round2(grand) - round2(aitAmount))),
    grandTotal: round2(Math.max(0, grand)),
  };
}

export function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export async function audit(userId: number | null, username: string | null, action: string, tableName: string, recordId: string, payload: unknown) {
  try {
    await db.insert(auditLog).values({ userId, username, action, tableName, recordId, payload: payload as never });
  } catch { /* ignore */ }
}

/** Post inventory movements for a document. direction: 'out' reduces stock, 'in' adds stock, 'none' skips. */
export async function postStock(
  docId: number,
  docType: string,
  dateStr: string,
  warehouseId: number | null,
  lines: Array<{ itemId?: number | null; qty: number; rate: number; returnCondition?: string }>,
  direction: "in" | "out" | "none",
  narration: string,
  companyId: number | null = null,
  branchId: number | null = null
) {
  if (direction === "none") return;
  for (const l of lines) {
    if (!l.itemId) continue;
    
    // Damaged/broken sales returns ARE recorded at their real quantity so the ledger and the
    // damaged/broken report stay visible, but stockMap() excludes them from SALEABLE stock
    // (normal → back on the shelf, damaged → returnable to vendor, broken → written off as loss).
    const isLoss = docType === "SRET" && (l.returnCondition === "damaged" || l.returnCondition === "broken");
    const finalQtyIn = direction === "in" ? String(l.qty) : "0";

    await db.insert(stockLedger).values({
      date: dateStr,
      itemId: l.itemId,
      warehouseId,
      companyId,
      branchId,
      qtyIn: finalQtyIn,
      qtyOut: direction === "out" ? String(l.qty) : "0",
      rate: String(l.rate),
      docType,
      documentId: docId,
      returnCondition: l.returnCondition ?? "normal",
      narration,
    });
  }
}

/** Auto-post double-entry voucher for sales/purchase docs (PK tax-aware). */
export async function postFinancialVoucher(opts: {
  docId: number; docType: string; docNo: string; date: string; partyId: number | null;
  grandTotal: number; paidAmount: number; paymentMode: string; salesTax: number;
  furtherTax?: number; aitAmount?: number;
  createdBy: number | null; companyId: number | null; branchId?: number | null; currencyId: number | null;
}) {
  const { docId, docType, docNo, date, partyId, grandTotal, createdBy, companyId, currencyId } = opts;
  const branchId = opts.branchId ?? null;
  const paid = num(opts.paidAmount);
  const st = num(opts.salesTax);
  const ft = num(opts.furtherTax);
  const ait = num(opts.aitAmount);
  const recvId = await accountIdByCode("1100");
  const payId = await accountIdByCode("2001");
  const salesId = await accountIdByCode("4000");
  const purchId = await accountIdByCode("5000");
  const cashId = await accountIdByCode("1001");
  const bankId = await accountIdByCode("1002");
  const taxId = await accountIdByCode("2100");
  const ftId = (await accountIdByCode("2110")) ?? taxId;
  const aitRecvId = await accountIdByCode("1310");
  const aitPayId = await accountIdByCode("2200");
  if (!recvId || !payId || !salesId || !purchId || !cashId || !bankId) return;

  const isSale = docType === "SINV" || docType === "POS";
  const isPurch = docType === "PINV";
  const isSRet = docType === "SRET";
  const isPRet = docType === "PRET";
  const isAdj = docType === "ADJ";
  if (!isSale && !isPurch && !isSRet && !isPRet && !isAdj) return;

  // Adjustment Invoice: stock quantity re-valued at cost → Dr Inventory / Cr Inventory Adjustment
  if (isAdj) {
    const invId = await accountIdByCode("1200");
    const adjId = (await accountIdByCode("5600")) ?? invId;
    if (!invId || !adjId || grandTotal <= 0) return;
    const aNo = await nextVoucherNo("JV", date);
    const av = await db.insert(vouchers).values({
      voucherType: "JV", voucherNo: aNo, date,
      narration: `Inventory adjustment ${docNo}`,
      partyId, documentId: docId, companyId, branchId, currencyId, createdBy,
      totalDebit: String(grandTotal), totalCredit: String(grandTotal),
    }).returning();
    await db.insert(voucherLines).values([
      { voucherId: av[0].id, accountId: invId, debit: String(grandTotal), credit: "0", narration: `Stock adjusted in ${docNo}`, partyId },
      { voucherId: av[0].id, accountId: adjId, debit: "0", credit: String(grandTotal), narration: `Inventory adjustment ${docNo}`, partyId },
    ]);
    return;
  }

  const vType = isSale ? (docType === "POS" ? "POS" : "SINV") : "PINV";
  const vNo = await nextVoucherNo(vType, date);
  const netSales = round2(grandTotal - st - ft);

  const vRows = await db.insert(vouchers).values({
    voucherType: vType, voucherNo: vNo, date,
    narration: `Auto-post ${docType} ${docNo}`,
    partyId, documentId: docId, companyId, branchId, currencyId, createdBy,
    totalDebit: String(grandTotal), totalCredit: String(grandTotal),
  }).returning();
  const vId = vRows[0].id;

  const L: Array<{ accountId: number; debit: number; credit: number; narration: string }> = [];
  if (isSale) {
    L.push({ accountId: recvId, debit: grandTotal, credit: 0, narration: `Receivable ${docNo}` });
    L.push({ accountId: salesId, debit: 0, credit: netSales, narration: `Sales ${docNo}` });
    if (st > 0 && taxId) L.push({ accountId: taxId, debit: 0, credit: st, narration: `Sales tax ${docNo}` });
    if (ft > 0 && ftId) L.push({ accountId: ftId, debit: 0, credit: ft, narration: `Further tax u/s 3(1A) ${docNo}` });
  } else if (isPurch) {
    L.push({ accountId: purchId, debit: netSales, credit: 0, narration: `Purchase ${docNo}` });
    if (st > 0 && taxId) L.push({ accountId: taxId, debit: st, credit: 0, narration: `Input tax ${docNo}` });
    if (ft > 0 && ftId) L.push({ accountId: ftId, debit: ft, credit: 0, narration: `Further tax input ${docNo}` });
    L.push({ accountId: payId, debit: 0, credit: grandTotal, narration: `Payable ${docNo}` });
  } else if (isSRet) {
    L.push({ accountId: salesId, debit: netSales, credit: 0, narration: `Sales return ${docNo}` });
    if (st > 0 && taxId) L.push({ accountId: taxId, debit: st, credit: 0, narration: `Tax adj ${docNo}` });
    if (ft > 0 && ftId) L.push({ accountId: ftId, debit: ft, credit: 0, narration: `Further tax adj ${docNo}` });
    L.push({ accountId: recvId, debit: 0, credit: grandTotal, narration: `Receivable adj ${docNo}` });
  } else {
    L.push({ accountId: payId, debit: grandTotal, credit: 0, narration: `Payable adj ${docNo}` });
    L.push({ accountId: purchId, debit: 0, credit: netSales, narration: `Purchase return ${docNo}` });
    if (st > 0 && taxId) L.push({ accountId: taxId, debit: 0, credit: st, narration: `Tax adj ${docNo}` });
    if (ft > 0 && ftId) L.push({ accountId: ftId, debit: 0, credit: ft, narration: `Further tax adj ${docNo}` });
  }
  for (const l of L) {
    await db.insert(voucherLines).values({ voucherId: vId, accountId: l.accountId, debit: String(l.debit), credit: String(l.credit), narration: l.narration, partyId });
  }

  // AIT withholding legs (s.153): sales → customer withholds from us (Dr 1310 / Cr 1100);
  // purchases → we withhold from vendor (Dr 2001 / Cr 2200). Returns reverse.
  if (ait > 0) {
    const wNo = await nextVoucherNo("JV", date);
    const wv = await db.insert(vouchers).values({
      voucherType: "JV", voucherNo: wNo, date,
      narration: `AIT u/s 153 withholding on ${docNo}`,
      partyId, documentId: docId, companyId, branchId, currencyId, createdBy,
      totalDebit: String(ait), totalCredit: String(ait),
    }).returning();
    if (isSale && aitRecvId) {
      await db.insert(voucherLines).values([
        { voucherId: wv[0].id, accountId: aitRecvId, debit: String(ait), credit: "0", narration: "AIT deducted by customer", partyId },
        { voucherId: wv[0].id, accountId: recvId, debit: "0", credit: String(ait), narration: "Receivable reduced (WHT)", partyId },
      ]);
    } else if (isPurch && aitPayId) {
      await db.insert(voucherLines).values([
        { voucherId: wv[0].id, accountId: payId, debit: String(ait), credit: "0", narration: "Payable reduced (WHT)", partyId },
        { voucherId: wv[0].id, accountId: aitPayId, debit: "0", credit: String(ait), narration: "WHT payable to FBR", partyId },
      ]);
    } else if (isSRet && aitRecvId) {
      await db.insert(voucherLines).values([
        { voucherId: wv[0].id, accountId: recvId, debit: String(ait), credit: "0", narration: "WHT reversal", partyId },
        { voucherId: wv[0].id, accountId: aitRecvId, debit: "0", credit: String(ait), narration: "AIT receivable reversal", partyId },
      ]);
    } else if (isPRet && aitPayId) {
      await db.insert(voucherLines).values([
        { voucherId: wv[0].id, accountId: aitPayId, debit: String(ait), credit: "0", narration: "WHT payable reversal", partyId },
        { voucherId: wv[0].id, accountId: payId, debit: "0", credit: String(ait), narration: "Payable reversal (WHT)", partyId },
      ]);
    }
  }

  // Immediate payment leg (POS or advance paid on invoice)
  if (paid > 0 && (isSale || isPurch)) {
    const cashBank = opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? bankId : cashId;
    const pvType = isSale ? (opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? "BRV" : "CRV") : (opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? "BPV" : "CPV");
    const pvNo = await nextVoucherNo(pvType, date);
    const pv = await db.insert(vouchers).values({
      voucherType: pvType, voucherNo: pvNo, date,
      narration: `Payment ${opts.paymentMode} against ${docNo}`,
      partyId, documentId: docId, companyId, branchId, currencyId, createdBy,
      totalDebit: String(paid), totalCredit: String(paid),
    }).returning();
    if (isSale) {
      await db.insert(voucherLines).values([
        { voucherId: pv[0].id, accountId: cashBank, debit: String(paid), credit: "0", narration: "Cash/Bank received", partyId },
        { voucherId: pv[0].id, accountId: recvId, debit: "0", credit: String(paid), narration: "Receivable settled", partyId },
      ]);
    } else {
      await db.insert(voucherLines).values([
        { voucherId: pv[0].id, accountId: payId, debit: String(paid), credit: "0", narration: "Payable settled", partyId },
        { voucherId: pv[0].id, accountId: cashBank, debit: "0", credit: String(paid), narration: "Cash/Bank paid", partyId },
      ]);
    }
  }
}

export async function deleteDocumentCascade(docId: number) {
  await db.delete(fbrLogs).where(eq(fbrLogs.documentId, docId));
  await db.delete(stockLedger).where(eq(stockLedger.documentId, docId));
  const linked = await db.select().from(vouchers).where(eq(vouchers.documentId, docId));
  for (const v of linked) {
    await db.delete(voucherLines).where(eq(voucherLines.voucherId, v.id));
    await db.delete(vouchers).where(eq(vouchers.id, v.id));
  }
  await db.delete(documentLines).where(eq(documentLines.documentId, docId));
  await db.delete(documents).where(eq(documents.id, docId));
}

export async function stockOf(itemId: number): Promise<number> {
  const it = await db.select().from(items).where(eq(items.id, itemId)).limit(1);
  const opening = num(it[0]?.openingStock);
  const rows = await db
    .select({ in: sql<string>`coalesce(sum(${stockLedger.qtyIn}),0)`, out: sql<string>`coalesce(sum(${stockLedger.qtyOut}),0)` })
    .from(stockLedger)
    .where(eq(stockLedger.itemId, itemId));
  return opening + num(rows[0]?.in) - num(rows[0]?.out);
}
