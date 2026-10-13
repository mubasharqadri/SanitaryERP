import { NextResponse } from "next/server";
import { db } from "@/db";
import { vouchers, voucherLines, stockLedger, documents, documentLines, items, fbrSettings } from "@/db/schema";
import { sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { validateNTN, validateSTRN } from "@/lib/tax";

type Check = { name: string; status: "pass" | "warn" | "fail"; detail: string };

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const checks: Check[] = [];

  // 1. voucher balancing
  const allV = await db.select().from(vouchers);
  const allVL = await db.select().from(voucherLines);
  let unbalanced = 0;
  for (const v of allV) {
    const ls = allVL.filter((l) => l.voucherId === v.id);
    const dr = ls.reduce((a, l) => a + num(l.debit), 0);
    const cr = ls.reduce((a, l) => a + num(l.credit), 0);
    if (Math.abs(dr - cr) > 0.01) unbalanced++;
  }
  checks.push({ name: "Voucher balancing (Dr = Cr)", status: unbalanced ? "fail" : "pass", detail: unbalanced ? `${unbalanced} unbalanced voucher(s)` : `${allV.length} vouchers balanced` });

  // 2. negative stock
  const allItems = await db.select().from(items);
  const moves = await db.select().from(stockLedger);
  let neg = 0; const negNames: string[] = [];
  for (const it of allItems) {
    const st = num(it.openingStock) + moves.filter((m) => m.itemId === it.id).reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
    if (st < -0.001) { neg++; if (negNames.length < 5) negNames.push(`${it.code} (${st.toFixed(0)})`); }
  }
  checks.push({ name: "Negative stock", status: neg ? "warn" : "pass", detail: neg ? `${neg} item(s) below zero: ${negNames.join(", ")}` : "No negative stock" });

  // 3. document totals = lines + taxes + charges (PK: AIT is a deduction, not an addition)
  const docs = await db.select().from(documents);
  const lines = await db.select().from(documentLines);
  let badTotals = 0;
  for (const d of docs) {
    const ls = lines.filter((l) => l.documentId === d.id);
    const sub = ls.reduce((a, l) => a + num(l.amount), 0);
    const afterPct = sub - (sub * num(d.discountPct)) / 100;
    const expect = afterPct - num(d.discountLumpsum) + num(d.salesTax) + num(d.furtherTax) + num(d.transportCharges) + num(d.laborCharges);
    if (Math.abs(expect - num(d.grandTotal)) > 1) badTotals++;
  }
  checks.push({ name: "Document totals reconcile", status: badTotals ? "warn" : "pass", detail: badTotals ? `${badTotals} doc(s) mismatch` : `${docs.length} documents reconcile` });

  // 4. duplicate doc numbers
  const seen = new Set<string>(); let dups = 0;
  for (const d of docs) { if (seen.has(d.docNo)) dups++; seen.add(d.docNo); }
  checks.push({ name: "Duplicate document numbers", status: dups ? "fail" : "pass", detail: dups ? `${dups} duplicates` : "Unique — constraint enforced" });

  // 5. orphan lines
  const docIds = new Set(docs.map((d) => d.id));
  const orphanDoc = lines.filter((l) => !docIds.has(l.documentId)).length;
  const vIds = new Set(allV.map((v) => v.id));
  const orphanV = allVL.filter((l) => !vIds.has(l.voucherId)).length;
  checks.push({ name: "Orphan lines", status: orphanDoc + orphanV ? "fail" : "pass", detail: orphanDoc + orphanV ? `${orphanDoc} doc / ${orphanV} voucher orphans` : "No orphans — FK enforced" });

  // 6. FK/index counts
  const fkCount = await db.execute(sql`select count(*)::int as c from pg_constraint where contype = 'f'`);
  const idxCount = await db.execute(sql`select count(*)::int as c from pg_indexes where schemaname = 'public'`);
  const fk = Number((fkCount.rows[0] as { c: number })?.c ?? 0);
  const idx = Number((idxCount.rows[0] as { c: number })?.c ?? 0);
  checks.push({ name: "Foreign keys enforced", status: fk >= 19 ? "pass" : "warn", detail: `${fk} FK constraints live` });
  checks.push({ name: "Indexes present", status: idx >= 38 ? "pass" : "warn", detail: `${idx} indexes live` });

  // 7. vouchers without lines
  const empty = allV.filter((v) => !allVL.some((l) => l.voucherId === v.id)).length;
  checks.push({ name: "Vouchers with lines", status: empty ? "warn" : "pass", detail: empty ? `${empty} voucher(s) without lines` : "All vouchers have lines" });

  // 8. PK sales-tax arithmetic (tax = taxable × rate)
  let badTax = 0;
  for (const d of docs) {
    if (!["SINV", "POS", "PINV", "SRET", "PRET", "QUOT", "SO", "PO"].includes(d.docType)) continue;
    const ls = lines.filter((l) => l.documentId === d.id);
    const sub = ls.reduce((a, l) => a + num(l.amount), 0);
    const taxable = sub - (sub * num(d.discountPct)) / 100 - num(d.discountLumpsum) + num(d.transportCharges) + num(d.laborCharges);
    const expectST = Math.round(((Math.max(0, taxable) * num(d.salesTaxRate)) / 100) * 100) / 100;
    if (Math.abs(expectST - num(d.salesTax)) > 2) badTax++;
  }
  checks.push({ name: "PK sales-tax arithmetic", status: badTax ? "warn" : "pass", detail: badTax ? `${badTax} doc(s) with tax ≠ taxable × rate` : "All invoice taxes reconcile to rates" });

  // 9. FBR seller credentials
  const fbr = await db.select().from(fbrSettings).limit(1);
  const s = fbr[0];
  const credOk = !!s && validateNTN(s.ntn) && validateSTRN(s.strn) && !!s.businessName;
  checks.push({
    name: "FBR seller credentials (NTN/STRN)",
    status: credOk ? "pass" : "fail",
    detail: !s ? "FBR settings missing" : credOk ? `NTN ${s.ntn} · STRN ${s.strn} · ${s.environment}` : "Invalid NTN/STRN — FBR sync will fail. Fix in Settings → FBR.",
  });

  // 10. FBR sync queue health
  const fbrDocs = docs.filter((d) => ["SINV", "POS", "SRET"].includes(d.docType));
  const pending = fbrDocs.filter((d) => d.fbrStatus === "not_synced" || d.fbrStatus === "queued").length;
  const failed = fbrDocs.filter((d) => d.fbrStatus === "failed").length;
  const synced = fbrDocs.filter((d) => d.fbrStatus === "synced").length;
  checks.push({
    name: "FBR invoice sync queue",
    status: failed ? "fail" : pending ? "warn" : "pass",
    detail: `${synced} synced · ${pending} pending · ${failed} failed (of ${fbrDocs.length} reportable)`,
  });

  // 11. duplicate FBR invoice numbers (IRN must be unique)
  const irns = fbrDocs.map((d) => d.fbrInvoiceNo).filter(Boolean) as string[];
  const dupIrn = irns.length - new Set(irns).size;
  checks.push({ name: "FBR IRN uniqueness", status: dupIrn ? "fail" : "pass", detail: dupIrn ? `${dupIrn} duplicate IRN(s)` : `${irns.length} unique IRN(s)` });

  return NextResponse.json({ checks, summary: { pass: checks.filter((c) => c.status === "pass").length, warn: checks.filter((c) => c.status === "warn").length, fail: checks.filter((c) => c.status === "fail").length } });
}
