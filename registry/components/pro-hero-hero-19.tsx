"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const LOGOS = ["Vercel", "Linear", "Raycast", "Supabase", "Framer", "Stripe"];

export function Hero19() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute -top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40 dark:opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgb(99,102,241), transparent 60%)",
          }}
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 right-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-40 dark:opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgb(236,72,153), transparent 60%)",
          }}
          animate={{ x: [0, -50, 40, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/3 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-40 dark:opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgb(20,184,166), transparent 60%)",
          }}
          animate={{ x: [0, 40, -40, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto w-full flex flex-col items-center text-center">
        <motion.a
          href="#"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group flex items-center gap-2 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 bg-white/60 dark:bg-neutral-900/60 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Now in public beta
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.03em] leading-[1.05] text-neutral-900 dark:text-white"
        >
          Ship products that feel{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-pink-500 to-teal-500 bg-clip-text text-transparent bg-[size:200%_auto] animate-[hero19gradient_6s_linear_infinite]">
            impossibly fast
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl tracking-tight"
        >
          The all-in-one platform for teams who want to design, build, and
          launch without the busywork. No setup, no friction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-9 flex flex-col sm:flex-row items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer px-7 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 w-full sm:w-auto"
          >
            Start building
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer px-7 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur text-neutral-900 dark:text-neutral-100 font-medium text-sm sm:text-base hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-200 w-full sm:w-auto"
          >
            View docs
          </motion.button>
        </motion.div>

        {/* Logo marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 w-full"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
            Trusted by fast-moving teams
          </p>
          <div className="relative mt-5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              className="flex w-max gap-10 sm:gap-14"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...LOGOS, ...LOGOS].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-400 dark:text-neutral-600 whitespace-nowrap"
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes hero19gradient {
          to { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
