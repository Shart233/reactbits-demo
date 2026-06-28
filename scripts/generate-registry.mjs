// Generates the demo component registry from reactbits-pro + reactbits-starter/tw.
// - copies each source .tsx into registry/<group>/<id>.tsx
// - parses export name + shape (named vs default)
// - emits registry.generated.ts (data) + registry.dynamic.ts (lazy import map)
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEMO = path.resolve(__dirname, "..");
const ROOT = path.resolve(DEMO, "..");
const PRO = path.join(ROOT, "reactbits-pro");
const TW = path.join(ROOT, "reactbits-starter", "tw");
const OUT = path.join(DEMO, "registry");

const HEAVY_DEPS = ["three", "@react-three/fiber", "@react-three/drei", "@react-three/postprocessing", "ogl", "matter-js"];

// Human labels for pro categories
const CATEGORY_LABELS = {
  "404": "404 页面", about: "关于", auth: "登录注册", blog: "博客",
  comparison: "对比", contact: "联系", cta: "行动号召", download: "下载",
  ecommerce: "电商", faq: "常见问题", features: "功能特性", footer: "页脚",
  hero: "英雄区", "how-it-works": "工作流程", navigation: "导航",
  pricing: "价格", profile: "个人资料", showcase: "案例展示",
  "social-proof": "社会证明", stats: "数据统计", waitlist: "等候名单",
};

async function walk(dir, exts = [".tsx"]) {
  const out = [];
  let entries = [];
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === "node_modules") continue;
      out.push(...(await walk(full, exts)));
    } else if (exts.includes(path.extname(e.name))) out.push(full);
  }
  return out;
}

function pkgName(spec) {
  if (spec.startsWith(".") || spec.startsWith("@/") || spec.startsWith("~/")) return null;
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
  return spec.split("/")[0];
}

function parseExport(code) {
  let m = code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  if (m) return { exportName: m[1], isDefault: true };
  m = code.match(/export\s+default\s+([A-Za-z0-9_]+)\s*;/);
  if (m) return { exportName: m[1], isDefault: true };
  m = code.match(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/);
  if (m) return { exportName: m[1], isDefault: false };
  m = code.match(/export\s+const\s+([A-Za-z0-9_]+)/);
  if (m) return { exportName: m[1], isDefault: false };
  if (/export\s+default/.test(code)) return { exportName: "default", isDefault: true };
  return null;
}

