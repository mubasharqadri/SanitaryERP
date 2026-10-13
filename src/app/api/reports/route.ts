import { NextResponse } from "next/server";
import { db } from "@/db";
import { documents, documentLines, parties, items, stockLedger, vouchers, voucherLines, salesmen, accounts } from "@/db/schema";
import { eq, sql, and, gte, lte, inArray } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO } from "@/lib/utils";
import { stockMap } from "@/app/api/items/route";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? "sales";
  const from = url.searchParams.get("from") ?? "2000-01-01";
  const to = url.searchParams.get("to") ?? todayISO();

  if (type === "sales" || type === "purchases") {
    const types = type === "sales" ? ["SINV", "POS", "SRET"] : ["PINV", "PRET"];
    const docs = await db.select().from(documents)
      .where(sql`${documents.docType} in (${sql.join(types.map((t) => sql`${t}`), sql`,`)}) and ${documents.date} >= ${from} and ${documents.date} <= ${to} and ${documents.status} != 'Cancelled'`)
      .orderBy(documents.date);
    const allP = await db.select().from(parties);
    const pmap: Record<number, string> = {};
    for (const p of allP) pmap[p.id] = p.name;
    return NextResponse.json({ rows: docs.map((d) => ({ ...d, partyName: d.partyId ? pmap[d.partyId] ?? "#" + d.partyId : "—" })) });
  }

  /* ---------- Item-wise Stock Movement Matrix (period based) ----------
     Columns: Opening, Purchase, Purchase Return, Purchase Value, Sales, Sales Return,
     Sales Value, Adjustment Qty/Value, Balance Qty, Balance Value.
     Damaged/Broken sales returns are tracked separately and do NOT enter saleable stock. */
  if (type === "stock") {
    const itemId = url.searchParams.get("itemId");
    const openingCut = url.searchParams.get("openingCut"); // movements before `from`

    const all = await db.select().from(items).orderBy(items.category);
    const imap: Record<number, typeof all[number]> = {};
    for (const i of all) imap[i.id] = i;

    const ledger = db.select().from(stockLedger);
    const scoped = itemId
      ? ledger.where(and(eq(stockLedger.itemId, Number(itemId)), gte(stockLedger.date, from), lte(stockLedger.date, to)))
      : ledger.where(and(gte(stockLedger.date, from), lte(stockLedger.date, to)));
    const periodMoves = await scoped;

    const openingMoves = openingCut
      ? await db.select().from(stockLedger).where(sql`date < ${openingCut}${itemId ? sql` and item_id = ${Number(itemId)}` : sql``}`)
      : [];

    const openingMap: Record<number, number> = {};
    for (const i of all) openingMap[i.id] = num(i.openingStock);
    for (const m of openingMoves) if (m.itemId) openingMap[m.itemId] = (openingMap[m.itemId] ?? 0) + num(m.qtyIn) - num(m.qtyOut);

    const rows = all
      .filter((i) => (itemId ? i.id === Number(itemId) : true))
      .map((i) => {
        const mv = periodMoves.filter((m) => m.itemId === i.id);
        const g = (fn: (m: typeof mv[number]) => boolean) => mv.filter(fn).reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
        const qtyOf = (types: string[]) => mv.filter((m) => types.includes(m.docType)).reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
        const cost = num(i.costPrice);

        const purchase = qtyOf(["PINV"]);
        const purchaseReturn = Math.abs(qtyOf(["PRET"]));
        const sales = Math.abs(qtyOf(["SINV", "POS"]));
        const salesReturnNormal = mv.filter((m) => m.docType === "SRET" && m.returnCondition === "normal").reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
        const salesReturnDamaged = mv.filter((m) => m.docType === "SRET" && m.returnCondition === "damaged").reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
        const salesReturnBroken = mv.filter((m) => m.docType === "SRET" && m.returnCondition === "broken").reduce((a, m) => a + num(m.qtyIn) - num(m.qtyOut), 0);
        const adjustment = qtyOf(["ADJ"]);

        const opening = Math.round((openingMap[i.id] ?? 0) * 100) / 100;
        const balanceQty = Math.round((opening + purchase - purchaseReturn - sales + salesReturnNormal + adjustment) * 100) / 100;

        return {
          id: i.id, code: i.code, name: i.name, category: i.category, unit: i.unit,
          openingStock: opening, openingValue: Math.round(opening * cost * 100) / 100,
          purchase, purchaseValue: Math.round(purchase * cost * 100) / 100,
          purchaseReturn, purchaseReturnValue: Math.round(purchaseReturn * cost * 100) / 100,
          sales, salesValue: Math.round(sales * num(i.salePrice) * 100) / 100,
          salesReturn: salesReturnNormal, salesReturnValue: Math.round(salesReturnNormal * num(i.salePrice) * 100) / 100,
          adjustment, adjustmentValue: Math.round(adjustment * cost * 100) / 100,
          damagedQty: salesReturnDamaged, brokenQty: salesReturnBroken,
          damagedBrokenQty: Math.round((salesReturnDamaged + salesReturnBroken) * 100) / 100,
          damagedBrokenValue: Math.round((salesReturnDamaged + salesReturnBroken) * cost * 100) / 100,
          balanceQty, balanceValue: Math.round(balanceQty * cost * 100) / 100,
        };
      });

    return NextResponse.json({ rows, from, to });
  }

  /* ---------- Return Invoices of one item (damaged / broken / normal drill-down) ---------- */
  if (type === "item-returns") {
    const itId = Number(url.searchParams.get("itemId"));
    const moves = await db.select().from(stockLedger)
      .where(and(eq(stockLedger.itemId, itId), gte(stockLedger.date, from), lte(stockLedger.date, to), inArray(stockLedger.docType, ["SRET", "PRET"])));
    const docIds = [...new Set(moves.map((m) => m.documentId).filter((x): x is number => !!x))];
    const docs = docIds.length ? await db.select().from(documents).where(inArray(documents.id, docIds)) : [];
    const allP = await db.select().from(parties);
    const out = moves.map((m) => {
      const d = docs.find((x) => x.id === m.documentId);
      const cond = m.returnCondition ?? "normal";
      return {
        id: m.id, date: m.date, docType: m.docType, docNo: d?.docNo ?? "—",
        party: d?.partyId ? allP.find((p) => p.id === d.partyId)?.name ?? "—" : "—",
        qty: num(m.qtyIn) - num(m.qtyOut), rate: num(m.rate),
        value: Math.round(Math.abs(num(m.qtyIn) - num(m.qtyOut)) * num(m.rate) * 100) / 100,
        condition: cond, status: d?.status ?? "—",
      };
    }).filter((r) => r.qty !== 0).sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return NextResponse.json({ rows: out });
  }

  if (type === "aging") {
    const allP = await db.select().from(parties).where(eq(parties.type, "customer"));
    const docs = await db.select().from(documents).where(sql`${documents.status} != 'Cancelled'`);
    const vchs = await db.select().from(vouchers).where(sql`${vouchers.status} != 'Cancelled'`);
    const today = new Date(todayISO());
    const rows = [];
    for (const p of allP) {
      const buckets = { b0: 0, b1: 0, b2: 0, b3: 0 };
      let lastDate = "", lastAmt = 0, invoiced = num(p.openingBalance), settled = 0;
      let lastPayDate = "", lastPayAmt = 0;
      for (const d of docs.filter((x) => x.partyId === p.id && (x.docType === "SINV" || x.docType === "POS"))) {
        const age = Math.floor((today.getTime() - new Date(String(d.date)).getTime()) / 86400000);
        const amt = num(d.grandTotal);
        invoiced += amt;
        if (age <= 30) buckets.b0 += amt; else if (age <= 60) buckets.b1 += amt; else if (age <= 90) buckets.b2 += amt; else buckets.b3 += amt;
        if (!lastDate || String(d.date) > lastDate) { lastDate = String(d.date); lastAmt = amt; }
      }
      for (const d of docs.filter((x) => x.partyId === p.id && x.docType === "SRET")) invoiced -= num(d.grandTotal);
      for (const v of vchs.filter((x) => x.partyId === p.id && (x.voucherType === "CRV" || x.voucherType === "BRV"))) {
        settled += num(v.totalCredit);
        if (!lastPayDate || String(v.date) > lastPayDate) { lastPayDate = String(v.date); lastPayAmt = num(v.totalCredit); }
      }
      const outstanding = invoiced - settled;
      if (Math.abs(outstanding) < 0.5 && invoiced < 0.5) continue;
      rows.push({ id: p.id, name: p.name, city: p.city, phone: p.phone, creditLimit: num(p.creditLimit), ...buckets, outstanding: Math.round(outstanding * 100) / 100, lastDate, lastAmt, lastPayDate, lastPayAmt });
    }
    rows.sort((a, b) => b.outstanding - a.outstanding);
    return NextResponse.json({ rows });
  }

  if (type === "daily") {
    const docs = await db.select().from(documents).where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${from} and ${documents.date} <= ${to} and ${documents.status} != 'Cancelled'`).orderBy(documents.date);
    const byDate: Record<string, { sales: number; invoices: number; cash: number; bank: number; card: number; online: number; credit: number; cheque: number }> = {};
    for (const d of docs) {
      const k = String(d.date).slice(0, 10);
      byDate[k] ??= { sales: 0, invoices: 0, cash: 0, bank: 0, card: 0, online: 0, credit: 0, cheque: 0 };
      byDate[k].sales += num(d.grandTotal);
      byDate[k].invoices += 1;
      const m = (d.paymentMode || "credit").toLowerCase();
      if (m in byDate[k]) (byDate[k] as unknown as Record<string, number>)[m] += num(d.grandTotal);
      else byDate[k].credit += num(d.grandTotal);
    }
    return NextResponse.json({ rows: Object.entries(byDate).map(([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date)) });
  }

  /* ---------- Drill-down: which invoices / recoveries make up a day's figures ---------- */
  if (type === "daily-drill") {
    const day = url.searchParams.get("date") ?? to;
    const docs = await db.select().from(documents)
      .where(and(eq(documents.date, day), inArray(documents.docType, ["SINV", "POS", "SRET"])))
      .orderBy(documents.id);
    const vchs = await db.select().from(vouchers)
      .where(and(eq(vouchers.date, day), inArray(vouchers.voucherType, ["CRV", "BRV", "CPV", "BPV"])))
      .orderBy(vouchers.id);
    const allP = await db.select().from(parties);
    const pname = (id: number | null) => (id ? allP.find((p) => p.id === id)?.name ?? "#" + id : "Walk-in");

    const sales = docs.map((d) => ({
      id: d.id, docNo: d.docNo, docType: d.docType, party: pname(d.partyId),
      subtotal: num(d.subtotal), salesTax: num(d.salesTax), furtherTax: num(d.furtherTax),
      grandTotal: num(d.grandTotal), paid: num(d.paidAmount), mode: d.paymentMode, status: d.status,
    }));
    const recovery = vchs.map((v) => {
      const cr = num(v.totalCredit), dr = num(v.totalDebit);
      return {
        id: v.id, voucherNo: v.voucherNo, voucherType: v.voucherType,
        party: pname(v.partyId), amount: cr > 0 ? cr : dr,
        direction: ["CRV", "BRV"].includes(v.voucherType) ? "Received" : "Paid",
        narration: v.narration ?? "", status: v.status,
      };
    });
    return NextResponse.json({
      date: day,
      totals: {
        sales: sales.filter((s) => s.docType !== "SRET").reduce((a, s) => a + s.grandTotal, 0),
        returns: sales.filter((s) => s.docType === "SRET").reduce((a, s) => a + s.grandTotal, 0),
        received: recovery.filter((r) => r.direction === "Received" && r.status !== "Cancelled").reduce((a, r) => a + r.amount, 0),
        paid: recovery.filter((r) => r.direction === "Paid" && r.status !== "Cancelled").reduce((a, r) => a + r.amount, 0),
      },
      sales, recovery,
    });
  }

  /* ---------- General Ledger of one account (drill-down from TB / P&L / BS) ---------- */
  if (type === "account-ledger") {
    const accId = Number(url.searchParams.get("accountId"));
    const accRows = await db.select().from(accounts).where(eq(accounts.id, accId)).limit(1);
    if (!accRows[0]) return NextResponse.json({ error: "Account not found" }, { status: 404 });
    const acc = accRows[0];

    const openingRows = await db
      .select({ dr: sql<string>`coalesce(sum(${voucherLines.debit}),0)`, cr: sql<string>`coalesce(sum(${voucherLines.credit}),0)` })
      .from(voucherLines)
      .innerJoin(vouchers, eq(voucherLines.voucherId, vouchers.id))
      .where(and(eq(voucherLines.accountId, accId), eq(vouchers.status, "Posted"), sql`${vouchers.date} < ${from}`));
    const openingDr = num(acc.openingDebit) + num(openingRows[0]?.dr);
    const openingCr = num(acc.openingCredit) + num(openingRows[0]?.cr);

    const lines = await db
      .select({
        id: voucherLines.id, date: vouchers.date, voucherNo: vouchers.voucherNo,
        voucherType: vouchers.voucherType, narration: voucherLines.narration,
        vNarration: vouchers.narration, debit: voucherLines.debit, credit: voucherLines.credit,
        status: vouchers.status,
      })
      .from(voucherLines)
      .innerJoin(vouchers, eq(voucherLines.voucherId, vouchers.id))
      .where(and(eq(voucherLines.accountId, accId), gte(vouchers.date, from), lte(vouchers.date, to)))
      .orderBy(vouchers.date, voucherLines.id);

    let run = openingDr - openingCr;
    const ledger = lines.map((l) => {
      run += num(l.debit) - num(l.credit);
      return { ...l, balance: Math.round(run * 100) / 100 };
    });

    return NextResponse.json({
      account: acc, from, to,
      openingDr: Math.round(openingDr * 100) / 100, openingCr: Math.round(openingCr * 100) / 100,
      openingBalance: Math.round((openingDr - openingCr) * 100) / 100,
      periodDr: Math.round(lines.reduce((a, l) => a + num(l.debit), 0) * 100) / 100,
      periodCr: Math.round(lines.reduce((a, l) => a + num(l.credit), 0) * 100) / 100,
      closingBalance: Math.round(run * 100) / 100,
      ledger,
    });
  }

  if (type === "commission") {
    const sms = await db.select().from(salesmen);
    const docs = await db.select().from(documents).where(sql`${documents.docType} in ('SINV','POS') and ${documents.date} >= ${from} and ${documents.date} <= ${to} and ${documents.status} != 'Cancelled'`);
    const rows = sms.map((s) => {
      const mine = docs.filter((d) => d.salesmanId === s.id);
      const volume = mine.reduce((a, d) => a + num(d.grandTotal), 0);
      const earned = (volume * num(s.commissionRate)) / 100;
      return { id: s.id, name: s.name, area: s.area, rate: num(s.commissionRate), invoices: mine.length, volume: Math.round(volume), earned: Math.round(earned * 100) / 100, paid: 0, outstanding: Math.round(earned * 100) / 100 };
    });
    return NextResponse.json({ rows });
  }

  // Master commission ledger sub-report displaying invoice-by-invoice, item-by-item commission shares
  if (type === "commission-ledger") {
    const salesmanId = Number(url.searchParams.get("salesmanId"));
    const salesRep = await db.select().from(salesmen).where(eq(salesmen.id, salesmanId)).limit(1);
    if (!salesRep[0]) return NextResponse.json({ error: "Salesman not found" }, { status: 404 });
    const s = salesRep[0];

    const docs = await db.select().from(documents).where(sql`doc_type in ('SINV','POS') and salesman_id = ${salesmanId} and date >= ${from} and date <= ${to} and status != 'Cancelled'`);
    const docIds = docs.map((d) => d.id);
    
    if (!docIds.length) {
      return NextResponse.json({ salesman: s, lines: [] });
    }

    const lines = await db.select().from(documentLines).where(inArray(documentLines.documentId, docIds));
    const allItems = await db.select().from(items);
    const allParties = await db.select().from(parties);

    const reportLines = [];
    for (const l of lines) {
      const d = docs.find((x) => x.id === l.documentId)!;
      const client = allParties.find((p) => p.id === d.partyId)?.name ?? "Walk-in Customer";
      const product = allItems.find((i) => i.id === l.itemId);
      const itemDesc = product ? `${product.code} — ${product.name}` : l.description ?? "General Item";
      
      const lineTotal = num(l.amount);
      const lineComm = (lineTotal * num(s.commissionRate)) / 100;

      reportLines.push({
        id: l.id,
        docNo: d.docNo,
        docType: d.docType,
        date: d.date,
        client,
        itemDesc,
        qty: num(l.qty),
        rate: num(l.rate),
        amount: lineTotal,
        commissionRate: num(s.commissionRate),
        commissionAmount: Math.round(lineComm * 100) / 100,
      });
    }

    return NextResponse.json({ salesman: s, lines: reportLines.sort((a,b) => String(b.date).localeCompare(String(a.date))) });
  }

  /* ---------- Online orders: revenue, cost & profit per order ---------- */
  if (type === "online-orders") {
    const onl = await db.select({ id: parties.id, name: parties.name }).from(parties).where(sql`lower(${parties.name}) like '%online%'`);
    const ids = onl.map((o) => o.id);
    if (!ids.length) return NextResponse.json({ rows: [], totals: { orders: 0, revenue: 0, cost: 0, profit: 0, tax: 0 } });

    const docs = await db.select().from(documents)
      .where(and(inArray(documents.partyId, ids), gte(documents.date, from), lte(documents.date, to), sql`${documents.docType} in ('SINV','POS')`, sql`${documents.status} != 'Cancelled'`))
      .orderBy(documents.date);
    const docIds = docs.map((d) => d.id);
    const lines = docIds.length ? await db.select().from(documentLines).where(inArray(documentLines.documentId, docIds)) : [];
    const allItems = await db.select().from(items);

    let revenue = 0, cost = 0, tax = 0;
    const rows = docs.map((d) => {
      const ls = lines.filter((l) => l.documentId === d.id);
      const rev = ls.reduce((a, l) => a + num(l.amount), 0);
      const cst = ls.reduce((a, l) => {
        const it = allItems.find((i) => i.id === l.itemId);
        return a + (it ? num(it.costPrice) * num(l.qty) : 0);
      }, 0);
      revenue += rev; cost += cst; tax += num(d.salesTax) + num(d.furtherTax);
      return {
        id: d.id, docNo: d.docNo, date: d.date, party: onl.find((o) => o.id === d.partyId)?.name ?? "Online",
        items: ls.length, revenue: Math.round(rev * 100) / 100, cost: Math.round(cst * 100) / 100,
        profit: Math.round((rev - cst) * 100) / 100,
        salesTax: num(d.salesTax), furtherTax: num(d.furtherTax),
        grandTotal: num(d.grandTotal), mode: d.paymentMode, status: d.status,
      };
    });

    return NextResponse.json({
      rows,
      totals: {
        orders: rows.length,
        revenue: Math.round(revenue * 100) / 100,
        cost: Math.round(cost * 100) / 100,
        profit: Math.round((revenue - cost) * 100) / 100,
        tax: Math.round(tax * 100) / 100,
      },
    });
  }

  if (type === "top-items") {
    const lines = await db.select().from(documentLines);
    const docs = await db.select().from(documents).where(sql`${documents.docType} in ('SINV','POS')`);
    const ids = new Set(docs.map((d) => d.id));
    const agg: Record<number, { qty: number; amount: number }> = {};
    for (const l of lines.filter((x) => ids.has(x.documentId) && x.itemId)) {
      agg[l.itemId!] ??= { qty: 0, amount: 0 };
      agg[l.itemId!].qty += num(l.qty);
      agg[l.itemId!].amount += num(l.amount);
    }
    const all = await db.select().from(items);
    const rows = Object.entries(agg).map(([itemId, v]) => {
      const it = all.find((x) => x.id === Number(itemId));
      return { itemId: Number(itemId), code: it?.code, name: it?.name, category: it?.category, ...v };
    }).sort((a, b) => b.amount - a.amount).slice(0, 20);
    return NextResponse.json({ rows });
  }

  return NextResponse.json({ error: "Unknown report type" }, { status: 400 });
}
