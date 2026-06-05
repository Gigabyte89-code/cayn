import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/**
 * TechCore — animated wireframe globe with orbiting data arcs.
 * GPU-friendly transforms, no heavy filters on mobile.
 */
export function TechCore() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [14, -14]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 80, damping: 20 });

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

  // Pseudo-random data dots on the sphere (deterministic)
  const dots = useMemo(() => {
    const out: { lat: number; lon: number; size: number; delay: number }[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 14; i++) {
      out.push({
        lat: (rand() - 0.5) * 160,
        lon: rand() * 360,
        size: 1.5 + rand() * 2,
        delay: rand() * 3,
      });
    }
    return out;
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: isCoarse ? 0 : rx, rotateY: isCoarse ? 0 : ry, perspective: 1000 }}
      className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px]"
    >
      {/* Ambient halo */}
      <div
        className="absolute inset-[-20%] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.65 0.28 280 / 55%), oklch(0.55 0.22 220 / 25%) 45%, transparent 75%)",
        }}
      />

      {/* Wireframe globe (3D) */}
      <div
        className="absolute inset-[10%]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {/* Meridians */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`m-${i}`}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: "oklch(0.85 0.18 280 / 35%)",
                transform: `rotateY(${(i * 180) / 8}deg)`,
                boxShadow: "inset 0 0 30px oklch(0.7 0.25 280 / 20%)",
              }}
            />
          ))}
          {/* Parallels */}
          {[-60, -30, 0, 30, 60].map((lat) => {
            const scale = Math.cos((lat * Math.PI) / 180);
            return (
              <div
                key={`p-${lat}`}
                className="absolute left-1/2 top-1/2 rounded-full border"
                style={{
                  borderColor: "oklch(0.8 0.16 220 / 30%)",
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  transform: `translate(-50%, -50%) translateZ(${Math.sin((lat * Math.PI) / 180) * 50}%)`,
                }}
              />
            );
          })}
          {/* Data dots on sphere */}
          {dots.map((d, i) => {
            const r = 50; // % radius
            const lat = (d.lat * Math.PI) / 180;
            const lon = (d.lon * Math.PI) / 180;
            const x = r * Math.cos(lat) * Math.sin(lon);
            const z = r * Math.cos(lat) * Math.cos(lon);
            const y = r * Math.sin(lat);
            return (
              <div
                key={`d-${i}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate3d(${x}%, ${y}%, ${z}%) translate(-50%, -50%)`,
                }}
              >
                <motion.div
                  className="rounded-full"
                  style={{
                    width: d.size * 3,
                    height: d.size * 3,
                    background: "oklch(0.95 0.05 280)",
                    boxShadow:
                      "0 0 12px oklch(0.85 0.25 280 / 90%), 0 0 24px oklch(0.7 0.25 280 / 60%)",
                  }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 2 + d.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: d.delay,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Counter-rotating outer ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 280)" stopOpacity="0" />
            <stop offset="50%" stopColor="oklch(0.85 0.18 280)" stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.8 0.16 220)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="0.2" />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="url(#arc)"
          strokeWidth="0.6"
          strokeDasharray="60 240"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(1 0 0 / 6%)" strokeWidth="0.15" strokeDasharray="0.5 2.5" />
      </motion.svg>

      {/* Sweeping scan line */}
      <motion.div
        className="absolute inset-[8%] rounded-full overflow-hidden pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, oklch(0.85 0.25 280 / 35%) 30deg, transparent 60deg)",
          maskImage:
            "radial-gradient(circle, transparent 38%, black 39%, black 50%, transparent 51%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 38%, black 39%, black 50%, transparent 51%)",
        }}
      />

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(1 0 0 / 95%), oklch(0.7 0.28 280 / 80%) 45%, oklch(0.4 0.25 260 / 40%) 75%, transparent)",
            boxShadow:
              "0 0 40px oklch(0.7 0.28 280 / 70%), 0 0 80px oklch(0.6 0.25 240 / 50%), inset -6px -8px 20px oklch(0.3 0.2 260 / 60%)",
          }}
        />
      </div>

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute right-[2%] top-[8%] rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
        neural · online
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute left-[-2%] top-[42%] rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        ↗ 12.4k req/s
      </motion.div>
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute right-[4%] bottom-[10%] rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        v2.0 · stable
      </motion.div>
    </motion.div>
  );
}
