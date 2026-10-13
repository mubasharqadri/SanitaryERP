import { NextResponse } from "next/server";
import { db } from "@/db";
import { items, stockLedger } from "@/db/schema";
import { eq, ilike, or, and } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { ensureSeed } from "@/lib/seed";
import { num } from "@/lib/utils";
import { audit } from "@/lib/posting";

export async function stockMap(): Promise<Record<number, { stock: number; sold30: number; soldTotal: number }>> {
  const all = await db.select().from(items);
  const moves = await db.select().from(stockLedger);
  const map: Record<number, { stock: number; sold30: number; soldTotal: number }> = {};
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  for (const it of all) map[it.id] = { stock: num(it.openingStock), sold30: 0, soldTotal: 0 };
  for (const m of moves) {
    if (!m.itemId || !map[m.itemId]) continue;
    // Damaged / broken sales returns never rejoin saleable stock
    const isLossReturn = m.docType === "SRET" && (m.returnCondition === "damaged" || m.returnCondition === "broken");
    map[m.itemId].stock += isLossReturn ? 0 : num(m.qtyIn) - num(m.qtyOut);
    if (num(m.qtyOut) > 0 && (m.docType === "SINV" || m.docType === "POS" || m.docType === "SO")) {
      map[m.itemId].soldTotal += num(m.qtyOut);
      if (new Date(String(m.date)) >= cutoff) map[m.itemId].sold30 += num(m.qtyOut);
    }
  }
  return map;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const publicMode = url.searchParams.get("public") === "1";
  if (!publicMode) {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await ensureSeed();
  const search = url.searchParams.get("search") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const conds = [];
  if (search) conds.push(or(ilike(items.name, `%${search}%`), ilike(items.code, `%${search}%`), ilike(items.brand, `%${search}%`), ilike(items.barcode, `%${search}%`))!);
  if (category) conds.push(eq(items.category, category));
  const rows = await db.select().from(items).where(conds.length ? and(...conds) : undefined).orderBy(items.name);
  const sm = await stockMap();
  const out = rows.map((r) => ({ ...r, stock: Math.round((sm[r.id]?.stock ?? num(r.openingStock)) * 100) / 100, sold30: sm[r.id]?.sold30 ?? 0, soldTotal: sm[r.id]?.soldTotal ?? 0 }));
  const cats = [...new Set(rows.map((r) => r.category))];
  return NextResponse.json({ items: out, categories: cats });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const p = body.item ?? body;
  try {
    const rows = await db.insert(items).values({
      code: p.code, barcode: p.barcode || null, name: p.name, category: p.category || "General",
      brand: p.brand || null, model: p.model || null, unit: p.unit || "PCS",
      size: p.size || null, color: p.color || null, design: p.design || null,
      origin: p.origin || "Local", featured: !!p.featured,
      costPrice: String(p.costPrice ?? 0), salePrice: String(p.salePrice ?? 0),
      reorderLevel: String(p.reorderLevel ?? 0), openingStock: String(p.openingStock ?? 0),
      hsCode: p.hsCode || null, taxClass: p.taxClass || "standard", taxRate: String(p.taxRate ?? 18),
      pictures: p.pictures || null, documents: p.documents || null,
      warehouseId: p.warehouseId ? Number(p.warehouseId) : null, active: p.active ?? true,
    }).returning();
    await audit(user.id, user.username, "create", "items", String(rows[0].id), rows[0]);
    return NextResponse.json({ item: rows[0] });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Insert failed";
    if (msg.includes("duplicate") || msg.includes("unique")) return NextResponse.json({ error: `Item code "${p.code}" already exists.` }, { status: 400 });
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const url = new URL(req.url);
  const id = Number(body.id ?? url.searchParams.get("id"));
  const p = body.item ?? body;
  await db.update(items).set({
    code: p.code, barcode: p.barcode, name: p.name, category: p.category, brand: p.brand,
    model: p.model, unit: p.unit, size: p.size, color: p.color, design: p.design,
    origin: p.origin, featured: p.featured, costPrice: p.costPrice !== undefined ? String(p.costPrice) : undefined,
    salePrice: p.salePrice !== undefined ? String(p.salePrice) : undefined,
    reorderLevel: p.reorderLevel !== undefined ? String(p.reorderLevel) : undefined,
    openingStock: p.openingStock !== undefined ? String(p.openingStock) : undefined,
    hsCode: p.hsCode, taxClass: p.taxClass, taxRate: p.taxRate !== undefined ? String(p.taxRate) : undefined,
    pictures: p.pictures, documents: p.documents,
    warehouseId: p.warehouseId === null || p.warehouseId === "" ? null : (p.warehouseId ? Number(p.warehouseId) : undefined),
    active: p.active, updatedAt: new Date(),
  }).where(eq(items.id, id));
  await audit(user.id, user.username, "update", "items", String(id), p);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  try {
    await db.delete(items).where(eq(items.id, id));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("restrict") || msg.includes("stock_ledger") || msg.includes("violates")) {
      return NextResponse.json({ error: "Cannot delete: this item has stock movement history. Mark it Inactive instead." }, { status: 400 });
    }
    return NextResponse.json({ error: msg || "Delete failed" }, { status: 400 });
  }
  await audit(user.id, user.username, "delete", "items", String(id), {});
  return NextResponse.json({ ok: true });
}
