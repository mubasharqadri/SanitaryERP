import { db } from "@/db";
import { taxSettings, accounts, type TaxSettings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { num } from "@/lib/utils";

/* =====================================================================
   Pakistani Tax Engine
   - Sales Tax Act, 1990: standard 18% (s.3), Further Tax 4% (s.3(1A))
     on supplies to unregistered persons, zero-rated (Fifth Schedule),
     exempt (Sixth Schedule), reduced rates (Eighth Schedule).
   - Income Tax Ordinance, 2001 s.153: AIT withholding on goods /
     services / contracts at filer / late-filer / non-filer rates.
   Rates change via Finance Acts/SROs, so all rates are configurable
   in Settings → Tax (PK). Defaults below track recent law.
   ===================================================================== */

export const PK_SALES_TAX_STANDARD = 18;
export const PK_FURTHER_TAX = 4;

export type FilerStatus = "filer" | "late_filer" | "non_filer";
export type AitSection = "none" | "goods" | "services" | "contract";
export type TaxClass = "standard" | "reduced" | "zero" | "exempt";

export const FILER_LABELS: Record<FilerStatus, string> = {
  filer: "Filer (ATL)",
  late_filer: "Late Filer",
  non_filer: "Non-Filer",
};

export const AIT_LABELS: Record<AitSection, string> = {
  none: "No withholding",
  goods: "u/s 153(1)(a) — Goods",
  services: "u/s 153(1)(b) — Services",
  contract: "u/s 153(1)(c) — Contract/Work",
};

export const TAX_CLASS_LABELS: Record<TaxClass, string> = {
  standard: "Standard rated (18%)",
  reduced: "Reduced rate (8th Sch.)",
  zero: "Zero-rated (5th Sch.)",
  exempt: "Exempt (6th Sch.)",
};

/* ---------- NTN / STRN / CNIC format validation (FBR formats) ---------- */
// NTN: 7 digits + check digit, e.g. 1234567-8
export function validateNTN(v: string | null | undefined): boolean {
  if (!v) return false;
  return /^\d{7}-\d$/.test(v.trim());
}
// STRN: FBR issues numeric STRN (e.g. 3277876123456). Accept 10–15 digits,
// optionally with dashes/spaces.
export function validateSTRN(v: string | null | undefined): boolean {
  if (!v) return false;
  const digits = v.replace(/[^0-9]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
// CNIC: 5-7-1, e.g. 34101-1234567-8
export function validateCNIC(v: string | null | undefined): boolean {
  if (!v) return false;
  return /^\d{5}-\d{7}-\d$/.test(v.trim());
}

export function formatHint(kind: "ntn" | "strn" | "cnic"): string {
  if (kind === "ntn") return "Format: 1234567-8";
  if (kind === "strn") return "FBR numeric STRN, e.g. 3277876123456";
  return "Format: 34101-1234567-8";
}

/* ---------- Settings (auto-create defaults) ---------- */

export async function getTaxSettings(): Promise<TaxSettings> {
  const rows = await db.select().from(taxSettings).limit(1);
  if (rows[0]) return rows[0];
  const created = await db.insert(taxSettings).values({}).returning();
  return created[0];
}

/** Ensure withholding ledger accounts exist (1310 asset, 2200 liability). */
export async function ensureTaxAccounts(): Promise<void> {
  const need = [
    { code: "1310", name: "AIT Deducted at Source (Receivable)", type: "Asset" },
    { code: "2110", name: "Further Tax Payable", type: "Liability" },
  ];
  for (const a of need) {
    const rows = await db.select().from(accounts).where(eq(accounts.code, a.code)).limit(1);
    if (!rows[0]) {
      await db.insert(accounts).values({ code: a.code, name: a.name, type: a.type, isSystem: true });
    }
  }
}

/* ---------- Rate resolution ---------- */

export function aitRateFor(s: TaxSettings, section: AitSection, filer: FilerStatus): number {
  if (section === "none") return 0;
  if (section === "goods") {
    return filer === "filer" ? num(s.aitGoodsFiler) : filer === "late_filer" ? num(s.aitGoodsLate) : num(s.aitGoodsNon);
  }
  if (section === "services") {
    return filer === "filer" ? num(s.aitServicesFiler) : filer === "late_filer" ? num(s.aitServicesLate) : num(s.aitServicesNon);
  }
  return filer === "filer" ? num(s.aitContractFiler) : filer === "late_filer" ? num(s.aitContractLate) : num(s.aitContractNon);
}

/* ---------- Invoice tax computation ----------
   taxableValue  = value after invoice-level discounts (before tax)
   salesTax      = taxableValue × salesTaxRate%   (0 when exempt/zero)
   furtherTax    = (taxableValue + salesTax) × furtherRate% when buyer unregistered
                   (FBR practice: further tax applies on tax-inclusive value)
   grand         = taxableValue + salesTax + furtherTax + transport + labor
   aitAmount     = taxableValue × aitRate%  (withholding on supply value,
                   DEDUCTED from payable — never added to the bill)
   netPayable    = grand − aitAmount
------------------------------------------------------------------ */
export function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function computeInvoiceTax(opts: {
  taxableValue: number;
  salesTaxRate: number;
  taxExempt?: boolean;
  buyerRegistered: boolean;
  chargeFurtherTax: boolean;
  furtherTaxRate: number;
  transport?: number;
  labor?: number;
  aitSection: AitSection;
  aitRate: number;
}): {
  salesTax: number;
  furtherTax: number;
  grand: number;
  aitAmount: number;
  netPayable: number;
} {
  const taxable = Math.max(0, num(opts.taxableValue));
  const stRate = opts.taxExempt ? 0 : Math.max(0, num(opts.salesTaxRate));
  const salesTax = round2((taxable * stRate) / 100);
  const applyFurther = opts.chargeFurtherTax && !opts.buyerRegistered && !opts.taxExempt && taxable > 0;
  const ftRate = applyFurther ? Math.max(0, num(opts.furtherTaxRate)) : 0;
  const furtherTax = round2(((taxable + salesTax) * ftRate) / 100);
  const grand = round2(taxable + salesTax + furtherTax + num(opts.transport) + num(opts.labor));
  const aitRate = Math.max(0, num(opts.aitRate));
  const aitAmount = opts.aitSection === "none" ? 0 : round2((taxable * aitRate) / 100);
  return { salesTax, furtherTax, grand, aitAmount, netPayable: round2(Math.max(0, grand - aitAmount)) };
}
