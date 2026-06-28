"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { byId } from "@/lib/registry";
import { LiveComponent } from "./live-preview";

export function SortableBlock({
  uid,
  id,
  index,
  total,
  onRemove,
  onMove,
}: {
  uid: string;
  id: string;
  index: number;
  total: number;
  onRemove: (uid: string) => void;
  onMove: (from: number, to: number) => void;
}) {
  const entry = byId.get(id);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group/block relative border-b border-dashed border-transparent hover:border-[var(--accent)]/40"
    >
      {/* Floating control rail */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--panel)]/95 p-1 opacity-0 shadow-xl backdrop-blur transition-opacity group-hover/block:opacity-100">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab rounded p-1.5 text-[var(--muted)] hover:bg-white/10 hover:text-white active:cursor-grabbing"
          title="拖拽排序"
        >
          <GripVertical size={15} />
        </button>
        <span className="max-w-[140px] truncate px-1 text-xs text-[var(--muted)]">
          {entry?.name ?? id}
        </span>
        <button
          onClick={() => onMove(index, Math.max(0, index - 1))}
          disabled={index === 0}
          className="rounded p-1.5 text-[var(--muted)] hover:bg-white/10 hover:text-white disabled:opacity-30"
          title="上移"
        >
          <ChevronUp size={15} />
        </button>
        <button
          onClick={() => onMove(index, Math.min(total - 1, index + 1))}
          disabled={index === total - 1}
          className="rounded p-1.5 text-[var(--muted)] hover:bg-white/10 hover:text-white disabled:opacity-30"
          title="下移"
        >
          <ChevronDown size={15} />
        </button>
        <button
          onClick={() => onRemove(uid)}
          className="rounded p-1.5 text-red-400 hover:bg-red-500/15"
          title="删除"
        >
          <Trash2 size={15} />
        </button>
      </div>

      {/* The actual block */}
      <div className="pointer-events-none">
        <LiveComponent id={id} />
      </div>
    </div>
  );
}
