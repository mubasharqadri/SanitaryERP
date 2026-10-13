"use client";
import { useApi, PageHead, Table, Badge, money, Btn } from "@/components/erp";

export default function StockReportPage() {
  const { data, loading } = useApi<{
    summary: Array<{ id: number; code: string; name: string; category: string; brand: string | null; stock: number; reorderLevel: string; costPrice: string; salePrice: string; value: number }>;
  }>("/api/reports?type=stock");
  const rows = data?.summary ?? [];
  const totalVal = rows.reduce((a, r) => a + r.value, 0);
  const low = rows.filter((r) => r.stock <= Number(r.reorderLevel)).length;
  return (
    <div>
      <PageHead title="📦 Stock Report" sub={`${rows.length} items · value Rs ${money(totalVal)} · ${low} at/below reorder`} actions={<Btn tone="ghost" onClick={() => window.print()}>🖨️ Print</Btn>} />
      {loading ? <div className="text-slate-500">Loading…</div> : (
        <div className="print-area"><Table head={["Code", "Item", "Category", "Stock", "Reorder", "Cost", "Sale", "Value"]}>
          {rows.map((r) => (
            <tr key={r.id}><td className="px-3 py-2 font-mono text-xs">{r.code}</td><td className="px-3 py-2 font-medium">{r.name}</td>
            <td className="px-3 py-2">{r.category}</td>
            <td className="px-3 py-2"><Badge tone={r.stock <= 0 ? "red" : r.stock <= Number(r.reorderLevel) ? "amber" : "green"}>{r.stock}</Badge></td>
            <td className="px-3 py-2">{r.reorderLevel}</td>
            <td className="px-3 py-2 text-right">{money(r.costPrice)}</td>
            <td className="px-3 py-2 text-right">{money(r.salePrice)}</td>
            <td className="px-3 py-2 text-right font-bold">{money(r.value)}</td></tr>
          ))}
        </Table></div>
      )}
    </div>
  );
}
