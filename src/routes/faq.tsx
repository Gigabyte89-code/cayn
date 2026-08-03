import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { FAQ, FAQ_ITEMS } from "@/components/faq";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

const TITLE = "Website FAQ | Costs, Timelines & Maintenance";
const DESCRIPTION =
  "How much a business website costs, how long it takes to build, maintenance, SEO and mobile design — answered by a freelance web developer.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/faq" }),
    scripts: [
      breadcrumbLd("FAQ", "/faq"),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageShell breadcrumb="FAQ">
      <FAQ />
    </PageShell>
  );
}
