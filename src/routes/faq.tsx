import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { FAQ } from "@/components/FAQ";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { faqs } from "@/data/faqs";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — Suyusan Solutions Inc." },
      { name: "description", content: "Answers to common questions about insurance, products, scheduling, pricing, pets and our service area across the GTA." },
    ],
  }),
});

function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Help center</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">Frequently asked questions</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Everything you need to know about working with Suyusan. Can't find your answer? Just reach out.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl w-full px-5 lg:px-8 py-20">
        <FadeIn variant="fade-up">
          <FAQ items={faqs} />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20">
        <FadeIn variant="fade-up">
          <ServiceAreaMap />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <div className="rounded-[2.5rem] border border-border bg-card p-10 md:p-12 text-center">
          <h2 className="font-display text-3xl font-bold">Still have questions?</h2>
          <p className="mt-3 text-muted-foreground">Our team is happy to help you find the right service.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition">
              Book in 60s
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
