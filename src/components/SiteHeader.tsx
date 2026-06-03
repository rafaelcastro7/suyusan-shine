import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/services", label: "Services" },
  { to: "/pricing", label: "Pricing" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
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
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3.5 py-2 text-sm font-medium text-foreground/90 hover:text-foreground rounded-full transition-colors"
              activeProps={{ className: "px-3.5 py-2 text-sm font-semibold text-primary rounded-full bg-primary/5" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/booking" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
            Book in 60s
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button className="p-3" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-foreground/90 hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <a href="tel:+14165550123" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-foreground/90 hover:bg-muted flex items-center gap-2">
              <Phone className="h-4 w-4" /> (416) 555-0123
            </a>
            <Link to="/booking" onClick={() => setOpen(false)} className="mt-2 inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Book in 60s
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
