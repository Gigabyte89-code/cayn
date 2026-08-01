import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Stack } from "@/components/stack";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cayn — Frontend Developer & Digital Creator" },
      {
        name: "description",
        content:
          "Cayn designs and ships production frontends in React and TypeScript — case studies, experience and a focused tech stack for founders and small businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Cayn — Frontend Developer & Digital Creator" },
      {
        property: "og:description",
        content:
          "Production frontends in React and TypeScript: clean structure, fast loads, and interfaces built to be used.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
