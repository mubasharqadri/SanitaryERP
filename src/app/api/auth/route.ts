import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, encodeSession, sessionCookie, clearSessionCookie, decodeSession, getUserPermissions } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";

export async function GET(req: Request) {
  await ensureSeed();
  const cookieHeader = req.headers.get("cookie") ?? "";
  const m = cookieHeader.match(/erp_session=([^;]+)/);
  const user = decodeSession(m?.[1]);
  if (!user) return NextResponse.json({ user: null }, { status: 401 });
  const dbu = await db.select({ picture: users.picture }).from(users).where(eq(users.id, user.id)).limit(1);
  const perms = await getUserPermissions(user.id);
  return NextResponse.json({ user: { ...user, picture: dbu[0]?.picture ?? null }, permissions: perms });
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
  const session = { id: u.id, username: u.username, fullName: u.fullName, role: u.role, picture: u.picture ?? null };
  const res = NextResponse.json({ ok: true, user: session });
  res.headers.set("Set-Cookie", sessionCookie(encodeSession(session)));
  return res;
}
