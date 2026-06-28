"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { Plus, Download, Trash2, Monitor, Tablet, Smartphone, Layers } from "lucide-react";
import { useBuilder } from "@/lib/store";
import { NavBar } from "@/components/nav-bar";
import { SortableBlock } from "@/components/sortable-block";
import { AddDrawer } from "@/components/add-drawer";
import { ExportModal } from "@/components/export-modal";

const WIDTHS = { desktop: "100%", tablet: "820px", mobile: "390px" } as const;
type Device = keyof typeof WIDTHS;

export default function BuilderPage() {
  const storeItems = useBuilder((s) => s.items);
  const hasHydrated = useBuilder((s) => s.hasHydrated);
  const remove = useBuilder((s) => s.remove);
  const clear = useBuilder((s) => s.clear);
  const reorder = useBuilder((s) => s.reorder);

  // Until the persisted store hydrates on the client, render the same empty
  // state the server produced — prevents a hydration mismatch.
  const items = hasHydrated ? storeItems : [];

  const [device, setDevice] = useState<Device>("desktop");
  const [drawer, setDrawer] = useState(false);
  const [exporting, setExporting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.uid === active.id);
    const to = items.findIndex((i) => i.uid === over.id);
    if (from !== -1 && to !== -1) reorder(from, to);
  };

  const ids = items.map((i) => i.id);

  return (
    <div className="flex h-screen flex-col">
      <NavBar />

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--panel)] px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Layers size={15} className="text-[var(--accent)]" />
          <span>
            <span className="font-semibold text-white">{items.length}</span> 个区块
          </span>
        </div>

        {/* device switch */}
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
                <Icon size={15} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawer(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-1.5 text-sm text-white transition-colors hover:border-[var(--accent)]"
          >
            <Plus size={15} /> 添加区块
          </button>
          {items.length > 0 && (
            <button
              onClick={() => {
                if (confirm("清空画布？")) clear();
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)] transition-colors hover:text-red-400"
            >
              <Trash2 size={15} /> 清空
            </button>
          )}
          <button
            onClick={() => setExporting(true)}
            disabled={items.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Download size={15} /> 导出
          </button>
        </div>
      </div>

      {/* Canvas stage */}
      <div className="flex-1 overflow-auto bg-[var(--bg-soft)] rb-grid-bg p-4">
        {items.length === 0 ? (
          <div className="grid h-full place-items-center">
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
                <Layers size={24} className="text-[var(--accent)]" />
              </div>
              <h2 className="text-lg font-semibold text-white">画布是空的</h2>
              <p className="mt-1 max-w-sm text-sm text-[var(--muted)]">
                从右侧抽屉添加区块，或去「浏览组件」挑选，再回来拖拽排序拼成完整页面。
              </p>
              <button
                onClick={() => setDrawer(true)}
                className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                <Plus size={15} /> 添加第一个区块
              </button>
            </div>
          </div>
        ) : (
          <div
            className="mx-auto overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-2xl transition-all dark:bg-[var(--bg)]"
            style={{ width: WIDTHS[device], maxWidth: "100%" }}
          >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={items.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                {items.map((item, i) => (
                  <SortableBlock
                    key={item.uid}
                    uid={item.uid}
                    id={item.id}
                    index={i}
                    total={items.length}
                    onRemove={remove}
                    onMove={reorder}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      <AddDrawer open={drawer} onClose={() => setDrawer(false)} />
      {exporting && <ExportModal ids={ids} onClose={() => setExporting(false)} />}
    </div>
  );
}
