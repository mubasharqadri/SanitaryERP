import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  numeric,
  date,
  jsonb,
  index,
  uniqueIndex,
  unique,
  check,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

/* ============ Currencies ============ */
export const currencies = pgTable(
  "currencies",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 10 }).notNull(),
    name: varchar("name", { length: 80 }).notNull(),
    symbol: varchar("symbol", { length: 10 }).notNull().default("Rs"),
    rateToBase: numeric("rate_to_base", { precision: 18, scale: 6 }).notNull().default("1"),
    isBase: boolean("is_base").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("currencies_code_uidx").on(t.code),
    check("currencies_rate_chk", sql`${t.rateToBase} >= 0`),
  ]
);

/* ============ Companies ============ */
export const companies = pgTable(
  "companies",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    address: text("address"),
    phone: varchar("phone", { length: 40 }),
    email: varchar("email", { length: 120 }),
    ntn: varchar("ntn", { length: 40 }),
    strn: varchar("strn", { length: 40 }),
    baseCurrencyId: integer("base_currency_id").references(() => currencies.id, { onDelete: "set null" }),
    isDefault: boolean("is_default").notNull().default(false),
    documents: text("documents"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [index("companies_currency_idx").on(t.baseCurrencyId)]
);

/* ============ Branches / locations ============ */
export const branches = pgTable(
  "branches",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").notNull().references(() => companies.id, { onDelete: "cascade" }),
    code: varchar("code", { length: 30 }).notNull(),
    name: varchar("name", { length: 140 }).notNull(),
    address: text("address"),
    phone: varchar("phone", { length: 40 }),
    isHeadOffice: boolean("is_head_office").notNull().default(false),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("branches_company_idx").on(t.companyId),
    unique("branches_company_code_uq").on(t.companyId, t.code),
  ]
);

/* ============ Users ============ */
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 60 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    fullName: varchar("full_name", { length: 120 }).notNull(),
    role: varchar("role", { length: 20 }).notNull().default("user"),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    picture: text("picture"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("users_username_uidx").on(t.username),
    index("users_company_idx").on(t.companyId),
    index("users_branch_idx").on(t.branchId),
    check("users_role_chk", sql`${t.role} in ('admin','manager','cashier','user')`),
  ]
);

/* ============ Permissions (Odoo-like menu rights) ============ */
export const permissions = pgTable(
  "permissions",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    menuKey: varchar("menu_key", { length: 60 }).notNull(),
    canView: boolean("can_view").notNull().default(false),
    canCreate: boolean("can_create").notNull().default(false),
    canEdit: boolean("can_edit").notNull().default(false),
    canDelete: boolean("can_delete").notNull().default(false),
    canPrint: boolean("can_print").notNull().default(false),
    canExport: boolean("can_export").notNull().default(false),
    // Bulk data-transfer rights (CSV import / template download)
    canUpload: boolean("can_upload").notNull().default(false),
    canDownload: boolean("can_download").notNull().default(false),
  },
  (t) => [
    index("permissions_user_idx").on(t.userId),
    unique("permissions_user_menu_uq").on(t.userId, t.menuKey),
  ]
);

/* ============ Salesmen ============ */
export const salesmen = pgTable(
  "salesmen",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    phone: varchar("phone", { length: 40 }),
    area: varchar("area", { length: 120 }),
    commissionRate: numeric("commission_rate", { precision: 8, scale: 3 }).notNull().default("0"),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    active: boolean("active").notNull().default(true),
    // Multiple images per salesman: face photo, CNIC front, CNIC back, resume, etc.
    pictures: text("pictures"),
    documents: text("documents"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    index("salesmen_name_idx").on(t.name),
    check("salesmen_comm_chk", sql`${t.commissionRate} >= 0`),
  ]
);

