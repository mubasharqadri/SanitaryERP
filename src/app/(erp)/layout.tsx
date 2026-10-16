"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/erp";

type NavLink = { href: string; icon: string; label: string };

const NAV: Array<{ section: string; links: NavLink[] }> = [
  { section: "Main", links: [{ href: "/dashboard", icon: "📊", label: "Dashboard" }, { href: "/pos", icon: "🛒", label: "POS Counter" }] },
  { section: "Parties", links: [{ href: "/customers", icon: "👥", label: "Customers" }, { href: "/vendors", icon: "🏭", label: "Vendors" }] },
  {
    section: "Inventory & Sales", links: [
      { href: "/inventory/items", icon: "📦", label: "Items" },
      { href: "/inventory/warehouses", icon: "🏬", label: "Warehouses" },
      { href: "/inventory/stock", icon: "📋", label: "Stock Ledger" },
      { href: "/inventory/quotations", icon: "📝", label: "Quotations" },
      { href: "/inventory/sales-orders", icon: "🧾", label: "Sales Orders" },
      { href: "/inventory/sales", icon: "🧮", label: "Sales Invoices" },
      { href: "/inventory/purchase-orders", icon: "📑", label: "Purchase Orders" },
      { href: "/inventory/purchases", icon: "📥", label: "Purchase Invoices" },
      { href: "/inventory/returns", icon: "↩️", label: "Returns" },
    ],
  },
  {
    section: "Accounts", links: [
      { href: "/accounts/chart", icon: "🗂️", label: "Chart of Accounts" },
      { href: "/accounts/vouchers", icon: "📒", label: "Vouchers" },
      { href: "/accounts/trial", icon: "⚖️", label: "Trial Balance" },
      { href: "/accounts/profit-loss", icon: "📈", label: "Profit & Loss" },
      { href: "/accounts/balance-sheet", icon: "🏦", label: "Balance Sheet" },
    ],
  },
  {
    section: "Reports", links: [
      { href: "/reports/sales", icon: "💰", label: "Sales Report" },
      { href: "/reports/purchases", icon: "🧾", label: "Purchase Report" },
      { href: "/reports/stock", icon: "📦", label: "Stock Report" },
      { href: "/reports/aging", icon: "⏳", label: "Customer Aging" },
      { href: "/reports/daily", icon: "🗓️", label: "Daily Sales" },
      { href: "/reports/commission", icon: "🤝", label: "Commission" },
      { href: "/reports/online", icon: "🛒", label: "Online Orders" },
      { href: "/reports/tax", icon: "🇵🇰", label: "Sales Tax & AIT" },
    ],
  },
  {
    section: "Compliance (PK)", links: [
      { href: "/settings/tax", icon: "🧮", label: "Tax Settings (PK)" },
      { href: "/settings/fbr", icon: "📡", label: "FBR Sync" },
      { href: "/settings/integrity", icon: "🩺", label: "Integrity Check" },
    ],
  },
  {
    section: "Settings", links: [
      { href: "/settings/users", icon: "👤", label: "Users" },
      { href: "/settings/permissions", icon: "🔑", label: "Permissions" },
      { href: "/settings/salesmen", icon: "🧑‍💼", label: "Salesmen" },
      { href: "/settings/letterheads", icon: "🧾", label: "Letterheads" },
      { href: "/settings/companies", icon: "🏢", label: "Companies" },
      { href: "/settings/branches", icon: "🏬", label: "Branches" },
      { href: "/settings/currencies", icon: "💱", label: "Currencies" },
      { href: "/settings/data-upload", icon: "📤", label: "Data Upload" },
      { href: "/settings/backup", icon: "💾", label: "Backup" },
      { href: "/audit-log", icon: "🛡️", label: "Audit Log" },
    ],
  },
];

