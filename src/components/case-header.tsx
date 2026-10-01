import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CaseNotes } from "@/components/case-notes";
import { useT } from "@/lib/i18n";

type MetaRow = { label: string; value: string };

type Props = {
  index: string;
  eyebrow: string;
  title1: string;
  title2: string;
  lead: string;
  problem: string;
  result: string;
  cta: string;
  href: string;
  meta: MetaRow[];
};

/** Editorial case-study header: sticky meta rail + large monochrome headline. */
export function CaseHeader({
  index,
  eyebrow,
  title1,
  title2,
  lead,
  problem,
  result,
  cta,
  href,
  meta,
}: Props) {
  const d = useT();

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
      {/* Meta rail */}
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {index}
          </span>
          <span className="accent-rule" />
          <span className="case-meta">{eyebrow}</span>
        </div>

        <dl className="mt-8 space-y-4">
          {meta.map((m) => (
            <div key={m.label} className="hairline pt-4">
              <dt className="case-meta">{m.label}</dt>
              <dd className="mt-1 text-sm text-foreground/85">{m.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid liquid-sheen group mt-8 px-6 py-3 text-sm"
        >
          {cta}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        <div className="mt-3 case-meta">
          <span className="accent-dot mr-2 align-middle" />
          {d.caseMeta.live}
        </div>
      </motion.aside>

      {/* Headline + notes */}
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          {title1}
          <span className="text-gradient-brand italic">{title2}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {lead}
        </motion.p>

        <div className="[&>div]:mx-0 [&>div]:max-w-none">
          <CaseNotes problem={problem} result={result} />
        </div>
      </div>
    </div>
  );
}
