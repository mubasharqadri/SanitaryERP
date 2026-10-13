import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniqueName = `${Date.now()}_${cleanName}`;
    const filePath = join(uploadsDir, uniqueName);

    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${uniqueName}`; // served by /api/uploads/[file] via rewrite
    return NextResponse.json({ ok: true, url: fileUrl, name: file.name });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}
