import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Wallet,
  PieChart,
  Sparkles,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  { icon: Wallet, title: "Expense tracking", desc: "Effortless logging of every transaction." },
  { icon: PieChart, title: "Budget management", desc: "Smart budgets that adapt to your life." },
  { icon: TrendingUp, title: "Financial insights", desc: "Clear analytics, actionable trends." },
  { icon: Sparkles, title: "Beautiful UI", desc: "Designed to make finance feel calm." },
];

function PhoneMockup() {
  return (
    <div
      className="relative mx-auto w-[280px] sm:w-[320px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="relative aspect-[9/19] overflow-hidden rounded-[44px] p-[3px]"
        style={{
          background: "linear-gradient(160deg, oklch(0.4 0.05 280), oklch(0.15 0.02 280))",
          boxShadow:
            "0 60px 120px -20px oklch(0 0 0 / 80%), 0 0 0 1px oklch(1 0 0 / 8%), inset 0 1px 0 oklch(1 0 0 / 20%)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[42px] p-5"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.1 0.02 280) 0%, oklch(0.08 0.03 260) 100%)",
          }}
        >
          {/* Notch */}
          <div className="mx-auto mb-4 h-5 w-24 rounded-full bg-black" />

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-muted-foreground">Good morning</div>
              <div className="font-display text-base text-foreground">Jacopo</div>
            </div>
            <div className="glass h-8 w-8 rounded-full" />
          </div>

          {/* Balance card */}
          <div
            className="glass-strong mt-4 rounded-2xl p-4"
            style={{
              background: "linear-gradient(135deg, oklch(0.5 0.25 280 / 30%), oklch(0.5 0.25 220 / 20%))",
            }}
          >
            <div className="text-[10px] text-muted-foreground">Total Balance</div>
            <div className="mt-1 font-display text-2xl text-foreground">
              €4,820<span className="text-sm text-muted-foreground">.50</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-glow-2">
              <ArrowUpRight size={10} />
              +12.4% this month
            </div>
          </div>

          {/* Chart */}
          <div className="glass mt-3 rounded-2xl p-3">
            <div className="mb-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Spending</span>
              <span>Nov</span>
            </div>
            <svg viewBox="0 0 200 60" className="w-full">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7 0.22 280)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="oklch(0.7 0.22 280)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                d="M0,40 C20,30 40,45 60,35 C80,25 100,30 120,20 C140,12 160,18 200,8"
                fill="none"
                stroke="oklch(0.75 0.2 280)"
                strokeWidth="2"
              />
              <path
                d="M0,40 C20,30 40,45 60,35 C80,25 100,30 120,20 C140,12 160,18 200,8 L200,60 L0,60 Z"
                fill="url(#g1)"
              />
            </svg>
          </div>

          {/* Transactions */}
          <div className="mt-3 space-y-2">
            {[
              { name: "Coffee", cat: "Food", amt: "-€4.20", up: false },
              { name: "Salary", cat: "Income", amt: "+€1,820", up: true },
              { name: "Spotify", cat: "Subs", amt: "-€9.99", up: false },
            ].map((t) => (
              <div key={t.name} className="glass flex items-center justify-between rounded-xl p-2.5">
                <div className="flex items-center gap-2">
                  <div className="glass-strong flex h-7 w-7 items-center justify-center rounded-lg">
                    {t.up ? (
                      <ArrowUpRight size={12} className="text-glow-2" />
                    ) : (
                      <ArrowDownRight size={12} className="text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] text-foreground">{t.name}</div>
                    <div className="text-[9px] text-muted-foreground">{t.cat}</div>
                  </div>
                </div>
                <div className={`text-[11px] ${t.up ? "text-glow-2" : "text-foreground"}`}>
                  {t.amt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reflection */}
      <div
        className="pointer-events-none absolute -inset-x-10 -bottom-32 h-32 opacity-40 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at center top, oklch(0.6 0.25 280 / 60%), transparent 70%)",
        }}
      />
    </div>
  );
}

export function FinanceApp() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="finance" ref={ref} className="relative overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.4 0.25 280 / 30%), transparent 60%)",
        }}
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
            Featured Project
          </div>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl lg:text-7xl">
            <span className="text-gradient">Finance </span>
            <span className="text-gradient-brand italic">Management App.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            A personal finance app designed to help users track expenses, monitor
            spending habits, manage budgets, and build real financial awareness.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Left features */}
          <div className="space-y-4 lg:order-1">
            {FEATURES.slice(0, 2).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-strong rounded-3xl p-6"
              >
                <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                  <f.icon size={18} />
                </div>
                <h4 className="mt-4 font-display text-xl">{f.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Phone */}
          <motion.div
            style={{ y, rotate, perspective: 1200 }}
            className="lg:order-2"
          >
            <PhoneMockup />
          </motion.div>

          {/* Right features */}
          <div className="space-y-4 lg:order-3">
            {FEATURES.slice(2).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-strong rounded-3xl p-6"
              >
                <div className="glass flex h-11 w-11 items-center justify-center rounded-2xl">
                  <f.icon size={18} />
                </div>
                <h4 className="mt-4 font-display text-xl">{f.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard preview strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="glass-strong mt-20 overflow-hidden rounded-[32px] p-2"
        >
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.12 0.02 280) 0%, oklch(0.08 0.03 260) 100%)",
            }}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Monthly spend", value: "€1,240", trend: "-8%" },
                { label: "Saved", value: "€580", trend: "+22%" },
                { label: "Budgets on track", value: "6/8", trend: "+1" },
                { label: "Categories", value: "12", trend: "" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-2 font-display text-2xl text-gradient">{stat.value}</div>
                  {stat.trend && (
                    <div className="mt-1 text-[10px] text-glow-2">{stat.trend}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="glass rounded-2xl p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm text-foreground">Cashflow</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                <svg viewBox="0 0 400 100" className="w-full">
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.75 0.2 220)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="oklch(0.75 0.2 220)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                    d="M0,70 C40,60 80,80 120,55 C160,30 200,45 240,30 C280,15 320,25 400,10"
                    fill="none"
                    stroke="oklch(0.8 0.18 220)"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,70 C40,60 80,80 120,55 C160,30 200,45 240,30 C280,15 320,25 400,10 L400,100 L0,100 Z"
                    fill="url(#g2)"
                  />
                </svg>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="text-sm text-foreground">Top categories</div>
                <div className="mt-3 space-y-2.5">
                  {[
                    { c: "Food", p: 65 },
                    { c: "Transport", p: 40 },
                    { c: "Subscriptions", p: 28 },
                  ].map((c) => (
                    <div key={c.c}>
                      <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                        <span>{c.c}</span>
                        <span>{c.p}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${c.p}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, oklch(0.7 0.22 280), oklch(0.75 0.18 220))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
