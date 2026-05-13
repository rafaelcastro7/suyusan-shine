import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/data/services";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Suyusan Solutions Inc." },
      { name: "description", content: "Get a free quote for your home, office or retirement residence cleaning needs." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Contact</div>
          <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">Let's get your space sparkling.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Tell us a bit about your needs and we'll reply with a free quote within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center py-16">
              <div className="mx-auto h-16 w-16 rounded-full bg-brand-green/30 grid place-items-center"><CheckCircle2 className="h-8 w-8 text-primary" /></div>
              <h2 className="mt-5 font-display text-2xl font-bold">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">We received your request and will be in touch within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="grid sm:grid-cols-2 gap-5"
            >
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="text-sm font-medium">Service</label>
                <select required className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select a service…</option>
                  {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={5} placeholder="Tell us about your space, square footage and preferred schedule…" className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit" className="sm:col-span-2 inline-flex justify-center items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] hover:opacity-90 transition">
                Send request <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <aside className="space-y-4">
          <InfoCard icon={Phone} title="Call us" lines={["(416) 555-0123", "Mon–Sat, 8am–7pm"]} />
          <InfoCard icon={Mail} title="Email" lines={["info@suyusansolutions.ca"]} />
          <InfoCard icon={MapPin} title="Service area" lines={["Greater Toronto Area", "& surrounding regions"]} />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">{label}</label>
      <input id={name} name={name} type={type} required={required} className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof Phone; title: string; lines: string[] }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center"><Icon className="h-5 w-5 text-primary" /></div>
      <div className="mt-4 font-semibold">{title}</div>
      {lines.map((l) => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
    </div>
  );
}
