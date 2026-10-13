"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Card, Field, inputCls, SearchInput, Table, Badge, Modal, money, useToast, MultiFileUploader, PicUploader } from "@/components/erp";

export type Party = {
  id: number; type: string; name: string; cnic: string | null; ntn: string | null; strn: string | null;
  phone: string | null; mobile: string | null; email: string | null; area: string | null; city: string | null;
  province: string | null; filerStatus: string; salesTaxRegistered: boolean;
  contactPic: string | null; documents: string | null;
  openingBalance: string; creditLimit: string; salesmanId: number | null; active: boolean;
  outstanding: number; invoiced: number; returned: number; settled: number; siteCount: number;
};

const EMPTY = { name: "", cnic: "", ntn: "", strn: "", phone: "", mobile: "", email: "", area: "", city: "", province: "Punjab", filerStatus: "filer", salesTaxRegistered: false, contactPic: "", documents: "", openingBalance: 0, creditLimit: 0, salesmanId: "", active: true };
const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan", "ICT", "Gilgit-Baltistan", "AJK", "Other"];

const okNTN = (v: string) => !v || /^\d{7}-\d$/.test(v.trim());
const okSTRN = (v: string) => !v || v.replace(/[^0-9]/g, "").length >= 10;
const okCNIC = (v: string) => !v || /^\d{5}-\d{7}-\d$/.test(v.trim());
const FILER_LABEL: Record<string, string> = { filer: "Filer ✓", late_filer: "Late Filer", non_filer: "Non-Filer" };

