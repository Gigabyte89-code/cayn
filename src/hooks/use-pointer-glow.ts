import { useCallback, type MouseEvent } from "react";

/**
 * Sets --mx / --my CSS vars on the hovered element so the `glow-follow`
 * and `edge-trace` utilities can render a refraction that tracks the cursor.
 * Pointer-only: touch devices never fire mousemove, so nothing runs there.
 */
export function usePointerGlow<T extends HTMLElement = HTMLElement>() {
  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  return { onMouseMove };
}
