import { Suspense, lazy, useCallback } from "react";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Spline 3D liquid-glass sphere as the hero centerpiece.
 * - Disables mouse interaction (no rotation/zoom from user)
 * - Hides default Spline watermark
 * - Soft radial mask + blurred edges for a seamless blend with background
 */
export function LiquidCayn() {
  const onLoad = useCallback((app: any) => {
    try {
      // Stop Spline from listening to mouse / scroll
      app?.setZoom?.(1);
      // Remove watermark logo if present
      const root = (app?._scene?.parent ?? app)?.canvas?.parentElement;
      const logo = root?.querySelector?.('a[href*="spline.design"]');
      if (logo) (logo as HTMLElement).style.display = "none";
    } catch {}
  }, []);

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

      {/* Spline canvas wrapper — non-interactive, masked & softly feathered */}
      <div
        className="pointer-events-none relative h-full w-full select-none [&_a[href*='spline.design']]:!hidden [&_canvas]:!outline-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 38%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.35) 72%, transparent 92%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 38%, rgba(0,0,0,0.85) 52%, rgba(0,0,0,0.35) 72%, transparent 92%)",
          filter: "drop-shadow(0 20px 60px oklch(0.7 0.22 280 / 30%))",
        }}
      >
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-40 w-40 animate-pulse-glow rounded-full bg-gradient-to-br from-[oklch(0.7_0.22_280)] to-[oklch(0.75_0.18_220)] opacity-60 blur-2xl" />
            </div>
          }
        >
          <Spline
            scene="https://prod.spline.design/xATIWY-EIHtG9Obg/scene.splinecode"
            onLoad={onLoad}
            style={{ pointerEvents: "none" }}
          />
        </Suspense>

        {/* Brand color overlay — subtle tint to match site palette */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-color"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.7 0.22 280 / 30%), oklch(0.6 0.22 240 / 20%) 60%, transparent 80%)",
          }}
        />
        {/* Liquid-glass top sheen */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 42% 28% at 38% 30%, oklch(1 0 0 / 22%), transparent 65%)",
          }}
        />
        {/* Bottom reflection */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 38% 18% at 55% 78%, oklch(0.8 0.18 280 / 25%), transparent 70%)",
          }}
        />
      </div>

      {/* Soft edge feather — blurred copies of background to dissolve hard edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[28%]"
        style={{
          background:
            "linear-gradient(to right, var(--background) 0%, color-mix(in oklab, var(--background) 80%, transparent) 35%, transparent 100%)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[28%]"
        style={{
          background:
            "linear-gradient(to left, var(--background) 0%, color-mix(in oklab, var(--background) 80%, transparent) 35%, transparent 100%)",
          backdropFilter: "blur(2px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22%]"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%]"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />

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
