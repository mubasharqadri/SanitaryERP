"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = {
  id: number; code: string; name: string; category: string; brand: string | null;
  size: string | null; color: string | null; design: string | null; origin: string;
  salePrice: string; featured: boolean; stock: number; sold30: number; unit: string;
};
type Data = {
  stats: { products: number; totalStock: number; soldToday: number; sold30: number; invoices: number };
  categories: Array<{ name: string; count: number }>;
  featured: Item[];
  catalog: Item[];
};

const CAT_STYLE: Record<string, { emoji: string; grad: string }> = {
  "Sanitary Ware": { emoji: "🚽", grad: "from-sky-500 to-blue-700" },
  Tiles: { emoji: "🧱", grad: "from-amber-500 to-orange-700" },
  "Brass Fittings": { emoji: "🔧", grad: "from-yellow-500 to-amber-700" },
  Accessories: { emoji: "🧰", grad: "from-emerald-500 to-teal-700" },
  General: { emoji: "📦", grad: "from-slate-500 to-slate-700" },
};

function badge(stock: number) {
  if (stock <= 0) return { t: "Out of Stock", c: "bg-red-100 text-red-700" };
  if (stock <= 5) return { t: `Only ${stock} left`, c: "bg-amber-100 text-amber-800" };
  return { t: "In Stock", c: "bg-emerald-100 text-emerald-700" };
}

