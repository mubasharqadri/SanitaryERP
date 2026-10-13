"use client";
import { useState } from "react";
import { useApi, PageHead, money, Btn, LetterheadPrintWrapper } from "@/components/erp";
import { PeriodBar, LedgerModal, usePeriod } from "../trial/page";

type Acc = { id: number; code: string; name: string; type: string; periodDr: number; periodCr: number; prevYearDebit: string; prevYearCredit: string };

export default function BSPage() {
  const { from, to, setFrom, setTo } = usePeriod();
  const [showPrev, setShowPrev] = useState(true);
  const { data, loading, reload } = useApi<{ accounts: Acc[] }>(`/api/accounts?from=${from}&to=${to}`, [from, to]);
  const [ledgerAcc, setLedgerAcc] = useState<number | null>(null);

  const acc = data?.accounts ?? [];
  const assets = acc.filter((a) => a.type === "Asset");
  const liab = acc.filter((a) => a.type === "Liability");
  const equity = acc.filter((a) => a.type === "Equity");
  const income = acc.filter((a) => a.type === "Income");
  const expense = acc.filter((a) => a.type === "Expense");

  const tA = assets.reduce((a, r) => a + (r.periodDr - r.periodCr), 0);
  const pA = assets.reduce((a, r) => a + (Number(r.prevYearDebit) - Number(r.prevYearCredit)), 0);
  const tL = liab.reduce((a, r) => a + (r.periodCr - r.periodDr), 0);
  const pL = liab.reduce((a, r) => a + (Number(r.prevYearCredit) - Number(r.prevYearDebit)), 0);
  const tE = equity.reduce((a, r) => a + (r.periodCr - r.periodDr), 0);
  const pE = equity.reduce((a, r) => a + (Number(r.prevYearCredit) - Number(r.prevYearDebit)), 0);
  const net = income.reduce((a, r) => a + (r.periodCr - r.periodDr), 0) - expense.reduce((a, r) => a + (r.periodDr - r.periodCr), 0);
  const netP = income.reduce((a, r) => a + (Number(r.prevYearCredit) - Number(r.prevYearDebit)), 0) - expense.reduce((a, r) => a + (Number(r.prevYearDebit) - Number(r.prevYearCredit)), 0);
  const tEL = tL + tE + net, pEL = pL + pE + netP;
  const span = showPrev ? 3 : 2;

  function excel() {
    const el = document.getElementById("bs-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Balance Sheet (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `balance_sheet_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  const Row = ({ a, sign }: { a: Acc; sign: 1 | -1 }) => (
    <tr className="border-b border-slate-100 text-[12px]">
      <td className="px-5 py-1.5">{a.code} — {a.name}</td>
      <td className="px-3 py-1.5 text-right">{money(sign === 1 ? a.periodDr - a.periodCr : a.periodCr - a.periodDr)}</td>
      {showPrev && <td className="px-3 py-1.5 text-right">{money(sign === 1 ? Number(a.prevYearDebit) - Number(a.prevYearCredit) : Number(a.prevYearCredit) - Number(a.prevYearDebit))}</td>}
      <td className="no-print"><button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => setLedgerAcc(a.id)}>Ledger</button></td>
    </tr>
  );

  return (
    <div>
      <PageHead title="🏦 Balance Sheet" sub="Period statement with account-level ledger drill-down"
        actions={<><Btn tone="ghost" onClick={excel}>📊 Excel</Btn><Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn></>} />

      <PeriodBar from={from} to={to} setFrom={setFrom} setTo={setTo} showPrev={showPrev} setShowPrev={setShowPrev} onApply={reload} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <LetterheadPrintWrapper title={`Balance Sheet Statement (${from} to ${to})`} layout="A4">
            <div id="bs-inner">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="border-b-2 border-slate-900 bg-slate-50 text-left font-bold">
                  <th className="px-3 py-2">Particulars</th><th className="px-3 py-2 text-right">Current Period</th>
                  {showPrev && <th className="px-3 py-2 text-right">Previous Year</th>}<th className="no-print" />
                </tr></thead>
                <tbody>
                  <tr className="border-y bg-slate-50 font-extrabold text-indigo-900"><td className="px-3 py-2" colSpan={span + 1}>1. ASSETS</td></tr>
                  {assets.map((a) => <Row key={a.id} a={a} sign={1} />)}
                  <tr className="border-y bg-indigo-50/50 font-extrabold text-indigo-900"><td className="px-3 py-2 uppercase">Total Assets</td>
                    <td className="px-3 py-2 text-right">{money(tA)}</td>{showPrev && <td className="px-3 py-2 text-right">{money(pA)}</td>}<td className="no-print" /></tr>

                  <tr className="border-y bg-slate-50 font-extrabold text-amber-900"><td className="px-3 py-2" colSpan={span + 1}>2. LIABILITIES</td></tr>
                  {liab.map((a) => <Row key={a.id} a={a} sign={-1} />)}
                  <tr className="border-y bg-amber-50/50 font-bold text-amber-900"><td className="px-3 py-2 uppercase">Total Liabilities</td>
                    <td className="px-3 py-2 text-right">{money(tL)}</td>{showPrev && <td className="px-3 py-2 text-right">{money(pL)}</td>}<td className="no-print" /></tr>

                  <tr className="border-y bg-slate-50 font-extrabold text-emerald-900"><td className="px-3 py-2" colSpan={span + 1}>3. OWNER EQUITY</td></tr>
                  {equity.map((a) => <Row key={a.id} a={a} sign={-1} />)}
                  <tr className="border-b border-slate-100 text-[12px]"><td className="px-5 py-1.5 text-emerald-700">Retained Earnings (Period)</td>
                    <td className="px-3 py-1.5 text-right font-bold text-emerald-700">{money(net)}</td>
                    {showPrev && <td className="px-3 py-1.5 text-right font-bold text-emerald-700">{money(netP)}</td>}<td className="no-print" /></tr>
                  <tr className="border-y bg-emerald-50/50 font-bold text-emerald-900"><td className="px-3 py-2 uppercase">Total Equity</td>
                    <td className="px-3 py-2 text-right">{money(tE + net)}</td>{showPrev && <td className="px-3 py-2 text-right">{money(pE + netP)}</td>}<td className="no-print" /></tr>

                  <tr className="mt-2 border-y-2 bg-slate-900 text-base font-extrabold text-white">
                    <td className="px-3 py-2.5">TOTAL EQUITY &amp; LIABILITIES</td>
                    <td className="px-3 py-2.5 text-right">{money(tEL)}</td>
                    {showPrev && <td className="px-3 py-2.5 text-right">{money(pEL)}</td>}<td className="no-print" />
                  </tr>
                </tbody>
              </table>
              <div className={`mt-3 rounded-xl p-2.5 text-center text-xs font-bold ${Math.abs(tA - tEL) < 1 ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                {Math.abs(tA - tEL) < 1 ? `✓ Balanced — Assets ${money(tA)} = Equity & Liabilities ${money(tEL)}` : `✗ Out of balance (${money(tA)} vs ${money(tEL)})`}
              </div>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}
      <LedgerModal accountId={ledgerAcc} onClose={() => setLedgerAcc(null)} />
    </div>
  );
}
