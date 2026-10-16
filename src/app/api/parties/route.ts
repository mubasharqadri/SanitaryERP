import { NextResponse } from "next/server";
import { db } from "@/db";
import { parties, partySites, documents, vouchers } from "@/db/schema";
import { eq, and, ilike, or, desc, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { audit } from "@/lib/posting";
import { scopedWhere, resolveWriteScope, type ScopedUser } from "@/lib/scope";

async function balances(partyId: number, type: string, user: ScopedUser) {
  const ds = scopedWhere(user, documents.companyId, documents.branchId, { branchOperational: true });
  const vs = scopedWhere(user, vouchers.companyId, vouchers.branchId, { branchOperational: true });
  const docs = await db.select().from(documents).where(and(eq(documents.partyId, partyId), ds));
  const vchs = await db.select().from(vouchers).where(and(eq(vouchers.partyId, partyId), vs));
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
  const scoped = scopedWhere(user as ScopedUser, parties.companyId, parties.branchId, { allowCompanyWide: true });
  if (id) {
    const rows = await db.select().from(parties).where(and(eq(parties.id, Number(id)), scoped));
    const p = rows[0];
    if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const sites = await db.select().from(partySites).where(eq(partySites.partyId, p.id));
    const docScope = scopedWhere(user as ScopedUser, documents.companyId, documents.branchId, { branchOperational: true });
    const docs = await db.select().from(documents).where(and(eq(documents.partyId, p.id), docScope)).orderBy(desc(documents.date)).limit(50);
    const b = await balances(p.id, p.type, user as ScopedUser);
    return NextResponse.json({ party: { ...p, ...b, outstanding: num(p.openingBalance) + b.balance }, sites, docs });
  }
  const conds = [];
  if (scoped) conds.push(scoped);
  if (type) conds.push(eq(parties.type, type));
  if (search) conds.push(or(ilike(parties.name, `%${search}%`), ilike(parties.city, `%${search}%`), ilike(parties.phone, `%${search}%`))!);
  const rows = await db.select().from(parties).where(conds.length ? and(...conds) : undefined).orderBy(parties.name);
  const out = [];
  for (const p of rows) {
    const b = await balances(p.id, p.type, user as ScopedUser);
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
    const ps = scopedWhere(user as ScopedUser, parties.companyId, parties.branchId, { allowCompanyWide: true });
    const owner = await db.select({ id: parties.id }).from(parties).where(and(eq(parties.id, Number(partyId)), ps)).limit(1);
    if (!owner[0]) return NextResponse.json({ error: "Party not found in your selected company/branch" }, { status: 404 });
    const partyScope = scopedWhere(user as ScopedUser, parties.companyId, parties.branchId, { allowCompanyWide: true });
    const parent = await db.select({ id: parties.id }).from(parties).where(and(eq(parties.id, Number(partyId)), partyScope)).limit(1);
    if (!parent[0]) return NextResponse.json({ error: "Party not found in your selected company/branch" }, { status: 404 });
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
  let writeScope;
  try { writeScope = await resolveWriteScope(user as ScopedUser, p.companyId ? Number(p.companyId) : undefined, p.branchId ? Number(p.branchId) : undefined); }
  catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid company/branch" }, { status: 400 }); }
  const rows = await db.insert(parties).values({
    type: p.type, name: p.name, cnic: p.cnic ?? null, ntn: p.ntn ?? null, strn: p.strn ?? null,
    phone: p.phone ?? null, mobile: p.mobile ?? null, email: p.email ?? null,
    area: p.area ?? null, city: p.city ?? null,
    openingBalance: String(p.openingBalance ?? 0), creditLimit: String(p.creditLimit ?? 0),
    salesmanId: p.salesmanId ? Number(p.salesmanId) : null,
    filerStatus: p.filerStatus ?? "filer", salesTaxRegistered: p.salesTaxRegistered ?? false,
    province: p.province ?? null, contactPic: p.contactPic || null,
    companyId: writeScope.companyId, branchId: writeScope.branchId, active: p.active ?? true,
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
  const rowScope = scopedWhere(user as ScopedUser, parties.companyId, parties.branchId, { allowCompanyWide: true });
  const existing = await db.select().from(parties).where(and(eq(parties.id, id), rowScope)).limit(1);
  if (!existing[0]) return NextResponse.json({ error: "Party not found in your selected company/branch" }, { status: 404 });
  await db.update(parties).set({
    name: p.name, cnic: p.cnic, ntn: p.ntn, strn: p.strn, phone: p.phone, mobile: p.mobile,
    email: p.email, area: p.area, city: p.city,
    openingBalance: p.openingBalance !== undefined ? String(p.openingBalance) : undefined,
    creditLimit: p.creditLimit !== undefined ? String(p.creditLimit) : undefined,
    salesmanId: p.salesmanId === null || p.salesmanId === "" ? null : (p.salesmanId !== undefined ? Number(p.salesmanId) : undefined),
    filerStatus: p.filerStatus, salesTaxRegistered: p.salesTaxRegistered, province: p.province,
    contactPic: p.contactPic, documents: p.documents,
    active: p.active, updatedAt: new Date(),
  }).where(and(eq(parties.id, id), rowScope));
  await audit(user.id, user.username, "update", "parties", String(id), p);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const rowScope = scopedWhere(user as ScopedUser, parties.companyId, parties.branchId, { allowCompanyWide: true });
  await db.delete(parties).where(and(eq(parties.id, id), rowScope));
  await audit(user.id, user.username, "delete", "parties", String(id), {});
  return NextResponse.json({ ok: true });
}
