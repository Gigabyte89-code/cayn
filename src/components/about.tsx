import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function ToolLogo({ src, alt, name }: { src?: string; alt: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <span className="flex h-4 w-4 items-center justify-center text-[8px] font-bold uppercase text-muted-foreground">
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

const SOLVES = [
  {
    n: "01",
    title: "You have no site — or one that ages you",
    desc: "I ship a fast, mobile-first site that looks like the business you actually run, usually in days, not months.",
  },
  {
    n: "02",
    title: "People visit but never contact you",
    desc: "Clear structure, one obvious action per screen, forms that land in your inbox. Traffic turns into messages.",
  },
  {
    n: "03",
    title: "Your idea is still a document",
    desc: "I turn a rough concept into a working product — real screens, real data, something you can put in front of users.",
  },
];

const STATS = [
  { value: "2", label: "Live client products" },
  { value: "< 2 wks", label: "Typical delivery" },
  { value: "24h", label: "Reply time" },
];

const TOOLS = [
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma" },
  { name: "Framer", logo: "https://cdn.simpleicons.org/framer/ffffff" },
  { name: "Spline", logo: "https://app.spline.design/favicon.ico" },
  { name: "Claude Code", logo: "https://cdn.simpleicons.org/claude" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">About</div>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
              I build the thing
              <br />
              <span className="text-gradient-brand">that makes you money.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              I'm Cayn, a developer and digital creator. I don't sell "web presence" —
              I fix concrete problems: a site nobody trusts, a product that only exists
              in your head, a page that gets clicks and no replies.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              You get one person end to end: design, build, copy structure and launch.
              No agency handoffs, no waiting weeks for a mockup.
            </p>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-2 border-b border-accent/40 pb-1 text-sm font-medium text-foreground transition-colors hover:border-accent"
            >
              Tell me your problem
              <ArrowUpRight
                size={15}
                className="text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-foreground">{s.value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <div className="divide-y divide-border border-y border-border">
              {SOLVES.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group flex gap-6 py-7 transition-colors"
                >
                  <span className="mt-1 font-display text-xs text-accent">{s.n}</span>
                  <div>
                    <h3 className="text-lg text-foreground transition-transform duration-300 group-hover:translate-x-1">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <div className="eyebrow">Toolkit</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    <ToolLogo src={t.logo} alt={`${t.name} logo`} name={t.name} />
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
