ALTER TABLE "accounts" ADD COLUMN "prev_year_debit" numeric(14, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "prev_year_credit" numeric(14, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD COLUMN "party_id" integer;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD COLUMN "analytical_distribution" text;--> statement-breakpoint
ALTER TABLE "voucher_lines" ADD CONSTRAINT "voucher_lines_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "voucher_lines_party_idx" ON "voucher_lines" USING btree ("party_id");