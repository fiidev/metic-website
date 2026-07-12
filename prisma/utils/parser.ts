export function parseMemberRole(raw: string) {
  const [generationPart, rolePart] = raw.split("|").map((s) => s.trim());

  const generation = Number(
    generationPart.replace("Metizen", "").trim()
  );

  const roles =
    rolePart
      ?.split(",")
      .map((r) => r.trim())
      .filter(Boolean) ?? [];

  return {
    generation,
    roles,
  };
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}