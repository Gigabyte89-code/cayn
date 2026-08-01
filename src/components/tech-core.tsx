import { Suspense, lazy, useCallback } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function LiquidCayn() {
  const onLoad = useCallback((app: any) => {
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
    } catch {}
  }, []);

  return (
    <div
      className="pointer-events-none relative mx-auto h-[360px] w-full select-none sm:h-[460px] lg:h-[560px] [&_a[href*='spline.design']]:!hidden [&_canvas]:!bg-transparent [&_canvas]:!outline-none [&_canvas]:!border-0 [&>div]:!bg-transparent"
      style={{
        background: "transparent",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, black 45%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
        maskImage:
          "radial-gradient(circle at 50% 50%, black 45%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.35) 82%, transparent 100%)",
      }}
    >
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/xATIWY-EIHtG9Obg/scene.splinecode"
          onLoad={onLoad}
          style={{ pointerEvents: "none", background: "transparent", border: "none" }}
        />
      </Suspense>
    </div>
  );
}

export const TechCore = LiquidCayn;
