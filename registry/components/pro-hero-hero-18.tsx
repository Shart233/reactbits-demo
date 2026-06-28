"use client";

import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

const tile =
  "rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero18() {
  return (
    <section className="w-full min-h-screen flex items-center py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(0,1fr)] gap-3 sm:gap-4">
          {/* Headline tile — spans 2 cols, 2 rows */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.05 }}
            className={`${tile} sm:col-span-2 lg:row-span-2 p-7 sm:p-9 lg:p-10 flex flex-col justify-between min-h-[280px] sm:min-h-[340px]`}
          >
            <div className="flex items-center gap-2 w-fit rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Built for modern teams
              </span>
            </div>

            <div className="mt-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Everything your product needs, in one canvas.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md tracking-tight">
                Design, build, and ship faster with a unified toolkit your whole
                team can move through.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 w-full sm:w-auto"
                >
                  Get started free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer px-6 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium text-sm sm:text-base hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 w-full sm:w-auto"
                >
                  Book a demo
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Image tile — spans 2 cols, 2 rows */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`${tile} sm:col-span-2 lg:row-span-2 relative group min-h-[240px] sm:min-h-[340px]`}
          >
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
              alt="Modern workspace"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 flex items-end justify-between">
              <div>
                <p className="text-white/70 text-xs sm:text-sm tracking-tight">
                  Featured workflow
                </p>
                <p className="text-white text-lg sm:text-xl font-medium tracking-tight">
                  Realtime collaboration
                </p>
              </div>
              <span className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </motion.div>

          {/* Stat tile */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`${tile} p-6 sm:p-7 flex flex-col justify-center min-h-[150px]`}
          >
            <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              99.9%
            </span>
            <span className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Uptime across all regions
            </span>
          </motion.div>

          {/* Rating tile — accent */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-3xl bg-black dark:bg-white p-6 sm:p-7 flex flex-col justify-center min-h-[150px]"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-white text-white dark:fill-black dark:text-black"
                />
              ))}
            </div>
            <span className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-white dark:text-black">
              4.9 / 5
            </span>
            <span className="mt-0.5 text-sm text-white/60 dark:text-black/60">
              From 12,000+ reviews
            </span>
          </motion.div>

          {/* Avatar / social proof tile — spans 2 cols */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`${tile} sm:col-span-2 p-6 sm:p-7 flex items-center justify-between gap-4 min-h-[150px]`}
          >
            <div>
              <div className="flex -space-x-2.5">
                {["JD", "SK", "AL", "MR"].map((initials) => (
                  <div
                    key={initials}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-900 dark:bg-white border-[3px] border-neutral-50 dark:border-neutral-900 flex items-center justify-center text-white dark:text-black text-xs font-semibold"
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-200 dark:bg-neutral-800 border-[3px] border-neutral-50 dark:border-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 text-xs font-semibold">
                  +9k
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                Trusted by teams shipping every day.
              </p>
            </div>
            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              50k+
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