export default function ErpLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [user, setUser] = useState<{ fullName: string; role: string; companyName?: string | null; branchName?: string | null; allBranches?: boolean } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth").then((r) => r.json()).then((d) => setUser(d.user ?? null)).catch(() => {});
    try {
      if (localStorage.getItem("erp_sidebar_collapsed") === "1") setCollapsed(true);
    } catch { /* ignore */ }
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      try { localStorage.setItem("erp_sidebar_collapsed", c ? "0" : "1"); } catch { /* ignore */ }
      return !c;
    });
  }

  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanUp(el.scrollTop > 8);
    setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  }

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [collapsed]);

  function nudge(dir: -1 | 1) {
    scrollRef.current?.scrollBy({ top: dir * 220, behavior: "smooth" });
  }

  const widthCls = collapsed ? "lg:w-[72px]" : "lg:w-60";

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="no-print sticky top-0 z-40 flex items-center justify-between bg-slate-900 px-4 py-2.5 text-white">
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileOpen(!mobileOpen)} title="Menu" className="rounded-lg px-2 py-1 text-xl hover:bg-slate-800 lg:hidden">☰</button>
          <button onClick={toggleCollapsed} title={collapsed ? "Maximize sidebar" : "Minimize sidebar"} className="erp-sidebar-toggle hidden rounded-lg px-2 py-1 text-lg hover:bg-slate-800 lg:block">
            {collapsed ? "➡️" : "⬅️"}
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-lg">🏛️</span>
            <span className="font-bold">Sanitary ERP</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 sm:block">🌐 Storefront</Link>
          <span className="hidden text-right text-[11px] leading-tight text-slate-300 md:block">
            {user ? <><b className="text-white">{user.companyName ?? "Company"}</b><br />{user.allBranches ? "All branches · Head Office" : user.branchName ?? "Branch"} · {user.fullName} ({user.role})</> : "…"}
          </span>
          <LogoutButton />
        </div>
      </header>
      <div className="flex">
        {/* Backdrop for mobile drawer */}
        {mobileOpen && <div className="no-print fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

        <aside
          className={`erp-sidebar no-print fixed inset-y-0 left-0 z-30 flex w-60 shrink-0 flex-col bg-slate-900 pb-3 pt-16 text-slate-200 lg:sticky lg:top-[48px] lg:z-auto lg:h-[calc(100vh-48px)] lg:pt-0 ${widthCls} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          {/* Floating arrow toggle (desktop) */}
          <button
            onClick={toggleCollapsed}
            title={collapsed ? "Maximize sidebar (expand menu)" : "Minimize sidebar (icons only)"}
            className="erp-sidebar-toggle absolute -right-3.5 top-16 z-10 hidden h-7 w-7 place-items-center rounded-full border border-slate-600 bg-slate-800 text-xs text-white shadow-lg hover:bg-indigo-600 lg:grid"
            style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ◀
          </button>

          {/* Scrollable nav */}
          <div ref={scrollRef} onScroll={updateArrows} className={`erp-sidebar-scroll max-h-full flex-1 overflow-y-auto px-3 py-3 lg:max-h-none ${collapsed ? "lg:px-2" : ""}`}>
            {NAV.map((g) => (
              <div key={g.section} className="py-1.5">
                <div className={`erp-sidebar-label px-2 pb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 ${collapsed ? "lg:hidden" : ""}`}>
                  {g.section}
                </div>
                {collapsed && <div className="mx-2 mb-1 hidden border-t border-slate-800 lg:block" />}
                {g.links.map((l) => {
                  const active = path === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      title={l.label}
                      onClick={() => setMobileOpen(false)}
                      className={`erp-nav-link group relative mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${collapsed ? "lg:justify-center lg:px-0" : ""} ${active ? "bg-indigo-600 text-white" : "hover:bg-slate-800"}`}
                    >
                      <span className="shrink-0 text-base leading-none">{l.icon}</span>
                      <span className={`erp-sidebar-label ${collapsed ? "lg:hidden" : ""}`}>{l.label}</span>
                      {/* Hover tooltip in minimized mode */}
                      <span className="pointer-events-none absolute left-full top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl group-hover:opacity-100 lg:group-hover:block ml-3" style={{ display: collapsed ? undefined : "none" }}>
                        {l.icon} {l.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Up / Down slide controls + collapse */}
          <div className={`border-t border-slate-800 px-3 pt-2 ${collapsed ? "lg:px-2" : ""}`}>
            <div className={`flex items-center gap-1.5 ${collapsed ? "lg:flex-col" : ""}`}>
              <button onClick={() => nudge(-1)} disabled={!canUp} title="Scroll menu up"
                className="grid h-8 flex-1 place-items-center rounded-lg bg-slate-800 text-sm text-slate-200 hover:bg-slate-700 disabled:opacity-30 lg:flex-none lg:px-3">
                ▲
              </button>
              <button onClick={() => nudge(1)} disabled={!canDown} title="Scroll menu down"
                className="grid h-8 flex-1 place-items-center rounded-lg bg-slate-800 text-sm text-slate-200 hover:bg-slate-700 disabled:opacity-30 lg:flex-none lg:px-3">
                ▼
              </button>
              <button onClick={toggleCollapsed} title={collapsed ? "Maximize sidebar" : "Minimize sidebar"}
                className="erp-sidebar-toggle hidden h-8 flex-1 place-items-center rounded-lg bg-indigo-600 text-sm text-white hover:bg-indigo-500 lg:grid">
                {collapsed ? "▶ Maximize" : "◀ Minimize"}
              </button>
            </div>
            <div className={`erp-sidebar-label pt-1.5 text-center text-[10px] text-slate-500 ${collapsed ? "lg:hidden" : ""}`}>
              v1.1 · FBR Digital Invoicing ready
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
