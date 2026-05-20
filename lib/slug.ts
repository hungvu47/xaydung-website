/** URL-safe slug from title (ASCII; strips Vietnamese accents). */
export function slugFromTitle(title: string): string {
  const base = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "du-an";
}
