import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users, companies, branches } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyPassword, encodeSession, sessionCookie, clearSessionCookie, decodeSession, getUserPermissions } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";

export async function GET(req: Request) {
  await ensureSeed();
  const url = new URL(req.url);
  if (url.searchParams.get("options") === "1") {
    const companyRows = await db.select({ id: companies.id, name: companies.name, isDefault: companies.isDefault })
      .from(companies).orderBy(companies.name);
    const branchRows = await db.select({ id: branches.id, companyId: branches.companyId, code: branches.code, name: branches.name, isHeadOffice: branches.isHeadOffice })
      .from(branches).where(eq(branches.active, true)).orderBy(branches.name);
    return NextResponse.json({ companies: companyRows, branches: branchRows });
  }

  const cookieHeader = req.headers.get("cookie") ?? "";
  const m = cookieHeader.match(/erp_session=([^;]+)/);
  const user = decodeSession(m?.[1]);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });
  const dbu = await db.select({ picture: users.picture }).from(users).where(eq(users.id, user.id)).limit(1);
  const company = user.companyId ? await db.select({ name: companies.name }).from(companies).where(eq(companies.id, user.companyId)).limit(1) : [];
  const branch = user.branchId ? await db.select({ name: branches.name }).from(branches).where(eq(branches.id, user.branchId)).limit(1) : [];
  const perms = await getUserPermissions(user.id);
  return NextResponse.json({
    user: { ...user, picture: dbu[0]?.picture ?? null, companyName: company[0]?.name ?? null, branchName: user.allBranches ? "All Branches" : branch[0]?.name ?? null },
    permissions: perms,
  });
}

export async function POST(req: Request) {
  await ensureSeed();
  const body = await req.json().catch(() => ({}));
  if (body.action === "logout") {
    const jar = await cookies();
    jar.set("erp_session", "", { maxAge: 0, path: "/" });
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", clearSessionCookie());
    return res;
  }

  const { username, password } = body as { username?: string; password?: string };
  if (!username || !password) return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  const rows = await db.select().from(users).where(eq(users.username, username.trim())).limit(1);
  const u = rows[0];
  if (!u || !u.active || !verifyPassword(password, u.passwordHash)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const companyId = Number(body.companyId);
  if (!Number.isInteger(companyId) || companyId <= 0) return NextResponse.json({ error: "Select a company before signing in." }, { status: 400 });
  const companyRows = await db.select().from(companies).where(eq(companies.id, companyId)).limit(1);
  const company = companyRows[0];
  if (!company) return NextResponse.json({ error: "Selected company was not found." }, { status: 400 });

  const selectedBranchId = body.branchId === "" || body.branchId === null || body.branchId === undefined ? null : Number(body.branchId);
  let branch: typeof branches.$inferSelect | null = null;
  if (selectedBranchId !== null) {
    const b = await db.select().from(branches).where(and(eq(branches.id, selectedBranchId), eq(branches.companyId, companyId), eq(branches.active, true))).limit(1);
    if (!b[0]) return NextResponse.json({ error: "Selected branch does not belong to this company or is inactive." }, { status: 400 });
    branch = b[0];
  }

  if (u.role !== "admin") {
    if (u.companyId !== companyId) return NextResponse.json({ error: "Your user account is not assigned to this company." }, { status: 403 });
    if (u.branchId == null) return NextResponse.json({ error: "Your user account has no assigned branch. Ask a company administrator to assign one." }, { status: 403 });
    if (selectedBranchId !== u.branchId) return NextResponse.json({ error: "Your user account is not assigned to this branch." }, { status: 403 });
  }

  const session = {
    id: u.id, username: u.username, fullName: u.fullName, role: u.role, picture: u.picture ?? null,
    companyId, branchId: selectedBranchId, companyName: company.name,
    branchName: branch?.name ?? null,
    allBranches: u.role === "admin" && selectedBranchId === null,
  };
  const res = NextResponse.json({ ok: true, user: session });
  res.headers.set("Set-Cookie", sessionCookie(encodeSession(session)));
  return res;
}
