import { motion } from "framer-motion";
import { Brain, Lightbulb, Sparkles, Target } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Lightbulb, label: "Creativity", desc: "Turning ideas into refined experiences." },
  { icon: Brain, label: "Problem Solving", desc: "Engineering thoughtful, scalable solutions." },
  { icon: Sparkles, label: "Continuous Learning", desc: "Always exploring new tools & ideas." },
  { icon: Target, label: "Attention to Detail", desc: "Pixel-perfect, end to end." },
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
              <h3 className="mt-6 text-center font-display text-2xl">Cayn</h3>
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

          {/* Timeline removed */}
        </div>
      </div>
    </section>
  );
}
