import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import { useT } from "@/lib/i18n";

const LOG_YEARS = ["2025", "2025", "2026", "2026"];

const STATS_DATA = [
  { to: 9, suffix: "" },
  { to: 6, suffix: "/6" },
  { to: 24, suffix: "h" },
  { to: 100, suffix: "%" },
];

export function MilestoneLog() {
  const d = useT();
  const LOG = LOG_YEARS.map((year, i) => ({ ...d.log.items[i], year }));
  const STATS = STATS_DATA.map((s, i) => ({ ...s, ...d.log.stats[i] }));
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
            <div className="eyebrow mb-5">{d.log.eyebrow}</div>
            <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl">
              <span className="text-gradient">{d.log.title1}</span>
              <span className="text-gradient-brand italic">{d.log.title2}</span>
            </h2>
            <p className="mt-5 max-w-sm text-muted-foreground">
              {d.log.lead}
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
