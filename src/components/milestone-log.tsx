import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";

const LOG = [
  {
    year: "2025",
    label: "ICDL Essentials certified",
    note: "Verified digital competencies — the formal baseline behind the self-taught part.",
  },
  {
    year: "2025",
    label: "Cashow shipped",
    note: "A personal-finance web app: budgets, categories and charts, built and released solo.",
  },
  {
    year: "2026",
    label: "Occhio Mininno went live",
    note: "Catalog, order form and Google indexing — 9 days from the first message.",
  },
  {
    year: "2026",
    label: "Portfolio rebuilt from scratch",
    note: "Six hand-written pages, structured data on every one of them.",
  },
];

const STATS = [
  { to: 9, suffix: "", label: "days brief → live", sub: "on the last business site" },
  { to: 6, suffix: "/6", label: "pages with structured data", sub: "SEO done at build time" },
  { to: 24, suffix: "h", label: "usual reply time", sub: "you write to me directly" },
  { to: 100, suffix: "%", label: "custom code", sub: "no page builder, no plugins" },
];

export function MilestoneLog() {
  return (
    <section id="log" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="eyebrow mb-5">The log</div>
            <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl">
              <span className="text-gradient">What actually </span>
              <span className="text-gradient-brand italic">happened.</span>
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              No invented numbers. Just the things that shipped, in the order they
              shipped, and what came out of them.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <CountUp
                    to={s.to}
                    suffix={s.suffix}
                    className="font-display text-3xl text-foreground sm:text-4xl"
                  />
                  <div className="mt-1.5 text-xs font-medium text-foreground">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <ol className="relative">
            {LOG.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="border-t border-border py-7 first:border-t-0 first:pt-0"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span style={{ color: "var(--accent)" }}>{item.year}</span>
                  <span className="mx-2">·</span>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
                  {item.label}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {item.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
