// Inventory scan: walks the two source libraries, reports external deps + export shapes.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const PRO = path.join(ROOT, "reactbits-pro");
const STARTER_TW = path.join(ROOT, "reactbits-starter", "tw");
const STARTER_CSS = path.join(ROOT, "reactbits-starter", "css");

async function walk(dir, exts = [".tsx", ".ts"]) {
  const out = [];
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === "node_modules") continue;
      out.push(...(await walk(full, exts)));
    } else if (exts.includes(path.extname(e.name))) {
      out.push(full);
    }
  }
  return out;
}

function pkgName(spec) {
  if (spec.startsWith(".") || spec.startsWith("@/") || spec.startsWith("~/")) return null;
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
  return spec.split("/")[0];
}

function parseExports(code) {
  const named = [...code.matchAll(/export\s+(?:async\s+)?function\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
  const defFn = [...code.matchAll(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g)].map(m => m[1]);
  const defName = [...code.matchAll(/export\s+default\s+([A-Za-z0-9_]+)\s*;/g)].map(m => m[1]);
  const hasDefault = /export\s+default/.test(code);
  return { named, defFn, defName, hasDefault };
}

async function analyze(files) {
  const deps = new Map();
  const report = [];
  for (const f of files) {
    const code = await fs.readFile(f, "utf8");
    const specs = [
      ...[...code.matchAll(/from\s+["']([^"']+)["']/g)].map(m => m[1]),
      ...[...code.matchAll(/import\s+["']([^"']+)["']/g)].map(m => m[1]),
    ];
    for (const s of specs) {
      const p = pkgName(s);
      if (p) deps.set(p, (deps.get(p) || 0) + 1);
    }
    report.push({ file: f, ...parseExports(code) });
  }
  return { deps, report };
}

const proFiles = await walk(PRO);
const twFiles = await walk(STARTER_TW);
const cssFiles = await walk(STARTER_CSS);

const pro = await analyze(proFiles);
const tw = await analyze(twFiles);
const css = await analyze(cssFiles);

console.log("=== COUNTS ===");
console.log("pro:", proFiles.length, "| tw:", twFiles.length, "| css:", cssFiles.length);

const allDeps = new Map();
for (const m of [pro.deps, tw.deps, css.deps]) {
  for (const [k, v] of m) allDeps.set(k, (allDeps.get(k) || 0) + v);
}
console.log("\n=== EXTERNAL DEPS (union) ===");
console.log([...allDeps.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join("\n"));

const proDefault = pro.report.filter(r => r.hasDefault && r.named.length === 0).length;
const proNamed = pro.report.filter(r => r.named.length > 0).length;
console.log("\n=== PRO export shapes ===  named:", proNamed, " default-only:", proDefault);
for (const r of pro.report.slice(0, 5)) {
  console.log(" ", path.relative(PRO, r.file), "| named:", r.named.join(",") || "-", "| def:", r.defFn.join(",") || r.defName.join(",") || (r.hasDefault ? "(anon)" : "-"));
}

const twWithDefault = tw.report.filter(r => r.hasDefault).length;
console.log("\n=== TW export shapes === default:", twWithDefault, "/", tw.report.length);
for (const r of tw.report.slice(0, 4)) {
  console.log(" ", path.basename(r.file), "| named:", r.named.join(",") || "-", "| def:", r.defFn.join(",") || r.defName.join(",") || (r.hasDefault ? "(anon)" : "-"));
}

const cats = {};
for (const f of proFiles) {
  const c = path.basename(path.dirname(f));
  cats[c] = (cats[c] || 0) + 1;
}
console.log("\n=== PRO categories ===");
console.log(Object.entries(cats).sort().map(([k, v]) => `${k}(${v})`).join(", "));
