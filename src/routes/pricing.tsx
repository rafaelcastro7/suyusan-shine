import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { PricingTable } from "@/components/PricingTable";
import { FAQ } from "@/components/FAQ";
import { faqIds } from "@/data/faqs";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Suyusan Solutions" },
      { name: "description", content: "Transparent cleaning prices. Starting rates for home cleaning, deep cleans and custom commercial quotes across the GTA." },
      { property: "og:title", content: "Pricing — Suyusan Solutions" },
      { property: "og:description", content: "Transparent starting rates for residential and commercial cleaning across the GTA." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/pricing" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/pricing" },
    ],
  }),
});

const pricingFaqIds = ["pay", "cancellation", "guarantee", "supplies"] as const;

function PricingPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.pricing.title", "meta.pricing.description");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 text-center">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("pricing.kicker")}</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t("pricing.title")}</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">{t("pricing.lead")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <PricingTable />
        <FadeIn variant="fade-up" className="mt-12 text-center text-sm text-muted-foreground">
          {t("pricing.footnote")}{" "}
          <Link to="/booking" className="font-semibold text-primary hover:underline">{t("pricing.getExact")}</Link>
        </FadeIn>
      </section>

      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-20">
          <FadeIn variant="fade-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">{t("pricing.faqTitle")}</h2>
          </FadeIn>
          <FadeIn variant="fade-up" delay={100} className="mt-8">
            <FAQ items={pricingFaqIds} />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold">{t("pricing.cta.title")}</h2>
            <p className="mt-4 text-primary-foreground text-lg">{t("pricing.cta.text")}</p>
            <Link to="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
              {t("common.bookIn60s")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
