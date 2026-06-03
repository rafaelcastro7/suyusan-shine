import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
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

const categories = [
  { id: "all", label: "All Services" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "specialty", label: "Specialty" },
];

const categoryMap: Record<string, string[]> = {
  residential: ["regular-cleaning", "deep-cleaning", "staging", "move-in-out"],
  commercial: ["commercial-office", "retirement-housekeeping"],
  specialty: ["post-construction", "senior-cleaning", "appliances"],
};

function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter(s => categoryMap[activeCategory]?.includes(s.slug));

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Services</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">Cleaning solutions for every kind of space</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              One trusted team, one consistent standard — from a single recurring home visit to multi-shift housekeeping at a retirement residence.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        {/* Category Filter */}
        <FadeIn variant="fade-up" className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div className="space-y-12">
          {filteredServices.map(({ slug, title, description, bullets, icon: Icon }, i) => (
            <FadeIn key={slug} variant="fade-up" delay={i * 50}>
              <article id={slug} className="grid lg:grid-cols-12 gap-8 items-start border-b border-border pb-12 last:border-0">
                {/* Left Column: Icon & Title */}
                <div className="lg:col-span-4">
                  <div className="inline-flex h-14 w-14 rounded-2xl bg-[var(--gradient-brand)] text-primary-foreground items-center justify-center"><Icon className="h-7 w-7" /></div>
                  <div className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">Service {String(services.indexOf(services.find(s => s.slug === slug)!) + 1).padStart(2, "0")}</div>
                  <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">{title}</h2>
                </div>

                {/* Right Column: Content + Photo */}
                <div className="lg:col-span-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Text Content */}
                    <div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
                      <ul className="mt-6 space-y-3">
                        {bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {b}</li>
                        ))}
                      </ul>
                      <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                        Request this service <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Photo (for services 1-6, use corresponding Galeria images) */}
                    {i < 6 && (
                      <div className="hidden lg:block">
                        <img
                          src={`/Galeria/${String(i + 1).padStart(2, '0')}.jpeg`}
                          alt={title}
                          loading="lazy"
                          className="rounded-2xl border border-border aspect-[4/5] object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Found the right service?</h2>
            <p className="mt-4 text-primary-foreground text-lg">Book online in 60 seconds with an instant quote, or see transparent pricing first.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
                Book in 60s <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
