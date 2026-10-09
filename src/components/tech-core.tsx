import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Spline hero scene, tuned for speed:
 * - loads only after the browser is idle (doesn't block first paint / navigation)
 * - render loop pauses when the scene is off-screen or the tab is hidden
 */
export function LiquidCayn() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<any>(null);
  const visibleRef = useRef(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as any;
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(() => setReady(true), { timeout: 1200 })
      : window.setTimeout(() => setReady(true), 400);
    return () => (w.cancelIdleCallback ? w.cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const sync = () => {
      const app = appRef.current;
      if (!app) return;
      const run = visibleRef.current && document.visibilityState === "visible";
      try {
        run ? app.play?.() : app.stop?.();
      } catch {}
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const onLoad = useCallback((app: any) => {
    appRef.current = app;
    try {
      app?.setZoom?.(1);
      const canvas = app?.canvas as HTMLCanvasElement | undefined;
      if (canvas) {
        canvas.style.background = "transparent";
        canvas.style.outline = "none";
        canvas.style.border = "none";
      }
      const parent = canvas?.parentElement;
      if (parent) {
        parent.style.background = "transparent";
        parent.style.border = "none";
      }
      const logo = parent?.querySelector?.('a[href*="spline.design"]');
      if (logo) (logo as HTMLElement).style.display = "none";
      if (!visibleRef.current) app?.stop?.();
    } catch {}
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none relative mx-auto h-[360px] w-full select-none sm:h-[460px] lg:h-[560px] [&_a[href*='spline.design']]:!hidden [&_canvas]:!bg-transparent [&_canvas]:!outline-none [&_canvas]:!border-0 [&>div]:!bg-transparent"
      style={{
        background: "transparent",
        contain: "layout paint size",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, black 45%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
        maskImage:
          "radial-gradient(circle at 50% 50%, black 45%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
      }}
    >
      {ready && (
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/xATIWY-EIHtG9Obg/scene.splinecode"
            onLoad={onLoad}
            style={{ pointerEvents: "none", background: "transparent", border: "none" }}
          />
        </Suspense>
      )}
    </div>
  );
}

export const TechCore = LiquidCayn;
