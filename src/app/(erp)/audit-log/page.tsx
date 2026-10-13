"use client";
import { useState } from "react";
import { useApi, PageHead, Table, Badge, SearchInput, Btn } from "@/components/erp";

export default function AuditPage() {
  const { data, loading, reload } = useApi<{ rows: Array<{ id: number; username: string | null; action: string; tableName: string | null; recordId: string | null; payload: unknown; createdAt: string }> }>("/api/admin?entity=audit");
  const [q, setQ] = useState("");
  const rows = (data?.rows ?? []).filter((r) => !q || ((r.username ?? "") + (r.action ?? "") + (r.tableName ?? "") + (r.recordId ?? "")).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageHead title="🛡️ Audit Trail" sub={`${rows.length} recent actions`} actions={<><SearchInput value={q} onChange={setQ} placeholder="Search audit…" /><Btn tone="ghost" onClick={reload}>↻</Btn></>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["#", "Time", "User", "Action", "Table", "Record", "Payload"]}>
          {rows.map((r) => (
            <tr key={r.id}><td className="px-3 py-2">{r.id}</td>
            <td className="px-3 py-2 text-xs">{new Date(r.createdAt).toLocaleString()}</td>
            <td className="px-3 py-2 font-medium">{r.username ?? "—"}</td>
            <td className="px-3 py-2"><Badge tone={r.action === "delete" ? "red" : r.action === "create" ? "green" : "blue"}>{r.action}</Badge></td>
            <td className="px-3 py-2 font-mono text-xs">{r.tableName ?? "—"}</td>
            <td className="px-3 py-2 font-mono text-xs">{r.recordId ?? "—"}</td>
            <td className="px-3 py-2 max-w-[280px] truncate text-xs text-slate-500">{JSON.stringify(r.payload)}</td></tr>
          ))}
        </Table>
      )}
    </div>
  );
}
