import fs from "fs/promises";
import path from "path";

const PROJECT_ROOT = path.resolve(".");
const MAP_FILE = path.resolve("scripts/cloudinary-map.json");

const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "public",
  "scripts"
]);

const TARGET_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
]);

async function getAllFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) return [];
        return getAllFiles(fullPath);
      }

      if (!TARGET_EXTENSIONS.has(path.extname(entry.name)))
        return [];

      return fullPath;
    })
  );

  return files.flat();
}

async function main() {
  const mapping: Record<string, string> = JSON.parse(
    await fs.readFile(MAP_FILE, "utf-8")
  );

  const files = await getAllFiles(PROJECT_ROOT);

  let modifiedFiles = 0;
  let totalReplacements = 0;

  for (const file of files) {
    let content = await fs.readFile(file, "utf-8");

    let replaced = false;

    for (const [oldPath, newUrl] of Object.entries(mapping)) {
      if (content.includes(oldPath)) {
        content = content.split(oldPath).join(newUrl);
        replaced = true;
        totalReplacements++;
      }
    }

    if (replaced) {
      const backup = file + ".bak";
      await fs.copyFile(file, backup);
      await fs.writeFile(file, content);

      modifiedFiles++;

      console.log(
        `✅ Updated ${path.relative(PROJECT_ROOT, file)}`
      );
    }
  }

  console.log("\n====================");
  console.log(`Modified files : ${modifiedFiles}`);
  console.log(`Replacements   : ${totalReplacements}`);
  console.log("====================");
}

main().catch(console.error);