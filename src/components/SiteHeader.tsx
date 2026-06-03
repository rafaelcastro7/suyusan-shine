import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import logo from "@/assets/logo.png";

const navRoutes = [
  { to: "/services", key: "services" },
  { to: "/pricing", key: "pricing" },
  { to: "/gallery", key: "gallery" },
  { to: "/about", key: "about" },
  { to: "/faq", key: "faq" },
  { to: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border transition-shadow ${scrolled ? "shadow-[var(--shadow-soft)]" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Suyusan Solutions" width={80} height={80} className="h-16 md:h-20 w-auto object-contain" />
          <div className="leading-tight hidden sm:block font-display font-bold tracking-tight text-brand-green-deep">
            <div className="text-lg">Suyusan</div>
            <div className="text-[11px] uppercase tracking-[0.22em]">Solutions Inc.</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navRoutes.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3.5 py-2 text-sm font-medium text-foreground/90 hover:text-foreground rounded-full transition-colors"
              activeProps={{ className: "px-3.5 py-2 text-sm font-semibold text-primary rounded-full bg-primary/5" }}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/booking" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
            {t("nav.bookCta")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button className="p-3" onClick={() => setOpen((v) => !v)} aria-label={t("nav.menu")}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-1">
            {navRoutes.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-foreground/90 hover:bg-muted">
                {t(`nav.${n.key}`)}
              </Link>
            ))}
            <a href="tel:+14165550123" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-foreground/90 hover:bg-muted flex items-center gap-2">
              <Phone className="h-4 w-4" /> (416) 555-0123
            </a>
            <Link to="/booking" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              {t("nav.bookCta")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
