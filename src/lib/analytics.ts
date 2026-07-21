export const GA_MEASUREMENT_ID = "G-LWRR0ZCQJW";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      target: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function pageview(href: string, path?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path ?? window.location.pathname,
    page_location: href,
    page_title: document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
