import { NextResponse } from "next/server";
import { db } from "@/db";
import { items, parties, documents, documentLines, vouchers, voucherLines, accounts, permissions, sequences, salesmen } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSessionUser, MENU_KEYS, can, type SessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO, periodOf, docNoFor } from "@/lib/utils";
import { nextDocNo, postStock, postFinancialVoucher, audit } from "@/lib/posting";

/* =====================================================================
   Bulk Data Transfer — CSV import + downloadable templates
   Entities: item | salesman | customer | vendor | account | voucher |
             sinv | sret | pinv | pret | so | po | quot | adj
   Rights are enforced per user through permissions.can_upload / can_download.
   ===================================================================== */

export const TEMPLATES: Record<string, { headers: string[]; sample: string[] }> = {
  item: {
    headers: ["code", "barcode", "name", "category", "brand", "model", "unit", "size", "color", "design", "origin", "costPrice", "salePrice", "reorderLevel", "openingStock", "hsCode", "taxClass", "taxRate", "featured", "active", "pictures", "documents"],
    sample: ["SAN-100", "100100", "Commode Deluxe Pro", "Sanitary Ware", "PakCeram", "OP-300", "PCS", '26"x14"', "White", "Modern", "Local", "15000", "19500", "5", "20", "6910.1000", "standard", "18", "true", "true", "/uploads/a.jpg,/uploads/b.jpg", ""],
  },
  salesman: {
    headers: ["name", "phone", "area", "commissionRate", "active", "pictures", "documents"],
    sample: ["Ali Raza", "0300-1234567", "Gujranwala", "2.5", "true", "/uploads/face.jpg,/uploads/cnic-front.jpg,/uploads/cnic-back.jpg", "/uploads/resume.pdf"],
  },
  customer: {
    headers: ["name", "cnic", "ntn", "strn", "phone", "mobile", "email", "area", "city", "province", "filerStatus", "salesTaxRegistered", "openingBalance", "creditLimit", "pictures", "documents"],
    sample: ["New Traders", "34101-1234567-8", "1234567-8", "3277876123456", "055-1111111", "0300-1111111", "a@b.pk", "Model Town", "Gujranwala", "Punjab", "filer", "true", "50000", "400000", "/uploads/contact.jpg", "/uploads/ntn.pdf"],
  },
  vendor: {
    headers: ["name", "cnic", "ntn", "strn", "phone", "mobile", "email", "area", "city", "province", "filerStatus", "salesTaxRegistered", "openingBalance", "creditLimit", "pictures", "documents"],
    sample: ["New Vendor Ltd", "", "2345678-1", "3277876111009", "021-1111111", "0300-2222222", "v@b.pk", "SITE", "Karachi", "Sindh", "filer", "true", "0", "1000000", "", ""],
  },
  account: {
    headers: ["code", "name", "type", "openingDebit", "openingCredit", "prevYearDebit", "prevYearCredit", "active"],
    sample: ["5700", "Marketing Expense", "Expense", "0", "0", "0", "0", "true"],
  },
  voucher: {
    headers: ["voucherType", "date", "narration", "accountCode", "debit", "credit", "linePartyName", "analyticalDistribution"],
    sample: ["JV", "2026-01-15", "Being office rent", "5400", "50000", "0", "", "Showroom: 100%"],
  },
  sinv: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "discountPct", "salesTaxRate", "aitSection", "buyerFilerStatus", "paymentMode", "paidAmount", "transportCharges", "laborCharges", "documents"],
    sample: ["SINV", "2026-01-20", "Haji Traders", "SAN-001", "5", "18500", "0", "18", "goods", "filer", "credit", "0", "1500", "500", ""],
  },
  sret: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "returnCondition", "linkedDocNo", "paymentMode", "documents"],
    sample: ["SRET", "2026-01-25", "Haji Traders", "SAN-001", "2", "18500", "damaged", "INV-2026-01-0001", "credit", ""],
  },
  pinv: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "discountPct", "salesTaxRate", "aitSection", "paymentMode", "paidAmount", "documents"],
    sample: ["PINV", "2026-01-05", "Pak Ceramics (Pvt) Ltd", "SAN-001", "50", "14500", "0", "18", "goods", "credit", "0", ""],
  },
  pret: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "returnCondition", "linkedDocNo", "paymentMode", "documents"],
    sample: ["PRET", "2026-01-08", "Pak Ceramics (Pvt) Ltd", "SAN-001", "3", "14500", "broken", "PINV-2026-01-0001", "credit", ""],
  },
  so: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "discountPct", "salesTaxRate", "documents"],
    sample: ["SO", "2026-01-10", "Royal Builders", "TIL-001", "200", "2890", "2", "18", ""],
  },
  po: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "discountPct", "salesTaxRate", "documents"],
    sample: ["PO", "2026-01-04", "Lahore Brass Works", "BRS-001", "100", "1150", "0", "18", ""],
  },
  quot: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "discountPct", "validUntil", "documents"],
    sample: ["QUOT", "2026-01-03", "Modern Bath Gallery", "BRS-003", "4", "22800", "5", "2026-02-28", ""],
  },
  adj: {
    headers: ["docType", "date", "partyName", "itemCode", "qty", "rate", "notes", "documents"],
    sample: ["ADJ", "2026-01-30", "", "ACC-001", "10", "320", "Physical count adjustment", ""],
  },
};

