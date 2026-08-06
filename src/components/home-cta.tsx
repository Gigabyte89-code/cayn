import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function HomeCTA() {
  return (
    <section className="relative px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-liquid mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-[32px] p-10 text-center"
      >
        <h2 className="font-display text-2xl sm:text-3xl">
          <span className="text-gradient">Got a project in mind? </span>
          <span className="text-gradient-brand italic">Get a free quote.</span>
        </h2>
        <Link
          to="/contact"
          className="liquid-sheen inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          Get a free quote
        </Link>
      </motion.div>
    </section>
  );
}
