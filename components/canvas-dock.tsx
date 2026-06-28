"use client";

import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import { useBuilder } from "@/lib/store";

export function CanvasDock() {
  const count = useBuilder((s) => s.items.length);
  const hasHydrated = useBuilder((s) => s.hasHydrated);
  if (!hasHydrated || count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rb-fade-up">
      <Link
        href="/builder"
        className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--panel)]/90 py-2 pl-4 pr-2 shadow-2xl backdrop-blur-xl rb-glow"
      >
        <Layers size={16} className="text-[var(--accent)]" />
        <span className="text-sm font-medium text-white">
          画布已选 <span className="text-[var(--accent-2)]">{count}</span> 个区块
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white">
          去拼装 <ArrowRight size={14} />
        </span>
      </Link>
    </div>
  );
}
