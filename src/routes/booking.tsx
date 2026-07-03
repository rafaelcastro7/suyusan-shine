import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { BookingWizard } from "@/components/BookingWizard";
import { useDocumentMeta } from "@/hooks/use-document-meta";

// Validate ?service= so only known tier ids are accepted
const searchSchema = z.object({
  service: z.enum(["home", "deep", "commercial"]).optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book Online — Suyusan Solutions" },
      { name: "description", content: "Book your cleaning in under 60 seconds. Pick service, size and schedule, and get an instant quote." },
      { property: "og:title", content: "Book Online — Suyusan Solutions" },
      { property: "og:description", content: "Book your cleaning in 60 seconds and get an instant quote." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/booking" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/booking" },
    ],
  }),
});

function BookingPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.booking.title", "meta.booking.description");
  const { service } = Route.useSearch();
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20 text-center">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("booking.kicker")}</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">{t("booking.title")}</h1>
            <p className="mt-4 text-muted-foreground">{t("booking.lead")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl w-full px-5 lg:px-8 py-16">
        <BookingWizard initialTier={service ?? ""} />
      </section>

      <SiteFooter />
    </div>
  );
}
