import { NextResponse } from "next/server";
import { db } from "@/db";
import { companies, branches, letterheads, fbrSettings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";

/** Print branding for the logged-in company + branch selection. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();

  const co = user.companyId ? await db.select().from(companies).where(eq(companies.id, user.companyId)).limit(1) : [];
  const br = user.branchId ? await db.select().from(branches).where(eq(branches.id, user.branchId)).limit(1) : [];
  const lh = user.companyId
    ? await db.select().from(letterheads).where(eq(letterheads.companyId, user.companyId)).orderBy(desc(letterheads.isDefault), desc(letterheads.id)).limit(1)
    : [];
  const fbr = await db.select().from(fbrSettings).limit(1);

  const company = co[0] ?? null;
  const branch = br[0] ?? null;

  return NextResponse.json({
    companyName: company?.name ?? "Awami ERP",
    branchName: branch?.name ?? null,
    branchCode: branch?.code ?? null,
    isHeadOffice: branch ? branch.isHeadOffice : true,
    allBranches: !!user.allBranches,
    address: branch?.address || company?.address || null,
    phone: branch?.phone || company?.phone || null,
    email: company?.email ?? null,
    ntn: company?.ntn ?? fbr[0]?.ntn ?? null,
    strn: company?.strn ?? fbr[0]?.strn ?? null,
    postedBy: user.fullName ?? null,
    letterhead: lh[0]
      ? {
          name: lh[0].name, headerText: lh[0].headerText, footerText: lh[0].footerText,
          headerImage: lh[0].headerImage, footerImage: lh[0].footerImage,
        }
      : null,
  });
}
