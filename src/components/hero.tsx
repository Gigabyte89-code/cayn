import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlassOrbs, GridOverlay } from "./ambient";
import { TechCore } from "./tech-core";
import { useLiteMode } from "@/hooks/use-lite-mode";




export function Hero() {
  const { lite } = useLiteMode();
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for new projects · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[86px]"
          >
            Websites and products
            <br />
            <span className="text-gradient-brand">that earn their keep.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg ${lite ? "mx-auto" : ""}`}
          >
            I'm Cayn — a developer and digital creator. I design and ship sites and apps
            that load fast, read clearly, and turn visitors into messages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className={`mt-9 flex flex-wrap items-center gap-3 ${lite ? "justify-center" : ""}`}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Let's talk
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#finance"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50"
            >
              See the work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`mt-14 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-border pt-8 text-xs text-muted-foreground ${lite ? "justify-center" : ""}`}
          >
            <div>
              <div className="font-display text-2xl text-foreground">2</div>
              <div className="mt-1">Client products live</div>
            </div>
            <div>
              <div className="font-display text-2xl text-foreground">24h</div>
              <div className="mt-1">Reply time</div>
            </div>
            <div>
              <div className="font-display text-2xl text-foreground">ICDL</div>
              <div className="mt-1">Certified</div>
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
    </section>
  );
}