function csvEscape(v: unknown) {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const entity = url.searchParams.get("entity") ?? "item";

  if (url.searchParams.get("action") === "rights") {
    const [up, down] = await Promise.all([can(user, "data_upload", "create"), can(user, "data_upload", "view")]);
    return NextResponse.json({
      canUpload: user.role === "admin" ? true : up,
      canDownload: user.role === "admin" ? true : down,
      isAdmin: user.role === "admin",
      entities: Object.keys(TEMPLATES),
    });
  }

  if (url.searchParams.get("action") === "template") {
    const t = TEMPLATES[entity] ?? TEMPLATES.item;
    const csv = [t.headers.join(","), t.sample.map(csvEscape).join(",")].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="template_${entity}.csv"`,
      },
    });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

async function partyIdByName(name: string, type: string): Promise<number | null> {
  if (!name) return null;
  const rows = await db.select().from(parties).where(and(eq(parties.name, name.trim()), eq(parties.type, type)));
  return rows[0]?.id ?? null;
}
async function itemIdByCode(code: string): Promise<number | null> {
  if (!code) return null;
  const rows = await db.select().from(items).where(eq(items.code, code.trim()));
  return rows[0]?.id ?? null;
}
async function accountIdByCode(code: string): Promise<number | null> {
  if (!code) return null;
  const rows = await db.select().from(accounts).where(eq(accounts.code, code.trim()));
  return rows[0]?.id ?? null;
}

async function nextSeq(prefix: string, date: string) {
  const period = periodOf(date);
  const rows = await db.select().from(sequences).where(and(eq(sequences.prefix, prefix), eq(sequences.period, period)));
  if (!rows[0]) {
    await db.insert(sequences).values({ prefix, period, lastNo: 1 });
    return 1;
  }
  const n = rows[0].lastNo + 1;
  await db.update(sequences).set({ lastNo: n }).where(eq(sequences.id, rows[0].id));
  return n;
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let cur: string[] = [], val = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { val += '"'; i++; }
      else if (c === '"') inQ = false;
      else val += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { cur.push(val); val = ""; }
    else if (c === "\n") { cur.push(val); rows.push(cur); cur = []; val = ""; }
    else if (c !== "\r") val += c;
  }
  if (val.length || cur.length) { cur.push(val); rows.push(cur); }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

const STOCK_DIR: Record<string, "in" | "out" | "none"> = {
  SINV: "out", POS: "out", PINV: "in", SRET: "in", PRET: "out", ADJ: "in",
  QUOT: "none", SO: "none", PO: "none",
};
const DOC_PREFIX: Record<string, string> = {
  SINV: "INV", PINV: "PINV", SRET: "SR", PRET: "PR", SO: "SO", PO: "PO", QUOT: "QT", ADJ: "ADJ", POS: "POS",
};
const PARTY_OF: Record<string, string> = {
  SINV: "customer", POS: "customer", SRET: "customer", QUOT: "customer", SO: "customer",
  PINV: "vendor", PRET: "vendor", PO: "vendor", ADJ: "customer",
};

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin" && !(await can(user, "data_upload", "create"))) {
    return NextResponse.json({ error: "You do not have upload permission. Ask an admin to grant it under Permissions." }, { status: 403 });
  }
  await ensureSeed();

  const form = await req.formData();
  const entity = String(form.get("entity") ?? "item");
  const file = form.get("file") as unknown as File | null;
  if (!file) return NextResponse.json({ error: "Choose a CSV file first" }, { status: 400 });
  if (!TEMPLATES[entity]) return NextResponse.json({ error: `Unknown entity "${entity}"` }, { status: 400 });

  const text = await file.text();
  const parsed = parseCsv(text);
  if (parsed.length < 2) return NextResponse.json({ error: "File has no data rows" }, { status: 400 });
  const headers = parsed[0].map((h) => h.trim());
  const dataRows = parsed.slice(1);

  // Guard: catch rows whose column count differs from the header (usually an
  // unquoted multi-value field such as pictures/documents containing commas).
  const expectedCols = headers.length;
  const malformed = dataRows.filter((r) => r.length !== expectedCols).length;
  if (malformed) {
    return NextResponse.json({
      error: `${malformed} of ${dataRows.length} row(s) have ${expectedCols} columns expected but a different count was found. Wrap fields that contain commas in double quotes — e.g. "/uploads/a.jpg,/uploads/b.jpg". Nothing was imported.`,
    }, { status: 400 });
  }

  const col = (r: string[], name: string) => {
    const i = headers.indexOf(name);
    return i >= 0 ? (r[i] ?? "").trim() : "";
  };

  const errors: string[] = [];
  let ok = 0;

  /* ---------------------------- Master data ---------------------------- */
  if (["item", "salesman", "customer", "vendor", "account"].includes(entity)) {
    for (let n = 0; n < dataRows.length; n++) {
      const r = dataRows[n];
      const rowNo = n + 2;
      try {
        if (entity === "item") {
          const code = col(r, "code");
          if (!code) throw new Error("code required");
          const exists = await db.select().from(items).where(eq(items.code, code)).limit(1);
          const vals = {
            code, barcode: col(r, "barcode") || null, name: col(r, "name") || code,
            category: col(r, "category") || "General", brand: col(r, "brand") || null,
            model: col(r, "model") || null, unit: col(r, "unit") || "PCS",
            size: col(r, "size") || null, color: col(r, "color") || null,
            design: col(r, "design") || null, origin: col(r, "origin") === "Imported" ? "Imported" : "Local",
            costPrice: String(num(col(r, "costPrice"))), salePrice: String(num(col(r, "salePrice"))),
            reorderLevel: String(num(col(r, "reorderLevel"))), openingStock: String(num(col(r, "openingStock"))),
            hsCode: col(r, "hsCode") || null, taxClass: col(r, "taxClass") || "standard",
            taxRate: String(num(col(r, "taxRate")) || 18),
            featured: /^(true|1|yes)$/i.test(col(r, "featured")),
            pictures: col(r, "pictures") || null, documents: col(r, "documents") || null,
            active: !/^(false|0|no)$/i.test(col(r, "active")),
          };
          if (exists[0]) await db.update(items).set(vals).where(eq(items.id, exists[0].id));
          else await db.insert(items).values(vals);
        } else if (entity === "salesman") {
          await db.insert(salesmen).values({
            name: col(r, "name") || "Unnamed", phone: col(r, "phone") || null,
            area: col(r, "area") || null, commissionRate: String(num(col(r, "commissionRate"))),
            active: !/^(false|0|no)$/i.test(col(r, "active")),
            pictures: col(r, "pictures") || null, documents: col(r, "documents") || null,
          } as never);
        } else if (entity === "customer" || entity === "vendor") {
          await db.insert(parties).values({
            type: entity, name: col(r, "name") || "Unnamed",
            cnic: col(r, "cnic") || null, ntn: col(r, "ntn") || null, strn: col(r, "strn") || null,
            phone: col(r, "phone") || null, mobile: col(r, "mobile") || null, email: col(r, "email") || null,
            area: col(r, "area") || null, city: col(r, "city") || null, province: col(r, "province") || null,
            filerStatus: col(r, "filerStatus") || "filer",
            salesTaxRegistered: /^(true|1|yes)$/i.test(col(r, "salesTaxRegistered")),
            openingBalance: String(num(col(r, "openingBalance"))),
            creditLimit: String(num(col(r, "creditLimit"))),
            pictures: col(r, "pictures") || null, documents: col(r, "documents") || null,
          } as never);
        } else {
          await db.insert(accounts).values({
            code: col(r, "code"), name: col(r, "name") || col(r, "code"),
            type: col(r, "type") || "Expense",
            openingDebit: String(num(col(r, "openingDebit"))),
            openingCredit: String(num(col(r, "openingCredit"))),
            prevYearDebit: String(num(col(r, "prevYearDebit"))),
            prevYearCredit: String(num(col(r, "prevYearCredit"))),
            active: !/^(false|0|no)$/i.test(col(r, "active")),
          });
        }
        ok++;
      } catch (e) {
        errors.push(`Row ${rowNo}: ${e instanceof Error ? e.message : "failed"}`);
      }
    }
    await audit(user.id, user.username, "import", entity, "bulk", { rows: ok, failed: errors.length });
    return NextResponse.json({ ok: true, imported: ok, failed: errors.length, errors: errors.slice(0, 15) });
  }

  /* --------------------------- Document import --------------------------- */
  const docType = entity.toUpperCase();
  const groups = new Map<string, string[][]>();
  for (let n = 0; n < dataRows.length; n++) {
    const r = dataRows[n];
    const key = `${col(r, "date")}|${col(r, "partyName")}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }

  for (const [, rows] of groups) {
    const first = rows[0];
    const rowNo = dataRows.indexOf(first) + 2;
    try {
      const date = col(first, "date") || todayISO();
      const party = await partyIdByName(col(first, "partyName"), PARTY_OF[docType] ?? "customer");
      const docNo = docNoFor(DOC_PREFIX[docType] ?? docType, date, await nextSeq(DOC_PREFIX[docType] ?? docType, date));

      const dRows = await db.insert(documents).values({
        docType, docNo, date, partyId: party,
        subtotal: "0", grandTotal: "0", paidAmount: String(num(col(first, "paidAmount"))),
        paymentMode: col(first, "paymentMode") || "credit",
        salesTaxRate: String(num(col(first, "salesTaxRate")) || 18),
        aitSection: col(first, "aitSection") || "goods",
        buyerFilerStatus: col(first, "buyerFilerStatus") || "filer",
        transportCharges: String(num(col(first, "transportCharges"))),
        laborCharges: String(num(col(first, "laborCharges"))),
        validUntil: col(first, "validUntil") || null,
        notes: col(first, "notes") || `Imported from CSV`,
        documents: col(first, "documents") || null,
        status: docType === "SO" || docType === "PO" ? "Open" : "Posted",
        fbrStatus: ["SINV", "POS", "SRET"].includes(docType) ? "not_synced" : "not_required",
        createdBy: user.id,
      }).returning();
      const doc = dRows[0];

      let subtotal = 0;
      const plines: Array<{ itemId: number | null; qty: number; rate: number; returnCondition?: string }> = [];
      for (const r of rows) {
        const it = await itemIdByCode(col(r, "itemCode"));
        if (!it) throw new Error(`item "${col(r, "itemCode")}" not found`);
        const qty = num(col(r, "qty")), rate = num(col(r, "rate")), dPct = num(col(r, "discountPct"));
        const amount = Math.round((qty * rate - (qty * rate * dPct) / 100) * 100) / 100;
        subtotal += amount;
        await db.insert(documentLines).values({
          documentId: doc.id, itemId: it, qty: String(qty), rate: String(rate),
          discountPct: String(dPct), amount: String(amount),
          returnCondition: col(r, "returnCondition") || "normal",
        });
        plines.push({ itemId: it, qty, rate, returnCondition: col(r, "returnCondition") || "normal" });
      }

      const taxable = subtotal + num(col(first, "transportCharges")) + num(col(first, "laborCharges"));
      const stRate = num(col(first, "salesTaxRate")) || 18;
      const salesTax = Math.round(((taxable * stRate) / 100) * 100) / 100;
      const grand = Math.round((taxable + salesTax) * 100) / 100;

      await db.update(documents).set({
        subtotal: String(Math.round(subtotal * 100) / 100),
        salesTax: String(salesTax), grandTotal: String(grand),
      }).where(eq(documents.id, doc.id));

      const dir = STOCK_DIR[docType] ?? "none";
      await postStock(doc.id, docType, date, null, plines, dir, `${docType} ${docNo}`);
      if (docType !== "QUOT" && docType !== "SO" && docType !== "PO") {
        await postFinancialVoucher({
          docId: doc.id, docType, docNo, date, partyId: party,
          grandTotal: grand, paidAmount: num(col(first, "paidAmount")),
          paymentMode: col(first, "paymentMode") || "credit",
          salesTax, furtherTax: 0, aitAmount: 0, createdBy: user.id, companyId: null, currencyId: null,
        });
      }
      ok++;
    } catch (e) {
      errors.push(`Row ${rowNo}: ${e instanceof Error ? e.message : "failed"}`);
    }
  }

  await audit(user.id, user.username, "import", `documents:${docType}`, "bulk", { docs: ok, failed: errors.length });
  return NextResponse.json({ ok: true, imported: ok, failed: errors.length, errors: errors.slice(0, 15) });
}

export async function PUT(req: Request) {
  const user: SessionUser = (await getSessionUser())!;
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
  const body = await req.json();
  const { userId, menuKey, canUpload, canDownload } = body;
  const existing = await db.select().from(permissions).where(and(eq(permissions.userId, Number(userId)), eq(permissions.menuKey, String(menuKey))));
  const patch = { canUpload: !!canUpload, canDownload: !!canDownload };
  if (existing[0]) await db.update(permissions).set(patch).where(eq(permissions.id, existing[0].id));
  else await db.insert(permissions).values({ userId: Number(userId), menuKey: String(menuKey), canView: true, canCreate: !!canUpload, canEdit: false, canDelete: false, canPrint: false, canExport: !!canDownload, ...patch });
  await audit(user.id, user.username, "update", "permissions", `${userId}:${menuKey}`, patch);
  return NextResponse.json({ ok: true });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