function depsOf(code) {
  const specs = [
    ...[...code.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...code.matchAll(/import\s+["']([^"']+)["']/g)].map((m) => m[1]),
    ...[...code.matchAll(/import\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
    ...[...code.matchAll(/require\s*\(\s*["']([^"']+)["']\s*\)/g)].map((m) => m[1]),
  ];
  const set = new Set();
  for (const s of specs) {
    const p = pkgName(s);
    if (p && p !== "react" && p !== "react-dom") set.add(p);
  }
  return [...set];
}

function titleFromId(id) {
  return id.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function build() {
  const entries = [];

  // --- reactbits-pro: grouped by category folder ---
  const proFiles = await walk(PRO);
  for (const f of proFiles) {
    const category = path.basename(path.dirname(f));
    if (!(category in CATEGORY_LABELS)) continue; // skip stray files
    const base = path.basename(f, ".tsx");
    const code = await fs.readFile(f, "utf8");
    const exp = parseExport(code);
    if (!exp) continue;
    const id = `pro-${category}-${base}`.toLowerCase();
    const deps = depsOf(code);
    entries.push({
      id,
      name: titleFromId(base),
      group: "sections",
      category,
      categoryLabel: CATEGORY_LABELS[category],
      file: `${id}.tsx`,
      exportName: exp.exportName,
      isDefault: exp.isDefault,
      deps,
      heavy: deps.some((d) => HEAVY_DEPS.includes(d)),
      source: path.relative(ROOT, f).replace(/\\/g, "/"),
    });
  }

  // --- reactbits-starter/tw: animations (flat) ---
  const twFiles = await walk(TW);
  for (const f of twFiles) {
    const base = path.basename(f, ".tsx");
    const code = await fs.readFile(f, "utf8");
    const exp = parseExport(code);
    if (!exp) continue;
    const id = `anim-${base}`.toLowerCase();
    const deps = depsOf(code);
    entries.push({
      id,
      name: titleFromId(base),
      group: "animations",
      category: "animation",
      categoryLabel: "动画组件",
      file: `${id}.tsx`,
      exportName: exp.exportName,
      isDefault: exp.isDefault,
      deps,
      heavy: deps.some((d) => HEAVY_DEPS.includes(d)),
      source: path.relative(ROOT, f).replace(/\\/g, "/"),
    });
  }

  // --- copy source files into registry/components/ ---
  const COMP_DIR = path.join(OUT, "components");
  await fs.rm(COMP_DIR, { recursive: true, force: true });
  await fs.mkdir(COMP_DIR, { recursive: true });
  const validIds = new Set(entries.map((e) => e.id));
  let rewriteWarnings = 0;
  for (const e of entries) {
    const srcAbs = path.join(ROOT, e.source);
    let code = await fs.readFile(srcAbs, "utf8");
    // demo provides @/lib/utils, so @/lib/utils imports already resolve. leave as-is.
    // Rewrite cross-library aliases (pro blocks importing starter animations),
    // e.g. "@/ts-tailwind/components/flicker/flicker" -> "@/registry/components/anim-flicker".
    // The registry id derives from the FILE name (last segment), not the directory,
    // so capture the final path segment.
    code = code.replace(
      /(["'])@\/[A-Za-z0-9_-]+\/components\/(?:[A-Za-z0-9_-]+\/)*([A-Za-z0-9_-]+)(?:\.[a-z]+)?\1/g,
      (_m, q, file) => {
        const target = `anim-${file.toLowerCase()}`;
        if (!validIds.has(target)) {
          console.warn(`  ! ${e.id}: cross-lib import -> ${target} (no such component)`);
          rewriteWarnings++;
        }
        return `${q}@/registry/components/${target}${q}`;
      },
    );
    await fs.writeFile(path.join(COMP_DIR, e.file), code, "utf8");
  }

  // --- emit registry.generated.ts ---
  const dataTs =
    `// AUTO-GENERATED by scripts/generate-registry.mjs — do not edit.\n` +
    `export interface RegistryEntry {\n` +
    `  id: string;\n  name: string;\n  group: "sections" | "animations";\n` +
    `  category: string;\n  categoryLabel: string;\n  file: string;\n` +
    `  exportName: string;\n  isDefault: boolean;\n  deps: string[];\n` +
    `  heavy: boolean;\n  source: string;\n}\n\n` +
    `export const registry: RegistryEntry[] = ${JSON.stringify(entries, null, 2)};\n`;
  await fs.writeFile(path.join(OUT, "registry.generated.ts"), dataTs, "utf8");

  // --- emit registry.dynamic.ts (explicit lazy import map) ---
  let dyn =
    `// AUTO-GENERATED by scripts/generate-registry.mjs — do not edit.\n` +
    `import dynamic from "next/dynamic";\n` +
    `import type { ComponentType } from "react";\n\n` +
    `export const componentMap: Record<string, ComponentType<Record<string, never>>> = {\n`;
  for (const e of entries) {
    const imp = e.isDefault
      ? `import("@/registry/components/${e.file.replace(/\.tsx$/, "")}")`
      : `import("@/registry/components/${e.file.replace(/\.tsx$/, "")}").then((m) => ({ default: m.${e.exportName} }))`;
    dyn += `  "${e.id}": dynamic(() => ${imp}, { ssr: false }),\n`;
  }
  dyn += `};\n`;
  await fs.writeFile(path.join(OUT, "registry.dynamic.ts"), dyn, "utf8");

  // summary
  const byGroup = entries.reduce((a, e) => ((a[e.group] = (a[e.group] || 0) + 1), a), {});
  const heavy = entries.filter((e) => e.heavy).length;
  console.log("Registry generated:", entries.length, "components");
  console.log("  by group:", JSON.stringify(byGroup));
  console.log("  heavy (3D/canvas):", heavy);
  if (rewriteWarnings > 0) console.warn(`  cross-lib rewrite warnings: ${rewriteWarnings}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
