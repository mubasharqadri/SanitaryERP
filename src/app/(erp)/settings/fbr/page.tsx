"use client";
import { useEffect, useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Card, Table, Badge, Modal, money, FbrStatusBadge, useToast } from "@/components/erp";

type Settings = {
  businessName: string | null; ntn: string | null; strn: string | null; province: string;
  address: string | null; environment: string; posId: string; usinPrefix: string;
  autoSync: boolean; isActive: boolean; apiToken: string;
};
type QueueRow = { id: number; docType: string; docNo: string; date: string; grandTotal: string; fbrStatus: string; fbrInvoiceNo: string | null; fbrUsin: string | null };
type LogRow = { id: number; documentId: number | null; usin: string | null; fbrInvoiceNo: string | null; status: string; error: string | null; createdAt: string };

export default function FbrPage() {
  const { data, loading, reload } = useApi<{
    settings: Settings; stats: { total: number; synced: number; pending: number; failed: number; monthValue: number };
    queue: QueueRow[]; logs: LogRow[];
    sellerChecks: { ntnValid: boolean; strnValid: boolean; hasName: boolean }; ready: boolean;
  }>("/api/fbr");
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [filter, setFilter] = useState("");
  const [busy, setBusy] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [syncing, setSyncing] = useState<number | null>(null);
  const [detail, setDetail] = useState<{ logs: LogRow[]; preview: { payload?: Record<string, unknown>; validation?: { errors: string[]; warnings: string[] }; error?: string } } | null>(null);
  const [detailDoc, setDetailDoc] = useState<QueueRow | null>(null);
  const { msg, setMsg, toast } = useToast();

  useEffect(() => {
    if (data?.settings) {
      const s = data.settings;
      setForm({ businessName: s.businessName ?? "", ntn: s.ntn ?? "", strn: s.strn ?? "", province: s.province ?? "Punjab", address: s.address ?? "", environment: s.environment ?? "sandbox", posId: s.posId ?? "POS-01", usinPrefix: s.usinPrefix ?? "USIN", autoSync: !!s.autoSync, isActive: s.isActive ?? true, apiToken: "" });
    }
  }, [data]);
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  async function save() {
    setBusy(true);
    try {
      await api("/api/fbr", { method: "POST", body: JSON.stringify({ action: "save-settings", data: { ...form, apiToken: form.apiToken || undefined } }) });
      reload(); setMsg("FBR settings saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
    finally { setBusy(false); }
  }

  async function test() {
    try {
      const r = await api<{ ok: boolean; message?: string; errors?: string[] }>("/api/fbr", { method: "POST", body: JSON.stringify({ action: "test" }) });
      setMsg((r.ok ? "✓ " : "!") + (r.message ?? (r.errors ?? []).join("; ")));
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Test failed")); }
  }

  async function syncOne(id: number) {
    setSyncing(id);
    try {
      const r = await api<{ ok: boolean; fbrInvoiceNo: string; warnings?: string[] }>("/api/fbr", { method: "POST", body: JSON.stringify({ action: "sync", documentId: id }) });
      reload(); setMsg(`📡 Synced → ${r.fbrInvoiceNo} ✓${r.warnings?.length ? " · ⚠ " + r.warnings.join("; ") : ""}`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Sync failed")); reload(); }
    finally { setSyncing(null); }
  }

  async function bulk() {
    if (!confirm("Sync all pending/failed invoices to FBR?")) return;
    setBulkBusy(true);
    try {
      const r = await api<{ synced: number; failed: number }>("/api/fbr", { method: "POST", body: JSON.stringify({ action: "bulk" }) });
      reload(); setMsg(`Bulk sync: ${r.synced} synced, ${r.failed} failed`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Bulk sync failed")); }
    finally { setBulkBusy(false); }
  }

  async function openDetail(row: QueueRow) {
    setDetailDoc(row);
    try { setDetail(await api(`/api/fbr?documentId=${row.id}`)); }
    catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Load failed")); }
  }

  if (loading || !data) return <div className="p-8 text-center text-slate-500">Loading FBR console…</div>;
  const queue = data.queue.filter((r) => !filter || r.fbrStatus === filter || (filter === "pending" && (r.fbrStatus === "not_synced" || r.fbrStatus === "queued")));

  return (
    <div>
      <PageHead title="📡 FBR Digital Invoicing" sub="SRO 709(I)/2025 · Rule 150Q — real-time IRN + QR per sales invoice"
        actions={<><Btn tone="ghost" onClick={test}>🔌 Test Connection</Btn><Btn tone="success" onClick={bulk} disabled={bulkBusy}>{bulkBusy ? "Syncing…" : `📡 Sync All Pending (${data.stats.pending})`}</Btn></>} />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[["Reportable", data.stats.total, "📄"], ["Synced", data.stats.synced, "✅"], ["Pending", data.stats.pending, "⏳"], ["Failed", data.stats.failed, "❌"]].map(([l, v, i]) => (
          <Card key={l as string}><div className="text-xs text-slate-500">{i} {l}</div><div className="text-2xl font-extrabold">{v}</div></Card>
        ))}
        <Card><div className="text-xs text-slate-500">💰 Month reported value</div><div className="text-2xl font-extrabold">Rs {money(data.stats.monthValue)}</div></Card>
      </div>

      <div className={`mb-4 rounded-xl border p-3 text-sm ${data.ready ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-rose-300 bg-rose-50 text-rose-800"}`}>
        {data.ready ? "✓ Seller credentials valid — ready to sync." : "✗ Seller credentials incomplete:"}
        {!data.sellerChecks.ntnValid && " NTN invalid (1234567-8)."}
        {!data.sellerChecks.strnValid && " STRN invalid (numeric 10–15 digits)."}
        {!data.sellerChecks.hasName && " Business name missing."}
        {!data.ready && " Fix below, then Test Connection."}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="h-fit">
          <h3 className="mb-3 font-bold">🏢 Seller / PRAL Settings</h3>
          <div className="grid gap-3">
            <Field label="Business Name *"><input className={inputCls} value={String(form.businessName ?? "")} onChange={(e) => set("businessName", e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="NTN *"><input className={inputCls} placeholder="1234567-8" value={String(form.ntn ?? "")} onChange={(e) => set("ntn", e.target.value)} /></Field>
              <Field label="STRN *"><input className={inputCls} placeholder="3277876123456" value={String(form.strn ?? "")} onChange={(e) => set("strn", e.target.value)} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Province"><select className={inputCls} value={String(form.province ?? "Punjab")} onChange={(e) => set("province", e.target.value)}>
                {["Punjab", "Sindh", "KPK", "Balochistan", "ICT", "Gilgit-Baltistan", "AJK"].map((p) => <option key={p} value={p}>{p}</option>)}
              </select></Field>
              <Field label="POS ID"><input className={inputCls} value={String(form.posId ?? "")} onChange={(e) => set("posId", e.target.value)} /></Field>
            </div>
            <Field label="Address"><input className={inputCls} value={String(form.address ?? "")} onChange={(e) => set("address", e.target.value)} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Environment"><select className={inputCls} value={String(form.environment ?? "sandbox")} onChange={(e) => set("environment", e.target.value)}>
                <option value="sandbox">Sandbox (simulator)</option>
                <option value="production">Production (live PRAL)</option>
              </select></Field>
              <Field label="USIN Prefix"><input className={inputCls} value={String(form.usinPrefix ?? "")} onChange={(e) => set("usinPrefix", e.target.value)} /></Field>
            </div>
            <Field label="PRAL/IRIS API Token (production)"><input type="password" className={inputCls} placeholder={data.settings.apiToken ? "•••••• (saved)" : "paste token for live mode"} value={String(form.apiToken ?? "")} onChange={(e) => set("apiToken", e.target.value)} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.autoSync} onChange={(e) => set("autoSync", e.target.checked)} /> Auto-sync new invoices on save</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive !== false} onChange={(e) => set("isActive", e.target.checked)} /> Integration active</label>
            <Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "💾 Save Settings"}</Btn>
            <p className="text-[11px] text-slate-500">Sandbox mode validates exactly like FBR and issues test IRN + QR. For live filing, switch to Production with your PRAL token — tokens stay server-side.</p>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">🧾 Invoice Queue (SINV · POS · SRET)</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className={inputCls} style={{ width: "auto" }}>
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="synced">Synced</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <Table head={["Doc No", "Date", "Total", "FBR Status", "IRN / USIN", ""]}>
            {queue.map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 font-mono text-xs font-bold">{r.docType} {r.docNo}</td>
                <td className="px-3 py-2">{String(r.date).slice(0, 10)}</td>
                <td className="px-3 py-2 text-right">{money(r.grandTotal)}</td>
                <td className="px-3 py-2"><FbrStatusBadge status={r.fbrStatus} /></td>
                <td className="px-3 py-2 font-mono text-[10px]">{r.fbrInvoiceNo ?? "—"}{r.fbrUsin ? <><br />{r.fbrUsin}</> : ""}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap">
                  <button className="mr-2 text-xs font-semibold text-indigo-600 hover:underline" onClick={() => openDetail(r)}>Inspect</button>
                  {r.fbrStatus !== "synced" && <button disabled={syncing === r.id} className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50" onClick={() => syncOne(r.id)}>{syncing === r.id ? "…" : "Sync"}</button>}
                </td>
              </tr>
            ))}
          </Table>
          <h3 className="mb-2 mt-5 font-bold">📜 Recent Sync Attempts</h3>
          <Table head={["#", "Time", "Doc", "USIN", "IRN", "Result", "Error"]}>
            {data.logs.map((l) => (
              <tr key={l.id}><td className="px-3 py-2">{l.id}</td>
              <td className="px-3 py-2 text-xs">{new Date(l.createdAt).toLocaleString()}</td>
              <td className="px-3 py-2">#{l.documentId}</td>
              <td className="px-3 py-2 font-mono text-[10px]">{l.usin ?? "—"}</td>
              <td className="px-3 py-2 font-mono text-[10px]">{l.fbrInvoiceNo ?? "—"}</td>
              <td className="px-3 py-2"><Badge tone={l.status === "synced" ? "green" : "red"}>{l.status}</Badge></td>
              <td className="px-3 py-2 max-w-[260px] truncate text-xs text-rose-600">{l.error ?? ""}</td></tr>
            ))}
          </Table>
        </div>
      </div>

      {detail && detailDoc && (
        <Modal title={`Inspect ${detailDoc.docNo}`} onClose={() => { setDetail(null); setDetailDoc(null); }} wide>
          {detail.preview.error ? <div className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{detail.preview.error}</div> : (
            <>
              {(detail.preview.validation?.errors?.length ?? 0) > 0 && (
                <div className="mb-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
                  <b>Blocking errors:</b><ul className="list-disc pl-5">{detail.preview.validation!.errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
                </div>
              )}
              {(detail.preview.validation?.warnings?.length ?? 0) > 0 && (
                <div className="mb-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                  <b>Warnings:</b><ul className="list-disc pl-5">{detail.preview.validation!.warnings.map((e, i) => <li key={i}>{e}</li>)}</ul>
                </div>
              )}
              {!(detail.preview.validation?.errors?.length) && <div className="mb-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">✓ Payload passes all FBR mandatory-field + arithmetic checks.</div>}
              <h4 className="mb-1 text-sm font-bold">FBR JSON payload (as submitted)</h4>
              <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-3 text-[11px] text-emerald-200">{JSON.stringify(detail.preview.payload, null, 2)}</pre>
              <h4 className="mb-1 mt-3 text-sm font-bold">Attempt log</h4>
              <Table head={["#", "Time", "USIN", "IRN", "Result", "Error"]}>
                {detail.logs.map((l) => (
                  <tr key={l.id}><td className="px-3 py-2">{l.id}</td><td className="px-3 py-2 text-xs">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="px-3 py-2 font-mono text-[10px]">{l.usin ?? "—"}</td><td className="px-3 py-2 font-mono text-[10px]">{l.fbrInvoiceNo ?? "—"}</td>
                  <td className="px-3 py-2"><Badge tone={l.status === "synced" ? "green" : "red"}>{l.status}</Badge></td>
                  <td className="px-3 py-2 text-xs text-rose-600">{l.error ?? ""}</td></tr>
                ))}
              </Table>
              <div className="mt-3 flex justify-end gap-2">
                <Btn tone="ghost" onClick={() => { setDetail(null); setDetailDoc(null); }}>Close</Btn>
                <Btn tone="success" onClick={async () => { await syncOne(detailDoc.id); openDetail(detailDoc); }}>📡 Sync Now</Btn>
              </div>
            </>
          )}
        </Modal>
      )}
      {toast}
    </div>
  );
}
