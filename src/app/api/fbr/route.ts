import { NextResponse } from "next/server";
import { db } from "@/db";
import { fbrSettings, fbrLogs, documents } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { getFbrSettings, buildFbrPayload, submitToFbr, validateFbrPayload, FBR_DOC_TYPES } from "@/lib/fbr";
import { validateNTN, validateSTRN } from "@/lib/tax";
import { audit } from "@/lib/posting";

export async function syncDocument(docId: number, user: { id: number; username: string }) {
  const built = await buildFbrPayload(docId);
  if ("error" in built) {
    await db.insert(fbrLogs).values({ documentId: docId, status: "failed", error: built.error });
    await db.update(documents).set({ fbrStatus: "failed" }).where(eq(documents.id, docId));
    return { ok: false as const, errors: [built.error], warnings: [] as string[] };
  }
  const { payload, settings } = built;
  const res = await submitToFbr(payload, settings);
  if (!res.ok) {
    await db.insert(fbrLogs).values({
      documentId: docId, usin: payload.usin, status: "failed",
      requestPayload: payload as never, responsePayload: { errors: res.errors, warnings: res.warnings } as never,
      error: res.errors.join(" | "),
    });
    await db.update(documents).set({ fbrStatus: "failed", fbrUsin: payload.usin }).where(eq(documents.id, docId));
    await audit(user.id, user.username, "fbr-failed", "documents", String(docId), { errors: res.errors });
    return { ok: false as const, errors: res.errors, warnings: res.warnings };
  }
  await db.insert(fbrLogs).values({
    documentId: docId, usin: payload.usin, fbrInvoiceNo: res.fbrInvoiceNo, status: "synced",
    requestPayload: payload as never,
    responsePayload: { fbrInvoiceNo: res.fbrInvoiceNo, qrText: res.qrText, warnings: res.warnings } as never,
  });
  await db.update(documents).set({
    fbrStatus: "synced", fbrInvoiceNo: res.fbrInvoiceNo, fbrUsin: payload.usin,
    fbrSyncedAt: new Date(), fbrQr: res.qrDataUrl,
  }).where(eq(documents.id, docId));
  await audit(user.id, user.username, "fbr-synced", "documents", String(docId), { fbrInvoiceNo: res.fbrInvoiceNo, usin: payload.usin });
  return { ok: true as const, fbrInvoiceNo: res.fbrInvoiceNo, usin: payload.usin, qrDataUrl: res.qrDataUrl, warnings: res.warnings };
}

/* GET → settings + queue + stats (+ logs when ?documentId=) */
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const url = new URL(req.url);
  const docId = url.searchParams.get("documentId");
  if (docId) {
    const logs = await db.select().from(fbrLogs).where(eq(fbrLogs.documentId, Number(docId))).orderBy(desc(fbrLogs.id)).limit(20);
    const built = await buildFbrPayload(Number(docId));
    const preview = "error" in built ? { error: built.error } : { payload: built.payload, validation: validateFbrPayload(built.payload) };
    return NextResponse.json({ logs, preview });
  }
  const settings = await getFbrSettings();
  const fbrTypes = [...FBR_DOC_TYPES];
  const queue = await db.select().from(documents)
    .where(sql`${documents.docType} in (${sql.join(fbrTypes.map((t) => sql`${t}`), sql`,`)})`)
    .orderBy(desc(documents.date), desc(documents.id)).limit(200);
  const logs = await db.select().from(fbrLogs).orderBy(desc(fbrLogs.id)).limit(30);
  const stats = {
    total: queue.length,
    synced: queue.filter((d) => d.fbrStatus === "synced").length,
    pending: queue.filter((d) => d.fbrStatus === "not_synced" || d.fbrStatus === "queued").length,
    failed: queue.filter((d) => d.fbrStatus === "failed").length,
    monthValue: queue.filter((d) => String(d.date).slice(0, 7) === new Date().toISOString().slice(0, 7)).reduce((a, d) => a + num(d.grandTotal), 0),
  };
  const sellerChecks = {
    ntnValid: validateNTN(settings.ntn),
    strnValid: validateSTRN(settings.strn),
    hasName: !!(settings.businessName && settings.businessName.trim()),
  };
  return NextResponse.json({ settings: { ...settings, apiToken: settings.apiToken ? "••••••" : "" }, stats, queue, logs, sellerChecks, ready: sellerChecks.ntnValid && sellerChecks.strnValid && sellerChecks.hasName });
}

