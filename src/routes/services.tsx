import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Services } from "@/components/services";
import { WhyMe } from "@/components/why-me";
import { breadcrumbLd, pageMeta, SITE_URL } from "@/lib/seo";

const TITLE = "Website Developer for Businesses | Services";
const DESCRIPTION =
  "Business websites, landing pages, e-commerce, website redesign and SEO optimization for small businesses. Fixed quotes, live in 1–2 weeks.";

const SERVICES = [
  "Business website design",
  "Landing pages",
  "E-commerce stores",
  "Website redesign",
  "SEO optimization",
  "Responsive website design services",
];

export const Route = createFileRoute("/services")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/services" }),
    scripts: [
      breadcrumbLd("Services", "/services"),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#service`,
          name: "Cayn — Custom Website Design for Businesses",
          description: DESCRIPTION,
          url: `${SITE_URL}/services`,
          email: "jacopo.dev0@gmail.com",
          priceRange: "$$",
          areaServed: [
            { "@type": "Country", name: "Italy" },
            { "@type": "AdministrativeArea", name: "Apulia" },
          ],
          serviceType: SERVICES,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web development services",
            itemListElement: SERVICES.map((n) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: n },
            })),
          },
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell breadcrumb="Services">
      <Services />
      <WhyMe />
    </PageShell>
  );
}
