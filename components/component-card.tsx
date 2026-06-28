"use client";

import { Check, Plus, Eye, Box } from "lucide-react";
import type { RegistryEntry } from "@/lib/registry";
import { useBuilder } from "@/lib/store";
import { LazyPreview } from "./live-preview";

export function ComponentCard({
  entry,
  onOpen,
}: {
  entry: RegistryEntry;
  onOpen: (entry: RegistryEntry) => void;
}) {
  const add = useBuilder((s) => s.add);
  const hasHydrated = useBuilder((s) => s.hasHydrated);
  const present = useBuilder((s) => s.items.some((i) => i.id === entry.id));
  const inCanvas = hasHydrated && present;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] transition-colors hover:border-[var(--accent)]/50">
      {/* Preview viewport — scaled down so wide sections fit */}
      <div className="relative h-[260px] overflow-hidden border-b border-[var(--border)] bg-[var(--bg-soft)]">
        <div
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
        >
          <LazyPreview id={entry.id} minHeight={520} />
        </div>

        {/* badges */}
        <div className="absolute left-2 top-2 flex gap-1">
          {entry.heavy && (
            <span className="inline-flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-[var(--accent-2)] backdrop-blur">
              <Box size={10} /> 3D
            </span>
          )}
        </div>

        {/* hover actions */}
        <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onOpen(entry)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <Eye size={14} /> 预览
          </button>
          <button
            onClick={() => add(entry.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              inCanvas
                ? "bg-[var(--accent-2)] text-black"
                : "bg-[var(--accent)] text-white hover:opacity-90"
            }`}
          >
            {inCanvas ? <Check size={14} /> : <Plus size={14} />}
            {inCanvas ? "已添加" : "添加"}
          </button>
        </div>
      </div>

      {/* meta */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text)]">{entry.name}</p>
          <p className="truncate text-[11px] text-[var(--muted-2)]">{entry.categoryLabel}</p>
        </div>
        <button
          onClick={() => add(entry.id)}
          aria-label="添加到画布"
          className={`shrink-0 rounded-lg p-1.5 transition-colors ${
            inCanvas
              ? "text-[var(--accent-2)]"
              : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
          }`}
        >
          {inCanvas ? <Check size={16} /> : <Plus size={16} />}
        </button>
      </div>
    </div>
  );
}
