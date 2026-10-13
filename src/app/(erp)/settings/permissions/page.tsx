"use client";
import { useState } from "react";
import { api, useApi, PageHead, Table, Badge, inputCls, useToast, Btn } from "@/components/erp";

type P = { id: number; userId: number; menuKey: string; canView: boolean; canCreate: boolean; canEdit: boolean; canDelete: boolean; canPrint: boolean; canExport: boolean; canUpload: boolean; canDownload: boolean };

export default function PermissionsPage() {
  const { data: userData } = useApi<{ rows: Array<{ id: number; username: string; role: string }> }>("/api/admin?entity=users");
  const [uid, setUid] = useState("");
  const { data, reload } = useApi<{ rows: P[]; menuKeys: string[] }>(uid ? `/api/admin?entity=permissions&userId=${uid}` : "/api/admin?entity=permissions");
  const [upUid, setUpUid] = useState("");
  const { data: upData, reload: reloadUp } = useApi<{ canUpload: boolean; canDownload: boolean; isAdmin: boolean }>(
    (uid || upUid) ? `/api/import?action=rights&uid=${uid || upUid}` : null);
  const { msg, setMsg, toast } = useToast();
  const users = (userData?.rows ?? []).filter((u) => u.role !== "admin");
  const keys = data?.menuKeys ?? [];
  const map: Record<string, P> = {};
  for (const r of (data?.rows ?? []).filter((r) => !uid || String(r.userId) === uid)) map[r.menuKey] = r;

  async function toggle(menuKey: string, field: "canView" | "canCreate" | "canEdit" | "canDelete" | "canPrint" | "canExport" | "canUpload" | "canDownload") {
    if (!uid) return setMsg("!Select a user first");
    const c0 = map[menuKey];
    const cur = { canView: !!c0?.canView, canCreate: !!c0?.canCreate, canEdit: !!c0?.canEdit, canDelete: !!c0?.canDelete, canPrint: !!c0?.canPrint, canExport: !!c0?.canExport, canUpload: !!c0?.canUpload, canDownload: !!c0?.canDownload };
    try {
      await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "permissions", data: { userId: Number(uid), menuKey, ...cur, [field]: !cur[field] } }) });
      reload(); reloadUp();
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  async function setTransferRights(field: "canUpload" | "canDownload") {
    if (!uid) return setMsg("!Select a user first");
    try {
      await api("/api/import", { method: "PUT", body: JSON.stringify({ userId: Number(uid), menuKey: "data_upload", canUpload: field === "canUpload" ? !upData?.canUpload : !!upData?.canUpload, canDownload: field === "canDownload" ? !upData?.canDownload : !!upData?.canDownload }) });
      reload(); reloadUp(); setMsg("Transfer rights updated ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed")); }
  }

  return (
    <div>
      <PageHead title="🔑 Permissions" sub="Odoo-like per-user menu rights (admins have full access)"
        actions={<select value={uid} onChange={(e) => setUid(e.target.value)} className={inputCls} style={{ width: "auto" }}>
          <option value="">— Select user —</option>{users.map((u) => <option key={u.id} value={u.id}>{u.username} ({u.role})</option>)}
        </select>} />
      <div className="no-print mb-4 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
        <div className="mb-2 text-sm font-bold text-indigo-900">📤 Bulk Data Transfer Rights (data_upload)</div>
        <p className="mb-3 text-xs text-indigo-800">These rights control who may import CSV data from other software and who may download templates / exports. Admins always have both.</p>
        <div className="flex flex-wrap gap-3">
          <Btn small tone={upData?.canUpload ? "success" : "ghost"} onClick={() => setTransferRights("canUpload")}>
            {upData?.canUpload ? "✓ Upload Allowed" : "Upload Blocked"}
          </Btn>
          <Btn small tone={upData?.canDownload ? "success" : "ghost"} onClick={() => setTransferRights("canDownload")}>
            {upData?.canDownload ? "✓ Download Allowed" : "Download Blocked"}
          </Btn>
        </div>
      </div>
      <Table head={["Menu", "View", "Create", "Edit", "Delete", "Print", "Export", "Upload", "Download"]}>
        {keys.map((k) => {
          const p = map[k];
          const cell = (f: "canView" | "canCreate" | "canEdit" | "canDelete" | "canPrint" | "canExport" | "canUpload" | "canDownload") => (
            <td key={f} className="px-3 py-2 text-center">
              <button onClick={() => toggle(k, f)} className={`grid h-7 w-7 place-items-center rounded-lg text-sm ${p?.[f] ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-300"}`}>✓</button>
            </td>
          );
          return (
            <tr key={k}><td className="px-3 py-2 font-mono text-xs">{k} {p ? <Badge tone="green">set</Badge> : <span className="text-slate-300">—</span>}</td>
            {cell("canView")}{cell("canCreate")}{cell("canEdit")}{cell("canDelete")}{cell("canPrint")}{cell("canExport")}{cell("canUpload")}{cell("canDownload")}</tr>
          );
        })}
      </Table>
      {toast}
    </div>
  );
}
