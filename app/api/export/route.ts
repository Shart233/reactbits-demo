import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import archiver from "archiver";
import { PassThrough } from "node:stream";
import { byId } from "@/lib/registry";
import { buildPageSource, buildPackageJson } from "@/lib/export-codegen";

export const runtime = "nodejs";

const COMP_DIR = path.join(process.cwd(), "registry", "components");

// Pull every @/registry/components/<x> reference out of a source file.
function refsIn(code: string): string[] {
  const out: string[] = [];
  const re = /@\/registry\/components\/([A-Za-z0-9_-]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) out.push(m[1]);
  return out;
}

// Resolve the transitive closure of component files needed by the selected ids.
async function collectFiles(ids: string[]): Promise<Map<string, string>> {
  const files = new Map<string, string>(); // exportId -> rewritten source
  const queue = [...new Set(ids)];

  while (queue.length) {
    const id = queue.shift()!;
    if (files.has(id)) continue;
    let code: string;
    try {
      code = await fs.readFile(path.join(COMP_DIR, `${id}.tsx`), "utf8");
    } catch {
      continue; // skip missing
    }
    // pull deps before rewriting
    for (const ref of refsIn(code)) {
      if (!files.has(ref)) queue.push(ref);
    }
    // rewrite registry import path -> exported project layout
    const rewritten = code.replace(
      /@\/registry\/components\//g,
      "@/components/blocks/",
    );
    files.set(id, rewritten);
  }
  return files;
}

const SCAFFOLD: Record<string, string> = {
  "next.config.ts": `import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
};
export default nextConfig;
`,
  "postcss.config.mjs": `const config = { plugins: ["@tailwindcss/postcss"] };
export default config;
`,
  "tsconfig.json": JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2,
  ),
  "next-env.d.ts": `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`,
  "lib/utils.ts": `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  "app/globals.css": `@import "tailwindcss";
@variant dark (&:where(.dark, .dark *));
:root { --background: #ffffff; --foreground: #0a0a0a; }
.dark { --background: #07070a; --foreground: #f4f4f6; }
body { background: var(--background); color: var(--foreground); -webkit-font-smoothing: antialiased; }
`,
  "app/layout.tsx": `import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "My ReactBits Site" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
`,
};

function readme(name: string, count: number) {
  return `# ${name}

由 ReactBits Playground 导出，包含 ${count} 个区块。

## 运行

\`\`\`bash
npm install
npm run dev
\`\`\`

打开 http://localhost:3000

## 结构
- \`app/page.tsx\` — 按你拼装的顺序组合所有区块
- \`components/blocks/\` — 各区块源码
- \`lib/utils.ts\` — cn() 工具
`;
}

export async function POST(req: NextRequest) {
  let ids: string[] = [];
  let name = "my-reactbits-site";
  try {
    const body = await req.json();
    ids = Array.isArray(body.ids) ? body.ids.filter((x: unknown) => typeof x === "string") : [];
    if (typeof body.name === "string" && body.name.trim()) {
      name = body.name.trim().replace(/[^a-zA-Z0-9-_]/g, "-");
    }
  } catch {
    return new Response(JSON.stringify({ error: "无效请求体" }), { status: 400 });
  }

  const valid = ids.filter((id) => byId.has(id));
  if (valid.length === 0) {
    return new Response(JSON.stringify({ error: "没有可导出的区块" }), { status: 400 });
  }

  const blocks = await collectFiles(valid);
  // Dependencies must cover the full file closure, not just the directly
  // selected blocks — a selected block may transitively import an animation
  // component that carries its own npm deps.
  const closureIds = [...blocks.keys()];

  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();
  archive.on("warning", (err) => {
    if ((err as { code?: string }).code !== "ENOENT") stream.destroy(err);
  });
  archive.on("error", (err) => stream.destroy(err));
  archive.pipe(stream);

  // scaffold
  for (const [p, contents] of Object.entries(SCAFFOLD)) {
    archive.append(contents, { name: `${name}/${p}` });
  }
  archive.append(buildPageSource(valid), { name: `${name}/app/page.tsx` });
  archive.append(buildPackageJson(closureIds, name), { name: `${name}/package.json` });
  archive.append(readme(name, valid.length), { name: `${name}/README.md` });
  archive.append("node_modules\n.next\n", { name: `${name}/.gitignore` });

  // block sources (full transitive closure)
  for (const [id, code] of blocks) {
    archive.append(code, { name: `${name}/components/blocks/${id}.tsx` });
  }

  void archive.finalize();

  // collect into a buffer (simplest reliable path on Next route handlers)
  const chunks: Buffer[] = [];
  try {
    for await (const chunk of stream) chunks.push(chunk as Buffer);
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "打包失败" }),
      { status: 500 },
    );
  }
  const buf = Buffer.concat(chunks);

  return new Response(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${name}.zip"`,
    },
  });
}
