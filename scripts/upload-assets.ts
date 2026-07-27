import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";
import { writeFile } from "fs/promises";

const ASSETS_DIR = join("public", "assets", "image");
const CLOUDINARY_FOLDER = "metic-website";
const OUTPUT_MAP = join("scripts", "cloudinary-map.json");
const MAX_SIZE = 10 * 1024 * 1024;
const IMAGE_EXTS = new Set([
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico",
]);

function sanitize(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-.]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function walk(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const isDir = statSync(fullPath).isDirectory();

    if (isDir) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  if (!existsSync(ASSETS_DIR)) {
    console.error("Directory not found:", ASSETS_DIR);
    process.exit(1);
  }

  const files = walk(ASSETS_DIR);
  console.log(`Found ${files.length} files.`);

  const mapping: Record<string, string> = {};
  let uploaded = 0;
  let skipped = 0;
  let skippedLarge = 0;
  let skippedNonImage = 0;

  for (const filePath of files) {
    const relativePath = relative(ASSETS_DIR, filePath).replace(/\\/g, "/");
    const localPath = `/assets/image/${relativePath}`;
    const ext = relativePath.substring(relativePath.lastIndexOf(".")).toLowerCase();

    if (!IMAGE_EXTS.has(ext)) {
      skippedNonImage++;
      console.log(`  SKIP ${relativePath} — not an image`);
      continue;
    }

    const size = statSync(filePath).size;
    if (size > MAX_SIZE) {
      skippedLarge++;
      console.log(`  SKIP ${relativePath} — too large (${(size / 1024 / 1024).toFixed(1)}MB)`);
      continue;
    }

    const parts = relativePath.split("/").map(sanitize);
    const publicId = `${CLOUDINARY_FOLDER}/${parts.join("/")}`.replace(
      /\.\w+$/,
      ""
    );

    try {
      const existing = await cloudinary.api.resource(publicId, {
        resource_type: "image",
      });
      mapping[localPath] = existing.secure_url;
      skipped++;
      console.log(`  SKIP ${relativePath} — already exists`);
    } catch {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: false,
        resource_type: "auto",
      });

      mapping[localPath] = result.secure_url;
      uploaded++;
      console.log(`  OK   ${relativePath} → uploaded`);
    }
  }

  await writeFile(OUTPUT_MAP, JSON.stringify(mapping, null, 2));
  console.log(`\nDone: ${uploaded} uploaded, ${skipped} skipped (existing), ${skippedLarge} skipped (too large), ${skippedNonImage} skipped (non-image).`);
  console.log(`Mapping saved to ${OUTPUT_MAP}`);
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
