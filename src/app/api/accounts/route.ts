import { NextResponse } from "next/server";
import { db } from "@/db";
import { accounts, voucherLines, vouchers } from "@/db/schema";
import { eq, sql, and, gte, lte } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { audit } from "@/lib/posting";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  
  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  const rows = await db.select().from(accounts).orderBy(accounts.code);

  const conds = [eq(vouchers.status, "Posted")];
  if (from) conds.push(gte(vouchers.date, from));
  if (to) conds.push(lte(vouchers.date, to));

  // ledger sums per account filtered by date range
  const sums = await db
    .select({
      accountId: voucherLines.accountId,
      dr: sql<string>`coalesce(sum(${voucherLines.debit}),0)`,
      cr: sql<string>`coalesce(sum(${voucherLines.credit}),0)`,
    })
    .from(voucherLines)
    .innerJoin(vouchers, eq(voucherLines.voucherId, vouchers.id))
    .where(and(...conds))
    .groupBy(voucherLines.accountId);

  const map: Record<number, { dr: number; cr: number }> = {};
  for (const s of sums) if (s.accountId) map[s.accountId] = { dr: num(s.dr), cr: num(s.cr) };

  const out = rows.map((a) => {
    const m = map[a.id] ?? { dr: 0, cr: 0 };
    const tdr = num(a.openingDebit) + m.dr;
    const tcr = num(a.openingCredit) + m.cr;
    return { ...a, periodDr: m.dr, periodCr: m.cr, totalDr: tdr, totalCr: tcr, balance: tdr - tcr };
  });

  return NextResponse.json({ accounts: out });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  try {
    const rows = await db.insert(accounts).values({
      code: body.code, name: body.name, type: body.type,
      parentId: body.parentId ? Number(body.parentId) : null,
      openingDebit: String(body.openingDebit ?? 0), openingCredit: String(body.openingCredit ?? 0),
      prevYearDebit: String(body.prevYearDebit ?? 0), prevYearCredit: String(body.prevYearCredit ?? 0),
      active: body.active ?? true,
    }).returning();
    await audit(user.id, user.username, "create", "accounts", String(rows[0].id), rows[0]);
    return NextResponse.json({ account: rows[0] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Insert failed";
    if (msg.includes("duplicate") || msg.includes("unique")) return NextResponse.json({ error: `Account code "${body.code}" already exists.` }, { status: 400 });
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  await db.update(accounts).set({
    code: body.code, name: body.name, type: body.type,
    openingDebit: body.openingDebit !== undefined ? String(body.openingDebit) : undefined,
    openingCredit: body.openingCredit !== undefined ? String(body.openingCredit) : undefined,
    prevYearDebit: body.prevYearDebit !== undefined ? String(body.prevYearDebit) : undefined,
    prevYearCredit: body.prevYearCredit !== undefined ? String(body.prevYearCredit) : undefined,
    active: body.active, updatedAt: new Date(),
  }).where(eq(accounts.id, Number(body.id)));
  await audit(user.id, user.username, "update", "accounts", String(body.id), body);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  try {
    await db.delete(accounts).where(eq(accounts.id, id));
  } catch {
    return NextResponse.json({ error: "Cannot delete: this account has voucher entries." }, { status: 400 });
  }
  await audit(user.id, user.username, "delete", "accounts", String(id), {});
  return NextResponse.json({ ok: true });
}
