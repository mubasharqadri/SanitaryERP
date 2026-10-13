ALTER TABLE "document_lines" ADD COLUMN "ait_section" varchar(20) DEFAULT 'goods' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "ait_rate" numeric(8, 3) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD COLUMN "ait_amount" numeric(14, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "document_lines" ADD CONSTRAINT "document_lines_aitsec_chk" CHECK ("document_lines"."ait_section" in ('none','goods','services','contract'));