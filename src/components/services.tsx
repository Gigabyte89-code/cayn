import { motion } from "framer-motion";
import { ArrowUpRight, Code2, LayoutDashboard, Briefcase, Rocket, Wand2 } from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Modern, responsive websites built for speed and clean code.",
    benefit: "Loads in under 2s on mobile — visitors stop leaving before your page appears.",
  },
  {
    icon: LayoutDashboard,
    title: "UI / UX Design",
    desc: "Interfaces designed around how people actually behave.",
    benefit: "Fewer clicks to the action that matters, so more people finish it.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Personal sites for students, developers and professionals.",
    benefit: "A link you can send to a recruiter or client instead of explaining yourself.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    desc: "Focused single pages for a product, service or launch.",
    benefit: "One clear offer, one clear action — built to collect leads from day one.",
  },
  {
    icon: Wand2,
    title: "Digital Solutions",
    desc: "From rough idea to a working, usable digital product.",
    benefit: "You get something real to test with users instead of another slide deck.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="eyebrow">Services</div>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] sm:text-5xl">
              What I build, and{" "}
              <span className="text-gradient-brand">what it does for you.</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Let's talk
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative bg-background p-8 transition-colors duration-300 hover:bg-card/60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent">
                <s.icon size={18} />
              </div>
              <h3 className="mt-6 text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="eyebrow text-accent">What you get</div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/85">{s.benefit}</p>
              </div>
            </motion.div>
          ))}
          <div className="hidden bg-background lg:block" />
        </div>
      </div>
    </section>
  );
}
