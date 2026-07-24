import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const LOCAL_ROOT = path.resolve("public/assets/image");
const CLOUDINARY_ROOT = "assets/image";

const mapping: Record<string, string> = {};

let uploaded = 0;
let skipped = 0;
let failed = 0;
let total = 0;

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getAllFiles(fullPath);
      }

      return fullPath;
    })
  );

  return files.flat();
}

function getPublicId(filePath: string) {
  const relative = path.relative(LOCAL_ROOT, filePath);

  const withoutExtension = relative.replace(path.extname(relative), "");

  return `${CLOUDINARY_ROOT}/${withoutExtension}`
    .replace(/\\/g, "/");
}

async function assetExists(publicId: string) {
  try {
    await cloudinary.api.resource(publicId);

    return true;
  } catch {
    return false;
  }
}

async function upload(filePath: string) {
  const publicId = getPublicId(filePath);

  const localPath =
    "/" +
    path
      .relative(path.resolve("public"), filePath)
      .replace(/\\/g, "/");

  try {
    // Check if the asset already exists
    const existing = await cloudinary.api.resource(publicId);

    // Save its URL into the mapping
    mapping[localPath] = existing.secure_url;

    skipped++;

    console.log(`⏭️  Skipped (already exists): ${publicId}`);

    return;
  } catch {
    // Asset doesn't exist, continue with upload
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: "auto",
    });

    mapping[localPath] = result.secure_url;

    uploaded++;

    console.log(`✅ Uploaded: ${publicId}`);
  } catch (err) {
    failed++;

    console.error(`❌ Failed: ${publicId}`);
    console.error(err);
  }
}

async function main() {
  const files = (await getAllFiles(LOCAL_ROOT)).sort();

  total = files.length;

  console.log(`\nFound ${total} assets.\n`);

  for (const file of files) {
    await upload(file);
  }

  await fs.writeFile(
    "scripts/cloudinary-map.json",
    JSON.stringify(mapping, null, 2)
  );

  console.log("\n====================");
  console.log(`Total    : ${total}`);
  console.log(`Uploaded : ${uploaded}`);
  console.log(`Skipped  : ${skipped}`);
  console.log(`Failed   : ${failed}`);
  console.log("====================\n");
}

main();