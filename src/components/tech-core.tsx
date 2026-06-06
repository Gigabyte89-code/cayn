import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/**
 * TechCore — a contained holographic AI orb.
 * Everything lives INSIDE the circular boundary. No stray rings.
 */
export function TechCore() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 80, damping: 18 });

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

  // Deterministic data dots on the sphere
  const dots = useMemo(() => {
    const out: { lat: number; lon: number; size: number; delay: number }[] = [];
    let seed = 11;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 18; i++) {
      out.push({
        lat: (rand() - 0.5) * 160,
        lon: rand() * 360,
        size: 1.2 + rand() * 2,
        delay: rand() * 3,
      });
    }
    return out;
  }, []);

  return (
    <div className="relative mx-auto h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]">
      {/* Soft ambient halo behind the orb (contained, no rings) */}
      <div
        className="pointer-events-none absolute inset-[-10%] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.65 0.28 280 / 50%), oklch(0.55 0.22 220 / 22%) 45%, transparent 72%)",
        }}
      />

      {/* The orb — everything is clipped to this circle */}
      <motion.div
        ref={ref}
        style={{ rotateX: isCoarse ? 0 : rx, rotateY: isCoarse ? 0 : ry, perspective: 1000 }}
        className="absolute inset-0 rounded-full"
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, oklch(0.45 0.18 280 / 55%), oklch(0.18 0.08 260 / 85%) 55%, oklch(0.08 0.04 260 / 95%) 90%)",
            boxShadow:
              "inset 0 0 60px oklch(0.5 0.25 280 / 35%), inset 0 0 120px oklch(0 0 0 / 60%), 0 30px 80px -20px oklch(0.4 0.25 280 / 50%)",
            border: "1px solid oklch(1 0 0 / 12%)",
          }}
        >
          {/* Inner grid texture */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.85 0.18 280 / 18%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.18 280 / 18%) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(circle, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 75%)",
            }}
          />

          {/* 3D wireframe globe (constrained inside orb) */}
          <div className="absolute inset-[14%]" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`m-${i}`}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    borderColor: "oklch(0.85 0.18 280 / 28%)",
                    transform: `rotateY(${(i * 180) / 8}deg)`,
                  }}
                />
              ))}
              {[-60, -30, 0, 30, 60].map((lat) => {
                const scale = Math.cos((lat * Math.PI) / 180);
                return (
                  <div
                    key={`p-${lat}`}
                    className="absolute left-1/2 top-1/2 rounded-full border"
                    style={{
                      borderColor: "oklch(0.8 0.16 220 / 25%)",
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                      transform: `translate(-50%, -50%) translateZ(${Math.sin((lat * Math.PI) / 180) * 50}%)`,
                    }}
                  />
                );
              })}
              {dots.map((d, i) => {
                const r = 50;
                const lat = (d.lat * Math.PI) / 180;
                const lon = (d.lon * Math.PI) / 180;
                const x = r * Math.cos(lat) * Math.sin(lon);
                const z = r * Math.cos(lat) * Math.cos(lon);
                const y = r * Math.sin(lat);
                return (
                  <div
                    key={`d-${i}`}
                    className="absolute left-1/2 top-1/2"
                    style={{ transform: `translate3d(${x}%, ${y}%, ${z}%) translate(-50%, -50%)` }}
                  >
                    <motion.div
                      className="rounded-full"
                      style={{
                        width: d.size * 3,
                        height: d.size * 3,
                        background: "oklch(0.95 0.05 280)",
                        boxShadow:
                          "0 0 10px oklch(0.85 0.25 280 / 90%), 0 0 20px oklch(0.7 0.25 280 / 55%)",
                      }}
                      animate={{ opacity: [1, 0.25, 1] }}
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

          {/* Sweeping scan line (clipped inside orb) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, oklch(0.85 0.3 280 / 28%) 40deg, transparent 80deg)",
            }}
          />

          {/* Glossy highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 30% 18%, oklch(1 0 0 / 22%), transparent 60%)",
            }}
          />

          {/* Core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, oklch(1 0 0 / 95%), oklch(0.75 0.28 280 / 85%) 45%, oklch(0.4 0.25 260 / 50%) 80%, transparent)",
                boxShadow:
                  "0 0 30px oklch(0.8 0.28 280 / 80%), 0 0 60px oklch(0.6 0.25 240 / 55%)",
              }}
            />
          </div>
        </div>

        {/* Thin outer concentric rings — sized exactly to the orb so nothing escapes */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full pointer-events-none">
          <defs>
            <linearGradient id="orb-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.2 280)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.9 0.2 280)" stopOpacity="1" />
              <stop offset="100%" stopColor="oklch(0.8 0.16 220)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="49.5" fill="none" stroke="oklch(1 0 0 / 18%)" strokeWidth="0.25" />
          <motion.g
            style={{ transformOrigin: "50px 50px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="50"
              cy="50"
              r="49.5"
              fill="none"
              stroke="url(#orb-arc)"
              strokeWidth="0.6"
              strokeDasharray="55 256"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* Corner tick marks for HUD feel */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
            style={{
              transform: `rotate(${deg}deg) translateY(calc(-50% - 0.75px)) translateY(-100%) translateY(50%)`,
              background: "oklch(0.95 0.1 280)",
              boxShadow: "0 0 8px oklch(0.85 0.25 280)",
            }}
          />
        ))}
      </motion.div>

      {/* Floating HUD chips — positioned tight against the orb, not floating off in space */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute right-[6%] top-[4%] rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
        neural · online
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute left-[4%] bottom-[10%] rounded-xl px-2.5 py-1 text-[10px] font-mono text-white/85"
      >
        ↗ 12.4k req/s
      </motion.div>
    </div>
  );
}
