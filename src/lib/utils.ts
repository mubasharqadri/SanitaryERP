export function num(v: unknown): number {
  if (v === null || v === undefined || v === "") return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function money(v: unknown): string {
  return num(v).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtDate(d: unknown): string {
  if (!d) return "-";
  try {
    const dt = new Date(String(d));
    if (Number.isNaN(dt.getTime())) return String(d).slice(0, 10);
    return dt.toISOString().slice(0, 10);
  } catch {
    return String(d);
  }
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function periodOf(dateStr: string): string {
  return dateStr.slice(0, 7); // YYYY-MM
}

export const DOC_PREFIX: Record<string, string> = {
  QUOT: "QT",
  SO: "SO",
  SINV: "INV",
  PO: "PO",
  PINV: "PINV",
  SRET: "SR",
  PRET: "PR",
  POS: "POS",
  ADJ: "ADJ",
};

export const VOUCHER_PREFIX: Record<string, string> = {
  JV: "JV",
  BRV: "BRV",
  BPV: "BPV",
  CRV: "CRV",
  CPV: "CPV",
  ADJ: "ADJ",
  SINV: "SINV",
  PINV: "PINV",
  POS: "POSV",
};

export function docNoFor(prefix: string, dateStr: string, n: number): string {
  const [y, m] = dateStr.slice(0, 7).split("-");
  return `${prefix}-${y}-${m}-${String(n).padStart(4, "0")}`;
}

export const CATEGORY_EMOJI: Record<string, string> = {
  "Sanitary Ware": "🚽",
  Tiles: "🧱",
  "Brass Fittings": "🔧",
  Accessories: "🧰",
  General: "📦",
};

export function stockBadge(qty: number): { label: string; cls: string } {
  if (qty <= 0) return { label: "Out of Stock", cls: "bg-red-100 text-red-700 border-red-200" };
  if (qty <= 5) return { label: `Only ${qty} left`, cls: "bg-amber-100 text-amber-800 border-amber-200" };
  return { label: "In Stock", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" };
}
