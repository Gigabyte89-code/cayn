import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroShot from "@/assets/occhio-hero.png.asset.json";
import productShot from "@/assets/occhio-products.png.asset.json";

type CaseStudy = {
  index: string;
  name: string;
  kind: string;
  year: string;
  summary: string;
  challenge: string;
  outcome: string;
  stack: string[];
  href: string;
  media: { src: string; alt: string; caption: string }[];
};

const CASES: CaseStudy[] = [
  {
    index: "01",
    name: "Cashow",
    kind: "Personal finance app",
    year: "2026",
    summary:
      "A mobile-first budgeting product: accounts, categorised movements and a monthly view that answers one question — can I spend this or not.",
    challenge:
      "Finance UIs drown users in charts. The hard part was reducing a full ledger to a single screen a person can read in three seconds, while keeping every number reachable in two taps.",
    outcome:
      "A living product with a fixed information hierarchy: balance first, trend second, detail on demand. Interactions stay under 100 ms and the whole shell renders without layout shift.",
    stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    href: "https://cashow.lovable.app/",
    media: [],
  },
  {
    index: "02",
    name: "Occhiomininno",
    kind: "Agritourism website",
    year: "2025",
    summary:
      "A complete site for a family-run Puglian masseria: story, rooms, a catalogue of organic Coratina olive oil and order requests that reach the owner by email.",
    challenge:
      "The business existed only on social media — invisible on search and losing product requests inside direct messages. It needed to be indexable and to capture intent without a checkout system.",
    outcome:
      "Semantic, metadata-complete pages that rank locally, plus pre-filled booking and order forms landing straight in the inbox. Requests now arrive structured instead of scattered.",
    stack: ["React", "TypeScript", "Tailwind", "SEO", "Email forms"],
    href: "https://agriturismocchiomininno.lovable.app",
    media: [
      {
        src: heroShot.url,
        alt: "Homepage of the Occhiomininno agritourism website showing the Puglian masseria at dusk",
        caption: "Landing experience — Ruvo di Puglia, since 1985",
      },
      {
        src: productShot.url,
        alt: "Product page for organic Puglian extra virgin olive oil",
        caption: "Catalogue — organic Coratina extra virgin olive oil",
      },
    ],
  },
];

function CashowPreview() {
  return (
    <div className="surface-flat aspect-[16/10] w-full overflow-hidden p-5 sm:p-8">
      <div className="mx-auto flex h-full max-w-[300px] flex-col justify-center">
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          July balance
        </div>
        <div className="mt-2 font-display text-4xl tabular-nums text-foreground">
          € 2.418<span className="text-muted-foreground">,60</span>
        </div>
        <div className="mt-1 text-[12.5px] text-accent">+ 8,4% vs June</div>

        <div className="mt-7 flex h-20 items-end gap-1.5" aria-hidden="true">
          {[38, 52, 30, 64, 46, 72, 58, 84, 41, 66, 55, 78].map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
              className={`flex-1 ${i === 11 ? "bg-accent" : "bg-secondary"}`}
            />
          ))}
        </div>

        <ul className="mt-7 divide-y divide-border border-t border-border text-[13px]">
          {[
            ["Groceries", "− 64,20"],
            ["Subscriptions", "− 21,99"],
            ["Salary", "+ 1.850,00"],
          ].map(([label, amount]) => (
            <li key={label} className="flex items-center justify-between py-2.5">
              <span className="text-muted-foreground">{label}</span>
              <span className="tabular-nums text-foreground">{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Case({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border pt-10 first:border-t-0 first:pt-0"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] tabular-nums text-accent">{study.index}</span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {study.kind} · {study.year}
            </span>
          </div>
          <h3 className="mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1]">
            {study.name}
          </h3>
          <p className="mt-4 max-w-[44ch] text-[14.5px] leading-[1.7] text-muted-foreground">
            {study.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <li
                key={s}
                className="border border-border px-2.5 py-1 text-[11.5px] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>

          <a
            href={study.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 border-b border-border pb-1 text-[13.5px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Visit live site
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div>
          {study.media.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.55fr_1fr]">
              {study.media.map((m, i) => (
                <figure key={m.src} className="surface-flat overflow-hidden">
                  <div className="relative h-[240px] overflow-hidden sm:h-[340px]">
                    <img
                      src={m.src}
                      alt={m.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="border-t border-border px-4 py-3 text-[12px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} — {m.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <CashowPreview />
          )}

          <div className="mt-8 grid grid-cols-1 gap-px border-t border-border sm:grid-cols-2">
            <div className="border-b border-border pt-6 pb-7 sm:border-r sm:pr-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Challenge
              </div>
              <p className="mt-3 text-[14px] leading-[1.7] text-foreground/85">
                {study.challenge}
              </p>
            </div>
            <div className="border-b border-border pt-6 pb-7 sm:pl-8">
              <div className="text-[11px] uppercase tracking-[0.18em] text-accent">
                Outcome
              </div>
              <p className="mt-3 text-[14px] leading-[1.7] text-foreground/85">
                {study.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="border-b border-border py-24 sm:py-28">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="flex flex-col gap-4 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="eyebrow">Featured work</div>
            <h2 className="mt-5 max-w-[24ch] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.12]">
              Two products, shipped and in use.
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14px] leading-[1.7] text-muted-foreground">
            Each case study covers the brief, the hard constraint, and what changed once
            it went live.
          </p>
        </div>

        <div className="mt-14 space-y-20">
          {CASES.map((c) => (
            <Case key={c.name} study={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
