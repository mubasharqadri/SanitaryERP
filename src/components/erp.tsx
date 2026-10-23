"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export async function api<T = unknown>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json", ...(opts?.headers ?? {}) } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  return data as T;
}

export function useApi<T>(url: string | null, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reload = async () => {
    if (!url) return;
    setLoading(true);
    try { setData(await api<T>(url)); setError(""); } catch (e) { setError(e instanceof Error ? e.message : "Load failed"); }
    finally { setLoading(false); }
  };
  useEffect(() => { reload(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { data, loading, error, reload, setData };
}

export function money(v: unknown): string {
  const n = Number(v);
  if (!Number.isFinite(n)) return "0.00";
  return n.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function PageHead({ title, sub, actions }: { title: string; sub?: string; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      <div className="flex flex-wrap gap-2">{actions}</div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

export function Stat({ label, value, icon, tone = "slate" }: { label: string; value: string; icon: string; tone?: string }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700", emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700", rose: "bg-rose-100 text-rose-700",
    indigo: "bg-indigo-100 text-indigo-700", sky: "bg-sky-100 text-sky-700",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-lg text-xl ${tones[tone] ?? tones.slate}`}>{icon}</div>
        <div><div className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</div>
        <div className="text-xl font-bold text-slate-900">{value}</div></div>
      </div>
    </div>
  );
}

export function Btn({ children, onClick, tone = "primary", type = "button", disabled, small }: { children: ReactNode; onClick?: () => void; tone?: "primary" | "ghost" | "danger" | "success" | "amber"; type?: "button" | "submit"; disabled?: boolean; small?: boolean }) {
  const tones: Record<string, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    amber: "bg-amber-500 text-white hover:bg-amber-600",
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      className={`rounded-lg font-medium transition disabled:opacity-50 ${small ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${tones[tone]}`}>
      {children}
    </button>
  );
}

export function Field({ label, children, span }: { label: string; children: ReactNode; span?: boolean }) {
  return (
    <label className={`block ${span ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? "Search…"}
      className={`${inputCls} max-w-xs`} />
  );
}

export type SearchOption = { value: string | number; label: string; keywords?: string };

/**
 * Searchable combobox built for very large datasets (3000+ items).
 * Type-to-filter with keyword matching, capped rendering, keyboard Escape to close,
 * and click-outside dismissal. Replaces native <select> wherever lists are long.
 */
export function SearchSelect({
  value,
  onChange,
  options,
  placeholder = "— Select —",
  searchPlaceholder = "Type to search…",
  disabled = false,
  emptyText = "No matches found",
}: {
  value: string | number;
  onChange: (v: string) => void;
  options: SearchOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  emptyText?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => String(o.value) === String(value));

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => `${o.label} ${o.keywords ?? ""}`.toLowerCase().includes(q))
    : options;
  const visible = filtered.slice(0, 500);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls} flex items-center justify-between gap-2 text-left ${disabled ? "opacity-60" : "cursor-pointer"}`}>
        <span className={`truncate ${selected ? "text-slate-900" : "text-slate-400"}`}>
          {selected?.label ?? placeholder}
        </span>
        <span className="shrink-0 text-[10px] text-slate-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 z-[70] mt-1 rounded-xl border border-slate-300 bg-white p-2 shadow-2xl">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <div className="max-h-56 overflow-y-auto">
            {visible.length === 0 && <div className="px-2 py-3 text-center text-xs text-slate-400">{emptyText}</div>}
            {visible.map((o) => (
              <button
                key={String(o.value)}
                type="button"
                onClick={() => { onChange(String(o.value)); setOpen(false); }}
                className={`block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-sm ${
                  String(o.value) === String(value) ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"
                }`}>
                {o.label}
              </button>
            ))}
            {filtered.length > 500 && (
              <div className="px-2 py-2 text-center text-[11px] text-slate-400">
                Showing 500 of {filtered.length} — keep typing to narrow down
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            {head.map((h) => <th key={h} className="px-3 py-2.5 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
      {empty && <div className="px-4 py-8 text-center text-sm text-slate-400">{empty}</div>}
    </div>
  );
}

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "green" | "red" | "amber" | "blue" }) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-700", green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700", amber: "bg-amber-100 text-amber-800", blue: "bg-sky-100 text-sky-700",
  };
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

/** `full` stretches the dialog across the screen so wide documents keep all their columns visible. */
export function Modal({ title, onClose, children, wide, full }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean; full?: boolean }) {
  const width = full ? "max-w-[1800px] w-[97vw]" : wide ? "max-w-5xl" : "max-w-2xl";
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-2 sm:p-4" onClick={onClose}>
      <div className={`my-4 sm:my-8 w-full rounded-2xl bg-white shadow-2xl ${width}`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-white px-5 py-3">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100">×</button>
        </div>
        <div className={`${full ? "max-h-[calc(100vh-6rem)]" : "max-h-[75vh]"} overflow-y-auto p-4 sm:p-5`}>{children}</div>
      </div>
    </div>
  );
}

export function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); });
  if (!msg) return null;
  const isErr = msg.startsWith("!");
  return (
    <div className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-2xl ${isErr ? "bg-rose-600 text-white" : "bg-slate-900 text-white"}`}>
      {isErr ? msg.slice(1) : msg}
    </div>
  );
}

export type FbrPrintInfo = {
  fbrInvoiceNo: string;
  usin: string;
  qrDataUrl?: string | null;
  ntn?: string | null;
  strn?: string | null;
  syncedAt?: string | null;
};

export function FbrStatusBadge({ status }: { status: string }) {
  if (status === "synced") return <Badge tone="green">📡 FBR ✓ Synced</Badge>;
  if (status === "failed") return <Badge tone="red">📡 FBR ✗ Failed</Badge>;
  if (status === "queued") return <Badge tone="amber">📡 FBR Queued</Badge>;
  if (status === "not_required") return <Badge tone="slate">Not FBR-able</Badge>;
  return <Badge tone="amber">📡 Not synced</Badge>;
}

export function FbrStamp({ fbr }: { fbr: FbrPrintInfo }) {
  return (
    <div className="mt-4 flex items-center gap-4 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3">
      {fbr.qrDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fbr.qrDataUrl} alt="FBR QR" className="h-24 w-24 shrink-0 rounded bg-white" />
      ) : (
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded bg-white text-3xl">📡</div>
      )}
      <div className="text-[12px] leading-relaxed">
        <div className="text-sm font-extrabold text-emerald-800">✓ FBR DIGITAL INVOICE — VERIFIED</div>
        <div><span className="text-slate-500">FBR Invoice No (IRN): </span><b className="font-mono">{fbr.fbrInvoiceNo}</b></div>
        <div><span className="text-slate-500">USIN: </span><b className="font-mono">{fbr.usin}</b></div>
        {(fbr.ntn || fbr.strn) && <div><span className="text-slate-500">Seller NTN: </span><b>{fbr.ntn ?? "—"}</b><span className="text-slate-500"> · STRN: </span><b>{fbr.strn ?? "—"}</b></div>}
        {fbr.syncedAt && <div className="text-slate-500">Reported to FBR: {new Date(fbr.syncedAt).toLocaleString()}</div>}
        <div className="text-[11px] text-slate-500">Verify at FBR IRIS / Tax Asaan · SRO 709(I)/2025 · Rule 150Q</div>
      </div>
    </div>
  );
}

