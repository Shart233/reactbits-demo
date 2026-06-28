# ReactBits Playground

一个组件挑选 + 页面拼装 Demo：浏览 **259 个组件**（158 区块 + 101 动画），实时预览、拖拽拼装成完整页面，一键导出为可运行的 Next.js 项目。

聚合自同仓库的 `reactbits-pro`（页面区块）与 `reactbits-starter`（动画组件）。

## 启动

```bash
cd reactbits-demo
npm install
npm run dev
```

打开 http://localhost:3000

> `predev` / `prebuild` 会自动运行 `scripts/generate-registry.mjs` 重建组件注册表，无需手动执行。

## 页面

| 路由 | 作用 |
|------|------|
| `/` | 首页 · 5 套预设模板「一键采用」 |
| `/browse` | 按分类浏览全部组件，实时预览、搜索、加入画布 |
| `/builder` | 拖拽排序拼装、多设备预览、导出 |

## 工作原理

1. **注册表生成** (`scripts/generate-registry.mjs`)
   扫描 `reactbits-pro` 与 `reactbits-starter/tw`，把源文件复制进 `registry/components/`，
   生成 `registry.generated.ts`（元数据）和 `registry.dynamic.ts`（懒加载 import 映射）。
   自动处理具名/默认导出差异，并重写 pro→starter 的跨库别名引用。

2. **预览** (`components/live-preview.tsx`)
   IntersectionObserver 懒加载 + ErrorBoundary 兜底——259 个组件（含 70 个 3D/canvas）
   不会同时挂载拖垮页面，单个组件报错也不会崩整页。

3. **导出** (`app/api/export/route.ts`)
   计算选中区块的**传递依赖闭包**（如 auth 区块引用的动画组件会一并打包），
   用 archiver 生成含源码、`package.json`（精确依赖子集）、配置的完整 Next.js 项目 zip。

## 重新生成注册表

源库有增删时：

```bash
npm run registry
```
