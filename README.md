# ReactBits Playground

> 浏览 **259 个 React 组件**（158 个页面区块 + 101 个动画），实时预览、拖拽拼装成完整页面，一键导出为可运行的 Next.js 项目。

一个组件挑选与页面拼装工具：像翻图册一样浏览所有组件，勾选喜欢的，在画布上拖拽排序拼成一个落地页，然后导出一个开箱即跑的 Next.js 工程。

技术栈：**Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Turbopack**

---

## ✨ 特性

- 🗂️ **259 个组件** — 21 类页面区块（hero / pricing / features / footer …）+ 101 个动画组件，分类浏览、全文搜索
- 👁️ **实时预览** — 每个组件真实渲染（含 70 个 3D/Canvas 组件），IntersectionObserver 懒加载 + ErrorBoundary 兜底，不卡页、不崩页
- 🧩 **拖拽拼装** — dnd-kit 排序，桌面 / 平板 / 手机多设备实时预览
- 🎨 **5 套预设模板** — SaaS / Startup / Agency / 产品营销 / 极简单页，一键载入画布再自由增删
- 📦 **一键导出** — 生成含源码、精确依赖、配置的完整 Next.js 工程 zip，`npm install && npm run dev` 即可运行
- 🌙 **暗色优先** UI，玻璃质感设计

---

## 🚀 快速开始

```bash
git clone https://github.com/Shart233/reactbits-demo.git
cd reactbits-demo
npm install
npm run dev
```

打开 http://localhost:3000

> `predev` / `prebuild` 会自动运行 `scripts/generate-registry.mjs` 重建组件注册表，无需手动执行。

## 📄 页面

| 路由 | 作用 |
|------|------|
| `/` | 首页 · 5 套预设模板「一键采用」 |
| `/browse` | 按分类浏览全部组件，实时预览、搜索、加入画布 |
| `/builder` | 拖拽排序拼装、多设备预览、导出 |

## 🛠️ 工作原理

1. **注册表生成** — `scripts/generate-registry.mjs`
   扫描组件源库，把源文件复制进 `registry/components/`，生成 `registry.generated.ts`（元数据）
   和 `registry.dynamic.ts`（懒加载 import 映射）。自动处理具名/默认导出差异、识别动态
   `import()` 依赖，并重写跨库别名引用。

2. **预览** — `components/live-preview.tsx`
   `IntersectionObserver` 进入视口才挂载真实组件，`ErrorBoundary` 隔离单个组件的渲染错误。
   259 个组件不会同时挂载拖垮页面，单个报错也不会崩整页。

3. **状态** — `lib/store.ts`（zustand + persist）
   画布选择持久化到 localStorage；用 `skipHydration` + 手动注水门控，避免 SSR hydration mismatch。

4. **导出** — `app/api/export/route.ts`
   计算选中区块的**传递依赖闭包**（被间接引用的动画组件会一并打包），用 archiver 生成含源码、
   `package.json`（精确依赖子集）、配置的完整 Next.js 工程 zip。

## 📁 项目结构

```
app/
  page.tsx            首页 + 预设模板
  browse/page.tsx     组件浏览
  builder/page.tsx    拼装画布
  api/export/route.ts 导出 API（zip）
components/            UI 组件（卡片、抽屉、浮层、预览渲染器…）
lib/
  store.ts            zustand 画布状态
  registry.ts         注册表查询封装
  export-codegen.ts   page.tsx / package.json 生成
  use-modal-a11y.ts   浮层无障碍（Escape / 焦点陷阱）
registry/
  components/          扫描复制进来的组件源码
  registry.generated.ts / registry.dynamic.ts  自动生成
scripts/
  generate-registry.mjs  注册表生成器
```

## 📜 脚本

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动开发服务器（自动重建注册表） |
| `npm run build` | 生产构建 |
| `npm run registry` | 手动重新生成组件注册表 |

## 🙏 致谢与授权

本项目是一个**演示/工具**。`registry/components/` 下的组件源码来自第三方组件库
（ReactBits Pro 页面区块 + ReactBits Starter 动画组件），版权归原作者所有；本仓库中的
浏览/拼装/导出工具代码（`app/`、`components/`、`lib/`、`scripts/`）为本项目原创。

如需将这些组件用于商业项目，请遵循其各自的原始授权条款。

---

由 [Claude Code](https://claude.com/claude-code) 协助构建。
