import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const META = [
  { k: "Based in", v: "Puglia, Italy" },
  { k: "Focus", v: "Web & product UI" },
  { k: "Availability", v: "Open — Q3 2026" },
];

export function Hero() {
  return (
    <section id="top" className="relative border-b border-border pt-[132px] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              Cayn — frontend developer &amp; digital creator
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[16ch] text-[clamp(2.6rem,6.4vw,4.6rem)] leading-[0.98]"
            >
              Interfaces built to be used, not just seen.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-7 max-w-[52ch] text-[15.5px] leading-[1.7] text-muted-foreground"
            >
              I design and ship production frontends — React, TypeScript, motion where it
              earns its place. Clear structure, fast loads, and one obvious next step on
              every screen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-foreground px-5 py-3 text-[13.5px] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View case studies
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border-strong px-5 py-3 text-[13.5px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Start a project
              </a>
            </motion.div>
          </div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid content-end gap-px self-end border-t border-border"
          >
            {META.map((m) => (
              <div
                key={m.k}
                className="flex items-baseline justify-between gap-6 border-b border-border py-4"
              >
                <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {m.k}
                </dt>
                <dd className="text-right text-sm text-foreground">{m.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
