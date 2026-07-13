export function parseMemberRole(raw: string) {
  const [generationPart, rolePart] = raw.split("|").map((s) => s.trim());
  const generation = Number(generationPart.replace("Metizen", "").trim());
  const roles =
    rolePart
      ?.split(",")
      .map((r) => r.trim())
      .filter(Boolean) ?? [];

  return { generation, roles };
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function parseDate(date: string): Date | null {
  if (!date) return null;
  if (date.includes("/")) {
    const [day, month, year] = date.split("/").map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  }
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed;
}