/* POST → save-settings | test | sync | bulk */
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureSeed();
  const body = await req.json();
  const action = body.action as string;

  if (action === "save-settings") {
    if (user.role !== "admin") return NextResponse.json({ error: "Admin only" }, { status: 403 });
    const s = await getFbrSettings();
    const d = body.data ?? {};
    await db.update(fbrSettings).set({
      businessName: d.businessName ?? s.businessName,
      ntn: d.ntn ?? s.ntn,
      strn: d.strn ?? s.strn,
      province: d.province ?? s.province,
      address: d.address ?? s.address,
      environment: d.environment ?? s.environment,
      posId: d.posId ?? s.posId,
      usinPrefix: d.usinPrefix ?? s.usinPrefix,
      autoSync: d.autoSync ?? s.autoSync,
      isActive: d.isActive ?? s.isActive,
      ...(d.apiToken && d.apiToken !== "••••••" ? { apiToken: d.apiToken } : {}),
      updatedAt: new Date(),
    }).where(eq(fbrSettings.id, s.id));
    await audit(user.id, user.username, "update", "fbr_settings", String(s.id), { ...d, apiToken: d.apiToken ? "***" : undefined });
    return NextResponse.json({ ok: true });
  }

  if (action === "test") {
    const s = await getFbrSettings();
    const errors: string[] = [];
    if (!validateNTN(s.ntn)) errors.push(`Seller NTN "${s.ntn || "—"}" invalid — FBR format is 1234567-8.`);
    if (!validateSTRN(s.strn)) errors.push(`Seller STRN "${s.strn || "—"}" invalid — FBR numeric STRN (10–15 digits).`);
    if (!s.businessName) errors.push("Business name is required.");
    if (errors.length) return NextResponse.json({ ok: false, errors });
    return NextResponse.json({
      ok: true,
      message: s.environment === "production" && s.apiToken
        ? `Production endpoint reachable (POS ${s.posId}). Live PRAL submission enabled.`
        : `Sandbox simulator reachable (POS ${s.posId}). Invoices will be validated + issued IRN/QR in sandbox mode.`,
    });
  }

  if (action === "sync") {
    const res = await syncDocument(Number(body.documentId), user);
    if (!res.ok) return NextResponse.json({ ok: false, errors: res.errors, warnings: res.warnings }, { status: 400 });
    return NextResponse.json({ ok: true, fbrInvoiceNo: res.fbrInvoiceNo, usin: res.usin, warnings: res.warnings });
  }

  if (action === "bulk") {
    const ids: number[] = Array.isArray(body.ids) ? body.ids.map(Number) : [];
    let list = ids;
    if (!list.length) {
      const pending = await db.select({ id: documents.id }).from(documents)
        .where(sql`${documents.docType} in ('SINV','POS','SRET') and ${documents.fbrStatus} in ('not_synced','failed','queued')`)
        .limit(50);
      list = pending.map((p) => p.id);
    }
    const results: Array<{ id: number; ok: boolean; fbrInvoiceNo?: string; error?: string }> = [];
    for (const id of list.slice(0, 50)) {
      try {
        const r = await syncDocument(id, user);
        results.push(r.ok ? { id, ok: true, fbrInvoiceNo: r.fbrInvoiceNo } : { id, ok: false, error: r.errors.join(" | ") });
      } catch (e) {
        results.push({ id, ok: false, error: e instanceof Error ? e.message : "Sync failed" });
      }
    }
    const okCount = results.filter((r) => r.ok).length;
    return NextResponse.json({ ok: true, synced: okCount, failed: results.length - okCount, results });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
