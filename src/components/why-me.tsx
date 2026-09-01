import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePointerGlow } from "@/hooks/use-pointer-glow";

/**
 * Editorial numbered list — deliberately NOT a card grid.
 * This block lives only on /about; it is never repeated on other pages.
 */
const POINTS = [
  {
    n: "01",
    title: "You write to me, not to an account manager",
    body: "The person answering your email is the person writing the code. No briefing passed down three levels, no ticket number, no \"I'll check with the team\".",
    meta: "reply time · usually < 24h",
  },
  {
    n: "02",
    title: "Two weeks, normally less",
    body: "The Occhio Mininno site went live 9 days after the first message — catalog, order form and Google indexing included. Revisions are part of that, not an extra invoice.",
    meta: "occhiomininno · 9 days brief→live",
  },
  {
    n: "03",
    title: "You know the price before I start",
    body: "One fixed quote, written down. If the scope grows halfway through we talk about it first — you'll never open an invoice with something on it you didn't agree to.",
    meta: "fixed quote · no hourly billing",
  },
  {
    n: "04",
    title: "Built by hand, in React",
    body: "No page builder, no plugin stack quietly rotting in the background. React, TypeScript and Tailwind, which is why these pages load in well under a second.",
    meta: "react 19 · typescript · tailwind 4",
  },
  {
    n: "05",
    title: "Google can actually read it",
    body: "Semantic markup, unique titles, structured data, sitemap. Done at build time on every page — not sold back to you later as an \"SEO package\".",
    meta: "structured data on 6/6 pages",
  },
  {
    n: "06",
    title: "Designed on a phone screen first",
    body: "Most people who find your business are standing outside it holding a phone. So I start there and scale up, instead of shrinking a desktop layout and hoping.",
    meta: "mobile-first · tested on real devices",
  },
];

export function WhyMe() {
  const glow = usePointerGlow<HTMLDivElement>();

  return (
    <section id="why-me" className="relative flat-band px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* Sticky asymmetric header */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="label-mono">Why work with me</div>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Six honest </span>
              <span className="text-gradient-brand italic">reasons.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I'm a freelance developer in Puglia, Italy, building websites for small
              companies and local businesses. Here's what actually changes when you
              work with one person instead of an agency.
            </p>
          </motion.div>

          {/* Editorial rows */}
          <ol className="relative">
            {POINTS.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-t border-border first:border-t-0"
              >
                <div
                  {...glow}
                  className="glow-follow -mx-4 flex flex-col gap-3 rounded-2xl px-4 py-8 transition-colors duration-500 sm:flex-row sm:gap-8"
                >
                  <div className="index-num shrink-0 text-2xl sm:pt-1 sm:text-3xl">
                    {p.n}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl leading-tight sm:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                      {p.body}
                    </p>
                    <div className="label-mono mt-4 flex items-center gap-2">
                      <span className="accent-dot" />
                      {p.meta}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* The one testimonial on the whole site */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 border-l-2 pl-6 sm:pl-10"
          style={{ borderColor: "color-mix(in oklab, var(--accent) 55%, transparent)" }}
        >
          <blockquote className="max-w-3xl font-display text-2xl leading-[1.3] sm:text-4xl">
            <span className="text-gradient">
              “We finally have a website that looks as good as our masseria. Guests book a
              table and ask for our olive oil straight from their phones.”
            </span>
          </blockquote>
          <figcaption className="label-mono mt-5">
            Occhio Mininno Agritourism — Ruvo di Puglia · translated from Italian
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-20 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-sm text-muted-foreground">
            Tell me what your business does and roughly what you need. I'll reply with a
            price, a timeline, and what I'd do differently.
          </p>
          <Link
            to="/contact"
            className="liquid-sheen inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Ask me what it would cost
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
