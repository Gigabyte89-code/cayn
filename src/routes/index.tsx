import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { ICDL } from "@/components/icdl";
import { FinanceApp } from "@/components/finance-app";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ambient";
import { CursorFX } from "@/components/cursor-fx";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MobilePrompt } from "@/components/mobile-prompt";
import { SectionFade } from "@/components/section-fade";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cayn — Developer & Digital Creator" },
      {
        name: "description",
        content:
          "Cayn is a young developer and digital creator building modern websites, applications and digital products focused on usability, performance and clean design.",
      },
      { property: "og:title", content: "Cayn — Developer & Digital Creator" },
      {
        property: "og:description",
        content:
          "Modern digital experiences — websites, apps and products designed and developed by Cayn.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <NoiseOverlay />
      <SmoothScroll />
      <CursorFX />
      <Navigation />
      <main>
        <Hero />
        <SectionFade />
        <About />
        <SectionFade />
        <Services />
        <SectionFade />
        <ICDL />
        <SectionFade />
        <FinanceApp />
        <SectionFade />
        <Contact />
      </main>
      <Footer />
      <MobilePrompt />
    </div>
  );
}
