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
          className="glass-liquid relative overflow-hidden rounded-[32px] p-10 sm:p-14"
        >
          <div
            className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(ellipse, oklch(0.5 0.25 300 / 50%), transparent 70%)" }}
          />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="font-display text-2xl tracking-tight text-foreground">
                Cayn
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
                  ["Home", "/"],
                  ["About", "/about"],
                  ["Services", "/services"],
                  ["Projects", "/projects"],
                  ["FAQ", "/faq"],
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
                    href="mailto:jacopo.dev0@gmail.com"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    jacopo.dev0@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Start a project
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative mt-10 flex justify-center">
            <motion.a
              href="https://discord.com/users/1266052744746106895"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.92, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(88,101,242,0.7)]"
              style={{
                background: "linear-gradient(135deg, #5865F2 0%, #7983f5 100%)",
              }}
            >
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                className="relative z-10"
              >
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.78 13.78 0 0 0-.61 1.255 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.255.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.003-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="relative z-10">Discord</span>
            </motion.a>
          </div>

          <div className="relative mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <div>© {new Date().getFullYear()} Cayn. All rights reserved.</div>
            <div>Crafted with care · Built in 2026</div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
