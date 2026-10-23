import { db } from "@/db";
import {
  companies, branches, currencies, users, permissions, salesmen, accounts,
  warehouses, parties, partySites, items, letterheads, documents, vouchers, stockLedger, incentives,
  taxSettings, fbrSettings,
} from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { eq, sql, and, isNull, or } from "drizzle-orm";

let seeded: Promise<void> | null = null;

export function ensureSeed(): Promise<void> {
  if (!seeded) seeded = (async () => {
    await runSeed();
    await ensureBranchSeed();
    await ensureTaxSeed();
  })().catch((e) => {
    seeded = null;
    throw e;
  });
  return seeded;
}

/** Ensure every company has a head-office branch and backfill legacy rows. */
export async function ensureBranchSeed(): Promise<void> {
  const comps = await db.select().from(companies);
  const defaultCompanyId = comps.find((c) => c.isDefault)?.id ?? comps[0]?.id ?? null;
  for (const c of comps) {
    let b = (await db.select().from(branches).where(and(eq(branches.companyId, c.id), eq(branches.code, "HO"))).limit(1))[0];
    if (!b) {
      b = (await db.insert(branches).values({
        companyId: c.id, code: "HO", name: "Head Office", address: c.address ?? null,
        phone: c.phone ?? null, isHeadOffice: true, active: true,
      }).returning())[0];
    }
    const defaultCompany = c.id === defaultCompanyId;
    // Legacy staff: non-admins are assigned to the company's HO; admins remain all-branch capable.
    await db.update(users).set({ branchId: b.id }).where(and(eq(users.companyId, c.id), isNull(users.branchId), sql`${users.role} <> 'admin'`));
    // Assign company + HO to legacy operational records missing scope. Master records retain the company/branch association.
    const nullCompany = defaultCompany ? isNull(warehouses.companyId) : sql`false`;
    await db.update(warehouses).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(warehouses.companyId, c.id), nullCompany), isNull(warehouses.branchId)));
    const nullAccCompany = defaultCompany ? isNull(accounts.companyId) : sql`false`;
    await db.update(accounts).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(accounts.companyId, c.id), nullAccCompany), isNull(accounts.branchId)));
    const nullSalesCompany = defaultCompany ? isNull(salesmen.companyId) : sql`false`;
    await db.update(salesmen).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(salesmen.companyId, c.id), nullSalesCompany), isNull(salesmen.branchId)));
    const nullPartyCompany = defaultCompany ? isNull(parties.companyId) : sql`false`;
    await db.update(parties).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(parties.companyId, c.id), nullPartyCompany), isNull(parties.branchId)));
    const nullItemCompany = defaultCompany ? isNull(items.companyId) : sql`false`;
    await db.update(items).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(items.companyId, c.id), nullItemCompany), isNull(items.branchId)));
    const nullDocCompany = defaultCompany ? isNull(documents.companyId) : sql`false`;
    await db.update(documents).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(documents.companyId, c.id), nullDocCompany), isNull(documents.branchId)));
    const nullVoucherCompany = defaultCompany ? isNull(vouchers.companyId) : sql`false`;
    await db.update(vouchers).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(vouchers.companyId, c.id), nullVoucherCompany), isNull(vouchers.branchId)));
    const nullStockCompany = defaultCompany ? isNull(stockLedger.companyId) : sql`false`;
    await db.update(stockLedger).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(stockLedger.companyId, c.id), nullStockCompany), isNull(stockLedger.branchId)));
    const nullLetterCompany = defaultCompany ? isNull(letterheads.companyId) : sql`false`;
    await db.update(letterheads).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(letterheads.companyId, c.id), nullLetterCompany), isNull(letterheads.branchId)));
    const nullFbrCompany = defaultCompany ? isNull(fbrSettings.companyId) : sql`false`;
    await db.update(fbrSettings).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(fbrSettings.companyId, c.id), nullFbrCompany), isNull(fbrSettings.branchId)));
    const nullIncentiveCompany = defaultCompany ? isNull(incentives.companyId) : sql`false`;
    await db.update(incentives).set({ companyId: c.id, branchId: b.id }).where(and(or(eq(incentives.companyId, c.id), nullIncentiveCompany), isNull(incentives.branchId)));
  }
}

