import { NextResponse } from "next/server";
import { db } from "@/db";
import { vouchers, voucherLines } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num, todayISO } from "@/lib/utils";
import { nextVoucherNo, audit, round2 } from "@/lib/posting";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const type = url.searchParams.get("type");
  if (id) {
    const v = await db.select().from(vouchers).where(eq(vouchers.id, Number(id)));
    if (!v[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const lines = await db.select().from(voucherLines).where(eq(voucherLines.voucherId, Number(id)));
    return NextResponse.json({ voucher: v[0], lines });
  }
  const rows = await db.select().from(vouchers).where(type ? and(eq(vouchers.voucherType, type)) : undefined).orderBy(desc(vouchers.date), desc(vouchers.id)).limit(300);
  return NextResponse.json({ vouchers: rows });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const h = body.header ?? {};
  const lines = (body.lines ?? []) as Array<{ accountId: number; debit?: number; credit?: number; narration?: string; partyId?: number | null; analyticalDistribution?: string; chequeNo?: string; chequeDate?: string }>;
  if (lines.length < 2) return NextResponse.json({ error: "A voucher needs at least 2 lines" }, { status: 400 });
  let td = 0, tc = 0;
  for (const l of lines) { td += num(l.debit); tc += num(l.credit); }
  td = round2(td); tc = round2(tc);
  if (Math.abs(td - tc) > 0.01) return NextResponse.json({ error: `Voucher not balanced: Dr ${td} ≠ Cr ${tc}` }, { status: 400 });
  if (td <= 0) return NextResponse.json({ error: "Voucher total must be greater than zero" }, { status: 400 });
  const vType = String(h.voucherType || "JV");
  const date = String(h.date || todayISO());
  const vNo = await nextVoucherNo(vType, date);
  const vRows = await db.insert(vouchers).values({
    voucherType: vType, voucherNo: vNo, date, narration: h.narration || null,
    partyId: h.partyId ? Number(h.partyId) : null, // keep voucher level as optional, but also on lines
    documentId: h.documentId ? Number(h.documentId) : null,
    companyId: h.companyId ? Number(h.companyId) : null,
    currencyId: h.currencyId ? Number(h.currencyId) : null,
    createdBy: user.id, totalDebit: String(td), totalCredit: String(tc),
    documents: h.documents || null,
  }).returning();
  for (const l of lines) {
    await db.insert(voucherLines).values({
      voucherId: vRows[0].id,
      accountId: Number(l.accountId),
      debit: String(num(l.debit)),
      credit: String(num(l.credit)),
      narration: l.narration || null,
      partyId: l.partyId ? Number(l.partyId) : null,
      analyticalDistribution: l.analyticalDistribution || null,
      chequeNo: l.chequeNo || null,
      chequeDate: l.chequeDate || null,
    });
  }
  await audit(user.id, user.username, "create", "vouchers", String(vRows[0].id), { vType, vNo, total: td });
  return NextResponse.json({ voucher: vRows[0] });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const body = await req.json();
  const url = new URL(req.url);
  const id = Number(body.id ?? url.searchParams.get("id"));

  const vRows = await db.select().from(vouchers).where(eq(vouchers.id, id)).limit(1);
  if (!vRows[0]) return NextResponse.json({ error: "Voucher not found" }, { status: 404 });

  if (body.action === "cancel") {
    await db.update(vouchers).set({ status: "Cancelled", narration: `CANCELLED - ${vRows[0].narration ?? ""}` }).where(eq(vouchers.id, id));
    await audit(user.id, user.username, "cancel", "vouchers", String(id), {});
    return NextResponse.json({ ok: true });
  }

  // Edit Voucher:
  const h = body.header ?? {};
  const lines = (body.lines ?? []) as Array<{ accountId: number; debit?: number; credit?: number; narration?: string; partyId?: number | null; analyticalDistribution?: string; chequeNo?: string; chequeDate?: string }>;
  if (lines.length < 2) return NextResponse.json({ error: "A voucher needs at least 2 lines" }, { status: 400 });
  let td = 0, tc = 0;
  for (const l of lines) { td += num(l.debit); tc += num(l.credit); }
  td = round2(td); tc = round2(tc);
  if (Math.abs(td - tc) > 0.01) return NextResponse.json({ error: `Voucher not balanced: Dr ${td} ≠ Cr ${tc}` }, { status: 400 });
  if (td <= 0) return NextResponse.json({ error: "Voucher total must be greater than zero" }, { status: 400 });

  // Recreate lines
  await db.delete(voucherLines).where(eq(voucherLines.voucherId, id));
  await db.update(vouchers).set({
    date: String(h.date || vRows[0].date),
    narration: h.narration || null,
    partyId: h.partyId ? Number(h.partyId) : null,
    totalDebit: String(td),
    totalCredit: String(tc),
    status: h.status || vRows[0].status,
    documents: h.documents !== undefined ? (h.documents || null) : vRows[0].documents,
    updatedAt: new Date(),
  }).where(eq(vouchers.id, id));

  for (const l of lines) {
    await db.insert(voucherLines).values({
      voucherId: id,
      accountId: Number(l.accountId),
      debit: String(num(l.debit)),
      credit: String(num(l.credit)),
      narration: l.narration || null,
      partyId: l.partyId ? Number(l.partyId) : null,
      analyticalDistribution: l.analyticalDistribution || null,
      chequeNo: l.chequeNo || null,
      chequeDate: l.chequeDate || null,
    });
  }

  await audit(user.id, user.username, "update", "vouchers", String(id), { vNo: vRows[0].voucherNo, total: td });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  await db.delete(voucherLines).where(eq(voucherLines.voucherId, id));
  await db.delete(vouchers).where(eq(vouchers.id, id));
  await audit(user.id, user.username, "delete", "vouchers", String(id), {});
  return NextResponse.json({ ok: true });
}
