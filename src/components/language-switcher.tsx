import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";

const OPTIONS: { code: Lang; short: string; flag: string; label: string }[] = [
  { code: "it", short: "IT", flag: "🇮🇹", label: "Italiano" },
  { code: "en", short: "EN", flag: "🇬🇧", label: "English" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, d } = useI18n();

  return (
    <div
      role="group"
      aria-label={d.langSwitch.label}
      className={`glass relative flex items-center rounded-full p-0.5 ${className}`}
    >
      {OPTIONS.map((o) => {
        const active = o.code === lang;
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => setLang(o.code)}
            aria-pressed={active}
            aria-label={o.label}
            title={o.label}
            className="relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
            style={{ color: active ? "var(--foreground)" : "var(--muted-foreground)" }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="glass-liquid absolute inset-0 rounded-full"
                style={{ boxShadow: "0 0 20px -6px color-mix(in oklab, var(--accent) 60%, transparent)" }}
                aria-hidden
              />
            )}
            <span className="relative z-10 text-[13px] leading-none" aria-hidden>
              {o.flag}
            </span>
            <span className="relative z-10">{o.short}</span>
          </button>
        );
      })}
    </div>
  );
}
