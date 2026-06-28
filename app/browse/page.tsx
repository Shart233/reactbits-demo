"use client";

import { useMemo, useState } from "react";
import { Search, Sparkles, Layout, X } from "lucide-react";
import { buildCategories, registry, type RegistryEntry } from "@/lib/registry";
import { ComponentCard } from "@/components/component-card";
import { PreviewModal } from "@/components/preview-modal";
import { NavBar } from "@/components/nav-bar";
import { CanvasDock } from "@/components/canvas-dock";

const categories = buildCategories();

export default function BrowsePage() {
  const [active, setActive] = useState<string>(categories[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<RegistryEntry | null>(null);

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    if (q) {
      return registry.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.categoryLabel.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q),
      );
    }
    return categories.find((c) => c.key === active)?.items ?? [];
  }, [q, active]);

  const sections = categories.filter((c) => c.group === "sections");
  const animations = categories.filter((c) => c.group === "animations");

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-[var(--border)] px-3 py-4 lg:block">
          <SidebarGroup
            icon={<Layout size={13} />}
            label="页面区块"
            cats={sections}
            active={active}
            onPick={(k) => {
              setActive(k);
              setQuery("");
            }}
          />
          <SidebarGroup
            icon={<Sparkles size={13} />}
            label="动画组件"
            cats={animations}
            active={active}
            onPick={(k) => {
              setActive(k);
              setQuery("");
            }}
          />
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6">
          {/* Search */}
          <div className="relative mb-5">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-2)]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索全部 259 个组件…"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--panel)] py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-colors placeholder:text-[var(--muted-2)] focus:border-[var(--accent)]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-2)] hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Heading */}
          <div className="mb-4 flex items-baseline justify-between">
            <h1 className="text-lg font-semibold text-white">
              {q
                ? `搜索 “${query}”`
                : categories.find((c) => c.key === active)?.label ?? ""}
            </h1>
            <span className="text-xs text-[var(--muted-2)]">{visible.length} 个组件</span>
          </div>

          {/* Grid */}
          {visible.length === 0 ? (
            <p className="py-20 text-center text-sm text-[var(--muted-2)]">没有匹配的组件</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((entry) => (
                <ComponentCard key={entry.id} entry={entry} onOpen={setPreview} />
              ))}
            </div>
          )}
        </main>
      </div>

      <PreviewModal entry={preview} onClose={() => setPreview(null)} />
      <CanvasDock />
    </div>
  );
}

function SidebarGroup({
  icon,
  label,
  cats,
  active,
  onPick,
}: {
  icon: React.ReactNode;
  label: string;
  cats: ReturnType<typeof buildCategories>;
  active: string;
  onPick: (key: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 flex items-center gap-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-2)]">
        {icon} {label}
      </p>
      <ul className="space-y-0.5">
        {cats.map((c) => (
          <li key={c.key}>
            <button
              onClick={() => onPick(c.key)}
              className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors ${
                active === c.key
                  ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                  : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="truncate">{c.label}</span>
              <span className="ml-2 shrink-0 text-[11px] text-[var(--muted-2)]">
                {c.items.length}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
