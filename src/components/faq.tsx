import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const FAQ_ITEMS = [
  {
    q: "How much does a business website cost?",
    a: "A one-page landing site typically starts around €400, while a multi-page business website with a catalog, forms and SEO setup usually lands between €700 and €1,800. You always get a fixed quote before we start — no hourly surprises.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most business websites go live in 1–2 weeks from the moment I have your texts, photos and logo. Landing pages are often ready in a few days, and larger catalog or e-commerce projects take 3–4 weeks.",
  },
  {
    q: "Do you offer website maintenance after launch?",
    a: "Yes. I offer optional monthly maintenance covering content updates, technical fixes, dependency updates and performance checks, so your site keeps working while you focus on your business.",
  },
  {
    q: "Will my website work well on phones?",
    a: "Every site I build is mobile-first and responsive: layouts, images and forms are designed for phones first, then scaled up to tablet and desktop. Most local businesses get the majority of their visits from mobile.",
  },
  {
    q: "Is SEO included in the website?",
    a: "Yes. Clean semantic HTML, unique titles and descriptions, structured data, fast loading, sitemap and robots.txt are part of every project, so Google can index and rank your pages from day one.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I can rebuild an outdated or slow site with modern technology, keep the content and URLs that already rank, and improve speed, design and conversion at the same time.",
  },
  {
    q: "Do you work with clients outside Italy?",
    a: "Yes. I'm based in Apulia, Italy, and work remotely with clients anywhere. Communication happens by email or video call, and you always talk directly to the person building your site.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">FAQ</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Questions before hiring a </span>
            <span className="text-gradient-brand italic">web developer.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Costs, timelines, maintenance and SEO — the answers business owners ask for
            most before starting a website project.
          </p>
        </motion.div>

        <div className="mt-14 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.details
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-liquid liquid-sheen group rounded-3xl px-6 py-5 [&[open]_.faq-icon]:rotate-45"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <h3 className="font-display text-lg sm:text-xl">{item.q}</h3>
                <span className="glass faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300">
                  <Plus size={15} style={{ color: "var(--accent)" }} />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </motion.details>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-liquid mt-8 flex flex-col items-center gap-4 rounded-[32px] p-10 text-center"
        >
          <h3 className="font-display text-2xl sm:text-3xl">
            <span className="text-gradient">Still unsure? </span>
            <span className="text-gradient-brand italic">Let's build your website.</span>
          </h3>
          <a
            href="/contact"
            className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Get a free quote
          </a>
        </motion.div>
      </div>
    </section>
  );
}
