"use client";
import { useState } from "react";
import { api, useApi, PageHead, Btn, Field, inputCls, SearchInput, Table, Badge, Modal, money, useToast, LetterheadPrintWrapper, MultiFileUploader, SearchSelect, AnalyticalField, type SearchOption } from "@/components/erp";

type V = { id: number; voucherType: string; voucherNo: string; date: string; narration: string | null; totalDebit: string; totalCredit: string; partyId: number | null; documentId: number | null; status: string; documents: string | null };
type VL = { accountId: number; debit: number; credit: number; narration: string; partyId: number | null; analyticalDistribution: string; chequeNo: string; chequeDate: string };

const TYPES = ["JV", "BRV", "BPV", "CRV", "CPV", "ADJ"];
const TYPE_LABEL: Record<string, string> = { JV: "📓 Journal", BRV: "🏦 Bank Receipt", BPV: "🏦 Bank Payment", CRV: "💵 Cash Receipt", CPV: "💸 Cash Payment", ADJ: "🔧 Adjustment" };

export default function VouchersPage() {
  const { data, loading, reload } = useApi<{ vouchers: V[] }>("/api/vouchers");
  const { data: accData } = useApi<{ accounts: Array<{ id: number; code: string; name: string }> }>("/api/accounts");
  const { data: partyData } = useApi<{ parties: Array<{ id: number; name: string; type: string }> }>("/api/parties");
  const [filter, setFilter] = useState("");
  const [q, setQ] = useState("");
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [h, setH] = useState({ voucherType: "JV", date: new Date().toISOString().slice(0, 10), narration: "", partyId: "", documents: "" });
  const [lines, setLines] = useState<VL[]>([
    { accountId: 0, debit: 0, credit: 0, narration: "", partyId: null, analyticalDistribution: "", chequeNo: "", chequeDate: "" },
    { accountId: 0, debit: 0, credit: 0, narration: "", partyId: null, analyticalDistribution: "", chequeNo: "", chequeDate: "" }
  ]);
  const [view, setView] = useState<{ voucher: V; lines: Array<{ accountId: number | null; debit: string; credit: string; narration: string | null; partyId: number | null; analyticalDistribution: string | null }> } | null>(null);
  const [printLayout, setPrintLayout] = useState<"A4" | "A5" | "Thermal">("A4");
  const [printListMode, setPrintListMode] = useState(false);
  const { msg, setMsg, toast } = useToast();

  const list = (data?.vouchers ?? []).filter((v) => (!filter || v.voucherType === filter) && (!q || (v.voucherNo + (v.narration ?? "")).toLowerCase().includes(q.toLowerCase())));
  const accName = (id: number | null) => { const a = (accData?.accounts ?? []).find((x) => x.id === id); return a ? `${a.code} — ${a.name}` : "#" + id; };
  const partyName = (id: number | null) => { const p = (partyData?.parties ?? []).find((x) => x.id === id); return p ? `${p.name}` : "—"; };
  const td = lines.reduce((a, l) => a + l.debit, 0);
  const tc = lines.reduce((a, l) => a + l.credit, 0);

  function resetForm() {
    setEditId(null);
    setH({ voucherType: "JV", date: new Date().toISOString().slice(0, 10), narration: "", partyId: "", documents: "" });
    setLines([
      { accountId: 0, debit: 0, credit: 0, narration: "", partyId: null, analyticalDistribution: "", chequeNo: "", chequeDate: "" },
      { accountId: 0, debit: 0, credit: 0, narration: "", partyId: null, analyticalDistribution: "", chequeNo: "", chequeDate: "" }
    ]);
    setShow(true);
  }

  async function triggerEdit(v: V) {
    if (v.documentId) {
       return setMsg("!Auto-posted invoice vouchers must be modified through their source Invoices, not directly.");
    }
    try {
      const res = await api<{ voucher: V; lines: Array<{ accountId: number; debit: string; credit: string; narration: string | null; partyId: number | null; analyticalDistribution: string | null; chequeNo: string | null; chequeDate: string | null }> }>(`/api/vouchers?id=${v.id}`);
      setEditId(v.id);
      setH({
        voucherType: res.voucher.voucherType,
        date: String(res.voucher.date).slice(0, 10),
        narration: res.voucher.narration ?? "",
        partyId: res.voucher.partyId ? String(res.voucher.partyId) : "",
        documents: res.voucher.documents ?? "",
      });
      setLines(res.lines.map((l) => ({
        accountId: l.accountId,
        debit: Number(l.debit),
        credit: Number(l.credit),
        narration: l.narration ?? "",
        partyId: l.partyId,
        analyticalDistribution: l.analyticalDistribution ?? "",
        chequeNo: l.chequeNo ?? "",
        chequeDate: l.chequeDate ?? "",
      })));
      setShow(true);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Load failed")); }
  }

  async function cancelVoucher(id: number) {
    if (!confirm("Are you sure you want to Cancel this voucher? It will be marked Cancelled and completely excluded from accounting balances/reports.")) return;
    try {
      await api(`/api/vouchers?id=${id}`, { method: "PUT", body: JSON.stringify({ action: "cancel" }) });
      reload();
      setMsg("Voucher cancelled ✓");
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Failed to cancel")); }
  }

  async function save() {
    if (Math.abs(td - tc) > 0.01) return setMsg(`!Not balanced: Dr ${td} ≠ Cr ${tc}`);
    if (lines.some((l) => !l.accountId)) return setMsg("!Select account on every line");
    try {
      const isEdit = editId !== null;
      const endpoint = "/api/vouchers" + (isEdit ? `?id=${editId}` : "");
      const res = await api<{ voucher: V }>(endpoint, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify({ header: { ...h, partyId: h.partyId || null }, lines })
      });
      setShow(false); reload(); setMsg(`${isEdit ? "Updated" : "Saved"} ${res.voucher?.voucherNo ?? "Voucher"} ✓`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Save failed")); }
  }

  // Export voucher list to CSV
  function exportListCSV() {
    const head = ["Voucher No", "Type", "Date", "Narration", "Total Debit", "Total Credit", "Status"];
    const rows = list.map((v) => [v.voucherNo, v.voucherType, v.date, v.narration || "", v.totalDebit, v.totalCredit, v.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [head.join(","), ...rows.map((r) => r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))].join("\n");
    const encoded = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encoded);
    a.setAttribute("download", `vouchers_list_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Export single viewed voucher to CSV
  function exportSingleCSV() {
    if (!view) return;
    const head = ["Account", "Debit", "Credit", "Narration", "Party", "Analytical Distribution"];
    const rows = view.lines.map((l) => [accName(l.accountId), l.debit, l.credit, l.narration || "", partyName(l.partyId), l.analyticalDistribution || ""]);
    const csvContent = "data:text/csv;charset=utf-8," + [
      [`Voucher No: ${view.voucher.voucherNo}`, `Type: ${view.voucher.voucherType}`, `Date: ${view.voucher.date}`, `Narration: ${view.voucher.narration || ""}`, `Status: ${view.voucher.status}`].join(","),
      [],
      head.join(","),
      ...rows.map((r) => r.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    const encoded = encodeURI(csvContent);
    const a = document.createElement("a");
    a.setAttribute("href", encoded);
    a.setAttribute("download", `voucher_${view.voucher.voucherNo}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handlePrintList() {
    setPrintListMode(true);
    setTimeout(() => {
      window.print();
      setPrintListMode(false);
    }, 300);
  }

  // Searchable option lists (chart of accounts & parties grow large)
  const accOptions: SearchOption[] = (accData?.accounts ?? []).map((a) => ({
    value: a.id,
    label: `${a.code} — ${a.name}`,
    keywords: `${a.code} ${a.name}`,
  }));
  const partyOptions: SearchOption[] = (partyData?.parties ?? []).map((p) => ({
    value: p.id,
    label: `[${p.type.toUpperCase()}] ${p.name}`,
    keywords: `${p.name} ${p.type}`,
  }));

  return (
    <div>
      <PageHead title="📒 Vouchers" sub="JV · BRV · BPV · CRV · CPV · ADJ — Party and cost distribution set at line item level"
        actions={<><SearchInput value={q} onChange={setQ} placeholder="Search vouchers…" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={inputCls} style={{ width: "auto" }}>
          <option value="">All types</option>{[...TYPES, "SINV", "PINV", "POS"].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <Btn tone="ghost" onClick={exportListCSV}>⬇️ Export List CSV</Btn>
        <Btn tone="ghost" onClick={handlePrintList}>🖨️ Print List (A4)</Btn>
        <Btn onClick={resetForm}>+ New Voucher</Btn></>} />

      {loading ? <div className="text-slate-500">Loading…</div> : (
        <Table head={["Voucher No", "Type", "Date", "Narration", "Debit", "Credit", "Status", "Actions"]}>
          {list.map((v) => (
            <tr key={v.id} className={v.status === "Cancelled" ? "opacity-60 line-through" : ""}>
              <td className="px-3 py-2 font-mono text-xs font-bold">{v.voucherNo}</td>
              <td className="px-3 py-2"><Badge tone="slate">{TYPE_LABEL[v.voucherType] ?? v.voucherType}</Badge></td>
              <td className="px-3 py-2">{String(v.date).slice(0, 10)}</td>
              <td className="px-3 py-2 text-xs">{v.narration ?? "—"}</td>
              <td className="px-3 py-2 text-right">{money(v.totalDebit)}</td>
              <td className="px-3 py-2 text-right">{money(v.totalCredit)}</td>
              <td className="px-3 py-2"><Badge tone={v.status === "Cancelled" ? "red" : "green"}>{v.status}</Badge></td>
              <td className="px-3 py-2 text-right whitespace-nowrap space-x-1.5">
                <button className="text-xs font-semibold text-indigo-600 hover:underline" onClick={async () => setView(await api(`/api/vouchers?id=${v.id}`))}>View</button>
                {!v.documentId && v.status !== "Cancelled" && (
                  <button className="text-xs font-semibold text-slate-600 hover:underline" onClick={() => triggerEdit(v)}>Edit</button>
                )}
                {v.status !== "Cancelled" && (
                  <button className="text-xs font-semibold text-amber-600 hover:underline" onClick={() => cancelVoucher(v.id)}>Cancel</button>
                )}
                <button className="text-xs font-semibold text-rose-600 hover:underline" onClick={async () => { if (confirm(`Delete ${v.voucherNo}?`)) { await api(`/api/vouchers?id=${v.id}`, { method: "DELETE" }); reload(); } }}>Delete</button>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {show && (
        <Modal title={editId ? `Edit Voucher (${editId})` : "New Voucher"} onClose={() => setShow(false)} full>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Field label="Type"><select className={inputCls} disabled={editId !== null} value={h.voucherType} onChange={(e) => setH({ ...h, voucherType: e.target.value })}>
                {TYPES.map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
              </select></Field>
              <Field label="Date"><input type="date" className={inputCls} value={h.date} onChange={(e) => setH({ ...h, date: e.target.value })} /></Field>
              <Field label="Global Narration"><input className={inputCls} value={h.narration} onChange={(e) => setH({ ...h, narration: e.target.value })} placeholder="Being…" /></Field>
            </div>
            <div className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] text-slate-600">
              🔢 Voucher numbers restart at <b>0001 on the 1st of every month</b> (e.g. <b>{h.voucherType}-2026-11-0001</b>). Changing the date above moves the voucher into that month&apos;s sequence.
            </div>

            <MultiFileUploader label="Attached Voucher Documents — bank slip, deposit slip, supporting bills" value={h.documents} onChange={(urls) => setH({ ...h, documents: urls })} />

            <div className="border-t pt-3">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-slate-700">
                <span>Account Postings &amp; Analytical Distribution</span>
                <span className="text-[11px] font-normal text-slate-400">One row per posting · {lines.length} line(s)</span>
              </div>
              <div className="space-y-1.5">
                {lines.map((l, i) => (
                  <div key={i} className="rounded-lg border bg-slate-50/70 p-2">
                    <div className="grid gap-1.5 lg:grid-cols-[minmax(0,2.4fr)_86px_86px_minmax(0,1.5fr)_minmax(0,1.4fr)_100px_82px_28px] items-center">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Account *</label>
                        <SearchSelect
                          value={l.accountId}
                          onChange={(v) => setLines(lines.map((x, xi) => xi === i ? { ...x, accountId: Number(v) } : x))}
                          options={accOptions}
                          placeholder="🔍 Search account…"
                          searchPlaceholder="Type code / name…"
                          emptyText="No account matches"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Debit</label>
                        <input type="number" className={`${inputCls} text-right`} placeholder="Debit" value={l.debit} onChange={(e) => setLines(lines.map((x, xi) => xi === i ? { ...x, debit: Number(e.target.value) } : x))} />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Credit</label>
                        <input type="number" className={`${inputCls} text-right`} placeholder="Credit" value={l.credit} onChange={(e) => setLines(lines.map((x, xi) => xi === i ? { ...x, credit: Number(e.target.value) } : x))} />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Party (optional)</label>
                        <SearchSelect
                          value={l.partyId || ""}
                          onChange={(v) => setLines(lines.map((x, xi) => xi === i ? { ...x, partyId: v ? Number(v) : null } : x))}
                          options={partyOptions}
                          placeholder="— None —"
                          searchPlaceholder="Type name…"
                          emptyText="No party matches"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Narration</label>
                        <input className={inputCls} placeholder="Narration" value={l.narration} onChange={(e) => setLines(lines.map((x, xi) => xi === i ? { ...x, narration: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Chq No</label>
                        <input className={inputCls} placeholder="Chq #" value={l.chequeNo} onChange={(e) => setLines(lines.map((x, xi) => xi === i ? { ...x, chequeNo: e.target.value } : x))} />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Chq Date</label>
                        <input type="date" className={inputCls} value={l.chequeDate} onChange={(e) => setLines(lines.map((x, xi) => xi === i ? { ...x, chequeDate: e.target.value } : x))} />
                      </div>
                      <div className="flex justify-end pt-2">
                        <button title="Remove line" className="text-rose-500 hover:text-rose-700 font-bold" onClick={() => setLines(lines.filter((_, xi) => xi !== i))}>✕</button>
                      </div>
                    </div>
                    <div className="mt-1.5 lg:pl-0">
                      <label className="text-[10px] text-slate-500 block mb-0.5">Analytical Distribution</label>
                      <AnalyticalField value={l.analyticalDistribution} onChange={(v) => setLines(lines.map((x, xi) => xi === i ? { ...x, analyticalDistribution: v } : x))} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <Btn small tone="ghost" onClick={() => setLines([...lines, { accountId: 0, debit: 0, credit: 0, narration: "", partyId: null, analyticalDistribution: "", chequeNo: "", chequeDate: "" }])}>+ Add Entry Line</Btn>
            </div>
            <div className={`mt-3 rounded-xl p-3 text-right text-sm font-bold ${Math.abs(td - tc) < 0.01 && td > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              Dr Rs {money(td)} = Cr Rs {money(tc)} {Math.abs(td - tc) < 0.01 && td > 0 ? "✓ Balanced" : "✗ Must balance"}
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2"><Btn tone="ghost" onClick={() => setShow(false)}>Cancel</Btn><Btn tone="success" onClick={save}>💾 Post Voucher</Btn></div>
        </Modal>
      )}

      {view && (
        <Modal title={`${view.voucher.voucherNo}`} onClose={() => setView(null)} full>
          <div className="no-print mb-4 flex flex-wrap gap-2 justify-between border-b pb-3">
            <div className="flex gap-2 items-center">
              <span className="text-xs font-medium text-slate-500">Print Size:</span>
              {["A4", "A5", "Thermal"].map((size) => (
                <button key={size} onClick={() => setPrintLayout(size as "A4" | "A5" | "Thermal")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold ${printLayout === size ? "bg-slate-900 text-white" : "bg-slate-100"}`}>{size}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <Btn small tone="ghost" onClick={exportSingleCSV}>⬇️ Export Voucher CSV</Btn>
              <Btn small onClick={() => window.print()}>🖨️ Print Voucher ({printLayout})</Btn>
            </div>
          </div>

          <div className="print-area">
            <LetterheadPrintWrapper title={`${TYPE_LABEL[view.voucher.voucherType] ?? view.voucher.voucherType} VOUCHER`} layout={printLayout}>
              {printLayout === "A4" && (
                <div>
                  <div className="grid grid-cols-2 gap-y-1.5 text-[13px] border-b pb-4">
                    <div>Voucher No: <b className="font-mono text-slate-900 text-sm">{view.voucher.voucherNo}</b></div>
                    <div className="text-right">Date: <b>{String(view.voucher.date).slice(0, 10)}</b></div>
                    <div className="col-span-2">Description / Narration: <span className="italic text-slate-700">{view.voucher.narration || "—"}</span></div>
                    <div>Status: <Badge tone={view.voucher.status === "Cancelled" ? "red" : "green"}>{view.voucher.status}</Badge></div>
                  </div>

                  <table className="mt-4 w-full text-[13px]">
                    <thead>
                      <tr className="border-b-2 border-slate-900 bg-slate-50 text-left font-bold text-slate-800">
                        <th className="px-3 py-2">Account</th>
                        <th className="px-3 py-2">Narration</th>
                        <th className="px-3 py-2">Party Link</th>
                        <th className="px-3 py-2">Analytical Distribution</th>
                        <th className="px-3 py-2 text-right">Debit (Dr)</th>
                        <th className="px-3 py-2 text-right">Credit (Cr)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-b-2 border-slate-900">
                      {view.lines.map((l, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="px-3 py-2 font-medium">{accName(l.accountId)}</td>
                          <td className="px-3 py-2 text-xs text-slate-600 italic">{l.narration || "—"}</td>
                          <td className="px-3 py-2 text-xs">{partyName(l.partyId)}</td>
                          <td className="px-3 py-2 text-xs text-slate-500 italic font-mono">{l.analyticalDistribution || "—"}</td>
                          <td className="px-3 py-2 text-right font-semibold">{Number(l.debit) > 0 ? money(l.debit) : "—"}</td>
                          <td className="px-3 py-2 text-right font-semibold">{Number(l.credit) > 0 ? money(l.credit) : "—"}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-50 font-bold">
                        <td className="px-3 py-2.5 uppercase" colSpan={4}>Voucher Total</td>
                        <td className="px-3 py-2.5 text-right border-t border-slate-800">Rs {money(view.voucher.totalDebit)}</td>
                        <td className="px-3 py-2.5 text-right border-t border-slate-800">Rs {money(view.voucher.totalCredit)}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Attachment Copy links rendering in view modal */}
                  {view.voucher.documents && (
                    <div className="mt-4 rounded-xl border p-4 bg-slate-50">
                      <h3 className="font-bold text-xs text-slate-800 mb-2">📁 Attached Supporting Scans &amp; Bills</h3>
                      <div className="flex flex-wrap gap-3">
                        {view.voucher.documents.split(",").filter(Boolean).map((url, idx) => (
                          <a key={idx} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-slate-100 shadow-sm">
                            <span>📄 Supporting File {idx + 1}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-16 flex justify-between text-xs text-slate-500">
                    <span>Prepared by: _________________</span>
                    <span>Checked by: _________________</span>
                    <span>Approved by: _________________</span>
                  </div>
                </div>
              )}

              {printLayout === "A5" && (
                <div>
                  <div className="grid grid-cols-2 gap-1 text-[11px] pb-2 border-b">
                    <div>No: <b>{view.voucher.voucherNo}</b></div>
                    <div className="text-right">Date: <b>{String(view.voucher.date).slice(0, 10)}</b></div>
                    <div className="col-span-2">Narration: <span className="italic">{view.voucher.narration || "—"}</span></div>
                    <div>Status: <b className="text-emerald-700">{view.voucher.status}</b></div>
                  </div>

                  <table className="mt-2 w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-900 bg-slate-100 text-left font-bold">
                        <th className="px-2 py-1">Account &amp; Distribution</th>
                        <th className="px-2 py-1">Party</th>
                        <th className="px-2 py-1 text-right">Dr</th>
                        <th className="px-2 py-1 text-right">Cr</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-b border-slate-900">
                      {view.lines.map((l, i) => (
                        <tr key={i}>
                          <td className="px-2 py-1">
                            <b>{accName(l.accountId)}</b>
                            {l.analyticalDistribution && <div className="text-[9px] text-slate-500 font-mono italic">Cost: {l.analyticalDistribution}</div>}
                            {l.narration && <div className="text-[9px] text-slate-400 italic">{l.narration}</div>}
                          </td>
                          <td className="px-2 py-1">{partyName(l.partyId)}</td>
                          <td className="px-2 py-1 text-right">{Number(l.debit) > 0 ? money(l.debit) : "—"}</td>
                          <td className="px-2 py-1 text-right">{Number(l.credit) > 0 ? money(l.credit) : "—"}</td>
                        </tr>
                      ))}
                      <tr className="font-bold bg-slate-50">
                        <td className="px-2 py-1 uppercase" colSpan={2}>Total</td>
                        <td className="px-2 py-1 text-right">Rs {money(view.voucher.totalDebit)}</td>
                        <td className="px-2 py-1 text-right">Rs {money(view.voucher.totalCredit)}</td>
                      </tr>
                    </tbody>
                  </table>
                  {view.voucher.documents && (
                    <div className="mt-3 text-[10px] text-slate-500 italic">This voucher carries {view.voucher.documents.split(",").filter(Boolean).length} electronic attachment(s).</div>
                  )}
                </div>
              )}

              {printLayout === "Thermal" && (
                <div>
                  <div>No: <b>{view.voucher.voucherNo}</b></div>
                  <div>Date: {String(view.voucher.date).slice(0, 10)}</div>
                  {view.voucher.narration && <div>Desc: {view.voucher.narration}</div>}
                  <div className="my-2 border-t border-dashed" />
                  <div className="space-y-2">
                    {view.lines.map((l, i) => (
                      <div key={i} className="border-b border-slate-100 pb-1">
                        <div className="font-bold">{accName(l.accountId)}</div>
                        {l.partyId && <div className="text-[9px]">Party: {partyName(l.partyId)}</div>}
                        {l.analyticalDistribution && <div className="text-[9px] text-slate-500 italic">Cost Center: {l.analyticalDistribution}</div>}
                        {l.narration && <div className="text-[9px] text-slate-400">Note: {l.narration}</div>}
                        <div className="flex justify-between font-bold mt-0.5">
                          <span>{Number(l.debit) > 0 ? "DR" : "CR"}</span>
                          <span>Rs {Number(l.debit) > 0 ? money(l.debit) : money(l.credit)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="my-2 border-t border-dashed" />
                  <div className="flex justify-between font-extrabold text-xs">
                    <span>TOTAL DEBIT</span>
                    <span>Rs {money(view.voucher.totalDebit)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-xs">
                    <span>TOTAL CREDIT</span>
                    <span>Rs {money(view.voucher.totalCredit)}</span>
                  </div>
                </div>
              )}
            </LetterheadPrintWrapper>
          </div>

          <div className="no-print mt-4 flex justify-end gap-2">
            <Btn onClick={() => setView(null)}>Close Print Viewer</Btn>
          </div>
        </Modal>
      )}

      {/* Hidden layout formatted specifically for Printing the entire list on A4 formatted inside Letterhead */}
      {printListMode && (
        <div className="print-area">
          <LetterheadPrintWrapper title="General Ledger — Vouchers Register" layout="A4">
            <table className="w-full text-xs mt-3 border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-50 text-left font-bold text-slate-800">
                  <th className="px-2 py-1.5">Voucher No</th>
                  <th className="px-2 py-1.5">Type</th>
                  <th className="px-2 py-1.5">Date</th>
                  <th className="px-2 py-1.5">Narration</th>
                  <th className="px-2 py-1.5 text-right">Debit</th>
                  <th className="px-2 py-1.5 text-right">Credit</th>
                  <th className="px-2 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {list.map((v) => (
                  <tr key={v.id} className={v.status === "Cancelled" ? "opacity-60 line-through" : ""}>
                    <td className="px-2 py-1.5 font-mono font-bold">{v.voucherNo}</td>
                    <td className="px-2 py-1.5">{v.voucherType}</td>
                    <td className="px-2 py-1.5">{String(v.date).slice(0, 10)}</td>
                    <td className="px-2 py-1.5">{v.narration || "—"}</td>
                    <td className="px-2 py-1.5 text-right font-bold">{money(v.totalDebit)}</td>
                    <td className="px-2 py-1.5 text-right font-bold">{money(v.totalCredit)}</td>
                    <td className="px-2 py-1.5">{v.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </LetterheadPrintWrapper>
        </div>
      )}

      {toast}
    </div>
  );
}
