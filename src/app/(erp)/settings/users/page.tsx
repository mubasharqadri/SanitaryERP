"use client";
import { useMemo, useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast, PicUploader } from "@/components/erp";

type U = { id: number; username: string; fullName: string; role: string; picture: string | null; companyId: number | null; branchId: number | null; active: boolean; createdAt: string };
type Co = { id: number; name: string; isDefault: boolean };
type Br = { id: number; companyId: number; code: string; name: string; isHeadOffice: boolean; active: boolean };
type UserForm = { username: string; fullName: string; role: string; password: string; picture: string; companyId: string; branchId: string; active: boolean };
const EMPTY: UserForm = { username: "", fullName: "", role: "user", password: "", picture: "", companyId: "", branchId: "", active: true };

export default function UsersPage() {
  const { data, loading, reload } = useApi<{ rows: U[] }>("/api/admin?entity=users");
  const { data: companyData } = useApi<{ rows: Co[] }>("/api/admin?entity=companies");
  const { data: branchData } = useApi<{ rows: Br[] }>("/api/admin?entity=branches");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<U | null>(null);
  const [form, setForm] = useState<UserForm>(EMPTY);
  const { msg, setMsg, toast } = useToast();
  const companies = companyData?.rows ?? [];
  const branches = branchData?.rows ?? [];
  const visibleBranches = useMemo(() => branches.filter((b) => String(b.companyId) === form.companyId && b.active), [branches, form.companyId]);
  const coName = (id: number | null) => companies.find((c) => c.id === id)?.name ?? "—";
  const brName = (id: number | null) => branches.find((b) => b.id === id)?.name ?? (id ? `#${id}` : "All branches");

  function openNew() {
    const c = companies.find((x) => x.isDefault) ?? companies[0];
    const ho = c ? branches.find((b) => b.companyId === c.id && b.isHeadOffice) ?? branches.find((b) => b.companyId === c.id) : null;
    setEdit(null);
    setForm({ ...EMPTY, companyId: c ? String(c.id) : "", branchId: ho ? String(ho.id) : "" });
    setShow(true);
  }
  function openEdit(u: U) {
    setEdit(u);
    setForm({ username: u.username, fullName: u.fullName, role: u.role, password: "", picture: u.picture ?? "", companyId: u.companyId ? String(u.companyId) : "", branchId: u.branchId ? String(u.branchId) : "", active: u.active });
    setShow(true);
  }
  function changeCompany(value: string) {
    const ho = branches.find((b) => String(b.companyId) === value && b.isHeadOffice && b.active) ?? branches.find((b) => String(b.companyId) === value && b.active);
    setForm({ ...form, companyId: value, branchId: form.role === "admin" ? "" : (ho ? String(ho.id) : "") });
  }
  async function save() {
    if (!edit && (!form.username || !form.password)) return setMsg("!Username & password required");
    if (form.role !== "admin" && (!form.companyId || !form.branchId)) return setMsg("!Assign non-admin staff to a company and branch.");
    try {
      const payload = { ...form, companyId: form.companyId ? Number(form.companyId) : null, branchId: form.branchId ? Number(form.branchId) : null };
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "users", id: edit.id, data: payload }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "users", data: payload }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="👤 Users" sub="Assign every staff login to a company and branch; Head Office admins may select all branches"
        actions={<Btn onClick={openNew}>+ New User</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Photo", "Username", "Full Name", "Role", "Company", "Branch Scope", "Status", "Created", ""]}>
          {(data?.rows ?? []).map((u) => (
            <tr key={u.id}>
              <td className="px-3 py-2"><div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border bg-slate-100 text-sm">{u.picture ? <img src={u.picture} alt="" className="h-full w-full object-cover" /> : "👤"}</div></td>
              <td className="px-3 py-2 font-mono font-bold">{u.username}</td>
              <td className="px-3 py-2">{u.fullName}</td>
              <td className="px-3 py-2"><Badge tone={u.role === "admin" ? "blue" : "slate"}>{u.role}</Badge></td>
              <td className="px-3 py-2 text-xs">{coName(u.companyId)}</td>
              <td className="px-3 py-2 text-xs">{u.role === "admin" && !u.branchId ? <Badge tone="blue">All branches · HO admin</Badge> : brName(u.branchId)}</td>
              <td className="px-3 py-2"><Badge tone={u.active ? "green" : "red"}>{u.active ? "Active" : "Disabled"}</Badge></td>
              <td className="px-3 py-2 text-xs">{String(u.createdAt).slice(0, 10)}</td>
              <td className="px-3 py-2 text-right whitespace-nowrap">
                <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => openEdit(u)}>Edit</button>
                <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete user?")) { try { await api(`/api/admin?entity=users&id=${u.id}`, { method: "DELETE" }); reload(); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); } } }}>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit User & Branch Access" : "New User & Branch Access"} onClose={() => setShow(false)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Username *"><input className={inputCls} value={form.username} disabled={!!edit} onChange={(e) => setForm({ ...form, username: e.target.value })} /></Field>
            <Field label="Full Name"><input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Field>
            <Field label="Role"><select className={inputCls} value={form.role} onChange={(e) => { const role = e.target.value; setForm({ ...form, role, branchId: role === "admin" ? "" : form.branchId }); }}>
              {["admin", "manager", "cashier", "user"].map((r) => <option key={r} value={r}>{r}</option>)}
            </select></Field>
            <Field label={edit ? "New Password (blank = keep)" : "Password *"}><input type="password" className={inputCls} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
            <Field label="Company *"><select className={inputCls} value={form.companyId} onChange={(e) => changeCompany(e.target.value)}><option value="">— Select Company —</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
            <Field label="Branch *"><select className={inputCls} value={form.branchId} onChange={(e) => setForm({ ...form, branchId: e.target.value })}>
              {form.role === "admin" && <option value="">All branches (Head Office admin)</option>}
              {form.role !== "admin" && <option value="">— Select Branch —</option>}
              {visibleBranches.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.code}){b.isHeadOffice ? " · Head Office" : ""}</option>)}
            </select></Field>
            <PicUploader label="User Photo / Avatar" value={form.picture} onChange={(v) => setForm({ ...form, picture: v })} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active</label>
          </div>
          <div className="mt-3 rounded-lg bg-indigo-50 p-3 text-xs text-indigo-800">Non-admin users are restricted to exactly one assigned branch. Admin users can be assigned to one branch, or use “All branches (Head Office admin)” to manage every branch in that company.</div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
