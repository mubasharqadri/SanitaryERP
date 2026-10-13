ALTER TABLE "document_lines" ADD COLUMN "return_condition" varchar(20) DEFAULT 'normal' NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "linked_invoice_id" integer;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "parties" ADD COLUMN "contact_pic" text;--> statement-breakpoint
ALTER TABLE "parties" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "vouchers" ADD COLUMN "documents" text;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_linked_invoice_id_documents_id_fk" FOREIGN KEY ("linked_invoice_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_lines" ADD CONSTRAINT "document_lines_cond_chk" CHECK ("document_lines"."return_condition" in ('normal','damaged','broken'));