/** PK tax + FBR defaults — idempotent, also repairs old placeholder STRN. */
export async function ensureTaxSeed(): Promise<void> {
  await db.execute(sql`ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_type_chk`);
  await db.execute(sql`ALTER TABLE documents ADD CONSTRAINT documents_type_chk
    CHECK (doc_type IN ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS','ADJ'))`);

  // Rebrand legacy seed company (safe: only touches the original seed name)
  await db.update(companies).set({ name: "Awami ERP" })
    .where(sql`${companies.name} in ('Al-Noor Sanitary & Tiles', 'Al Noor Sanitary & Tiles')`);
  await db.update(letterheads).set({ headerText: sql`replace(${letterheads.headerText}, 'AL-NOOR SANITARY & TILES', 'AWAMI ERP')` })
    .where(sql`${letterheads.headerText} like '%AL-NOOR SANITARY & TILES%'`);
  await db.update(fbrSettings).set({ businessName: "Awami ERP" })
    .where(sql`${fbrSettings.businessName} in ('Al-Noor Sanitary & Tiles', 'Al Noor Sanitary & Tiles')`);

  const t = await db.select().from(taxSettings).limit(1);
  if (!t[0]) await db.insert(taxSettings).values({});
  const f = await db.select().from(fbrSettings).limit(1);
  const comps = await db.select().from(companies).limit(1);
  const c = comps[0];
  if (c && (c.strn === "STRN-001122" || !c.strn)) {
    await db.update(companies).set({ strn: "3277876123456" }).where(eq(companies.id, c.id));
  }
  if (!f[0]) {
    await db.insert(fbrSettings).values({
      companyId: c?.id ?? null, businessName: c?.name ?? "Business",
      ntn: c?.ntn ?? "1234567-8", strn: c?.strn && c.strn !== "STRN-001122" ? c.strn : "3277876123456",
      address: c?.address ?? null, province: "Punjab", environment: "sandbox",
      posId: "POS-01", usinPrefix: "USIN", autoSync: false, isActive: true,
    });
  } else if (f[0].strn === "STRN-001122" || !f[0].strn) {
    await db.update(fbrSettings).set({ strn: "3277876123456" }).where(eq(fbrSettings.id, f[0].id));
  }
  for (const a of [
    { code: "1310", name: "AIT Deducted at Source (Receivable)", type: "Asset" },
    { code: "2110", name: "Further Tax Payable", type: "Liability" },
  ]) {
    const rows = await db.select().from(accounts).where(eq(accounts.code, a.code)).limit(1);
    if (!rows[0]) await db.insert(accounts).values({ code: a.code, name: a.name, type: a.type, isSystem: true });
  }
}

