import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  Briefcase,
  Rocket,
  Wand2,
} from "lucide-react";
import { useRef, type ReactNode } from "react";

const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Modern websites with responsive design and optimized performance.",
    benefit: "Your site loads fast and looks right on every phone — fewer visitors lost before the first scroll.",
  },
  {
    icon: LayoutDashboard,
    title: "UI / UX Design",
    desc: "Clean interfaces focused on usability and user experience.",
    benefit: "People find what they came for in seconds, so more of them actually reach the contact form.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Custom personal portfolios for students, developers, and professionals.",
    benefit: "One link that presents your work seriously — ready to send to recruiters or clients.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    desc: "Modern landing pages for startups and personal projects.",
    benefit: "A single focused page built around one action: sign up, book, or buy.",
  },
  {
    icon: Wand2,
    title: "Digital Solutions",
    desc: "Helping transform ideas into working digital products.",
    benefit: "You go from idea to something real you can show and test, in days rather than months.",
  },
];


function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 150, damping: 15 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
        my.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.25 168 / 50%), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="eyebrow mx-auto mb-5">Services</div>
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">What I </span>
            <span className="text-gradient-brand italic">create.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-muted-foreground">
            Every service below comes with the same promise: something concrete
            online, built around your goals — not a template with your logo on it.
          </p>

        </motion.div>

        <div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1200 }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <TiltCard className="group relative h-full">
                <div className="glass-liquid relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:bg-white/[0.08]">
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, oklch(0.65 0.25 168 / 60%), transparent 70%)" }}
                  />

                  <div
                    className="glass-liquid relative flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <s.icon size={20} style={{ color: "var(--accent)" }} />
                  </div>

                  <h3
                    className="relative mt-6 font-display text-2xl"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="relative mt-2 text-sm leading-relaxed text-muted-foreground"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {s.desc}
                  </p>

                  <div
                    className="relative mt-5 border-t pt-4"
                    style={{
                      borderColor: "color-mix(in oklab, var(--accent) 22%, transparent)",
                      transform: "translateZ(15px)",
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="accent-dot mt-1.5 shrink-0" />
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {s.benefit}
                      </p>
                    </div>
                  </div>



                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
