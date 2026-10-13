"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, Table, Badge, Modal, useToast, PicUploader } from "@/components/erp";

type Lh = { id: number; name: string; headerText: string | null; footerText: string | null; headerImage: string | null; footerImage: string | null; isDefault: boolean };

export default function LetterheadsPage() {
  const { data, loading, reload } = useApi<{ rows: Lh[] }>("/api/admin?entity=letterheads");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Lh | null>(null);
  const [form, setForm] = useState({ name: "", headerText: "", footerText: "", headerImage: "", footerImage: "", isDefault: false });
  const { msg, setMsg, toast } = useToast();

  async function save() {
    if (!form.name) return setMsg("!Name required");
    try {
      if (edit) await api("/api/admin", { method: "PUT", body: JSON.stringify({ entity: "letterheads", id: edit.id, data: form }) });
      else await api("/api/admin", { method: "POST", body: JSON.stringify({ entity: "letterheads", data: form }) });
      setShow(false); setEdit(null); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="🧾 Letterheads" sub="Print headers & footers for documents" actions={<Btn onClick={() => { setEdit(null); setForm({ name: "", headerText: "", footerText: "", headerImage: "", footerImage: "", isDefault: false }); setShow(true); }}>+ New Letterhead</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Name", "Artwork", "Header", "Footer", "Default", ""]}>
          {(data?.rows ?? []).map((l) => (
            <tr key={l.id}><td className="px-3 py-2 font-medium">{l.name}</td>
            <td className="px-3 py-2"><div className="flex gap-1">
              {l.headerImage && <img src={l.headerImage} alt="" className="h-8 rounded border object-contain" />}
              {l.footerImage && <img src={l.footerImage} alt="" className="h-8 rounded border object-contain" />}
              {!l.headerImage && !l.footerImage && <span className="text-xs text-slate-400">text only</span>}
            </div></td>
            <td className="px-3 py-2 text-xs whitespace-pre-line">{l.headerText ?? "—"}</td>
            <td className="px-3 py-2 text-xs">{l.footerText ?? "—"}</td>
            <td className="px-3 py-2">{l.isDefault && <Badge tone="green">Default</Badge>}</td>
            <td className="px-3 py-2 text-right whitespace-nowrap">
              <button className="mr-2 text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(l); setForm({ name: l.name, headerText: l.headerText ?? "", footerText: l.footerText ?? "", headerImage: l.headerImage ?? "", footerImage: l.footerImage ?? "", isDefault: l.isDefault }); setShow(true); }}>Edit</button>
              <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm("Delete?")) { await api(`/api/admin?entity=letterheads&id=${l.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
            </td></tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Letterhead" : "New Letterhead"} onClose={() => setShow(false)}>
          <div className="grid gap-3">
            <Field label="Name *"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Header Text"><textarea className={inputCls} rows={3} value={form.headerText} onChange={(e) => setForm({ ...form, headerText: e.target.value })} /></Field>
            <Field label="Footer Text"><textarea className={inputCls} rows={2} value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <PicUploader label="Header Artwork (printed above the body)" value={form.headerImage} onChange={(v) => setForm({ ...form, headerImage: v })} />
              <PicUploader label="Footer Artwork (printed below the footer text)" value={form.footerImage} onChange={(v) => setForm({ ...form, footerImage: v })} />
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> Default</label>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
