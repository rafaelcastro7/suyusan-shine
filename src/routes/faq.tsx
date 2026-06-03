import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { FAQ } from "@/components/FAQ";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { faqIds } from "@/data/faqs";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import enCommon from "@/i18n/locales/en.json";

// Build the JSON-LD payload from the English copy (canonical for SEO crawlers).
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqIds.map((id) => ({
    "@type": "Question",
    name: enCommon.faq.items[id].q,
    acceptedAnswer: { "@type": "Answer", text: enCommon.faq.items[id].a },
  })),
};

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — Suyusan Solutions" },
      { name: "description", content: "Answers about insurance, products, scheduling, pricing, pets and our GTA service area." },
      { property: "og:title", content: "FAQ — Suyusan Solutions" },
      { property: "og:description", content: "Answers to common questions about our GTA cleaning services." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/faq" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/faq" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(faqJsonLd),
      },
    ],
  }),
});

function FAQPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.faq.title", "meta.faq.description");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("faq.kicker")}</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">{t("faq.title")}</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{t("faq.lead")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl w-full px-5 lg:px-8 py-20">
        <FadeIn variant="fade-up">
          <FAQ items={faqIds} />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20">
        <FadeIn variant="fade-up">
          <ServiceAreaMap />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="rounded-[2.5rem] border border-border bg-card p-10 md:p-12 text-center">
          <h2 className="font-display text-3xl font-bold">{t("faq.stillTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("faq.stillText")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
              {t("faq.contactUs")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition">
              {t("common.bookIn60s")}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
