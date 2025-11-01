import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

async function listImagesFrom(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
  const files = entries
    .filter((e) => e.isFile() && exts.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  return files.map((name, idx) => ({
    id: idx + 1,
    src: `${dir.includes(path.sep + 'public' + path.sep) ? dir.split('public')[1].replace(/\\/g,'/') : ''}/${name}`.replace(/\\/g,'/'),
    alt: name.replace(path.extname(name), "").replace(/[-_]+/g, " ")
  }));
}

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const publicDir = path.join(process.cwd(), "public");

    const aliasMap: Record<string, string[]> = {
      // Qurban sudah ada di folder khusus
      "agri-wangi-berkurban": ["qurban"],
      // CSR foto ada di public/CSR
      "kegiatan-csr": ["CSR", "csr"],
      // 17 Agustus foto ada di public/17
      "17-agustus-2025": ["17"],
    };

    const aliasDirs = (aliasMap[slug] || []).map((name) => path.join(publicDir, name));

    const candidates = [
      path.join(publicDir, slug),
      // Optional: jika ada struktur public/kegiatan/<slug>
      path.join(publicDir, "kegiatan", slug),
      // Khusus alias yang sudah dipetakan
      ...aliasDirs,
    ].filter(Boolean) as string[];

    for (const dir of candidates) {
      try {
        const stats = await fs.stat(dir);
        if (stats.isDirectory()) {
          const images = await listImagesFrom(dir);
          if (images.length > 0) {
            const base = dir.split("public")[1].replace(/\\/g, "/");
            const normalized = images.map((img, i) => ({ id: i + 1, src: `${base}/${path.basename(img.src)}`.replace(/\\/g,'/'), alt: img.alt }));
            return NextResponse.json({ images: normalized });
          }
        }
      } catch (_) {
        // Try next candidate
      }
    }

    return NextResponse.json({ images: [] }, { status: 200 });
  } catch {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
