"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast, MultiImageUploader, MultiFileUploader } from "@/components/erp";

type Sm = { id: number; name: string; phone: string | null; area: string | null; commissionRate: string; active: boolean; pictures: string | null; documents: string | null };

export default function SalesmenPage() {
  const { data, loading, reload } = useApi<{ rows: Sm[] }>("/api/admin?entity=salesmen");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Sm | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", area: "", commissionRate: 0, active: true, pictures: "", documents: "" });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.name) return setMsg("!Name required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "salesmen", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "salesmen", data: form }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="🧑‍💼 Salesmen" sub="Commission rates & areas" actions={<Btn onClick={() => { setEdit(null); setForm({ name: "", phone: "", area: "", commissionRate: 0, active: true, pictures: "", documents: "" }); setShow(true); }}>+ New Salesman</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Photo", "Name", "Phone", "Area", "Commission %", "Files", "Status", ""]}>
          {(data?.rows ?? []).map((s) => (
            <tr key={s.id}>
              <td className="px-3 py-2"><div className="h-9 w-9 overflow-hidden rounded-full border bg-slate-100 grid place-items-center text-sm">
                {s.pictures ? <img src={s.pictures.split(",")[0]} alt="" className="h-full w-full object-cover" /> : "🧑‍💼"}</div></td>
              <td className="px-3 py-2 font-medium">{s.name}</td><td className="px-3 py-2">{s.phone ?? "—"}</td>
            <td className="px-3 py-2">{s.area ?? "—"}</td><td className="px-3 py-2">{s.commissionRate}%</td>
            <td className="px-3 py-2 text-xs">{((s.pictures?.split(",").filter(Boolean).length ?? 0) + (s.documents?.split(",").filter(Boolean).length ?? 0)) || "—"}</td>
            <td className="px-3 py-2"><Badge tone={s.active ? "green" : "red"}>{s.active ? "Active" : "Inactive"}</Badge></td>
            <td className="px-3 py-2 text-right whitespace-nowrap">
              <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(s); setForm({ name: s.name, phone: s.phone ?? "", area: s.area ?? "", commissionRate: Number(s.commissionRate), active: s.active, pictures: s.pictures ?? "", documents: s.documents ?? "" }); setShow(true); }}>Edit</button>
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete?")) { await api(`/api/admin?entity=salesmen&id=${s.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
            </td></tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Salesman" : "New Salesman"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Phone"><input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Area"><input className={inputCls} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} /></Field>
            <Field label="Commission %"><input type="number" step="0.1" className={inputCls} value={form.commissionRate} onChange={(e) => setForm({ ...form, commissionRate: Number(e.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
            <MultiImageUploader label="Salesman Pictures — face photo, CNIC front, CNIC back, etc." value={form.pictures} onChange={(v) => setForm({ ...form, pictures: v })} />
            <MultiFileUploader label="Attached Documents — resume, contracts, references" value={form.documents} onChange={(v) => setForm({ ...form, documents: v })} />
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
