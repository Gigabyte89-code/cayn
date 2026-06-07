import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

const SKILLS = [
  "Computer fundamentals",
  "Digital literacy",
  "Online communication",
  "Productivity tools",
  "Digital competencies",
];

export function ICDL() {
  return (
    <section id="icdl" className="relative px-6 py-32">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 220 / 60%), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass mb-5 inline-flex rounded-full px-3 py-1 text-xs text-muted-foreground">
              Certification
            </div>
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">ICDL </span>
              <span className="text-gradient-brand italic">Essentials.</span>
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Internationally recognized certification proving verified digital
              competencies — a foundation built on rigor, accuracy, and a deep
              understanding of the digital toolset.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {SKILLS.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass flex items-center gap-2.5 rounded-full px-3.5 py-2 text-sm"
                >
                  <Check size={14} className="text-glow-2" />
                  {s}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Certificate display */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1200 }}
          >
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated sheen */}
              <motion.div
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, oklch(0.95 0.05 280 / 30%) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
              />

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Certificate
                  </div>
                  <div className="mt-1 font-display text-2xl">ICDL Essentials</div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-strong flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    boxShadow: "0 0 40px oklch(0.7 0.22 280 / 40%)",
                  }}
                >
                  <span className="font-display text-[13px] font-semibold tracking-wider text-gradient-brand">
                    ICDL
                  </span>
                </motion.div>
              </div>

              <div className="relative my-8 h-px w-full bg-border" />

              <div className="relative">
                <div className="text-sm text-muted-foreground">Awarded</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Verified digital competencies · Issued by ICDL
                </div>
              </div>

              <div className="relative mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={14} className="text-glow-2" />
                  Verified
                </div>
                <div className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Essentials · 2025
                </div>
              </div>

              {/* Holographic corner */}
              <div
                className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-50 blur-2xl"
                style={{ background: "radial-gradient(circle, oklch(0.7 0.22 280 / 60%), transparent 70%)" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
