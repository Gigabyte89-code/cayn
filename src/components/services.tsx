import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { useT } from "@/lib/i18n";

export function Services() {
  const d = useT();
  const [open, setOpen] = useState<string>("web");
  const glow = usePointerGlow<HTMLButtonElement>();

  return (
    <section id="services" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="label-mono">{d.services.label}</div>
          <h2 className="mt-4 font-display text-6xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-gradient">{d.services.title1}</span>
            <span className="text-gradient-brand italic">{d.services.title2}</span>
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {d.services.lead}
          </p>
        </motion.div>

        {/* Expandable list — only the active service shows its detail */}
        <div className="mt-16 border-t border-border">
          {d.services.items.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="border-b border-border"
              >
                <button
                  {...glow}
                  onClick={() => setOpen(isOpen ? "" : s.id)}
                  aria-expanded={isOpen}
                  className="glow-follow group flex w-full items-baseline gap-4 rounded-2xl px-2 py-7 text-left sm:gap-8 sm:px-4"
                >
                  <span className="index-num shrink-0 text-sm">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-3xl leading-tight transition-colors duration-500 sm:text-5xl ${
                        isOpen ? "text-gradient-brand italic" : "text-gradient"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="label-mono mt-2 block">{s.tag}</span>
                  </span>
                  <span
                    className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-500"
                    style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                    aria-hidden
                  >
                    <span className="relative block h-3 w-3">
                      <span
                        className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2"
                        style={{ background: "var(--accent)" }}
                      />
                      <span
                        className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2"
                        style={{ background: "var(--accent)" }}
                      />
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 px-2 pb-9 sm:grid-cols-[1.1fr_1fr] sm:gap-12 sm:px-4 sm:pl-16">
                        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                          {s.body}
                        </p>
                        <ul className="space-y-2.5">
                          {s.detail.map((det) => (
                            <li key={det} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="accent-dot mt-1.5 shrink-0" />
                              {det}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono">
            {d.services.footNote}
          </p>
          <Link
            to="/contact"
            className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            {d.services.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
