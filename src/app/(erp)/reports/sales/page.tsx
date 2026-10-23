"use client";
import { useState } from "react";
import { api, useApi, PageHead, Table, money, Btn, inputCls, LetterheadPrintWrapper, Modal, PrintDoc, Badge } from "@/components/erp";

type Row = { id: number; docType: string; docNo: string; date: string; partyName: string; grandTotal: string; paidAmount: string; paymentMode: string; status: string; partyId: number | null; salesTax: string; salesTaxRate: string; discountPct: string; discountLumpsum: string; transportCharges: string; laborCharges: string; subtotal: string };
type DocLine = { itemId?: number | null; description?: string; qty: number; unit?: string; rate: number; discountPct?: number; discountAmt?: number; amount?: number };

export default function SalesReportPage() {
  const [from, setFrom] = useState("2000-01-01");
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
  const { data, loading, reload } = useApi<{ rows: Row[] }>(`/api/reports?type=sales&from=${from}&to=${to}`, [from, to]);
  const [viewInvoice, setViewInvoice] = useState<{ document: Row; lines: DocLine[] } | null>(null);

  const rows = data?.rows ?? [];
  const total = rows.filter((r) => r.docType !== "SRET").reduce((a, r) => a + Number(r.grandTotal), 0);
  const rets = rows.filter((r) => r.docType === "SRET").reduce((a, r) => a + Number(r.grandTotal), 0);

  function downloadExcel() {
    const table = document.getElementById("sales-report-table");
    if (!table) return;
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"/><style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #cbd5e1; padding: 6px; font-family: Arial, sans-serif; }</style></head>
      <body>
        <h2>Awami ERP — Commercial Sales &amp; POS Report</h2>
        <p>Period: ${from} to ${to}</p>
        ${table.innerHTML}
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales_report_${from}_to_${to}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function openInvoice(r: Row) {
    try {
      const res = await api<{ document: Row; lines: DocLine[] }>(`/api/documents?id=${r.id}`);
      setViewInvoice(res);
    } catch { alert("Failed to load invoice details"); }
  }

  return (
    <div>
      <PageHead title="💰 Sales Report" sub={`Net Rs ${money(total - rets)} · Gross Rs ${money(total)} · Returns Rs ${money(rets)}`}
        actions={<>
          <input type="date" className={inputCls} style={{ width: "auto" }} value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" className={inputCls} style={{ width: "auto" }} value={to} onChange={(e) => setTo(e.target.value)} />
          <Btn tone="ghost" onClick={reload}>↻ Filter</Btn>
          <Btn tone="ghost" onClick={downloadExcel}>📊 Export to Excel</Btn>
          <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print A4 / PDF</Btn>
        </>} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area" id="sales-report-container">
          <LetterheadPrintWrapper title={`Sales &amp; POS Invoices Register (${from} to ${to})`} layout="A4">
            <div id="sales-report-table">
              <Table head={["Doc No", "Type", "Date", "Customer Name", "Sales Value (Cost)", "Paid Amount", "Mode", "Status", "Actions"]}>
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 text-[13px]">
                    <td className="px-3 py-2 font-mono text-xs font-bold">{r.docNo}</td>
                    <td className="px-3 py-2">{r.docType}</td>
                    <td className="px-3 py-2">{String(r.date).slice(0, 10)}</td>
                    <td className="px-3 py-2">{r.partyName}</td>
                    <td className="px-3 py-2 text-right font-bold text-slate-800">Rs {money(r.grandTotal)}</td>
                    <td className="px-3 py-2 text-right">Rs {money(r.paidAmount)}</td>
                    <td className="px-3 py-2 uppercase text-xs font-medium">{r.paymentMode}</td>
                    <td className="px-3 py-2"><Badge tone={r.status === "Cancelled" ? "red" : "green"}>{r.status}</Badge></td>
                    <td className="px-3 py-2 text-right no-print">
                      <button className="text-xs font-bold text-indigo-600 hover:underline" onClick={() => openInvoice(r)}>View Invoice</button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-extrabold text-[13px] border-t-2 border-slate-900">
                  <td className="px-3 py-2.5 uppercase" colSpan={4}>Net Sales Value (Gross − Returns)</td>
                  <td className="px-3 py-2.5 text-right text-indigo-950" colSpan={1}>Rs {money(total - rets)}</td>
                  <td className="px-3 py-2.5 text-right text-slate-900" colSpan={1}>Rs {money(rows.reduce((a, r) => a + Number(r.paidAmount), 0))}</td>
                  <td className="px-3 py-2.5" colSpan={3} />
                </tr>
              </Table>
            </div>
          </LetterheadPrintWrapper>
        </div>
      )}

      {/* Invoice Viewer Modal */}
      {viewInvoice && (
        <Modal title={`${viewInvoice.document.docType} ${viewInvoice.document.docNo}`} onClose={() => setViewInvoice(null)} wide>
          <PrintDoc
            title={`Invoice — ${viewInvoice.document.docNo}`}
            head={[
              ["Date", String(viewInvoice.document.date).slice(0, 10)], 
              ["Party", viewInvoice.document.partyName], 
              ["Payment", viewInvoice.document.paymentMode], 
              ["Status", viewInvoice.document.status]
            ]}
            lines={viewInvoice.lines.map((l) => ({ desc: l.description ?? "Item", qty: Number(l.qty), rate: Number(l.rate), amt: Number(l.amount) }))}
            totals={[
              ["Subtotal", "Rs " + money(viewInvoice.document.subtotal)],
              ["Discount", `${viewInvoice.document.discountPct}% + Rs ${money(viewInvoice.document.discountLumpsum)}`],
              [`Sales Tax (${viewInvoice.document.salesTaxRate}%)`, "Rs " + money(viewInvoice.document.salesTax)],
              ["Transport+Labor", "Rs " + money(Number(viewInvoice.document.transportCharges) + Number(viewInvoice.document.laborCharges))],
              ["Grand Total", "Rs " + money(viewInvoice.document.grandTotal)],
              ["Paid", "Rs " + money(viewInvoice.document.paidAmount)],
            ]}
          />
          <div className="no-print mt-3 flex justify-end gap-2">
            <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print Invoice</Btn>
            <Btn onClick={() => setViewInvoice(null)}>Close</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
