"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast } from "@/components/erp";

type Cu = { id: number; code: string; name: string; symbol: string; rateToBase: string; isBase: boolean };

export default function CurrenciesPage() {
  const { data, loading, reload } = useApi<{ rows: Cu[] }>("/api/admin?entity=currencies");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Cu | null>(null);
  const [form, setForm] = useState({ code: "", name: "", symbol: "Rs", rateToBase: 1, isBase: false });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.code || !form.name) return setMsg("!Code & Name required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "currencies", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "currencies", data: form }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="💱 Currencies" sub="Multi-currency with exchange rates" actions={<Btn onClick={() => { setEdit(null); setForm({ code: "", name: "", symbol: "Rs", rateToBase: 1, isBase: false }); setShow(true); }}>+ New Currency</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Code", "Name", "Symbol", "Rate to Base", "Base", ""]}>
          {(data?.rows ?? []).map((c) => (
            <tr key={c.id}><td className="px-3 py-2 font-mono font-bold">{c.code}</td><td className="px-3 py-2">{c.name}</td>
            <td className="px-3 py-2">{c.symbol}</td><td className="px-3 py-2">{c.rateToBase}</td>
            <td className="px-3 py-2">{c.isBase && <Badge tone="green">Base</Badge>}</td>
            <td className="px-3 py-2 text-right whitespace-nowrap">
              <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(c); setForm({ code: c.code, name: c.name, symbol: c.symbol, rateToBase: Number(c.rateToBase), isBase: c.isBase }); setShow(true); }}>Edit</button>
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete?")) { await api(`/api/admin?entity=currencies&id=${c.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
            </td></tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Currency" : "New Currency"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Code *"><input className={inputCls} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} /></Field>
            <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Symbol"><input className={inputCls} value={form.symbol} onChange={(e) => setForm({ ...form, symbol: e.target.value })} /></Field>
            <Field label="Rate to Base"><input type="number" step="0.0001" className={inputCls} value={form.rateToBase} onChange={(e) => setForm({ ...form, rateToBase: Number(e.target.value) })} /></Field>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isBase} onChange={(e) => setForm({ ...form, isBase: e.target.checked })} /> Base currency</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
