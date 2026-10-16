import { NextResponse } from "next/server";
import { db } from "@/db";
import { users, permissions, salesmen, letterheads, companies, currencies, warehouses, branches, auditLog, incentives, documents, vouchers, stockLedger } from "@/db/schema";
import { eq, desc, sql, and } from "drizzle-orm";
import { getSessionUser, hashPassword, MENU_KEYS } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { audit } from "@/lib/posting";
import { scopedWhere, type ScopedUser } from "@/lib/scope";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const entity = url.searchParams.get("entity") ?? "users";
  const scopeUser = user as ScopedUser;
  if (entity === "users") {
    if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
    const rows = await db.select({ id: users.id, username: users.username, fullName: users.fullName, role: users.role, companyId: users.companyId, branchId: users.branchId, picture: users.picture, active: users.active, createdAt: users.createdAt }).from(users);
    return NextResponse.json({ rows, menuKeys: [...MENU_KEYS] });
  }
  if (entity === "permissions") {
    if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
    const uid = url.searchParams.get("userId");
    const rows = await db.select().from(permissions).where(uid ? eq(permissions.userId, Number(uid)) : undefined);
    return NextResponse.json({ rows, menuKeys: [...MENU_KEYS] });
  }
  if (entity === "branches") {
    if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
    const cid = url.searchParams.get("companyId");
    const rows = await db.select().from(branches).where(cid ? eq(branches.companyId, Number(cid)) : undefined).orderBy(branches.companyId, branches.isHeadOffice, branches.name);
    const cos = await db.select({ id: companies.id, name: companies.name }).from(companies);
    return NextResponse.json({ rows: rows.map((b) => ({ ...b, companyName: cos.find((c) => c.id === b.companyId)?.name ?? "Unknown company" })) });
  }
  if (entity === "salesmen") {
    const w = scopedWhere(scopeUser, salesmen.companyId, salesmen.branchId, { allowCompanyWide: true });
    return NextResponse.json({ rows: await db.select().from(salesmen).where(w).orderBy(salesmen.name) });
  }
  if (entity === "letterheads") {
    const w = scopedWhere(scopeUser, letterheads.companyId, letterheads.branchId, { allowCompanyWide: true });
    const rows = await db.select().from(letterheads).where(w).orderBy(desc(letterheads.isDefault), letterheads.name);
    return NextResponse.json({ rows });
  }
  if (entity === "companies") {
    const rows = user.role === "admin"
      ? await db.select().from(companies)
      : await db.select().from(companies).where(eq(companies.id, Number(user.companyId)));
    return NextResponse.json({ rows });
  }
  if (entity === "currencies") return NextResponse.json({ rows: await db.select().from(currencies) });
  if (entity === "warehouses") {
    const w = scopedWhere(scopeUser, warehouses.companyId, warehouses.branchId, { branchOperational: true });
    return NextResponse.json({ rows: await db.select().from(warehouses).where(w) });
  }
  if (entity === "incentives") {
    const w = scopedWhere(scopeUser, incentives.companyId, incentives.branchId, { branchOperational: true });
    return NextResponse.json({ rows: await db.select().from(incentives).where(w).orderBy(desc(incentives.date)).limit(200) });
  }
  if (entity === "audit") {
    const w = scopedWhere(scopeUser, auditLog.companyId, auditLog.branchId, { branchOperational: true });
    const rows = await db.select().from(auditLog).where(w).orderBy(desc(auditLog.id)).limit(300);
    return NextResponse.json({ rows });
  }
  return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
  const body = await req.json();
  const entity = body.entity as string;
  const d = body.data ?? {};
  if (entity === "users") {
    try {
      const rows = await db.insert(users).values({
        username: d.username, passwordHash: hashPassword(d.password || "123456"),
        fullName: d.fullName || d.username, role: d.role || "user",
        companyId: d.companyId ? Number(d.companyId) : null, branchId: d.branchId ? Number(d.branchId) : null, active: d.active ?? true,
      }).returning();
      await audit(user.id, user.username, "create", "users", String(rows[0].id), { username: d.username });
      return NextResponse.json({ row: { ...rows[0], passwordHash: undefined } });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "";
      if (msg.includes("duplicate") || msg.includes("unique")) return NextResponse.json({ error: "Username already exists" }, { status: 400 });
      throw e;
    }
  }
  if (entity === "permissions") {
    const { userId, menuKey, ...rights } = d;
    const existing = await db.select().from(permissions).where(eq(permissions.userId, Number(userId)));
    const found = existing.find((r) => r.menuKey === menuKey);
    const vals = {
      canView: !!rights.canView, canCreate: !!rights.canCreate, canEdit: !!rights.canEdit,
      canDelete: !!rights.canDelete, canPrint: !!rights.canPrint, canExport: !!rights.canExport,
      canUpload: !!rights.canUpload, canDownload: !!rights.canDownload,
    };
    if (found) await db.update(permissions).set(vals).where(eq(permissions.id, found.id));
    else await db.insert(permissions).values({ userId: Number(userId), menuKey, ...vals });
    return NextResponse.json({ ok: true });
  }
  if (entity === "branches") {
    const companyId = Number(d.companyId);
    if (!Number.isInteger(companyId) || !d.code?.trim() || !d.name?.trim()) return NextResponse.json({ error: "Company, branch code and branch name are required." }, { status: 400 });
    const co = await db.select({ id: companies.id }).from(companies).where(eq(companies.id, companyId)).limit(1);
    if (!co[0]) return NextResponse.json({ error: "Selected company was not found." }, { status: 400 });
    try {
      if (d.isHeadOffice) await db.update(branches).set({ isHeadOffice: false }).where(eq(branches.companyId, companyId));
      const rows = await db.insert(branches).values({ companyId, code: d.code.trim().toUpperCase(), name: d.name.trim(), address: d.address || null, phone: d.phone || null, isHeadOffice: !!d.isHeadOffice, active: d.active ?? true }).returning();
      await audit(user.id, user.username, "create", "branches", String(rows[0].id), rows[0]);
      return NextResponse.json({ row: rows[0] });
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      if (m.includes("unique") || m.includes("duplicate")) return NextResponse.json({ error: "That branch code already exists in this company." }, { status: 400 });
      return NextResponse.json({ error: m || "Could not create branch." }, { status: 400 });
    }
  }
  if (entity === "salesmen") {
    const rows = await db.insert(salesmen).values({ name: d.name, phone: d.phone || null, area: d.area || null, commissionRate: String(d.commissionRate ?? 0), active: d.active ?? true, pictures: d.pictures || null, documents: d.documents || null }).returning();
    await audit(user.id, user.username, "create", "salesmen", String(rows[0].id), rows[0]);
    return NextResponse.json({ row: rows[0] });
  }
  if (entity === "letterheads") {
    if (d.isDefault) await db.update(letterheads).set({ isDefault: false });
    const rows = await db.insert(letterheads).values({ companyId: d.companyId ? Number(d.companyId) : null, name: d.name, headerText: d.headerText || null, footerText: d.footerText || null, headerImage: d.headerImage || null, footerImage: d.footerImage || null, isDefault: !!d.isDefault }).returning();
    return NextResponse.json({ row: rows[0] });
  }
  if (entity === "companies") {
    if (d.isDefault) await db.update(companies).set({ isDefault: false });
    const rows = await db.insert(companies).values({ name: d.name, address: d.address || null, phone: d.phone || null, email: d.email || null, ntn: d.ntn || null, strn: d.strn || null, baseCurrencyId: d.baseCurrencyId ? Number(d.baseCurrencyId) : null, isDefault: !!d.isDefault, documents: d.documents || null }).returning();
    return NextResponse.json({ row: rows[0] });
  }
  if (entity === "currencies") {
    const rows = await db.insert(currencies).values({ code: d.code, name: d.name, symbol: d.symbol || "Rs", rateToBase: String(d.rateToBase ?? 1), isBase: !!d.isBase }).returning();
    return NextResponse.json({ row: rows[0] });
  }
  if (entity === "warehouses") {
    const rows = await db.insert(warehouses).values({ companyId: d.companyId ? Number(d.companyId) : null, code: d.code, name: d.name, address: d.address || null, active: d.active ?? true }).returning();
    return NextResponse.json({ row: rows[0] });
  }
  if (entity === "incentives") {
    const rows = await db.insert(incentives).values({ date: d.date, kind: d.kind, partyId: d.partyId ? Number(d.partyId) : null, documentId: d.documentId ? Number(d.documentId) : null, amount: String(d.amount ?? 0), narration: d.narration || null }).returning();
    return NextResponse.json({ row: rows[0] });
  }
  return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
  const body = await req.json();
  const entity = body.entity as string;
  const d = body.data ?? {};
  const id = Number(body.id);
  if (entity === "users") {
    await db.update(users).set({
      fullName: d.fullName, role: d.role, active: d.active,
      ...(d.picture !== undefined ? { picture: d.picture || null } : {}),
      ...(d.password ? { passwordHash: hashPassword(d.password) } : {}),
      companyId: d.companyId === null || d.companyId === "" ? null : (d.companyId ? Number(d.companyId) : undefined),
      branchId: d.branchId === null || d.branchId === "" ? null : (d.branchId ? Number(d.branchId) : undefined),
      updatedAt: new Date(),
    }).where(eq(users.id, id));
    await audit(user.id, user.username, "update", "users", String(id), { username: d.username });
    return NextResponse.json({ ok: true });
  }
  if (entity === "branches") {
    const existing = await db.select().from(branches).where(eq(branches.id, id)).limit(1);
    if (!existing[0]) return NextResponse.json({ error: "Branch not found." }, { status: 404 });
    if (existing[0].isHeadOffice && d.active === false) return NextResponse.json({ error: "Head Office cannot be closed. Assign another Head Office first." }, { status: 400 });
    const companyId = d.companyId ? Number(d.companyId) : existing[0].companyId;
    if (d.isHeadOffice) await db.update(branches).set({ isHeadOffice: false }).where(and(eq(branches.companyId, companyId), sql`${branches.id} <> ${id}`));
    try {
      await db.update(branches).set({ companyId, code: d.code?.trim().toUpperCase(), name: d.name?.trim(), address: d.address ?? null, phone: d.phone ?? null, isHeadOffice: !!d.isHeadOffice, active: d.active ?? existing[0].active, updatedAt: new Date() }).where(eq(branches.id, id));
      await audit(user.id, user.username, d.active === false ? "close" : "update", "branches", String(id), d);
      return NextResponse.json({ ok: true });
    } catch (e) {
      const m = e instanceof Error ? e.message : "";
      if (m.includes("unique") || m.includes("duplicate")) return NextResponse.json({ error: "That branch code already exists in this company." }, { status: 400 });
      return NextResponse.json({ error: m || "Could not update branch." }, { status: 400 });
    }
  }
  if (entity === "salesmen") {
    await db.update(salesmen).set({ name: d.name, phone: d.phone, area: d.area, commissionRate: d.commissionRate !== undefined ? String(d.commissionRate) : undefined, active: d.active, pictures: d.pictures, documents: d.documents, updatedAt: new Date() }).where(eq(salesmen.id, id));
    return NextResponse.json({ ok: true });
  }
  if (entity === "letterheads") {
    if (d.isDefault) await db.update(letterheads).set({ isDefault: false });
    await db.update(letterheads).set({ name: d.name, headerText: d.headerText, footerText: d.footerText, headerImage: d.headerImage, footerImage: d.footerImage, isDefault: d.isDefault }).where(eq(letterheads.id, id));
    return NextResponse.json({ ok: true });
  }
  if (entity === "companies") {
    if (d.isDefault) await db.update(companies).set({ isDefault: false });
    await db.update(companies).set({ name: d.name, address: d.address, phone: d.phone, email: d.email, ntn: d.ntn, strn: d.strn, isDefault: d.isDefault, documents: d.documents }).where(eq(companies.id, id));
    return NextResponse.json({ ok: true });
  }
  if (entity === "currencies") {
    await db.update(currencies).set({ code: d.code, name: d.name, symbol: d.symbol, rateToBase: d.rateToBase !== undefined ? String(d.rateToBase) : undefined, isBase: d.isBase }).where(eq(currencies.id, id));
    return NextResponse.json({ ok: true });
  }
  if (entity === "warehouses") {
    await db.update(warehouses).set({ code: d.code, name: d.name, address: d.address, active: d.active }).where(eq(warehouses.id, id));
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
  const url = new URL(req.url);
  const entity = url.searchParams.get("entity") ?? "";
  const id = Number(url.searchParams.get("id"));
  if (entity === "users") { await db.delete(users).where(eq(users.id, id)); await audit(user.id, user.username, "delete", "users", String(id), {}); }
  else if (entity === "branches") {
    const b = await db.select().from(branches).where(eq(branches.id, id)).limit(1);
    if (!b[0]) return NextResponse.json({ error: "Branch not found." }, { status: 404 });
    if (b[0].isHeadOffice) return NextResponse.json({ error: "The Head Office branch cannot be deleted. Close it only after assigning another Head Office." }, { status: 400 });
    const [u, d, v, st] = await Promise.all([
      db.select({ n: sql<number>`count(*)::int` }).from(users).where(eq(users.branchId, id)),
      db.select({ n: sql<number>`count(*)::int` }).from(documents).where(eq(documents.branchId, id)),
      db.select({ n: sql<number>`count(*)::int` }).from(vouchers).where(eq(vouchers.branchId, id)),
      db.select({ n: sql<number>`count(*)::int` }).from(stockLedger).where(eq(stockLedger.branchId, id)),
    ]);
    const history = Number(d[0]?.n ?? 0) + Number(v[0]?.n ?? 0) + Number(st[0]?.n ?? 0);
    if (Number(u[0]?.n ?? 0) > 0) return NextResponse.json({ error: "Cannot delete: users are assigned to this branch. Reassign them first." }, { status: 400 });
    if (history > 0) return NextResponse.json({ error: `Cannot delete: this branch has ${history} document, voucher, or stock-history row(s). Close the branch to preserve its audit trail.` }, { status: 400 });
    await db.delete(branches).where(eq(branches.id, id));
    await audit(user.id, user.username, "delete", "branches", String(id), { code: b[0].code, name: b[0].name });
  }
  else if (entity === "salesmen") await db.delete(salesmen).where(eq(salesmen.id, id));
  else if (entity === "letterheads") await db.delete(letterheads).where(eq(letterheads.id, id));
  else if (entity === "companies") await db.delete(companies).where(eq(companies.id, id));
  else if (entity === "currencies") await db.delete(currencies).where(eq(currencies.id, id));
  else if (entity === "warehouses") await db.delete(warehouses).where(eq(warehouses.id, id));
  else return NextResponse.json({ error: "Unknown entity" }, { status: 400 });
  return NextResponse.json({ ok: true });
}
