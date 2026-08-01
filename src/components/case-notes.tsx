import { motion } from "framer-motion";
import { CircleAlert, Trophy } from "lucide-react";

type Props = {
  problem: string;
  result: string;
};

/** Two-line case study summary: the problem solved and the result achieved. */
export function CaseNotes({ problem, result }: Props) {
  const rows = [
    { icon: CircleAlert, label: "Problem solved", text: problem },
    { icon: Trophy, label: "Result achieved", text: result },
  ];

  return (
    <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="glass-liquid hover-lift rounded-2xl p-5"
        >
          <div className="flex items-center gap-2">
            <r.icon size={14} style={{ color: "var(--accent)" }} />
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {r.label}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">{r.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
