"use client";
import { useState, useMemo } from "react";
import { api, useApi, PageHead, Table, money, Btn, inputCls, LetterheadPrintWrapper, Badge } from "@/components/erp";

type SalesmanRow = { id: number; name: string; area: string | null; rate: number; invoices: number; volume: number; earned: number; paid: number; outstanding: number };
type LedgerLine = { id: number; docNo: string; docType: string; date: string; client: string; itemDesc: string; qty: number; rate: number; amount: number; commissionRate: number; commissionAmount: number };

export default function CommissionPage() {
  const [from, setFrom] = useState("2000-01-01");
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const { data, loading, reload } = useApi<{ rows: SalesmanRow[] }>(`/api/reports?type=commission&from=${from}&to=${to}`, [from, to]);

  const [ledgerSId, setLedgerSId] = useState<string>("");
  const { data: ledgerData, loading: ledgerLoading } = useApi<{ salesman: { name: string; area: string | null; commissionRate: string }; lines: LedgerLine[] }>(
    ledgerSId ? `/api/reports?type=commission-ledger&salesmanId=${ledgerSId}&from=${from}&to=${to}` : null,
    [ledgerSId, from, to]
  );

  const selectedSalesman = useMemo(() => {
    return (data?.rows ?? []).find((s) => String(s.id) === ledgerSId);
  }, [data, ledgerSId]);

  function downloadExcel(type: "summary" | "ledger") {
    const tableId = type === "summary" ? "summary-table-inner" : "ledger-table-inner";
    const table = document.getElementById(tableId);
    if (!table) return;
    const title = type === "summary"
      ? "Awami ERP — Salesmen Commission Balances Summary"
      : `Awami ERP — Detailed Commission Ledger for ${ledgerData?.salesman?.name ?? ""}`;

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"/><style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #cbd5e1; padding: 6px; font-family: Arial, sans-serif; }</style></head>
      <body>
        <h2>${title}</h2>
        <p>Period: ${from} to ${to}</p>
        ${table.innerHTML}
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type === "summary" ? "commission_summary" : `commission_ledger_${ledgerData?.salesman?.name ?? "salesman"}`}_${new Date().toISOString().slice(0,10)}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="🤝 Salesman Commission &amp; Ledgers" sub="Track invoice commission volume, payouts, and detailed item-by-item commission reports"
        actions={<>
          <Btn tone="ghost" onClick={() => downloadExcel(ledgerSId ? "ledger" : "summary")}>📊 Export to Excel</Btn>
          <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print A4 / PDF</Btn>
        </>} />

      <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm flex flex-wrap gap-4 items-center no-print">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">From:</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">To:</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Select Salesman Ledger:</span>
          <select value={ledgerSId} onChange={(e) => setLedgerSId(e.target.value)} className={inputCls} style={{ width: "auto" }}>
            <option value="">— Show All Commission Summaries —</option>
            {(data?.rows ?? []).map((s) => (
              <option key={s.id} value={s.id}>{s.name} ({s.rate}%)</option>
            ))}
          </select>
        </div>
        <Btn small tone="primary" onClick={reload}>Apply Filter</Btn>
      </div>

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area space-y-4">
          
          {/* 1. If NO salesman is selected, render global summary formatted under Letterhead */}
          {!ledgerSId && (
            <LetterheadPrintWrapper title={`Salesmen Commission &amp; Payout Registry (${from} to ${to})`} layout="A4">
              <div id="summary-table-inner">
                <Table head={["Salesman Name", "Area", "Default Commission %", "Invoices", "Sales Volume (Rs)", "Earned Commission (Rs)", "Actions"]}>
                  {(data?.rows ?? []).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 text-[13px]">
                      <td className="px-3 py-2 font-medium">{r.name}</td>
                      <td className="px-3 py-2">{r.area ?? "—"}</td>
                      <td className="px-3 py-2">{r.rate}%</td>
                      <td className="px-3 py-2">{r.invoices}</td>
                      <td className="px-3 py-2 text-right">Rs {money(r.volume)}</td>
                      <td className="px-3 py-2 text-right font-bold text-emerald-700">Rs {money(r.earned)}</td>
                      <td className="px-3 py-2 text-right no-print">
                        <button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => setLedgerSId(String(r.id))}>View Ledger</button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-extrabold text-[13px] border-t-2 border-slate-900">
                    <td className="px-3 py-2.5 uppercase" colSpan={4}>Totals</td>
                    <td className="px-3 py-2.5 text-right">Rs {money((data?.rows ?? []).reduce((a, r) => a + Number(r.volume), 0))}</td>
                    <td className="px-3 py-2.5 text-right text-emerald-800">Rs {money((data?.rows ?? []).reduce((a, r) => a + Number(r.earned), 0))}</td>
                    <td className="px-3 py-2.5 no-print" />
                  </tr>
                </Table>
              </div>
            </LetterheadPrintWrapper>
          )}

          {/* 2. If salesman is selected, render item-by-item commission ledger under Letterhead */}
          {ledgerSId && (
            <LetterheadPrintWrapper title={`Salesman Commission Detailed Ledger — ${selectedSalesman?.name ?? ""}`} layout="A4">
              {ledgerLoading || !ledgerData ? <div className="text-slate-500 p-4">Loading salesman ledger...</div> : (
                <div id="ledger-table-inner">
                  <div className="mb-4 bg-slate-50 p-4 rounded-xl border grid grid-cols-3 gap-4 text-xs">
                    <div>Salesman: <b className="text-slate-900 text-sm">{ledgerData.salesman.name}</b></div>
                    <div>Default Rate: <b className="text-slate-900">{ledgerData.salesman.commissionRate}%</b></div>
                    <div>Salesman Area: <b>{ledgerData.salesman.area || "—"}</b></div>
                  </div>

                  <Table head={["Date", "Doc No", "Customer Name", "Item Sold Description", "Qty", "Item Rate", "Line Amount (Rs)", "Comm %", "Earned Commission (Rs)"]}>
                    {ledgerData.lines.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50 text-[12px]">
                        <td className="px-2 py-1.5">{String(l.date).slice(0, 10)}</td>
                        <td className="px-2 py-1.5 font-mono font-bold text-xs">{l.docType} {l.docNo}</td>
                        <td className="px-2 py-1.5 truncate max-w-[150px]">{l.client}</td>
                        <td className="px-2 py-1.5 truncate max-w-[180px]">{l.itemDesc}</td>
                        <td className="px-2 py-1.5 text-right">{l.qty}</td>
                        <td className="px-2 py-1.5 text-right">{money(l.rate)}</td>
                        <td className="px-2 py-1.5 text-right font-semibold">Rs {money(l.amount)}</td>
                        <td className="px-2 py-1.5 text-center">{l.commissionRate}%</td>
                        <td className="px-2 py-1.5 text-right font-bold text-emerald-700">Rs {money(l.commissionAmount)}</td>
                      </tr>
                    ))}
                    {ledgerData.lines.length === 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 py-6 text-center text-slate-400 italic">No sales recorded for this salesman within the filtered period.</td>
                      </tr>
                    )}
                    <tr className="bg-slate-100 font-extrabold text-[12px] border-t-2 border-slate-900">
                      <td className="px-2 py-2 uppercase" colSpan={6}>Voucher Totals</td>
                      <td className="px-2 py-2 text-right">Rs {money(ledgerData.lines.reduce((a, r) => a + Number(r.amount), 0))}</td>
                      <td className="px-2 py-2" />
                      <td className="px-2 py-2 text-right text-emerald-800">Rs {money(ledgerData.lines.reduce((a, r) => a + Number(r.commissionAmount), 0))}</td>
                    </tr>
                  </Table>
                </div>
              )}
            </LetterheadPrintWrapper>
          )}

        </div>
      )}
    </div>
  );
}
