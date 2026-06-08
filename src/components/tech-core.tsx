import { Suspense, lazy, useCallback } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function LiquidCayn() {
  const onLoad = useCallback((app: any) => {
    try {
      app?.setZoom?.(1);
      const root = (app?._scene?.parent ?? app)?.canvas?.parentElement;
      const logo = root?.querySelector?.('a[href*="spline.design"]');
      if (logo) (logo as HTMLElement).style.display = "none";
    } catch {}
  }, []);

  return (
    <div className="pointer-events-none relative mx-auto h-[360px] w-full select-none sm:h-[460px] lg:h-[560px] [&_a[href*='spline.design']]:!hidden [&_canvas]:!outline-none">
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/xATIWY-EIHtG9Obg/scene.splinecode"
          onLoad={onLoad}
          style={{ pointerEvents: "none", background: "transparent" }}
        />
      </Suspense>

      {/* Liquid glass overlays — circular, no frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, oklch(1 0 0 / 35%) 0%, oklch(1 0 0 / 8%) 18%, transparent 38%), radial-gradient(circle at 70% 75%, oklch(0.8 0.18 280 / 22%) 0%, transparent 45%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          boxShadow:
            "inset 0 0 60px 8px oklch(1 0 0 / 8%), inset 0 -40px 80px -20px oklch(0.7 0.22 280 / 25%), inset 0 30px 60px -20px oklch(1 0 0 / 18%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[28%] top-[18%] h-[18%] w-[22%] -rotate-12 rounded-[50%] blur-xl"
        style={{ background: "oklch(1 0 0 / 45%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[22%] bottom-[24%] h-[10%] w-[14%] rotate-12 rounded-[50%] blur-lg"
        style={{ background: "oklch(0.85 0.18 280 / 55%)" }}
      />
    </div>
  );
}

export const TechCore = LiquidCayn;
