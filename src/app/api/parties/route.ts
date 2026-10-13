import { NextResponse } from "next/server";
import { db } from "@/db";
import { parties, partySites, documents, vouchers } from "@/db/schema";
import { eq, and, ilike, or, desc, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { audit } from "@/lib/posting";

async function balances(partyId: number, type: string) {
  const docs = await db.select().from(documents).where(eq(documents.partyId, partyId));
  const vchs = await db.select().from(vouchers).where(eq(vouchers.partyId, partyId));
  let invoiced = 0, returned = 0, settled = 0;
  for (const d of docs) {
    if (type === "customer") {
      if (d.docType === "SINV" || d.docType === "POS") invoiced += num(d.grandTotal);
      if (d.docType === "SRET") returned += num(d.grandTotal);
    } else {
      if (d.docType === "PINV") invoiced += num(d.grandTotal);
      if (d.docType === "PRET") returned += num(d.grandTotal);
    }
  }
  for (const v of vchs) {
    if (type === "customer" && (v.voucherType === "CRV" || v.voucherType === "BRV")) settled += num(v.totalCredit);
    if (type === "vendor" && (v.voucherType === "CPV" || v.voucherType === "BPV")) settled += num(v.totalDebit);
  }
  return { invoiced, returned, settled, balance: invoiced - returned - settled };
}

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const type = url.searchParams.get("type") ?? undefined;
  const search = url.searchParams.get("search") ?? "";
  const id = url.searchParams.get("id");
  if (id) {
    const rows = await db.select().from(parties).where(eq(parties.id, Number(id)));
    const p = rows[0];
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const sites = await db.select().from(partySites).where(eq(partySites.partyId, p.id));
    const docs = await db.select().from(documents).where(eq(documents.partyId, p.id)).orderBy(desc(documents.date)).limit(50);
    const b = await balances(p.id, p.type);
    return NextResponse.json({ party: { ...p, ...b, outstanding: num(p.openingBalance) + b.balance }, sites, docs });
  }
  const conds = [];
  if (type) conds.push(eq(parties.type, type));
  if (search) conds.push(or(ilike(parties.name, `%${search}%`), ilike(parties.city, `%${search}%`), ilike(parties.phone, `%${search}%`))!);
  const rows = await db.select().from(parties).where(conds.length ? and(...conds) : undefined).orderBy(parties.name);
  const out = [];
  for (const p of rows) {
    const b = await balances(p.id, p.type);
    const siteCount = await db.select({ c: sql<number>`count(*)` }).from(partySites).where(eq(partySites.partyId, p.id));
    out.push({ ...p, ...b, outstanding: num(p.openingBalance) + b.balance, siteCount: Number(siteCount[0]?.c ?? 0) });
  }
  return NextResponse.json({ parties: out });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (body.action === "site") {
    const { partyId, ...site } = body.site;
    const rows = await db.insert(partySites).values({ partyId: Number(partyId), ...site, creditLimit: String(site.creditLimit ?? 0) }).returning();
    await audit(user.id, user.username, "create", "party_sites", String(rows[0].id), rows[0]);
    return NextResponse.json({ site: rows[0] });
  }
  if (body.action === "site-delete") {
    await db.delete(partySites).where(eq(partySites.id, Number(body.siteId)));
    await audit(user.id, user.username, "delete", "party_sites", String(body.siteId), {});
    return NextResponse.json({ ok: true });
  }
  if (body.action === "site-toggle") {
    const r = await db.select().from(partySites).where(eq(partySites.id, Number(body.siteId)));
    if (!r[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await db.update(partySites).set({ isClosed: !r[0].isClosed }).where(eq(partySites.id, Number(body.siteId)));
    return NextResponse.json({ ok: true });
  }
  const p = body.party ?? body;
  const rows = await db.insert(parties).values({
    type: p.type, name: p.name, cnic: p.cnic ?? null, ntn: p.ntn ?? null, strn: p.strn ?? null,
    phone: p.phone ?? null, mobile: p.mobile ?? null, email: p.email ?? null,
    area: p.area ?? null, city: p.city ?? null,
    openingBalance: String(p.openingBalance ?? 0), creditLimit: String(p.creditLimit ?? 0),
    salesmanId: p.salesmanId ? Number(p.salesmanId) : null,
    filerStatus: p.filerStatus ?? "filer", salesTaxRegistered: p.salesTaxRegistered ?? false,
    province: p.province ?? null, contactPic: p.contactPic || null,
    companyId: p.companyId ? Number(p.companyId) : null, active: p.active ?? true,
  }).returning();
  await audit(user.id, user.username, "create", "parties", String(rows[0].id), rows[0]);
  return NextResponse.json({ party: rows[0] });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const url = new URL(req.url);
  const id = Number(body.id ?? url.searchParams.get("id"));
  const p = body.party ?? body;
  await db.update(parties).set({
    name: p.name, cnic: p.cnic, ntn: p.ntn, strn: p.strn, phone: p.phone, mobile: p.mobile,
    email: p.email, area: p.area, city: p.city,
    openingBalance: p.openingBalance !== undefined ? String(p.openingBalance) : undefined,
    creditLimit: p.creditLimit !== undefined ? String(p.creditLimit) : undefined,
    salesmanId: p.salesmanId === null || p.salesmanId === "" ? null : (p.salesmanId !== undefined ? Number(p.salesmanId) : undefined),
    filerStatus: p.filerStatus, salesTaxRegistered: p.salesTaxRegistered, province: p.province,
    active: p.active, updatedAt: new Date(),
  }).where(eq(parties.id, id));
  await audit(user.id, user.username, "update", "parties", String(id), p);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  await db.delete(parties).where(eq(parties.id, id));
  await audit(user.id, user.username, "delete", "parties", String(id), {});
  return NextResponse.json({ ok: true });
}
