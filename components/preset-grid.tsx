"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Layers } from "lucide-react";
import { presets } from "@/lib/presets";
import { byId } from "@/lib/registry";
import { useBuilder } from "@/lib/store";
import { LazyPreview } from "./live-preview";

export function PresetGrid() {
  const router = useRouter();
  const setItems = useBuilder((s) => s.setItems);

  const use = (ids: string[]) => {
    setItems(ids);
    router.push("/builder");
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {presets.map((p) => {
        const previewId =
          (p.coverId && byId.has(p.coverId) ? p.coverId : undefined) ??
          p.blockIds.find((id) => {
            const e = byId.get(id);
            return e && id.includes("hero");
          }) ??
          p.blockIds[0];
        return (
          <div
            key={p.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] transition-all hover:border-[var(--accent)]/50 hover:shadow-2xl"
          >
            {/* preview */}
            <div className="relative h-44 overflow-hidden border-b border-[var(--border)] bg-[var(--bg-soft)]">
              <div
                className="pointer-events-none absolute left-0 top-0 origin-top-left"
                style={{
                  width: "250%",
                  height: "250%",
                  transform: "scale(0.4)",
                }}
              >
                <LazyPreview id={previewId} minHeight={440} />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{
                  background: `linear-gradient(to top, ${p.accent}22, transparent)`,
                }}
              />
              <span
                className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold text-black"
                style={{ background: p.accent }}
              >
                <Layers size={10} /> {p.blockIds.length} 区块
              </span>
            </div>

            {/* meta */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-base font-semibold text-white">{p.name}</h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-[var(--muted)]">
                {p.tagline}
              </p>
              <button
                onClick={() => use(p.blockIds)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: p.accent }}
              >
                一键采用 <ArrowRight size={15} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
