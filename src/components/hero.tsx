import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Sparkles } from "lucide-react";
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
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32"
    >
      <GlassOrbs />
      <GridOverlay />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-10 flex items-center justify-between border-b border-border pb-4">
          <div className="label-mono flex items-center gap-3">
            <span className="accent-dot" />
            {d.hero.badge}
          </div>
          <div className="label-mono hidden items-center gap-2 sm:flex">
            Cayn · 2026
            <ArrowDownRight size={13} />
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-14 ${lite ? "" : "lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,.85fr)] lg:items-center"}`}>
          <div className={lite ? "max-w-4xl" : ""}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl lg:text-[5.75rem] xl:text-[6.6rem]"
          >
            <span className="text-gradient">{d.hero.title1}</span>
            <br />
            <span className="text-gradient-brand italic">{d.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-2xl border-l border-border pl-5 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {d.hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/contact"
              className="btn-solid liquid-sheen group px-8 py-4 text-base"
            >
              {d.hero.cta}
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {d.hero.secondary}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16 flex max-w-md items-center gap-8 border-t border-border pt-5 text-xs text-muted-foreground"
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
            className="relative min-h-[26rem] lg:min-h-[34rem]"
          >
            <div className="pointer-events-none absolute inset-x-8 bottom-5 top-5 border-x border-border" />
            <div className="label-mono absolute right-0 top-0 flex items-center gap-2">
              <Sparkles size={12} className="text-glow" />
              Digital craft
            </div>
            <TechCore />
          </motion.div>
        )}
        </div>
      </div>
    </section>
  );
}
