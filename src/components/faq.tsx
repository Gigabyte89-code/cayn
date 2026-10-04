import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { en } from "@/lib/translations";

// Kept in English for JSON-LD structured data consumed by routes/faq.tsx and routes/index.tsx.
export const FAQ_ITEMS = en.faq.items;

export function FAQ() {
  const d = useT();
  const items = d.faq.items;
  const [active, setActive] = useState(0);
  const current = items[active]!;

  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            FAQ · {items.length} {d.faq.eyebrowSuffix}
          </div>
          <h2 className="mt-5 font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{d.faq.title1}</span>
            <span className="text-gradient-brand italic">{d.faq.title2}</span>
          </h2>
          <p className="mt-6 max-w-xl text-balance text-muted-foreground">
            {d.faq.lead}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Index */}
          <ol className="border-t border-border">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.q} className="border-b border-border">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className="group flex w-full items-baseline gap-4 py-4 text-left"
                  >
                    <span
                      className="font-mono text-[11px] tabular-nums"
                      style={{ color: isActive ? "var(--accent)" : undefined }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-lg leading-snug transition-colors sm:text-xl ${
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {item.q}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Answer */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              key={current.q}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass-liquid rounded-3xl p-8 sm:p-10"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                {d.faq.answerLabel} {String(active + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">{current.q}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{current.a}</p>
            </motion.div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                {d.faq.cta}
              </Link>
              <span className="text-xs text-muted-foreground">
                {d.faq.ctaNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
