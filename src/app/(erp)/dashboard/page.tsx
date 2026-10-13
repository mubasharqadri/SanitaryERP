"use client";
import Link from "next/link";
import { useApi, PageHead, Stat, Card, money, Table, Badge } from "@/components/erp";

type Dash = {
  salesToday: number; salesMonth: number; purchMonth: number; recvMonth: number; payMonth: number;
  receivables: number; payables: number; countItems: number; countCust: number; countVend: number;
  recentDocs: Array<{ id: number; docType: string; docNo: string; date: string; grandTotal: string; status: string }>;
  alarms: Array<{ id: number; code: string; name: string; stock: number; reorderLevel: number }>;
  trend: Array<{ date: string; total: number }>;
  modes: Array<{ m: string; t: string }>;
  taxMonth?: { outputTax: number; inputTax: number; furtherTax: number; netPayable: number };
  fbr?: { pending: number; synced: number };
};

export default function DashboardPage() {
  const { data, loading } = useApi<Dash>("/api/dashboard");
  if (loading || !data) return <div className="p-8 text-center text-slate-500">Loading dashboard…</div>;
  const maxTrend = Math.max(1, ...data.trend.map((t) => t.total));
  return (
    <div>
      <PageHead title="📊 Dashboard" sub="Live business overview — sales, recovery, stock alarms" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Sold Today" value={`Rs ${money(data.salesToday)}`} icon="🔥" tone="amber" />
        <Stat label="Sales This Month" value={`Rs ${money(data.salesMonth)}`} icon="💰" tone="emerald" />
        <Stat label="Receivables" value={`Rs ${money(data.receivables)}`} icon="📤" tone="sky" />
        <Stat label="Payables" value={`Rs ${money(data.payables)}`} icon="📥" tone="rose" />
        <Stat label="Purchases (Month)" value={`Rs ${money(data.purchMonth)}`} icon="🧾" tone="indigo" />
        <Stat label="Recovered (Month)" value={`Rs ${money(data.recvMonth)}`} icon="💵" tone="emerald" />
        <Stat label="Paid (Month)" value={`Rs ${money(data.payMonth)}`} icon="💸" tone="rose" />
        <Stat label="Catalog" value={`${data.countItems} items`} icon="📦" tone="slate" />
      </div>

      {/* 🇵🇰 PK Compliance strip */}
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <Card className={data.fbr && data.fbr.pending > 0 ? "border-amber-300 bg-amber-50" : "border-emerald-200 bg-emerald-50"}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-slate-500">📡 FBR E-Invoicing</div>
              <div className="text-lg font-bold">{data.fbr ? `${data.fbr.synced} synced · ${data.fbr.pending} pending` : "…"}</div>
            </div>
            <Link href="/settings/fbr" className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700">Open Queue →</Link>
          </div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">🧮 Sales Tax (Month) — Output / Input / Net</div>
          <div className="text-lg font-bold">Rs {money(data.taxMonth?.netPayable ?? 0)} <span className="text-xs font-normal text-slate-500">payable</span></div>
          <div className="text-xs text-slate-500">Out Rs {money(data.taxMonth?.outputTax ?? 0)} · In Rs {money(data.taxMonth?.inputTax ?? 0)} · Further Rs {money(data.taxMonth?.furtherTax ?? 0)}</div>
        </Card>
        <Card>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">🇵🇰 Compliance Shortcuts</div>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            <Link href="/reports/tax" className="rounded-lg bg-indigo-600 px-3 py-1.5 font-bold text-white">Tax Return Summary</Link>
            <Link href="/settings/tax" className="rounded-lg border px-3 py-1.5 font-bold">Tax Settings</Link>
            <Link href="/settings/integrity" className="rounded-lg border px-3 py-1.5 font-bold">Integrity</Link>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-3 font-bold text-slate-800">📈 Last 7 Days Sales</h3>
          <div className="flex h-40 items-end gap-2">
            {data.trend.map((t) => (
              <div key={t.date} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-indigo-500" style={{ height: `${Math.max(4, (t.total / maxTrend) * 100)}px` }} title={money(t.total)} />
                <span className="text-[10px] text-slate-500">{t.date}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-3 font-bold text-slate-800">💳 Payment Mix (This Month)</h3>
          <div className="space-y-2">
            {data.modes.map((m) => (
              <div key={m.m} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <span className="font-medium capitalize">{m.m}</span><b>Rs {money(m.t)}</b>
              </div>
            ))}
            {data.modes.length === 0 && <div className="text-sm text-slate-400">No sales yet this month.</div>}
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 font-bold text-slate-800">🚨 Reorder Alarms</h3>
          <Table head={["Code", "Item", "Stock", "Reorder"]}>
            {data.alarms.map((a) => (
              <tr key={a.id}><td className="px-3 py-2 font-mono text-xs">{a.code}</td><td className="px-3 py-2">{a.name}</td>
              <td className="px-3 py-2"><Badge tone={a.stock <= 0 ? "red" : "amber"}>{a.stock}</Badge></td>
              <td className="px-3 py-2">{a.reorderLevel}</td></tr>
            ))}
          </Table>
          {data.alarms.length === 0 && <div className="mt-2 text-sm text-emerald-600">✅ All items above reorder level.</div>}
        </div>
        <div>
          <h3 className="mb-2 font-bold text-slate-800">🧾 Recent Documents</h3>
          <Table head={["Doc No", "Type", "Date", "Total", "Status"]}>
            {data.recentDocs.map((d) => (
              <tr key={d.id}><td className="px-3 py-2 font-mono text-xs">{d.docNo}</td><td className="px-3 py-2">{d.docType}</td>
              <td className="px-3 py-2">{String(d.date).slice(0, 10)}</td><td className="px-3 py-2 text-right">{money(d.grandTotal)}</td>
              <td className="px-3 py-2"><Badge tone={d.status === "Cancelled" ? "red" : "green"}>{d.status}</Badge></td></tr>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
