import type { Metadata } from "next";
import "./globals.css";
import { HydrationGate } from "@/components/hydration-gate";

export const metadata: Metadata = {
  title: "ReactBits Playground — 挑选 · 拼装 · 导出",
  description:
    "浏览 259+ React 区块与动画组件，实时预览、拖拽拼装成完整页面，一键导出可运行项目。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen antialiased">
        <HydrationGate />
        {children}
      </body>
    </html>
  );
}
