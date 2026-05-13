import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Award, Users, Leaf } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import team from "@/assets/team.jpg";
import office from "@/assets/office.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Suyusan Solutions Inc." },
      { name: "description", content: "Suyusan Solutions Inc. is a Canadian cleaning company built on care, consistency and trust." },
    ],
  }),
});

const values = [
  { icon: Heart, title: "Care", text: "We treat every space — and the people in it — like our own family's." },
  { icon: Award, title: "Standards", text: "Documented checklists, supervised crews and a 100% satisfaction guarantee." },
  { icon: Users, title: "People-first", text: "Fair wages, training and respect for every member of our team." },
  { icon: Leaf, title: "Sustainability", text: "Low-VOC, biodegradable products that protect your home and our planet." },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">About us</div>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold tracking-tight">Cleaning, with care behind every detail.</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Suyusan Solutions Inc. is a Canadian cleaning company built on a simple idea: a clean space changes how you feel in it.
              From a single home to a 200-suite retirement residence, our promise is the same — show up, do it right, and leave it better than we found it.
            </p>
          </div>
          <img src={team} alt="The Suyusan Solutions team" width={1400} height={1000} loading="lazy" className="rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-border bg-card p-7">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center"><Icon className="h-6 w-6 text-primary" /></div>
            <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <img src={office} alt="Modern office cleaned by Suyusan Solutions" width={1400} height={1000} loading="lazy" className="rounded-[2rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/3] order-2 lg:order-1" />
          <div className="order-1 lg:order-2">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Why Suyusan</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">Built for homes, scaled for facilities.</h2>
            <p className="mt-4 text-muted-foreground">
              We started with residential clients and grew into commercial contracts and retirement-home housekeeping because our clients kept asking us to.
              That same residential attention to detail is what we bring to every commercial space we service.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)]">
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
