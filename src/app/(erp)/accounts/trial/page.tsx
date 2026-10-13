"use client";
import { useState } from "react";
import { api, useApi, PageHead, Table, money, Btn, inputCls, LetterheadPrintWrapper, Modal } from "@/components/erp";

type Acc = { id: number; code: string; name: string; type: string; periodDr: number; periodCr: number; openingDebit: string; openingCredit: string; prevYearDebit: string; prevYearCredit: string };
type Ledger = {
  account: Acc; from: string; to: string;
  openingDr: number; openingCr: number; openingBalance: number;
  periodDr: number; periodCr: number; closingBalance: number;
  ledger: Array<{ id: number; date: string; voucherNo: string; voucherType: string; narration: string | null; vNarration: string | null; debit: string; credit: string; status: string; balance: number }>;
};

export function usePeriod(defaultFrom?: string, defaultTo?: string) {
  const d = new Date();
  const [from, setFrom] = useState(defaultFrom ?? `${d.getFullYear()}-01-01`);
  const [to, setTo] = useState(defaultTo ?? d.toISOString().slice(0, 10));
  return { from, to, setFrom, setTo };
}

export function LedgerModal({ accountId, onClose }: { accountId: number | null; onClose: () => void }) {
  const { data, loading } = useApi<Ledger>(accountId ? `/api/reports?type=account-ledger&accountId=${accountId}` : null);
  if (!accountId) return null;

  function excel() {
    const el = document.getElementById("ledger-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>General Ledger — ${data?.account.code} ${data?.account.name}</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `ledger_${data?.account.code}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  return (
    <Modal title={`General Ledger — ${data?.account.code ?? ""} ${data?.account.name ?? ""}`} onClose={onClose} full>
      {loading || !data ? <div className="py-6 text-center text-slate-500">Loading ledger…</div> : (
        <>
          <div className="no-print mb-2 flex justify-end gap-2">
            <Btn small tone="ghost" onClick={excel}>📊 Excel</Btn>
            <Btn small onClick={() => window.print()}>🖨️ Print A4 / PDF</Btn>
          </div>
          <div className="print-area">
            <LetterheadPrintWrapper title={`General Ledger — ${data.account.code} ${data.account.name}`} layout="A4">
              <div id="ledger-inner">
                <div className="mb-3 grid grid-cols-4 gap-3 rounded-xl border bg-slate-50 p-3 text-xs">
                  <div>Account: <b>{data.account.code} — {data.account.name}</b></div>
                  <div>Type: <b>{data.account.type}</b></div>
                  <div>Period: <b>{data.from} → {data.to}</b></div>
                  <div>Opening: <b>{money(data.openingBalance)} {data.openingBalance >= 0 ? "Dr" : "Cr"}</b></div>
                </div>
                <Table head={["Date", "Voucher", "Type", "Narration", "Debit", "Credit", "Balance", "Status"]}>
                  {data.ledger.map((l) => (
                    <tr key={l.id} className={`text-[12px] ${l.status === "Cancelled" ? "opacity-50 line-through" : ""}`}>
                      <td className="px-2 py-1.5">{String(l.date).slice(0, 10)}</td>
                      <td className="px-2 py-1.5 font-mono text-[11px] font-bold">{l.voucherNo}</td>
                      <td className="px-2 py-1.5">{l.voucherType}</td>
                      <td className="px-2 py-1.5 text-xs text-slate-500">{l.narration ?? l.vNarration ?? "—"}</td>
                      <td className="px-2 py-1.5 text-right">{Number(l.debit) ? money(l.debit) : "—"}</td>
                      <td className="px-2 py-1.5 text-right">{Number(l.credit) ? money(l.credit) : "—"}</td>
                      <td className="px-2 py-1.5 text-right font-bold">{money(l.balance)}</td>
                      <td className="px-2 py-1.5 text-xs">{l.status}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-slate-50 text-[12px] font-bold">
                    <td className="px-2 py-2" colSpan={4}>Opening Balance</td>
                    <td className="px-2 py-2 text-right">{money(data.openingDr)}</td>
                    <td className="px-2 py-2 text-right">{money(data.openingCr)}</td>
                    <td className="px-2 py-2 text-right">{money(data.openingBalance)}</td><td />
                  </tr>
                  <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                    <td className="px-2 py-2 uppercase" colSpan={4}>Closing Balance</td>
                    <td className="px-2 py-2 text-right">{money(data.periodDr)}</td>
                    <td className="px-2 py-2 text-right">{money(data.periodCr)}</td>
                    <td className="px-2 py-2 text-right">{money(data.closingBalance)}</td><td />
                  </tr>
                </Table>
              </div>
            </LetterheadPrintWrapper>
          </div>
        </>
      )}
    </Modal>
  );
}

/** Shared period filter bar used by TB / P&L / Balance Sheet */
export function PeriodBar({ from, to, setFrom, setTo, showPrev, setShowPrev, onApply, extra }: {
  from: string; to: string; setFrom: (v: string) => void; setTo: (v: string) => void;
  showPrev: boolean; setShowPrev: (v: boolean) => void; onApply: () => void; extra?: React.ReactNode;
}) {
  return (
    <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4 shadow-sm">
      <div><span className="mb-1 block text-xs font-semibold text-slate-500">From</span>
        <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} /></div>
      <div><span className="mb-1 block text-xs font-semibold text-slate-500">To</span>
        <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} /></div>
      <label className="flex items-center gap-2 pb-2 text-sm font-medium text-slate-700">
        <input type="checkbox" checked={showPrev} onChange={(e) => setShowPrev(e.target.checked)} /> Show previous year
      </label>
      {extra}
      <Btn small onClick={onApply}>Apply</Btn>
    </div>
  );
}

export default function TrialPage() {
  const { from, to, setFrom, setTo } = usePeriod();
  const [showPrev, setShowPrev] = useState(true);
  const { data, loading, reload } = useApi<{ accounts: Acc[] }>(`/api/accounts?from=${from}&to=${to}`, [from, to]);
  const [ledgerAcc, setLedgerAcc] = useState<number | null>(null);

  const rows = (data?.accounts ?? []).filter((a) => a.periodDr || a.periodCr || Number(a.openingDebit) || Number(a.openingCredit) || (showPrev && (Number(a.prevYearDebit) || Number(a.prevYearCredit))));
  const tOp = rows.reduce((a, r) => a + (Number(r.openingDebit) - Number(r.openingCredit)), 0);
  const tDr = rows.reduce((a, r) => a + r.periodDr, 0);
  const tCr = rows.reduce((a, r) => a + r.periodCr, 0);
  const tBal = rows.reduce((a, r) => a + (Number(r.openingDebit) - Number(r.openingCredit) + r.periodDr - r.periodCr), 0);
  const pDr = rows.reduce((a, r) => a + Number(r.prevYearDebit), 0);
  const pCr = rows.reduce((a, r) => a + Number(r.prevYearCredit), 0);

  function excel() {
    const el = document.getElementById("trial-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Trial Balance (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `trial_balance_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="⚖️ Trial Balance" sub="Period statement with account-level ledger drill-down"
        actions={<><Btn tone="ghost" onClick={excel}>📊 Excel</Btn><Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn></>} />

      <PeriodBar from={from} to={to} setFrom={setFrom} setTo={setTo} showPrev={showPrev} setShowPrev={setShowPrev} onApply={reload} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <LetterheadPrintWrapper title={`Trial Balance (${from} to ${to})`} layout="A4">
            <div id="trial-inner">
              <Table head={["Code", "Account", "Type", "Opening", "Period Dr", "Period Cr", "Balance", ...(showPrev ? ["Prev Dr", "Prev Cr"] : []), ""]}>
                {rows.map((a) => {
                  const op = Number(a.openingDebit) - Number(a.openingCredit);
                  const bal = op + a.periodDr - a.periodCr;
                  return (
                    <tr key={a.id} className="text-[12px]">
                      <td className="px-2 py-1.5 font-mono text-[11px]">{a.code}</td>
                      <td className="px-2 py-1.5">{a.name}</td>
                      <td className="px-2 py-1.5 text-xs text-slate-500">{a.type}</td>
                      <td className="px-2 py-1.5 text-right">{money(op)}</td>
                      <td className="px-2 py-1.5 text-right">{a.periodDr ? money(a.periodDr) : "—"}</td>
                      <td className="px-2 py-1.5 text-right">{a.periodCr ? money(a.periodCr) : "—"}</td>
                      <td className="px-2 py-1.5 text-right font-bold">{money(bal)}</td>
                      {showPrev && <>
                        <td className="px-2 py-1.5 text-right text-slate-600">{Number(a.prevYearDebit) ? money(a.prevYearDebit) : "—"}</td>
                        <td className="px-2 py-1.5 text-right text-slate-600">{Number(a.prevYearCredit) ? money(a.prevYearCredit) : "—"}</td>
                      </>}
                      <td className="no-print"><button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => setLedgerAcc(a.id)}>Ledger</button></td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                  <td className="px-2 py-2 uppercase" colSpan={3}>Total</td>
                  <td className="px-2 py-2 text-right">{money(tOp)}</td>
                  <td className="px-2 py-2 text-right">{money(tDr)}</td>
                  <td className="px-2 py-2 text-right">{money(tCr)}</td>
                  <td className="px-2 py-2 text-right">{money(tBal)}</td>
                  {showPrev && <><td className="px-2 py-2 text-right">{money(pDr)}</td><td className="px-2 py-2 text-right">{money(pCr)}</td></>}
                  <td className="no-print" />
                </tr>
              </Table>
              <div className={`mt-3 rounded-xl p-2.5 text-center text-xs font-bold ${Math.abs(tDr - tCr) < 0.1 ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                {Math.abs(tDr - tCr) < 0.1 ? `✓ Balanced — Dr ${money(tDr)} = Cr ${money(tCr)}` : `✗ Out of balance by ${money(Math.abs(tDr - tCr))}`}
              </div>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}
      <LedgerModal accountId={ledgerAcc} onClose={() => setLedgerAcc(null)} />
    </div>
  );
}
