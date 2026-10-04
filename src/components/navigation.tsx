import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

const NAV_HREFS = ["/", "/about", "/services", "/projects", "/faq", "/contact"] as const;

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const d = useT();

  const items = [
    { label: d.nav.home, href: NAV_HREFS[0] },
    { label: d.nav.about, href: NAV_HREFS[1] },
    { label: d.nav.services, href: NAV_HREFS[2] },
    { label: d.nav.projects, href: NAV_HREFS[3] },
    { label: d.nav.faq, href: NAV_HREFS[4] },
    { label: d.nav.contact, href: NAV_HREFS[5] },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-5 pt-3 sm:px-8"
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between border-b px-0 py-4 transition-all duration-500 ${
          scrolled ? "border-border bg-background/85 backdrop-blur-xl" : "border-transparent"
        }`}
      >
        <Link to="/" className="font-display text-xl uppercase text-foreground">
          Cayn.
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                activeOptions={{ exact: item.href === "/" }}
                className="relative py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="editorial-link border-l border-border pl-5"
          >
            {d.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            aria-label={open ? d.nav.closeMenu : d.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground"
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-liquid absolute left-4 right-4 top-20 rounded-md p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    activeOptions={{ exact: item.href === "/" }}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border px-2 py-4 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
