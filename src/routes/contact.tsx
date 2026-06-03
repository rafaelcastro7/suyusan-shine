import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, CheckCircle2, CalendarCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FadeIn } from "@/components/FadeIn";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    console.log("Form submitted:", data);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      reset();
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[var(--gradient-soft)] border-b border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">Contact</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">Let's get your space sparkling.</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Tell us a bit about your needs and we'll reply with a free quote within one business day.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-3 gap-10">
        <FadeIn variant="fade-left" className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="mx-auto h-16 w-16 rounded-full bg-brand-green/30 grid place-items-center">
                <CheckCircle2 className="h-8 w-8 text-primary animate-bounce" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">Thank you!</h2>
              <p className="mt-2 text-muted-foreground">We received your request and will be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">Full name</label>
                <Input
                  {...register("name")}
                  className="mt-1.5"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  className="mt-1.5"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  {...register("phone")}
                  type="tel"
                  className="mt-1.5"
                  placeholder="(416) 555-0123"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Service</label>
                <Controller
                  name="service"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder="Select a service…" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  {...register("message")}
                  className="mt-1.5"
                  placeholder="Tell us about your space, square footage and preferred schedule…"
                  rows={5}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="sm:col-span-2 w-full">
                <Send className="h-4 w-4 mr-2" />
                Send request
              </Button>
            </form>
          )}
        </FadeIn>

        <FadeIn variant="fade-right" className="space-y-4">
          <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
            <div className="h-11 w-11 rounded-xl bg-[var(--gradient-brand)] grid place-items-center"><CalendarCheck className="h-5 w-5 text-primary-foreground" /></div>
            <div className="mt-4 font-semibold">Prefer to book instantly?</div>
            <p className="mt-1 text-sm text-muted-foreground">Get a quote and reserve your slot in under 60 seconds.</p>
            <Link to="/booking" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              Book in 60s
            </Link>
          </div>
          <InfoCard icon={Phone} title="Call us" lines={["(416) 555-0123", "Mon–Sat, 8am–7pm"]} />
          <InfoCard icon={Mail} title="Email" lines={["info@suyusansolutions.ca"]} />
          <InfoCard icon={MapPin} title="Service area" lines={["Greater Toronto Area", "& surrounding regions"]} />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <FadeIn variant="fade-up">
          <ServiceAreaMap />
        </FadeIn>
      </section>

      <SiteFooter />
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
