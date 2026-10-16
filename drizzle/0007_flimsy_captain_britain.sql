CREATE TABLE "branches" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"code" varchar(30) NOT NULL,
	"name" varchar(140) NOT NULL,
	"address" text,
	"phone" varchar(40),
	"is_head_office" boolean DEFAULT false NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "branches_company_code_uq" UNIQUE("company_id","code")
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "audit_log" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "audit_log" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "fbr_settings" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "incentives" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "incentives" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "letterheads" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "parties" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "salesmen" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "salesmen" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD COLUMN "company_id" integer;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "warehouses" ADD COLUMN "branch_id" integer;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "branches_company_idx" ON "branches" USING btree ("company_id");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fbr_settings" ADD CONSTRAINT "fbr_settings_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incentives" ADD CONSTRAINT "incentives_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incentives" ADD CONSTRAINT "incentives_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "letterheads" ADD CONSTRAINT "letterheads_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parties" ADD CONSTRAINT "parties_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salesmen" ADD CONSTRAINT "salesmen_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "salesmen" ADD CONSTRAINT "salesmen_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vouchers" ADD CONSTRAINT "vouchers_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_company_idx" ON "accounts" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "accounts_branch_idx" ON "accounts" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "fbr_settings_branch_idx" ON "fbr_settings" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "letterheads_branch_idx" ON "letterheads" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "users_branch_idx" ON "users" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "vouchers_company_idx" ON "vouchers" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "vouchers_branch_idx" ON "vouchers" USING btree ("branch_id");