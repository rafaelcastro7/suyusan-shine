import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { PricingTable } from "@/components/PricingTable";
import { FAQ } from "@/components/FAQ";
import { faqs } from "@/data/faqs";

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

// Pricing-relevant FAQs
const pricingFaqs = faqs.filter((f) =>
  /pay|cancellation|guarantee|supplies/i.test(f.question)
);

function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 text-center">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Pricing</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">Simple, transparent pricing</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. See your starting rate up front, then book online in 60 seconds with an instant quote.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <PricingTable />
        <FadeIn variant="fade-up" className="mt-12 text-center text-sm text-muted-foreground">
          Final price depends on home size and frequency. Recurring service saves up to 20%.{" "}
          <Link to="/booking" className="font-semibold text-primary hover:underline">Get your exact quote →</Link>
        </FadeIn>
      </section>

      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-20">
          <FadeIn variant="fade-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-center">Pricing questions</h2>
          </FadeIn>
          <FadeIn variant="fade-up" delay={100} className="mt-8">
            <FAQ items={pricingFaqs} />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Ready to book?</h2>
            <p className="mt-4 text-primary-foreground text-lg">Get your personalized quote in under a minute.</p>
            <Link to="/booking" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
              Book in 60s <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
