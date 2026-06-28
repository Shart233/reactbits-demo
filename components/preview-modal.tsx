"use client";

import { useState } from "react";
import { X, Monitor, Tablet, Smartphone, Plus, Check } from "lucide-react";
import type { RegistryEntry } from "@/lib/registry";
import { useBuilder } from "@/lib/store";
import { useModalA11y } from "@/lib/use-modal-a11y";
import { LiveComponent } from "./live-preview";

const WIDTHS = { desktop: "100%", tablet: "768px", mobile: "390px" } as const;
type Device = keyof typeof WIDTHS;

export function PreviewModal({
  entry,
  onClose,
}: {
  entry: RegistryEntry | null;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<Device>("desktop");
  const add = useBuilder((s) => s.add);
  const inCanvas = useBuilder((s) => (entry ? s.items.some((i) => i.id === entry.id) : false));
  const ref = useModalA11y(!!entry, onClose);

  if (!entry) return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`预览 ${entry.name}`}
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
    >
      {/* toolbar */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--panel)] px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{entry.name}</p>
          <p className="truncate text-[11px] text-[var(--muted-2)]">
            {entry.categoryLabel} · {entry.deps.join(", ") || "无外部依赖"}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] p-1">
          {(Object.keys(WIDTHS) as Device[]).map((d) => {
            const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
            return (
              <button
                key={d}
                onClick={() => setDevice(d)}
                className={`rounded-md p-1.5 transition-colors ${
                  device === d ? "bg-[var(--accent)] text-white" : "text-[var(--muted)] hover:text-white"
                }`}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => add(entry.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              inCanvas ? "bg-[var(--accent-2)] text-black" : "bg-[var(--accent)] text-white hover:opacity-90"
            }`}
          >
            {inCanvas ? <Check size={14} /> : <Plus size={14} />}
            {inCanvas ? "已添加" : "添加到画布"}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* stage */}
      <div className="flex-1 overflow-auto bg-[var(--bg-soft)] p-4">
        <div
          className="mx-auto overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all dark:bg-[var(--bg)]"
          style={{ width: WIDTHS[device], maxWidth: "100%" }}
        >
          <LiveComponent id={entry.id} />
        </div>
      </div>
    </div>
  );
}
