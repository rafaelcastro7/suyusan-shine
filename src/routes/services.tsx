import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Cleaning Services — Suyusan Solutions Inc." },
      { name: "description", content: "Regular, deep, post-construction, senior, commercial, move-in/out and retirement-home cleaning across Canada." },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Services</div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">Cleaning solutions for every kind of space</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            One trusted team, one consistent standard — from a single recurring home visit to multi-shift housekeeping at a retirement residence.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 space-y-12">
        {services.map(({ slug, title, description, bullets, icon: Icon }, i) => (
          <article id={slug} key={slug} className="grid lg:grid-cols-12 gap-8 items-start border-b border-border pb-12 last:border-0">
            <div className="lg:col-span-4">
              <div className="inline-flex h-14 w-14 rounded-2xl bg-[var(--gradient-brand)] text-primary-foreground items-center justify-center"><Icon className="h-7 w-7" /></div>
              <div className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Service {String(i + 1).padStart(2, "0")}</div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">{title}</h2>
            </div>
            <div className="lg:col-span-8">
              <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {b}</li>
                ))}
              </ul>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                Request this service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
