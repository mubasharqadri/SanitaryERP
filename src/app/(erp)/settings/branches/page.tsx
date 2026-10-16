"use client";
import { useMemo, useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, Card, LetterheadPrintWrapper, useToast } from "@/components/erp";

type Company = { id: number; name: string; isDefault: boolean };
type Branch = { id: number; companyId: number; companyName: string; code: string; name: string; address: string | null; phone: string | null; isHeadOffice: boolean; active: boolean; createdAt: string; updatedAt: string };
type FormState = { companyId: string; code: string; name: string; address: string; phone: string; isHeadOffice: boolean; active: boolean };
const EMPTY: FormState = { companyId: "", code: "", name: "", address: "", phone: "", isHeadOffice: false, active: true };

export default function BranchesPage() {
  const { data: companiesData } = useApi<{ rows: Company[] }>("/api/admin?entity=companies");
  const companies = companiesData?.rows ?? [];
  const [companyFilter, setCompanyFilter] = useState("");
  const url = companyFilter ? `/api/admin?entity=branches&companyId=${companyFilter}` : "/api/admin?entity=branches";
  const { data, loading, reload } = useApi<{ rows: Branch[] }>(url, [url]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [viewing, setViewing] = useState<Branch | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const { setMsg, toast } = useToast();
  const rows = data?.rows ?? [];
  const selectedCompanyName = useMemo(() => companies.find((c) => String(c.id) === companyFilter)?.name, [companies, companyFilter]);

  function newBranch() {
    const def = companies.find((c) => c.isDefault) ?? companies[0];
    setEditing(null);
    setForm({ ...EMPTY, companyId: companyFilter || (def ? String(def.id) : "") });
    setModal(true);
  }
  function editBranch(b: Branch) {
    setEditing(b);
    setForm({ companyId: String(b.companyId), code: b.code, name: b.name, address: b.address ?? "", phone: b.phone ?? "", isHeadOffice: b.isHeadOffice, active: b.active });
    setModal(true);
  }
  async function save() {
    if (!form.companyId || !form.code.trim() || !form.name.trim()) return setMsg("!Company, branch code and name are required.");
    try {
      await api("/api/admin", { method: editing ? "PUT" : "POST", body: JSON.stringify({ entity: "branches", ...(editing ? { id: editing.id } : {}), data: form }) });
      setModal(false); setEditing(null); reload(); setMsg(editing ? "Branch updated ✓" : "Branch created ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Unable to save branch")); }
  }
  async function setClosed(b: Branch, close: boolean) {
    if (b.isHeadOffice && close) return setMsg("!The Head Office branch cannot be closed.");
    if (!confirm(`${close ? "Close" : "Reopen"} branch ${b.code} — ${b.name}?`)) return;
    try {
      await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "branches", id: b.id, data: { ...b, active: !close } }) });
      reload(); setMsg(close ? "Branch closed ✓" : "Branch reopened ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Unable to change branch status")); }
  }
  async function deleteBranch(b: Branch) {
    if (!confirm(`Permanently delete ${b.code} — ${b.name}? Head Office, assigned-user and historical branches are protected.`)) return;
    try {
      await api(`/api/admin?entity=branches&id=${b.id}`, { method: "DELETE" });
      reload(); setMsg("Branch deleted ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Unable to delete branch")); }
  }

  return (
    <div>
      <PageHead title="🏬 Branches" sub="Manage company locations, login availability and branch ownership"
        actions={<><Btn tone="ghost" onClick={() => window.print()}>🖨️ Print Branch List (A4/PDF)</Btn><Btn onClick={newBranch}>+ New Branch</Btn></>} />

      <div className="no-print mb-4 flex flex-wrap items-end gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <Field label="Filter by company"><select className={inputCls} value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
          <option value="">All companies</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}{c.isDefault ? " (Default)" : ""}</option>)}
        </select></Field>
        <span className="pb-2 text-xs text-slate-500">{rows.length} branches{selectedCompanyName ? ` · ${selectedCompanyName}` : ""}</span>
      </div>
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card><div className="text-xs text-slate-500">Branches</div><div className="text-2xl font-extrabold">{rows.length}</div></Card>
        <Card><div className="text-xs text-slate-500">Open</div><div className="text-2xl font-extrabold text-emerald-700">{rows.filter((b) => b.active).length}</div></Card>
        <Card><div className="text-xs text-slate-500">Closed</div><div className="text-2xl font-extrabold text-amber-700">{rows.filter((b) => !b.active).length}</div></Card>
      </div>

      {loading ? <div className="text-slate-500">Loading branches…</div> : (
        <Table head={["Code", "Branch", "Company", "Phone", "Address", "Type", "Login Status", "Actions"]}>
          {rows.map((b) => <tr key={b.id} className={!b.active ? "bg-slate-50 opacity-70" : "hover:bg-slate-50"}>
            <td className="px-3 py-2 font-mono text-xs font-bold">{b.code}</td>
            <td className="px-3 py-2 font-semibold">{b.name}</td>
            <td className="px-3 py-2">{b.companyName}</td>
            <td className="px-3 py-2 text-xs">{b.phone || "—"}</td>
            <td className="px-3 py-2 text-xs">{b.address || "—"}</td>
            <td className="px-3 py-2">{b.isHeadOffice ? <Badge tone="blue">Head Office</Badge> : <Badge>Branch</Badge>}</td>
            <td className="px-3 py-2"><Badge tone={b.active ? "green" : "amber"}>{b.active ? "Open" : "Closed"}</Badge></td>
            <td className="no-print px-3 py-2 text-right whitespace-nowrap space-x-2">
              <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={() => setViewing(b)}>View</button>
              <button className="text-xs font-semibold text-slate-700 hover:underline" onClick={() => editBranch(b)}>Edit</button>
              {b.active ? <button disabled={b.isHeadOffice} className="text-xs font-semibold text-amber-600 hover:underline disabled:opacity-40" onClick={() => setClosed(b, true)}>Close</button>
                : <button className="text-xs font-semibold text-emerald-600 hover:underline" onClick={() => setClosed(b, false)}>Reopen</button>}
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={() => deleteBranch(b)}>Delete</button>
            </td>
          </tr>)}
          {rows.length === 0 && <tr><td colSpan={8} className="px-3 py-8 text-center text-sm text-slate-400">No branches found. The first Head Office branch is created automatically for each company.</td></tr>}
        </Table>
      )}

      <div className="print-area mt-5">
        <LetterheadPrintWrapper title={`Branch Register${selectedCompanyName ? ` — ${selectedCompanyName}` : ""}`} layout="A4">
          <table className="w-full border-collapse text-xs">
            <thead><tr className="border-b-2 border-slate-900 bg-slate-50 text-left font-bold">
              <th className="px-2 py-2">Code</th><th className="px-2 py-2">Branch</th><th className="px-2 py-2">Company</th><th className="px-2 py-2">Phone</th><th className="px-2 py-2">Address</th><th className="px-2 py-2">Type</th><th className="px-2 py-2">Status</th>
            </tr></thead>
            <tbody className="divide-y">{rows.map((b) => <tr key={b.id}>
              <td className="px-2 py-1.5 font-mono">{b.code}</td><td className="px-2 py-1.5 font-semibold">{b.name}</td><td className="px-2 py-1.5">{b.companyName}</td><td className="px-2 py-1.5">{b.phone || "—"}</td><td className="px-2 py-1.5">{b.address || "—"}</td><td className="px-2 py-1.5">{b.isHeadOffice ? "Head Office" : "Branch"}</td><td className="px-2 py-1.5">{b.active ? "Open" : "Closed"}</td>
            </tr>)}</tbody>
          </table>
        </LetterheadPrintWrapper>
      </div>

      {modal && <Modal title={editing ? `Edit Branch — ${editing.code}` : "Create Branch"} onClose={() => setModal(false)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Company *"><select className={inputCls} value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })}><option value="">— Select company —</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Branch Code *"><input className={inputCls} placeholder="e.g. LHR-01" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} /></Field>
          <Field label="Branch Name *"><input className={inputCls} placeholder="e.g. Lahore Showroom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Phone"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Address" span><input className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isHeadOffice} onChange={(e) => setForm({ ...form, isHeadOffice: e.target.checked })} /> Head Office</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Open / available at login</label>
        </div>
        <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setModal(false)}>Cancel</Btn><Btn onClick={save}>Save Branch</Btn></div>
      </Modal>}

      {viewing && <Modal title={`Branch Details — ${viewing.code}`} onClose={() => setViewing(null)}>
        <div className="space-y-3">
          <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs text-slate-500">Branch</div><div className="text-xl font-extrabold">{viewing.name}</div></div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-xs text-slate-500">Company</span><div className="font-semibold">{viewing.companyName}</div></div>
            <div><span className="text-xs text-slate-500">Code</span><div className="font-mono font-bold">{viewing.code}</div></div>
            <div><span className="text-xs text-slate-500">Type</span><div>{viewing.isHeadOffice ? <Badge tone="blue">Head Office</Badge> : <Badge>Branch</Badge>}</div></div>
            <div><span className="text-xs text-slate-500">Status</span><div><Badge tone={viewing.active ? "green" : "amber"}>{viewing.active ? "Open" : "Closed"}</Badge></div></div>
            <div><span className="text-xs text-slate-500">Phone</span><div>{viewing.phone || "—"}</div></div>
            <div className="col-span-2"><span className="text-xs text-slate-500">Address</span><div>{viewing.address || "—"}</div></div>
            <div><span className="text-xs text-slate-500">Created</span><div>{new Date(viewing.createdAt).toLocaleDateString()}</div></div>
          </div>
        </div>
        <div className="mt-4 flex justify-end"><Btn onClick={() => setViewing(null)}>Close</Btn></div>
      </Modal>}
      {toast}
    </div>
  );
}
