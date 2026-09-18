import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouterState } from "@tanstack/react-router";
import { DICTS, type Dict, type Lang } from "./translations";

const STORAGE_KEY = "cayn-lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; d: Dict };

const I18nContext = createContext<Ctx | null>(null);

function isLang(v: unknown): v is Lang {
  return v === "en" || v === "it";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // English is always the default on first visit; a saved choice wins after that.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (isLang(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const d = DICTS[lang];

  // Keep <html lang> and the head metadata in sync, without a reload.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;

    const key = (pathname.replace(/\/+$/, "") || "/") as keyof Dict["meta"];
    const meta = d.meta[key];
    if (!meta) return;

    document.title = meta.title;
    const set = (selector: string, content: string) => {
      const el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute("content", content);
    };
    set('meta[name="description"]', meta.description);
    set('meta[property="og:title"]', meta.title);
    set('meta[property="og:description"]', meta.description);
    set('meta[name="twitter:title"]', meta.title);
    set('meta[name="twitter:description"]', meta.description);
  }, [lang, pathname, d]);

  const value = useMemo(() => ({ lang, setLang, d }), [lang, setLang, d]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Shorthand: const d = useT(); d.hero.title1 */
export function useT(): Dict {
  return useI18n().d;
}
