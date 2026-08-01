import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    n: "01",
    title: "Structure before style",
    body: "Content hierarchy and reading order come first. Visual decisions follow the structure instead of hiding it.",
  },
  {
    n: "02",
    title: "Motion as feedback",
    body: "Animation confirms an action, orients the eye, or reveals the next step. Nothing moves purely for effect.",
  },
  {
    n: "03",
    title: "Ship, then refine",
    body: "A working product in front of real users beats a perfect mockup. I ship early and tighten in short passes.",
  },
];

export function About() {
  return (
    <section id="about" className="border-b border-border py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <div>
            <div className="eyebrow">About</div>
            <h2 className="mt-5 text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.12]">
              One person, end to end — from wireframe to production.
            </h2>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="max-w-[62ch] space-y-5 text-[15.5px] leading-[1.75] text-muted-foreground"
            >
              <p>
                I work on the part of a product people actually touch: layout, states,
                copy structure, performance. Most of my projects start with a business
                that has something real to sell and no interface worth trusting.
              </p>
              <p>
                Because design and implementation sit with the same person, there are no
                handoffs to lose detail in — the spacing you approve is the spacing that
                ships. I write TypeScript, keep components small, and measure before
                adding anything heavy.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-px border-t border-border sm:grid-cols-3">
              {PRINCIPLES.map((p, i) => (
                <motion.article
                  key={p.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group border-b border-border pt-6 pb-7 sm:border-r sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
                >
                  <span className="text-[11px] tabular-nums text-accent">{p.n}</span>
                  <h3 className="mt-3 text-[15px] text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-muted-foreground">
                    {p.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
