import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { pageview } from "@/lib/analytics";

export function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    pageview(location.href, location.pathname);
  }, [location.href, location.pathname]);

  return null;
}
