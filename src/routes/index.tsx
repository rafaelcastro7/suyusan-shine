import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Leaf, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/data/services";
import hero from "@/assets/hero.jpg";
import team from "@/assets/team.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Suyusan Solutions Inc. — Professional Cleaning in Canada" },
      { name: "description", content: "Residential and commercial cleaning services across Canada — regular, deep, post-construction, senior care and retirement-home housekeeping." },
    ],
  }),
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-soft)]" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 backdrop-blur px-3 py-1 text-xs font-medium text-foreground/70">
              <span className="h-2 w-2 rounded-full bg-brand-green" /> Now booking across the GTA
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              A spotless space.
              <span className="block text-transparent bg-clip-text bg-[var(--gradient-brand)]">A clearer mind.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Suyusan Solutions Inc. delivers dependable, detail-obsessed cleaning for homes,
              offices and retirement residences. Insured, bonded and trained — so you can finally
              breathe easy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
                Get a free quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold hover:bg-muted transition">
                Explore services
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["500+", "Homes cleaned"],
                ["4.9★", "Client rating"],
                ["100%", "Satisfaction"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-2xl font-bold text-foreground">{k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-[var(--gradient-brand)] opacity-20 rounded-[2rem] blur-2xl" />
            <img src={hero} alt="Spotless modern living room being cleaned by a Suyusan Solutions professional" width={1600} height={1000} className="relative rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3] w-full" />
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)] hidden md:flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-green/30 grid place-items-center"><Leaf className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="text-sm font-semibold">Eco-friendly products</div>
                <div className="text-xs text-muted-foreground">Safe for kids & pets</div>
              </div>
            </div>
          </div>
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
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center shrink-0"><Icon className="h-5 w-5 text-primary" /></div>
              <div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
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

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(0, 6).map(({ slug, title, short, icon: Icon }) => (
            <Link key={slug} to="/services" className="group relative rounded-3xl border border-border bg-card p-7 hover:shadow-[var(--shadow-soft)] hover:-translate-y-1 transition-all">
              <div className="h-12 w-12 rounded-2xl bg-[var(--gradient-brand)] grid place-items-center text-primary-foreground"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{short}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="bg-[var(--gradient-soft)] border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <img src={team} alt="The Suyusan Solutions cleaning team" width={1400} height={1000} loading="lazy" className="rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3]" />
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Our promise</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">A team you can trust in your space</h2>
            <p className="mt-4 text-muted-foreground">
              Every Suyusan Solutions cleaner is interviewed in person, background-checked, trained on our checklists and supervised by a regional lead.
              We send the same trusted crew on each visit so your home or business is never in unfamiliar hands.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Same trusted crew on every visit",
                "Detailed, documented service checklists",
                "Eco-friendly products provided",
                "100% satisfaction guaranteed — we'll re-clean if needed",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {t}</li>
              ))}
            </ul>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
              About Suyusan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--gradient-brand)] p-10 md:p-16 text-primary-foreground">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Ready for a cleaner space?</h2>
            <p className="mt-4 text-primary-foreground/90 text-lg">Tell us about your home or facility and we'll send a free, no-obligation quote within one business day.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition">
                Request a quote <ArrowRight className="h-4 w-4" />
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
