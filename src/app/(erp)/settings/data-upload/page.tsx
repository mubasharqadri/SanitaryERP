"use client";
import { useEffect, useState } from "react";
import { api, useApi, PageHead, Card, Btn, inputCls, useToast } from "@/components/erp";

type Rights = { canUpload: boolean; canDownload: boolean; isAdmin: boolean; entities: string[] };

const LABELS: Record<string, string> = {
  item: "📦 Items / Product Catalog",
  salesman: "🧑‍💼 Salesmen (with pictures)",
  customer: "👥 Customers",
  vendor: "🏭 Vendors",
  account: "🗂️ Chart of Accounts",
  voucher: "📒 Vouchers (JV/BRV/BPV/CRV/CPV)",
  sinv: "🧮 Sales Invoices",
  sret: "↩️ Sales Returns (with condition)",
  pinv: "📥 Purchase Invoices",
  pret: "↩️ Purchase Returns (with condition)",
  so: "🧾 Sales Orders",
  po: "📑 Purchase Orders",
  quot: "📝 Quotations",
  adj: "🔧 Adjustment Invoices",
};

export default function DataUploadPage() {
  const { data: rights, loading } = useApi<Rights>("/api/import?action=rights");
  const [entity, setEntity] = useState("item");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ imported: number; failed: number; errors: string[] } | null>(null);
  const { msg, setMsg, toast } = useToast();

  useEffect(() => { if (rights?.entities?.length && !rights.entities.includes(entity)) setEntity("item"); }, [rights, entity]);

  async function doImport() {
    if (!file) return setMsg("!Choose a CSV file first");
    setBusy(true); setResult(null);
    try {
      const fd = new FormData();
      fd.append("entity", entity);
      fd.append("file", file);
      const res = await fetch("/api/import", { method: "POST", body: fd });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Import failed");
      setResult(d);
      setMsg(`Imported ${d.imported} row(s), ${d.failed} failed`);
      setFile(null);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Import failed")); }
    finally { setBusy(false); }
  }

  if (loading || !rights) return <div className="p-8 text-center text-slate-500">Loading transfer rights…</div>;

  if (!rights.canUpload && !rights.canDownload) {
    return (
      <div>
        <PageHead title="📤 Bulk Data Transfer" sub="Import data from other software" />
        <Card>
          <div className="py-10 text-center">
            <div className="text-4xl">🔒</div>
            <h3 className="mt-3 font-bold">No transfer rights</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
              Your account cannot upload or download bulk data. Ask an administrator to grant <b>Upload</b> / <b>Download</b> under
              <b> Settings → Permissions → Bulk Data Transfer Rights</b>.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHead title="📤 Bulk Data Transfer" sub="Migrate master data and transactions from any other software via CSV"
        actions={<>
          {rights.canDownload && <a href={`/api/import?action=template&entity=${entity}`} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">⬇️ Download Template</a>}
        </>} />

      <div className={`mb-4 rounded-xl border p-3 text-sm ${rights.canUpload ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-amber-300 bg-amber-50 text-amber-800"}`}>
        {rights.isAdmin && <b>Administrator — </b>}
        Upload: <b>{rights.canUpload ? "allowed" : "blocked"}</b> · Download: <b>{rights.canDownload ? "allowed" : "blocked"}</b>
        {!rights.canUpload && " — you may download templates but not import."}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="mb-3 font-bold">1️⃣ Choose data type</h3>
          <select className={inputCls} value={entity} onChange={(e) => { setEntity(e.target.value); setResult(null); }}>
            {Object.keys(LABELS).map((k) => <option key={k} value={k}>{LABELS[k]}</option>)}
          </select>
          {rights.canDownload && (
            <a href={`/api/import?action=template&entity=${entity}`} className="mt-3 block rounded-lg bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700">⬇️ Download {entity} template</a>
          )}
          <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
            <b>How it works</b>
            <ol className="mt-1 list-decimal space-y-0.5 pl-4">
              <li>Download the CSV template for the data type.</li>
              <li>Fill it from your old software export.</li>
              <li>Upload it — rows are validated one by one.</li>
            </ol>
            <p className="mt-2">Master data (<i>item, customer, vendor, salesman, account</i>) is <b>upserted</b> — existing codes are updated, new ones created. Transactions are posted with full stock and ledger effects.</p>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-3 font-bold">2️⃣ Upload filled CSV</h3>
          {rights.canUpload ? (
            <>
              <input type="file" accept=".csv,text/csv" onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full rounded-lg border border-dashed border-slate-300 p-6 text-sm" />
              <div className="mt-3 flex items-center gap-3">
                <Btn tone="success" onClick={doImport} disabled={busy || !file}>{busy ? "Importing…" : `⬆️ Import ${entity} data`}</Btn>
                {file && <span className="text-xs text-slate-500">{file.name} · {(file.size / 1024).toFixed(1)} KB</span>}
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-amber-50 p-6 text-center text-sm text-amber-800">Upload is blocked for your account.</div>
          )}

          {result && (
            <div className={`mt-4 rounded-xl p-3 text-sm ${result.failed ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>
              <b>{result.imported}</b> row(s) imported, <b>{result.failed}</b> failed.
              {result.errors.length > 0 && (
                <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs">
                  {result.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
            </div>
          )}

          <div className="mt-5 border-t pt-3">
            <h4 className="mb-2 text-sm font-bold">Notes per type</h4>
            <div className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-2"><b>Items</b> — code, prices, opening stock, HS code, tax class and multiple picture URLs (comma separated).</div>
              <div className="rounded-lg bg-slate-50 p-2"><b>Salesmen</b> — pictures column accepts face photo, CNIC front/back, resume URLs.</div>
              <div className="rounded-lg bg-slate-50 p-2"><b>Transactions</b> — group rows by same date + party to build one document with many lines.</div>
              <div className="rounded-lg bg-slate-50 p-2"><b>Returns</b> — use returnCondition = normal / damaged / broken; damaged &amp; broken skip saleable stock.</div>
            </div>
          </div>
        </Card>
      </div>
      {toast}
    </div>
  );
}
