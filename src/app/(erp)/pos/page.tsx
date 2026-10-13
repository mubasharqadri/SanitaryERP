"use client";
import { useMemo, useRef, useState } from "react";
import { api, useApi, PageHead, Btn, inputCls, money, Badge, Modal, FbrStatusBadge, useToast } from "@/components/erp";

type Item = { id: number; code: string; barcode: string | null; name: string; category: string; salePrice: string; unit: string; stock: number };
type CartLine = { item: Item; qty: number };
type Party = { id: number; name: string; filerStatus: string; salesTaxRegistered: boolean };

const CAT_EMOJI: Record<string, string> = { "Sanitary Ware": "🚽", Tiles: "🧱", "Brass Fittings": "🔧", Accessories: "🧰", General: "📦" };

export default function PosPage() {
  const { data, reload } = useApi<{ items: Item[] }>("/api/items");
  const { data: partyData } = useApi<{ parties: Party[] }>("/api/parties?type=customer");
  const { data: taxData } = useApi<{ settings: { salesTaxRate: string; enableSalesTax: boolean; furtherTaxRate: string; enableFurtherTax: boolean } }>("/api/tax");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cat, setCat] = useState("");
  const [barcode, setBarcode] = useState("");
  const [payMode, setPayMode] = useState("cash");
  const [partyId, setPartyId] = useState("");
  const [taxOn, setTaxOn] = useState(true);
  const [receipt, setReceipt] = useState<{
    docId: number; docNo: string; lines: CartLine[]; subtotal: number; salesTax: number; furtherTax: number;
    total: number; mode: string; fbrStatus: string; fbrInvoiceNo: string | null; fbrUsin: string | null; fbrQr: string | null;
  } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const { msg, setMsg, toast } = useToast();
  const scanRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    let list = (data?.items ?? []).filter((i) => i.stock !== undefined);
    if (cat) list = list.filter((i) => i.category === cat);
    return list;
  }, [data, cat]);
  const cats = useMemo(() => [...new Set((data?.items ?? []).map((i) => i.category))], [data]);
  const party = (partyData?.parties ?? []).find((p) => String(p.id) === partyId) ?? null;

  const tax = taxData?.settings;
  const stRate = taxOn && tax?.enableSalesTax ? Number(tax?.salesTaxRate ?? 18) : 0;
  const subtotal = cart.reduce((a, l) => a + l.qty * Number(l.item.salePrice), 0);
  const salesTax = Math.round(((subtotal * stRate) / 100) * 100) / 100;
  // Further Tax on POS only for a named unregistered party (retail walk-ins excluded)
  const ftOn = taxOn && tax?.enableFurtherTax && !!party && !party.salesTaxRegistered && subtotal > 0;
  const ftRate = ftOn ? Number(tax?.furtherTaxRate ?? 4) : 0;
  const furtherTax = Math.round((((subtotal + salesTax) * ftRate) / 100) * 100) / 100;
  const total = Math.round((subtotal + salesTax + furtherTax) * 100) / 100;

  function addItem(it: Item, qty = 1) {
    if (it.stock <= 0) { setMsg(`!${it.code} is out of stock`); return; }
    setCart((c) => {
      const f = c.find((l) => l.item.id === it.id);
      if (f) return c.map((l) => l.item.id === it.id ? { ...l, qty: l.qty + qty } : l);
      return [...c, { item: it, qty }];
    });
  }

  function scan() {
    const code = barcode.trim().toLowerCase();
    if (!code) return;
    const it = (data?.items ?? []).find((i) => i.barcode?.toLowerCase() === code || i.code.toLowerCase() === code);
    if (it) { addItem(it); setBarcode(""); }
    else setMsg("!No item found for: " + barcode);
    scanRef.current?.focus();
  }

  async function checkout() {
    if (!cart.length) return setMsg("!Cart is empty");
    try {
      const res = await api<{ document: { id: number; docNo: string; subtotal: string; salesTax: string; furtherTax: string; grandTotal: string; fbrStatus: string; fbrInvoiceNo: string | null; fbrUsin: string | null; fbrQr: string | null }; fbr?: { ok: boolean; fbrInvoiceNo?: string; errors?: string[] } }>("/api/documents", {
        method: "POST",
        body: JSON.stringify({
          header: {
            docType: "POS", partyId: partyId || null, date: new Date().toISOString().slice(0, 10),
            paidAmount: payMode === "credit" ? 0 : total, paymentMode: payMode,
            taxExempt: !taxOn, chargeFurtherTax: !!partyId, aitSection: "none",
          },
          lines: cart.map((l) => ({ itemId: l.item.id, qty: l.qty, rate: Number(l.item.salePrice) })),
        }),
      });
      const d = res.document;
      setReceipt({
        docId: d.id, docNo: d.docNo, lines: [...cart],
        subtotal: Number(d.subtotal), salesTax: Number(d.salesTax), furtherTax: Number(d.furtherTax),
        total: Number(d.grandTotal), mode: payMode,
        fbrStatus: d.fbrStatus, fbrInvoiceNo: d.fbrInvoiceNo, fbrUsin: d.fbrUsin, fbrQr: d.fbrQr,
      });
      setCart([]); reload();
      if (res.fbr && !res.fbr.ok) setMsg("!FBR auto-sync failed: " + (res.fbr.errors ?? []).join("; "));
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "Checkout failed")); }
  }

  async function syncReceipt() {
    if (!receipt) return;
    setSyncing(true);
    try {
      const res = await api<{ ok: boolean; fbrInvoiceNo: string }>(`/api/fbr`, { method: "POST", body: JSON.stringify({ action: "sync", documentId: receipt.docId }) });
      const fresh = await api<{ document: { fbrStatus: string; fbrInvoiceNo: string | null; fbrUsin: string | null; fbrQr: string | null } }>(`/api/documents?id=${receipt.docId}`);
      setReceipt({ ...receipt, fbrStatus: fresh.document.fbrStatus, fbrInvoiceNo: fresh.document.fbrInvoiceNo, fbrUsin: fresh.document.fbrUsin, fbrQr: fresh.document.fbrQr });
      setMsg(`📡 Synced → ${res.fbrInvoiceNo} ✓`);
    } catch (e) { setMsg("!" + (e instanceof Error ? e.message : "FBR sync failed")); }
    finally { setSyncing(false); }
  }

  return (
    <div>
      <PageHead title="🛒 POS Fast Billing" sub="Scan barcode + Enter, or tap product tiles · Sales Tax + FBR e-invoicing applied" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex gap-2">
            <input ref={scanRef} value={barcode} onChange={(e) => setBarcode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && scan()}
              placeholder="🔍 barcode / code + Enter" className={`${inputCls} max-w-sm border-2`} autoFocus />
            <Btn onClick={scan}>Add</Btn>
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            <button onClick={() => setCat("")} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${!cat ? "bg-indigo-600 text-white" : "bg-white border"}`}>All</button>
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(cat === c ? "" : c)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${cat === c ? "bg-indigo-600 text-white" : "bg-white border"}`}>{CAT_EMOJI[c] ?? "📦"} {c}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((it) => (
              <button key={it.id} onClick={() => addItem(it)} disabled={it.stock <= 0}
                className="rounded-xl border bg-white p-3 text-left shadow-sm transition hover:shadow-md disabled:opacity-50">
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{CAT_EMOJI[it.category] ?? "📦"}</span>
                  <Badge tone={it.stock <= 0 ? "red" : it.stock <= 5 ? "amber" : "green"}>{it.stock <= 0 ? "Out" : it.stock}</Badge>
                </div>
                <div className="mt-1 truncate text-sm font-bold">{it.name}</div>
                <div className="font-mono text-[11px] text-slate-400">{it.code}</div>
                <div className="mt-1 font-bold text-indigo-700">Rs {money(it.salePrice)}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="font-bold">🧾 Current Bill</h3>
          <select value={partyId} onChange={(e) => setPartyId(e.target.value)} className={`${inputCls} mt-2`}>
            <option value="">Walk-in Customer</option>
            {(partyData?.parties ?? []).map((p) => <option key={p.id} value={p.id}>{p.name}{p.salesTaxRegistered ? "" : " (unreg.)"}</option>)}
          </select>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={taxOn} onChange={(e) => setTaxOn(e.target.checked)} />
            Sales Tax {stRate}% {ftOn && <span className="text-xs text-amber-700">+ Further {ftRate}% (unregistered party)</span>}
          </label>
          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
            {cart.map((l) => (
              <div key={l.item.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-sm">
                <div className="min-w-0"><div className="truncate font-medium">{l.item.name}</div>
                <div className="text-xs text-slate-500">Rs {money(l.item.salePrice)} × {l.qty}</div></div>
                <div className="flex items-center gap-1">
                  <button className="rounded bg-white border px-1.5" onClick={() => setCart(cart.map((x) => x.item.id === l.item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>−</button>
                  <span className="w-6 text-center font-bold">{l.qty}</span>
                  <button className="rounded bg-white border px-1.5" onClick={() => setCart(cart.map((x) => x.item.id === l.item.id ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                  <button className="ml-1 text-rose-500" onClick={() => setCart(cart.filter((x) => x.item.id !== l.item.id))}>✕</button>
                </div>
              </div>
            ))}
            {cart.length === 0 && <div className="py-8 text-center text-sm text-slate-400">Cart empty — scan or tap items</div>}
          </div>
          <div className="mt-3 border-t pt-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>Rs {money(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Sales Tax ({stRate}%)</span><span>Rs {money(salesTax)}</span></div>
            {furtherTax > 0 && <div className="flex justify-between"><span className="text-slate-500">Further Tax ({ftRate}%)</span><span>Rs {money(furtherTax)}</span></div>}
            <div className="mt-1 flex justify-between text-lg font-extrabold"><span>Total</span><span className="text-indigo-700">Rs {money(total)}</span></div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {["cash", "bank", "card", "online", "cheque", "credit"].map((m) => (
                <button key={m} onClick={() => setPayMode(m)} className={`rounded-lg px-2 py-1.5 text-xs font-bold capitalize ${payMode === m ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>{m}</button>
              ))}
            </div>
            <Btn tone="success" onClick={checkout} disabled={!cart.length}>
              <span className="block w-full py-1 text-base">✅ Charge Rs {money(total)}</span>
            </Btn>
            <button onClick={() => setCart([])} className="mt-2 w-full rounded-lg border py-2 text-sm text-slate-600">Clear</button>
          </div>
        </div>
      </div>
      {receipt && (
        <Modal title="🧾 Receipt" onClose={() => setReceipt(null)}>
          <div className="mb-2 flex items-center gap-2"><FbrStatusBadge status={receipt.fbrStatus} />
            {receipt.fbrStatus !== "synced" && <Btn small tone="success" onClick={syncReceipt} disabled={syncing}>{syncing ? "Syncing…" : "📡 Sync to FBR"}</Btn>}
          </div>
          <div className="print-area mx-auto thermal-receipt rounded border bg-white p-4 text-[13px]">
            <div className="text-center font-bold">AL-NOOR SANITARY &amp; TILES</div>
            <div className="text-center text-xs">G.T. Road, Gujranwala · 055-1234567</div>
            <div className="text-center text-xs">NTN: 1234567-8 · STRN: 3277876123456</div>
            <div className="my-2 border-t border-dashed" />
            <div>Bill: <b>{receipt.docNo}</b></div>
            <div>Date: {new Date().toLocaleString()} · {receipt.mode}</div>
            <div className="my-2 border-t border-dashed" />
            {receipt.lines.map((l) => (
              <div key={l.item.id} className="flex justify-between"><span>{l.item.name} ×{l.qty}</span><span>{money(l.qty * Number(l.item.salePrice))}</span></div>
            ))}
            <div className="my-2 border-t border-dashed" />
            <div className="flex justify-between"><span>Subtotal</span><span>{money(receipt.subtotal)}</span></div>
            <div className="flex justify-between"><span>Sales Tax</span><span>{money(receipt.salesTax)}</span></div>
            {receipt.furtherTax > 0 && <div className="flex justify-between"><span>Further Tax</span><span>{money(receipt.furtherTax)}</span></div>}
            <div className="flex justify-between text-base font-bold"><span>TOTAL</span><span>Rs {money(receipt.total)}</span></div>
            {receipt.fbrInvoiceNo && (
              <>
                <div className="my-2 border-t border-dashed" />
                <div className="text-center font-bold">✓ FBR REPORTED</div>
                <div className="break-all text-center text-[11px]">IRN: {receipt.fbrInvoiceNo}</div>
                <div className="break-all text-center text-[11px]">USIN: {receipt.fbrUsin}</div>
                {receipt.fbrQr && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={receipt.fbrQr} alt="FBR QR" className="mx-auto mt-1 h-28 w-28" />
                )}
              </>
            )}
            <div className="mt-2 text-center text-xs">Thank you! Visit again 🙏</div>
          </div>
          <div className="no-print mt-3 flex justify-end gap-2">
            <Btn tone="ghost" onClick={() => window.print()}>🖨️ Print</Btn>
            <Btn onClick={() => setReceipt(null)}>New Bill</Btn>
          </div>
        </Modal>
      )}
      {toast}
    </div>
  );
}
