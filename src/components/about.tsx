import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Lightbulb, Sparkles, Target } from "lucide-react";
import { useT } from "@/lib/i18n";

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

const HIGHLIGHT_ICONS = [Target, Brain, Lightbulb, Sparkles];

const TOOL_LOGOS: Record<string, string> = {
  Figma: "https://cdn.simpleicons.org/figma",
  Framer: "https://cdn.simpleicons.org/framer/ffffff",
  Spline: "https://app.spline.design/favicon.ico",
  Lovable: "https://lovable.dev/favicon.ico",
  "Claude Code": "https://cdn.simpleicons.org/claude",
};

export function About() {
  const d = useT();
  const highlights = d.about.highlights.map((h, i) => ({ ...h, icon: HIGHLIGHT_ICONS[i] }));
  const tools = d.about.tools.map((t) => ({ ...t, logo: TOOL_LOGOS[t.name] }));

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
          <div className="eyebrow mx-auto mb-5">{d.about.eyebrow}</div>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{d.about.title1}</span>
            <span className="text-gradient-brand italic">{d.about.title2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            {d.about.lead}
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
                {d.about.role}
              </p>

              <div className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {d.about.solveLabel}
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
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
                {d.about.toolkitLabel}
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
                {[...tools, ...tools].map((t, i) => (
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
