import { motion } from "framer-motion";

const ENTRIES = [
  {
    period: "2025 — now",
    role: "Independent frontend developer",
    org: "Freelance · Puglia, Italy",
    body: "Design and delivery of client-facing sites and products end to end: research, layout, implementation, launch. Direct client contact, fixed scopes, typical delivery under two weeks.",
    tags: ["Client work", "Design + build"],
  },
  {
    period: "2026",
    role: "Product build — Cashow",
    org: "Self-directed product",
    body: "Owned an entire personal finance app from concept to public release: information architecture, component system, motion language and performance budget.",
    tags: ["Product", "Design system"],
  },
  {
    period: "2025",
    role: "ICDL certification",
    org: "ICDL Foundation",
    body: "Certified in digital competence: documents, data handling, online collaboration and IT security fundamentals — the formal baseline behind the practical work.",
    tags: ["Certified"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="eyebrow">Experience</div>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.12]">
              A short track record, all of it shipped.
            </h2>
            <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.7] text-muted-foreground">
              No inflated titles — every line below corresponds to something publicly
              online or formally certified.
            </p>
          </div>

          <ol className="border-t border-border">
            {ENTRIES.map((e, i) => (
              <motion.li
                key={e.role}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group grid grid-cols-1 gap-3 border-b border-border py-7 transition-colors sm:grid-cols-[130px_1fr] sm:gap-8"
              >
                <div className="text-[12px] tabular-nums text-muted-foreground">
                  {e.period}
                </div>
                <div>
                  <h3 className="text-[16px] text-foreground transition-transform duration-300 group-hover:translate-x-1">
                    {e.role}
                  </h3>
                  <div className="mt-1 text-[12.5px] text-accent">{e.org}</div>
                  <p className="mt-3 max-w-[58ch] text-[14px] leading-[1.7] text-muted-foreground">
                    {e.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-border px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
