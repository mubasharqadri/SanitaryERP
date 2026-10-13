ALTER TABLE "documents" DROP CONSTRAINT "documents_type_chk";--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "pictures" text;--> statement-breakpoint
ALTER TABLE "letterheads" ADD COLUMN "header_image" text;--> statement-breakpoint
ALTER TABLE "letterheads" ADD COLUMN "footer_image" text;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "can_upload" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "can_download" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "salesmen" ADD COLUMN "pictures" text;--> statement-breakpoint
ALTER TABLE "salesmen" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD COLUMN "return_condition" varchar(20) DEFAULT 'normal' NOT NULL;--> statement-breakpoint
CREATE INDEX "stock_ledger_cond_idx" ON "stock_ledger" USING btree ("return_condition");--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_type_chk" CHECK ("documents"."doc_type" in ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS','ADJ'));--> statement-breakpoint
ALTER TABLE "stock_ledger" ADD CONSTRAINT "stock_ledger_cond_chk" CHECK ("stock_ledger"."return_condition" in ('normal','damaged','broken'));