async function runSeed() {
  const existing = await db.select({ id: users.id }).from(users).where(eq(users.username, "admin")).limit(1);
  if (existing.length > 0) return;

  const curRows = await db.insert(currencies).values([
    { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", rateToBase: "1", isBase: true },
    { code: "USD", name: "US Dollar", symbol: "$", rateToBase: "278.5", isBase: false },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", rateToBase: "38.4", isBase: false },
  ]).returning();
  const pkr = curRows.find((c) => c.code === "PKR")!;

  const comp = (await db.insert(companies).values({
    name: "Awami ERP", address: "Main G.T. Road, Gujranwala, Pakistan",
    phone: "055-1234567", email: "info@alnoorsanitry.pk", ntn: "1234567-8",
    strn: "3277876123456", baseCurrencyId: pkr.id, isDefault: true,
  }).returning())[0];
  const ho = (await db.insert(branches).values({
    companyId: comp.id, code: "HO", name: "Head Office", address: comp.address,
    phone: comp.phone, isHeadOffice: true, active: true,
  }).returning())[0];

  const coa: Array<{ code: string; name: string; type: string; openingDebit?: string; openingCredit?: string; isSystem?: boolean }> = [
    { code: "1001", name: "Cash in Hand", type: "Asset", openingDebit: "500000", isSystem: true },
    { code: "1002", name: "Bank - Meezan A/C", type: "Asset", openingDebit: "1500000", isSystem: true },
    { code: "1100", name: "Accounts Receivable", type: "Asset", isSystem: true },
    { code: "1200", name: "Inventory", type: "Asset", openingDebit: "2500000", isSystem: true },
    { code: "1300", name: "Advances & Prepayments", type: "Asset" },
    { code: "1310", name: "AIT Deducted at Source (Receivable)", type: "Asset", isSystem: true },
    { code: "2001", name: "Accounts Payable", type: "Liability", isSystem: true },
    { code: "2100", name: "Sales Tax Payable", type: "Liability", isSystem: true },
    { code: "2110", name: "Further Tax Payable", type: "Liability", isSystem: true },
    { code: "2200", name: "Withholding / Income Tax Payable", type: "Liability" },
    { code: "3001", name: "Owner Capital", type: "Equity", openingCredit: "4500000", isSystem: true },
    { code: "3002", name: "Retained Earnings", type: "Equity" },
    { code: "4000", name: "Sales Revenue", type: "Income", isSystem: true },
    { code: "4100", name: "Sales Discount Allowed", type: "Expense" },
    { code: "4200", name: "Incentive Income", type: "Income" },
    { code: "5000", name: "Purchases", type: "Expense", isSystem: true },
    { code: "5100", name: "Purchase Returns", type: "Income" },
    { code: "5200", name: "Transport Expense", type: "Expense" },
    { code: "5300", name: "Labor Expense", type: "Expense" },
    { code: "5400", name: "Salaries Expense", type: "Expense" },
    { code: "5500", name: "Commission Expense", type: "Expense" },
    { code: "5600", name: "General Expense", type: "Expense" },
  ];
  for (const a of coa) await db.insert(accounts).values({ ...a, companyId: comp.id, branchId: ho.id });

  const whRows = await db.insert(warehouses).values([
    { companyId: comp.id, branchId: ho.id, code: "WH-01", name: "Main Godown - Gujranwala", address: "G.T. Road Godown #4" },
    { companyId: comp.id, branchId: ho.id, code: "WH-02", name: "Showroom Stock", address: "Main Showroom Basement" },
  ]).returning();
  const mainWh = whRows[0];
  const smRows = await db.insert(salesmen).values([
    { companyId: comp.id, branchId: ho.id, name: "Rashid Mehmood", phone: "0301-1112233", area: "Gujranwala City", commissionRate: "2.5" },
    { companyId: comp.id, branchId: ho.id, name: "Imran Khan", phone: "0302-4455667", area: "Sialkot / Daska", commissionRate: "3" },
    { companyId: comp.id, branchId: ho.id, name: "Bilal Ahmed", phone: "0303-7788990", area: "Lahore", commissionRate: "2" },
  ]).returning();

  const custData = [
    { name: "Haji Traders", city: "Gujranwala", area: "Model Town", phone: "055-1111111", mobile: "0300-1111111", openingBalance: "125000", creditLimit: "500000", salesmanId: smRows[0].id, ntn: "2345678-1", strn: "3277876111001", cnic: "34101-1234567-8", filerStatus: "filer", salesTaxRegistered: true, province: "Punjab" },
    { name: "City Sanitary Store", city: "Sialkot", area: "Commissioner Road", phone: "052-2222222", mobile: "0300-2222222", openingBalance: "85000", creditLimit: "300000", salesmanId: smRows[1].id, ntn: "3456789-2", strn: "", cnic: "34202-7654321-9", filerStatus: "late_filer", salesTaxRegistered: false, province: "Punjab" },
    { name: "Modern Bath Gallery", city: "Lahore", area: "DHA Phase 2", phone: "042-3333333", mobile: "0300-3333333", openingBalance: "0", creditLimit: "1000000", salesmanId: smRows[2].id, ntn: "4567890-3", strn: "3277876111002", cnic: "35202-1111111-5", filerStatus: "filer", salesTaxRegistered: true, province: "Punjab" },
    { name: "Royal Builders", city: "Gujranwala", area: "Citi Housing", phone: "055-4444444", mobile: "0300-4444444", openingBalance: "250000", creditLimit: "2000000", salesmanId: smRows[0].id, ntn: "", strn: "", cnic: "34101-9999999-1", filerStatus: "non_filer", salesTaxRegistered: false, province: "Punjab" },
    { name: "Walk-in Customer", city: "Gujranwala", area: "Counter", phone: "-", mobile: "-", openingBalance: "0", creditLimit: "0", salesmanId: null, ntn: "", strn: "", cnic: "", filerStatus: "non_filer", salesTaxRegistered: false, province: "Punjab" },
    { name: "Online-Customer", city: "Web Orders", area: "Online Store", phone: "042-111-444-888", mobile: "0300-1112223", email: "orders@awamierp.pk", openingBalance: "0", creditLimit: "0", salesmanId: null, ntn: "", strn: "", cnic: "", filerStatus: "non_filer", salesTaxRegistered: false, province: "Punjab" },
  ];
  const custRows = [];
  for (const c of custData) {
    const r = await db.insert(parties).values({
      type: "customer", name: c.name, city: c.city, area: c.area, phone: c.phone, mobile: c.mobile,
      openingBalance: c.openingBalance, creditLimit: c.creditLimit, salesmanId: c.salesmanId,
      companyId: comp.id, cnic: c.cnic || null, ntn: c.ntn || null, strn: c.strn || null,
      filerStatus: c.filerStatus, salesTaxRegistered: c.salesTaxRegistered, province: c.province,
    }).returning();
    custRows.push(r[0]);
  }
  await db.insert(partySites).values([
    { partyId: custRows[3].id, siteName: "Citi Housing Site A", address: "Plot 44, Block C", contactPerson: "Ch. Aslam", contactNumber: "0300-9990001", creditLimit: "800000" },
    { partyId: custRows[3].id, siteName: "DHA Site B", address: "Plot 12, DHA", contactPerson: "Engr. Tariq", contactNumber: "0300-9990002", creditLimit: "600000" },
    { partyId: custRows[0].id, siteName: "Shop Godown", address: "Model Town Godown", contactPerson: "Haji Sahab", contactNumber: "0300-1111111", creditLimit: "200000" },
  ]);

  const vendData = [
    { name: "Pak Ceramics (Pvt) Ltd", city: "Karachi", area: "SITE", phone: "021-5555555", openingBalance: "320000", creditLimit: "1500000", ntn: "5678901-4", filerStatus: "filer", salesTaxRegistered: true },
    { name: "China Import - Guangzhou Li", city: "Guangzhou", area: "Import", phone: "+86-200000000", openingBalance: "0", creditLimit: "5000000", ntn: "", filerStatus: "non_filer", salesTaxRegistered: false },
    { name: "Lahore Brass Works", city: "Lahore", area: "Badami Bagh", phone: "042-6666666", openingBalance: "95000", creditLimit: "800000", ntn: "6789012-5", filerStatus: "filer", salesTaxRegistered: true },
    { name: "Steelline Accessories", city: "Karachi", area: "Korangi", phone: "021-7777777", openingBalance: "45000", creditLimit: "400000", ntn: "7890123-6", filerStatus: "late_filer", salesTaxRegistered: false },
  ];
  for (const v of vendData) await db.insert(parties).values({ type: "vendor", name: v.name, city: v.city, area: v.area, phone: v.phone, openingBalance: v.openingBalance, creditLimit: v.creditLimit, companyId: comp.id, ntn: v.ntn || null, filerStatus: v.filerStatus, salesTaxRegistered: v.salesTaxRegistered });

  const catalog = [
    { code: "SAN-001", barcode: "100001", name: "Commode - One Piece Deluxe", category: "Sanitary Ware", brand: "PakCeram", model: "OP-200", unit: "PCS", size: '26"x14"', color: "White", design: "Modern", origin: "Local", featured: true, costPrice: "14500", salePrice: "18500", reorderLevel: "4", openingStock: "25", hsCode: "6910.1000" },
    { code: "SAN-002", barcode: "100002", name: "Wall Hung Basin with Pedestal", category: "Sanitary Ware", brand: "PakCeram", model: "WB-110", unit: "PCS", size: '22"x18"', color: "Ivory", design: "Classic", origin: "Local", featured: true, costPrice: "6800", salePrice: "9200", reorderLevel: "6", openingStock: "40", hsCode: "6910.1000" },
    { code: "SAN-003", barcode: "100003", name: "Imported Vanity Unit Double Drawer", category: "Sanitary Ware", brand: "EuroBath", model: "VN-900", unit: "SET", size: "36 inch", color: "Grey Oak", design: "Premium", origin: "Imported", featured: true, costPrice: "42000", salePrice: "58500", reorderLevel: "2", openingStock: "8", hsCode: "9403.6000" },
    { code: "TIL-001", barcode: "200001", name: "Floor Tile Glossy - Marble Look", category: "Tiles", brand: "Stile", model: "FT-24", unit: "MTR", size: '24"x24"', color: "Bianco White", design: "Marble", origin: "Local", featured: true, costPrice: "2150", salePrice: "2890", reorderLevel: "100", openingStock: "1200", hsCode: "6907.2100" },
    { code: "TIL-002", barcode: "200002", name: "Bathroom Wall Tile Matte", category: "Tiles", brand: "KaramCeram", model: "WT-12", unit: "MTR", size: '12"x24"', color: "Sage Green", design: "Stone", origin: "Local", featured: false, costPrice: "1780", salePrice: "2450", reorderLevel: "80", openingStock: "900", hsCode: "6907.2100" },
    { code: "TIL-003", barcode: "200003", name: "Imported Porcelain Slab - Calacatta", category: "Tiles", brand: "Rovese", model: "PS-120", unit: "MTR", size: '120x60cm', color: "Calacatta Gold", design: "Luxury", origin: "Imported", featured: true, costPrice: "6900", salePrice: "9400", reorderLevel: "30", openingStock: "150", hsCode: "6907.2100" },
    { code: "BRS-001", barcode: "300001", name: "Bib Cock Heavy Brass - Lever", category: "Brass Fittings", brand: "LahoreBrass", model: "BC-500", unit: "PCS", size: '1/2"', color: "Chrome", design: "Lever", origin: "Local", featured: false, costPrice: "1150", salePrice: "1650", reorderLevel: "20", openingStock: "300", hsCode: "8481.8000" },
    { code: "BRS-002", barcode: "300002", name: "Wall Mixer - Hot & Cold", category: "Brass Fittings", brand: "LahoreBrass", model: "WM-800", unit: "PCS", size: '3/4"', color: "Chrome", design: "Square", origin: "Local", featured: true, costPrice: "4800", salePrice: "6900", reorderLevel: "10", openingStock: "85", hsCode: "8481.8000" },
    { code: "BRS-003", barcode: "300003", name: "Imported Rain Shower Set - SS304", category: "Brass Fittings", brand: "EuroBath", model: "RS-10", unit: "SET", size: '10"', color: "Brushed Steel", design: "Rainfall", origin: "Imported", featured: true, costPrice: "16500", salePrice: "22800", reorderLevel: "3", openingStock: "12", hsCode: "8481.8000" },
    { code: "ACC-001", barcode: "400001", name: "PTMT Connection Pipe Pair", category: "Accessories", brand: "Steelline", model: "CP-24", unit: "PAIR", size: '24"', color: "Silver", design: "Braided", origin: "Local", featured: false, costPrice: "320", salePrice: "480", reorderLevel: "50", openingStock: "500", hsCode: "3917.3100" },
    { code: "ACC-002", barcode: "400002", name: "Waste Coupling + Bottle Trap Set", category: "Accessories", brand: "Steelline", model: "WT-01", unit: "SET", size: '1-1/4"', color: "Chrome", design: "Standard", origin: "Local", featured: false, costPrice: "890", salePrice: "1350", reorderLevel: "25", openingStock: "180", hsCode: "7324.9000" },
    { code: "ACC-003", barcode: "400003", name: "Imported Towel Rail + Shelf - Black", category: "Accessories", brand: "EuroBath", model: "TR-BLK", unit: "SET", size: '24"', color: "Matte Black", design: "Minimal", origin: "Imported", featured: false, costPrice: "3400", salePrice: "4950", reorderLevel: "5", openingStock: "3", hsCode: "7324.9000" },
  ];
  for (const it of catalog) await db.insert(items).values({ ...it, companyId: comp.id, warehouseId: mainWh.id } as never);

  const admin = (await db.insert(users).values({ username: "admin", passwordHash: hashPassword("admin123"), fullName: "Administrator", role: "admin", companyId: comp.id }).returning())[0];
  const cashier = (await db.insert(users).values({ username: "cashier", passwordHash: hashPassword("cash123"), fullName: "Counter Cashier", role: "cashier", companyId: comp.id, branchId: ho.id }).returning())[0];
  const menuDefaults: Record<string, { v: boolean; c: boolean; e: boolean }> = {
    dashboard: { v: true, c: false, e: false }, customers: { v: true, c: true, e: true },
    items: { v: true, c: false, e: false }, sales: { v: true, c: true, e: false },
    pos: { v: true, c: true, e: true }, stock: { v: true, c: false, e: false },
  };
  for (const [menuKey, p] of Object.entries(menuDefaults)) await db.insert(permissions).values({ userId: cashier.id, menuKey, canView: p.v, canCreate: p.c, canEdit: p.e, canDelete: false, canPrint: true, canExport: false });

  await db.insert(letterheads).values({
    companyId: comp.id, branchId: ho.id, name: "Standard",
    headerText: "AWAMI ERP\nWholesale & Retail: Sanitary Ware, Tiles, Brass Fittings & Accessories\nMain G.T. Road, Gujranwala | 055-1234567 | info@awamierp.pk\nNTN: 1234567-8 | STRN: 3277876123456",
    footerText: "Thank you for your business! | Goods once sold will not be returned without receipt within 7 days.", isDefault: true,
  });
}
