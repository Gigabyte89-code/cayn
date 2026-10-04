import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PhoneMockup } from "@/components/finance-app";
import { useT } from "@/lib/i18n";

const PROJECTS_DATA = [
  { image: null as string | null, hash: "finance" },
  { image: "/projects/occhio-hero.png", hash: "agritourism" },
];

export function ProjectsPreview() {
  const d = useT();
  const PROJECTS = PROJECTS_DATA.map((p, i) => ({ ...p, ...d.projectsPreview.items[i] }));
  return (
    <section id="projects-preview" className="relative px-6 py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="eyebrow mb-5">{d.projectsPreview.eyebrow}</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">{d.projectsPreview.title1}</span>
            <span className="text-gradient-brand italic">{d.projectsPreview.title2}</span>
          </h2>
        </motion.div>

        <div className="mt-20 space-y-20 lg:space-y-28">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`border-glow-card group grid overflow-hidden border-t border-border pt-6 lg:grid-cols-12 lg:gap-10 ${i === 1 ? "lg:ml-auto lg:w-10/12" : ""}`}
            >
              <div className="pb-8 lg:col-span-4 lg:pb-0">
                <div className="editorial-kicker mb-5">0{i + 1} · {p.eyebrow}</div>
                <h3 className="font-display text-4xl leading-none sm:text-5xl">
                  <span className="text-gradient">{p.title}</span>
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {p.line}
                </p>
                <Link
                  to="/projects"
                  hash={p.hash}
                  className="editorial-link group mt-8"
                >
                  {d.projectsPreview.cta}
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="media-frame relative aspect-[16/10] w-full lg:col-span-8">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} ${d.projectsPreview.previewAlt}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
                    <div className="origin-top scale-[0.62] pt-4">
                      <PhoneMockup />
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-foreground/5" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
