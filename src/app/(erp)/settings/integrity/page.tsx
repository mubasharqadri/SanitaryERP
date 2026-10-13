"use client";
import { useApi, PageHead, Card, Badge, Btn } from "@/components/erp";

export default function IntegrityPage() {
  const { data, loading, reload } = useApi<{ checks: Array<{ name: string; status: "pass" | "warn" | "fail"; detail: string }>; summary: { pass: number; warn: number; fail: number } }>("/api/integrity");
  return (
    <div>
      <PageHead title="🩺 Data Integrity Check" sub="Validates balancing, stock, totals, duplicates, orphans, FK/index enforcement" actions={<Btn onClick={reload}>↻ Re-run Checks</Btn>} />
      {loading || !data ? <div className="text-slate-500">Running checks…</div> : (
        <>
          <div className="mb-4 flex gap-3">
            <Card><span className="text-sm text-slate-500">Pass </span><b className="text-xl text-emerald-600">{data.summary.pass}</b></Card>
            <Card><span className="text-sm text-slate-500">Warn </span><b className="text-xl text-amber-600">{data.summary.warn}</b></Card>
            <Card><span className="text-sm text-slate-500">Fail </span><b className="text-xl text-rose-600">{data.summary.fail}</b></Card>
          </div>
          <div className="space-y-2">
            {data.checks.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div>
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-sm text-slate-500">{c.detail}</div>
                </div>
                <Badge tone={c.status === "pass" ? "green" : c.status === "warn" ? "amber" : "red"}>
                  {c.status === "pass" ? "✓ PASS" : c.status === "warn" ? "! WARN" : "✗ FAIL"}
                </Badge>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
