"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

type Co = { id: number; name: string; isDefault: boolean };
type Br = { id: number; companyId: number; code: string; name: string; isHeadOffice: boolean };

function LoginForm() {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [companies, setCompanies] = useState<Co[]>([]);
  const [branches, setBranches] = useState<Br[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/auth?options=1")
      .then((r) => r.json())
      .then((d) => {
        const cos = (d.companies ?? []) as Co[];
        const brs = (d.branches ?? []) as Br[];
        setCompanies(cos); setBranches(brs);
        const def = cos.find((c) => c.isDefault) ?? cos[0];
        if (def) {
          setCompanyId(String(def.id));
          const ho = brs.find((b) => b.companyId === def.id && b.isHeadOffice) ?? brs.find((b) => b.companyId === def.id);
          if (ho) setBranchId(String(ho.id));
        }
      })
      .catch(() => setError("Unable to load company and branch list."));
  }, []);

  const companyBranches = useMemo(() => branches.filter((b) => String(b.companyId) === companyId), [branches, companyId]);

  function changeCompany(v: string) {
    setCompanyId(v);
    const ho = branches.find((b) => String(b.companyId) === v && b.isHeadOffice) ?? branches.find((b) => String(b.companyId) === v);
    setBranchId(ho ? String(ho.id) : "");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password, companyId: Number(companyId), branchId: branchId || null }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push(next);
    } catch (err) { setError(err instanceof Error ? err.message : "Login failed"); }
    finally { setBusy(false); }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-800 text-3xl">🏛️</div>
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900">Sanitary ERP</h1>
          <p className="text-sm text-slate-500">Company &amp; Branch Staff Login</p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Company</span>
            <select value={companyId} onChange={(e) => changeCompany(e.target.value)} required className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">— Select Company —</option>
              {companies.map((c) => <option key={c.id} value={c.id}>{c.name}{c.isDefault ? " (Default)" : ""}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Branch</span>
            <select value={branchId} onChange={(e) => setBranchId(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <option value="">— All Branches (Head Office Admin only) —</option>
              {companyBranches.map((b) => <option key={b.id} value={b.id}>{b.name} ({b.code}){b.isHeadOffice ? " · Head Office" : ""}</option>)}
            </select>
            <span className="mt-1 block text-[10px] text-slate-400">Branch staff are restricted to their assigned branch. Head-office administrators may choose all branches.</span>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} autoFocus
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="admin" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-slate-600">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="••••••••" />
          </label>
          {error && <div className="rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{error}</div>}
          <button disabled={busy || !companyId} className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 disabled:opacity-50">
            {busy ? "Signing in…" : "🔐 Sign In to Selected Branch"}
          </button>
        </form>
        <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
          <b>Demo accounts:</b> admin / admin123 · cashier / cash123
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href="/" className="text-indigo-600 hover:underline">← Back to Storefront</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
