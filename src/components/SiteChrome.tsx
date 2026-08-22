import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { useSite } from "@/lib/site";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="label-mono transition-colors hover:text-foreground"
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
            className="label-mono border border-border px-2.5 py-1.5 transition-colors hover:border-primary hover:text-foreground"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="https://wa.me/201000000000"
            className="hidden bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            {t("ابدأ مشروع", "Start a project")}
          </a>
          <button
            className="border border-border p-2 md:hidden"
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
              className="label-mono block border-b border-border px-5 py-4 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const { t } = useSite();
  return (
    <footer className="border-t border-border">
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
