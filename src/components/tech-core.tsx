import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Liquid-glass "Cayn" wordmark with mouse-tracking reflections and click shimmer.
 */
export function LiquidCayn() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // -1..1
  const my = useMotionValue(0);

  // Subtle 3D tilt
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 80, damping: 18 });

  // Light position for specular highlight (in SVG userspace ~600x280)
  const lightX = useSpring(useTransform(mx, [-1, 1], [60, 540]), { stiffness: 120, damping: 20 });
  const lightY = useSpring(useTransform(my, [-1, 1], [40, 240]), { stiffness: 120, damping: 20 });

  // Shine overlay position (percentage)
  const shineX = useTransform(mx, [-1, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [-1, 1], ["0%", "100%"]);

  const [isCoarse, setIsCoarse] = useState(false);
  const [shimmers, setShimmers] = useState<number[]>([]);

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
      mx.set(Math.max(-1.2, Math.min(1.2, x)));
      my.set(Math.max(-1.2, Math.min(1.2, y)));
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

  const triggerShimmer = () => {
    const id = Date.now() + Math.random();
    setShimmers((s) => [...s, id]);
    setTimeout(() => setShimmers((s) => s.filter((x) => x !== id)), 1200);
  };

  return (
    <div
      ref={ref}
      onClick={triggerShimmer}
      className="relative mx-auto flex h-[280px] w-full cursor-pointer items-center justify-center sm:h-[360px] lg:h-[460px]"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, oklch(0.7 0.28 280 / 50%), oklch(0.5 0.22 220 / 18%) 50%, transparent 75%)",
        }}
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          rotateX: isCoarse ? -4 : rx,
          rotateY: isCoarse ? -8 : ry,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {/* Liquid bob */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <svg
            viewBox="0 0 600 280"
            className="w-[min(92vw,580px)] drop-shadow-[0_30px_60px_rgba(120,90,255,0.4)]"
            style={{ transform: "rotate(-7deg)" }}
          >
            <defs>
              <linearGradient id="lg-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.92" />
                <stop offset="40%" stopColor="oklch(0.85 0.18 280)" stopOpacity="0.55" />
                <stop offset="75%" stopColor="oklch(0.55 0.22 240)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="oklch(0.95 0.12 200)" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="lg-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(1 0 0)" stopOpacity="0.95" />
                <stop offset="50%" stopColor="oklch(0.9 0.2 280)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="oklch(1 0 0)" stopOpacity="0.95" />
              </linearGradient>

              {/* Specular highlight that follows the mouse */}
              <filter id="lg-spec" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
                <feSpecularLighting
                  in="blur"
                  surfaceScale="4"
                  specularConstant="1.6"
                  specularExponent="30"
                  lightingColor="#ffffff"
                  result="spec"
                >
                  <motion.fePointLight x={lightX as never} y={lightY as never} z={180} />
                </feSpecularLighting>
                <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="specOut" />
                </feMerge>
              </filter>

              {/* Mouse-following shine gradient (clipped to text) */}
              <motion.radialGradient
                id="lg-shine"
                cx={shineX as never}
                cy={shineY as never}
                r="55%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
              </motion.radialGradient>

              {/* Shimmer sweep gradient (animated x) */}
              <linearGradient id="lg-shimmer" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              <clipPath id="lg-clip">
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  className="font-script"
                  fontSize="240"
                  fontStyle="italic"
                  fontWeight={700}
                >
                  Cayn
                </text>
              </clipPath>
            </defs>

            {/* Soft colored shadow */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              className="font-script"
              fontSize="240"
              fontStyle="italic"
              fontWeight={700}
              fill="oklch(0.55 0.25 280)"
              opacity="0.4"
              filter="blur(6px)"
            >
              Cayn
            </text>

            {/* Main glass fill + specular */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              className="font-script"
              fontSize="240"
              fontStyle="italic"
              fontWeight={700}
              fill="url(#lg-fill)"
              stroke="url(#lg-stroke)"
              strokeWidth="1.4"
              filter="url(#lg-spec)"
            >
              Cayn
            </text>

            {/* Mouse-tracking shine */}
            <g clipPath="url(#lg-clip)">
              <rect x="0" y="0" width="600" height="280" fill="url(#lg-shine)" />
            </g>

            {/* Click shimmer sweeps */}
            <AnimatePresence>
              {shimmers.map((id) => (
                <motion.g key={id} clipPath="url(#lg-clip)">
                  <motion.rect
                    y="0"
                    width="600"
                    height="280"
                    fill="url(#lg-shimmer)"
                    initial={{ x: -600, opacity: 0 }}
                    animate={{ x: 600, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                </motion.g>
              ))}
            </AnimatePresence>

            {/* Highlight stroke on top */}
            <text
              x="50%"
              y="62%"
              textAnchor="middle"
              className="font-script"
              fontSize="240"
              fontStyle="italic"
              fontWeight={700}
              fill="none"
              stroke="oklch(1 0 0 / 60%)"
              strokeWidth="0.5"
              pointerEvents="none"
            >
              Cayn
            </text>
          </svg>
        </motion.div>

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

export const TechCore = LiquidCayn;
