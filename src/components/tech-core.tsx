import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Liquid-glass "Cayn" wordmark — Apple "hello"-style script, slightly tilted.
 * Replaces the previous orb. Reacts subtly to cursor.
 */
export function LiquidCayn() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 70, damping: 16 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 70, damping: 16 });

  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsCoarse(m.matches);
    const h = () => setIsCoarse(m.matches);
    m.addEventListener?.("change", h);
    return () => m.removeEventListener?.("change", h);
  }, []);

  useEffect(() => {
    if (isCoarse) return;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    const flush = () => {
      raf = 0;
      if (!pending || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (pending.x - (r.left + r.width / 2)) / (r.width / 2);
      const y = (pending.y - (r.top + r.height / 2)) / (r.height / 2);
      mx.set(Math.max(-1, Math.min(1, x)));
      my.set(Math.max(-1, Math.min(1, y)));
    };
    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mx, my, isCoarse]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[280px] w-full items-center justify-center sm:h-[360px] lg:h-[460px]"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.7 0.28 280 / 45%), oklch(0.5 0.22 220 / 18%) 50%, transparent 75%)",
        }}
      />

      <motion.div
        style={{ rotateX: isCoarse ? -6 : rx, rotateY: isCoarse ? -10 : ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <svg
          viewBox="0 0 600 280"
          className="w-[min(92vw,560px)] drop-shadow-[0_30px_60px_rgba(120,90,255,0.35)]"
          style={{ transform: "rotate(-8deg)" }}
        >
          <defs>
            {/* Liquid glass gradient (fill) */}
            <linearGradient id="lg-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.95" />
              <stop offset="35%" stopColor="oklch(0.85 0.18 280)" stopOpacity="0.55" />
              <stop offset="70%" stopColor="oklch(0.6 0.22 240)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="oklch(0.95 0.1 200)" stopOpacity="0.9" />
            </linearGradient>

            {/* Stroke gradient — glossy edge */}
            <linearGradient id="lg-stroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.9" />
              <stop offset="50%" stopColor="oklch(0.9 0.2 280)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0.9" />
            </linearGradient>

            {/* Inner shine */}
            <linearGradient id="lg-shine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.8" />
              <stop offset="40%" stopColor="oklch(1 0 0)" stopOpacity="0" />
            </linearGradient>

            {/* Subtle blur for liquid feel */}
            <filter id="lg-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>

            {/* Specular highlight filter */}
            <filter id="lg-spec" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.4" specularExponent="28" lightingColor="#ffffff" result="spec">
                <fePointLight x="180" y="40" z="200" />
              </feSpecularLighting>
              <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
              <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="specOut" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft shadow behind text */}
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', 'Segoe Script', cursive"
            fontSize="220"
            fontStyle="italic"
            fill="oklch(0.6 0.25 280)"
            opacity="0.35"
            filter="url(#lg-blur)"
          >
            Cayn
          </text>

          {/* Main liquid glass fill */}
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', 'Segoe Script', cursive"
            fontSize="220"
            fontStyle="italic"
            fill="url(#lg-fill)"
            stroke="url(#lg-stroke)"
            strokeWidth="1.4"
            filter="url(#lg-spec)"
          >
            Cayn
          </text>

          {/* Highlight overlay */}
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fontFamily="'Snell Roundhand', 'Apple Chancery', 'Brush Script MT', 'Segoe Script', cursive"
            fontSize="220"
            fontStyle="italic"
            fill="url(#lg-shine)"
            pointerEvents="none"
          >
            Cayn
          </text>
        </svg>

        {/* Floating HUD chips */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute -right-2 top-2 rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
          crafted · 2026
        </motion.div>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="glass absolute -left-2 bottom-4 rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
        >
          ↗ liquid glass
        </motion.div>
      </motion.div>
    </div>
  );
}

// Backwards-compat alias so existing imports keep working.
export const TechCore = LiquidCayn;
