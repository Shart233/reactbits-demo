import { registry, type RegistryEntry } from "@/registry/registry.generated";

export { registry };
export type { RegistryEntry };

export const byId = new Map(registry.map((e) => [e.id, e]));

export interface CategoryGroup {
  key: string;
  label: string;
  group: "sections" | "animations";
  items: RegistryEntry[];
}

// Ordered category keys for the sections group (nice narrative order)
const SECTION_ORDER = [
  "navigation", "hero", "social-proof", "features", "how-it-works",
  "stats", "showcase", "comparison", "pricing", "cta", "faq",
  "about", "blog", "ecommerce", "contact", "auth", "profile",
  "waitlist", "download", "footer", "404",
];

export function buildCategories(): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();
  for (const e of registry) {
    const key = e.group === "animations" ? "animation" : e.category;
    if (!map.has(key)) {
      map.set(key, { key, label: e.categoryLabel, group: e.group, items: [] });
    }
    map.get(key)!.items.push(e);
  }
  const groups = [...map.values()];
  groups.sort((a, b) => {
    if (a.group !== b.group) return a.group === "sections" ? -1 : 1;
    const ai = SECTION_ORDER.indexOf(a.key);
    const bi = SECTION_ORDER.indexOf(b.key);
    if (ai === -1 && bi === -1) return a.key.localeCompare(b.key);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  return groups;
}

export function search(q: string): RegistryEntry[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return registry.filter(
    (e) =>
      e.name.toLowerCase().includes(t) ||
      e.categoryLabel.toLowerCase().includes(t) ||
      e.id.toLowerCase().includes(t),
  );
}

export const stats = {
  total: registry.length,
  sections: registry.filter((e) => e.group === "sections").length,
  animations: registry.filter((e) => e.group === "animations").length,
};
