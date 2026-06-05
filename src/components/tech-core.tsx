import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * TechCore — a startup/AI-style orbital visual.
 * Uses pure SVG + transforms (GPU friendly), no heavy filters on mobile.
 */
export function TechCore() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 80, damping: 18 });

  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsCoarse(m.matches);
    const handler = () => setIsCoarse(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
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

  // 6 nodes around a circle
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2;
    return { x: 50 + Math.cos(a) * 38, y: 50 + Math.sin(a) * 38, i };
  });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: isCoarse ? 0 : rx, rotateY: isCoarse ? 0 : ry, transformStyle: "preserve-3d" }}
      className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px]"
    >
      {/* Ambient glow behind */}
      <div
        className="absolute inset-[-10%] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.6 0.25 280 / 50%), oklch(0.5 0.2 220 / 25%) 50%, transparent 75%)",
        }}
      />

      {/* Orbit rings */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 280)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.8 0.16 220)" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.98 0.02 280)" stopOpacity="1" />
            <stop offset="40%" stopColor="oklch(0.7 0.25 280)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.3 0.2 240)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ringGrad)" strokeWidth="0.4" strokeDasharray="1 2" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="oklch(1 0 0 / 25%)" strokeWidth="0.25" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="oklch(1 0 0 / 12%)" strokeWidth="0.2" strokeDasharray="0.5 3" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="oklch(0.75 0.18 220 / 40%)" strokeWidth="0.25" strokeDasharray="2 1" />
      </motion.svg>

      {/* Network nodes + links */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {nodes.map((n, idx) => {
          const next = nodes[(idx + 2) % nodes.length];
          return (
            <line
              key={`l-${idx}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="oklch(0.85 0.18 280 / 35%)"
              strokeWidth="0.2"
            />
          );
        })}
        {nodes.map((n) => (
          <g key={`n-${n.i}`}>
            <circle cx={n.x} cy={n.y} r="1.6" fill="oklch(0.95 0.05 280)" />
            <circle cx={n.x} cy={n.y} r="3" fill="oklch(0.7 0.25 280 / 30%)">
              <animate attributeName="r" values="2;4;2" dur={`${2 + n.i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur={`${2 + n.i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        {/* Core */}
        <circle cx="50" cy="50" r="14" fill="url(#coreGrad)" />
        <circle cx="50" cy="50" r="6" fill="oklch(1 0 0 / 90%)">
          <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Floating chips */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div
          className="glass absolute right-[6%] top-[14%] rounded-xl px-2 py-1 text-[10px] font-mono text-white/80"
          style={{ transform: "translateZ(50px)" }}
        >
          AI · v2
        </div>
        <div
          className="glass absolute left-[4%] bottom-[20%] rounded-xl px-2 py-1 text-[10px] font-mono text-white/80"
          style={{ transform: "translateZ(70px)" }}
        >
          //sync
        </div>
        <div
          className="glass absolute bottom-[6%] right-[24%] rounded-xl px-2 py-1 text-[10px] font-mono text-white/80"
          style={{ transform: "translateZ(40px)" }}
        >
          99.9%
        </div>
      </motion.div>
    </motion.div>
  );
}