/* ============ Chart of Accounts ============ */
export const accounts = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 30 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    type: varchar("type", { length: 20 }).notNull(),
    parentId: integer("parent_id").references((): AnyPgColumn => accounts.id, { onDelete: "set null" }),
    openingDebit: numeric("opening_debit", { precision: 14, scale: 2 }).notNull().default("0"),
    openingCredit: numeric("opening_credit", { precision: 14, scale: 2 }).notNull().default("0"),
    prevYearDebit: numeric("prev_year_debit", { precision: 14, scale: 2 }).notNull().default("0"),
    prevYearCredit: numeric("prev_year_credit", { precision: 14, scale: 2 }).notNull().default("0"),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    isSystem: boolean("is_system").notNull().default(false),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("accounts_code_uidx").on(t.code),
    index("accounts_company_idx").on(t.companyId),
    index("accounts_branch_idx").on(t.branchId),
    index("accounts_type_idx").on(t.type),
    index("accounts_parent_idx").on(t.parentId),
    check("accounts_type_chk", sql`${t.type} in ('Asset','Liability','Equity','Income','Expense')`),
    check("accounts_od_chk", sql`${t.openingDebit} >= 0`),
    check("accounts_oc_chk", sql`${t.openingCredit} >= 0`),
  ]
);

/* ============ Warehouses ============ */
export const warehouses = pgTable(
  "warehouses",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    code: varchar("code", { length: 20 }).notNull(),
    name: varchar("name", { length: 120 }).notNull(),
    address: text("address"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [index("warehouses_company_idx").on(t.companyId), index("warehouses_code_idx").on(t.code)]
);

/* ============ Parties (customers & vendors) ============ */
export const parties = pgTable(
  "parties",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 20 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    cnic: varchar("cnic", { length: 30 }),
    ntn: varchar("ntn", { length: 40 }),
    strn: varchar("strn", { length: 40 }),
    phone: varchar("phone", { length: 40 }),
    mobile: varchar("mobile", { length: 40 }),
    email: varchar("email", { length: 120 }),
    area: varchar("area", { length: 120 }),
    city: varchar("city", { length: 80 }),
    province: varchar("province", { length: 40 }),
    // PK tax profile — Income Tax Ordinance 2001 (filer / late filer / non-filer)
    filerStatus: varchar("filer_status", { length: 20 }).notNull().default("filer"),
    // Sales Tax Act 1990 — registered person holds a valid STRN
    salesTaxRegistered: boolean("sales_tax_registered").notNull().default(false),
    openingBalance: numeric("opening_balance", { precision: 14, scale: 2 }).notNull().default("0"),
    creditLimit: numeric("credit_limit", { precision: 14, scale: 2 }).notNull().default("0"),
    salesmanId: integer("salesman_id").references(() => salesmen.id, { onDelete: "set null" }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    active: boolean("active").notNull().default(true),
    contactPic: text("contact_pic"),
    documents: text("documents"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    index("parties_type_idx").on(t.type),
    index("parties_name_idx").on(t.name),
    index("parties_city_idx").on(t.city),
    index("parties_salesman_idx").on(t.salesmanId),
    index("parties_company_idx").on(t.companyId),
    index("parties_filer_idx").on(t.filerStatus),
    check("parties_type_chk", sql`${t.type} in ('customer','vendor')`),
    check("parties_credit_chk", sql`${t.creditLimit} >= 0`),
    check("parties_filer_chk", sql`${t.filerStatus} in ('filer','late_filer','non_filer')`),
  ]
);

/* ============ Party sites ============ */
export const partySites = pgTable(
  "party_sites",
  {
    id: serial("id").primaryKey(),
    partyId: integer("party_id")
      .notNull()
      .references(() => parties.id, { onDelete: "cascade" }),
    siteName: varchar("site_name", { length: 140 }).notNull(),
    address: text("address"),
    contactPerson: varchar("contact_person", { length: 120 }),
    contactNumber: varchar("contact_number", { length: 40 }),
    creditLimit: numeric("credit_limit", { precision: 14, scale: 2 }).notNull().default("0"),
    isClosed: boolean("is_closed").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    index("party_sites_party_idx").on(t.partyId),
    check("party_sites_credit_chk", sql`${t.creditLimit} >= 0`),
  ]
);

/* ============ Items (product catalog) ============ */
export const items = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 40 }).notNull(),
    barcode: varchar("barcode", { length: 60 }),
    name: varchar("name", { length: 200 }).notNull(),
    category: varchar("category", { length: 80 }).notNull().default("General"),
    brand: varchar("brand", { length: 80 }),
    model: varchar("model", { length: 80 }),
    unit: varchar("unit", { length: 20 }).notNull().default("PCS"),
    size: varchar("size", { length: 60 }),
    color: varchar("color", { length: 60 }),
    design: varchar("design", { length: 80 }),
    origin: varchar("origin", { length: 20 }).notNull().default("Local"),
    featured: boolean("featured").notNull().default(false),
    costPrice: numeric("cost_price", { precision: 14, scale: 2 }).notNull().default("0"),
    salePrice: numeric("sale_price", { precision: 14, scale: 2 }).notNull().default("0"),
    reorderLevel: numeric("reorder_level", { precision: 14, scale: 2 }).notNull().default("0"),
    openingStock: numeric("opening_stock", { precision: 14, scale: 2 }).notNull().default("0"),
    // PK tax classification — Sales Tax Act 1990 schedules
    hsCode: varchar("hs_code", { length: 20 }),
    taxClass: varchar("tax_class", { length: 20 }).notNull().default("standard"),
    taxRate: numeric("tax_rate", { precision: 8, scale: 3 }).notNull().default("18"),
    warehouseId: integer("warehouse_id").references(() => warehouses.id, { onDelete: "set null" }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    active: boolean("active").notNull().default(true),
    documents: text("documents"),
    // Multiple product photos (comma-separated URLs) — several angles per item for the storefront
    pictures: text("pictures"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("items_code_uidx").on(t.code),
    index("items_barcode_idx").on(t.barcode),
    index("items_category_idx").on(t.category),
    index("items_brand_idx").on(t.brand),
    index("items_origin_idx").on(t.origin),
    index("items_featured_idx").on(t.featured),
    index("items_name_idx").on(t.name),
    index("items_hscode_idx").on(t.hsCode),
    check("items_origin_chk", sql`${t.origin} in ('Local','Imported')`),
    check("items_cost_chk", sql`${t.costPrice} >= 0`),
    check("items_sale_chk", sql`${t.salePrice} >= 0`),
    check("items_reorder_chk", sql`${t.reorderLevel} >= 0`),
    check("items_taxclass_chk", sql`${t.taxClass} in ('standard','reduced','zero','exempt')`),
    check("items_taxrate_chk", sql`${t.taxRate} >= 0 and ${t.taxRate} <= 100`),
  ]
);

