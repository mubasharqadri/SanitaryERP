"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, money, PrintDoc, FbrStatusBadge, useToast, MultiFileUploader, SearchSelect, type SearchOption } from "@/components/erp";

const num = (v: unknown) => (v === null || v === undefined || v === "" ? 0 : Number(v) || 0);

export type Doc = {
  id: number; docType: string; docNo: string; date: string; partyId: number | null;
  warehouseId: number | null; salesmanId: number | null; subtotal: string; discountPct: string;
  discountLumpsum: string; salesTax: string; salesTaxRate: string; furtherTax: string; furtherTaxRate: string;
  incomeTax: string; aitRate: string; aitAmount: string; aitSection: string; buyerFilerStatus: string | null;
  transportCharges: string; laborCharges: string; grandTotal: string; paidAmount: string; paymentMode: string;
  status: string; validUntil: string | null; notes: string | null; documents: string | null;
  linkedInvoiceId: number | null;
  walkinName: string | null; walkinContact: string | null; walkinPhone: string | null;
  walkinAddress: string | null; walkinCity: string | null;
  fbrStatus: string; fbrInvoiceNo: string | null; fbrUsin: string | null; fbrSyncedAt: string | null; fbrQr: string | null;
};
type DocLine = {
  itemId?: number | null; description?: string; qty: number; unit?: string; rate: number;
  discountPct?: number; discountAmt?: number; amount?: number; returnCondition?: string;
  itemType?: string; taxExempt?: boolean; salesTaxRate?: number | string; salesTax?: number;
  furtherTaxRate?: number | string; furtherTax?: number;
  aitSection?: string; aitRate?: number | string; aitAmount?: number;
};
type Party = { id: number; name: string; filerStatus: string; salesTaxRegistered: boolean; ntn: string | null; strn: string | null; cnic: string | null; contactPic?: string | null; city?: string | null; area?: string | null; phone?: string | null; mobile?: string | null; email?: string | null; province?: string | null };
type TaxSettings = {
  salesTaxRate: string; enableSalesTax: boolean; furtherTaxRate: string; enableFurtherTax: boolean;
  aitGoodsFiler: string; aitGoodsLate: string; aitGoodsNon: string;
  aitServicesFiler: string; aitServicesLate: string; aitServicesNon: string;
  aitContractFiler: string; aitContractLate: string; aitContractNon: string;
  defaultAitSection: string; enableAit: boolean;
};

const PARTY_TYPE: Record<string, string> = { QUOT: "customer", SO: "customer", SINV: "customer", POS: "customer", SRET: "customer", PO: "vendor", PINV: "vendor", PRET: "vendor" };
const CONVERT: Record<string, { target: string; label: string }> = {
  QUOT: { target: "SINV", label: "➔ Sales Invoice" },
  SO: { target: "SINV", label: "➔ Sales Invoice" },
  PO: { target: "PINV", label: "➔ Purchase Invoice" },
};
const FBR_TYPES = ["SINV", "POS", "SRET"];
const SALES_SIDE = ["QUOT", "SO", "SINV", "POS", "SRET"];

function aitRate(tax: TaxSettings | undefined, section: string, filer: string): number {
  if (!tax || section === "none") return 0;
  const f = filer === "filer" ? "Filer" : filer === "late_filer" ? "Late" : "Non";
  const key = `ait${section === "goods" ? "Goods" : section === "services" ? "Services" : "Contract"}${f}` as keyof TaxSettings;
  return Number(tax[key] ?? 0);
}

const FILER_BADGE: Record<string, string> = { filer: "Filer ✓", late_filer: "Late Filer", non_filer: "Non-Filer" };

