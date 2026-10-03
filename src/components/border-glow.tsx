import { useEffect } from "react";

/** Activates the site-wide pointer-aware violet edge glow on marked cards. */
export function BorderGlow() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let activeCard: HTMLElement | null = null;
    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const update = () => {
      frame = 0;
      if (!activeCard) return;
      const rect = activeCard.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const kx = dx === 0 ? Number.POSITIVE_INFINITY : cx / Math.abs(dx);
      const ky = dy === 0 ? Number.POSITIVE_INFINITY : cy / Math.abs(dy);
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;

      activeCard.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      activeCard.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
      activeCard.style.setProperty("--glow-x", `${x.toFixed(1)}px`);
      activeCard.style.setProperty("--glow-y", `${y.toFixed(1)}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const nextCard = target.closest<HTMLElement>(".border-glow-card");
      if (activeCard !== nextCard) {
        activeCard?.removeAttribute("data-glow-active");
        activeCard = nextCard;
        activeCard?.setAttribute("data-glow-active", "true");
      }
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!activeCard) return;
      const related = event.relatedTarget;
      if (related instanceof Node && activeCard.contains(related)) return;
      activeCard.removeAttribute("data-glow-active");
      activeCard = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  return null;
}