export type LetterheadInfo = {
  id: number;
  name: string;
  headerText: string | null;
  footerText: string | null;
  headerImage: string | null;
  footerImage: string | null;
  isDefault: boolean;
};

/** React hook that queries and holds the active Letterhead configuration from the database. */
export function useLetterhead() {
  const [letterhead, setLetterhead] = useState<LetterheadInfo | null>(null);

  useEffect(() => {
    fetch("/api/admin?entity=letterheads")
      .then((r) => r.json())
      .then((data) => {
        const rows = (data?.rows ?? []) as LetterheadInfo[];
        const def = rows.find((r) => r.isDefault) ?? rows[0] ?? null;
        setLetterhead(def);
      })
      .catch(() => {});
  }, []);

  return letterhead;
}

export type PrintContext = {
  companyName: string; branchName: string | null; branchCode: string | null;
  isHeadOffice: boolean; allBranches: boolean;
  address: string | null; phone: string | null; email: string | null;
  ntn: string | null; strn: string | null; postedBy: string | null;
  letterhead: { name: string; headerText: string | null; footerText: string | null; headerImage: string | null; footerImage: string | null } | null;
};

const EMPTY_CTX: PrintContext = {
  companyName: "Awami ERP", branchName: null, branchCode: null, isHeadOffice: true, allBranches: false,
  address: null, phone: null, email: null, ntn: null, strn: null, postedBy: null, letterhead: null,
};

