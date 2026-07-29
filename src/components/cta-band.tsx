import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="relative px-6 pb-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-6xl flex-col gap-6 border-y border-border py-12 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Have something to build?{" "}
            <span className="text-gradient-brand">Let's talk.</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm text-muted-foreground">
            Tell me the problem in two lines. You get an honest answer — scope, timing,
            and whether I'm the right person — within 24 hours.
          </p>
        </div>
        <a
          href="#contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Start a project
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </motion.div>
    </section>
  );
}
