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
  },
  {
    icon: LayoutDashboard,
    title: "UI / UX Design",
    desc: "Clean interfaces focused on usability and user experience.",
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Custom personal portfolios for students, developers, and professionals.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    desc: "Modern landing pages for startups and personal projects.",
  },
  {
    icon: Wand2,
    title: "Digital Solutions",
    desc: "Helping transform ideas into working digital products.",
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
          <div className="glass mx-auto mb-5 inline-flex rounded-full px-3 py-1 text-xs text-muted-foreground">
            My Services
          </div>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient">What I </span>
            <span className="text-gradient-brand italic">create.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            From idea to product — tailored services built around your goals,
            users, and brand.
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
                    <s.icon size={20} className="text-foreground" />
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

                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
