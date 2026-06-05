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
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <ICDL />
        <FinanceApp />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
