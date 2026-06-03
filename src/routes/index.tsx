import { createFileRoute, Link } from "@tanstack/react-router";
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
import { faqs } from "@/data/faqs";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Suyusan Solutions Inc. — Professional Cleaning in Canada" },
      { name: "description", content: "Residential and commercial cleaning services across the GTA — regular, deep, post-construction, senior care and retirement-home housekeeping. Book online in 60 seconds." },
    ],
    links: [
      { rel: "preload", as: "image", href: hero, fetchpriority: "high" },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-foreground/90">
              <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" /> Now booking across the GTA
            </div>
            <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              <Reveal
                lines={[
                  "A spotless space.",
                  <span key="grad" className="text-transparent bg-clip-text bg-[var(--gradient-brand)]">A clearer mind.</span>,
                ]}
                lineClassName="block"
              />
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Suyusan Solutions Inc. delivers dependable, detail-obsessed cleaning for homes,
              offices and retirement residences. Insured, bonded and trained — book online in 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
                Book in 60s <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition">
                See pricing
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <StatCounter value={500} suffix="+" label="Homes cleaned" />
              <StatCounter value={4.9} decimals={1} suffix="★" label="Client rating" />
              <StatCounter value={100} suffix="%" label="Satisfaction" />
            </div>
          </div>
          <FadeIn variant="fade-left" className="relative">
            <div className="absolute -inset-6 bg-[var(--gradient-brand)] opacity-20 rounded-[2rem] blur-2xl" />
            <img src={hero} alt="Spotless modern living room cleaned by a Suyusan Solutions professional" width={1600} height={1000} fetchPriority="high" loading="eager" className="relative rounded-[var(--radius-bento)] shadow-[var(--shadow-soft)] object-cover aspect-[4/3] w-full" />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)] hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-green/30 grid place-items-center"><Leaf className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="text-sm font-semibold">Eco-friendly products</div>
                <div className="text-xs text-muted-foreground">Safe for kids & pets</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Insured & bonded", text: "Full liability coverage" },
            { icon: Sparkles, title: "Trained crews", text: "Background-checked staff" },
            { icon: Leaf, title: "Eco products", text: "Low-VOC, family-safe" },
            { icon: Clock, title: "On-time service", text: "Reliable scheduling" },
          ].map(({ icon: Icon, title, text }, idx) => (
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

      {/* BENTO SERVICES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">What we do</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Cleaning services for every space</h2>
              <p className="mt-4 text-muted-foreground">From recurring home upkeep to commercial contracts and overnight retirement-home shifts — one team, one standard.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <BentoGrid className="mt-12">
          {/* Feature tile (2x2) */}
          <BentoCard span="2x2" image="/Galeria/02.jpeg">
            <div className="flex h-full flex-col justify-end">
              <h3 className="font-display text-3xl font-bold">Whole-home deep cleans</h3>
              <p className="mt-2 max-w-md text-white">Top-to-bottom resets that reach everything regular service doesn't.</p>
              <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:gap-3 transition-all">
                Explore deep cleaning <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>

          {/* Service tiles */}
          {services.slice(0, 4).map(({ slug, title, short, icon: Icon }) => (
            <BentoCard key={slug} span="1x1">
              <Link to="/services" className="flex h-full flex-col">
                <div className="h-11 w-11 rounded-xl bg-[var(--gradient-brand)] grid place-items-center text-primary-foreground"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{short}</p>
              </Link>
            </BentoCard>
          ))}

          {/* CTA tile (2x1) */}
          <BentoCard span="2x1" gradient>
            <div className="flex h-full flex-col justify-center">
              <h3 className="font-display text-2xl font-bold">Not sure what you need?</h3>
              <p className="mt-1 text-primary-foreground">Get a free quote in under a minute.</p>
              <Link to="/booking" className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:opacity-90 transition">
                Book in 60s <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </BentoCard>
        </BentoGrid>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">How it works</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Cleaning in three simple steps</h2>
            </div>
          </FadeIn>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {[
              { icon: CalendarCheck, step: "01", title: "Book online", text: "Pick your service, size and schedule in under 60 seconds — get an instant quote." },
              { icon: SprayCan, step: "02", title: "We clean", text: "Your trusted, background-checked crew arrives on time with eco-friendly products." },
              { icon: Smile, step: "03", title: "You relax", text: "Come home to a spotless space — backed by our 100% satisfaction guarantee." },
            ].map(({ icon: Icon, step, title, text }, idx) => (
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

      {/* PRICING PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Transparent pricing</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Simple, upfront rates</h2>
            <p className="mt-4 text-muted-foreground">No hidden fees, no surprises. See what you'll pay before you book.</p>
          </div>
        </FadeIn>
        <PricingTable className="mt-12" />
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Trusted by hundreds</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">What our clients say</h2>
          </FadeIn>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, idx) => (
              <FadeIn key={t.name} variant="fade-up" delay={idx * 100} className="rounded-[var(--radius-bento)] border border-border bg-card p-8">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-green text-brand-green" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground italic">"{t.quote}"</p>
                <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-[var(--gradient-brand)] grid place-items-center text-primary-foreground font-semibold">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location} · {t.service}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <FadeIn variant="fade-up">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our work</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">See the transformation</h2>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              View all photos <ArrowRight className="h-4 w-4" />
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
                  alt={`Suyusan cleaning project ${id}`}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-24">
          <FadeIn variant="fade-up">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Questions</div>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Frequently asked</h2>
            </div>
          </FadeIn>
          <FadeIn variant="fade-up" delay={100} className="mt-10">
            <FAQ items={faqs.slice(0, 4)} />
            <div className="mt-8 text-center">
              <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                See all FAQs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Ready for a cleaner space?</h2>
            <p className="mt-4 text-primary-foreground text-lg">Book online in under a minute, or tell us about your facility and we'll send a free quote within one business day.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
                Book in 60s <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+14165550123" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition">
                Call (416) 555-0123
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
