"use client";
import { useMemo, useState } from "react";
import { api, useApi, PageHead, Table, Badge, money, Btn, inputCls, SearchSelect, Modal, LetterheadPrintWrapper, type SearchOption } from "@/components/erp";

type Row = {
  id: number; code: string; name: string; category: string; unit: string;
  openingStock: number; openingValue: number;
  purchase: number; purchaseValue: number;
  purchaseReturn: number; purchaseReturnValue: number;
  sales: number; salesValue: number;
  salesReturn: number; salesReturnValue: number;
  adjustment: number; adjustmentValue: number;
  damagedQty: number; brokenQty: number; damagedBrokenQty: number; damagedBrokenValue: number;
  balanceQty: number; balanceValue: number;
};
type ReturnRow = { id: number; date: string; docType: string; docNo: string; party: string; qty: number; rate: number; value: number; condition: string; status: string };
type Mode = "both" | "qty" | "value";

export default function StockPage() {
  const d = new Date();
  const [from, setFrom] = useState(`${d.getFullYear()}-01-01`);
  const [to, setTo] = useState(d.toISOString().slice(0, 10));
  const [mode, setMode] = useState<Mode>("both");
  const [itemId, setItemId] = useState("");
  const [view, setView] = useState<"matrix" | "damaged">("matrix");
  const [retFor, setRetFor] = useState<{ item: Row; rows: ReturnRow[] } | null>(null);

  const qs = `from=${from}&to=${to}&openingCut=${from}${itemId ? `&itemId=${itemId}` : ""}`;
  const { data, loading, reload } = useApi<{ rows: Row[] }>(`/api/reports?type=stock&${qs}`, [from, to, itemId, view]);
  const { data: itemData } = useApi<{ items: Array<{ id: number; code: string; name: string; stock: number }> }>("/api/items");

  const rows = data?.rows ?? [];
  const itemOptions: SearchOption[] = (itemData?.items ?? []).map((i) => ({
    value: i.id, label: `${i.code} — ${i.name}`, keywords: `${i.code} ${i.name}`,
  }));

  const sel = useMemo(() => rows[0], [rows]);
  const tot = useMemo(() => ({
    openingStock: rows.reduce((a, r) => a + r.openingStock, 0), openingValue: rows.reduce((a, r) => a + r.openingValue, 0),
    purchase: rows.reduce((a, r) => a + r.purchase, 0), purchaseValue: rows.reduce((a, r) => a + r.purchaseValue, 0),
    purchaseReturn: rows.reduce((a, r) => a + r.purchaseReturn, 0), purchaseReturnValue: rows.reduce((a, r) => a + r.purchaseReturnValue, 0),
    sales: rows.reduce((a, r) => a + r.sales, 0), salesValue: rows.reduce((a, r) => a + r.salesValue, 0),
    salesReturn: rows.reduce((a, r) => a + r.salesReturn, 0), salesReturnValue: rows.reduce((a, r) => a + r.salesReturnValue, 0),
    adjustment: rows.reduce((a, r) => a + r.adjustment, 0), adjustmentValue: rows.reduce((a, r) => a + r.adjustmentValue, 0),
    damagedBrokenQty: rows.reduce((a, r) => a + r.damagedBrokenQty, 0), damagedBrokenValue: rows.reduce((a, r) => a + r.damagedBrokenValue, 0),
    balanceQty: rows.reduce((a, r) => a + r.balanceQty, 0), balanceValue: rows.reduce((a, r) => a + r.balanceValue, 0),
  }), [rows]);

  const showQty = mode !== "value";
  const showVal = mode !== "qty";
  const heads = ["Code", "Item"];
  if (showQty) { heads.push("Open Qty"); heads.push("Purchase"); heads.push("Pur Ret"); heads.push("Sales"); heads.push("Sal Ret"); heads.push("Adjust"); }
  if (showVal) { heads.push("Open Value"); heads.push("Pur Value"); heads.push("Pur Ret Value"); heads.push("Sales Value"); heads.push("Sal Ret Value"); heads.push("Adj Value"); }
  if (showQty) heads.push("Bal Qty");
  if (showVal) heads.push("Bal Value");

  function exportExcel() {
    const el = document.getElementById("stock-print-inner");
    if (!el) return;
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}th{background:#f1f5f9}</style></head><body><h2>Stock Report (${from} to ${to})</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `stock_report_${from}_${to}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  async function openReturns(r: Row) {
    try {
      const res = await api<{ rows: ReturnRow[] }>(`/api/reports?type=item-returns&itemId=${r.id}&from=${from}&to=${to}`);
      setRetFor({ item: r, rows: res.rows });
    } catch { alert("Failed to load return invoices"); }
  }

  function exportReturns() {
    const el = document.getElementById("returns-inner");
    if (!el) return;
    const html = `<html><head><meta charset="utf-8"/><style>table{border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:5px;font-family:Arial}</style></head><body><h2>Return Invoices — ${retFor?.item.name}</h2>${el.innerHTML}</body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" }));
    const a = document.createElement("a");
    a.href = url; a.download = `returns_${retFor?.item.code}.xls`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="📋 Stock Movement Report" sub={`Period ${from} → ${to} · qty / value matrix with damaged & broken analysis`}
        actions={<>
          <Btn tone="ghost" onClick={exportExcel}>📊 Excel</Btn>
          <Btn tone="ghost" onClick={() => window.print()}>🖨️ A4 / PDF</Btn>
        </>} />

      <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">From</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} /></div>
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">To</span>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} /></div>
        <div className="w-72"><span className="mb-1 block text-xs font-semibold text-slate-500">Item (optional)</span>
          <SearchSelect value={itemId} onChange={setItemId} options={itemOptions} placeholder="All items" searchPlaceholder="Type code / name…" /></div>
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">Columns</span>
          <select className={inputCls} style={{ width: "auto" }} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="both">Both Qty &amp; Value</option><option value="qty">Only Qty</option><option value="value">Only Value</option>
          </select></div>
        <div><span className="mb-1 block text-xs font-semibold text-slate-500">View</span>
          <select className={inputCls} style={{ width: "auto" }} value={view} onChange={(e) => setView(e.target.value as "matrix" | "damaged")}>
            <option value="matrix">Movement Matrix</option><option value="damaged">Damaged / Broken</option>
          </select></div>
        <Btn small onClick={reload}>Apply</Btn>
      </div>

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area">
          <LetterheadPrintWrapper title={`Stock ${view === "matrix" ? "Movement" : "Damaged / Broken"} Report (${from} to ${to})`} layout="A4">
            <div id="stock-print-inner">
              {view === "matrix" ? (
                <Table head={heads}>
                  {rows.map((r) => (
                    <tr key={r.id} className="text-[12px]">
                      <td className="px-2 py-1.5 font-mono text-[11px]">{r.code}</td>
                      <td className="px-2 py-1.5">{r.name}</td>
                      {showQty && <>
                        <td className="px-2 py-1.5 text-right">{r.openingStock}</td>
                        <td className="px-2 py-1.5 text-right text-emerald-700">{r.purchase || "—"}</td>
                        <td className="px-2 py-1.5 text-right text-rose-700">{r.purchaseReturn || "—"}</td>
                        <td className="px-2 py-1.5 text-right text-rose-700">{r.sales || "—"}</td>
                        <td className="px-2 py-1.5 text-right text-emerald-700">{r.salesReturn || "—"}</td>
                        <td className="px-2 py-1.5 text-right">{r.adjustment || "—"}</td>
                      </>}
                      {showVal && <>
                        <td className="px-2 py-1.5 text-right">{money(r.openingValue)}</td>
                        <td className="px-2 py-1.5 text-right">{money(r.purchaseValue)}</td>
                        <td className="px-2 py-1.5 text-right">{money(r.purchaseReturnValue)}</td>
                        <td className="px-2 py-1.5 text-right font-semibold">{money(r.salesValue)}</td>
                        <td className="px-2 py-1.5 text-right">{money(r.salesReturnValue)}</td>
                        <td className="px-2 py-1.5 text-right">{money(r.adjustmentValue)}</td>
                      </>}
                      {showQty && <td className="px-2 py-1.5 text-right font-bold">{r.balanceQty}</td>}
                      {showVal && <td className="px-2 py-1.5 text-right font-bold text-indigo-800">{money(r.balanceValue)}</td>}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                    <td className="px-2 py-2 uppercase" colSpan={2}>Total</td>
                    {showQty && <>
                      <td className="px-2 py-2 text-right">{Math.round(tot.openingStock)}</td>
                      <td className="px-2 py-2 text-right">{Math.round(tot.purchase)}</td>
                      <td className="px-2 py-2 text-right">{Math.round(tot.purchaseReturn)}</td>
                      <td className="px-2 py-2 text-right">{Math.round(tot.sales)}</td>
                      <td className="px-2 py-2 text-right">{Math.round(tot.salesReturn)}</td>
                      <td className="px-2 py-2 text-right">{Math.round(tot.adjustment)}</td>
                    </>}
                    {showVal && <>
                      <td className="px-2 py-2 text-right">{money(tot.openingValue)}</td>
                      <td className="px-2 py-2 text-right">{money(tot.purchaseValue)}</td>
                      <td className="px-2 py-2 text-right">{money(tot.purchaseReturnValue)}</td>
                      <td className="px-2 py-2 text-right">{money(tot.salesValue)}</td>
                      <td className="px-2 py-2 text-right">{money(tot.salesReturnValue)}</td>
                      <td className="px-2 py-2 text-right">{money(tot.adjustmentValue)}</td>
                    </>}
                    {showQty && <td className="px-2 py-2 text-right">{Math.round(tot.balanceQty)}</td>}
                    {showVal && <td className="px-2 py-2 text-right text-indigo-900">{money(tot.balanceValue)}</td>}
                  </tr>
                </Table>
              ) : (
                <Table head={["Code", "Item", "Damaged Qty", "Broken Qty", "Total Lost Qty", "Value at Cost", "Returns"]}>
                  {rows.filter((r) => r.damagedBrokenQty !== 0 || r.damagedBrokenValue !== 0).map((r) => (
                    <tr key={r.id} className="text-[12px]">
                      <td className="px-2 py-1.5 font-mono text-[11px]">{r.code}</td>
                      <td className="px-2 py-1.5">{r.name}</td>
                      <td className="px-2 py-1.5 text-right text-amber-700">{r.damagedQty}</td>
                      <td className="px-2 py-1.5 text-right text-rose-700">{r.brokenQty}</td>
                      <td className="px-2 py-1.5 text-right font-bold">{r.damagedBrokenQty}</td>
                      <td className="px-2 py-1.5 text-right font-bold text-rose-800">{money(r.damagedBrokenValue)}</td>
                      <td className="px-2 py-1.5 no-print"><button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => openReturns(r)}>View Return Invoices</button></td>
                    </tr>
                  ))}
                  {rows.every((r) => r.damagedBrokenQty === 0 && r.damagedBrokenValue === 0) && (
                    <tr><td colSpan={7} className="px-3 py-6 text-center text-slate-400 italic">No damaged or broken returns recorded in this period.</td></tr>
                  )}
                  <tr className="border-t-2 border-slate-900 bg-slate-100 text-[12px] font-extrabold">
                    <td className="px-2 py-2 uppercase" colSpan={2}>Total</td>
                    <td colSpan={3} className="px-2 py-2 text-right">{Math.round(tot.damagedBrokenQty)}</td>
                    <td className="px-2 py-2 text-right text-rose-900">{money(tot.damagedBrokenValue)}</td>
                    <td className="no-print" />
                  </tr>
                </Table>
              )}
              <div className="mt-3 text-[10px] text-slate-400">
                Basis: purchase/purchase-return &amp; adjustments valued at cost · sales/sales-return valued at sale price. Damaged &amp; broken sales returns are excluded from saleable balance.
              </div>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}

      {retFor && (
        <Modal title={`Return Invoices — ${retFor.item.code} ${retFor.item.name}`} onClose={() => setRetFor(null)} wide>
          <div className="no-print mb-2 flex justify-end"><Btn small tone="ghost" onClick={exportReturns}>📊 Excel</Btn></div>
          <div id="returns-inner">
            <Table head={["Date", "Type", "Doc No", "Party", "Qty", "Rate", "Value", "Condition", "Status"]}>
              {retFor.rows.map((r) => (
                <tr key={r.id} className="text-[12px]">
                  <td className="px-2 py-1.5">{String(r.date).slice(0, 10)}</td>
                  <td className="px-2 py-1.5">{r.docType}</td>
                  <td className="px-2 py-1.5 font-mono text-[11px] font-bold">{r.docNo}</td>
                  <td className="px-2 py-1.5">{r.party}</td>
                  <td className="px-2 py-1.5 text-right">{Math.abs(r.qty)}</td>
                  <td className="px-2 py-1.5 text-right">{money(r.rate)}</td>
                  <td className="px-2 py-1.5 text-right font-semibold">{money(r.value)}</td>
                  <td className="px-2 py-1.5"><Badge tone={r.condition === "broken" ? "red" : r.condition === "damaged" ? "amber" : "green"}>{r.condition}</Badge></td>
                  <td className="px-2 py-1.5">{r.status}</td>
                </tr>
              ))}
              {retFor.rows.length === 0 && <tr><td colSpan={9} className="px-3 py-6 text-center text-slate-400 italic">No return invoices for this item in the period.</td></tr>}
            </Table>
          </div>
        </Modal>
      )}
    </div>
  );
}
