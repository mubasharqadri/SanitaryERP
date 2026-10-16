ALTER TABLE "accounts" DROP CONSTRAINT "accounts_branch_id_branches_id_fk";
--> statement-breakpoint
ALTER TABLE "items" DROP CONSTRAINT "items_branch_id_branches_id_fk";
--> statement-breakpoint
ALTER TABLE "letterheads" DROP CONSTRAINT "letterheads_branch_id_branches_id_fk";
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "letterheads" ADD CONSTRAINT "letterheads_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;