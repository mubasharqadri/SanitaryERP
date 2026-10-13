ALTER TABLE "companies" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "item_type" varchar(20) DEFAULT 'goods' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "sales_tax_rate" numeric(8, 3) DEFAULT '18' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "sales_tax" numeric(14, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "further_tax_rate" numeric(8, 3) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "further_tax" numeric(14, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "tax_exempt" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "walkin_name" varchar(160);--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "walkin_contact" varchar(120);--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "walkin_phone" varchar(40);--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "walkin_address" text;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "walkin_city" varchar(80);--> statement-breakpoint
ALTER TABLE "document_lines" ADD CONSTRAINT "document_lines_type_chk" CHECK ("document_lines"."item_type" in ('goods','services'));