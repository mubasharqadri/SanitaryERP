"use client";
import { useState } from "react";
import { DocManager } from "@/components/docs";

export default function ReturnsPage() {
  const [tab, setTab] = useState<"SRET" | "PRET">("SRET");
  return (
    <div>
      <div className="no-print mb-4 flex gap-2">
        <button onClick={() => setTab("SRET")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "SRET" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border"}`}>↩️ Sales Returns</button>
        <button onClick={() => setTab("PRET")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${tab === "PRET" ? "bg-indigo-600 text-white" : "bg-white text-slate-700 border"}`}>↩️ Purchase Returns</button>
      </div>
      {tab === "SRET" ? <DocManager docType="SRET" title="Sales Returns" icon="↩️" showConvert={false} /> : <DocManager docType="PRET" title="Purchase Returns" icon="↩️" showConvert={false} />}
    </div>
  );
}
