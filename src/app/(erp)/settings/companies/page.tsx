"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast, MultiFileUploader } from "@/components/erp";

type Co = { id: number; name: string; address: string | null; phone: string | null; email: string | null; ntn: string | null; strn: string | null; isDefault: boolean; documents: string | null };

export default function CompaniesPage() {
  const { data, loading, reload } = useApi<{ rows: Co[] }>("/api/admin?entity=companies");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Co | null>(null);
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "", ntn: "", strn: "", isDefault: false, documents: "" });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.name) return setMsg("!Name required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "companies", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "companies", data: form }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="🏢 Companies" sub="Multi-company setup" actions={<Btn onClick={() => { setEdit(null); setForm({ name: "", address: "", phone: "", email: "", ntn: "", strn: "", isDefault: false, documents: "" }); setShow(true); }}>+ New Company</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Name", "Phone", "NTN/STRN", "Files", "Default", ""]}>
          {(data?.rows ?? []).map((c) => (
            <tr key={c.id}><td className="px-3 py-2 font-medium">{c.name}<div className="text-xs font-normal text-slate-400">{c.address ?? ""}</div></td>
            <td className="px-3 py-2">{c.phone ?? "—"}</td><td className="px-3 py-2 text-xs">{c.ntn ?? ""} {c.strn ?? ""}</td>
            <td className="px-3 py-2 text-xs">{(c.documents?.split(",").filter(Boolean).length ?? 0) || "—"}</td>
            <td className="px-3 py-2">{c.isDefault && <Badge tone="green">Default</Badge>}</td>
            <td className="px-3 py-2 text-right whitespace-nowrap">
              <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(c); setForm({ name: c.name, address: c.address ?? "", phone: c.phone ?? "", email: c.email ?? "", ntn: c.ntn ?? "", strn: c.strn ?? "", isDefault: c.isDefault, documents: c.documents ?? "" }); setShow(true); }}>Edit</button>
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete?")) { await api(`/api/admin?entity=companies&id=${c.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
            </td></tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Company" : "New Company"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name *" span><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Address" span><input className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
            <Field label="Phone"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email"><input className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="NTN"><input className={inputCls} value={form.ntn} onChange={(e) => setForm({ ...form, ntn: e.target.value })} /></Field>
            <Field label="STRN"><input className={inputCls} value={form.strn} onChange={(e) => setForm({ ...form, strn: e.target.value })} /></Field>
            <MultiFileUploader label="Company Documents — registration, NTN certificate, STRN, contracts" value={form.documents} onChange={(v) => setForm({ ...form, documents: v })} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Default company</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