/** Branding for the logged-in company + branch — used by every print. */
export function usePrintContext(): PrintContext {
  const [ctx, setCtx] = useState<PrintContext>(EMPTY_CTX);
  useEffect(() => {
    fetch("/api/print-context").then((r) => (r.ok ? r.json() : Promise.reject())).then((d) => setCtx(d as PrintContext)).catch(() => {});
  }, []);
  return ctx;
}

/** Standard Fallback Header & Footer content modeled around Pakistan tax configurations */
const FALLBACK_HEADER = "AL-NOOR SANITARY & TILES\nMain G.T. Road, Gujranwala | 055-1234567 | info@alnoorsanitory.pk\nNTN: 1234567-8 | STRN: 3277876123456";
const FALLBACK_FOOTER = "Thank you for your business! | Goods once sold will not be returned without receipt within 7 days.";

/**
 * Universal component that wraps any invoice or reports printout (Trial Balance, P&L, Balance Sheet, Voucher)
 * using the dynamic database Letterhead headerText & footerText. Supports standard print form factor classes.
 */
export function LetterheadPrintWrapper({
  children,
  title,
  layout = "A4",
  showFooter = false,
}: {
  children: ReactNode;
  title: string;
  layout?: "A4" | "A5" | "Thermal";
  /** Only commercial customer-facing docs (Sales Invoice / Sales Order) print the thank-you footer. */
  showFooter?: boolean;
}) {
  const ctx = usePrintContext();
  const lh = useLetterhead();
  const footerText = lh?.footerText ?? ctx.letterhead?.footerText ?? "";
  const FooterImage = lh?.footerImage ?? ctx.letterhead?.footerImage ?? null;
  const company = ctx.companyName || "Awami ERP";
  const branchLine = ctx.branchName
    ? ctx.isHeadOffice ? `${ctx.branchName} (Head Office)` : `${ctx.branchCode ? ctx.branchCode + " · " : ""}${ctx.branchName}`
    : ctx.allBranches ? "All Branches · Head Office" : null;
  const addrLine = [ctx.address, ctx.phone].filter(Boolean).join("  |  ");
  const taxLine = [ctx.ntn ? `NTN: ${ctx.ntn}` : null, ctx.strn ? `STRN: ${ctx.strn}` : null].filter(Boolean).join("  |  ");

  if (layout === "Thermal") {
    return (
      <div className="mx-auto max-w-[300px] border border-dashed p-4 bg-white text-slate-900 font-mono text-[10px] leading-tight">
        <div className="text-center font-bold text-xs uppercase">{company}</div>
        {branchLine && <div className="text-center text-[9px] text-slate-600">{branchLine}</div>}
        {addrLine && <div className="text-center text-[9px] text-slate-500">{addrLine}</div>}
        {taxLine && <div className="text-center text-[9px] text-slate-500">{taxLine}</div>}
        <div className="my-2 border-t border-dashed" />
        <div className="text-center font-bold uppercase tracking-wider text-xs mb-2">{title}</div>
        {children}
        <div className="my-2 border-t border-dashed" />
        {showFooter && footerText && <div className="text-center text-[9px] text-slate-500">{footerText}</div>}
        {showFooter && FooterImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={FooterImage} alt="" className="mx-auto mt-1 max-h-[40px] w-auto" />
        )}
      </div>
    );
  }

  const wrapperCls = layout === "A5"
    ? "mx-auto max-w-[640px] border p-6 bg-white text-slate-900 font-sans shadow-sm text-xs"
    : "mx-auto max-w-[900px] border p-8 bg-white text-slate-900 font-sans shadow-sm text-sm";

  return (
    <div className={wrapperCls}>
      {(lh?.headerImage ?? ctx.letterhead?.headerImage) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={(lh?.headerImage ?? ctx.letterhead?.headerImage) as string} alt="letterhead" className="mb-3 w-full rounded-lg object-contain" />
      )}
      <div className="border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h1 className="text-2xl font-extrabold tracking-wide uppercase text-slate-900">{company}</h1>
        {branchLine && <div className="text-[11px] font-bold uppercase tracking-wide text-slate-700 mt-0.5">{branchLine}</div>}
        {addrLine && <div className="text-xs text-slate-600 mt-1">{addrLine}</div>}
        {taxLine && <div className="text-[11px] text-slate-600 mt-0.5">{taxLine}</div>}
      </div>
      <div className="mb-4 text-center font-extrabold text-lg tracking-widest uppercase bg-slate-100 border-y py-2">
        {title}
      </div>
      {children}
      {showFooter && (footerText || FooterImage) && (
        <div className="mt-10 pt-3 border-t text-center text-xs text-slate-500 italic">
          {footerText}
          {FooterImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FooterImage} alt="" className="mx-auto mt-3 max-h-[50px] w-auto object-contain" />
          )}
        </div>
      )}
    </div>
  );
}

