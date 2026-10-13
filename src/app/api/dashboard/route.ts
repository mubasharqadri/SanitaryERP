import { NextResponse } from "next/server";
import { db } from "@/db";
import { documents, items, parties, stockLedger, vouchers } from "@/db/schema";
import { eq, gte, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO } from "@/lib/utils";
import { stockMap } from "@/app/api/items/route";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const today = todayISO();
  const monthStart = today.slice(0, 7) + "-01";

  const salesToday = await db.select({ t: sql<string>`coalesce(sum(${documents.grandTotal}),0)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} = ${today} and ${documents.status} != 'Cancelled'`);
  const salesMonth = await db.select({ t: sql<string>`coalesce(sum(${documents.grandTotal}),0)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`);
  const purchMonth = await db.select({ t: sql<string>`coalesce(sum(${documents.grandTotal}),0)` }).from(documents)
    .where(sql`${documents.docType} = 'PINV' and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`);
  const recvMonth = await db.select({ t: sql<string>`coalesce(sum(${vouchers.totalCredit}),0)` }).from(vouchers)
    .where(sql`(${vouchers.voucherType} = 'CRV' or ${vouchers.voucherType} = 'BRV') and ${vouchers.date} >= ${monthStart} and ${vouchers.status} != 'Cancelled'`);
  const payMonth = await db.select({ t: sql<string>`coalesce(sum(${vouchers.totalDebit}),0)` }).from(vouchers)
    .where(sql`(${vouchers.voucherType} = 'CPV' or ${vouchers.voucherType} = 'BPV') and ${vouchers.date} >= ${monthStart} and ${vouchers.status} != 'Cancelled'`);

  const countItems = await db.select({ c: sql<number>`count(*)` }).from(items);
  const countCust = await db.select({ c: sql<number>`count(*)` }).from(parties).where(eq(parties.type, "customer"));
  const countVend = await db.select({ c: sql<number>`count(*)` }).from(parties).where(eq(parties.type, "vendor"));

  const recentDocs = await db.select().from(documents).orderBy(sql`${documents.id} desc`).limit(8);

  // receivables / payables
  const allDocs = await db.select().from(documents).where(sql`${documents.status} != 'Cancelled'`);
  const allV = await db.select().from(vouchers).where(sql`${vouchers.status} != 'Cancelled'`);
  const allP = await db.select().from(parties);
  let receivables = 0, payables = 0;
  const openMap: Record<number, number> = {};
  for (const p of allP) openMap[p.id] = num(p.openingBalance);
  for (const d of allDocs) {
    if (!d.partyId) continue;
    if (d.docType === "SINV" || d.docType === "POS") openMap[d.partyId] = (openMap[d.partyId] ?? 0) + num(d.grandTotal);
    if (d.docType === "SRET") openMap[d.partyId] = (openMap[d.partyId] ?? 0) - num(d.grandTotal);
    if (d.docType === "PINV") openMap[d.partyId] = (openMap[d.partyId] ?? 0) + num(d.grandTotal);
    if (d.docType === "PRET") openMap[d.partyId] = (openMap[d.partyId] ?? 0) - num(d.grandTotal);
  }
  for (const v of allV) {
    if (!v.partyId) continue;
    if (v.voucherType === "CRV" || v.voucherType === "BRV") openMap[v.partyId] = (openMap[v.partyId] ?? 0) - num(v.totalCredit);
    if (v.voucherType === "CPV" || v.voucherType === "BPV") openMap[v.partyId] = (openMap[v.partyId] ?? 0) - num(v.totalDebit);
  }
  for (const p of allP) {
    if (p.type === "customer") receivables += openMap[p.id] ?? 0;
    else payables += openMap[p.id] ?? 0;
  }

  // reorder alarms
  const sm = await stockMap();
  const allItems = await db.select().from(items);
  const alarms = allItems
    .filter((it) => (sm[it.id]?.stock ?? 0) <= num(it.reorderLevel))
    .map((it) => ({ id: it.id, code: it.code, name: it.name, stock: Math.round((sm[it.id]?.stock ?? 0) * 100) / 100, reorderLevel: num(it.reorderLevel) }))
    .slice(0, 10);

  // 7-day sales trend
  const trend: Array<{ date: string; total: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const r = await db.select({ t: sql<string>`coalesce(sum(${documents.grandTotal}),0)` }).from(documents)
      .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} = ${iso} and ${documents.status} != 'Cancelled'`);
    trend.push({ date: iso.slice(5), total: num(r[0]?.t) });
  }

  // payment mode breakdown today
  const modes = await db.select({ m: documents.paymentMode, t: sql<string>`coalesce(sum(${documents.grandTotal}),0)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`).groupBy(documents.paymentMode);

  void gte; void stockLedger;

  // PK tax + FBR snapshot (this month)
  const outTax = await db.select({ t: sql<string>`coalesce(sum(${documents.salesTax}),0)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`);
  const inTax = await db.select({ t: sql<string>`coalesce(sum(${documents.salesTax}),0)` }).from(documents)
    .where(sql`${documents.docType} = 'PINV' and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`);
  const ftOut = await db.select({ t: sql<string>`coalesce(sum(${documents.furtherTax}),0)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${monthStart} and ${documents.status} != 'Cancelled'`);
  const fbrPend = await db.select({ c: sql<number>`count(*)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS','SRET') and ${documents.fbrStatus} in ('not_synced','failed','queued')`);
  const fbrSynced = await db.select({ c: sql<number>`count(*)` }).from(documents)
    .where(sql`${documents.fbrStatus} = 'synced'`);

  return NextResponse.json({
    salesToday: num(salesToday[0]?.t), salesMonth: num(salesMonth[0]?.t),
    purchMonth: num(purchMonth[0]?.t), recvMonth: num(recvMonth[0]?.t), payMonth: num(payMonth[0]?.t),
    receivables: Math.round(receivables), payables: Math.round(payables),
    countItems: Number(countItems[0]?.c ?? 0), countCust: Number(countCust[0]?.c ?? 0), countVend: Number(countVend[0]?.c ?? 0),
    recentDocs, alarms, trend, modes,
    taxMonth: { outputTax: num(outTax[0]?.t), inputTax: num(inTax[0]?.t), furtherTax: num(ftOut[0]?.t), netPayable: num(outTax[0]?.t) - num(inTax[0]?.t) },
    fbr: { pending: Number(fbrPend[0]?.c ?? 0), synced: Number(fbrSynced[0]?.c ?? 0) },
  });
}
