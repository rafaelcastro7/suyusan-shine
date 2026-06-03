import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { BookingWizard } from "@/components/BookingWizard";

export const Route = createFileRoute("/booking")({
  component: BookingPage,
  head: () => ({
    meta: [
      { title: "Book Online — Suyusan Solutions Inc." },
      { name: "description", content: "Book your cleaning in under 60 seconds. Pick your service, size and schedule, and get an instant quote." },
    ],
  }),
});

function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 lg:py-20 text-center">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Book online</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">Your clean, booked in 60 seconds</h1>
            <p className="mt-4 text-muted-foreground">Answer a few quick questions and get an instant estimate — no phone call required.</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-3xl w-full px-5 lg:px-8 py-16">
        <BookingWizard />
      </section>

      <SiteFooter />
    </div>
  );
}