function ProductCard({ it }: { it: Item }) {
  const b = badge(it.stock);
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg">
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="text-3xl">{CAT_STYLE[it.category]?.emoji ?? "📦"}</span>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${b.c}`}>{b.t}</span>
      </div>
      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{it.code} · {it.brand ?? "—"}</div>
      <h3 className="mt-0.5 font-bold text-slate-900">{it.name}</h3>
      <div className="mt-1 text-xs text-slate-500">
        {[it.size, it.color, it.design].filter(Boolean).join(" · ") || "Standard"}
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        <span>{it.origin === "Imported" ? "✈️ Imported" : "🇵🇰 Local"}</span>
        <span className="text-slate-300">|</span>
        <span className="text-slate-500">📦 {it.stock} {it.unit}</span>
      </div>
      <div className="mt-auto flex items-end justify-between pt-3">
        <div>
          <div className="text-lg font-extrabold text-indigo-700">Rs {Number(it.salePrice).toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">per {it.unit} · ~{it.sold30}/mo sold</div>
        </div>
        {it.featured && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">⭐ Featured</span>}
      </div>
    </div>
  );
}

export default function Storefront() {
  const [data, setData] = useState<Data | null>(null);
  const [cat, setCat] = useState("");
  const [origin, setOrigin] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  useEffect(() => {
    fetch("/api/storefront").then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  const catalog = useMemo(() => {
    let list = data?.catalog ?? [];
    if (cat) list = list.filter((i) => i.category === cat);
    if (origin) list = list.filter((i) => i.origin === origin);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter((i) => (i.name + " " + (i.brand ?? "") + " " + (i.color ?? "") + " " + i.code).toLowerCase().includes(s));
    }
    const sorted = [...list];
    if (sort === "popular") sorted.sort((a, b) => b.sold30 - a.sold30);
    if (sort === "low") sorted.sort((a, b) => Number(a.salePrice) - Number(b.salePrice));
    if (sort === "high") sorted.sort((a, b) => Number(b.salePrice) - Number(a.salePrice));
    if (sort === "avail") sorted.sort((a, b) => b.stock - a.stock);
    return sorted;
  }, [data, cat, origin, q, sort]);

  const s = data?.stats;
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-800 text-2xl text-white">🏛️</div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">Awami ERP</div>
              <div className="text-xs text-slate-500">Sanitary · Tiles · Brass Fittings — Gujranwala</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#catalog" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block">🛍️ Shop Catalog</a>
            <Link href="/login" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">🔐 Staff Login</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">Since 1998 · Trusted Showroom</div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">Everything for a <span className="text-amber-300">Beautiful Bathroom</span> &amp; Home</h1>
            <p className="mt-4 max-w-lg text-blue-100">Local &amp; imported sanitary ware, tiles, brass fittings and accessories — wholesale rates for builders, retailers and walk-in customers.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalog" className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-900 hover:bg-amber-300">🛍️ Browse Catalog</a>
              <a href="#categories" className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10">Shop by Category</a>
            </div>
            <div className="mt-6 flex gap-5 text-sm text-blue-100">
              <span>✅ Genuine brands</span><span>✅ Wholesale rates</span><span>✅ Site delivery</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["🚽 Sanitary Ware", "🧱 Designer Tiles", "🔧 Brass Fittings", "🧰 Accessories"].map((t) => (
              <div key={t} className="grid place-items-center rounded-2xl bg-white/10 p-6 text-center text-lg font-bold backdrop-blur">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Live stats */}
      <section className="mx-auto -mt-0 grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 md:grid-cols-4">
        {[
          { l: "Products in Catalog", v: String(s?.products ?? "…"), i: "📦" },
          { l: "Items in Stock", v: (s?.totalStock ?? 0).toLocaleString(), i: "🏬" },
          { l: "Sold Today", v: String(s?.soldToday ?? "…"), i: "🔥" },
          { l: "Sold Last 30 Days", v: String(s?.sold30 ?? "…"), i: "📈" },
        ].map((x) => (
          <div key={x.l} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-2xl">{x.i}</div>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">{x.v}</div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{x.l}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="text-2xl font-extrabold text-slate-900">Shop by Category</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {(data?.categories ?? []).map((c) => (
            <button key={c.name} onClick={() => { setCat(cat === c.name ? "" : c.name); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }}
              className={`rounded-2xl bg-gradient-to-br p-6 text-left text-white shadow transition hover:scale-[1.02] ${CAT_STYLE[c.name]?.grad ?? "from-slate-500 to-slate-700"} ${cat === c.name ? "ring-4 ring-indigo-300" : ""}`}>
              <div className="text-4xl">{CAT_STYLE[c.name]?.emoji}</div>
              <div className="mt-2 font-bold">{c.name}</div>
              <div className="text-sm opacity-80">{c.count} products</div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      {(data?.featured?.length ?? 0) > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-2xl font-extrabold text-slate-900">⭐ Featured Products</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data!.featured.map((it) => <ProductCard key={it.id} it={it} />)}
          </div>
        </section>
      )}

      {/* Catalog */}
      <section id="catalog" className="mx-auto max-w-7xl px-4 py-6 pb-16">
        <h2 className="text-2xl font-extrabold text-slate-900">Full Product Catalog</h2>
        <div className="mt-4 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Search name, brand, color…"
            className="min-w-[200px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">All Categories</option>
            {(data?.categories ?? []).map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="">All Origins</option>
            <option value="Local">🇵🇰 Local</option>
            <option value="Imported">✈️ Imported</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="popular">Sort: Popularity</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="avail">Availability</option>
          </select>
        </div>
        <div className="mt-2 text-sm text-slate-500">{catalog.length} product(s) found</div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {catalog.map((it) => <ProductCard key={it.id} it={it} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold text-white">🏛️ Awami ERP</div>
            <p className="mt-2 text-sm">Main G.T. Road, Gujranwala<br />055-1234567 · info@alnoorsanitory.pk<br />Mon–Sat 9am–9pm</p>
          </div>
          <div>
            <div className="font-bold text-white">Quick Links</div>
            <div className="mt-2 space-y-1 text-sm">
              <a href="#catalog" className="block hover:text-white">Product Catalog</a>
              <a href="#categories" className="block hover:text-white">Categories</a>
              <Link href="/login" className="block hover:text-white">🔐 Staff Login</Link>
            </div>
          </div>
          <div>
            <div className="font-bold text-white">Staff Access</div>
            <p className="mt-2 text-sm">Authorized staff: manage inventory, billing, accounts &amp; reports from the ERP back office.</p>
            <Link href="/login" className="mt-3 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">🔐 Staff Login</Link>
          </div>
        </div>
        <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">© 2026 Awami ERP · Awami ERP v1.0</div>
      </footer>
    </div>
  );
}
