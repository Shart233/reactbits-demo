"use client";

import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { buildCategories, registry } from "@/lib/registry";
import { useBuilder } from "@/lib/store";
import { useModalA11y } from "@/lib/use-modal-a11y";
import { LazyPreview } from "./live-preview";

const categories = buildCategories();

export function AddDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(categories[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const add = useBuilder((s) => s.add);
  const ref = useModalA11y(open, onClose);

  const q = query.trim().toLowerCase();
  const list = useMemo(() => {
    if (q) {
      return registry.filter(
        (e) => e.name.toLowerCase().includes(q) || e.categoryLabel.toLowerCase().includes(q),
      );
    }
    return categories.find((c) => c.key === active)?.items ?? [];
  }, [q, active]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="添加区块到画布"
        className="flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--panel)] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <h3 className="text-sm font-semibold text-white">添加区块到画布</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-white/5 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-[var(--border)] p-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-2)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索…"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-[var(--accent)]"
            />
          </div>
          {!q && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`rounded-full px-2.5 py-1 text-[11px] transition-colors ${
                    active === c.key ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-soft)] text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-3">
          {list.map((entry) => (
            <button
              key={entry.id}
              onClick={() => add(entry.id)}
              className="group relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] text-left transition-colors hover:border-[var(--accent)]"
            >
              <div className="relative h-28 overflow-hidden border-b border-[var(--border)]">
                <div className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{ width: "300%", height: "300%", transform: "scale(0.333)" }}>
                  <LazyPreview id={entry.id} minHeight={340} />
                </div>
                <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-white">
                    <Plus size={13} /> 添加
                  </span>
                </div>
              </div>
              <p className="truncate px-2 py-1.5 text-[11px] text-[var(--muted)]">{entry.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
