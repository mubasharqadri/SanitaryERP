"use client";
import { useState } from "react";
import { useApi, PageHead, Table, money, Btn, inputCls, LetterheadPrintWrapper } from "@/components/erp";

type Row = { id: number; docNo: string; date: string; party: string; items: number; revenue: number; cost: number; profit: number; salesTax: number; furtherTax: number; grandTotal: number; mode: string; status: string };
type Tot = { orders: number; revenue: number; cost: number; profit: number; tax: number };

export default function OnlineOrdersPage() {
  const d = new Date();
  const [from, setFrom] = useState(`${d.getFullYear()}-01-01`);
  const [to, setTo] = useState(d.toISOString().slice(0, 10));
  const { data, loading, reload } = useApi<{ rows: Row[]; totals: Tot }>(`/api/reports?type=online-orders&from=${from}&to=${to}`, [from, to]);
  const t = data?.totals;

  function excel() {
    const el = document.getElementById("online-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Online Orders (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `online_orders_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="🛒 Online Orders" sub="Orders booked against Online-Customer — revenue, cost, profit and tax"
        actions={<><Btn tone="ghost" onClick={excel}>📊 Excel</Btn><Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn></>} />

      <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">From</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} /></div>
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">To</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} /></div>
        <Btn small onClick={reload}>Apply</Btn>
      </div>

      {loading || !t ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
            <div className="rounded-xl border bg-white p-3 shadow-sm"><div className="text-xs text-slate-500">Orders</div><div className="text-2xl font-extrabold">{t.orders}</div></div>
            <div className="rounded-xl border bg-white p-3 shadow-sm"><div className="text-xs text-slate-500">Revenue (excl. tax)</div><div className="text-2xl font-extrabold text-indigo-700">Rs {money(t.revenue)}</div></div>
            <div className="rounded-xl border bg-white p-3 shadow-sm"><div className="text-xs text-slate-500">Cost of items</div><div className="text-2xl font-extrabold text-slate-700">Rs {money(t.cost)}</div></div>
            <div className={`rounded-xl border p-3 shadow-sm ${t.profit >= 0 ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
              <div className="text-xs text-slate-500">Gross Profit</div><div className={`text-2xl font-extrabold ${t.profit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>Rs {money(t.profit)}</div></div>
            <div className="rounded-xl border bg-white p-3 shadow-sm"><div className="text-xs text-slate-500">Sales Tax collected</div><div className="text-2xl font-extrabold text-amber-700">Rs {money(t.tax)}</div></div>
          </div>

          <LetterheadPrintWrapper title={`Online Orders Report (${from} to ${to})`} layout="A4">
            <div id="online-inner">
              <Table head={["Doc No", "Date", "Customer", "Lines", "Revenue (excl. tax)", "Cost", "Gross Profit", "Margin", "Sales Tax", "Grand Total", "Mode", "Status"]}>
                {(data?.rows ?? []).map((r) => (
                  <tr key={r.id} className="text-[12px]">
                    <td className="px-2 py-1.5 font-mono text-[11px] font-bold">{r.docNo}</td>
                    <td className="px-2 py-1.5">{String(r.date).slice(0, 10)}</td>
                    <td className="px-2 py-1.5">{r.party}</td>
                    <td className="px-2 py-1.5">{r.items}</td>
                    <td className="px-2 py-1.5 text-right font-semibold">{money(r.revenue)}</td>
                    <td className="px-2 py-1.5 text-right text-slate-600">{money(r.cost)}</td>
                    <td className={`px-2 py-1.5 text-right font-bold ${r.profit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{money(r.profit)}</td>
                    <td className="px-2 py-1.5 text-right">{r.revenue ? `${Math.round((r.profit / r.revenue) * 100)}%` : "—"}</td>
                    <td className="px-2 py-1.5 text-right text-amber-700">{money(r.salesTax + r.furtherTax)}</td>
                    <td className="px-2 py-1.5 text-right font-bold">{money(r.grandTotal)}</td>
                    <td className="px-2 py-1.5">{r.mode}</td>
                    <td className="px-2 py-1.5">{r.status}</td>
                  </tr>
                ))}
                {!(data?.rows ?? []).length && <tr><td colSpan={12} className="py-6 text-center text-slate-400 italic">No online orders in this period.</td></tr>}
                <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                  <td className="px-2 py-2 uppercase" colSpan={4}>Total</td>
                  <td className="px-2 py-2 text-right">{money(t.revenue)}</td>
                  <td className="px-2 py-2 text-right">{money(t.cost)}</td>
                  <td className="px-2 py-2 text-right">{money(t.profit)}</td>
                  <td className="px-2 py-2" />
                  <td className="px-2 py-2 text-right">{money(t.tax)}</td>
                  <td className="px-2 py-2 text-right">{money(data?.rows.reduce((a, r) => a + r.grandTotal, 0) ?? 0)}</td>
                  <td colSpan={2} />
                </tr>
              </Table>
              <div className="mt-2 text-[10px] text-slate-400">Revenue excludes sales tax · cost based on each item&apos;s cost price · profit = revenue − cost.</div>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}
    </div>
  );
}
