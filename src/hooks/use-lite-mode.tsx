import { useEffect, useState, useCallback } from "react";

const KEY = "cayn-lite";

export function useLiteMode() {
  const [lite, setLiteState] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(KEY);
      if (stored === "1") {
        setLiteState(true);
      } else if (stored === null) {
        // Auto-detect low-end / mobile devices on first visit
        const nav = navigator as Navigator & {
          deviceMemory?: number;
          connection?: { saveData?: boolean; effectiveType?: string };
        };
        const isCoarse = window.matchMedia("(pointer: coarse)").matches;
        const isNarrow = window.innerWidth < 768;
        const lowMem = (nav.deviceMemory ?? 8) <= 4;
        const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
        const saveData = !!nav.connection?.saveData;
        const slowNet = ["slow-2g", "2g", "3g"].includes(nav.connection?.effectiveType ?? "");
        if ((isCoarse || isNarrow) && (lowMem || lowCpu || saveData || slowNet)) {
          setLiteState(true);
        }
      }
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setLiteState(e.newValue === "1");
    };
    const onCustom = () => {
      try {
        setLiteState(localStorage.getItem(KEY) === "1");
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("cayn-lite-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cayn-lite-change", onCustom);
    };
  }, []);

  const setLite = useCallback((v: boolean) => {
    try {
      localStorage.setItem(KEY, v ? "1" : "0");
      window.dispatchEvent(new Event("cayn-lite-change"));
    } catch {}
    setLiteState(v);
  }, []);

  return { lite, setLite };
}
