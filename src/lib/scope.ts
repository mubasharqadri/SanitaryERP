import { and, eq, isNull, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { branches } from "@/db/schema";
import type { SessionUser } from "@/lib/auth";

export type ScopedUser = SessionUser & {
  companyId: number | null;
  branchId: number | null;
  companyName?: string | null;
  branchName?: string | null;
  allBranches?: boolean;
};

/** Build a safe data predicate. Shared master rows (branch_id IS NULL) remain visible inside the company. */
export function scopeConditions(
  user: ScopedUser,
  companyColumn: any,
  branchColumn?: any,
  options: { branchOperational?: boolean; allowCompanyWide?: boolean } = {},
): SQL[] {
  const out: SQL[] = [];
  if (user.companyId == null) {
    // No selected company must never mean "all companies" for a non-admin.
    if (user.role !== "admin") return [sql`false`];
  } else {
    out.push(eq(companyColumn, user.companyId));
  }
  if (!branchColumn) return out;
  if (user.role === "admin" && user.allBranches && user.branchId == null) return out;
  if (user.branchId == null) return [...out, sql`false`];
  if (options.allowCompanyWide && !options.branchOperational) {
    // Company master records can be shared across branches; HO-owned masters are also visible to branches.
    out.push(or(
      eq(branchColumn, user.branchId),
      isNull(branchColumn),
      sql`${branchColumn} in (select id from branches where company_id = ${user.companyId} and is_head_office = true)`,
    )!);
  } else {
    out.push(eq(branchColumn, user.branchId));
  }
  return out;
}

export function scopedWhere(user: ScopedUser, companyColumn: any, branchColumn?: any, options?: { branchOperational?: boolean; allowCompanyWide?: boolean }): SQL | undefined {
  const cs = scopeConditions(user, companyColumn, branchColumn, options);
  return cs.length ? and(...cs) : undefined;
}

/** Effective branch for writes. An admin with all-branch view writes to the company's HO branch unless explicitly selected. */
export async function resolveWriteScope(user: ScopedUser, requestedCompanyId?: number | null, requestedBranchId?: number | null) {
  const companyId = user.role === "admin" && requestedCompanyId ? requestedCompanyId : user.companyId;
  if (companyId == null) throw new Error("Choose a company before creating records.");

  if (user.role !== "admin") {
    if (requestedCompanyId != null && requestedCompanyId !== user.companyId) throw new Error("You cannot write to another company.");
    if (requestedBranchId != null && requestedBranchId !== user.branchId) throw new Error("You cannot write to another branch.");
    if (user.branchId == null) throw new Error("Your login has no assigned branch. Ask the administrator to assign one.");
    return { companyId, branchId: user.branchId };
  }

  const branchId = requestedBranchId ?? (companyId === user.companyId ? user.branchId : null);
  if (branchId != null) {
    const b = await db.select({ id: branches.id }).from(branches)
      .where(and(eq(branches.id, branchId), eq(branches.companyId, companyId))).limit(1);
    if (!b[0]) throw new Error("The selected branch does not belong to the selected company.");
    return { companyId, branchId };
  }

  const ho = await db.select({ id: branches.id }).from(branches)
    .where(and(eq(branches.companyId, companyId), eq(branches.isHeadOffice, true))).limit(1);
  if (!ho[0]) throw new Error("This company has no Head Office branch. Create one under Settings → Branches.");
  return { companyId, branchId: ho[0].id };
}
