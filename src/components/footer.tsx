import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

const EXTERNAL = [
  { label: "Cashow", href: "https://cashow.lovable.app/" },
  { label: "Occhiomininno", href: "https://agriturismocchiomininno.lovable.app" },
  { label: "Discord", href: "https://discord.com/users/1136899093396246578" },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-[17px] font-semibold tracking-tight">
              CAYN<span className="text-accent">.</span>
            </div>
            <p className="mt-3 max-w-[38ch] text-[13.5px] leading-[1.7] text-muted-foreground">
              Frontend developer and digital creator. Available for product and website
              work — Puglia, Italy, working remotely.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Sections
            </h2>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Elsewhere
            </h2>
            <ul className="mt-4 space-y-2">
              {EXTERNAL.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Cayn. All rights reserved.</span>
          <a
            href="mailto:jacopo.dev0@gmail.com"
            className="transition-colors hover:text-foreground"
          >
            jacopo.dev0@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
