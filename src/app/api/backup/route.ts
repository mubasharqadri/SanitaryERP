import { NextResponse } from "next/server";
import { db } from "@/db";
import * as s from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const data: Record<string, unknown> = { exportedAt: new Date().toISOString(), exportedBy: user.username };
  data.companies = await db.select().from(s.companies);
  data.currencies = await db.select().from(s.currencies);
  data.users = await db.select({ id: s.users.id, username: s.users.username, fullName: s.users.fullName, role: s.users.role, active: s.users.active }).from(s.users);
  data.permissions = await db.select().from(s.permissions);
  data.salesmen = await db.select().from(s.salesmen);
  data.accounts = await db.select().from(s.accounts);
  data.warehouses = await db.select().from(s.warehouses);
  data.parties = await db.select().from(s.parties);
  data.partySites = await db.select().from(s.partySites);
  data.items = await db.select().from(s.items);
  data.sequences = await db.select().from(s.sequences);
  data.documents = await db.select().from(s.documents);
  data.documentLines = await db.select().from(s.documentLines);
  data.vouchers = await db.select().from(s.vouchers);
  data.voucherLines = await db.select().from(s.voucherLines);
  data.stockLedger = await db.select().from(s.stockLedger);
  data.incentives = await db.select().from(s.incentives);
  data.letterheads = await db.select().from(s.letterheads);
  data.taxSettings = await db.select().from(s.taxSettings);
  data.fbrSettings = await db.select().from(s.fbrSettings);
  data.fbrLogs = await db.select().from(s.fbrLogs);
  data.auditLog = await db.select().from(s.auditLog);
  return new NextResponse(JSON.stringify(data, null, 2), {
    headers: { "Content-Type": "application/json", "Content-Disposition": `attachment; filename="sanitary-erp-backup-${new Date().toISOString().slice(0, 10)}.json"` },
  });
}
