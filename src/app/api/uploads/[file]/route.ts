import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join, basename } from "path";

export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  pdf: "application/pdf", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
  gif: "image/gif", webp: "image/webp", csv: "text/csv", xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  txt: "text/plain", zip: "application/zip",
};

/* Files must be streamed from an API route: Next.js snapshots public/ at build time,
   so anything written to public/ after `next build` is NOT served. */
export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const { file } = await ctx.params;
  const safe = basename(decodeURIComponent(file));
  if (!safe || safe.startsWith(".")) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const buf = await readFile(join(process.cwd(), "public", "uploads", safe));
    const ext = safe.split(".").pop()?.toLowerCase() ?? "";
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": TYPES[ext] ?? "application/octet-stream",
        "Content-Disposition": `inline; filename="${safe}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
