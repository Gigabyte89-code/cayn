import { motion } from "framer-motion";

const GROUPS = [
  {
    label: "Core",
    items: [
      { name: "React", note: "component architecture" },
      { name: "TypeScript", note: "typed end to end" },
      { name: "Tailwind CSS", note: "token-driven styling" },
      { name: "Framer Motion", note: "purposeful motion" },
    ],
  },
  {
    label: "Design",
    items: [
      { name: "Figma", note: "layout & systems" },
      { name: "Spline", note: "3D when it fits" },
      { name: "Framer", note: "rapid prototypes" },
    ],
  },
  {
    label: "Delivery",
    items: [
      { name: "Vite", note: "build tooling" },
      { name: "Lovable", note: "ship fast" },
      { name: "Claude Code", note: "pair programming" },
      { name: "GA4", note: "measure what ships" },
    ],
  },
];

export function Stack() {
  return (
    <section id="stack" className="border-b border-border py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Tech stack</div>
            <h2 className="mt-5 max-w-[26ch] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.12]">
              A small toolset, used well.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-[1.7] text-muted-foreground">
            I keep the stack deliberately narrow so every project inherits the same
            conventions and stays maintainable.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border-t border-border md:grid-cols-3">
          {GROUPS.map((g, gi) => (
            <div
              key={g.label}
              className="border-b border-border pt-7 pb-8 md:border-r md:pr-8 md:last:border-r-0 md:[&:not(:first-child)]:pl-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] tabular-nums text-accent">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[13px] uppercase tracking-[0.16em] text-muted-foreground">
                  {g.label}
                </h3>
              </div>
              <ul className="mt-5 divide-y divide-border">
                {g.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-[15px] text-foreground transition-colors group-hover:text-accent">
                      {item.name}
                    </span>
                    <span className="text-right text-[12px] text-muted-foreground">
                      {item.note}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
