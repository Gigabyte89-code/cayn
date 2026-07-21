import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { pageview } from "@/lib/analytics";

export function GoogleAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    pageview(location.href, location.pathname);
  }, [location.href, location.pathname]);

  return null;
}
