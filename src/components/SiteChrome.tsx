import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { useSite, whatsappLink, CONTACT_EMAIL, mailtoLink } from "@/lib/site";

function Logo() {
  return (
    <Link to="/" className="flex items-baseline gap-1.5">
      <span className="font-display text-lg font-bold tracking-tight">SHIFT</span>
      <span className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-primary" />
    </Link>
  );
}

export function Header() {
  const { t, lang, theme, toggleLang, toggleTheme } = useSite();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("الرئيسية", "Home") },
    { to: "/work", label: t("الأعمال", "Work") },
    { to: "/about", label: t("عن شيفت", "About") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary hidden items-center gap-2 px-5 py-2.5 text-sm font-semibold md:inline-flex"
          >
            <MessageCircle className="size-4" />
            {t("ابدأ مشروع", "Start a project")}
          </a>
          <button
            className="rounded-full border border-border p-2 md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border px-5 py-4 text-sm font-medium hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noreferrer"
            className="block px-5 py-4 text-sm font-semibold text-primary"
          >
            {t("ابدأ مشروع على واتساب", "Start a project on WhatsApp")}
          </a>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t, lang } = useSite();
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t(
                "برمجيات تحرّك الأعمال للأمام. حلول ويب للشركات اللي عندها عملاء حقيقيين.",
                "Software that moves business forward. Web solutions for businesses with real traction.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
              >
                <MessageCircle className="size-4" />
                {t("واتساب", "WhatsApp")}
              </a>
              <a
                href={mailtoLink(lang)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <Link to="/work" className="label-mono hover:text-foreground">
              {t("الأعمال", "Work")}
            </Link>
            <Link to="/about" className="label-mono hover:text-foreground">
              {t("عن شيفت", "About")}
            </Link>
            <a
              href="https://kupecut.com"
              target="_blank"
              rel="noreferrer"
              className="label-mono inline-flex items-center gap-1 hover:text-foreground"
            >
              KupeCut <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 md:flex-row md:justify-between">
          <span className="label-mono">© {new Date().getFullYear()} SHIFT</span>
          <span className="label-mono">SOFTWARE THAT MOVES BUSINESS FORWARD</span>
        </div>
      </div>
    </footer>
  );
}
