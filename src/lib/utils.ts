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

const W_ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const W_TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function wTwoDigits(n: number): string {
  if (n < 20) return W_ONES[n];
  const t = Math.floor(n / 10), o = n % 10;
  return W_TENS[t] + (o ? "-" + W_ONES[o] : "");
}
function wThreeDigits(n: number): string {
  const h = Math.floor(n / 100), rest = n % 100;
  return (h ? W_ONES[h] + " Hundred" : "") + (h && rest ? " " : "") + (rest ? wTwoDigits(rest) : "");
}

/** Amount in words using Pakistani numbering (crore / lakh / thousand). */
export function amountInWords(value: number): string {
  const n = Math.floor(Math.abs(value || 0));
  const paisa = Math.round((Math.abs(value || 0) - n) * 100);
  if (n === 0 && !paisa) return "Zero";
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (crore) parts.push(wTwoDigits(crore) + " Crore");
  if (lakh) parts.push(wTwoDigits(lakh) + " Lakh");
  if (thousand) parts.push(wTwoDigits(thousand) + " Thousand");
  if (rest) parts.push(wThreeDigits(rest));
  let words = parts.join(" ");
  if (paisa) words += (words ? " and " : "") + wTwoDigits(paisa) + " Paisa";
  return words;
}
