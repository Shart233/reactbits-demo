"use client";

import React, { useEffect, useRef, useState } from "react";
import { componentMap } from "@/registry/registry.dynamic";
import { ErrorBoundary } from "./error-boundary";

export function LiveComponent({ id }: { id: string }) {
  const Cmp = componentMap[id];
  if (!Cmp) {
    return (
      <div className="grid h-full place-items-center p-4 text-xs text-[var(--muted-2)]">
        未找到组件 {id}
      </div>
    );
  }
  return (
    <ErrorBoundary resetKey={id}>
      <Cmp />
    </ErrorBoundary>
  );
}

/**
 * Renders the real component only after it scrolls into view.
 * Keeps hundreds of (some 3D/canvas) components from mounting at once.
 */
export function LazyPreview({
  id,
  className,
  minHeight = 200,
}: {
  id: string;
  className?: string;
  minHeight?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {visible ? (
        <LiveComponent id={id} />
      ) : (
        <div className="rb-skeleton h-full w-full" style={{ minHeight }} />
      )}
    </div>
  );
}
