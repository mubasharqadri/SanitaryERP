"use client";
import { useState } from "react";
import { useApi, PageHead, money, Btn, LetterheadPrintWrapper } from "@/components/erp";
import { PeriodBar, LedgerModal, usePeriod } from "../trial/page";

type Acc = { id: number; code: string; name: string; type: string; periodDr: number; periodCr: number; prevYearDebit: string; prevYearCredit: string };

export default function PLPage() {
  const { from, to, setFrom, setTo } = usePeriod();
  const [showPrev, setShowPrev] = useState(true);
  const { data, loading, reload } = useApi<{ accounts: Acc[] }>(`/api/accounts?from=${from}&to=${to}`, [from, to]);
  const [ledgerAcc, setLedgerAcc] = useState<number | null>(null);

  const acc = data?.accounts ?? [];
  const income = acc.filter((a) => a.type === "Income");
  const expense = acc.filter((a) => a.type === "Expense");
  const tInc = income.reduce((a, r) => a + (r.periodCr - r.periodDr), 0);
  const pInc = income.reduce((a, r) => a + (Number(r.prevYearCredit) - Number(r.prevYearDebit)), 0);
  const tExp = expense.reduce((a, r) => a + (r.periodDr - r.periodCr), 0);
  const pExp = expense.reduce((a, r) => a + (Number(r.prevYearDebit) - Number(r.prevYearCredit)), 0);
  const net = tInc - tExp, netP = pInc - pExp;
  const span = showPrev ? 3 : 2;

  function excel() {
    const el = document.getElementById("pl-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Profit &amp; Loss (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `profit_loss_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  const Row = ({ a, kind }: { a: Acc; kind: "inc" | "exp" }) => (
    <tr className="border-b border-slate-100 text-[12px]">
      <td className="px-5 py-1.5">{a.code} — {a.name}</td>
      <td className="px-3 py-1.5 text-right">{money(kind === "inc" ? a.periodCr - a.periodDr : a.periodDr - a.periodCr)}</td>
      {showPrev && <td className="px-3 py-1.5 text-right">{money(kind === "inc" ? Number(a.prevYearCredit) - Number(a.prevYearDebit) : Number(a.prevYearDebit) - Number(a.prevYearCredit))}</td>}
      <td className="no-print"><button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => setLedgerAcc(a.id)}>Ledger</button></td>
    </tr>
  );

  return (
    <div>
      <PageHead title="📈 Profit & Loss" sub="Period statement with account-level ledger drill-down"
        actions={<><Btn tone="ghost" onClick={excel}>📊 Excel</Btn><Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn></>} />

      <PeriodBar from={from} to={to} setFrom={setFrom} setTo={setTo} showPrev={showPrev} setShowPrev={setShowPrev} onApply={reload} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <LetterheadPrintWrapper title={`Profit & Loss Statement (${from} to ${to})`} layout="A4">
            <div id="pl-inner">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="border-b-2 border-slate-900 bg-slate-50 text-left font-bold">
                  <th className="px-3 py-2">Particulars</th><th className="px-3 py-2 text-right">Current Period</th>
                  {showPrev && <th className="px-3 py-2 text-right">Previous Year</th>}<th className="no-print" />
                </tr></thead>
                <tbody>
                  <tr className="border-y bg-slate-50 font-extrabold text-emerald-800"><td className="px-3 py-2" colSpan={span + 1}>1. REVENUE / INCOME</td></tr>
                  {income.map((a) => <Row key={a.id} a={a} kind="inc" />)}
                  <tr className="border-y border-emerald-200 bg-emerald-50/60 font-bold"><td className="px-3 py-2 uppercase">Total Revenue (A)</td>
                    <td className="px-3 py-2 text-right">{money(tInc)}</td>{showPrev && <td className="px-3 py-2 text-right">{money(pInc)}</td>}<td className="no-print" /></tr>

                  <tr className="border-y bg-slate-50 font-extrabold text-rose-800"><td className="px-3 py-2" colSpan={span + 1}>2. OPERATING EXPENSES</td></tr>
                  {expense.map((a) => <Row key={a.id} a={a} kind="exp" />)}
                  <tr className="border-y border-rose-200 bg-rose-50/60 font-bold"><td className="px-3 py-2 uppercase">Total Expenses (B)</td>
                    <td className="px-3 py-2 text-right">{money(tExp)}</td>{showPrev && <td className="px-3 py-2 text-right">{money(pExp)}</td>}<td className="no-print" /></tr>

                  <tr className={`border-y-2 border-slate-900 text-lg font-extrabold ${net >= 0 ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
                    <td className="px-3 py-2.5">NET PROFIT / (LOSS) (A − B)</td>
                    <td className="px-3 py-2.5 text-right">{money(net)}</td>
                    {showPrev && <td className="px-3 py-2.5 text-right">{money(netP)}</td>}<td className="no-print" />
                  </tr>
                </tbody>
              </table>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}
      <LedgerModal accountId={ledgerAcc} onClose={() => setLedgerAcc(null)} />
    </div>
  );
}
