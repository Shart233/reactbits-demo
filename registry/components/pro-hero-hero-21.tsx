"use client";

import { ArrowRight, Bell, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

export function Hero21() {
  return (
    <section className="w-full min-h-screen flex items-start lg:items-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col space-y-6 sm:space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 w-fit rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Analytics, finally effortless
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-medium text-neutral-900 dark:text-white leading-[1.1]"
            >
              See every metric that moves your business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md tracking-tight"
            >
              Connect your stack and watch the numbers come to life — live
              dashboards, smart alerts, and zero spreadsheets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-200 w-full sm:w-auto"
              >
                Try it free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-medium text-sm sm:text-base hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 w-full sm:w-auto"
              >
                See live demo
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500"
            >
              No credit card required · 14-day trial
            </motion.p>
          </div>

          {/* Right — floating UI card stack */}
          <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px]">
            {/* ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(99,102,241,0.12),transparent_60%)]" />

            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -6, rotate: -1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[360px] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl shadow-black/10 dark:shadow-black/50 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Monthly revenue
                  </p>
                  <p className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                    $128,420
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  +18.2%
                </span>
              </div>

              {/* mini bar chart */}
              <div className="mt-5 flex items-end justify-between gap-2 h-24">
                {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
                    className="flex-1 rounded-md bg-gradient-to-t from-indigo-500 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300"
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-neutral-400 dark:text-neutral-600">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="flex-1 text-center">
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Floating notification card — top right */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-4 right-0 sm:right-2 w-[210px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xl shadow-black/10 dark:shadow-black/40 p-3.5"
            >
              <div className="flex items-start gap-2.5">
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Bell className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-neutral-900 dark:text-white">
                    Goal reached 🎉
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                    You hit 10k signups this week.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Floating users card — bottom left */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="absolute bottom-6 left-0 sm:left-2 w-[200px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xl shadow-black/10 dark:shadow-black/40 p-3.5"
            >
              <div className="flex items-center gap-2.5">
                <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                  <Users className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white leading-none">
                    2,847
                  </p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Active right now
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex -space-x-1.5">
                {["EM", "JL", "KP", "RS"].map((u) => (
                  <span
                    key={u}
                    className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[9px] font-semibold text-neutral-700 dark:text-neutral-200"
                  >
                    {u}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
