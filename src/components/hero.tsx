import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { GlassOrbs, GridOverlay } from "./ambient";

function GlassSphere() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      mx.set(Math.max(-1, Math.min(1, x)));
      my.set(Math.max(-1, Math.min(1, y)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="relative mx-auto h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[460px] lg:w-[460px]"
    >
      {/* Main sphere */}
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, oklch(0.95 0.05 280 / 90%), oklch(0.5 0.25 280 / 50%) 40%, oklch(0.2 0.15 240 / 40%) 70%, transparent 100%)",
          boxShadow:
            "inset -40px -60px 100px oklch(0.2 0.2 260 / 60%), inset 30px 40px 80px oklch(1 0 0 / 30%), 0 60px 120px -20px oklch(0.5 0.3 280 / 50%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Highlight */}
        <div
          className="absolute left-[20%] top-[15%] h-[30%] w-[30%] rounded-full blur-xl"
          style={{ background: "oklch(1 0 0 / 70%)" }}
        />
        {/* Inner glow */}
        <div
          className="absolute inset-[15%] rounded-full opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.25 220 / 50%), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Orbiting glass shards */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div
          className="glass absolute -right-4 top-10 h-20 w-20 rounded-2xl"
          style={{ transform: "translateZ(60px)" }}
        />
        <div
          className="glass absolute -left-6 bottom-16 h-16 w-16 rounded-full"
          style={{ transform: "translateZ(80px)" }}
        />
        <div
          className="glass absolute -bottom-4 right-1/3 h-14 w-24 rounded-2xl"
          style={{ transform: "translateZ(40px)" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <GlassOrbs />
      <GridOverlay />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles size={12} className="text-glow" />
            Available for new projects · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[88px]"
          >
            <span className="text-gradient">Building modern</span>
            <br />
            <span className="text-gradient-brand italic">digital experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I design and develop digital products, websites, and applications
            focused on usability, performance, and clean design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#finance"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              View My Work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-white/10"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 flex items-center gap-8 text-xs text-muted-foreground"
          >
            <div>
              <div className="font-display text-2xl text-foreground">ICDL</div>
              <div className="mt-1">Certified</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl text-foreground">100%</div>
              <div className="mt-1">Custom design</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1200 }}
        >
          <GlassSphere />
        </motion.div>
      </div>
    </section>
  );
}
