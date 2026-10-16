import { createHmac, scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users, permissions } from "@/db/schema";
import { eq, and } from "drizzle-orm";

const COOKIE = "erp_session";
const SECRET = process.env.SESSION_SECRET || "sanitary-erp-dev-secret-change-me";

export type SessionUser = {
  id: number;
  username: string;
  fullName: string;
  role: string;
  picture?: string | null;
  companyId?: number | null;
  branchId?: number | null;
  companyName?: string | null;
  branchName?: string | null;
  allBranches?: boolean;
};

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const derived = scryptSync(password, salt, 64).toString("hex");
    const a = Buffer.from(derived, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function encodeSession(u: SessionUser): string {
  const payload = Buffer.from(JSON.stringify(u)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string | undefined | null): SessionUser | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  try {
    const expected = sign(payload);
    const a = Buffer.from(sig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  return decodeSession(jar.get(COOKIE)?.value);
}

export async function requireSessionUser(): Promise<SessionUser> {
  const u = await getSessionUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}

export function sessionCookie(token: string) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}

export function clearSessionCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export const MENU_KEYS = [
  "dashboard",
  "customers",
  "vendors",
  "items",
  "warehouses",
  "stock",
  "quotations",
  "sales_orders",
  "sales",
  "purchase_orders",
  "purchases",
  "returns",
  "pos",
  "chart",
  "vouchers",
  "trial",
  "pl",
  "balance_sheet",
  "reports_sales",
  "reports_purchases",
  "reports_stock",
  "data_upload",
  "aging",
  "daily",
  "reports_tax",
  "reports_online",
  "tax_settings",
  "fbr_sync",
  "salesmen",
  "users",
  "permissions",
  "letterheads",
  "companies",
  "currencies",
  "integrity",
  "backup",
  "audit_log",
] as const;

export async function getUserPermissions(userId: number) {
  const rows = await db.select().from(permissions).where(eq(permissions.userId, userId));
  const map: Record<string, { view: boolean; create: boolean; edit: boolean; del: boolean; print: boolean; exp: boolean }> = {};
  for (const r of rows) {
    map[r.menuKey] = {
      view: r.canView, create: r.canCreate, edit: r.canEdit, del: r.canDelete, print: r.canPrint, exp: r.canExport,
    };
  }
  return map;
}

export async function can(user: SessionUser, menuKey: string, action: "view" | "create" | "edit" | "del" = "view"): Promise<boolean> {
  if (user.role === "admin") return true;
  const rows = await db
    .select()
    .from(permissions)
    .where(and(eq(permissions.userId, user.id), eq(permissions.menuKey, menuKey)));
  const p = rows[0];
  if (!p) return false;
  if (action === "view") return p.canView;
  if (action === "create") return p.canCreate;
  if (action === "edit") return p.canEdit;
  return p.canDelete;
}

export async function findUserByUsername(username: string) {
  const rows = await db.select().from(users).where(eq(users.username, username));
  return rows[0] ?? null;
}
