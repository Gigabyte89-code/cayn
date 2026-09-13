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
import { useT } from "@/lib/i18n";
const heroShot = { url: "/projects/occhio-hero.png" };
const productShot = { url: "/projects/occhio-products.png" };

const FEATURE_ICONS = [Search, ShoppingBasket, Mail, Gauge];
const HIGHLIGHT_ICONS = [CalendarCheck, Images, MapPin, Leaf];

export function Agritourism() {
  const d = useT();
  const FEATURES = d.agritourism.features.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i]! }));
  const HIGHLIGHTS = d.agritourism.highlights.map((label, i) => ({ label, icon: HIGHLIGHT_ICONS[i]! }));
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
          <div className="eyebrow mx-auto mb-5">{d.agritourism.eyebrow}</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{d.agritourism.title1}</span>
            <span className="text-gradient-brand italic">{d.agritourism.title2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            {d.agritourism.lead}
          </p>

          <CaseNotes
            problem={d.agritourism.problem}
            result={d.agritourism.result}
          />

          <div className="mt-10 flex justify-center">
            <a
              href="https://www.agriturismocchiomininno.com"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-sheen group relative inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              {d.agritourism.cta}
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
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={heroShot.url}
                alt={d.agritourism.heroAlt}
                loading="lazy"
                className="block h-auto w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background/30 via-transparent to-white/5" />
            </div>
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">
              {d.agritourism.heroCaption}
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-liquid liquid-sheen flex flex-col rounded-[32px] p-2"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={productShot.url}
                alt={d.agritourism.productAlt}
                loading="lazy"
                className="block h-auto w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-background/30 via-transparent to-white/5" />
            </div>
            <figcaption className="px-4 py-3 text-xs text-muted-foreground">
              {d.agritourism.productCaption}
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
                {d.agritourism.alsoIncluded}
              </div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                <span className="text-gradient">{d.agritourism.builtFor1}</span>
                <span className="text-gradient-brand italic">{d.agritourism.builtFor2}</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {d.agritourism.builtForLead}
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
