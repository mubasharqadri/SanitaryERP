"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, money, useToast } from "@/components/erp";

type Acc = { id: number; code: string; name: string; type: string; openingDebit: string; openingCredit: string; active: boolean; totalDr: number; totalCr: number; balance: number; periodDr: number; periodCr: number };

export default function ChartPage() {
  const { data, loading, reload } = useApi<{ accounts: Acc[] }>("/api/accounts");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Acc | null>(null);
  const [viewAcc, setViewAcc] = useState<Acc | null>(null);
  const [form, setForm] = useState({ code: "", name: "", type: "Asset", openingDebit: 0, openingCredit: 0, active: true });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.code || !form.name) return setMsg("!Code and Name required");
    try {
      if (edit) await api("/api/accounts", { method: "PUT", body: JSON.stringify({ id: edit.id, ...form }) });
      else await api("/api/accounts", { method: "POST", body: JSON.stringify(form) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  async function cancelAccount(a: Acc) {
    if (!confirm(`Are you sure you want to deactivate (cancel) account ${a.code}?`)) return;
    try {
      await api("/api/accounts", { method: "PUT", body: JSON.stringify({ id: a.id, code: a.code, name: a.name, type: a.type, openingDebit: Number(a.openingDebit), openingCredit: Number(a.openingCredit), active: false }) });
      reload(); setMsg("Account deactivated ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  const groups = ["Asset", "Liability", "Equity", "Income", "Expense"];
  return (
    <div>
      <PageHead title="🗂️ Chart of Accounts" sub="Double-entry ledger accounts with live balances" actions={<Btn onClick={() => { setEdit(null); setForm({ code: "", name: "", type: "Asset", openingDebit: 0, openingCredit: 0, active: true }); setShow(true); }}>+ New Account</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : groups.map((g) => {
        const rows = (data?.accounts ?? []).filter((a) => a.type === g);
        if (!rows.length) return null;
        return (
          <div key={g} className="mb-5">
            <h3 className="mb-2 font-bold text-slate-800">{g}s</h3>
            <Table head={["Code", "Name", "Op. Dr", "Op. Cr", "Total Dr", "Total Cr", "Balance", "Actions"]}>
              {rows.map((a) => (
                <tr key={a.id}>
                  <td className="px-3 py-2 font-mono text-xs font-bold">{a.code}</td>
                  <td className="px-3 py-2">{a.name} {!a.active && <Badge tone="red">Inactive (Cancelled)</Badge>}</td>
                  <td className="px-3 py-2 text-right">{money(a.openingDebit)}</td>
                  <td className="px-3 py-2 text-right">{money(a.openingCredit)}</td>
                  <td className="px-3 py-2 text-right">{money(a.totalDr)}</td>
                  <td className="px-3 py-2 text-right">{money(a.totalCr)}</td>
                  <td className="px-3 py-2 text-right font-bold">{money(a.balance)} {a.balance >= 0 ? "Dr" : "Cr"}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap space-x-1.5">
                    <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={() => setViewAcc(a)}>View</button>
                    <button className="text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(a); setForm({ code: a.code, name: a.name, type: a.type, openingDebit: Number(a.openingDebit), openingCredit: Number(a.openingCredit), active: a.active }); setShow(true); }}>Edit</button>
                    {a.active && (
                      <button className="text-xs font-semibold text-amber-600 hover:underline" onClick={() => cancelAccount(a)}>Cancel</button>
                    )}
                    <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (!confirm("Delete?")) return; try { await api(`/api/accounts?id=${a.id}`, { method: "DELETE" }); reload(); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Delete failed")); } }}>Delete</button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        );
      })}
      {show && (
        <Modal title={edit ? "Edit Account" : "New Account"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Code *"><input className={inputCls} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></Field>
            <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Type"><select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{groups.map((g) => <option key={g} value={g}>{g}</option>)}</select></Field>
            <Field label="Opening Debit"><input type="number" className={inputCls} value={form.openingDebit} onChange={(e) => setForm({ ...form, openingDebit: Number(e.target.value) })} /></Field>
            <Field label="Opening Credit"><input type="number" className={inputCls} value={form.openingCredit} onChange={(e) => setForm({ ...form, openingCredit: Number(e.target.value) })} /></Field>
            <label className="flex items-end gap-2 pb-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {viewAcc && (
        <Modal title={`Account Profile — ${viewAcc.code}`} onClose={() => setViewAcc(null)}>
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Account name</span>
              <div className="text-xl font-bold text-slate-900">{viewAcc.code} — {viewAcc.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div><span className="text-xs text-slate-500">Account Type</span><div className="font-semibold">{viewAcc.type}</div></div>
              <div><span className="text-xs text-slate-500">Status</span><div className="font-semibold"><Badge tone={viewAcc.active ? "green" : "red"}>{viewAcc.active ? "Active" : "Inactive"}</Badge></div></div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t pt-3 bg-slate-50 p-3 rounded-xl">
              <div><span className="text-xs text-slate-500">Opening Debit</span><div className="font-bold text-slate-800">Rs {money(viewAcc.openingDebit)}</div></div>
              <div><span className="text-xs text-slate-500">Opening Credit</span><div className="font-bold text-slate-800">Rs {money(viewAcc.openingCredit)}</div></div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div><span className="text-xs text-slate-500">Total Dr Postings</span><div className="font-semibold text-slate-800">Rs {money(viewAcc.totalDr)}</div></div>
              <div><span className="text-xs text-slate-500">Total Cr Postings</span><div className="font-semibold text-slate-800">Rs {money(viewAcc.totalCr)}</div></div>
            </div>
            <div className="border-t pt-3 text-center">
              <span className="text-xs text-slate-500 uppercase tracking-wide">Net Ledger Balance</span>
              <div className="text-2xl font-extrabold text-indigo-700 mt-1">Rs {money(viewAcc.balance)} {viewAcc.balance >= 0 ? "Dr" : "Cr"}</div>
            </div>
          </div>
          <div className="mt-5 flex justify-end"><Btn onClick={() => setViewAcc(null)}>Close</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
