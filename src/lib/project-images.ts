// Eagerly imports every compressed project photo so Vite can hash/optimize
// them at build time. Add more files to src/assets/projects/<slug>/ and they
// show up automatically — no code changes needed.
const modules = import.meta.glob("../assets/projects/*/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function slugFromPath(path: string): string | null {
  const match = path.match(/\/projects\/([^/]+)\//);
  return match ? (match[1] ?? null) : null;
}

export function getProjectImages(slug: string): string[] {
  return Object.entries(modules)
    .filter(([path]) => slugFromPath(path) === slug)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}
