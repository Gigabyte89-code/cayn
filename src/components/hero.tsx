import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlassOrbs, GridOverlay } from "./ambient";
import robotHead from "@/assets/robot-head-cutout.png";

function RobotHead() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [reacting, setReacting] = useState(false);
  const reactTimer = useRef<number | null>(null);

  const rx = useSpring(useTransform(my, [-1, 1], [18, -18]), { stiffness: 90, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-22, 22]), { stiffness: 90, damping: 18 });
  const tx = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 80, damping: 20 });
  const ty = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      mx.set(Math.max(-1.4, Math.min(1.4, x)));
      my.set(Math.max(-1.4, Math.min(1.4, y)));

      // React (subtle scale pulse) on quick movements near the head
      const dist = Math.hypot(x, y);
      if (dist < 1.6) {
        setReacting(true);
        if (reactTimer.current) window.clearTimeout(reactTimer.current);
        reactTimer.current = window.setTimeout(() => setReacting(false), 320);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (reactTimer.current) window.clearTimeout(reactTimer.current);
    };
  }, [mx, my]);

  return (
    <div className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center sm:h-[380px] sm:w-[380px] lg:h-[480px] lg:w-[480px]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.6 0.22 260 / 55%), oklch(0.4 0.2 280 / 25%) 50%, transparent 75%)",
        }}
      />

      <motion.div
        ref={ref}
        style={{
          rotateX: rx,
          rotateY: ry,
          x: tx,
          y: ty,
          transformStyle: "preserve-3d",
        }}
        animate={{ scale: reacting ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="relative h-full w-full"
      >
        <motion.img
          src={robotHead}
          alt="Animated chrome robot head"
          draggable={false}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none h-full w-full select-none object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
          style={{ filter: "drop-shadow(0 30px 60px oklch(0.5 0.3 280 / 35%))" }}
        />
      </motion.div>
    </div>
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
          <RobotHead />
        </motion.div>
      </div>
    </section>
  );
}
