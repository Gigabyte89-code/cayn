import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cursor effects: a soft trailing dot + click ripple.
 * Disabled on touch / coarse pointers.
 */
export function CursorFX() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(m.matches);
    const handler = () => setEnabled(m.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let tx = 0, ty = 0, rxv = 0, ryv = 0;
    let cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      rxv += (tx - rxv) * 0.18;
      ryv += (ty - ryv) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rxv - 18}px, ${ryv - 18}px, 0) scale(${cx})`;
      }
      if (Math.abs(tx - rxv) > 0.5 || Math.abs(ty - ryv) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    let pressed = false;
    const onDown = (e: MouseEvent) => {
      pressed = true;
      cx = 0.7; cy = 0.7;
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((it) => it.id !== id)), 700);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onUp = () => {
      pressed = false;
      cx = 1; cy = 1;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!ringRef.current) return;
      const hover = !!t?.closest?.("a, button, [role='button'], input, textarea, label, select, summary");
      ringRef.current.dataset.hover = hover ? "1" : "0";
      cx = hover ? 1.4 : (pressed ? 0.7 : 1);
      if (!raf) raf = requestAnimationFrame(loop);
    };

    cx = 1;
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-white/40 mix-blend-difference transition-[border-color,background-color] duration-200 data-[hover='1']:border-white data-[hover='1']:bg-white/10"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none fixed z-[9998] h-16 w-16 rounded-full border-2 border-white/70 mix-blend-difference"
            style={{ left: r.x - 32, top: r.y - 32 }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
