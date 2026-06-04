import { motion } from "framer-motion";
import { Brain, Lightbulb, Sparkles, Target } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Lightbulb, label: "Creativity", desc: "Turning ideas into refined experiences." },
  { icon: Brain, label: "Problem Solving", desc: "Engineering thoughtful, scalable solutions." },
  { icon: Sparkles, label: "Continuous Learning", desc: "Always exploring new tools & ideas." },
  { icon: Target, label: "Attention to Detail", desc: "Pixel-perfect, end to end." },
];

const TIMELINE = [
  { year: "2022", title: "First lines of code", desc: "Began exploring web development & design fundamentals." },
  { year: "2023", title: "ICDL Essentials", desc: "Earned certification covering core digital competencies." },
  { year: "2024", title: "Building products", desc: "Shipped personal portfolios, landing pages, and tools." },
  { year: "2025", title: "Finance App", desc: "Launched a personal finance management application." },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="glass mx-auto mb-5 inline-flex rounded-full px-3 py-1 text-xs text-muted-foreground">
            About Me
          </div>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">A young developer with a </span>
            <span className="text-gradient-brand italic">craft mindset.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Passionate about technology, web development, and UI/UX design — focused on
            creating useful, beautiful digital products that people love to use.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong relative overflow-hidden rounded-3xl p-8"
          >
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.25 280 / 60%), transparent 70%)" }}
            />
            <div className="relative">
              <div className="glass mx-auto flex h-32 w-32 items-center justify-center rounded-full">
                <span className="font-display text-5xl text-gradient-brand">J</span>
              </div>
              <h3 className="mt-6 text-center font-display text-2xl">Jacopo</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Developer & Digital Creator
              </p>

              <div className="mt-8 space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <motion.div
                    key={h.label}
                    whileHover={{ x: 4 }}
                    className="glass flex items-start gap-3 rounded-2xl p-3"
                  >
                    <div className="glass-strong flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                      <h.icon size={16} className="text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{h.label}</div>
                      <div className="text-xs text-muted-foreground">{h.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            <ul className="space-y-5">
              {TIMELINE.map((t, i) => (
                <motion.li
                  key={t.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass relative flex items-start gap-5 rounded-3xl p-5 transition-all hover:bg-white/[0.06]"
                >
                  <div className="glass-strong relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl">
                    <span className="font-display text-sm text-gradient-brand">{t.year}</span>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-medium">{t.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
