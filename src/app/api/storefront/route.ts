import { NextResponse } from "next/server";
import { db } from "@/db";
import { items, stockLedger, documents } from "@/db/schema";
import { sql } from "drizzle-orm";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO } from "@/lib/utils";
import { stockMap } from "@/app/api/items/route";

export async function GET() {
  await ensureSeed();
  const today = todayISO();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffISO = cutoff.toISOString().slice(0, 10);

  const all = await db.select().from(items).orderBy(items.name);
  const sm = await stockMap();
  const catalog = all.filter((i) => i.active).map((r) => {
    const s = sm[r.id] ?? { stock: num(r.openingStock), sold30: 0, soldTotal: 0 };
    return { ...r, stock: Math.round(s.stock * 100) / 100, sold30: s.sold30, soldTotal: s.soldTotal };
  });

  const soldToday = await db.select({ q: sql<string>`coalesce(sum(${stockLedger.qtyOut}),0)` }).from(stockLedger)
    .where(sql`${stockLedger.date} = ${today} and (${stockLedger.docType} = 'SINV' or ${stockLedger.docType} = 'POS')`);
  const sold30 = await db.select({ q: sql<string>`coalesce(sum(${stockLedger.qtyOut}),0)` }).from(stockLedger)
    .where(sql`${stockLedger.date} >= ${cutoffISO} and (${stockLedger.docType} = 'SINV' or ${stockLedger.docType} = 'POS')`);
  const invCount = await db.select({ c: sql<number>`count(*)` }).from(documents)
    .where(sql`${documents.docType} in ('SINV','POS')`);

  const totalStock = catalog.reduce((a, c) => a + Math.max(0, c.stock), 0);
  const categories = [...new Set(catalog.map((c) => c.category))].map((c) => ({
    name: c,
    count: catalog.filter((x) => x.category === c).length,
  }));
  const featured = catalog.filter((c) => c.featured);

  return NextResponse.json({
    stats: {
      products: catalog.length,
      totalStock: Math.round(totalStock),
      soldToday: num(soldToday[0]?.q),
      sold30: num(sold30[0]?.q),
      invoices: Number(invCount[0]?.c ?? 0),
    },
    categories,
    featured,
    catalog,
  });
}
