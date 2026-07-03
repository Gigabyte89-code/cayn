import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GlassOrbs, GridOverlay } from "./ambient";
import { TechCore } from "./tech-core";
import { useLiteMode } from "@/hooks/use-lite-mode";




export function Hero() {
  const { lite } = useLiteMode();
  return (
    <section
      id="home"
      className="relative flex min-h-[78svh] items-center overflow-visible pt-28 pb-8 sm:min-h-[88svh] sm:pb-12 lg:min-h-screen lg:overflow-hidden lg:pb-16"
    >
      <GlassOrbs />
      <GridOverlay />

      <div
        className={`relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 sm:gap-12 ${
          lite ? "" : "lg:grid-cols-[1.1fr_1fr] lg:items-center"
        }`}
      >
        <div className={lite ? "mx-auto max-w-3xl text-center" : ""}>
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
            className={`mt-9 flex flex-wrap items-center gap-3 ${lite ? "justify-center" : ""}`}
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
            className={`mt-10 flex items-center gap-8 text-xs text-muted-foreground sm:mt-14 ${lite ? "justify-center" : ""}`}
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

        {!lite && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
          >
            <TechCore />
          </motion.div>
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-56 lg:h-72"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 18%, transparent) 34%, color-mix(in oklab, var(--background) 4%, transparent) 100%)",
        }}
      />
    </section>
  );
}
