import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Spline 3D liquid-glass sphere as the hero centerpiece.
 * Tinted with the site's brand colors via overlays.
 */
export function LiquidCayn() {
  return (
    <div
      className="relative mx-auto flex h-[360px] w-full items-center justify-center sm:h-[460px] lg:h-[560px]"
      style={{ perspective: 1200 }}
    >
      {/* Brand-tinted ambient halo */}
      <motion.div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, oklch(0.7 0.28 280 / 55%), oklch(0.5 0.22 220 / 22%) 50%, transparent 75%)",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative h-full w-full">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-40 w-40 animate-pulse-glow rounded-full bg-gradient-to-br from-[oklch(0.7_0.22_280)] to-[oklch(0.75_0.18_220)] opacity-60 blur-2xl" />
            </div>
          }
        >
          <Spline scene="https://prod.spline.design/xATIWY-EIHtG9Obg/scene.splinecode" />
        </Suspense>

        {/* Brand color overlay — subtle tint to match site palette */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.7 0.22 280 / 35%), oklch(0.6 0.22 240 / 25%) 60%, transparent 80%)",
          }}
        />
        {/* Liquid-glass sheen overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 38% 32%, oklch(1 0 0 / 18%), transparent 60%)",
          }}
        />
      </div>

      {/* Floating HUD chips */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute right-2 top-4 rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
        crafted · 2026
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute bottom-6 left-2 rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        ↗ liquid glass
      </motion.div>
    </div>
  );
}

export const TechCore = LiquidCayn;
