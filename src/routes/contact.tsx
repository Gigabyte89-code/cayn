import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Contact } from "@/components/contact";
import { breadcrumbLd, pageMeta, SITE_URL } from "@/lib/seo";

const TITLE = "Hire a Web Developer | Get a Free Quote";
const DESCRIPTION =
  "Tell me about your business and get a clear quote on timeline and cost for your new website. Direct communication, no agency layers.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
    scripts: [
      breadcrumbLd("Contact", "/contact"),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
          name: TITLE,
          description: DESCRIPTION,
          mainEntity: {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Cayn",
            email: "mailto:jacopo.dev0@gmail.com",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell breadcrumb="Contact" fullFooter>
      <Contact />
    </PageShell>
  );
}
