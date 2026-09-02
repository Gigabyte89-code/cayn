import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Sparkles, Target } from "lucide-react";

function ToolLogo({ src, alt, name }: { src?: string; alt: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <span className="flex h-4 w-4 items-center justify-center text-[8px] font-bold text-muted-foreground uppercase">
        {name.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-4 w-4 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

const HIGHLIGHTS = [
  {
    icon: Target,
    label: "You need a site that converts",
    desc: "I build pages with a clear path from first scroll to contact or purchase.",
  },
  {
    icon: Brain,
    label: "You have an idea, not a spec",
    desc: "I turn a rough concept into a working product — structure, design and code.",
  },
  {
    icon: Lightbulb,
    label: "Your current site feels dated",
    desc: "Redesign with modern motion, real hierarchy and a brand that looks intentional.",
  },
  {
    icon: Sparkles,
    label: "You want it fast and fast-loading",
    desc: "Shipped in days, optimized media, smooth on mobile and on slow connections.",
  },
];


const TOOLS = [
  {
    name: "Figma",
    logo: "https://cdn.simpleicons.org/figma",
    use: "where the layout gets decided before a single line of code",
  },
  {
    name: "Framer",
    logo: "https://cdn.simpleicons.org/framer/ffffff",
    use: "for testing motion until it stops feeling like a template",
  },
  {
    name: "Spline",
    logo: "https://app.spline.design/favicon.ico",
    use: "for the 3D pieces that carry the page instead of decorating it",
  },
  {
    name: "Lovable",
    logo: "https://lovable.dev/favicon.ico",
    use: "to go from a rough idea to something clickable the same day",
  },
  {
    name: "Claude Code",
    logo: "https://cdn.simpleicons.org/claude",
    use: "as a second pair of eyes on the code, never as the author",
  },
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
          <div className="eyebrow mx-auto mb-5">About me</div>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">I build the site your idea </span>
            <span className="text-gradient-brand italic">deserves.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            I'm Cayn — developer and digital creator. I work with founders, small
            businesses and professionals who need a product online quickly, without
            it looking like a template. Design, development and launch handled end
            to end, by one person you can talk to directly.
          </p>

        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-8">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-liquid relative overflow-hidden rounded-3xl p-8"
          >
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.25 300 / 60%), transparent 70%)" }}
            />
            <div className="relative">
              <div className="glass mx-auto flex h-32 w-32 items-center justify-center rounded-full">
                <span className="font-display text-5xl text-gradient-brand">C</span>
              </div>
              <h3 className="mt-6 text-center font-display text-2xl">Cayn</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Developer & Digital Creator
              </p>

              <div className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                What I can solve for you
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="glass hover-lift flex items-start gap-3 rounded-2xl p-4"
                  >
                    <div className="glass-liquid flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                      <h.icon size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{h.label}</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {h.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Toolkit — narrative marquee */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative -mx-6 overflow-hidden py-8"
          >
            <div className="mx-auto mb-6 max-w-7xl px-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Toolkit · what each thing is actually for
              </div>
            </div>

            <div
              className="relative"
              style={{
                maskImage:
                  "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <div className="animate-marquee flex w-max items-center gap-10 pl-6">
                {[...TOOLS, ...TOOLS].map((t, i) => (
                  <span
                    key={`${t.name}-${i}`}
                    className="flex shrink-0 items-center gap-3 text-lg sm:text-2xl"
                  >
                    <ToolLogo
                      src={t.logo ?? undefined}
                      alt={`${t.name} logo`}
                      name={t.name}
                    />
                    <span className="font-display text-foreground">{t.name}</span>
                    <span className="text-muted-foreground">{t.use}</span>
                    <span style={{ color: "var(--accent)" }}>/</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
