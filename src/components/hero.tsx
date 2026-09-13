import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GlassOrbs, GridOverlay } from "./ambient";
import { TechCore } from "./tech-core";
import { useLiteMode } from "@/hooks/use-lite-mode";
import { useT } from "@/lib/i18n";




export function Hero() {
  const { lite } = useLiteMode();
  const d = useT();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <GlassOrbs />
      <GridOverlay />

      <div
        className={`relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 ${
          lite ? "" : "lg:grid-cols-[1.1fr_1fr] lg:items-center"
        }`}
      >
        <div className={lite ? "mx-auto max-w-3xl text-center" : ""}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[80px]"
          >
            <span className="text-gradient">{d.hero.title1}</span>
            <br />
            <span className="text-gradient-brand italic">{d.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {d.hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className={`mt-9 flex flex-wrap items-center gap-3 ${lite ? "justify-center" : ""}`}
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              {d.hero.cta}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/projects"
              className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
              {d.hero.secondary}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className={`mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground ${lite ? "" : ""}`}
          >
            <Sparkles size={12} className="text-glow" />
            {d.hero.badge}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`mt-14 flex items-center gap-8 text-xs text-muted-foreground ${lite ? "justify-center" : ""}`}
          >
            <div>
              <div className="font-display text-2xl text-foreground">ICDL</div>
              <div className="mt-1">{d.hero.stat1}</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-2xl text-foreground">100%</div>
              <div className="mt-1">{d.hero.stat2}</div>
            </div>
          </motion.div>
        </div>

        {!lite && (
          <motion.div
            role="img"
            aria-label={d.hero.sphereAlt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
          >
            <TechCore />
          </motion.div>
        )}
      </div>
    </section>
  );
}
