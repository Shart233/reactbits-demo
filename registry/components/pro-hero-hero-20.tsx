"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const CODE_LINES: { tokens: { text: string; className: string }[] }[] = [
  {
    tokens: [
      { text: "import", className: "text-pink-400" },
      { text: " { ship } ", className: "text-neutral-200" },
      { text: "from", className: "text-pink-400" },
      { text: " 'velocity'", className: "text-emerald-400" },
    ],
  },
  { tokens: [{ text: "", className: "" }] },
  {
    tokens: [
      { text: "const", className: "text-pink-400" },
      { text: " app ", className: "text-sky-300" },
      { text: "=", className: "text-neutral-400" },
      { text: " ship", className: "text-yellow-300" },
      { text: "({", className: "text-neutral-200" },
    ],
  },
  {
    tokens: [
      { text: "  region:", className: "text-sky-300" },
      { text: " 'edge'", className: "text-emerald-400" },
      { text: ",", className: "text-neutral-400" },
    ],
  },
  {
    tokens: [
      { text: "  scale:", className: "text-sky-300" },
      { text: " 'auto'", className: "text-emerald-400" },
      { text: ",", className: "text-neutral-400" },
    ],
  },
  {
    tokens: [{ text: "})", className: "text-neutral-200" }],
  },
  { tokens: [{ text: "", className: "" }] },
  {
    tokens: [
      { text: "await", className: "text-pink-400" },
      { text: " app.", className: "text-neutral-200" },
      { text: "deploy", className: "text-yellow-300" },
      { text: "()", className: "text-neutral-200" },
    ],
  },
];

export function Hero20() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visibleLines >= CODE_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 280);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section className="w-full min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 relative overflow-hidden">
      {/* faint glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.10),transparent_70%)]" />

      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 w-fit rounded-full border border-neutral-300 dark:border-neutral-800 px-3 py-1"
            >
              <Terminal className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Developer-first by design
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-neutral-900 dark:text-white leading-[1.12]"
            >
              From{" "}
              <code className="font-mono text-[0.92em] px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                git push
              </code>{" "}
              to global in seconds.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md tracking-tight"
            >
              Wire up your repo once. Every commit builds, tests, and deploys to
              the edge — no YAML graveyard required.
            </motion.p>

            {/* install command */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-between gap-3 w-full max-w-sm rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3 font-mono text-sm"
            >
              <span className="text-neutral-800 dark:text-neutral-200 truncate">
                <span className="text-neutral-400 dark:text-neutral-600 select-none">
                  ${" "}
                </span>
                npm i -g velocity
              </span>
              <button
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="shrink-0 cursor-pointer text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Copy install command"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 w-full sm:w-auto"
              >
                Deploy your first app
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer px-6 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium text-sm sm:text-base hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors duration-200 w-full sm:w-auto"
              >
                Read the docs
              </motion.button>
            </motion.div>
          </div>

          {/* Right — terminal window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full"
          >
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/20 dark:shadow-black/60">
              {/* title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
                <span className="w-3 h-3 rounded-full bg-red-500/90" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
                <span className="w-3 h-3 rounded-full bg-green-500/90" />
                <span className="ml-3 text-xs text-neutral-500 font-mono">
                  deploy.ts
                </span>
              </div>

              {/* code body */}
              <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[260px]">
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`flex transition-opacity duration-300 ${
                      i < visibleLines ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="select-none w-7 shrink-0 text-neutral-700 text-right pr-3">
                      {i + 1}
                    </span>
                    <span className="whitespace-pre">
                      {line.tokens.map((tok, j) => (
                        <span key={j} className={tok.className}>
                          {tok.text}
                        </span>
                      ))}
                      {i === visibleLines - 1 && (
                        <motion.span
                          className="inline-block w-2 h-4 ml-0.5 align-middle bg-neutral-300"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {/* output line */}
              <div className="px-5 sm:px-6 py-3 border-t border-neutral-800 bg-neutral-900/60 font-mono text-xs">
                {visibleLines >= CODE_LINES.length ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-400"
                  >
                    ✓ Deployed to 18 regions in 2.4s
                  </motion.span>
                ) : (
                  <span className="text-neutral-600">building…</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
