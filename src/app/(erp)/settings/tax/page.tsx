"use client";
import { useEffect, useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Card, useToast } from "@/components/erp";

type S = {
  salesTaxRate: string; enableSalesTax: boolean; furtherTaxRate: string; enableFurtherTax: boolean;
  aitGoodsFiler: string; aitGoodsLate: string; aitGoodsNon: string;
  aitServicesFiler: string; aitServicesLate: string; aitServicesNon: string;
  aitContractFiler: string; aitContractLate: string; aitContractNon: string;
  defaultAitSection: string; enableAit: boolean; strictValidation: boolean;
};

export default function TaxSettingsPage() {
  const { data, loading, reload } = useApi<{ settings: S }>("/api/tax");
  const [form, setForm] = useState<Record<string, string | boolean>>({});
  const [busy, setBusy] = useState(false);
  const { msg, setMsg, toast } = useToast();

  useEffect(() => {
    if (data?.settings) {
      const s = data.settings;
      setForm({
        salesTaxRate: s.salesTaxRate, enableSalesTax: s.enableSalesTax,
        furtherTaxRate: s.furtherTaxRate, enableFurtherTax: s.enableFurtherTax,
        aitGoodsFiler: s.aitGoodsFiler, aitGoodsLate: s.aitGoodsLate, aitGoodsNon: s.aitGoodsNon,
        aitServicesFiler: s.aitServicesFiler, aitServicesLate: s.aitServicesLate, aitServicesNon: s.aitServicesNon,
        aitContractFiler: s.aitContractFiler, aitContractLate: s.aitContractLate, aitContractNon: s.aitContractNon,
        defaultAitSection: s.defaultAitSection, enableAit: s.enableAit, strictValidation: s.strictValidation,
      });
    }
  }, [data]);

  async function save() {
    setBusy(true);
    try {
      await api("/api/tax", { method: "PUT", body: JSON.stringify(form) });
      reload(); setMsg("Tax settings saved ✓ — applies to all new invoices");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
    finally { setBusy(false); }
  }

  if (loading || !Object.keys(form).length) return <div className="p-8 text-center text-slate-500">Loading tax settings…</div>;
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const num = (k: string) => <input type="number" step="0.01" min={0} max={100} className={inputCls} value={String(form[k])} onChange={(e) => set(k, e.target.value)} />;

  const aitRow = (label: string, sub: string, prefix: "aitGoods" | "aitServices" | "aitContract") => (
    <div className="grid items-end gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-4">
      <div><div className="text-sm font-bold">{label}</div><div className="text-xs text-slate-500">{sub}</div></div>
      <Field label="Filer %">{num(`${prefix}Filer`)}</Field>
      <Field label="Late Filer %">{num(`${prefix}Late`)}</Field>
      <Field label="Non-Filer %">{num(`${prefix}Non`)}</Field>
    </div>
  );

  return (
    <div>
      <PageHead title="🧮 Tax Settings (Pakistan)" sub="Sales Tax Act 1990 · Income Tax Ordinance 2001 s.153 — admin only"
        actions={<Btn onClick={save} disabled={busy}>{busy ? "Saving…" : "💾 Save Settings"}</Btn>} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <h3 className="mb-3 font-bold">🧾 Sales Tax (s.3, Sales Tax Act 1990)</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Standard Rate %">{num("salesTaxRate")}</Field>
              <Field label="Further Tax Rate % (s.3(1A))">{num("furtherTaxRate")}</Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.enableSalesTax} onChange={(e) => set("enableSalesTax", e.target.checked)} /> Charge Sales Tax on invoices</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.enableFurtherTax} onChange={(e) => set("enableFurtherTax", e.target.checked)} /> Further Tax to unregistered buyers</label>
            </div>
            <p className="mt-2 text-xs text-slate-500">Further Tax applies on the tax-inclusive value when the buyer is not sales-tax registered. Zero-rated / exempt invoices (tick on invoice) charge 0%.</p>
          </Card>
          <Card>
            <h3 className="mb-1 font-bold">💰 Advance Income Tax — Withholding u/s 153</h3>
            <p className="mb-3 text-xs text-slate-500">AIT is <b>deducted from the payable</b> (Net Payable = Grand − AIT), never added to the bill. Rate follows the counterparty&apos;s ATL filer status.</p>
            <div className="space-y-2">
              {aitRow("Goods", "s.153(1)(a) — sale of goods", "aitGoods")}
              {aitRow("Services", "s.153(1)(b) — services rendered", "aitServices")}
              {aitRow("Contract / Work", "s.153(1)(c) — contracts, installation", "aitContract")}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field label="Default AIT Section"><select className={inputCls} value={String(form.defaultAitSection)} onChange={(e) => set("defaultAitSection", e.target.value)}>
                <option value="goods">Goods</option><option value="services">Services</option><option value="contract">Contract</option><option value="none">None</option>
              </select></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.enableAit} onChange={(e) => set("enableAit", e.target.checked)} /> Enable AIT withholding</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.strictValidation} onChange={(e) => set("strictValidation", e.target.checked)} /> Strict mode (block taxable invoices without valid NTN/STRN)</label>
            </div>
          </Card>
        </div>
        <Card className="h-fit">
          <h3 className="mb-2 font-bold">📜 Law Reference</h3>
          <div className="space-y-2 text-xs leading-relaxed text-slate-600">
            <p><b>Standard 18%</b> — s.3, Sales Tax Act 1990 on taxable supplies.</p>
            <p><b>Further Tax 4%</b> — s.3(1A): extra tax on supplies to unregistered persons.</p>
            <p><b>Zero-rated 0%</b> — Fifth Schedule (exports etc.); input tax refundable.</p>
            <p><b>Exempt</b> — Sixth Schedule; no tax, no input claim.</p>
            <p><b>Reduced rates</b> — Eighth Schedule items.</p>
            <p><b>AIT u/s 153</b> — prescribed persons withhold on goods / services / contracts at filer / late-filer / non-filer rates; minimum-tax treatment for most categories.</p>
            <p className="rounded-lg bg-amber-50 p-2 text-amber-800">Rates change via Finance Acts &amp; SROs — verify current First Schedule / ATL rules with your tax consultant and update the % fields here. This panel configures the engine; it is not legal advice.</p>
          </div>
        </Card>
      </div>
      {toast}
    </div>
  );
}
