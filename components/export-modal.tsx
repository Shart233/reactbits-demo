"use client";

import { useState } from "react";
import { X, Download, Copy, Check, FileCode, Package, Loader2 } from "lucide-react";
import { buildPageSource, usedDependencies } from "@/lib/export-codegen";
import { useModalA11y } from "@/lib/use-modal-a11y";

export function ExportModal({
  ids,
  onClose,
}: {
  ids: string[];
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"page" | "deps">("page");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [projectName, setProjectName] = useState("my-reactbits-site");
  const ref = useModalA11y(true, onClose);

  const pageSource = buildPageSource(ids);
  const deps = usedDependencies(ids);

  const copy = async () => {
    await navigator.clipboard.writeText(pageSource);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const download = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, name: projectName }),
      });
      if (!res.ok) throw new Error("导出失败");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectName}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(e instanceof Error ? e.message : "导出失败");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="导出项目"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-2xl"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3.5">
          <h2 className="text-sm font-semibold text-white">导出项目 · {ids.length} 个区块</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--muted)] hover:bg-white/5 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* project name + download */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-soft)] px-5 py-3">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value.replace(/[^a-zA-Z0-9-_]/g, "-"))}
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm text-white outline-none focus:border-[var(--accent)]"
            placeholder="项目名"
          />
          <button
            onClick={download}
            disabled={downloading || ids.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
            下载 .zip
          </button>
        </div>

        {/* tabs */}
        <div className="flex gap-1 border-b border-[var(--border)] px-3 pt-2">
          <TabBtn active={tab === "page"} onClick={() => setTab("page")} icon={<FileCode size={14} />} label="app/page.tsx" />
          <TabBtn active={tab === "deps"} onClick={() => setTab("deps")} icon={<Package size={14} />} label={`依赖 (${deps.length})`} />
        </div>

        {/* body */}
        <div className="flex-1 overflow-auto p-4">
          {tab === "page" ? (
            <div className="relative">
              <button
                onClick={copy}
                className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel)] px-2.5 py-1.5 text-xs text-[var(--muted)] hover:text-white"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? "已复制" : "复制"}
              </button>
              <pre className="overflow-auto rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-xs leading-relaxed text-[var(--text)]">
                <code>{pageSource}</code>
              </pre>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-[var(--muted-2)]">
                导出的 zip 内含完整可运行项目（含这些依赖的 package.json、所有选中区块源码、Tailwind 配置）。
              </p>
              {deps.length === 0 ? (
                <p className="text-sm text-[var(--muted)]">仅用到 React，无额外依赖。</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {deps.map((d) => (
                    <span key={d} className="rounded-lg border border-[var(--border)] bg-[var(--bg)] px-2.5 py-1 text-xs text-[var(--accent-2)]">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-xs font-medium transition-colors ${
        active ? "bg-[var(--bg)] text-white" : "text-[var(--muted)] hover:text-white"
      }`}
    >
      {icon} {label}
    </button>
  );
}
