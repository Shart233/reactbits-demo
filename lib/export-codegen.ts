import { byId, type RegistryEntry } from "@/lib/registry";

const BASE_DEPS: Record<string, string> = {
  next: "16.1.1",
  react: "19.2.3",
  "react-dom": "19.2.3",
  clsx: "^2.1.1",
  "tailwind-merge": "^2.6.0",
  "next-themes": "^0.4.6",
};

const DEP_VERSIONS: Record<string, string> = {
  motion: "^12.38.0",
  "lucide-react": "^0.562.0",
  "next-themes": "^0.4.6",
  lenis: "^1.3.23",
  three: "^0.185.0",
  "@react-three/fiber": "^9.6.1",
  "@react-three/drei": "^10.7.7",
  "@react-three/postprocessing": "^3.0.4",
  ogl: "^1.0.11",
  gsap: "^3.15.0",
  "@gsap/react": "^2.1.2",
  "matter-js": "^0.20.0",
};

export interface ExportFile {
  path: string;
  contents: string;
}

function importName(entry: RegistryEntry, local: string) {
  return entry.isDefault
    ? `import ${local} from "@/components/blocks/${entry.id}";`
    : `import { ${entry.exportName} as ${local} } from "@/components/blocks/${entry.id}";`;
}

/** Build the page.tsx that composes the selected blocks in order. */
export function buildPageSource(ids: string[]): string {
  const entries = ids.map((id) => byId.get(id)).filter(Boolean) as RegistryEntry[];
  const locals = entries.map((e, i) => `Block${i + 1}`);
  const imports = entries.map((e, i) => importName(e, locals[i])).join("\n");
  const body = entries.map((_, i) => `      <${locals[i]} />`).join("\n");

  return `import { ThemeProvider } from "next-themes";
${imports}

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen">
${body || "      {/* 还没有选择任何区块 */}"}
      </main>
    </ThemeProvider>
  );
}
`;
}

/** Compute the package.json dependency subset for the selected blocks. */
export function buildPackageJson(ids: string[], name = "my-reactbits-site"): string {
  const entries = ids.map((id) => byId.get(id)).filter(Boolean) as RegistryEntry[];
  const deps: Record<string, string> = { ...BASE_DEPS };
  for (const e of entries) {
    for (const d of e.deps) {
      if (DEP_VERSIONS[d]) deps[d] = DEP_VERSIONS[d];
    }
  }
  const sortedDeps = Object.fromEntries(Object.entries(deps).sort());
  const pkg = {
    name,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },
    dependencies: sortedDeps,
    devDependencies: {
      "@tailwindcss/postcss": "^4",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      tailwindcss: "^4",
      typescript: "^5",
      ...(entries.some((e) => e.deps.includes("three"))
        ? { "@types/three": "^0.185.0" }
        : {}),
      ...(entries.some((e) => e.deps.includes("matter-js"))
        ? { "@types/matter-js": "^0.20.0" }
        : {}),
    },
  };
  return JSON.stringify(pkg, null, 2);
}

export function usedDependencies(ids: string[]): string[] {
  const entries = ids.map((id) => byId.get(id)).filter(Boolean) as RegistryEntry[];
  const set = new Set<string>();
  for (const e of entries) for (const d of e.deps) set.add(d);
  return [...set].sort();
}
