"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast, PicUploader } from "@/components/erp";

type U = { id: number; username: string; fullName: string; role: string; picture: string | null; active: boolean; createdAt: string };

export default function UsersPage() {
  const { data, loading, reload } = useApi<{ rows: U[] }>("/api/admin?entity=users");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<U | null>(null);
  const [form, setForm] = useState({ username: "", fullName: "", role: "user", password: "", picture: "", active: true });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!edit && (!form.username || !form.password)) return setMsg("!Username & password required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "users", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "users", data: form }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="👤 Users" sub="Staff accounts & roles (admin only)" actions={<Btn onClick={() => { setEdit(null); setForm({ username: "", fullName: "", role: "user", password: "", picture: "", active: true }); setShow(true); }}>+ New User</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Photo", "Username", "Full Name", "Role", "Status", "Created", ""]}>
          {(data?.rows ?? []).map((u) => (
            <tr key={u.id}>
              <td className="px-3 py-2"><div className="h-9 w-9 overflow-hidden rounded-full border bg-slate-100 grid place-items-center text-sm">
                {u.picture ? <img src={u.picture} alt="" className="h-full w-full object-cover" /> : "👤"}</div></td>
              <td className="px-3 py-2 font-mono font-bold">{u.username}</td><td className="px-3 py-2">{u.fullName}</td>
            <td className="px-3 py-2"><Badge tone={u.role === "admin" ? "blue" : "slate"}>{u.role}</Badge></td>
            <td className="px-3 py-2"><Badge tone={u.active ? "green" : "red"}>{u.active ? "Active" : "Disabled"}</Badge></td>
            <td className="px-3 py-2 text-xs">{String(u.createdAt).slice(0, 10)}</td>
            <td className="px-3 py-2 text-right whitespace-nowrap">
              <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(u); setForm({ username: u.username, fullName: u.fullName, role: u.role, password: "", picture: u.picture ?? "", active: u.active }); setShow(true); }}>Edit</button>
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete user?")) { try { await api(`/api/admin?entity=users&id=${u.id}`, { method: "DELETE" }); reload(); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); } } }}>Delete</button>
            </td></tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit User" : "New User"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Username *"><input className={inputCls} value={form.username} disabled={!!edit} onChange={(e) => setForm({ ...form, username: e.target.value })} /></Field>
            <Field label="Full Name"><input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Field>
            <Field label="Role"><select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {["admin", "manager", "cashier", "user"].map((r) => <option key={r} value={r}>{r}</option>)}
            </select></Field>
            <Field label={edit ? "New Password (blank = keep)" : "Password *"}><input type="password" className={inputCls} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
            <PicUploader label="User Photo / Avatar" value={form.picture} onChange={(v) => setForm({ ...form, picture: v })} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
