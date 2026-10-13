CREATE TABLE "accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(30) NOT NULL,
	"name" varchar(160) NOT NULL,
	"type" varchar(20) NOT NULL,
	"parent_id" integer,
	"opening_debit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"opening_credit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"is_system" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "accounts_type_chk" CHECK ("accounts"."type" in ('Asset','Liability','Equity','Income','Expense')),
	CONSTRAINT "accounts_od_chk" CHECK ("accounts"."opening_debit" >= 0),
	CONSTRAINT "accounts_oc_chk" CHECK ("accounts"."opening_credit" >= 0)
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"username" varchar(60),
	"action" varchar(30) NOT NULL,
	"table_name" varchar(60),
	"record_id" varchar(60),
	"payload" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"address" text,
	"phone" varchar(40),
	"email" varchar(120),
	"ntn" varchar(40),
	"strn" varchar(40),
	"base_currency_id" integer,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(10) NOT NULL,
	"name" varchar(80) NOT NULL,
	"symbol" varchar(10) DEFAULT 'Rs' NOT NULL,
	"rate_to_base" numeric(18, 6) DEFAULT '1' NOT NULL,
	"is_base" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "currencies_rate_chk" CHECK ("currencies"."rate_to_base" >= 0)
);
--> statement-breakpoint
CREATE TABLE "document_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"item_id" integer,
	"description" varchar(220),
	"qty" numeric(14, 2) DEFAULT '0' NOT NULL,
	"unit" varchar(20) DEFAULT 'PCS' NOT NULL,
	"rate" numeric(14, 2) DEFAULT '0' NOT NULL,
	"discount_pct" numeric(8, 3) DEFAULT '0' NOT NULL,
	"discount_amt" numeric(14, 2) DEFAULT '0' NOT NULL,
	"amount" numeric(14, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "document_lines_qty_chk" CHECK ("document_lines"."qty" >= 0),
	CONSTRAINT "document_lines_rate_chk" CHECK ("document_lines"."rate" >= 0),
	CONSTRAINT "document_lines_amt_chk" CHECK ("document_lines"."amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"doc_type" varchar(10) NOT NULL,
	"doc_no" varchar(40) NOT NULL,
	"date" date NOT NULL,
	"party_id" integer,
	"warehouse_id" integer,
	"salesman_id" integer,
	"currency_id" integer,
	"exchange_rate" numeric(18, 6) DEFAULT '1' NOT NULL,
	"subtotal" numeric(14, 2) DEFAULT '0' NOT NULL,
	"discount_pct" numeric(8, 3) DEFAULT '0' NOT NULL,
	"discount_lumpsum" numeric(14, 2) DEFAULT '0' NOT NULL,
	"sales_tax" numeric(14, 2) DEFAULT '0' NOT NULL,
	"sales_tax_rate" numeric(8, 3) DEFAULT '18' NOT NULL,
	"further_tax" numeric(14, 2) DEFAULT '0' NOT NULL,
	"further_tax_rate" numeric(8, 3) DEFAULT '0' NOT NULL,
	"income_tax" numeric(14, 2) DEFAULT '0' NOT NULL,
	"ait_rate" numeric(8, 3) DEFAULT '0' NOT NULL,
	"ait_amount" numeric(14, 2) DEFAULT '0' NOT NULL,
	"ait_section" varchar(20) DEFAULT 'none' NOT NULL,
	"buyer_filer_status" varchar(20),
	"transport_charges" numeric(14, 2) DEFAULT '0' NOT NULL,
	"labor_charges" numeric(14, 2) DEFAULT '0' NOT NULL,
	"grand_total" numeric(14, 2) DEFAULT '0' NOT NULL,
	"paid_amount" numeric(14, 2) DEFAULT '0' NOT NULL,
	"payment_mode" varchar(20) DEFAULT 'credit' NOT NULL,
	"status" varchar(20) DEFAULT 'Posted' NOT NULL,
	"valid_until" date,
	"fbr_status" varchar(20) DEFAULT 'not_synced' NOT NULL,
	"fbr_invoice_no" varchar(60),
	"fbr_usin" varchar(60),
	"fbr_synced_at" timestamp,
	"fbr_qr" text,
	"converted_from_id" integer,
	"notes" text,
	"company_id" integer,
	"created_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "documents_type_chk" CHECK ("documents"."doc_type" in ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS')),
	CONSTRAINT "documents_grand_chk" CHECK ("documents"."grand_total" >= 0),
	CONSTRAINT "documents_paid_chk" CHECK ("documents"."paid_amount" >= 0),
	CONSTRAINT "documents_aitsec_chk" CHECK ("documents"."ait_section" in ('none','goods','services','contract')),
	CONSTRAINT "documents_fbr_chk" CHECK ("documents"."fbr_status" in ('not_synced','queued','synced','failed','not_required')),
	CONSTRAINT "documents_filer_chk" CHECK ("documents"."buyer_filer_status" is null or "documents"."buyer_filer_status" in ('filer','late_filer','non_filer'))
);
--> statement-breakpoint
CREATE TABLE "fbr_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"usin" varchar(60),
	"fbr_invoice_no" varchar(60),
	"status" varchar(20) DEFAULT 'failed' NOT NULL,
	"request_payload" jsonb,
	"response_payload" jsonb,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "fbr_logs_status_chk" CHECK ("fbr_logs"."status" in ('synced','failed'))
);
--> statement-breakpoint
CREATE TABLE "fbr_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"business_name" varchar(160),
	"ntn" varchar(40),
	"strn" varchar(40),
	"province" varchar(40) DEFAULT 'Punjab' NOT NULL,
	"address" text,
	"environment" varchar(20) DEFAULT 'sandbox' NOT NULL,
	"pos_id" varchar(40) DEFAULT 'POS-01' NOT NULL,
	"usin_prefix" varchar(20) DEFAULT 'USIN' NOT NULL,
	"auto_sync" boolean DEFAULT false NOT NULL,
	"api_token" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "fbr_env_chk" CHECK ("fbr_settings"."environment" in ('sandbox','production'))
);
--> statement-breakpoint
CREATE TABLE "incentives" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"kind" varchar(20) NOT NULL,
	"party_id" integer,
	"document_id" integer,
	"amount" numeric(14, 2) DEFAULT '0' NOT NULL,
	"narration" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "incentives_kind_chk" CHECK ("incentives"."kind" in ('given','received')),
	CONSTRAINT "incentives_amt_chk" CHECK ("incentives"."amount" >= 0)
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(40) NOT NULL,
	"barcode" varchar(60),
	"name" varchar(200) NOT NULL,
	"category" varchar(80) DEFAULT 'General' NOT NULL,
	"brand" varchar(80),
	"model" varchar(80),
	"unit" varchar(20) DEFAULT 'PCS' NOT NULL,
	"size" varchar(60),
	"color" varchar(60),
	"design" varchar(80),
	"origin" varchar(20) DEFAULT 'Local' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"cost_price" numeric(14, 2) DEFAULT '0' NOT NULL,
	"sale_price" numeric(14, 2) DEFAULT '0' NOT NULL,
	"reorder_level" numeric(14, 2) DEFAULT '0' NOT NULL,
	"opening_stock" numeric(14, 2) DEFAULT '0' NOT NULL,
	"hs_code" varchar(20),
	"tax_class" varchar(20) DEFAULT 'standard' NOT NULL,
	"tax_rate" numeric(8, 3) DEFAULT '18' NOT NULL,
	"warehouse_id" integer,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "items_origin_chk" CHECK ("items"."origin" in ('Local','Imported')),
	CONSTRAINT "items_cost_chk" CHECK ("items"."cost_price" >= 0),
	CONSTRAINT "items_sale_chk" CHECK ("items"."sale_price" >= 0),
	CONSTRAINT "items_reorder_chk" CHECK ("items"."reorder_level" >= 0),
	CONSTRAINT "items_taxclass_chk" CHECK ("items"."tax_class" in ('standard','reduced','zero','exempt')),
	CONSTRAINT "items_taxrate_chk" CHECK ("items"."tax_rate" >= 0 and "items"."tax_rate" <= 100)
);
--> statement-breakpoint
CREATE TABLE "letterheads" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"name" varchar(120) NOT NULL,
	"header_text" text,
	"footer_text" text,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(20) NOT NULL,
	"name" varchar(160) NOT NULL,
	"cnic" varchar(30),
	"ntn" varchar(40),
	"strn" varchar(40),
	"phone" varchar(40),
	"mobile" varchar(40),
	"email" varchar(120),
	"area" varchar(120),
	"city" varchar(80),
	"province" varchar(40),
	"filer_status" varchar(20) DEFAULT 'filer' NOT NULL,
	"sales_tax_registered" boolean DEFAULT false NOT NULL,
	"opening_balance" numeric(14, 2) DEFAULT '0' NOT NULL,
	"credit_limit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"salesman_id" integer,
	"company_id" integer,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "parties_type_chk" CHECK ("parties"."type" in ('customer','vendor')),
	CONSTRAINT "parties_credit_chk" CHECK ("parties"."credit_limit" >= 0),
	CONSTRAINT "parties_filer_chk" CHECK ("parties"."filer_status" in ('filer','late_filer','non_filer'))
);
--> statement-breakpoint
CREATE TABLE "party_sites" (
	"id" serial PRIMARY KEY NOT NULL,
	"party_id" integer NOT NULL,
	"site_name" varchar(140) NOT NULL,
	"address" text,
	"contact_person" varchar(120),
	"contact_number" varchar(40),
	"credit_limit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"is_closed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "party_sites_credit_chk" CHECK ("party_sites"."credit_limit" >= 0)
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"menu_key" varchar(60) NOT NULL,
	"can_view" boolean DEFAULT false NOT NULL,
	"can_create" boolean DEFAULT false NOT NULL,
	"can_edit" boolean DEFAULT false NOT NULL,
	"can_delete" boolean DEFAULT false NOT NULL,
	"can_print" boolean DEFAULT false NOT NULL,
	"can_export" boolean DEFAULT false NOT NULL,
	CONSTRAINT "permissions_user_menu_uq" UNIQUE("user_id","menu_key")
);
--> statement-breakpoint
CREATE TABLE "salesmen" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"phone" varchar(40),
	"area" varchar(120),
	"commission_rate" numeric(8, 3) DEFAULT '0' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "salesmen_comm_chk" CHECK ("salesmen"."commission_rate" >= 0)
);
--> statement-breakpoint
CREATE TABLE "sequences" (
	"id" serial PRIMARY KEY NOT NULL,
	"prefix" varchar(20) NOT NULL,
	"period" varchar(10) NOT NULL,
	"last_no" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "sequences_prefix_period_uq" UNIQUE("prefix","period")
);
--> statement-breakpoint
CREATE TABLE "stock_ledger" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"item_id" integer,
	"warehouse_id" integer,
	"qty_in" numeric(14, 2) DEFAULT '0' NOT NULL,
	"qty_out" numeric(14, 2) DEFAULT '0' NOT NULL,
	"rate" numeric(14, 2) DEFAULT '0' NOT NULL,
	"doc_type" varchar(10) DEFAULT 'ADJ' NOT NULL,
	"document_id" integer,
	"narration" varchar(220),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "stock_ledger_in_chk" CHECK ("stock_ledger"."qty_in" >= 0),
	CONSTRAINT "stock_ledger_out_chk" CHECK ("stock_ledger"."qty_out" >= 0)
);
--> statement-breakpoint
CREATE TABLE "tax_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"sales_tax_rate" numeric(8, 3) DEFAULT '18' NOT NULL,
	"enable_sales_tax" boolean DEFAULT true NOT NULL,
	"further_tax_rate" numeric(8, 3) DEFAULT '4' NOT NULL,
	"enable_further_tax" boolean DEFAULT true NOT NULL,
	"ait_goods_filer" numeric(8, 3) DEFAULT '4.5' NOT NULL,
	"ait_goods_late" numeric(8, 3) DEFAULT '7' NOT NULL,
	"ait_goods_non" numeric(8, 3) DEFAULT '9' NOT NULL,
	"ait_services_filer" numeric(8, 3) DEFAULT '9' NOT NULL,
	"ait_services_late" numeric(8, 3) DEFAULT '12' NOT NULL,
	"ait_services_non" numeric(8, 3) DEFAULT '18' NOT NULL,
	"ait_contract_filer" numeric(8, 3) DEFAULT '7.5' NOT NULL,
	"ait_contract_late" numeric(8, 3) DEFAULT '10' NOT NULL,
	"ait_contract_non" numeric(8, 3) DEFAULT '15' NOT NULL,
	"default_ait_section" varchar(20) DEFAULT 'goods' NOT NULL,
	"enable_ait" boolean DEFAULT true NOT NULL,
	"strict_validation" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tax_default_sec_chk" CHECK ("tax_settings"."default_ait_section" in ('none','goods','services','contract'))
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(60) NOT NULL,
	"password_hash" text NOT NULL,
	"full_name" varchar(120) NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"company_id" integer,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_role_chk" CHECK ("users"."role" in ('admin','manager','cashier','user'))
);
--> statement-breakpoint
CREATE TABLE "voucher_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"voucher_id" integer NOT NULL,
	"account_id" integer,
	"debit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"credit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"narration" varchar(220),
	CONSTRAINT "voucher_lines_dr_chk" CHECK ("voucher_lines"."debit" >= 0),
	CONSTRAINT "voucher_lines_cr_chk" CHECK ("voucher_lines"."credit" >= 0)
);
--> statement-breakpoint
CREATE TABLE "vouchers" (
	"id" serial PRIMARY KEY NOT NULL,
	"voucher_type" varchar(10) NOT NULL,
	"voucher_no" varchar(40) NOT NULL,
	"date" date NOT NULL,
	"narration" text,
	"party_id" integer,
	"document_id" integer,
	"company_id" integer,
	"currency_id" integer,
	"created_by" integer,
	"total_debit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"total_credit" numeric(14, 2) DEFAULT '0' NOT NULL,
	"status" varchar(20) DEFAULT 'Posted' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "vouchers_type_chk" CHECK ("vouchers"."voucher_type" in ('JV','BRV','BPV','CRV','CPV','ADJ','SINV','PINV','POS')),
	CONSTRAINT "vouchers_status_chk" CHECK ("vouchers"."status" in ('Posted','Cancelled')),
	CONSTRAINT "vouchers_dr_chk" CHECK ("vouchers"."total_debit" >= 0),
	CONSTRAINT "vouchers_cr_chk" CHECK ("vouchers"."total_credit" >= 0)
);
--> statement-breakpoint
CREATE TABLE "warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer,
	"code" varchar(20) NOT NULL,
	"name" varchar(120) NOT NULL,
	"address" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_parent_id_accounts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."accounts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_base_currency_id_currencies_id_fk" FOREIGN KEY ("base_currency_id") REFERENCES "public"."currencies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_lines" ADD CONSTRAINT "document_lines_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_lines" ADD CONSTRAINT "document_lines_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_salesman_id_salesmen_id_fk" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesmen"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_converted_from_id_documents_id_fk" FOREIGN KEY ("converted_from_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fbr_logs" ADD CONSTRAINT "fbr_logs_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fbr_settings" ADD CONSTRAINT "fbr_settings_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incentives" ADD CONSTRAINT "incentives_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incentives" ADD CONSTRAINT "incentives_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "letterheads" ADD CONSTRAINT "letterheads_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parties" ADD CONSTRAINT "parties_salesman_id_salesmen_id_fk" FOREIGN KEY ("salesman_id") REFERENCES "public"."salesmen"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parties" ADD CONSTRAINT "parties_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "party_sites" ADD CONSTRAINT "party_sites_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_warehouse_id_warehouses_id_fk" FOREIGN KEY ("warehouse_id") REFERENCES "public"."warehouses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_voucher_id_vouchers_id_fk" FOREIGN KEY ("voucher_id") REFERENCES "public"."vouchers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_code_uidx" ON "accounts" USING btree ("code");--> statement-breakpoint
CREATE INDEX "accounts_type_idx" ON "accounts" USING btree ("type");--> statement-breakpoint
CREATE INDEX "accounts_parent_idx" ON "accounts" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "audit_log_user_idx" ON "audit_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_log_action_idx" ON "audit_log" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_log_table_idx" ON "audit_log" USING btree ("table_name");--> statement-breakpoint
CREATE INDEX "companies_currency_idx" ON "companies" USING btree ("base_currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX "currencies_code_uidx" ON "currencies" USING btree ("code");--> statement-breakpoint
CREATE INDEX "document_lines_doc_idx" ON "document_lines" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "document_lines_item_idx" ON "document_lines" USING btree ("item_id");--> statement-breakpoint
CREATE UNIQUE INDEX "documents_docno_uidx" ON "documents" USING btree ("doc_no");--> statement-breakpoint
CREATE INDEX "documents_doctype_idx" ON "documents" USING btree ("doc_type");--> statement-breakpoint
CREATE INDEX "documents_date_idx" ON "documents" USING btree ("date");--> statement-breakpoint
CREATE INDEX "documents_party_idx" ON "documents" USING btree ("party_id");--> statement-breakpoint
CREATE INDEX "documents_status_idx" ON "documents" USING btree ("status");--> statement-breakpoint
CREATE INDEX "documents_salesman_idx" ON "documents" USING btree ("salesman_id");--> statement-breakpoint
CREATE INDEX "documents_warehouse_idx" ON "documents" USING btree ("warehouse_id");--> statement-breakpoint
CREATE INDEX "documents_fbrstatus_idx" ON "documents" USING btree ("fbr_status");--> statement-breakpoint
CREATE INDEX "documents_fbrno_idx" ON "documents" USING btree ("fbr_invoice_no");--> statement-breakpoint
CREATE INDEX "fbr_logs_doc_idx" ON "fbr_logs" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "fbr_logs_status_idx" ON "fbr_logs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "fbr_settings_company_idx" ON "fbr_settings" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "incentives_party_idx" ON "incentives" USING btree ("party_id");--> statement-breakpoint
CREATE INDEX "incentives_date_idx" ON "incentives" USING btree ("date");--> statement-breakpoint
CREATE UNIQUE INDEX "items_code_uidx" ON "items" USING btree ("code");--> statement-breakpoint
CREATE INDEX "items_barcode_idx" ON "items" USING btree ("barcode");--> statement-breakpoint
CREATE INDEX "items_category_idx" ON "items" USING btree ("category");--> statement-breakpoint
CREATE INDEX "items_brand_idx" ON "items" USING btree ("brand");--> statement-breakpoint
CREATE INDEX "items_origin_idx" ON "items" USING btree ("origin");--> statement-breakpoint
CREATE INDEX "items_featured_idx" ON "items" USING btree ("featured");--> statement-breakpoint
CREATE INDEX "items_name_idx" ON "items" USING btree ("name");--> statement-breakpoint
CREATE INDEX "items_hscode_idx" ON "items" USING btree ("hs_code");--> statement-breakpoint
CREATE INDEX "letterheads_company_idx" ON "letterheads" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "parties_type_idx" ON "parties" USING btree ("type");--> statement-breakpoint
CREATE INDEX "parties_name_idx" ON "parties" USING btree ("name");--> statement-breakpoint
CREATE INDEX "parties_city_idx" ON "parties" USING btree ("city");--> statement-breakpoint
CREATE INDEX "parties_salesman_idx" ON "parties" USING btree ("salesman_id");--> statement-breakpoint
CREATE INDEX "parties_company_idx" ON "parties" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "parties_filer_idx" ON "parties" USING btree ("filer_status");--> statement-breakpoint
CREATE INDEX "party_sites_party_idx" ON "party_sites" USING btree ("party_id");--> statement-breakpoint
CREATE INDEX "permissions_user_idx" ON "permissions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "salesmen_name_idx" ON "salesmen" USING btree ("name");--> statement-breakpoint
CREATE INDEX "sequences_prefix_idx" ON "sequences" USING btree ("prefix");--> statement-breakpoint
CREATE INDEX "stock_ledger_item_idx" ON "stock_ledger" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX "stock_ledger_date_idx" ON "stock_ledger" USING btree ("date");--> statement-breakpoint
CREATE INDEX "stock_ledger_doctype_idx" ON "stock_ledger" USING btree ("doc_type");--> statement-breakpoint
CREATE INDEX "stock_ledger_doc_idx" ON "stock_ledger" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "stock_ledger_wh_idx" ON "stock_ledger" USING btree ("warehouse_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_uidx" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX "users_company_idx" ON "users" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "voucher_lines_voucher_idx" ON "voucher_lines" USING btree ("voucher_id");--> statement-breakpoint
CREATE INDEX "voucher_lines_account_idx" ON "voucher_lines" USING btree ("account_id");--> statement-breakpoint
CREATE UNIQUE INDEX "vouchers_no_uidx" ON "vouchers" USING btree ("voucher_no");--> statement-breakpoint
CREATE INDEX "vouchers_type_idx" ON "vouchers" USING btree ("voucher_type");--> statement-breakpoint
CREATE INDEX "vouchers_date_idx" ON "vouchers" USING btree ("date");--> statement-breakpoint
CREATE INDEX "vouchers_party_idx" ON "vouchers" USING btree ("party_id");--> statement-breakpoint
CREATE INDEX "vouchers_doc_idx" ON "vouchers" USING btree ("document_id");--> statement-breakpoint
CREATE INDEX "warehouses_company_idx" ON "warehouses" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "warehouses_code_idx" ON "warehouses" USING btree ("code");