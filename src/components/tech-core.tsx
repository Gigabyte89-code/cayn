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
    </div>
  );
}

export const TechCore = LiquidCayn;
