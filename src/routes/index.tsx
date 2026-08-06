import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { ProjectsPreview } from "@/components/projects-preview";
import { WhyMe } from "@/components/why-me";
import { HomeCTA } from "@/components/home-cta";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ambient";
import { CursorFX } from "@/components/cursor-fx";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MobilePrompt } from "@/components/mobile-prompt";
import { FAQ_ITEMS } from "@/components/faq";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";


const TITLE = "Cayn Developer";
const DESCRIPTION =
  "I build fast, custom websites for businesses and local shops — SEO-ready and mobile-first. See my portfolio and get a free quote today.";
const URL = "https://cayn.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "freelance web developer, website developer for businesses, custom website design, professional website designer, small business website developer, web developer portfolio, hire web developer, responsive website design services",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
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
              jobTitle: "Freelance Web Designer & Website Developer",
              url: URL,
              email: "mailto:jacopo.dev0@gmail.com",
              knowsAbout: [
                "Business website design",
                "Web design",
                "SEO",
                "React",
                "TypeScript",
              ],
            },
            {
              "@type": "ProfessionalService",
              "@id": `${URL}#service`,
              name: "Cayn — Professional Website Design",
              description: DESCRIPTION,
              url: URL,
              email: "jacopo.dev0@gmail.com",
              priceRange: "$$",
              areaServed: [
                { "@type": "Country", name: "Italy" },
                { "@type": "AdministrativeArea", name: "Apulia" },
              ],
              provider: { "@id": `${URL}#person` },
              serviceType: [
                "Business website design",
                "Brochure websites",
                "E-commerce",
                "Landing pages",
                "SEO optimization",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Web services",
                itemListElement: [
                  "Business brochure websites",
                  "E-commerce stores",
                  "Landing pages",
                  "SEO optimization",
                  "Custom web apps",
                ].map((n) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: n },
                })),
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${URL}#faq`,
              mainEntity: FAQ_ITEMS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "ItemList",
              name: "Selected projects",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Cashow — personal finance app",
                  url: "https://cashow.lovable.app/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Occhio Mininno Agritourism — business website in Puglia, Italy",
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
        <ProjectsPreview />
        <WhyMe />
        <HomeCTA />

      </main>
      <Footer />
      <MobilePrompt />
    </div>
  );
}
