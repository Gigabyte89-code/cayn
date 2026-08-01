import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLiteMode } from "@/hooks/use-lite-mode";

const DISMISS_KEY = "cayn-mobile-prompt-dismissed";

export function MobilePrompt() {
  const isMobile = useIsMobile();
  const { lite, setLite } = useLiteMode();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {}
  }, []);

  const show = isMobile && !lite && !dismissed;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    setDismissed(true);
  };

  const switchLite = () => {
    setLite(true);
    dismiss();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] md:hidden"
        >
          <div className="glass-liquid relative overflow-hidden rounded-2xl p-4 pr-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground transition hover:text-foreground"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <div className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                <Smartphone size={16} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Mobile device detected</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We noticed you're on a mobile device. For better performance,
                  switch to the mobile version (3D content disabled).
                </p>
                <button
                  onClick={switchLite}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-transform hover:scale-[1.02]"
                >
                  Switch to mobile version
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
