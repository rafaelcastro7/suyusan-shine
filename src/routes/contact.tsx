import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { useDocumentMeta } from "@/hooks/use-document-meta";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Suyusan Solutions" },
      { name: "description", content: "Get a free quote for your home, office or retirement residence cleaning. Reach our GTA team by phone, email or form." },
      { property: "og:title", content: "Contact Suyusan Solutions" },
      { property: "og:description", content: "Get a free GTA cleaning quote by phone, email or contact form." },
      { property: "og:url", content: "https://suyusan-sparkle-solutions.lovable.app/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://suyusan-sparkle-solutions.lovable.app/contact" },
    ],
  }),
});

function ContactPage() {
  const { t } = useTranslation();
  useDocumentMeta("meta.contact.title", "meta.contact.description");
  const [sent, setSent] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, t("contact.errors.nameRequired")),
    email: z.string().email(t("contact.errors.emailValid")),
    phone: z.string().optional(),
    service: z.string().min(1, t("contact.errors.serviceRequired")),
    message: z.string().min(10, t("contact.errors.messageMin")),
  });
  type ContactFormData = z.infer<typeof contactSchema>;

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
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

      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-mesh" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-28">
          <FadeIn variant="fade-up">
            <div className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">{t("contact.kicker")}</div>
            <h1 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl">{t("contact.title")}</h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{t("contact.lead")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-3">
          <h2 className="font-display text-3xl font-bold tracking-tight mb-8">{t("contact.getInTouch")}</h2>
        </div>
        <FadeIn variant="fade-left" className="lg:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
          {sent ? (
            <div className="text-center py-16 animate-fade-up">
              <div className="mx-auto h-16 w-16 rounded-full bg-brand-green/30 grid place-items-center">
                <CheckCircle2 className="h-8 w-8 text-primary animate-bounce" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{t("contact.form.thanksTitle")}</h2>
              <p className="mt-2 text-muted-foreground">{t("contact.form.thanksText")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium">{t("contact.form.name")}</label>
                <Input {...register("name")} className="mt-1.5" placeholder={t("contact.form.namePlaceholder")} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">{t("contact.form.email")}</label>
                <Input {...register("email")} type="email" className="mt-1.5" placeholder={t("contact.form.emailPlaceholder")} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">{t("contact.form.phone")}</label>
                <Input {...register("phone")} type="tel" className="mt-1.5" placeholder={t("contact.form.phonePlaceholder")} />
              </div>

              <div>
                <label className="text-sm font-medium">{t("contact.form.service")}</label>
                <Controller
                  name="service"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("contact.form.selectService")} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {t(`services.items.${s.slug}.title`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium">{t("contact.form.message")}</label>
                <Textarea {...register("message")} className="mt-1.5" placeholder={t("contact.form.messagePlaceholder")} rows={5} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="sm:col-span-2 w-full">
                <Send className="h-4 w-4 mr-2" />
                {t("contact.form.send")}
              </Button>
            </form>
          )}
        </FadeIn>

        <FadeIn variant="fade-right" className="space-y-4">
          <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
            <div className="h-11 w-11 rounded-xl bg-[var(--gradient-brand)] grid place-items-center"><CalendarCheck className="h-5 w-5 text-primary-foreground" /></div>
            <div className="mt-4 font-semibold">{t("contact.info.instantBookTitle")}</div>
            <p className="mt-1 text-sm text-muted-foreground">{t("contact.info.instantBookText")}</p>
            <Link to="/booking" className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              {t("common.bookIn60s")}
            </Link>
          </div>
          <InfoCard icon={Phone} title={t("contact.info.callTitle")} lines={["(416) 555-0123", t("contact.info.callHours")]} />
          <InfoCard icon={Mail} title={t("contact.info.emailTitle")} lines={["info@suyusansolutions.ca"]} />
          <InfoCard icon={MapPin} title={t("contact.info.areaTitle")} lines={[t("contact.info.areaLine1"), t("contact.info.areaLine2")]} />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">{t("contact.serviceArea")}</h2>
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
