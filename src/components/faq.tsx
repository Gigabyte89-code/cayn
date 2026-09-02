import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";


export const FAQ_ITEMS = [
  {
    q: "How much does a business website cost?",
    a: "A one-page landing site typically starts around €400, while a multi-page business website with a catalog, forms and SEO setup usually lands between €700 and €1,800. You always get a fixed quote before we start — no hourly surprises.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most business websites go live in 1–2 weeks from the moment I have your texts, photos and logo. Landing pages are often ready in a few days, and larger catalog or e-commerce projects take 3–4 weeks.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. I offer optional monthly maintenance covering content updates, technical fixes, dependency updates and performance checks, so your site keeps working while you focus on your business.",
  },
  {
    q: "Will my website work well on phones?",
    a: "Every site I build is mobile-first and responsive: layouts, images and forms are designed for phones first, then scaled up to tablet and desktop. Most local businesses get the majority of their visits from mobile.",
  },
  {
    q: "Is SEO included in the website?",
    a: "Yes. Clean semantic HTML, unique titles and descriptions, structured data, fast loading, sitemap and robots.txt are part of every project, so Google can index and rank your pages from day one.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I can rebuild an outdated or slow site with modern technology, keep the content and URLs that already rank, and improve speed, design and conversion at the same time.",
  },
  {
    q: "Do you work with clients outside Italy?",
    a: "Yes. I'm based in Apulia, Italy, and work remotely with clients anywhere. Communication happens by email or video call, and you always talk directly to the person building your site.",
  },
];

export function FAQ() {
  const [active, setActive] = useState(0);
  const current = FAQ_ITEMS[active]!;

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
            FAQ · {FAQ_ITEMS.length} questions
          </div>
          <h2 className="mt-5 font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Questions before hiring a </span>
            <span className="text-gradient-brand italic">web developer.</span>
          </h2>
          <p className="mt-6 max-w-xl text-balance text-muted-foreground">
            Costs, timelines, maintenance and SEO — the answers business owners ask for
            most before starting a website project.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Index */}
          <ol className="border-t border-border">
            {FAQ_ITEMS.map((item, i) => {
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
                Answer {String(active + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 font-display text-2xl leading-tight sm:text-3xl">{current.q}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{current.a}</p>
            </motion.div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                Ask me your question
              </Link>
              <span className="text-xs text-muted-foreground">
                Answered personally, usually within 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
