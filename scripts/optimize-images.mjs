// One-shot source-image optimizer. Design-neutral: downscales to a sane max
// dimension and re-encodes in place (same filename/extension). next/image still
// serves AVIF/WebP to browsers, so nothing users see changes — only load speed.
// Originals are already backed up in _originals_backup/.
import { readdirSync, statSync, renameSync, rmSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public";
const MAX_EDGE = 2560; // longest side; 2560 covers a ~1360px container at 2x DPR
const JPEG_Q = 80;
const exts = new Set([".jpg", ".jpeg", ".png"]);

sharp.cache(false);
sharp.concurrency(1);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (exts.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let before = 0, after = 0, changed = 0, skipped = 0;

for (const file of files) {
  const startSize = statSync(file).size;
  before += startSize;
  const ext = extname(file).toLowerCase();
  const tmp = file + ".tmp";
  try {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();
    const longest = Math.max(meta.width || 0, meta.height || 0);

    let pipeline = sharp(file, { failOn: "none" }).rotate(); // respect EXIF orientation
    if (longest > MAX_EDGE) {
      pipeline = pipeline.resize({ width: meta.width >= meta.height ? MAX_EDGE : null,
                                   height: meta.height > meta.width ? MAX_EDGE : null,
                                   withoutEnlargement: true });
    }
    if (ext === ".png") {
      pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 7 });
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true, progressive: true });
    }
    await pipeline.toFile(tmp);

    const newSize = statSync(tmp).size;
    // Keep the new file only if it's actually smaller; otherwise discard.
    if (newSize < startSize) {
      renameSync(tmp, file);
      after += newSize;
      changed++;
      console.log(`  ${(startSize/1048576).toFixed(2)}MB -> ${(newSize/1048576).toFixed(2)}MB  ${file}`);
    } else {
      rmSync(tmp);
      after += startSize;
      skipped++;
    }
  } catch (e) {
    try { rmSync(tmp); } catch {}
    after += startSize;
    skipped++;
    console.log(`  SKIP (${e.message})  ${file}`);
  }
}

console.log("\n──────── SUMMARY ────────");
console.log(`Files processed : ${files.length}`);
console.log(`Re-encoded      : ${changed}`);
console.log(`Left as-is      : ${skipped}`);
console.log(`Total before    : ${(before/1048576).toFixed(1)} MB`);
console.log(`Total after     : ${(after/1048576).toFixed(1)} MB`);
console.log(`Saved           : ${((before-after)/1048576).toFixed(1)} MB (${(100*(before-after)/before).toFixed(1)}%)`);
