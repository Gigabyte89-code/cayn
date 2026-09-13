import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { useT } from "@/lib/i18n";

/**
 * Editorial numbered list — deliberately NOT a card grid.
 * This block lives only on /about; it is never repeated on other pages.
 */
const NUMBERS = ["01", "02", "03", "04", "05", "06"];

export function WhyMe() {
  const d = useT();
  const glow = usePointerGlow<HTMLDivElement>();
  const points = d.whyMe.points.map((p, i) => ({ ...p, n: NUMBERS[i] }));

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
            <div className="label-mono">{d.whyMe.label}</div>
            <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{d.whyMe.title1}</span>
              <span className="text-gradient-brand italic">{d.whyMe.title2}</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {d.whyMe.lead}
            </p>
          </motion.div>

          {/* Editorial rows */}
          <ol className="relative">
            {points.map((p, i) => (
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
              {d.whyMe.quote}
            </span>
          </blockquote>
          <figcaption className="label-mono mt-5">
            {d.whyMe.quoteCaption}
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
            {d.whyMe.ctaLine}
          </p>
          <Link
            to="/contact"
            className="liquid-sheen inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            {d.whyMe.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
