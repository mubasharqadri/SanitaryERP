"use client";
import { useState } from "react";
import { useApi, PageHead, Table, money, Btn, inputCls, LetterheadPrintWrapper, Modal, Badge } from "@/components/erp";

type Day = { date: string; sales: number; invoices: number; cash: number; bank: number; card: number; online: number; credit: number; cheque: number };
type Drill = {
  date: string;
  totals: { sales: number; returns: number; received: number; paid: number };
  sales: Array<{ id: number; docNo: string; docType: string; party: string; subtotal: number; salesTax: number; furtherTax: number; grandTotal: number; paid: number; mode: string; status: string }>;
  recovery: Array<{ id: number; voucherNo: string; voucherType: string; party: string; amount: number; direction: string; narration: string; status: string }>;
};

export default function DailyPage() {
  const [from, setFrom] = useState(new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10));
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const { data, loading } = useApi<{ rows: Day[] }>(`/api/reports?type=daily&from=${from}&to=${to}`, [from, to]);
  const [drill, setDrill] = useState<Drill | null>(null);

  const rows = data?.rows ?? [];
  const tSales = rows.reduce((a, r) => a + r.sales, 0);

  function excel() {
    const el = document.getElementById("daily-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Daily Sales &amp; Recovery (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `daily_sales_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="🗓️ Daily Sales &amp; Recovery" sub="Payment-mode breakdown per day — click a day to see the source documents"
        actions={<>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} />
          <Btn tone="ghost" onClick={excel}>📊 Excel</Btn>
          <Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn>
        </>} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <LetterheadPrintWrapper title={`Daily Sales & Recovery Register (${from} to ${to})`} layout="A4">
            <div id="daily-inner">
              <Table head={["Date", "Invoices", "Sales", "Cash", "Bank", "Card", "Online", "Cheque", "Credit", ""]}>
                {rows.map((r) => (
                  <tr key={r.date} className="text-[12px]">
                    <td className="px-2 py-1.5 font-bold">{r.date}</td>
                    <td className="px-2 py-1.5">{r.invoices}</td>
                    <td className="px-2 py-1.5 text-right font-bold">{money(r.sales)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.cash)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.bank)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.card)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.online)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.cheque)}</td>
                    <td className="px-2 py-1.5 text-right">{money(r.credit)}</td>
                    <td className="no-print"><button className="text-xs font-bold text-indigo-600 hover:underline" onClick={async () => setDrill(await (await fetch(`/api/reports?type=daily-drill&date=${r.date}`)).json())}>Breakdown</button></td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                  <td className="px-2 py-2 uppercase" colSpan={2}>Total</td>
                  <td className="px-2 py-2 text-right">{money(tSales)}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.cash, 0))}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.bank, 0))}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.card, 0))}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.online, 0))}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.cheque, 0))}</td>
                  <td className="px-2 py-2 text-right">{money(rows.reduce((a, r) => a + r.credit, 0))}</td>
                  <td className="no-print" />
                </tr>
              </Table>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}

      {drill && (
        <Modal title={`Breakdown — ${drill.date}`} onClose={() => setDrill(null)} full>
          <div className="mb-3 grid grid-cols-4 gap-2 text-xs">
            <div className="rounded-lg bg-slate-50 p-2">Sales <b className="block text-sm">{money(drill.totals.sales)}</b></div>
            <div className="rounded-lg bg-rose-50 p-2">Returns <b className="block text-sm">{money(drill.totals.returns)}</b></div>
            <div className="rounded-lg bg-emerald-50 p-2">Received <b className="block text-sm">{money(drill.totals.received)}</b></div>
            <div className="rounded-lg bg-amber-50 p-2">Paid <b className="block text-sm">{money(drill.totals.paid)}</b></div>
          </div>
          <h4 className="mb-1 text-sm font-bold">🧾 Sales documents</h4>
          <Table head={["Doc No", "Type", "Party", "Subtotal", "ST", "Further", "Total", "Paid", "Mode", "Status"]}>
            {drill.sales.map((s) => (
              <tr key={s.id} className="text-[12px]">
                <td className="px-2 py-1.5 font-mono text-[11px] font-bold">{s.docNo}</td>
                <td className="px-2 py-1.5">{s.docType}</td>
                <td className="px-2 py-1.5">{s.party}</td>
                <td className="px-2 py-1.5 text-right">{money(s.subtotal)}</td>
                <td className="px-2 py-1.5 text-right">{money(s.salesTax)}</td>
                <td className="px-2 py-1.5 text-right">{money(s.furtherTax)}</td>
                <td className="px-2 py-1.5 text-right font-bold">{money(s.grandTotal)}</td>
                <td className="px-2 py-1.5 text-right">{money(s.paid)}</td>
                <td className="px-2 py-1.5">{s.mode}</td>
                <td className="px-2 py-1.5"><Badge tone={s.status === "Cancelled" ? "red" : "green"}>{s.status}</Badge></td>
              </tr>
            ))}
            {drill.sales.length === 0 && <tr><td colSpan={10} className="py-4 text-center text-slate-400 italic">No sales on this date.</td></tr>}
          </Table>
          <h4 className="mb-1 mt-4 text-sm font-bold">💵 Recovery / Payment vouchers</h4>
          <Table head={["Voucher No", "Type", "Party", "Amount", "Direction", "Narration", "Status"]}>
            {drill.recovery.map((v) => (
              <tr key={v.id} className="text-[12px]">
                <td className="px-2 py-1.5 font-mono text-[11px] font-bold">{v.voucherNo}</td>
                <td className="px-2 py-1.5">{v.voucherType}</td>
                <td className="px-2 py-1.5">{v.party}</td>
                <td className="px-2 py-1.5 text-right font-bold">{money(v.amount)}</td>
                <td className="px-2 py-1.5"><Badge tone={v.direction === "Received" ? "green" : "amber"}>{v.direction}</Badge></td>
                <td className="px-2 py-1.5 text-xs text-slate-500">{v.narration}</td>
                <td className="px-2 py-1.5">{v.status}</td>
              </tr>
            ))}
            {drill.recovery.length === 0 && <tr><td colSpan={7} className="py-4 text-center text-slate-400 italic">No recovery vouchers on this date.</td></tr>}
          </Table>
        </Modal>
      )}
    </div>
  );
}
