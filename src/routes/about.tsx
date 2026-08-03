import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { About } from "@/components/about";
import { ICDL } from "@/components/icdl";
import { WhyMe } from "@/components/why-me";
import { breadcrumbLd, pageMeta, SITE_URL } from "@/lib/seo";

const TITLE = "About | Professional Website Designer & Developer";
const DESCRIPTION =
  "ICDL-certified freelance web developer building fast, custom websites with React, Figma, Framer and Spline. See how I work and get a free quote.";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/about", type: "profile" }),
    scripts: [
      breadcrumbLd("About", "/about"),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Cayn",
          jobTitle: "Freelance Web Developer & Website Designer",
          url: `${SITE_URL}/about`,
          email: "mailto:jacopo.dev0@gmail.com",
          knowsAbout: [
            "Custom website design",
            "Responsive website design services",
            "SEO optimization",
            "React",
            "TypeScript",
            "Figma",
            "Framer",
            "Spline",
          ],
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            name: "ICDL Essentials Certification",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell breadcrumb="About">
      <About />
      <ICDL />
      <WhyMe />
    </PageShell>
  );
}
