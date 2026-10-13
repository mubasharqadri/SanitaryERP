"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, SearchInput, Table, Badge, Modal, money, useToast, MultiFileUploader, MultiImageUploader } from "@/components/erp";

type Item = {
  id: number; code: string; barcode: string | null; name: string; category: string; brand: string | null;
  model: string | null; unit: string; size: string | null; color: string | null; design: string | null;
  origin: string; featured: boolean; costPrice: string; salePrice: string; reorderLevel: string;
  openingStock: string; hsCode: string | null; taxClass: string; taxRate: string; documents: string | null; pictures: string | null;
  active: boolean; stock: number; sold30: number; soldTotal: number;
};
const EMPTY = { code: "", barcode: "", name: "", category: "Sanitary Ware", brand: "", model: "", unit: "PCS", size: "", color: "", design: "", origin: "Local", featured: false, costPrice: 0, salePrice: 0, reorderLevel: 5, openingStock: 0, hsCode: "", taxClass: "standard", taxRate: 18, documents: "", pictures: "", warehouseId: "", active: true };

const TAX_LABEL: Record<string, string> = { standard: "Standard", reduced: "Reduced", zero: "Zero-rated", exempt: "Exempt" };

export default function ItemsPage() {
  const { data, loading, reload } = useApi<{ items: Item[]; categories: string[] }>("/api/items");
  const { data: whData } = useApi<{ rows: Array<{ id: number; name: string }> }>("/api/admin?entity=warehouses");
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState<Item | null>(null);
  const [viewItem, setViewItem] = useState<Item | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({ ...EMPTY });
  const { msg, setMsg, toast } = useToast();
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const list = (data?.items ?? []).filter((i) => !q || (i.name + i.code + (i.brand ?? "") + (i.color ?? "") + (i.hsCode ?? "")).toLowerCase().includes(q.toLowerCase()));

  async function save() {
    if (!form.code || !form.name) return setMsg("!Code and Name are required");
    try {
      if (edit) await api("/api/items", { method: "PUT", body: JSON.stringify({ id: edit.id, item: form }) });
      else await api("/api/items", { method: "POST", body: JSON.stringify({ item: form }) });
      setShow(false); setEdit(null); setForm({ ...EMPTY }); reload(); setMsg("Saved ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  return (
    <div>
      <PageHead title="📦 Items & Catalog" sub={`${list.length} items · live stock from ledger · HS codes for FBR invoices`}
        actions={<><SearchInput value={q} onChange={setQ} placeholder="Search items…" /><Btn onClick={() => { setEdit(null); setForm({ ...EMPTY, warehouseId: whData?.rows[0] ? String(whData.rows[0].id) : "" }); setShow(true); }}>+ New Item</Btn></>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Code", "Name", "HS Code", "Tax Class", "Origin", "Cost", "Sale", "Stock", "Sold/mo", "Actions"]}>
          {list.map((i) => (
            <tr key={i.id}>
              <td className="px-3 py-2 font-mono text-xs">{i.code}</td>
              <td className="px-3 py-2 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md border bg-slate-100 grid place-items-center text-xs">
                    {i.pictures ? <img src={i.pictures.split(",")[0]} alt="" className="h-full w-full object-cover" /> : "📦"}
                  </div>
                  <span>{i.name}</span>{i.featured && <span title="Featured">⭐</span>}
                  {i.pictures && i.pictures.split(",").filter(Boolean).length > 1 && (
                    <span className="rounded bg-slate-100 px-1 text-[10px] font-bold text-slate-500">{i.pictures.split(",").filter(Boolean).length} 📷</span>
                  )}
                </div>
              </td>
              <td className="px-3 py-2 font-mono text-xs">{i.hsCode ?? <span className="text-amber-600">— missing</span>}</td>
              <td className="px-3 py-2 text-xs">{TAX_LABEL[i.taxClass] ?? i.taxClass} · {i.taxRate}%</td>
              <td className="px-3 py-2">{i.origin === "Imported" ? "✈️ Imported" : "🇵🇰 Local"}</td>
              <td className="px-3 py-2 text-right">{money(i.costPrice)}</td>
              <td className="px-3 py-2 text-right font-bold">{money(i.salePrice)}</td>
              <td className="px-3 py-2"><Badge tone={i.stock <= 0 ? "red" : i.stock <= Number(i.reorderLevel) ? "amber" : "green"}>{i.stock}</Badge></td>
              <td className="px-3 py-2">{i.sold30}</td>
              <td className="px-3 py-2 text-right whitespace-nowrap space-x-1.5">
                <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={() => setViewItem(i)}>View</button>
                <button className="text-xs font-semibold text-slate-600 hover:underline" onClick={() => { setEdit(i); setForm({ code: i.code, barcode: i.barcode ?? "", name: i.name, category: i.category, brand: i.brand ?? "", model: i.model ?? "", unit: i.unit, size: i.size ?? "", color: i.color ?? "", design: i.design ?? "", origin: i.origin, featured: i.featured, costPrice: Number(i.costPrice), salePrice: Number(i.salePrice), reorderLevel: Number(i.reorderLevel), openingStock: Number(i.openingStock), hsCode: i.hsCode ?? "", taxClass: i.taxClass ?? "standard", taxRate: Number(i.taxRate ?? 18), documents: i.documents ?? "", pictures: i.pictures ?? "", warehouseId: "", active: i.active }); setShow(true); }}>Edit</button>
                <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (!confirm(`Delete ${i.code}?`)) return; try { await api(`/api/items?id=${i.id}`, { method: "DELETE" }); reload(); } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Delete failed")); } }}>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      )}
      {show && (
        <Modal title={edit ? "Edit Item" : "New Item"} onClose={() => setShow(false)} wide>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Code *"><input className={inputCls} value={String(form.code)} onChange={(e) => set("code", e.target.value)} /></Field>
              <Field label="Barcode"><input className={inputCls} value={String(form.barcode)} onChange={(e) => set("barcode", e.target.value)} /></Field>
              <Field label="Name *"><input className={inputCls} value={String(form.name)} onChange={(e) => set("name", e.target.value)} /></Field>
              <Field label="Category"><select className={inputCls} value={String(form.category)} onChange={(e) => set("category", e.target.value)}>
                {["Sanitary Ware", "Tiles", "Brass Fittings", "Accessories", "General"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select></Field>
              <Field label="Brand"><input className={inputCls} value={String(form.brand)} onChange={(e) => set("brand", e.target.value)} /></Field>
              <Field label="Model"><input className={inputCls} value={String(form.model)} onChange={(e) => set("model", e.target.value)} /></Field>
              <Field label="Unit"><select className={inputCls} value={String(form.unit)} onChange={(e) => set("unit", e.target.value)}>
                {["PCS", "SET", "MTR", "PAIR", "BOX", "KG"].map((u) => <option key={u} value={u}>{u}</option>)}
              </select></Field>
              <Field label="Size"><input className={inputCls} value={String(form.size)} onChange={(e) => set("size", e.target.value)} /></Field>
              <Field label="Color"><input className={inputCls} value={String(form.color)} onChange={(e) => set("color", e.target.value)} /></Field>
              <Field label="Design"><input className={inputCls} value={String(form.design)} onChange={(e) => set("design", e.target.value)} /></Field>
              <Field label="Origin"><select className={inputCls} value={String(form.origin)} onChange={(e) => set("origin", e.target.value)}>
                <option value="Local">🇵🇰 Local</option><option value="Imported">✈️ Imported</option>
              </select></Field>
              <Field label="Warehouse"><select className={inputCls} value={String(form.warehouseId)} onChange={(e) => set("warehouseId", e.target.value)}>
                <option value="">—</option>{(whData?.rows ?? []).map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select></Field>
              <Field label="Cost Price"><input type="number" className={inputCls} value={Number(form.costPrice)} onChange={(e) => set("costPrice", Number(e.target.value))} /></Field>
              <Field label="Sale Price"><input type="number" className={inputCls} value={Number(form.salePrice)} onChange={(e) => set("salePrice", Number(e.target.value))} /></Field>
              <Field label="Reorder Level"><input type="number" className={inputCls} value={Number(form.reorderLevel)} onChange={(e) => set("reorderLevel", Number(e.target.value))} /></Field>
              <Field label="Opening Stock"><input type="number" className={inputCls} value={Number(form.openingStock)} onChange={(e) => set("openingStock", Number(e.target.value))} /></Field>
              <Field label="HS / PCT Code (FBR)"><input className={inputCls} placeholder="e.g. 6910.1000" value={String(form.hsCode)} onChange={(e) => set("hsCode", e.target.value)} /></Field>
              <Field label="Tax Class"><select className={inputCls} value={String(form.taxClass)} onChange={(e) => set("taxClass", e.target.value)}>
                <option value="standard">Standard rated (18%)</option>
                <option value="reduced">Reduced (8th Schedule)</option>
                <option value="zero">Zero-rated (5th Schedule)</option>
                <option value="exempt">Exempt (6th Schedule)</option>
              </select></Field>
              <Field label="Item Tax Rate %"><input type="number" step="0.01" className={inputCls} value={Number(form.taxRate)} onChange={(e) => set("taxRate", Number(e.target.value))} /></Field>
            </div>

            <MultiImageUploader label="Product Pictures — multiple angles (first image shows on the storefront)" value={String(form.pictures || "")} onChange={(v) => set("pictures", v)} />
            <MultiFileUploader label="Attached Brochures / Documents" value={String(form.documents || "")} onChange={(urls) => set("documents", urls)} />

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} /> ⭐ Featured on storefront</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.active} onChange={(e) => set("active", e.target.checked)} /> Active</label>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn onClick={save}>Save</Btn></div>
        </Modal>
      )}
      {viewItem && (
        <Modal title={`Item details — ${viewItem.code}`} onClose={() => setViewItem(null)}>
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase font-semibold text-slate-500 tracking-wider">Item Name</span>
              <div className="text-xl font-bold text-slate-900">{viewItem.name} {viewItem.featured && "⭐"}</div>
            </div>
            {viewItem.pictures && viewItem.pictures.split(",").filter(Boolean).length > 0 && (
              <div className="rounded-xl border p-3">
                <div className="mb-2 text-xs font-bold text-slate-700">🖼️ Product Pictures ({viewItem.pictures.split(",").filter(Boolean).length})</div>
                <div className="flex flex-wrap gap-2">
                  {viewItem.pictures.split(",").filter(Boolean).map((p, idx) => (
                    <a key={idx} href={p} target="_blank" rel="noreferrer">
                      <img src={p} alt={`p${idx}`} className="h-24 w-24 rounded-lg border object-cover hover:opacity-80" />
                    </a>
                  ))}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div><span className="text-xs text-slate-500">Category</span><div className="font-semibold">{viewItem.category}</div></div>
              <div><span className="text-xs text-slate-500">Brand</span><div className="font-semibold">{viewItem.brand || "—"}</div></div>
              <div><span className="text-xs text-slate-500">Model</span><div className="font-semibold">{viewItem.model || "—"}</div></div>
              <div><span className="text-xs text-slate-500">Unit</span><div className="font-semibold">{viewItem.unit}</div></div>
              <div><span className="text-xs text-slate-500">Size / Dimension</span><div className="font-semibold">{viewItem.size || "—"}</div></div>
              <div><span className="text-xs text-slate-500">Color / Design</span><div className="font-semibold">{[viewItem.color, viewItem.design].filter(Boolean).join(" — ") || "—"}</div></div>
              <div><span className="text-xs text-slate-500">Origin</span><div className="font-semibold">{viewItem.origin === "Imported" ? "✈️ Imported" : "🇵🇰 Local"}</div></div>
              <div><span className="text-xs text-slate-500">FBR HS / PCT Code</span><div className="font-semibold font-mono text-indigo-700">{viewItem.hsCode || "—"}</div></div>
              <div><span className="text-xs text-slate-500">FBR Tax Class</span><div className="font-semibold text-indigo-700">{TAX_LABEL[viewItem.taxClass] || viewItem.taxClass} ({viewItem.taxRate}%)</div></div>
              <div><span className="text-xs text-slate-500">Status</span><div className="font-semibold"><Badge tone={viewItem.active ? "green" : "red"}>{viewItem.active ? "Active" : "Inactive"}</Badge></div></div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t pt-3 bg-slate-50 p-3 rounded-xl">
              <div><span className="text-xs text-slate-500">Cost Price</span><div className="font-bold text-slate-800">Rs {money(viewItem.costPrice)}</div></div>
              <div><span className="text-xs text-slate-500">Sale Price</span><div className="font-bold text-indigo-700">Rs {money(viewItem.salePrice)}</div></div>
              <div><span className="text-xs text-slate-500">Reorder Alarm</span><div className="font-semibold text-amber-700">{viewItem.reorderLevel} {viewItem.unit}</div></div>
            </div>
            <div className="grid grid-cols-3 gap-3 border-t pt-3">
              <div><span className="text-xs text-slate-500">Opening Stock</span><div className="font-semibold">{viewItem.openingStock}</div></div>
              <div><span className="text-xs text-slate-500">Current Stock</span><div className="font-extrabold text-emerald-700">{viewItem.stock}</div></div>
              <div><span className="text-xs text-slate-500">Sold (Last 30 days)</span><div className="font-semibold">{viewItem.sold30} {viewItem.unit}</div></div>
            </div>

            {/* Render item attachments */}
            {viewItem.documents && (
              <div className="mt-4 rounded-xl border p-4 bg-slate-50">
                <h3 className="font-bold text-xs text-slate-800 mb-2">📁 Attached Technical Documentation &amp; Media</h3>
                <div className="flex flex-wrap gap-3">
                  {viewItem.documents.split(",").filter(Boolean).map((url, idx) => (
                    <a key={idx} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-slate-100 shadow-sm">
                      <span>📄 File Attachment {idx + 1}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-end"><Btn onClick={() => setViewItem(null)}>Close</Btn></div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