/* ============ Sequences for monthly-resetting auto numbers ============ */
export const sequences = pgTable(
  "sequences",
  {
    id: serial("id").primaryKey(),
    prefix: varchar("prefix", { length: 20 }).notNull(),
    period: varchar("period", { length: 10 }).notNull(),
    lastNo: integer("last_no").notNull().default(0),
  },
  (t) => [unique("sequences_prefix_period_uq").on(t.prefix, t.period), index("sequences_prefix_idx").on(t.prefix)]
);

/* ============ Documents (QUOT/SO/SINV/PO/PINV/SRET/PRET/POS) ============ */
export const documents = pgTable(
  "documents",
  {
    id: serial("id").primaryKey(),
    docType: varchar("doc_type", { length: 10 }).notNull(),
    docNo: varchar("doc_no", { length: 40 }).notNull(),
    date: date("date").notNull(),
    partyId: integer("party_id").references(() => parties.id, { onDelete: "set null" }),
    warehouseId: integer("warehouse_id").references(() => warehouses.id, { onDelete: "set null" }),
    salesmanId: integer("salesman_id").references(() => salesmen.id, { onDelete: "set null" }),
    currencyId: integer("currency_id").references(() => currencies.id, { onDelete: "set null" }),
    exchangeRate: numeric("exchange_rate", { precision: 18, scale: 6 }).notNull().default("1"),
    subtotal: numeric("subtotal", { precision: 14, scale: 2 }).notNull().default("0"),
    discountPct: numeric("discount_pct", { precision: 8, scale: 3 }).notNull().default("0"),
    discountLumpsum: numeric("discount_lumpsum", { precision: 14, scale: 2 }).notNull().default("0"),
    salesTax: numeric("sales_tax", { precision: 14, scale: 2 }).notNull().default("0"),
    salesTaxRate: numeric("sales_tax_rate", { precision: 8, scale: 3 }).notNull().default("18"),
    // Further Tax u/s 3(1A), Sales Tax Act 1990 — supplies to unregistered persons
    furtherTax: numeric("further_tax", { precision: 14, scale: 2 }).notNull().default("0"),
    furtherTaxRate: numeric("further_tax_rate", { precision: 8, scale: 3 }).notNull().default("0"),
    incomeTax: numeric("income_tax", { precision: 14, scale: 2 }).notNull().default("0"),
    // Advance Income Tax (withholding) u/s 153, Income Tax Ordinance 2001 — deducted from payable
    aitRate: numeric("ait_rate", { precision: 8, scale: 3 }).notNull().default("0"),
    aitAmount: numeric("ait_amount", { precision: 14, scale: 2 }).notNull().default("0"),
    aitSection: varchar("ait_section", { length: 20 }).notNull().default("none"),
    buyerFilerStatus: varchar("buyer_filer_status", { length: 20 }),
    transportCharges: numeric("transport_charges", { precision: 14, scale: 2 }).notNull().default("0"),
    laborCharges: numeric("labor_charges", { precision: 14, scale: 2 }).notNull().default("0"),
    grandTotal: numeric("grand_total", { precision: 14, scale: 2 }).notNull().default("0"),
    paidAmount: numeric("paid_amount", { precision: 14, scale: 2 }).notNull().default("0"),
    paymentMode: varchar("payment_mode", { length: 20 }).notNull().default("credit"),
    status: varchar("status", { length: 20 }).notNull().default("Posted"),
    validUntil: date("valid_until"),
    // FBR Digital Invoicing (SRO 709(I)/2025, Rule 150Q) sync state
    fbrStatus: varchar("fbr_status", { length: 20 }).notNull().default("not_synced"),
    fbrInvoiceNo: varchar("fbr_invoice_no", { length: 60 }),
    fbrUsin: varchar("fbr_usin", { length: 60 }),
    fbrSyncedAt: timestamp("fbr_synced_at"),
    fbrQr: text("fbr_qr"),
    convertedFromId: integer("converted_from_id").references((): AnyPgColumn => documents.id, {
      onDelete: "set null",
    }),
    linkedInvoiceId: integer("linked_invoice_id").references((): AnyPgColumn => documents.id, {
      onDelete: "set null",
    }),
    notes: text("notes"),
    documents: text("documents"),
    // Captured at invoice level when selling to an unregistered walk-in buyer
    walkinName: varchar("walkin_name", { length: 160 }),
    walkinContact: varchar("walkin_contact", { length: 120 }),
    walkinPhone: varchar("walkin_phone", { length: 40 }),
    walkinAddress: text("walkin_address"),
    walkinCity: varchar("walkin_city", { length: 80 }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("documents_docno_uidx").on(t.docNo),
    index("documents_doctype_idx").on(t.docType),
    index("documents_date_idx").on(t.date),
    index("documents_party_idx").on(t.partyId),
    index("documents_status_idx").on(t.status),
    index("documents_salesman_idx").on(t.salesmanId),
    index("documents_warehouse_idx").on(t.warehouseId),
    index("documents_fbrstatus_idx").on(t.fbrStatus),
    index("documents_fbrno_idx").on(t.fbrInvoiceNo),
    check("documents_type_chk", sql`${t.docType} in ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS','ADJ')`),
    check("documents_grand_chk", sql`${t.grandTotal} >= 0`),
    check("documents_paid_chk", sql`${t.paidAmount} >= 0`),
    check("documents_aitsec_chk", sql`${t.aitSection} in ('none','goods','services','contract')`),
    check("documents_fbr_chk", sql`${t.fbrStatus} in ('not_synced','queued','synced','failed','not_required')`),
    check("documents_filer_chk", sql`${t.buyerFilerStatus} is null or ${t.buyerFilerStatus} in ('filer','late_filer','non_filer')`),
  ]
);

/* ============ Document lines ============ */
export const documentLines = pgTable(
  "document_lines",
  {
    id: serial("id").primaryKey(),
    documentId: integer("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
    itemId: integer("item_id").references(() => items.id, { onDelete: "set null" }),
    description: varchar("description", { length: 220 }),
    qty: numeric("qty", { precision: 14, scale: 2 }).notNull().default("0"),
    unit: varchar("unit", { length: 20 }).notNull().default("PCS"),
    rate: numeric("rate", { precision: 14, scale: 2 }).notNull().default("0"),
    discountPct: numeric("discount_pct", { precision: 8, scale: 3 }).notNull().default("0"),
    discountAmt: numeric("discount_amt", { precision: 14, scale: 2 }).notNull().default("0"),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull().default("0"),
    returnCondition: varchar("return_condition", { length: 20 }).notNull().default("normal"),
    // Line-level tax (services vs goods can differ on the same invoice)
    itemType: varchar("item_type", { length: 20 }).notNull().default("goods"),
    salesTaxRate: numeric("sales_tax_rate", { precision: 8, scale: 3 }).notNull().default("18"),
    salesTax: numeric("sales_tax", { precision: 14, scale: 2 }).notNull().default("0"),
    furtherTaxRate: numeric("further_tax_rate", { precision: 8, scale: 3 }).notNull().default("0"),
    furtherTax: numeric("further_tax", { precision: 14, scale: 2 }).notNull().default("0"),
    taxExempt: boolean("tax_exempt").notNull().default(false),
    // Per-line Advance Income Tax withholding u/s 153
    aitSection: varchar("ait_section", { length: 20 }).notNull().default("goods"),
    aitRate: numeric("ait_rate", { precision: 8, scale: 3 }).notNull().default("0"),
    aitAmount: numeric("ait_amount", { precision: 14, scale: 2 }).notNull().default("0"),
  },
  (t) => [
    index("document_lines_doc_idx").on(t.documentId),
    index("document_lines_item_idx").on(t.itemId),
    check("document_lines_qty_chk", sql`${t.qty} >= 0`),
    check("document_lines_rate_chk", sql`${t.rate} >= 0`),
    check("document_lines_amt_chk", sql`${t.amount} >= 0`),
    check("document_lines_cond_chk", sql`${t.returnCondition} in ('normal','damaged','broken')`),
    check("document_lines_type_chk", sql`${t.itemType} in ('goods','services')`),
    check("document_lines_aitsec_chk", sql`${t.aitSection} in ('none','goods','services','contract')`),
  ]
);

/* ============ Vouchers ============ */
export const vouchers = pgTable(
  "vouchers",
  {
    id: serial("id").primaryKey(),
    voucherType: varchar("voucher_type", { length: 10 }).notNull(),
    voucherNo: varchar("voucher_no", { length: 40 }).notNull(),
    date: date("date").notNull(),
    narration: text("narration"),
    partyId: integer("party_id").references(() => parties.id, { onDelete: "set null" }),
    documentId: integer("document_id").references(() => documents.id, { onDelete: "set null" }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    currencyId: integer("currency_id").references(() => currencies.id, { onDelete: "set null" }),
    createdBy: integer("created_by").references(() => users.id, { onDelete: "set null" }),
    totalDebit: numeric("total_debit", { precision: 14, scale: 2 }).notNull().default("0"),
    totalCredit: numeric("total_credit", { precision: 14, scale: 2 }).notNull().default("0"),
    status: varchar("status", { length: 20 }).notNull().default("Posted"),
    documents: text("documents"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (t) => [
    uniqueIndex("vouchers_no_uidx").on(t.voucherNo),
    index("vouchers_type_idx").on(t.voucherType),
    index("vouchers_date_idx").on(t.date),
    index("vouchers_party_idx").on(t.partyId),
    index("vouchers_company_idx").on(t.companyId),
    index("vouchers_branch_idx").on(t.branchId),
    index("vouchers_doc_idx").on(t.documentId),
    check(
      "vouchers_type_chk",
      sql`${t.voucherType} in ('JV','BRV','BPV','CRV','CPV','ADJ','SINV','PINV','POS')`
    ),
    check("vouchers_status_chk", sql`${t.status} in ('Posted','Cancelled')`),
    check("vouchers_dr_chk", sql`${t.totalDebit} >= 0`),
    check("vouchers_cr_chk", sql`${t.totalCredit} >= 0`),
  ]
);

/* ============ Voucher lines ============ */
export const voucherLines = pgTable(
  "voucher_lines",
  {
    id: serial("id").primaryKey(),
    voucherId: integer("voucher_id")
      .notNull()
      .references(() => vouchers.id, { onDelete: "cascade" }),
    accountId: integer("account_id").references(() => accounts.id, { onDelete: "restrict" }),
    debit: numeric("debit", { precision: 14, scale: 2 }).notNull().default("0"),
    credit: numeric("credit", { precision: 14, scale: 2 }).notNull().default("0"),
    narration: varchar("narration", { length: 220 }),
    partyId: integer("party_id").references(() => parties.id, { onDelete: "set null" }),
    analyticalDistribution: text("analytical_distribution"),
    chequeNo: varchar("cheque_no", { length: 40 }),
    chequeDate: date("cheque_date"),
  },
  (t) => [
    index("voucher_lines_voucher_idx").on(t.voucherId),
    index("voucher_lines_account_idx").on(t.accountId),
    index("voucher_lines_party_idx").on(t.partyId),
    check("voucher_lines_dr_chk", sql`${t.debit} >= 0`),
    check("voucher_lines_cr_chk", sql`${t.credit} >= 0`),
  ]
);

/* ============ Stock ledger (RESTRICT on item_id) ============ */
export const stockLedger = pgTable(
  "stock_ledger",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull(),
    itemId: integer("item_id").references(() => items.id, { onDelete: "restrict" }),
    warehouseId: integer("warehouse_id").references(() => warehouses.id, { onDelete: "set null" }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    qtyIn: numeric("qty_in", { precision: 14, scale: 2 }).notNull().default("0"),
    qtyOut: numeric("qty_out", { precision: 14, scale: 2 }).notNull().default("0"),
    rate: numeric("rate", { precision: 14, scale: 2 }).notNull().default("0"),
    docType: varchar("doc_type", { length: 10 }).notNull().default("ADJ"),
    documentId: integer("document_id").references(() => documents.id, { onDelete: "set null" }),
    narration: varchar("narration", { length: 220 }),
    // Return quality on that movement — condition is a LINE attribute, so it must live on the ledger row
    returnCondition: varchar("return_condition", { length: 20 }).notNull().default("normal"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("stock_ledger_item_idx").on(t.itemId),
    index("stock_ledger_date_idx").on(t.date),
    index("stock_ledger_doctype_idx").on(t.docType),
    index("stock_ledger_doc_idx").on(t.documentId),
    index("stock_ledger_wh_idx").on(t.warehouseId),
    index("stock_ledger_cond_idx").on(t.returnCondition),
    check("stock_ledger_in_chk", sql`${t.qtyIn} >= 0`),
    check("stock_ledger_out_chk", sql`${t.qtyOut} >= 0`),
    check("stock_ledger_cond_chk", sql`${t.returnCondition} in ('normal','damaged','broken')`),
  ]
);

/* ============ Incentives ============ */
export const incentives = pgTable(
  "incentives",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull(),
    kind: varchar("kind", { length: 20 }).notNull(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    partyId: integer("party_id").references(() => parties.id, { onDelete: "set null" }),
    documentId: integer("document_id").references(() => documents.id, { onDelete: "set null" }),
    amount: numeric("amount", { precision: 14, scale: 2 }).notNull().default("0"),
    narration: text("narration"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("incentives_party_idx").on(t.partyId),
    index("incentives_date_idx").on(t.date),
    check("incentives_kind_chk", sql`${t.kind} in ('given','received')`),
    check("incentives_amt_chk", sql`${t.amount} >= 0`),
  ]
);

/* ============ Letterheads ============ */
export const letterheads = pgTable(
  "letterheads",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "cascade" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    name: varchar("name", { length: 120 }).notNull(),
    headerText: text("header_text"),
    footerText: text("footer_text"),
    // Branded artwork bands printed above the body and below the footer text
    headerImage: text("header_image"),
    footerImage: text("footer_image"),
    isDefault: boolean("is_default").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("letterheads_company_idx").on(t.companyId), index("letterheads_branch_idx").on(t.branchId)]
);

/* ============ PK Tax settings (single row, id=1) ============ */
export const taxSettings = pgTable(
  "tax_settings",
  {
    id: serial("id").primaryKey(),
    // Sales Tax Act 1990 — standard rate (s.3)
    salesTaxRate: numeric("sales_tax_rate", { precision: 8, scale: 3 }).notNull().default("18"),
    enableSalesTax: boolean("enable_sales_tax").notNull().default(true),
    // Further Tax u/s 3(1A) on supplies to unregistered persons
    furtherTaxRate: numeric("further_tax_rate", { precision: 8, scale: 3 }).notNull().default("4"),
    enableFurtherTax: boolean("enable_further_tax").notNull().default(true),
    // AIT withholding u/s 153, Income Tax Ordinance 2001 — filer / late filer / non-filer
    aitGoodsFiler: numeric("ait_goods_filer", { precision: 8, scale: 3 }).notNull().default("4.5"),
    aitGoodsLate: numeric("ait_goods_late", { precision: 8, scale: 3 }).notNull().default("7"),
    aitGoodsNon: numeric("ait_goods_non", { precision: 8, scale: 3 }).notNull().default("9"),
    aitServicesFiler: numeric("ait_services_filer", { precision: 8, scale: 3 }).notNull().default("9"),
    aitServicesLate: numeric("ait_services_late", { precision: 8, scale: 3 }).notNull().default("12"),
    aitServicesNon: numeric("ait_services_non", { precision: 8, scale: 3 }).notNull().default("18"),
    aitContractFiler: numeric("ait_contract_filer", { precision: 8, scale: 3 }).notNull().default("7.5"),
    aitContractLate: numeric("ait_contract_late", { precision: 8, scale: 3 }).notNull().default("10"),
    aitContractNon: numeric("ait_contract_non", { precision: 8, scale: 3 }).notNull().default("15"),
    defaultAitSection: varchar("default_ait_section", { length: 20 }).notNull().default("goods"),
    enableAit: boolean("enable_ait").notNull().default(true),
    // Strict mode blocks saving taxable invoices without valid seller STRN/NTN
    strictValidation: boolean("strict_validation").notNull().default(false),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [check("tax_default_sec_chk", sql`${t.defaultAitSection} in ('none','goods','services','contract')`)]
);

/* ============ FBR Digital Invoicing settings (single row, id=1) ============ */
export const fbrSettings = pgTable(
  "fbr_settings",
  {
    id: serial("id").primaryKey(),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    businessName: varchar("business_name", { length: 160 }),
    ntn: varchar("ntn", { length: 40 }),
    strn: varchar("strn", { length: 40 }),
    province: varchar("province", { length: 40 }).notNull().default("Punjab"),
    address: text("address"),
    environment: varchar("environment", { length: 20 }).notNull().default("sandbox"),
    posId: varchar("pos_id", { length: 40 }).notNull().default("POS-01"),
    usinPrefix: varchar("usin_prefix", { length: 20 }).notNull().default("USIN"),
    autoSync: boolean("auto_sync").notNull().default(false),
    // PRAL/IRIS API token (stored server-side; real token goes here in production)
    apiToken: text("api_token"),
    isActive: boolean("is_active").notNull().default(true),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("fbr_settings_company_idx").on(t.companyId),
    index("fbr_settings_branch_idx").on(t.branchId),
    check("fbr_env_chk", sql`${t.environment} in ('sandbox','production')`),
  ]
);

/* ============ FBR sync log (one row per attempt) ============ */
export const fbrLogs = pgTable(
  "fbr_logs",
  {
    id: serial("id").primaryKey(),
    documentId: integer("document_id").references(() => documents.id, { onDelete: "set null" }),
    usin: varchar("usin", { length: 60 }),
    fbrInvoiceNo: varchar("fbr_invoice_no", { length: 60 }),
    status: varchar("status", { length: 20 }).notNull().default("failed"),
    requestPayload: jsonb("request_payload"),
    responsePayload: jsonb("response_payload"),
    error: text("error"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("fbr_logs_doc_idx").on(t.documentId),
    index("fbr_logs_status_idx").on(t.status),
    check("fbr_logs_status_chk", sql`${t.status} in ('synced','failed')`),
  ]
);

/* ============ Audit log ============ */
export const auditLog = pgTable(
  "audit_log",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
    companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }),
    branchId: integer("branch_id").references(() => branches.id, { onDelete: "set null" }),
    username: varchar("username", { length: 60 }),
    action: varchar("action", { length: 30 }).notNull(),
    tableName: varchar("table_name", { length: 60 }),
    recordId: varchar("record_id", { length: 60 }),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("audit_log_user_idx").on(t.userId),
    index("audit_log_action_idx").on(t.action),
    index("audit_log_table_idx").on(t.tableName),
  ]
);

export type User = typeof users.$inferSelect;
export type Party = typeof parties.$inferSelect;
export type Item = typeof items.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type TaxSettings = typeof taxSettings.$inferSelect;
export type FbrSettings = typeof fbrSettings.$inferSelect;
