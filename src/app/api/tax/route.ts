import { NextResponse } from "next/server";
import { db } from "@/db";
import { taxSettings, documents } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { getTaxSettings, aitRateFor, type AitSection, type FilerStatus } from "@/lib/tax";
import { audit } from "@/lib/posting";

/* GET → { settings, summary? }  summary when ?month=YYYY-MM (or ?from&to) */
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const settings = await getTaxSettings();
  const url = new URL(req.url);
  const month = url.searchParams.get("month");
  const from = url.searchParams.get("from") ?? (month ? `${month}-01` : null);
  const to = url.searchParams.get("to") ?? (month ? `${month}-31` : null);

  if (!from || !to) return NextResponse.json({ settings });

  const inRange = sql`${documents.date} >= ${from} and ${documents.date} <= ${to}`;
  const sum = async (types: string[], col: "salesTax" | "furtherTax" | "grandTotal" | "aitAmount" | "subtotal") => {
    const field = documents[col];
    const r = await db.select({ t: sql<string>`coalesce(sum(${field}),0)` }).from(documents)
      .where(sql`${documents.docType} in (${sql.join(types.map((t) => sql`${t}`), sql`,`)}) and ${inRange}`);
    return num(r[0]?.t);
  };

  const taxableSales = await sum(["SINV", "POS"], "subtotal");
  const outputTax = await sum(["SINV", "POS"], "salesTax");
  const furtherTaxOut = await sum(["SINV", "POS"], "furtherTax");
  const salesReturns = await sum(["SRET"], "grandTotal");
  const salesReturnTax = await sum(["SRET"], "salesTax");
  const taxablePurch = await sum(["PINV"], "subtotal");
  const inputTax = await sum(["PINV"], "salesTax");
  const furtherTaxIn = await sum(["PINV"], "furtherTax");
  const purchReturns = await sum(["PRET"], "grandTotal");
  const purchReturnTax = await sum(["PRET"], "salesTax");
  const aitOnSales = await sum(["SINV", "POS"], "aitAmount");
  const aitOnPurch = await sum(["PINV"], "aitAmount");

  const netOutput = outputTax - salesReturnTax;
  const netInput = inputTax - purchReturnTax;
  const netPayable = netOutput - netInput;

  // AIT breakdown by section (sales + purchases)
  const aitDocs = await db.select().from(documents).where(sql`${documents.docType} in ('SINV','POS','PINV') and ${inRange}`);
  const bySection: Record<string, { base: number; ait: number; count: number }> = {};
  for (const d of aitDocs) {
    const key = d.aitSection ?? "none";
    if (key === "none") continue;
    bySection[key] ??= { base: 0, ait: 0, count: 0 };
    bySection[key].base += num(d.subtotal);
    bySection[key].ait += num(d.aitAmount);
    bySection[key].count += 1;
  }

  return NextResponse.json({
    settings,
    summary: {
      from, to,
      taxableSales: r2(taxableSales), outputTax: r2(outputTax), furtherTaxOut: r2(furtherTaxOut),
      salesReturns: r2(salesReturns), salesReturnTax: r2(salesReturnTax),
      taxablePurch: r2(taxablePurch), inputTax: r2(inputTax), furtherTaxIn: r2(furtherTaxIn),
      purchReturns: r2(purchReturns), purchReturnTax: r2(purchReturnTax),
      netOutput: r2(netOutput), netInput: r2(netInput), netSalesTaxPayable: r2(netPayable),
      aitDeductedByCustomers: r2(aitOnSales), aitWithheldFromVendors: r2(aitOnPurch),
      bySection,
    },
  });
}

/* PUT → update settings (admin only) */
export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
  await ensureSeed();
  const body = await req.json();
  const s = await getTaxSettings();
  const n = (v: unknown, fallback: unknown) => (v === undefined || v === null || v === "" ? String(fallback) : String(Number(v)));
  await db.update(taxSettings).set({
    salesTaxRate: n(body.salesTaxRate, s.salesTaxRate),
    enableSalesTax: body.enableSalesTax ?? s.enableSalesTax,
    furtherTaxRate: n(body.furtherTaxRate, s.furtherTaxRate),
    enableFurtherTax: body.enableFurtherTax ?? s.enableFurtherTax,
    aitGoodsFiler: n(body.aitGoodsFiler, s.aitGoodsFiler),
    aitGoodsLate: n(body.aitGoodsLate, s.aitGoodsLate),
    aitGoodsNon: n(body.aitGoodsNon, s.aitGoodsNon),
    aitServicesFiler: n(body.aitServicesFiler, s.aitServicesFiler),
    aitServicesLate: n(body.aitServicesLate, s.aitServicesLate),
    aitServicesNon: n(body.aitServicesNon, s.aitServicesNon),
    aitContractFiler: n(body.aitContractFiler, s.aitContractFiler),
    aitContractLate: n(body.aitContractLate, s.aitContractLate),
    aitContractNon: n(body.aitContractNon, s.aitContractNon),
    defaultAitSection: body.defaultAitSection ?? s.defaultAitSection,
    enableAit: body.enableAit ?? s.enableAit,
    strictValidation: body.strictValidation ?? s.strictValidation,
    updatedAt: new Date(),
  }).where(eq(taxSettings.id, s.id));
  await audit(user.id, user.username, "update", "tax_settings", String(s.id), body);
  return NextResponse.json({ ok: true, settings: await getTaxSettings() });
}

/* POST { action: "rate", section, filer } → resolves current AIT rate (for invoice UIs) */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const body = await req.json();
  if (body.action === "rate") {
    const s = await getTaxSettings();
    const rate = aitRateFor(s, (body.section ?? "none") as AitSection, (body.filer ?? "non_filer") as FilerStatus);
    return NextResponse.json({ rate, salesTaxRate: num(s.salesTaxRate), furtherTaxRate: num(s.furtherTaxRate), enableSalesTax: s.enableSalesTax, enableFurtherTax: s.enableFurtherTax, enableAit: s.enableAit, defaultAitSection: s.defaultAitSection });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

function r2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
