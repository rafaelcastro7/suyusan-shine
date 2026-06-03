import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ShieldCheck, Sparkles, Leaf, Clock, Star, CalendarCheck, SprayCan, Smile } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { Reveal } from "@/components/Reveal";
import { StatCounter } from "@/components/StatCounter";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { PricingTable } from "@/components/PricingTable";
import { FAQ } from "@/components/FAQ";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { faqIds } from "@/data/faqs";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Suyusan Solutions — GTA Cleaning Services" },
      { name: "description", content: "Insured residential and commercial cleaning across the GTA — regular, deep, post-construction and retirement-home housekeeping. Book online in 60 seconds." },
      { property: "og:title", content: "Suyusan Solutions — GTA Cleaning Services" },
      { property: "og:description", content: "Insured residential and commercial cleaning across the GTA. Book online in 60 seconds." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/" },
    ],
    links: [
      { rel: "preload", as: "image", href: hero, fetchpriority: "high" },
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Suyusan Solutions Inc.",
          url: "https://suyusan-sparkle-solutions.lovable.app/",
          telephone: "+1-416-555-0123",
          areaServed: "Greater Toronto Area",
          priceRange: "$$",
          description: "Professional residential and commercial cleaning services across the Greater Toronto Area.",
          address: {
            "@type": "PostalAddress",
            addressRegion: "ON",
            addressCountry: "CA",
          },
        }),
      },
    ],
  }),
});

function Home() {
  const { t } = useTranslation();
  useDocumentMeta("meta.home.title", "meta.home.description");

  const trustItems = [
    { icon: ShieldCheck, title: t("home.trust.insured"), text: t("home.trust.insuredText") },
    { icon: Sparkles, title: t("home.trust.trained"), text: t("home.trust.trainedText") },
    { icon: Leaf, title: t("home.trust.eco"), text: t("home.trust.ecoText") },
    { icon: Clock, title: t("home.trust.ontime"), text: t("home.trust.ontimeText") },
  ];

  const howSteps = [
    { icon: CalendarCheck, step: "01", title: t("home.how.step1Title"), text: t("home.how.step1Text") },
    { icon: SprayCan, step: "02", title: t("home.how.step2Title"), text: t("home.how.step2Text") },
    { icon: Smile, step: "03", title: t("home.how.step3Title"), text: t("home.how.step3Text") },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-foreground/90">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" /> {t("home.heroBadge")}
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              <Reveal
                lines={[
                  t("home.heroLine1"),
                  <span key="grad" className="text-transparent bg-clip-text bg-[var(--gradient-brand)]">{t("home.heroLine2")}</span>,
                ]}
                lineClassName="block"
              />
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">{t("home.heroLead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
                {t("common.bookIn60s")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition">
                {t("common.seePricing")}
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <StatCounter value={500} suffix="+" label={t("home.stats.homes")} />
              <StatCounter value={4.9} decimals={1} suffix="★" label={t("home.stats.rating")} />
              <StatCounter value={100} suffix="%" label={t("home.stats.satisfaction")} />
            </div>
          </div>
          <FadeIn variant="fade-left" className="relative">
            <div className="absolute -inset-6 bg-[var(--gradient-brand)] opacity-20 rounded-[2rem] blur-2xl" />
            <img src={hero} alt="Spotless modern living room cleaned by a Suyusan Solutions professional" width={1600} height={1000} fetchPriority="high" loading="eager" className="relative rounded-[var(--radius-bento)] shadow-[var(--shadow-soft)] object-cover aspect-[4/3] w-full" />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)] hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-green/30 grid place-items-center"><Leaf className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="text-sm font-semibold">{t("home.ecoBadge")}</div>
                <div className="text-xs text-muted-foreground">{t("home.ecoBadgeText")}</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map(({ icon: Icon, title, text }, idx) => (
            <FadeIn key={title} variant="fade-up" delay={idx * 75} className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center shrink-0"><Icon className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{text}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.bento.kicker")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.bento.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("home.bento.lead")}</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              {t("home.bento.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <BentoGrid className="mt-12">
          <BentoCard span="2x2" image="/Galeria/02.jpeg">
            <div className="flex h-full flex-col justify-end">
              <h3 className="font-display text-3xl font-bold">{t("home.bento.featureTitle")}</h3>
              <p className="mt-2 max-w-md text-white">{t("home.bento.featureText")}</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all">
                {t("home.bento.exploreDeep")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>

          {services.slice(0, 4).map(({ slug, icon: Icon }) => (
            <BentoCard key={slug} span="1x1">
              <Link to="/services" className="flex h-full flex-col">
                <div className="h-11 w-11 rounded-xl bg-[var(--gradient-brand)] grid place-items-center text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-lg font-semibold">{t(`services.items.${slug}.title`)}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t(`services.items.${slug}.short`)}</p>
              </Link>
            </BentoCard>
          ))}

          <BentoCard span="2x1" gradient>
            <div className="flex h-full flex-col justify-center">
              <h3 className="font-display text-2xl font-bold">{t("home.bento.ctaTitle")}</h3>
              <p className="mt-1 text-primary-foreground">{t("home.bento.ctaText")}</p>
              <Link to="/booking" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 transition">
                {t("common.bookIn60s")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.how.kicker")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.how.title")}</h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {howSteps.map(({ icon: Icon, step, title, text }, idx) => (
              <FadeIn key={step} variant="fade-up" delay={idx * 100} className="relative rounded-[var(--radius-bento)] border border-border bg-card p-8">
                <div className="font-display text-5xl font-bold text-primary/15">{step}</div>
                <div className="mt-4 h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center"><Icon className="h-6 w-6 text-primary" /></div>
                <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.pricingPreview.kicker")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.pricingPreview.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("home.pricingPreview.lead")}</p>
          </div>
        </FadeIn>
        <PricingTable className="mt-12" />
      </section>

      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.testimonials.kicker")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.testimonials.title")}</h2>
          </FadeIn>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((tt, idx) => (
              <FadeIn key={tt.id} variant="fade-up" delay={idx * 100} className="rounded-[var(--radius-bento)] border border-border bg-card p-8">
                <div className="flex gap-1">
                  {Array.from({ length: tt.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-green text-brand-green" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground italic">"{t(`testimonials.${tt.id}.quote`)}"</p>
                <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-[var(--gradient-brand)] grid place-items-center text-primary-foreground font-semibold">
                    {tt.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{tt.name}</div>
                    <div className="text-xs text-muted-foreground">{tt.location} · {t(`testimonials.${tt.id}.service`)}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.gallery.kicker")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.gallery.title")}</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              {t("home.gallery.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[3, 4, 5, 6, 7, 8].map((id) => (
            <FadeIn
              key={id}
              variant="fade-up"
              delay={id * 40}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-card border border-border aspect-[4/3]"
            >
              <Link to="/gallery" className="block h-full">
                <img
                  src={`/Galeria/${String(id).padStart(2, '0')}.jpeg`}
                  alt={t("gallery.imageAlt", { n: id })}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("home.faqPreview.kicker")}</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("home.faqPreview.title")}</h2>
            </div>
          </FadeIn>
          <FadeIn variant="fade-up" delay={100} className="mt-10">
            <FAQ items={faqIds.slice(0, 4)} />
            <div className="mt-8 text-center">
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                {t("home.faqPreview.viewAll")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold">{t("home.cta.title")}</h2>
            <p className="mt-4 text-primary-foreground text-lg">{t("home.cta.text")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
                {t("common.bookIn60s")} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+14165550123" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition">
                {t("home.cta.call")}
              </a>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-brand-green/40 blur-3xl" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
