import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, Heart, Award, Users, Leaf } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { StatCounter } from "@/components/StatCounter";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import team from "@/assets/team.jpg";
import office from "@/assets/office.jpg";
import cleanOffice from "@/assets/clean-office.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Suyusan Solutions Inc." },
      { name: "description", content: "Meet Suyusan Solutions — a GTA cleaning company built on care, consistency and trained, background-checked crews." },
      { property: "og:title", content: "About Suyusan Solutions Inc." },
      { property: "og:description", content: "A GTA cleaning company built on care, consistency and trained crews." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/about" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/about" },
    ],
  }),
});

const valueDefs = [
  { id: "care", icon: Heart },
  { id: "standards", icon: Award },
  { id: "people", icon: Users },
  { id: "sustainability", icon: Leaf },
] as const;

const teamPhotos = [cleanOffice, team, "/Galeria/04.jpeg", "/Galeria/08.jpeg", office];

function AboutPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.about.title", "meta.about.description");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn variant="fade-right">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("about.kicker")}</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t("about.title")}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{t("about.lead")}</p>
          </FadeIn>
          <FadeIn variant="fade-left">
            <img src="/Galeria/06.jpeg" alt="Suyusan Solutions professional cleaning at work" width={1400} height={1000} loading="lazy" className="rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3]" />
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <StatCounter value={500} suffix="+" label={t("about.stats.homes")} />
          <StatCounter value={4.9} decimals={1} suffix="★" label={t("about.stats.rating")} />
          <StatCounter value={16} suffix="+" label={t("about.stats.regions")} />
          <StatCounter value={100} suffix="%" label={t("about.stats.satisfaction")} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueDefs.map(({ id, icon: Icon }, idx) => (
            <FadeIn key={id} variant="fade-up" delay={idx * 75} className="rounded-3xl border border-border bg-card p-7">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center"><Icon className="h-6 w-6 text-primary" /></div>
              <h2 className="mt-5 font-display text-xl font-semibold">{t(`about.values.${id}.title`)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t(`about.values.${id}.text`)}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn variant="fade-right" className="order-2 lg:order-1">
            <Carousel className="w-full">
              <CarouselContent>
                {teamPhotos.map((photo, i) => (
                  <CarouselItem key={i}>
                    <img
                      src={photo}
                      alt={`Team photo ${i + 1}`}
                      width={1400}
                      height={1000}
                      loading="lazy"
                      className="rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3] w-full"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </FadeIn>

          <FadeIn variant="fade-left" className="order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("about.why.kicker")}</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("about.why.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("about.why.text")}</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
              {t("about.why.cta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
