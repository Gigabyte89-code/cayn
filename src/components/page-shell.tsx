import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ambient";
import { CursorFX } from "@/components/cursor-fx";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MobilePrompt } from "@/components/mobile-prompt";

export function PageShell({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb?: string;
}) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <NoiseOverlay />
      <SmoothScroll />
      <CursorFX />
      <Navigation />
      <main className="page-flow relative overflow-x-clip pt-28">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6">
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden className="flex items-center">
                <ChevronRight size={12} />
              </li>
              <li className="text-foreground">{breadcrumb}</li>
            </ol>
          </nav>
        )}
        {children}
      </main>
      <Footer />
      <MobilePrompt />
    </div>
  );
}