export function PartyManager({ type, title, icon }: { type: "customer" | "vendor"; title: string; icon: string }) {
  const { data, loading, reload } = useApi<{ parties: Party[] }>(`/api/parties?type=${type}`);
  const { data: smData } = useApi<{ rows: Array<{ id: number; name: string }> }>("/api/admin?entity=salesmen");
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Party | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({ ...EMPTY });
  const [detail, setDetail] = useState<{ party: Party; sites: Array<{ id: number; siteName: string; address: string | null; contactPerson: string | null; contactNumber: string | null; creditLimit: string; isClosed: boolean }>; docs: Array<{ id: number; docType: string; docNo: string; date: string; grandTotal: string; status: string }> } | null>(null);
  const [siteForm, setSiteForm] = useState({ siteName: "", address: "", contactPerson: "", contactNumber: "", creditLimit: 0 });
  const { msg, setMsg, toast } = useToast();
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const list = (data?.parties ?? []).filter((p) => !q || (p.name + p.city + p.phone).toLowerCase().includes(q.toLowerCase()));

  async function save() {
    if (!form.name) return setMsg("!Name is required");
    if (!okNTN(String(form.ntn ?? ""))) return setMsg("!NTN format invalid — use 1234567-8");
    if (!okCNIC(String(form.cnic ?? ""))) return setMsg("!CNIC format invalid — use 34101-1234567-8");
    if (!okSTRN(String(form.strn ?? ""))) return setMsg("!STRN looks invalid — FBR numeric STRN (10–15 digits)");
    try {
      if (edit) await api("/api/parties", { method: "PUT", body: JSON.stringify({ id: edit.id, party: form }) });
      else await api("/api/parties", { method: "POST", body: JSON.stringify({ party: { ...form, type } }) });
      setShow(false); setEdit(null); setForm({ ...EMPTY }); reload(); setMsg(edit ? "Updated ✓" : "Created ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  async function openDetail(p: Party) {
    try { setDetail(await api(`/api/parties?id=${p.id}`)); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  async function addSite() {
    if (!detail || !siteForm.siteName) return setMsg("!Site name required");
    try {
      await api("/api/parties", { method: "POST", body: JSON.stringify({ action: "site", site: { partyId: detail.party.id, ...siteForm } }) });
      setSiteForm({ siteName: "", address: "", contactPerson: "", contactNumber: "", creditLimit: 0 });
      setDetail(await api(`/api/parties?id=${detail.party.id}`)); reload(); setMsg("Site added ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  function toForm(p: Party): Record<string, unknown> {
    return {
      name: p.name, cnic: p.cnic ?? "", ntn: p.ntn ?? "", strn: p.strn ?? "", phone: p.phone ?? "",
      mobile: p.mobile ?? "", email: p.email ?? "", area: p.area ?? "", city: p.city ?? "",
      province: p.province ?? "Punjab", filerStatus: p.filerStatus ?? "filer", salesTaxRegistered: !!p.salesTaxRegistered,
      contactPic: p.contactPic ?? "", documents: p.documents ?? "",
      openingBalance: Number(p.openingBalance), creditLimit: Number(p.creditLimit),
      salesmanId: p.salesmanId ? String(p.salesmanId) : "", active: p.active,
    };
  }

  return (
    <div>
      <PageHead title={`${icon} ${title}`} sub={`${list.length} ${type}s · live outstanding balances · filer status drives AIT u/s 153`}
        actions={<><SearchInput value={q} onChange={setQ} placeholder={`Search ${type}s…`} /><Btn onClick={() => { setEdit(null); setForm({ ...EMPTY }); setShow(true); }}>+ New {type === "customer" ? "Customer" : "Vendor"}</Btn></>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Photo", "Name", "City/Area", "Filer / ST", "NTN / STRN", "Outstanding", "Credit Limit", "Sites", "Status", ""]}>
          {list.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50">
              <td className="px-3 py-2">
                <div className="h-10 w-10 bg-slate-200 rounded-full border overflow-hidden flex items-center justify-center text-sm shrink-0">
                  {p.contactPic ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.contactPic} alt="pic" className="h-full w-full object-cover" />
                  ) : "👤"}
                </div>
              </td>
              <td className="px-3 py-2 font-medium">{p.name}</td>
              <td className="px-3 py-2 text-slate-500">{p.city ?? "—"}{p.area ? ` · ${p.area}` : ""}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <Badge tone={p.filerStatus === "filer" ? "green" : p.filerStatus === "late_filer" ? "amber" : "red"}>{FILER_LABEL[p.filerStatus] ?? p.filerStatus}</Badge>{" "}
                <Badge tone={p.salesTaxRegistered ? "blue" : "slate"}>{p.salesTaxRegistered ? "ST-Reg" : "Unreg"}</Badge>
              </td>
              <td className="px-3 py-2 font-mono text-[11px]">{p.ntn ?? "—"}{p.strn ? <><br />{p.strn}</> : ""}</td>
              <td className="px-3 py-2 text-right font-bold text-indigo-700">{money(p.outstanding)} <span className="text-[10px] font-normal text-slate-400">Dr</span></td>
              <td className="px-3 py-2 text-right">{money(p.creditLimit)}</td>
              <td className="px-3 py-2">{p.siteCount}</td>
              <td className="px-3 py-2"><Badge tone={p.active ? "green" : "red"}>{p.active ? "Active" : "Inactive"}</Badge></td>
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <button onClick={() => openDetail(p)} className="mr-2 text-xs font-semibold text-indigo-600 hover:underline">View</button>
                <button onClick={() => { setEdit(p); setForm(toForm(p)); setShow(true); }} className="text-xs font-semibold text-slate-600 hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? `Edit ${type}` : `New ${type}`} onClose={() => setShow(false)}>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name *"><input className={inputCls} value={String(form.name)} onChange={(e) => set("name", e.target.value)} /></Field>
              <Field label="Salesman"><select className={inputCls} value={String(form.salesmanId)} onChange={(e) => set("salesmanId", e.target.value)}>
                <option value="">— None —</option>{(smData?.rows ?? []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select></Field>
              <Field label={`CNIC ${String(form.cnic) && (okCNIC(String(form.cnic)) ? "✓" : "✗ format 34101-1234567-8")}`}><input className={inputCls} placeholder="34101-1234567-8" value={String(form.cnic)} onChange={(e) => set("cnic", e.target.value)} /></Field>
              <Field label={`NTN ${String(form.ntn) && (okNTN(String(form.ntn)) ? "✓" : "✗ format 1234567-8")}`}><input className={inputCls} placeholder="1234567-8" value={String(form.ntn)} onChange={(e) => set("ntn", e.target.value)} /></Field>
              <Field label={`STRN ${String(form.strn) && (okSTRN(String(form.strn)) ? "✓" : "✗ numeric 10–15 digits")}`}><input className={inputCls} placeholder="3277876123456" value={String(form.strn)} onChange={(e) => set("strn", e.target.value)} /></Field>
              <Field label="Email"><input className={inputCls} value={String(form.email)} onChange={(e) => set("email", e.target.value)} /></Field>
              <Field label="Phone"><input className={inputCls} value={String(form.phone)} onChange={(e) => set("phone", e.target.value)} /></Field>
              <Field label="Mobile"><input className={inputCls} value={String(form.mobile)} onChange={(e) => set("mobile", e.target.value)} /></Field>
              <Field label="Area"><input className={inputCls} value={String(form.area)} onChange={(e) => set("area", e.target.value)} /></Field>
              <Field label="City"><input className={inputCls} value={String(form.city)} onChange={(e) => set("city", e.target.value)} /></Field>
              <Field label="Province"><select className={inputCls} value={String(form.province)} onChange={(e) => set("province", e.target.value)}>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select></Field>
              <Field label="Filer Status (ATL — drives AIT rate)"><select className={inputCls} value={String(form.filerStatus)} onChange={(e) => set("filerStatus", e.target.value)}>
                <option value="filer">Filer (ATL)</option>
                <option value="late_filer">Late Filer</option>
                <option value="non_filer">Non-Filer</option>
              </select></Field>
              <Field label="Opening Balance"><input type="number" className={inputCls} value={Number(form.openingBalance)} onChange={(e) => set("openingBalance", Number(e.target.value))} /></Field>
              <Field label="Credit Limit"><input type="number" className={inputCls} value={Number(form.creditLimit)} onChange={(e) => set("creditLimit", Number(e.target.value))} /></Field>
            </div>

            <PicUploader label="Contact Person Photo" value={String(form.contactPic || "")} onChange={(url) => set("contactPic", url)} />
            <MultiFileUploader label="Attached Documents / License Scans" value={String(form.documents || "")} onChange={(urls) => set("documents", urls)} />

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.salesTaxRegistered} onChange={(e) => set("salesTaxRegistered", e.target.checked)} /> Sales-Tax Registered (holds valid STRN)</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.active} onChange={(e) => set("active", e.target.checked)} /> Active</label>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {detail && (
        <Modal title={`${detail.party.name} — Profile`} onClose={() => setDetail(null)} wide>
          <div className="flex gap-4 items-start border-b pb-4 mb-4">
            <div className="h-20 w-24 bg-slate-200 border rounded-xl overflow-hidden flex items-center justify-center text-3xl shrink-0">
              {detail.party.contactPic ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={detail.party.contactPic} alt="contact" className="h-full w-full object-cover" />
              ) : "👤"}
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{detail.party.name}</div>
              <div className="flex flex-wrap gap-2 text-sm mt-1">
                <Badge tone={detail.party.filerStatus === "filer" ? "green" : detail.party.filerStatus === "late_filer" ? "amber" : "red"}>{FILER_LABEL[detail.party.filerStatus] ?? detail.party.filerStatus}</Badge>
                <Badge tone={detail.party.salesTaxRegistered ? "blue" : "slate"}>{detail.party.salesTaxRegistered ? "ST Registered" : "ST Unregistered"}</Badge>
                <span className="text-xs text-slate-500">NTN: {detail.party.ntn ?? "—"} · STRN: {detail.party.strn ?? "—"} · CNIC: {detail.party.cnic ?? "—"} · {detail.party.province ?? ""}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <Card><div className="text-xs text-slate-500">Outstanding</div><div className="text-xl font-bold text-indigo-700">Rs {money(detail.party.outstanding)}</div></Card>
            <Card><div className="text-xs text-slate-500">Invoiced</div><div className="text-xl font-bold">Rs {money(detail.party.invoiced)}</div></Card>
            <Card><div className="text-xs text-slate-500">Returned</div><div className="text-xl font-bold">Rs {money(detail.party.returned)}</div></Card>
            <Card><div className="text-xs text-slate-500">Settled</div><div className="text-xl font-bold text-emerald-600">Rs {money(detail.party.settled)}</div></Card>
          </div>

          {/* Attached Files rendering */}
          {detail.party.documents && (
            <div className="mt-4 rounded-xl border p-4 bg-slate-50">
              <h3 className="font-bold text-sm text-slate-800 mb-2">📁 Attached Partner Documents</h3>
              <div className="flex flex-wrap gap-3">
                {detail.party.documents.split(",").filter(Boolean).map((url, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-slate-100 shadow-sm">
                    <span>📄 Document {idx + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          <h3 className="mb-2 mt-5 font-bold">🏗️ Delivery Sites ({detail.sites.length})</h3>
          <div className="space-y-2">
            {detail.sites.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3 text-sm">
                <div><b>{s.siteName}</b> {s.isClosed && <Badge tone="red">Closed</Badge>}
                  <div className="text-xs text-slate-500">{s.address ?? ""} · {s.contactPerson ?? ""} {s.contactNumber ?? ""} · Limit Rs {money(s.creditLimit)}</div></div>
                <div className="flex gap-2">
                  <Btn small tone="ghost" onClick={async () => { await api("/api/parties", { method: "POST", body: JSON.stringify({ action: "site-toggle", siteId: s.id }) }); setDetail(await api(`/api/parties?id=${detail.party.id}`)); }}>{s.isClosed ? "Reopen" : "Close"}</Btn>
                  <Btn small tone="danger" onClick={async () => { if (confirm("Delete site?")) { await api("/api/parties", { method: "POST", body: JSON.stringify({ action: "site-delete", siteId: s.id }) }); setDetail(await api(`/api/parties?id=${detail.party.id}`)); reload(); } }}>Delete</Btn>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2 rounded-lg bg-slate-50 p-3 sm:grid-cols-5">
            <input className={inputCls} placeholder="Site name *" value={siteForm.siteName} onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })} />
            <input className={inputCls} placeholder="Address" value={siteForm.address} onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })} />
            <input className={inputCls} placeholder="Contact person" value={siteForm.contactPerson} onChange={(e) => setSiteForm({ ...siteForm, contactPerson: e.target.value })} />
            <input className={inputCls} placeholder="Contact number" value={siteForm.contactNumber} onChange={(e) => setSiteForm({ ...siteForm, contactNumber: e.target.value })} />
            <div className="flex gap-2"><input type="number" className={inputCls} placeholder="Limit" value={siteForm.creditLimit} onChange={(e) => setSiteForm({ ...siteForm, creditLimit: Number(e.target.value) })} /><Btn onClick={addSite}>Add</Btn></div>
          </div>
          <h3 className="mb-2 mt-5 font-bold">🧾 Recent Documents</h3>
          <Table head={["Doc No", "Type", "Date", "Total", "Status"]}>
            {detail.docs.map((d) => (
              <tr key={d.id}><td className="px-3 py-2 font-mono text-xs">{d.docNo}</td><td className="px-3 py-2">{d.docType}</td><td className="px-3 py-2">{String(d.date).slice(0, 10)}</td><td className="px-3 py-2 text-right">{money(d.grandTotal)}</td><td className="px-3 py-2">{d.status}</td></tr>
            ))}
          </Table>
        </Modal>
      )}
      {toast}
    </div>
  );
}