export function DocManager({ docType, title, icon, showConvert = true }: { docType: string; title: string; icon: string; showConvert?: boolean }) {
  const { data, loading, reload } = useApi<{ documents: Doc[] }>(`/api/documents?type=${docType}`);
  const { data: partyData } = useApi<{ parties: Party[] }>(`/api/parties?type=${PARTY_TYPE[docType] ?? "customer"}`);
  const { data: itemData } = useApi<{ items: Array<{ id: number; code: string; name: string; salePrice: string; costPrice: string; unit: string; stock: number; pictures: string | null }> }>("/api/items");
  const { data: whData } = useApi<{ rows: Array<{ id: number; name: string }> }>("/api/admin?entity=warehouses");
  const { data: smData } = useApi<{ rows: Array<{ id: number; name: string }> }>("/api/admin?entity=salesmen");
  const { data: taxData } = useApi<{ settings: TaxSettings }>("/api/tax");
  const { data: coData } = useApi<{ rows: Array<{ id: number; name: string; ntn: string | null; strn: string | null; isDefault: boolean }> }>("/api/admin?entity=companies");
  
  // Dynamic lookup of parent documents for return linking
  const parentType = docType === "SRET" ? "SINV,POS" : "PINV";
  const { data: invoiceLookup } = useApi<{ documents: Doc[] }>(docType === "SRET" || docType === "PRET" ? `/api/documents?type=${parentType}` : null);

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [view, setView] = useState<{ document: Doc; lines: DocLine[] } | null>(null);
  const [syncing, setSyncing] = useState<number | null>(null);
  const [h, setH] = useState({ partyId: "", warehouseId: "", salesmanId: "", date: new Date().toISOString().slice(0, 10), discountPct: 0, discountLumpsum: 0, salesTaxRate: "", taxExempt: false, chargeFurtherTax: true, aitSection: "", aitRateOverride: "", buyerFilerStatus: "", transportCharges: 0, laborCharges: 0, paidAmount: 0, paymentMode: "credit", validUntil: "", notes: "", documents: "", linkedInvoiceId: "", walkinName: "", walkinContact: "", walkinPhone: "", walkinAddress: "", walkinCity: "" });
  const [lines, setLines] = useState<DocLine[]>([]);
  const { msg, setMsg, toast } = useToast();
  const set = (k: string, v: string | number | boolean) => setH((x) => ({ ...x, [k]: v }));

  const tax = taxData?.settings;
  const isPurchase = docType === "PO" || docType === "PINV" || docType === "PRET";
  const party = (partyData?.parties ?? []).find((p) => String(p.id) === h.partyId) ?? null;
  const filer: string = h.buyerFilerStatus || party?.filerStatus || "non_filer";
  const aitSection = h.aitSection || tax?.defaultAitSection || "goods";
  const stRate = h.taxExempt ? 0 : (h.salesTaxRate !== "" ? Number(h.salesTaxRate) : Number(tax?.salesTaxRate ?? 18));

  // Filter linked invoice candidates to only those matching current party
  const filteredInvoices = (invoiceLookup?.documents ?? []).filter((d) => !h.partyId || String(d.partyId) === h.partyId);

  // Per-line tax preview (mirrors the server exactly)
  const buyerRegistered = !!party?.salesTaxRegistered;
  const ftAllowed = !!tax?.enableFurtherTax && h.chargeFurtherTax && SALES_SIDE.includes(docType) && !buyerRegistered;
  const globalRate = h.taxExempt ? 0 : (h.salesTaxRate !== "" ? Number(h.salesTaxRate) : Number(tax?.salesTaxRate ?? 18));
  const lineCalc = lines.map((l) => {
    const g = l.qty * l.rate;
    const taxable = Math.round((g - (g * (l.discountPct ?? 0)) / 100) * 100) / 100;
    const exempt = !!l.taxExempt;
    const r = exempt ? 0 : (l.salesTaxRate === undefined || l.salesTaxRate === "" ? globalRate : Number(l.salesTaxRate));
    const st = Math.round(((taxable * r) / 100) * 100) / 100;
    const fr = ftAllowed && !exempt && taxable > 0 ? Number(tax?.furtherTaxRate ?? 4) : 0;
    const ft = Math.round((((taxable + st) * fr) / 100) * 100) / 100;
    const sec = l.aitSection === "none" ? "none" : (l.aitSection && l.aitSection !== "" ? l.aitSection : (tax?.enableAit === false ? "none" : (tax?.defaultAitSection ?? "goods")));
    const ar = !sec || sec === "none" ? 0 : (l.aitRate !== undefined && l.aitRate !== "" ? Number(l.aitRate) : aitRate(tax, sec, filer));
    const at = Math.round(((taxable * ar) / 100) * 100) / 100;
    return { taxable, st, ft, total: taxable + st + ft, ait: at };
  });
  const subtotal = lineCalc.reduce((a, c) => a + c.taxable, 0);
  const afterPct = subtotal - (subtotal * h.discountPct) / 100 - h.discountLumpsum;
  const salesTax = lineCalc.reduce((a, c) => a + c.st, 0);
  const furtherTax = lineCalc.reduce((a, c) => a + c.ft, 0);
  const grand = Math.max(0, afterPct + salesTax + furtherTax + h.transportCharges + h.laborCharges);
  const goodsTax = lines.reduce((a, l, i) => a + ((l.itemType || "goods") === "goods" ? lineCalc[i].st : 0), 0);
  const svcTax = lines.reduce((a, l, i) => a + ((l.itemType || "goods") === "services" ? lineCalc[i].st : 0), 0);
  const svcTotal = lines.reduce((a, l, i) => a + ((l.itemType || "goods") === "services" ? lineCalc[i].taxable : 0), 0);
  const aitTotal = lineCalc.reduce((a, c) => a + c.ait, 0);
  const ftRate = ftAllowed ? Number(tax?.furtherTaxRate ?? 4) : 0;
  const aitR = !tax?.enableAit || aitSection === "none" ? 0 : (h.aitRateOverride !== "" ? Number(h.aitRateOverride) : aitRate(tax, aitSection, filer));
  const aitAmt = Math.round(aitTotal * 100) / 100;
  const netPayable = Math.max(0, Math.round((grand - aitAmt) * 100) / 100);

  const defaultCompany = (coData?.rows ?? []).find((c) => c.isDefault) ?? (coData?.rows ?? [])[0];

  function resetForm() {
    setEditId(null);
    setH({ partyId: "", warehouseId: (whData?.rows[0]?.id ? String(whData.rows[0].id) : ""), salesmanId: "", date: new Date().toISOString().slice(0, 10), discountPct: 0, discountLumpsum: 0, salesTaxRate: "", taxExempt: false, chargeFurtherTax: true, aitSection: "", aitRateOverride: "", buyerFilerStatus: "", transportCharges: 0, laborCharges: 0, paidAmount: 0, paymentMode: "credit", validUntil: "", notes: "", documents: "", linkedInvoiceId: "", walkinName: "", walkinContact: "", walkinPhone: "", walkinAddress: "", walkinCity: "" });
    setLines([]);
    setShow(true);
  }

  async function triggerEdit(d: Doc) {
    if (d.fbrStatus === "synced") {
      return setMsg("!FBR-synced invoices cannot be edited.");
    }
    try {
      const res = await api<{ document: Doc; lines: Array<DocLine & { aitRate?: string | number | null; aitSection?: string | null }> }>(`/api/documents?id=${d.id}`);
      setEditId(d.id);
      setH({
        partyId: res.document.partyId ? String(res.document.partyId) : "",
        warehouseId: res.document.warehouseId ? String(res.document.warehouseId) : "",
        salesmanId: res.document.salesmanId ? String(res.document.salesmanId) : "",
        date: String(res.document.date).slice(0, 10),
        discountPct: Number(res.document.discountPct),
        discountLumpsum: Number(res.document.discountLumpsum),
        salesTaxRate: res.document.salesTaxRate ? String(res.document.salesTaxRate) : "",
        taxExempt: Number(res.document.salesTax) === 0 && Number(res.document.grandTotal) > 0 && res.document.docType !== "QUOT" && res.document.docType !== "SO",
        chargeFurtherTax: Number(res.document.furtherTaxRate) > 0,
        aitSection: res.document.aitSection || "",
        aitRateOverride: res.document.aitRate ? String(res.document.aitRate) : "",
        buyerFilerStatus: res.document.buyerFilerStatus || "",
        transportCharges: Number(res.document.transportCharges),
        laborCharges: Number(res.document.laborCharges),
        paidAmount: Number(res.document.paidAmount),
        paymentMode: res.document.paymentMode || "credit",
        validUntil: res.document.validUntil ? String(res.document.validUntil).slice(0, 10) : "",
        notes: res.document.notes || "",
        documents: res.document.documents ?? "",
        linkedInvoiceId: res.document.linkedInvoiceId ? String(res.document.linkedInvoiceId) : "",
        walkinName: res.document.walkinName ?? "",
        walkinContact: res.document.walkinContact ?? "",
        walkinPhone: res.document.walkinPhone ?? "",
        walkinAddress: res.document.walkinAddress ?? "",
        walkinCity: res.document.walkinCity ?? "",
      });
      setLines(res.lines.map((l) => ({
        ...l,
        itemType: l.itemType ?? "goods",
        taxExempt: !!l.taxExempt,
        salesTaxRate: (l as unknown as { salesTaxRate?: string | number }).salesTaxRate ?? "",
        aitSection: (l as unknown as { aitSection?: string }).aitSection ?? "",
        aitRate: (l as unknown as { aitRate?: string | number }).aitRate ?? "",
      })));
      setShow(true);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Load failed")); }
  }

  async function cancelDoc(id: number) {
    if (!confirm("Are you sure you want to Cancel this document? Stock ledger updates will be deleted, and vouchers will be set to Cancelled.")) return;
    try {
      await api(`/api/documents`, { method: "PUT", body: JSON.stringify({ id, action: "cancel" }) });
      reload();
      setMsg("Document set to Cancelled ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Cancel failed")); }
  }

  async function save() {
    const usable = lines.filter((l) => l.itemId || (l.description ?? "").trim() || num(l.qty) > 0 || num(l.rate) > 0);
    if (!usable.length) return setMsg("!Add at least one line item");
    const blankDropped = lines.length - usable.length;
    try {
      const isEdit = editId !== null;
      const endpoint = "/api/documents" + (isEdit ? `?id=${editId}` : "");
      const res = await api<{ document: Doc; netPayable?: number; fbr?: { ok: boolean; fbrInvoiceNo?: string; errors?: string[] } }>(endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify({
          id: editId,
          header: {
            ...h, docType,
            partyId: h.partyId || null, warehouseId: h.warehouseId || null, salesmanId: h.salesmanId || null,
            salesTaxRate: h.salesTaxRate === "" ? undefined : Number(h.salesTaxRate),
            taxExempt: h.taxExempt, chargeFurtherTax: h.chargeFurtherTax,
            buyerFilerStatus: h.buyerFilerStatus || undefined,
            linkedInvoiceId: h.linkedInvoiceId || null,
            walkinName: h.walkinName || null, walkinContact: h.walkinContact || null,
            walkinPhone: h.walkinPhone || null, walkinAddress: h.walkinAddress || null, walkinCity: h.walkinCity || null,
          },
          lines: usable.map((l) => ({
            ...l,
            itemType: l.itemType || "goods",
            taxExempt: !!l.taxExempt,
            salesTaxRate: l.salesTaxRate === "" || l.salesTaxRate === undefined ? undefined : Number(l.salesTaxRate),
            aitSection: l.aitSection || undefined,
            aitRate: l.aitRate === "" || l.aitRate === undefined ? undefined : Number(l.aitRate),
          })),
        }),
      });
      setShow(false); setLines([]); reload();
      let m = `${isEdit ? "Updated" : "Saved"} ${res.document?.docNo ?? "Document"} ✓ Net payable Rs ${money(res.netPayable ?? grand)}`;
      if (blankDropped) m += ` · ${blankDropped} empty row(s) skipped`;
      if (res.fbr) m += res.fbr.ok ? ` · 📡 FBR ${res.fbr.fbrInvoiceNo} ✓` : ` · 📡 FBR failed: ${(res.fbr.errors ?? []).join("; ")}`;
      setMsg(m);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  async function syncFbr(id: number) {
    setSyncing(id);
    try {
      const res = await api<{ ok: boolean; fbrInvoiceNo: string; warnings?: string[] }>(`/api/fbr`, { method: "POST", body: JSON.stringify({ action: "sync", documentId: id }) });
      reload();
      if (view && view.document.id === id) setView(await api(`/api/documents?id=${id}`));
      setMsg(`📡 Synced → ${res.fbrInvoiceNo} ✓${res.warnings?.length ? " · ⚠ " + res.warnings.join("; ") : ""}`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "FBR sync failed")); reload(); }
    finally { setSyncing(null); }
  }

  async function convert(d: Doc) {
    const c = CONVERT[d.docType];
    if (!c) return;
    if (!confirm(`Convert ${d.docNo} to ${c.target}?`)) return;
    try {
      const res = await api<{ document: Doc }>("/api/documents", { method: "POST", body: JSON.stringify({ action: "convert", id: d.id, target: c.target }) });
      reload(); setMsg(`Created ${res.document.docNo} ✓`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Convert failed")); }
  }

  const partyName = (id: number | null) => (partyData?.parties ?? []).find((p) => p.id === id)?.name ?? (id ? "#" + id : "—");
  const isWalkin = !!party && party.name.toLowerCase().includes("walk-in");
  const isOnline = !!party && party.name.toLowerCase().includes("online");
  const isRet = docType === "SRET" || docType === "PRET";
  const showFbr = FBR_TYPES.includes(docType);
  // Attach up to 4 product photos of the invoiced items to the printed document
  const picturesOf = (ls: DocLine[]) => {
    const out: string[] = [];
    for (const l of ls) {
      const it = (itemData?.items ?? []).find((i) => i.id === l.itemId);
      if (it?.pictures) for (const p of String(it.pictures).split(",").filter(Boolean)) if (out.length < 4) out.push(p);
    }
    return out;
  };

  // Searchable option lists (catalog can exceed 3000 items — native select is unusable)
  const itemOptions: SearchOption[] = (itemData?.items ?? []).map((i) => ({
    value: i.id,
    label: `${i.code} — ${i.name} (Stk: ${i.stock})`,
    keywords: `${i.code} ${i.name}`,
  }));
  const partyOptions: SearchOption[] = (partyData?.parties ?? []).map((p) => ({
    value: p.id,
    label: `${p.name} [${FILER_BADGE[p.filerStatus] ?? p.filerStatus}${p.salesTaxRegistered ? ", ST-Reg" : ""}]`,
    keywords: `${p.name} ${p.ntn ?? ""} ${p.strn ?? ""} ${p.cnic ?? ""}`,
  }));
  const invoiceOptions: SearchOption[] = filteredInvoices.map((inv) => ({
    value: inv.id,
    label: `${inv.docNo} (${String(inv.date).slice(0, 10)}) · Rs ${money(inv.grandTotal)}`,
    keywords: `${inv.docNo} ${partyName(inv.partyId)}`,
  }));

  return (
    <div>
      <PageHead title={`${icon} ${title}`} sub={`${data?.documents.length ?? 0} document(s) · Sales Tax 18% · Further Tax · AIT u/s 153 · FBR e-invoicing`}
        actions={<Btn onClick={resetForm}>+ New</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={showFbr ? ["Doc No", "Date", "Party", "Linked Doc", "Total", "FBR Status", "Status", "Actions"] : ["Doc No", "Date", "Party", "Linked Doc", "Total", "Status", "Actions"]}>
          {(data?.documents ?? []).map((d) => {
            const parentNo = (invoiceLookup?.documents ?? []).find((i) => i.id === d.linkedInvoiceId)?.docNo;
            return (
              <tr key={d.id}>
                <td className="px-3 py-2 font-mono text-xs font-bold">{d.docNo}</td>
                <td className="px-3 py-2">{String(d.date).slice(0, 10)}</td>
                <td className="px-3 py-2">{partyName(d.partyId)}</td>
                <td className="px-3 py-2 text-xs font-semibold text-slate-500">{parentNo ? `⛓️ ${parentNo}` : "—"}</td>
                <td className="px-3 py-2 text-right font-bold">{money(d.grandTotal)}</td>
                {showFbr && <td className="px-3 py-2"><FbrStatusBadge status={d.fbrStatus} />{d.fbrInvoiceNo && <div className="font-mono text-[10px] text-slate-500">{d.fbrInvoiceNo}</div>}</td>}
                <td className="px-3 py-2"><Badge tone={d.status === "Cancelled" ? "red" : d.status === "Open" ? "amber" : "green"}>{d.status}</Badge></td>
                <td className="px-3 py-2 text-right whitespace-nowrap space-x-1.5">
                  <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={async () => setView(await api(`/api/documents?id=${d.id}`))}>👁 View</button>
                  {d.fbrStatus !== "synced" && d.status !== "Cancelled" && (
                    <button className="rounded-md border border-slate-300 px-1.5 py-0.5 text-xs font-bold text-slate-700 hover:bg-slate-100" onClick={() => triggerEdit(d)}>✏️ Edit</button>
                  )}
                  {d.status !== "Cancelled" && (
                    <button className="text-xs font-semibold text-amber-600 hover:underline" onClick={() => cancelDoc(d.id)}>⊘ Cancel</button>
                  )}
                  {showFbr && d.fbrStatus !== "synced" && (
                    <button disabled={syncing === d.id} className="text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50" onClick={() => syncFbr(d.id)}>{syncing === d.id ? "…" : "FBR"}</button>
                  )}
                  {showConvert && CONVERT[d.docType] && d.status !== "Invoiced" && d.status !== "Cancelled" && (
                    <button className="text-xs font-semibold text-emerald-600 hover:underline" onClick={() => convert(d)}>{CONVERT[d.docType].label}</button>
                  )}
                  <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm(`Delete ${d.docNo}? Stock & ledger postings will be reversed.`)) { try { await api(`/api/documents?id=${d.id}`, { method: "DELETE" }); reload(); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Delete failed")); } } }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      {show && (
        <Modal title={editId ? `Edit ${title} (${editId})` : `New ${title}`} onClose={() => setShow(false)} full>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-5">
              <div>
                <span className="mb-1 block text-xs font-medium text-slate-600">
                  {`Party ${party ? `· ${FILER_BADGE[party.filerStatus] ?? party.filerStatus} · ${party.salesTaxRegistered ? "ST-Registered" : "Unregistered"}` : ""}`}
                </span>
                <SearchSelect
                  value={h.partyId}
                  onChange={(v) => set("partyId", v)}
                  options={partyOptions}
                  placeholder="🔍 Search customer / vendor…"
                  searchPlaceholder="Type name, NTN or CNIC…"
                  emptyText="No party matches your search"
                />
              </div>

              {(docType === "SRET" || docType === "PRET") && (
                <div>
                  <span className="mb-1 block text-xs font-medium text-slate-600">
                    {`Link to ${docType === "SRET" ? "Sales" : "Purchase"} Invoice`}
                  </span>
                  <SearchSelect
                    value={h.linkedInvoiceId}
                    onChange={(v) => set("linkedInvoiceId", v)}
                    options={invoiceOptions}
                    placeholder="— Without Invoice —"
                    searchPlaceholder="Type invoice no…"
                    emptyText="No invoice found for this party"
                  />
                </div>
              )}

              <Field label="Date"><input type="date" className={inputCls} value={h.date} onChange={(e) => set("date", e.target.value)} /></Field>
              <Field label="Warehouse"><select className={inputCls} value={h.warehouseId} onChange={(e) => set("warehouseId", e.target.value)}>
                <option value="">—</option>{(whData?.rows ?? []).map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select></Field>
              <Field label="Salesman"><select className={inputCls} value={h.salesmanId} onChange={(e) => set("salesmanId", e.target.value)}>
                <option value="">—</option>{(smData?.rows ?? []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select></Field>
            </div>


            {/* ---- Buyer identity block: editable for Walk-in, read-only otherwise ---- */}
            <div className={`rounded-xl border p-3 ${isWalkin ? "border-amber-300 bg-amber-50/60" : "border-slate-200 bg-slate-50/60"}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-800">
                  {isWalkin ? "🚶 Walk-in Customer — capture details (required for the tax invoice)" : "🪪 Registered Party Details (from customer record)"}
                </span>
                {isOnline && <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">🛒 Online Order</span>}
                {!isWalkin && party?.salesTaxRegistered && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">ST Registered</span>}
              </div>

              {isWalkin ? (
                <div className="grid gap-2 sm:grid-cols-5">
                  <Field label="Name *"><input className={inputCls} placeholder="Buyer name" value={h.walkinName} onChange={(e) => set("walkinName", e.target.value)} /></Field>
                  <Field label="Contact Person"><input className={inputCls} placeholder="Contact person" value={h.walkinContact} onChange={(e) => set("walkinContact", e.target.value)} /></Field>
                  <Field label="Contact No."><input className={inputCls} placeholder="03xx-xxxxxxx" value={h.walkinPhone} onChange={(e) => set("walkinPhone", e.target.value)} /></Field>
                  <Field label="Address"><input className={inputCls} placeholder="Street / area" value={h.walkinAddress} onChange={(e) => set("walkinAddress", e.target.value)} /></Field>
                  <Field label="City"><input className={inputCls} placeholder="City" value={h.walkinCity} onChange={(e) => set("walkinCity", e.target.value)} /></Field>
                </div>
              ) : (
                <div className="grid gap-2 text-xs sm:grid-cols-5">
                  <div><span className="block text-[10px] uppercase text-slate-400">Name</span><b className="text-slate-800">{party?.name ?? "—"}</b></div>
                  <div><span className="block text-[10px] uppercase text-slate-400">Contact Person</span><b className="text-slate-800">{party?.name ?? "—"}</b></div>
                  <div><span className="block text-[10px] uppercase text-slate-400">Contact No.</span><b className="text-slate-800">{party?.mobile || party?.phone || "—"}</b></div>
                  <div><span className="block text-[10px] uppercase text-slate-400">Address</span><b className="text-slate-800">{[party?.area, party?.city].filter(Boolean).join(", ") || "—"}</b></div>
                  <div><span className="block text-[10px] uppercase text-slate-400">City</span><b className="text-slate-800">{party?.city ?? "—"}</b></div>
                </div>
              )}
            </div>

            <MultiFileUploader label="Attached Documents — delivery challan, signed copy, gate pass, scanned approval" value={h.documents} onChange={(urls) => setH({ ...h, documents: urls })} />

            <div className="mt-4 rounded-xl bg-slate-50 p-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-800">Line Items</span>
                <span className="text-[11px] font-normal text-slate-400">{lines.length} line(s) · click any cell to edit · TAB moves across</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[1180px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-[10px] uppercase tracking-wide text-slate-500">
                      <th className="px-2 py-2 font-semibold" style={{width:34}}>#</th>
                      <th className="px-2 py-2 font-semibold" style={{minWidth:230}}>Item *</th>
                      {isRet && <th className="px-2 py-2 font-semibold" style={{width:112}}>Condition</th>}
                      <th className="px-2 py-2 font-semibold" style={{width:108}}>Type</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:72}}>Qty</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:100}}>Rate</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:64}}>Disc%</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:70}}>ST %</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:92}}>ST Amt</th>
                      <th className="px-2 py-2 font-semibold" style={{width:118}}>AIT §153</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:72}}>AIT %</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:84}}>AIT Amt</th>
                      <th className="px-2 py-2 font-semibold text-right" style={{width:104}}>Amount</th>
                      <th className="px-2 py-2" style={{width:34}} />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {lines.map((l, i) => {
                      const g = l.qty * l.rate;
                      const amt = g - (g * (l.discountPct ?? 0)) / 100;
                      const patch = (p: Partial<DocLine>) => setLines(lines.map((x, xi) => (xi === i ? { ...x, ...p } : x)));
                      const num2 = (n: number) => (n ? money(n) : "—");
                      return (
                        <tr key={i} className="hover:bg-indigo-50/30">
                          <td className="px-2 py-1 text-center text-[11px] text-slate-400">{i + 1}</td>
                          <td className="px-1 py-1">
                            <SearchSelect
                              value={l.itemId ?? ""}
                              onChange={(v) => {
                                const it = (itemData?.items ?? []).find((x) => String(x.id) === v);
                                patch({ itemId: it ? it.id : null, description: it ? `${it.code} — ${it.name}` : l.description, rate: l.rate || (it ? Number(isPurchase ? it.costPrice : it.salePrice) : 0) });
                              }}
                              options={itemOptions}
                              placeholder="🔍 Search item…"
                              searchPlaceholder="Type code / name / brand…"
                              emptyText="No item matches"
                            />
                          </td>
                          {isRet && (
                            <td className="px-1 py-1">
                              <select className={`${inputCls} text-[13px]`} value={l.returnCondition || "normal"} onChange={(e) => patch({ returnCondition: e.target.value })}>
                                <option value="normal">😇 Normal</option>
                                <option value="damaged">⚠️ Damaged</option>
                                <option value="broken">💔 Broken</option>
                              </select>
                            </td>
                          )}
                          <td className="px-1 py-1">
                            <select className={`${inputCls} text-[13px]`} value={l.itemType || "goods"} onChange={(e) => patch({ itemType: e.target.value })}>
                              <option value="goods">📦 Goods</option>
                              <option value="services">🛠️ Services</option>
                            </select>
                          </td>
                          <td className="px-1 py-1">
                            <input type="number" min={0} className={`${inputCls} text-right`} value={l.qty} onChange={(e) => patch({ qty: Number(e.target.value) })} />
                          </td>
                          <td className="px-1 py-1">
                            <input type="number" min={0} step="0.01" className={`${inputCls} text-right`} value={l.rate} onChange={(e) => patch({ rate: Number(e.target.value) })} />
                          </td>
                          <td className="px-1 py-1">
                            <input type="number" min={0} max={100} className={`${inputCls} text-right`} value={l.discountPct ?? 0} onChange={(e) => patch({ discountPct: Number(e.target.value) })} />
                          </td>
                          <td className="px-1 py-1">
                            <input type="number" min={0} step="0.01" className={`${inputCls} text-right`} placeholder={String(globalRate)} value={l.salesTaxRate ?? ""} onChange={(e) => patch({ salesTaxRate: e.target.value === "" ? undefined : Number(e.target.value) })} />
                          </td>
                          <td className="px-1 py-1 text-right text-[13px] text-amber-700">{num2(Math.round(lineCalc[i]?.st ?? 0))}</td>
                          <td className="px-1 py-1">
                            <select className={`${inputCls} text-[13px]`} value={l.aitSection ?? ""} onChange={(e) => patch({ aitSection: e.target.value })}>
                              <option value="">Auto</option>
                              <option value="goods">153(a)</option>
                              <option value="services">153(b)</option>
                              <option value="contract">153(c)</option>
                              <option value="none">None</option>
                            </select>
                          </td>
                          <td className="px-1 py-1">
                            <input type="number" min={0} step="0.01" className={`${inputCls} text-right`} placeholder="auto" value={l.aitRate ?? ""} onChange={(e) => patch({ aitRate: e.target.value === "" ? undefined : Number(e.target.value) })} />
                          </td>
                          <td className="px-1 py-1 text-right text-[13px] font-semibold text-rose-700">{num2(Math.round(lineCalc[i]?.ait ?? 0))}</td>
                          <td className="px-1 py-1 text-right text-[13px] font-bold">{money(amt)}</td>
                          <td className="px-1 py-1 text-center">
                            <button title="Remove line" className="font-bold text-rose-500 hover:text-rose-700" onClick={() => setLines(lines.filter((_, x) => x !== i))}>✕</button>
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-slate-50/70">
                      <td colSpan={isRet ? 14 : 13} className="p-2">
                        <button onClick={() => setLines([...lines, { itemId: null, description: "", qty: 1, unit: "PCS", rate: 0, discountPct: 0, returnCondition: "normal", itemType: "goods", taxExempt: false }])}
                          className="rounded-lg border border-dashed border-indigo-300 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50">
                          + Add line
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* 🇵🇰 Pakistan tax block — per-line taxes are set on each row below */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
              <div className="mb-1 text-sm font-bold text-emerald-900">🇵🇰 Pakistan Taxes — Sales Tax Act 1990 · Income Tax Ord. s.153</div>
              <p className="mb-2 text-[11px] text-emerald-800">
                Sales Tax %, Item Type, Exempt and <b>AIT u/s 153</b> are set <b>per line item</b> in the grid below
                (so goods and services can be taxed differently on one invoice). The fields here only set the
                <b> default rate</b> applied to new lines and the counterparty&apos;s filer status.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label={`Default Sales Tax % (std ${tax?.salesTaxRate ?? 18})`}><input type="number" step="0.01" className={inputCls} placeholder={`Default ${tax?.salesTaxRate ?? 18}`} value={h.salesTaxRate} onChange={(e) => set("salesTaxRate", e.target.value)} /></Field>
                <Field label={`Buyer Filer Status (auto: ${FILER_BADGE[filer] ?? filer})`}><select className={inputCls} value={h.buyerFilerStatus} onChange={(e) => set("buyerFilerStatus", e.target.value)}>
                  <option value="">Auto from party</option>
                  <option value="filer">Filer (ATL)</option>
                  <option value="late_filer">Late Filer</option>
                  <option value="non_filer">Non-Filer</option>
                </select></Field>
                <Field label="Further Tax (automatic)"><input className={inputCls} readOnly disabled value={ftAllowed && !h.taxExempt ? `${tax?.furtherTaxRate ?? 4}% u/s 3(1A) applies — buyer unregistered` : "Not applicable — buyer registered / exempt"} /></Field>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-4">
              <Field label="Discount %"><input type="number" className={inputCls} value={h.discountPct} onChange={(e) => set("discountPct", Number(e.target.value))} /></Field>
              <Field label="Discount (lump-sum)"><input type="number" className={inputCls} value={h.discountLumpsum} onChange={(e) => set("discountLumpsum", Number(e.target.value))} /></Field>
              <Field label="Transport Charges"><input type="number" className={inputCls} value={h.transportCharges} onChange={(e) => set("transportCharges", Number(e.target.value))} /></Field>
              <Field label="Labor Charges"><input type="number" className={inputCls} value={h.laborCharges} onChange={(e) => set("laborCharges", Number(e.target.value))} /></Field>
              <Field label="Paid Now"><input type="number" className={inputCls} value={h.paidAmount} onChange={(e) => set("paidAmount", Number(e.target.value))} /></Field>
              <Field label="Payment Mode"><select className={inputCls} value={h.paymentMode} onChange={(e) => set("paymentMode", e.target.value)}>
                {["cash", "bank", "card", "online", "cheque", "credit"].map((m) => <option key={m} value={m}>{m}</option>)}
              </select></Field>
              {(docType === "QUOT") && <Field label="Valid Until"><input type="date" className={inputCls} value={h.validUntil} onChange={(e) => set("validUntil", e.target.value)} /></Field>}
              <Field label="Notes" span><input className={inputCls} value={h.notes} onChange={(e) => set("notes", e.target.value)} /></Field>
            </div>
            <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-sm">
              <div className="flex flex-wrap justify-end gap-x-4 gap-y-1">
                <span>Subtotal <b>Rs {money(Math.round((afterPct + h.transportCharges + h.laborCharges) * 100) / 100)}</b></span>
                <span className="text-slate-600">📦 Goods ST <b>Rs {money(goodsTax)}</b></span>
                <span className="text-slate-600">🛠️ Services ({money(svcTotal)}) ST <b>Rs {money(svcTax)}</b></span>
                <span>Sales Tax total <b>Rs {money(Math.round(salesTax * 100) / 100)}</b></span>
                <span>Further Tax ({ftRate}%) <b>Rs {money(furtherTax)}</b></span>
              </div>
              <div className="mt-1 flex flex-wrap items-center justify-end gap-x-4 gap-y-1 border-t border-indigo-200 pt-2">
                <span>Grand Total <b className="text-lg text-indigo-700">Rs {money(Math.round(grand * 100) / 100)}</b></span>
                <span>Less AIT {aitSection} ({aitR}%, {FILER_BADGE[filer] ?? filer}) <b className="text-rose-600">−Rs {money(aitAmt)}</b></span>
                <span>Net Payable <b className="text-lg text-emerald-700">Rs {money(netPayable)}</b></span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn tone="success" onClick={save}>💾 Save &amp; Post</Btn></div>
        </Modal>
      )}

      {view && (
        <Modal title={`${view.document.docType} ${view.document.docNo}`} onClose={() => setView(null)} full>
          <div className="no-print mb-3 flex flex-wrap items-center gap-2">
            {FBR_TYPES.includes(view.document.docType) && <FbrStatusBadge status={view.document.fbrStatus} />}
            {view.document.fbrInvoiceNo && <span className="font-mono text-xs text-slate-600">IRN: {view.document.fbrInvoiceNo} · USIN: {view.document.fbrUsin}</span>}
            {FBR_TYPES.includes(view.document.docType) && view.document.fbrStatus !== "synced" && (
              <Btn small tone="success" onClick={() => syncFbr(view.document.id)}>📡 Sync to FBR</Btn>
            )}
          </div>
          <PrintDoc
            title={`${title} — ${view.document.docNo}`}
            head={[
              ["Date", String(view.document.date).slice(0, 10)], 
              ["Party", isWalkin ? (view.document.walkinName || "Walk-in Customer") : partyName(view.document.partyId)], 
              ["Payment", view.document.paymentMode], 
              ["Status", view.document.status], 
              ...(!isWalkin ? [["Filer", FILER_BADGE[view.document.buyerFilerStatus ?? ""] ?? view.document.buyerFilerStatus ?? "—"] as [string,string]] : []),
              ...(view.document.walkinContact ? [["Contact", `${view.document.walkinContact}${view.document.walkinPhone ? " · " + view.document.walkinPhone : ""}`] as [string,string]] : []),
              ...(view.document.walkinAddress || view.document.walkinCity ? [["Address", [view.document.walkinAddress, view.document.walkinCity].filter(Boolean).join(", ")] as [string,string]] : []),
            ]}
            lines={(view.lines as unknown as Array<{ description?: string | null; returnCondition?: string; qty: string | number; rate: string | number; amount: string | number }>).map((l) => ({ desc: l.returnCondition && l.returnCondition !== "normal" ? `${l.description ?? ""} [Cond: ${l.returnCondition.toUpperCase()}]` : l.description ?? "", qty: Number(l.qty), rate: Number(l.rate), amt: Number(l.amount) }))}
            totals={[
              /* --- charges & taxes: zero-value lines are hidden entirely --- */
              ...(Number(view.document.discountPct) > 0 || Number(view.document.discountLumpsum) > 0
                ? [["Discount", `${view.document.discountPct}% + Rs ${money(view.document.discountLumpsum)}`] as [string,string]] : []),
              ...(Number(view.document.salesTax) > 0
                ? [[`Sales Tax`, "Rs " + money(view.document.salesTax)] as [string,string]] : []),
              ...(Number(view.document.furtherTax) > 0
                ? [[`Further Tax u/s 3(1A)`, "Rs " + money(view.document.furtherTax)] as [string,string]] : []),
              ...(Number(view.document.transportCharges) > 0
                ? [["Transport Charges", "Rs " + money(view.document.transportCharges)] as [string,string]] : []),
              ...(Number(view.document.laborCharges) > 0
                ? [["Labor Charges", "Rs " + money(view.document.laborCharges)] as [string,string]] : []),
              ...(Number(view.document.aitAmount) > 0
                ? [[`Less AIT u/s 153 (withholding)`, "−Rs " + money(view.document.aitAmount)] as [string,string]] : []),
              ["Grand Total", "Rs " + money(view.document.grandTotal)],
              ...(Number(view.document.paidAmount) > 0
                ? [["Paid", "Rs " + money(view.document.paidAmount)] as [string,string]] : []),
              ...((Number(view.document.grandTotal) - Number(view.document.paidAmount)) > 0
                ? [["Balance Due", "Rs " + money(Number(view.document.grandTotal) - Number(view.document.paidAmount))] as [string,string]] : []),
            ]}
            company={defaultCompany ? { name: defaultCompany.name, ntn: defaultCompany.ntn, strn: defaultCompany.strn } : null}
            showFooter={["SINV", "SO"].includes(view.document.docType)}
            pictures={picturesOf(view.lines)}
          />

          {/* Render attached files for commercial documents */}
          {view.document.documents && (
            <div className="mt-4 rounded-xl border p-4 bg-slate-50">
              <h3 className="font-bold text-xs text-slate-800 mb-2">📁 Attached Supporting Documentation &amp; Gate Passes</h3>
              <div className="flex flex-wrap gap-3">
                {view.document.documents.split(",").filter(Boolean).map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-slate-100 shadow-sm">
                    <span>📄 Supporting File {idx + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="no-print mt-3 flex justify-end gap-2">
            <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print</Btn>
            <Btn onClick={() => setView(null)}>Close</Btn>
          </div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
