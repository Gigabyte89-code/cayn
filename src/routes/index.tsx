import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { ICDL } from "@/components/icdl";
import { FinanceApp } from "@/components/finance-app";
import { Agritourism } from "@/components/agritourism";
import { WhyMe } from "@/components/why-me";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ambient";
import { CursorFX } from "@/components/cursor-fx";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MobilePrompt } from "@/components/mobile-prompt";

const TITLE = "Cayn | Creazione Siti Web Professionali per Aziende";
const DESCRIPTION =
  "Realizzo siti web moderni, veloci e ottimizzati SEO per aziende e attività. Web designer e sviluppatore freelance. Richiedi un preventivo gratuito.";
const URL = "https://cayn.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "creazione siti web aziendali, sviluppatore siti web, freelance siti web per aziende, web designer freelance, realizzazione sito web azienda, chi crea siti web professionali",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${URL}#person`,
              name: "Cayn",
              jobTitle: "Web Designer & Sviluppatore Siti Web Freelance",
              url: URL,
              email: "mailto:jacopo.dev0@gmail.com",
              knowsAbout: [
                "Creazione siti web aziendali",
                "Web design",
                "SEO",
                "React",
                "TypeScript",
              ],
            },
            {
              "@type": "ProfessionalService",
              "@id": `${URL}#service`,
              name: "Cayn — Creazione Siti Web Professionali",
              description: DESCRIPTION,
              url: URL,
              email: "jacopo.dev0@gmail.com",
              priceRange: "$$",
              areaServed: [
                { "@type": "Country", name: "Italia" },
                { "@type": "AdministrativeArea", name: "Puglia" },
              ],
              provider: { "@id": `${URL}#person` },
              serviceType: [
                "Creazione siti web aziendali",
                "Siti vetrina",
                "E-commerce",
                "Landing page",
                "Ottimizzazione SEO",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servizi web",
                itemListElement: [
                  "Siti vetrina per aziende",
                  "E-commerce",
                  "Landing page",
                  "Ottimizzazione SEO",
                  "Web app su misura",
                ].map((n) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: n },
                })),
              },
            },
            {
              "@type": "ItemList",
              name: "Progetti realizzati",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Cashow — app di finanza personale",
                  url: "https://cashow.lovable.app/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Occhiomininno Agriturismo — sito web aziendale in Puglia",
                  url: "https://agriturismocchiomininno.lovable.app",
                },
              ],
            },
          ],
        }),
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
      <main className="page-flow relative overflow-x-clip">
        <Hero />
        <About />
        <Services />
        <ICDL />
        <FinanceApp />
        <Agritourism />
        <Contact />
      </main>
      <Footer />
      <MobilePrompt />
    </div>
  );
}
