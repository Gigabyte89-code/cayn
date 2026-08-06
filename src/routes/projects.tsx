import { useEffect } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { FinanceApp } from "@/components/finance-app";
import { Agritourism } from "@/components/agritourism";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

const TITLE = "Web Developer Portfolio | Live Client Projects";
const DESCRIPTION =
  "Real websites and web apps I built: a business website for a rural tourism company and Cashow, a personal finance app. See the live results.";

export const Route = createFileRoute("/projects")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/projects" }),
    scripts: [
      breadcrumbLd("Projects", "/projects"),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Web developer portfolio — client projects",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "WebSite",
                name: "Business Website for a Rural Tourism Company",
                description:
                  "Business website for the Occhio Mininno agritourism in Apulia, Italy, with product catalog, email order requests and SEO optimization.",
                url: "https://agriturismocchiomininno.lovable.app",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "WebApplication",
                name: "Cashow — personal finance web app",
                applicationCategory: "FinanceApplication",
                description:
                  "Custom-built personal finance app for tracking budgets, expenses and savings.",
                url: "https://cashow.lovable.app/",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  useHashScroll();
  return (
    <PageShell breadcrumb="Projects">
      <FinanceApp />
      <Agritourism />
    </PageShell>
  );
}

function useHashScroll() {
  const location = useLocation();
  useEffect(() => {
    const id = location.hash?.replace(/^#/, "");
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [location.hash]);
}
