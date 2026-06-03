import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { FadeIn } from "@/components/FadeIn";

export function PricingTable({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={`grid gap-6 lg:grid-cols-3 ${className}`}>
      {pricingTiers.map((tier, i) => {
        const features = t(`pricing.tiers.${tier.id}.features`, { returnObjects: true }) as string[];
        return (
          <FadeIn
            key={tier.id}
            variant="fade-up"
            delay={i * 100}
            className={`relative flex flex-col rounded-[var(--radius-bento)] border p-8 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${
              tier.popular
                ? "border-primary bg-card shadow-[var(--shadow-brand)]"
                : "border-border bg-card"
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-8 inline-flex items-center gap-1 rounded-full bg-[var(--gradient-brand)] px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="h-3 w-3" /> {t("pricing.mostPopular")}
              </div>
            )}
            <h3 className="font-display text-2xl font-bold">{t(`pricing.tiers.${tier.id}.name`)}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t(`pricing.tiers.${tier.id}.tagline`)}</p>

            <div className="mt-6 flex items-baseline gap-1">
              {tier.startingAt > 0 ? (
                <>
                  <span className="text-sm text-muted-foreground">{t("common.from")}</span>
                  <span className="font-display text-4xl font-bold">${tier.startingAt}</span>
                  <span className="text-sm text-muted-foreground">{t(`pricing.tiers.${tier.id}.unit`)}</span>
                </>
              ) : (
                <span className="font-display text-3xl font-bold">{t("pricing.customQuote")}</span>
              )}
            </div>

            <ul className="mt-6 space-y-3 flex-1">
              {features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check className="h-5 w-5 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>

            <Link
              to={tier.id === "commercial" ? "/contact" : "/booking"}
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                tier.popular
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90"
                  : "border border-border bg-background hover:bg-muted"
              }`}
            >
              {tier.id === "commercial" ? t("common.requestQuote") : t("common.bookNow")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
        );
      })}
    </div>
  );
}
