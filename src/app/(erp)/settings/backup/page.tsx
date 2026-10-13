"use client";
import { useState } from "react";
import { PageHead, Card, Btn } from "@/components/erp";

export default function BackupPage() {
  const [busy, setBusy] = useState(false);
  async function download() {
    setBusy(true);
    try {
      const res = await fetch("/api/backup");
      if (!res.ok) throw new Error("Backup failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sanitary-erp-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) { alert(e instanceof Error ? e.message : "Backup failed"); }
    finally { setBusy(false); }
  }
  return (
    <div>
      <PageHead title="💾 Data Backup" sub="One-click export of the entire database to JSON" />
      <Card>
        <div className="py-6 text-center">
          <div className="text-5xl">💾</div>
          <h3 className="mt-3 text-lg font-bold">Full Database Export</h3>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">Downloads companies, users, parties, items, documents, vouchers, stock ledger, audit log and all settings as a single JSON file.</p>
          <div className="mt-4"><Btn onClick={download} disabled={busy}>{busy ? "Preparing…" : "⬇️ Download Backup (JSON)"}</Btn></div>
          <a href="/api/backup" target="_blank" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">or open /api/backup directly</a>
        </div>
      </Card>
    </div>
  );
}
