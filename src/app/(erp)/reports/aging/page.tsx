"use client";
import { useApi, PageHead, Table, money, Btn } from "@/components/erp";

export default function AgingPage() {
  const { data, loading } = useApi<{ rows: Array<{ id: number; name: string; city: string | null; phone: string | null; creditLimit: number; b0: number; b1: number; b2: number; b3: number; outstanding: number; lastDate: string; lastAmt: number; lastPayDate: string; lastPayAmt: number }> }>("/api/reports?type=aging");
  const rows = data?.rows ?? [];
  const sum = (k: "b0" | "b1" | "b2" | "b3" | "outstanding") => rows.reduce((a, r) => a + r[k], 0);
  return (
    <div>
      <PageHead title="⏳ Customer Aging" sub="Outstanding receivables by age bucket" actions={<Btn tone="ghost" onClick={() => window.print()}>🖨️ Print</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area"><Table head={["Customer", "Phone", "0–30", "31–60", "61–90", "90+", "Outstanding", "Last Payment", "Last Invoice", "Limit"]}>
          {rows.map((r) => (
            <tr key={r.id}><td className="px-3 py-2 font-medium">{r.name}<div className="text-xs font-normal text-slate-400">{r.city ?? ""}</div></td>
            <td className="px-3 py-2 text-xs">{r.phone ?? "—"}</td>
            <td className="px-3 py-2 text-right">{money(r.b0)}</td>
            <td className="px-3 py-2 text-right">{money(r.b1)}</td>
            <td className="px-3 py-2 text-right">{money(r.b2)}</td>
            <td className="px-3 py-2 text-right">{money(r.b3)}</td>
            <td className="px-3 py-2 text-right font-bold text-indigo-700">{money(r.outstanding)}</td>
            <td className="px-3 py-2 text-xs text-emerald-700">{r.lastPayDate ? `${r.lastPayDate} · Rs ${money(r.lastPayAmt)}` : <span className="text-slate-400">No payment</span>}</td>
            <td className="px-3 py-2 text-xs">{r.lastDate ? `${r.lastDate} · Rs ${money(r.lastAmt)}` : "—"}</td>
            <td className="px-3 py-2 text-right">{money(r.creditLimit)}</td></tr>
          ))}
          <tr className="bg-slate-50 font-bold"><td className="px-3 py-2" colSpan={2}>TOTAL</td>
          <td className="px-3 py-2 text-right">{money(sum("b0"))}</td><td className="px-3 py-2 text-right">{money(sum("b1"))}</td>
          <td className="px-3 py-2 text-right">{money(sum("b2"))}</td><td className="px-3 py-2 text-right">{money(sum("b3"))}</td>
          <td className="px-3 py-2 text-right">{money(sum("outstanding"))}</td><td colSpan={3} /></tr>
        </Table></div>
      )}
    </div>
  );
}
