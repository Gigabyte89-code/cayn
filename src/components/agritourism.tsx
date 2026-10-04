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
import { CaseHeader } from "@/components/case-header";
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
    <section id="agritourism" className="relative px-6 py-28 sm:py-32">
      <div className="relative mx-auto max-w-7xl">
        <CaseHeader
          index="02"
          eyebrow={d.agritourism.eyebrow}
          title1={d.agritourism.title1}
          title2={d.agritourism.title2}
          lead={d.agritourism.lead}
          problem={d.agritourism.problem}
          result={d.agritourism.result}
          cta={d.agritourism.cta}
          href="https://www.agriturismocchiomininno.com"
          meta={[
            { label: d.caseMeta.role, value: d.caseMeta.roleAgri },
            { label: d.caseMeta.year, value: "2026" },
            { label: d.caseMeta.scope, value: d.caseMeta.scopeAgri },
          ]}
        />

        {/* Screens — uniform frames, media fills them edge to edge */}
        <div className="mt-16 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {[
            { shot: heroShot, alt: d.agritourism.heroAlt, caption: d.agritourism.heroCaption },
            { shot: productShot, alt: d.agritourism.productAlt, caption: d.agritourism.productCaption },
          ].map((item, i) => (
            <motion.figure
              key={item.caption}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <div className="media-frame aspect-[16/10]">
                <img src={item.shot.url} alt={item.alt} loading="lazy" />
              </div>
              <figcaption className="case-meta mt-3">{item.caption}</figcaption>
            </motion.figure>
          ))}
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
