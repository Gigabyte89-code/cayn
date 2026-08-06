import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PhoneMockup } from "@/components/finance-app";

const PROJECTS = [
  {
    eyebrow: "Featured project",
    title: "Cashow",
    line: "A personal finance app to track expenses, manage budgets and build real financial awareness.",
    image: null as string | null,
    hash: "finance",
  },
  {
    eyebrow: "Client project",
    title: "Occhiomininno Agritourism",
    line: "A fast, SEO-ready website for a Puglian agritourism, with product catalog and email order requests.",
    image: "/projects/occhio-hero.png",
    hash: "agritourism",
  },
];

export function ProjectsPreview() {
  return (
    <section id="projects-preview" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">Selected work</div>
          <h2 className="font-display text-4xl leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">Real projects, </span>
            <span className="text-gradient-brand italic">real results.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-liquid liquid-sheen hover-lift flex h-full flex-col overflow-hidden rounded-[32px] p-6"
            >
              <div className="eyebrow mb-4">{p.eyebrow}</div>
              <h3 className="font-display text-2xl sm:text-3xl">
                <span className="text-gradient">{p.title}</span>
              </h3>
              <p className="mt-3 min-h-[3.5rem] text-sm leading-relaxed text-muted-foreground">
                {p.line}
              </p>

              <div className="glass relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-2xl">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.title} website preview`}
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-white/5" />
              </div>

              <Link
                to="/projects"
                hash={p.hash}
                className="group mt-6 inline-flex items-center gap-2 self-start text-sm font-medium text-foreground"
              >
                See full case study
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
