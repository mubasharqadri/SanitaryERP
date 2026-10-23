"use client";
import { useState } from "react";
import { useApi, PageHead, Card, Table, money, Btn, inputCls } from "@/components/erp";

type Summary = {
  from: string; to: string;
  taxableSales: number; outputTax: number; furtherTaxOut: number; salesReturns: number; salesReturnTax: number;
  taxablePurch: number; inputTax: number; furtherTaxIn: number; purchReturns: number; purchReturnTax: number;
  netOutput: number; netInput: number; netSalesTaxPayable: number;
  aitDeductedByCustomers: number; aitWithheldFromVendors: number;
  bySection: Record<string, { base: number; ait: number; count: number }>;
};

const SEC_LABEL: Record<string, string> = { goods: "153(1)(a) Goods", services: "153(1)(b) Services", contract: "153(1)(c) Contract" };

export default function TaxReportPage() {
  const d = new Date();
  const [month, setMonth] = useState(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  const { data, loading } = useApi<{ settings: unknown; summary: Summary }>(`/api/tax?month=${month}`, [month]);
  const s = data?.summary;

  function downloadExcel() {
    const table = document.getElementById("tax-report-container");
    if (!table) return;
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"/><style>table { border-collapse: collapse; width: 100%; } th, td { border: 1px solid #cbd5e1; padding: 6px; font-family: Arial, sans-serif; } .header-row { font-weight: bold; background-color: #f1f5f9; }</style></head>
      <body>
        <h2>Awami ERP — Sales Tax &amp; AIT Monthly Return Working</h2>
        ${table.innerHTML}
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales_tax_ait_report_${month}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <PageHead title="🇵🇰 Sales Tax & AIT Report" sub="Monthly return working: output − input · further tax · withholding statements"
        actions={<>
          <input type="month" className={inputCls} style={{ width: "auto" }} value={month} onChange={(e) => setMonth(e.target.value)} />
          <Btn tone="ghost" onClick={downloadExcel}>📊 Export to Excel</Btn>
          <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print A4 / PDF</Btn>
        </>} />

      {loading || !s ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area space-y-4" id="tax-report-container">
          <div className="text-center no-print-only hidden print:block">
            <h2 className="text-xl font-bold">Awami ERP</h2>
            <div className="text-xs text-slate-500">Main G.T. Road, Gujranwala | NTN: 1234567-8 | STRN: 3277876123456</div>
            <h3 className="text-sm font-semibold text-indigo-700 mt-1 uppercase">Monthly Tax Report ({month})</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <Card><div className="text-xs text-slate-500">Taxable Sales</div><div className="text-xl font-extrabold">Rs {money(s.taxableSales)}</div></Card>
            <Card><div className="text-xs text-slate-500">Output Tax (ST on sales)</div><div className="text-xl font-extrabold text-indigo-700">Rs {money(s.outputTax)}</div></Card>
            <Card><div className="text-xs text-slate-500">Further Tax Collected</div><div className="text-xl font-extrabold text-amber-700">Rs {money(s.furtherTaxOut)}</div></Card>
            <Card className="border-indigo-300 bg-indigo-50"><div className="text-xs text-slate-500">Net Sales Tax Payable (Out − In)</div><div className="text-xl font-extrabold text-indigo-800">Rs {money(s.netSalesTaxPayable)}</div></Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="mb-2 font-bold text-slate-800">🧾 Sales Tax Return Working — {month}</h3>
              <Table head={["Line Item particulars", "Value (Rs)", "Tax (Rs)"]}>
                <tr><td className="px-3 py-2">Taxable sales (SINV + POS)</td><td className="px-3 py-2 text-right">{money(s.taxableSales)}</td><td className="px-3 py-2 text-right">{money(s.outputTax)}</td></tr>
                <tr><td className="px-3 py-2">Less: Sales returns (credit notes)</td><td className="px-3 py-2 text-right">({money(s.salesReturns)})</td><td className="px-3 py-2 text-right">({money(s.salesReturnTax)})</td></tr>
                <tr className="bg-slate-50 font-bold"><td className="px-3 py-2">Net output tax (A)</td><td className="px-3 py-2" /><td className="px-3 py-2 text-right">{money(s.netOutput)}</td></tr>
                <tr><td className="px-3 py-2">Taxable purchases (PINV)</td><td className="px-3 py-2 text-right">{money(s.taxablePurch)}</td><td className="px-3 py-2 text-right">{money(s.inputTax)}</td></tr>
                <tr><td className="px-3 py-2">Less: Purchase returns</td><td className="px-3 py-2 text-right">({money(s.purchReturns)})</td><td className="px-3 py-2 text-right">({money(s.purchReturnTax)})</td></tr>
                <tr className="bg-slate-50 font-bold"><td className="px-3 py-2">Admissible input tax (B)</td><td className="px-3 py-2" /><td className="px-3 py-2 text-right">{money(s.netInput)}</td></tr>
                <tr className="bg-indigo-50 font-extrabold text-indigo-950"><td className="px-3 py-2.5">NET PAYABLE / (REFUNDABLE) (A − B)</td><td className="px-3 py-2.5" /><td className="px-3 py-2.5 text-right">Rs {money(s.netSalesTaxPayable)}</td></tr>
                <tr><td className="px-3 py-2">Further Tax u/s 3(1A) collected (Unregistered Sales)</td><td className="px-3 py-2" /><td className="px-3 py-2 text-right">{money(s.furtherTaxOut)}</td></tr>
              </Table>
              <p className="mt-2 text-[11px] text-slate-500 italic">Working for STRN monthly return (IRIS). Apportionment, carry-forward, debit/credit adjustments and Eighth-Schedule lines are filed by your consultant from this base.</p>
            </Card>

            <Card>
              <h3 className="mb-2 font-bold text-slate-800">💰 AIT Withholding Statement — u/s 153</h3>
              <Table head={["Section Particulars", "Base Value (Rs)", "AIT Amount (Rs)", "Count"]}>
                {Object.entries(s.bySection).map(([k, v]) => (
                  <tr key={k}><td className="px-3 py-2">{SEC_LABEL[k] ?? k}</td><td className="px-3 py-2 text-right">{money(v.base)}</td>
                  <td className="px-3 py-2 text-right font-bold">{money(v.ait)}</td><td className="px-3 py-2">{v.count}</td></tr>
                ))}
                {Object.keys(s.bySection).length === 0 && <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No withholding this period.</td></tr>}
              </Table>
              <div className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between rounded-lg bg-emerald-50 px-3 py-2 border border-emerald-100">
                  <span className="text-emerald-950">Deducted <b>by customers</b> from our bills (AIT receivable, A/C 1310)</span>
                  <b className="text-emerald-900">Rs {money(s.aitDeductedByCustomers)}</b>
                </div>
                <div className="flex justify-between rounded-lg bg-amber-50 px-3 py-2 border border-amber-100">
                  <span className="text-amber-950">Withheld <b>from vendors</b> on purchases (payable to FBR, A/C 2200)</span>
                  <b className="text-amber-900">Rs {money(s.aitWithheldFromVendors)}</b>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 italic">Withholding statements are filed separately (s.165). Collect WHT certificates from customers; issue certificates to vendors.</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