export function PrintDoc({ title, head, lines, totals, fbr, company, showFooter = false, pictures }: {
  title: string;
  head: Array<[string, string]>;
  lines: Array<{ desc: string; qty: number; rate: number; amt: number }>;
  totals: Array<[string, string]>;
  fbr?: FbrPrintInfo | null;
  company?: { name?: string | null; ntn?: string | null; strn?: string | null } | null;
  showFooter?: boolean;
  pictures?: string[] | null;
}) {
  const lh = useLetterhead();
  const headerLines = (lh?.headerText ?? FALLBACK_HEADER).split("\n");
  const footerText = lh?.footerText ?? FALLBACK_FOOTER;

  return (
    <div className="print-area rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-900">
      <div className="text-center border-b pb-3 mb-3">
        <div className="text-xl font-extrabold tracking-wide uppercase">{headerLines[0] || company?.name || "AL-NOOR SANITARY & TILES"}</div>
        <div className="text-xs text-slate-500 mt-1 whitespace-pre-line font-medium leading-relaxed">
          {headerLines.slice(1).join("\n")}
        </div>
      </div>
      <div className="my-3 border-y py-2 text-center text-lg font-bold uppercase bg-slate-50">{title}</div>
      <div className="grid grid-cols-2 gap-1 text-[13px]">
        {head.map(([k, v]) => <div key={k}><span className="text-slate-500">{k}: </span><b>{v}</b></div>)}
      </div>
      <table className="mt-3 w-full text-[13px]">
        <thead><tr className="border-y border-slate-300 bg-slate-50"><th className="px-2 py-1.5 text-left">#</th><th className="px-2 py-1.5 text-left">Description</th><th className="px-2 py-1.5 text-right">Qty</th><th className="px-2 py-1.5 text-right">Rate</th><th className="px-2 py-1.5 text-right">Amount</th></tr></thead>
        <tbody>
          {lines.map((l, i) => (
            <tr key={i} className="border-b border-slate-100"><td className="px-2 py-1.5">{i + 1}</td><td className="px-2 py-1.5">{l.desc}</td><td className="px-2 py-1.5 text-right">{l.qty}</td><td className="px-2 py-1.5 text-right">{money(l.rate)}</td><td className="px-2 py-1.5 text-right">{money(l.amt)}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 space-y-0.5 text-right text-[13px]">
        {totals.map(([k, v]) => <div key={k}><span className="text-slate-500">{k}: </span><b>{v}</b></div>)}
      </div>
      {fbr && <FbrStamp fbr={fbr} />}
      {pictures && pictures.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">Product Images</div>
          <div className="flex flex-wrap gap-2">
            {pictures.map((p, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={p} alt={`img-${i + 1}`} className="h-24 w-24 rounded-lg border border-slate-200 object-cover" />
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-between text-xs text-slate-500">
        <span>Received by: ___________</span><span>Approved by: ___________</span>
      </div>
      {showFooter && <div className="mt-4 border-t pt-2 text-center text-[11px] text-slate-400 italic">{footerText}</div>}
    </div>
  );
}

const FILE_ICON = (name: string) => {
  const e = name.split(".").pop()?.toLowerCase() ?? "";
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(e)) return "🖼️";
  if (e === "pdf") return "📕";
  if (["doc", "docx"].includes(e)) return "📘";
  if (["xls", "xlsx", "csv"].includes(e)) return "📊";
  if (["zip", "rar", "7z"].includes(e)) return "🗜️";
  return "📄";
};

/**
 * Multi-file attachment uploader used by Vouchers, Sales/Purchase Invoices, Sales/Purchase Returns,
 * Sales/Purchase Orders, Quotations and Adjustment Invoices.
 * Selects many files at once, shows image thumbnails inline, and stores the list as a comma string.
 */
export function MultiFileUploader({
  value,
  onChange,
  label = "Attach Files",
  hint = "PDF, JPG, PNG, DOC, XLS, ZIP — select several at once",
}: {
  value: string | null | undefined;
  onChange: (v: string) => void;
  label?: string;
  hint?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const list = value ? value.split(",").filter(Boolean) : [];

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setProgress(`${i + 1}/${files.length}`);
        const fd = new FormData();
        fd.append("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        urls.push(data.url);
      }
      onChange([...list, ...urls].join(","));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress("");
      e.target.value = "";
    }
  }

  const isImg = (u: string) => /\.(jpe?g|png|gif|webp|bmp)$/i.test(u);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-600">
          {label}{list.length ? ` — ${list.length} file${list.length > 1 ? "s" : ""} attached` : ""}
        </span>
        <label className="cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">
          {uploading ? `Uploading ${progress}…` : "📎 Attach Files"}
          <input type="file" multiple className="hidden" onChange={handleFiles} disabled={uploading} />
        </label>
      </div>
      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 py-4 text-center text-xs text-slate-400">{hint}</div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {list.map((url, idx) => {
            const name = decodeURIComponent(url.split("/").pop() ?? "file").replace(/^\d+_/, "");
            return (
              <div key={idx} className="w-28 rounded-lg border border-slate-200 bg-white p-1.5 text-center shadow-sm">
                {isImg(url) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <a href={url} target="_blank" rel="noreferrer"><img src={url} alt={name} className="h-16 w-full rounded object-cover" /></a>
                ) : (
                  <a href={url} target="_blank" rel="noreferrer" className="grid h-16 w-full place-items-center rounded bg-slate-100 text-2xl">{FILE_ICON(name)}</a>
                )}
                <div className="mt-1 truncate text-[10px] text-slate-600" title={name}>{name}</div>
                <div className="mt-0.5 flex items-center justify-between">
                  <a href={url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-600 hover:underline">open</a>
                  <button type="button" onClick={() => onChange(list.filter((_, i) => i !== idx).join(","))} className="text-[11px] font-bold text-rose-500">✕</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export type AnalyticalSplit = { department: string; percentage: number };

export const DEPARTMENTS = [
  "Showroom", "Godown", "Project", "Wholesale", "Retail", "Installation",
  "Transport", "Head Office", "Marketing", "Other",
];

/**
 * Analytical cost distribution editor. Pick a department and a percentage per split;
 * the dialog blocks closing or saving while the total is not exactly 100%.
 */
export function AnalyticalDialog({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: AnalyticalSplit[];
  onClose: () => void;
  onSave: (splits: AnalyticalSplit[]) => void;
}) {
  const [rows, setRows] = useState<AnalyticalSplit[]>([{ department: "Showroom", percentage: 100 }]);

  useEffect(() => {
    if (open) setRows(initial.length ? initial.map((r) => ({ ...r })) : [{ department: "Showroom", percentage: 100 }]);
  }, [open, initial]);

  if (!open) return null;
  const total = rows.reduce((a, r) => a + (Number(r.percentage) || 0), 0);
  const balanced = Math.abs(total - 100) < 0.001;
  const valid = balanced && rows.length > 0 && rows.every((r) => r.department && Number(r.percentage) > 0);

  function setRow(i: number, patch: Partial<AnalyticalSplit>) {
    setRows((rs) => rs.map((r, x) => (x === i ? { ...r, ...patch } : r)));
  }

  function autoBalance() {
    if (!rows.length) return;
    setRows(rows.map((r, i) => ({ ...r, percentage: i === 0 ? Math.round((100 - (total - (Number(rows[0].percentage) || 0))) * 100) / 100 : Number(r.percentage) })));
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h3 className="font-bold text-slate-900">Analytical Cost Distribution</h3>
          <button onClick={onClose} className="px-2 text-xl text-slate-400 hover:bg-slate-100 rounded-lg">×</button>
        </div>
        <div className="p-5">
          <div className="mb-3 grid grid-cols-[1fr_100px_36px] gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            <span>Department / Cost Centre</span><span className="text-right">Percentage</span><span />
          </div>
          <div className="space-y-2">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_36px] items-center gap-2">
                <select className={inputCls} value={r.department} onChange={(e) => setRow(i, { department: e.target.value })}>
                  {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  {r.department && !DEPARTMENTS.includes(r.department) && <option value={r.department}>{r.department}</option>}
                </select>
                <input type="number" min={0} max={100} step="0.01" className={`${inputCls} text-right`} value={r.percentage}
                  onChange={(e) => setRow(i, { percentage: Number(e.target.value) })} />
                <button type="button" className="font-bold text-rose-500" onClick={() => setRows(rows.filter((_, x) => x !== i))}>✕</button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border p-3 text-sm">
            <span className="font-semibold text-slate-600">Total allocated</span>
            <span className={`text-lg font-extrabold ${balanced ? "text-emerald-700" : "text-rose-600"}`}>{total.toFixed(2)}%</span>
          </div>
          {!balanced && (
            <div className="mt-2 rounded-xl bg-amber-50 p-2.5 text-xs font-semibold text-amber-800">
              Total must equal exactly <b>100%</b>. It is currently {total.toFixed(2)}% — you cannot save until it balances.
              {total < 100 && <> <button type="button" onClick={autoBalance} className="underline">put the remainder on the first line</button></>}
            </div>
          )}

          <button type="button" onClick={() => setRows([...rows, { department: "Other", percentage: 0 }])}
            className="mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">+ Add department</button>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-3">
          <Btn tone="ghost" onClick={onClose}>Cancel</Btn>
          <Btn tone="success" disabled={!valid} onClick={() => onSave(rows)}>✓ Apply 100%</Btn>
        </div>
      </div>
    </div>
  );
}

/** Compact read/edit chip that opens the AnalyticalDialog. */
export function AnalyticalField({ value, onChange }: { value: string | null | undefined; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const splits: AnalyticalSplit[] = value
    ? value.split(",").map((p) => {
        const [department, pct] = p.split(":");
        return { department: (department ?? "").trim(), percentage: Number((pct ?? "").replace("%", "").trim()) || 0 };
      }).filter((r) => r.department)
    : [];

  const total = splits.reduce((a, r) => a + r.percentage, 0);
  const balanced = splits.length > 0 && Math.abs(total - 100) < 0.001;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className={`${inputCls} flex items-center justify-between text-left ${balanced ? "" : "border-amber-300 bg-amber-50"}`}>
        <span className={`truncate text-xs ${splits.length ? "text-slate-800" : "text-slate-400"}`}>
          {balanced ? splits.map((s) => `${s.department} ${s.percentage}%`).join(", ") : "Set distribution…"}
        </span>
        <span className={`ml-2 shrink-0 rounded px-1.5 text-[10px] font-bold ${balanced ? "bg-emerald-100 text-emerald-700" : "bg-amber-200 text-amber-800"}`}>
          {balanced ? "100%" : `${total || 0}%`}
        </span>
      </button>
      <AnalyticalDialog open={open} initial={splits} onClose={() => setOpen(false)}
        onSave={(rs) => { onChange(rs.map((r) => `${r.department}: ${r.percentage}%`).join(", ")); setOpen(false); }} />
    </>
  );
}

/** Multiple-image uploader — items need several photos (different angles) for the storefront. */
export function MultiImageUploader({
  value,
  onChange,
  label = "Pictures (multiple angles)",
}: {
  value: string | null | undefined;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const list = value ? value.split(",").filter(Boolean) : [];

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const fd = new FormData();
        fd.append("file", f);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        urls.push(data.url);
      }
      onChange([...list, ...urls].join(","));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...list];
    const t = idx + dir;
    if (t < 0 || t >= next.length) return;
    [next[idx], next[t]] = [next[t], next[idx]];
    onChange(next.join(","));
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-600">{label}{list.length ? ` — ${list.length} uploaded` : ""}</span>
        <label className="cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">
          {uploading ? "Uploading…" : "🖼️ Add Pictures"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} disabled={uploading} />
        </label>
      </div>
      {list.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 py-4 text-center text-xs text-slate-400">
          No pictures yet — the first image is used on the storefront
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {list.map((url, idx) => (
            <div key={idx} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`pic-${idx + 1}`} className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
              {idx === 0 && <span className="absolute left-1 top-1 rounded bg-emerald-600 px-1 text-[9px] font-bold text-white">MAIN</span>}
              <div className="mt-1 flex justify-center gap-1">
                <button type="button" onClick={() => move(idx, -1)} className="text-[10px] text-slate-500 hover:text-indigo-600">◀</button>
                <button type="button" onClick={() => onChange(list.filter((_, i) => i !== idx).join(","))} className="text-[10px] font-bold text-rose-500">✕</button>
                <button type="button" onClick={() => move(idx, 1)} className="text-[10px] text-slate-500 hover:text-indigo-600">▶</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function useToast() {
  const [msg, setMsg] = useState("");
  return { msg, setMsg, toast: <Toast msg={msg} onDone={() => setMsg("")} /> };
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => { await fetch("/api/auth", { method: "POST", body: JSON.stringify({ action: "logout" }) }); router.push("/login"); }}
      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800">
      ⏻ Logout
    </button>
  );
}

/** Robust File Attachment component with built-in Next.js file upload sync */
export function FileUploader({
  value,
  onChange,
  label = "Attach Documents",
}: {
  value: string | null | undefined;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const filesList = value ? value.split(",").filter(Boolean) : [];

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      file.name;
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const updated = [...filesList, data.url].join(",");
      onChange(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function removeFile(index: number) {
    const updated = filesList.filter((_, i) => i !== index).join(",");
    onChange(updated);
  }

  return (
    <div className="border rounded-xl p-3 bg-slate-50/50">
      <span className="block text-xs font-medium text-slate-600 mb-2">{label}</span>
      <div className="flex items-center gap-3">
        <label className="cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-2 transition inline-block">
          {uploading ? "Uploading…" : "📎 Upload File"}
          <input type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
        <span className="text-[10px] text-slate-500">Supports PDF, JPG, PNG, DOCX, ZIP</span>
      </div>
      {filesList.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {filesList.map((url, idx) => {
            const parts = url.split("/");
            const name = parts[parts.length - 1];
            return (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs bg-white p-2 rounded-lg border border-slate-200">
                <a href={url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline truncate font-medium max-w-[200px]">
                  📄 {name.slice(13)}
                </a>
                <button type="button" className="text-rose-500 font-bold hover:text-rose-700 text-sm px-1.5" onClick={() => removeFile(idx)}>
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Picture Uploader specifically for contact photos or catalog illustrations */
export function PicUploader({
  value,
  onChange,
  label = "Contact Picture",
}: {
  value: string | null | undefined;
  onChange: (v: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border rounded-xl p-3 bg-slate-50/50 flex items-center gap-4">
      <div className="h-16 w-16 bg-slate-200 border rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xl">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          "👤"
        )}
      </div>
      <div>
        <span className="block text-xs font-medium text-slate-600 mb-1">{label}</span>
        <label className="cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-1.5 transition inline-block">
          {uploading ? "Uploading…" : "📷 Upload Photo"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={uploading} />
        </label>
        {value && (
          <button type="button" className="text-xs text-rose-500 hover:underline block mt-1" onClick={() => onChange("")}>
            Remove Photo
          </button>
        )}
      </div>
    </div>
  );
}
