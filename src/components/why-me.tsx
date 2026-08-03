import { motion } from "framer-motion";
import { Timer, MessagesSquare, Receipt, Cpu, Search, Smartphone, Quote } from "lucide-react";

const POINTS = [
  {
    icon: Timer,
    title: "Fast delivery",
    desc: "A business website live in 1–2 weeks, revisions included — no endless waiting.",
  },
  {
    icon: MessagesSquare,
    title: "Direct communication",
    desc: "You always talk to the person building your site. No agency layers, no ticket queues.",
  },
  {
    icon: Receipt,
    title: "Transparent pricing",
    desc: "A clear quote before we start, with no hidden costs or surprise subscriptions.",
  },
  {
    icon: Cpu,
    title: "Modern technology",
    desc: "React, TypeScript and Tailwind: sites that load fast, stay secure and scale with you.",
  },
  {
    icon: Search,
    title: "SEO included",
    desc: "Clean structure, metadata and structured data from day one, so Google can find you.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    desc: "Your site looks right on phones — where most of your customers actually are.",
  },
];

export function WhyMe() {
  return (
    <section id="why-me" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">Why work with me</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">One partner for your whole </span>
            <span className="text-gradient-brand italic">website project.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Freelance developer and web designer building business websites, landing pages
            and online stores for companies that want to grow online — based in Puglia,
            Italy, working with clients anywhere.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="glass-liquid liquid-sheen hover-lift rounded-3xl p-7"
            >
              <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                <p.icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="mt-5 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-liquid mt-8 rounded-[32px] p-8 sm:p-10"
        >
          <Quote size={20} style={{ color: "var(--accent)" }} />
          <blockquote className="mt-4 font-display text-xl leading-relaxed sm:text-2xl">
            “We finally have a website that looks as good as our masseria. Guests book a
            table and ask for our olive oil directly from their phones.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-muted-foreground">
            Occhio Mininno Agritourism — Ruvo di Puglia, Italy
            <span className="mt-1 block text-xs">Translated from Italian.</span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-liquid mt-8 flex flex-col items-center gap-5 rounded-[32px] p-10 text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl">
            <span className="text-gradient">Got a project in mind? </span>
            <span className="text-gradient-brand italic">Get a free quote.</span>
          </h3>
          <p className="max-w-lg text-sm text-muted-foreground">
            Tell me about your business and I'll reply with a clear proposal on timeline,
            cost and the results you can expect.
          </p>
          <a
            href="/contact"
            className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Request a free quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
