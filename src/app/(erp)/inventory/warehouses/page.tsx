"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast } from "@/components/erp";

type Wh = { id: number; code: string; name: string; address: string | null; active: boolean };

export default function WarehousesPage() {
  const { data, loading, reload } = useApi<{ rows: Wh[] }>("/api/admin?entity=warehouses");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Wh | null>(null);
  const [viewWh, setViewWh] = useState<Wh | null>(null);
  const [form, setForm] = useState({ code: "", name: "", address: "", active: true });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.code || !form.name) return setMsg("!Code and Name required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "warehouses", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "warehouses", data: form }) });
      setShow(false); setEdit(null); setForm({ code: "", name: "", address: "", active: true }); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  async function cancelWarehouse(w: Wh) {
    if (!confirm(`Are you sure you want to deactivate (cancel) warehouse ${w.code}?`)) return;
    try {
      await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "warehouses", id: w.id, data: { ...w, active: false } }) });
      reload(); setMsg("Warehouse deactivated ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  return (
    <div>
      <PageHead title="🏬 Warehouses" sub="Godowns & showroom stock locations" actions={<Btn onClick={() => { setEdit(null); setForm({ code: "", name: "", address: "", active: true }); setShow(true); }}>+ New Warehouse</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Code", "Name", "Address", "Status", "Actions"]}>
          {(data?.rows ?? []).map((w) => (
            <tr key={w.id} className={!w.active ? "opacity-60" : ""}>
              <td className="px-3 py-2 font-mono text-xs">{w.code}</td>
              <td className="px-3 py-2 font-medium">{w.name}</td>
              <td className="px-3 py-2">{w.address ?? "—"}</td>
              <td className="px-3 py-2"><Badge tone={w.active ? "green" : "red"}>{w.active ? "Active" : "Inactive (Cancelled)"}</Badge></td>
              <td className="px-3 py-2 text-right whitespace-nowrap space-x-1.5">
                <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={() => setViewWh(w)}>View</button>
                <button className="text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(w); setForm({ code: w.code, name: w.name, address: w.address ?? "", active: w.active }); setShow(true); }}>Edit</button>
                {w.active && (
                  <button className="text-xs font-semibold text-amber-600 hover:underline" onClick={() => cancelWarehouse(w)}>Cancel</button>
                )}
                <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete?")) { await api(`/api/admin?entity=warehouses&id=${w.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Warehouse" : "New Warehouse"} onClose={() => setShow(false)}>
          <div className="grid gap-3">
            <Field label="Code *"><input className={inputCls} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></Field>
            <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Address"><input className={inputCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {viewWh && (
        <Modal title={`Warehouse Details — ${viewWh.code}`} onClose={() => setViewWh(null)}>
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Warehouse name</span>
              <div className="text-xl font-bold text-slate-900">{viewWh.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div><span className="text-xs text-slate-500">Warehouse Code</span><div className="font-semibold font-mono">{viewWh.code}</div></div>
              <div><span className="text-xs text-slate-500">Status</span><div className="font-semibold"><Badge tone={viewWh.active ? "green" : "red"}>{viewWh.active ? "Active" : "Inactive"}</Badge></div></div>
            </div>
            <div className="border-t pt-3">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Physical Address</span>
              <p className="font-semibold text-slate-800 mt-1">{viewWh.address || "No address defined"}</p>
            </div>
          </div>
          <div className="mt-5 flex justify-end"><Btn onClick={() => setViewWh(null)}>Close</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
