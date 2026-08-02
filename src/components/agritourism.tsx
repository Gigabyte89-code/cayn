import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Search,
  ShoppingBasket,
  Mail,
  Gauge,
  MapPin,
  CalendarCheck,
  Images,
  Leaf,
} from "lucide-react";
import { CaseNotes } from "@/components/case-notes";
import heroShot from "@/assets/occhio-hero.png.asset.json";
import productShot from "@/assets/occhio-products.png.asset.json";

const FEATURES = [
  { icon: Search, title: "SEO optimization", desc: "Structured metadata and semantic markup for local search." },
  { icon: ShoppingBasket, title: "Product catalog", desc: "Organic Coratina olive oil, presented with dedicated pages." },
  { icon: Mail, title: "Email order requests", desc: "Pre-filled requests sent straight to the owner's inbox." },
  { icon: Gauge, title: "Performance first", desc: "Optimized media and smooth motion on every device." },
];

const HIGHLIGHTS = [
  { icon: CalendarCheck, label: "Table booking form" },
  { icon: Images, label: "Photo gallery" },
  { icon: MapPin, label: "Maps & directions" },
  { icon: Leaf, label: "Farm-to-table story" },
];

export function Agritourism() {
  return (
    <section id="agritourism" className="relative px-6 py-32">
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">Client project</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Occhiomininno </span>
            <span className="text-gradient-brand italic">Agritourism.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Development of a professional website for a Puglian agritourism business,
            featuring a modern design, SEO optimization, a product catalog, an
            email-based order request system, and performance optimized for all devices.
          </p>

          <CaseNotes
            problem="A family-run masseria with no real web presence: bookings and olive oil orders arrived only by phone or word of mouth, and nobody searching locally could find them."
            result="A fast, SEO-ready site with a product catalog and email order requests — guests can now book a table or ask for oil in a couple of taps, from any device."
          />

          <div className="mt-10 flex justify-center">
            <a
              href="https://agriturismocchiomininno.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-sheen group relative inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              Visit website
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

        </motion.div>

        {/* Screens — equal height, media fills the frame (no dead space) */}
        <div className="mt-20 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="glass-liquid liquid-sheen flex flex-col rounded-[32px] p-2"
          >
            <div className="relative h-[260px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[440px]">
              <img
                src={heroShot.url}
                alt="Sito web aziendale realizzato per l'agriturismo Occhio Mininno in Puglia — homepage con masseria"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background/40 via-transparent to-white/5" />
            </div>
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">
              Landing experience — Ruvo di Puglia, since 1985
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-liquid liquid-sheen flex flex-col rounded-[32px] p-2"
          >
            <div className="relative h-[260px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[440px]">
              <img
                src={productShot.url}
                alt="Catalogo prodotti del sito web realizzato per un agriturismo pugliese — olio extravergine biologico"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background/40 via-transparent to-white/5" />
            </div>
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">
              Product catalog — organic Coratina olive oil
            </figcaption>
          </motion.figure>
        </div>

        {/* Feature grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-liquid liquid-sheen hover-lift rounded-3xl p-6"
            >
              <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                <f.icon size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h4 className="mt-4 font-display text-lg">{f.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Extra highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-liquid mt-8 rounded-[32px] p-8"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Also included
              </div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                <span className="text-gradient">Built for real </span>
                <span className="text-gradient-brand italic">guests.</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Bookings, gallery, services and directions — everything a family-run
                masseria needs to turn visitors into guests.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h.label}
                  whileHover={{ x: 4 }}
                  className="glass-liquid liquid-sheen flex items-center gap-3 rounded-2xl p-3"
                >
                  <div className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <h.icon size={15} />
                  </div>
                  <span className="text-sm">{h.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
