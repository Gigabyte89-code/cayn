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
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass-liquid flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]" : ""
        }`}
      >
        <Link to="/" className="font-display text-lg tracking-tight text-foreground">
          Cayn
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                activeOptions={{ exact: item.href === "/" }}
                className="relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:glass data-[status=active]:text-foreground"
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
            className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
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
            className="rounded-full p-2 text-foreground"
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
            className="glass-liquid absolute left-4 right-4 top-20 rounded-3xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    activeOptions={{ exact: item.href === "/" }}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground data-[status=active]:bg-white/5 data-[status=active]:text-foreground"
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
