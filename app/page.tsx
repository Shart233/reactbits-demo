import Link from "next/link";
import { ArrowRight, Blocks, MousePointerClick, Package, Sparkles } from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { PresetGrid } from "@/components/preset-grid";
import { stats } from "@/lib/registry";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 rb-grid-bg opacity-40" />
        <div
          className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, #7c5cff, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)]/60 px-3 py-1 text-xs text-[var(--muted)] backdrop-blur">
            <Sparkles size={13} className="text-[var(--accent)]" />
            {stats.total} 个组件 · {stats.sections} 区块 · {stats.animations} 动画
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="rb-text-gradient">挑选、拼装、导出</span>
            <br />
            你的下一个落地页
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-[var(--muted)] sm:text-lg">
            浏览全部 React 区块与动画组件，实时预览、拖拽拼装成完整页面，
            一键导出为可运行的 Next.js 项目。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              开始浏览组件 <ArrowRight size={16} />
            </Link>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[var(--accent)]"
            >
              打开拼装画布
            </Link>
          </div>
        </div>
      </section>

      {/* Presets */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">预设模板</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              精选区块组合，一键载入画布，再自由增删排序。
            </p>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1 text-sm text-[var(--accent)] hover:underline sm:inline-flex"
          >
            或从零开始 <ArrowRight size={14} />
          </Link>
        </div>
        <PresetGrid />
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold text-white">三步成页</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { icon: <Blocks size={20} />, title: "1 · 浏览挑选", desc: "按分类浏览 259 个组件，实时预览效果，点选加入画布。" },
              { icon: <MousePointerClick size={20} />, title: "2 · 拖拽拼装", desc: "在画布里拖拽排序，桌面/平板/手机多视图实时预览。" },
              { icon: <Package size={20} />, title: "3 · 一键导出", desc: "导出含源码、依赖、配置的完整 Next.js 项目，开箱即跑。" },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
                <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
                  {s.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-[var(--muted-2)]">
          ReactBits Playground · 由 reactbits-pro + reactbits-starter 聚合而成 · 仅供本地挑选与拼装
        </div>
      </footer>
    </div>
  );
}
