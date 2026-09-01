import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { usePointerGlow } from "@/hooks/use-pointer-glow";

const SERVICES = [
  {
    id: "web",
    title: "Business websites",
    tag: "from €700 · 1–2 weeks",
    body: "The full thing: pages, catalog or menu, contact and order forms, Google Business details, indexing. Built in React so it stays fast as you add to it.",
    detail: [
      "Structure and copy planned together before I write any code",
      "Catalog / menu / gallery driven by content you can send me over email",
      "Forms that land in your inbox, no third-party dashboard to learn",
    ],
  },
  {
    id: "landing",
    title: "Landing pages",
    tag: "from €400 · a few days",
    body: "One page, one action. For a launch, a seasonal offer, or an ad campaign that needs somewhere to send people.",
    detail: [
      "Written around a single conversion — book, call, buy or sign up",
      "Loads in under a second on mobile data",
      "Ready to plug into Google Ads or Meta campaigns",
    ],
  },
  {
    id: "uiux",
    title: "UI / UX design",
    tag: "Figma → live code",
    body: "I design in Figma and then build it myself, which means nothing gets lost between the mockup and the browser.",
    detail: [
      "Real layout, real type scale, real content — no lorem ipsum",
      "Interaction and motion prototyped in Framer where it matters",
      "You review it in the browser, not as a flat image",
    ],
  },
  {
    id: "redesign",
    title: "Website redesign",
    tag: "keeps your rankings",
    body: "If you already have a site that's slow, dated, or unusable on a phone: I rebuild it and keep the URLs and content that already rank.",
    detail: [
      "Old URLs preserved or redirected properly",
      "Speed and mobile layout fixed as part of the rebuild",
      "Existing text and photos reused where they still work",
    ],
  },
  {
    id: "apps",
    title: "Web apps & digital tools",
    tag: "Cashow was built this way",
    body: "When a website isn't the answer: a small custom tool with accounts, data and logic. Cashow, the finance app in my portfolio, started as exactly this kind of brief.",
    detail: [
      "Accounts, database and dashboards where the project needs them",
      "Shipped in usable slices so you can test early",
      "Same stack as the sites, so it stays cheap to maintain",
    ],
  },
];

export function Services() {
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
          <div className="label-mono">Services</div>
          <h2 className="mt-4 font-display text-6xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="text-gradient">What I </span>
            <span className="text-gradient-brand italic">actually build.</span>
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Five things, described the way I'd describe them to you on the phone. Open
            one to see what's included and roughly what it costs.
          </p>
        </motion.div>

        {/* Expandable list — only the active service shows its detail */}
        <div className="mt-16 border-t border-border">
          {SERVICES.map((s, i) => {
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
                          {s.detail.map((d) => (
                            <li key={d} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="accent-dot mt-1.5 shrink-0" />
                              {d}
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
            not sure which one you need? that's a normal question
          </p>
          <Link
            to="/contact"
            className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Describe your project to me
          </Link>
        </div>
      </div>
    </section>
  );
}
