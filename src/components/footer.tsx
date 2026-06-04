import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong relative overflow-hidden rounded-[32px] p-10 sm:p-14"
        >
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(ellipse, oklch(0.5 0.25 280 / 50%), transparent 70%)" }}
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="font-display text-3xl">
                JACOPO<span className="text-gradient-brand">.</span>
              </div>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                Developer & Digital Creator — designing and building modern digital
                experiences with care for every detail.
              </p>
            </div>

            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                Navigate
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  ["Home", "#home"],
                  ["About", "#about"],
                  ["Services", "#services"],
                  ["Finance App", "#finance"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                Contact
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:hello@jacopo.dev"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    hello@jacopo.dev
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Start a project
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <div>© {new Date().getFullYear()} Jacopo. All rights reserved.</div>
            <div>Crafted with care · Built in 2026</div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
