import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft, Check, Sparkles, SprayCan, Building2, CalendarDays } from "lucide-react";
import {
  pricingTiers,
  sizeOptions,
  frequencyOptions,
  estimateQuote,
} from "@/data/pricing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const stepKeys = ["service", "size", "frequency", "schedule", "details"] as const;

const serviceIcons: Record<string, typeof Sparkles> = {
  home: Sparkles,
  deep: SprayCan,
  commercial: Building2,
};

export function BookingWizard() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isCommercial = tier === "commercial";
  const quote = estimateQuote(tier, size, frequency);

  const canAdvance = () => {
    switch (step) {
      case 0:
        return !!tier;
      case 1:
        return isCommercial || !!size;
      case 2:
        return isCommercial || !!frequency;
      case 3:
        return !!date;
      case 4:
        return name.length > 1 && /\S+@\S+\.\S+/.test(email);
      default:
        return false;
    }
  };

  const next = () => {
    if (isCommercial && step === 0) {
      setStep(3);
      return;
    }
    setStep((s) => Math.min(s + 1, stepKeys.length - 1));
  };

  const back = () => {
    if (isCommercial && step === 3) {
      setStep(0);
      return;
    }
    setStep((s) => Math.max(s - 1, 0));
  };

  if (submitted) {
    const tierName = tier ? (t(`pricing.tiers.${tier}.name`) as string).toLowerCase() : "";
    const dateText = date ? t("booking.successDate", { date }) : "";
    const quoteText = !isCommercial && quote > 0 ? t("booking.successQuote", { quote: `$${quote}` }) : "";
    return (
      <div className="rounded-[var(--radius-bento)] border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)] animate-fade-up">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green/30">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-5 font-display text-3xl font-bold">{t("booking.successTitle")}</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {t("booking.successText", { name: name.split(" ")[0], tier: tierName, date: dateText })}
          {quoteText}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[var(--radius-bento)] border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-1 sm:gap-2">
        {stepKeys.map((key, i) => {
          const hidden = isCommercial && (i === 1 || i === 2);
          return (
            <div key={key} className={`flex-1 ${hidden ? "opacity-30" : ""}`}>
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
              <div className="mt-2 hidden text-xs text-muted-foreground sm:block">{t(`booking.steps.${key}`)}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 min-h-[18rem]">
        {step === 0 && (
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold">{t("booking.q.service")}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {pricingTiers.map((tt) => {
                const Icon = serviceIcons[tt.id] ?? Sparkles;
                return (
                  <button
                    key={tt.id}
                    onClick={() => setTier(tt.id)}
                    className={`rounded-2xl border p-5 text-left transition ${
                      tier === tt.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <div className="mt-3 font-semibold">{t(`pricing.tiers.${tt.id}.name`)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t(`pricing.tiers.${tt.id}.tagline`)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && !isCommercial && (
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold">{t("booking.q.size")}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sizeOptions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    size === s.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <div className="font-semibold">{t(`pricing.sizes.${s.id}`)}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && !isCommercial && (
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold">{t("booking.q.frequency")}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {frequencyOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrequency(f.id)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                    frequency === f.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="font-semibold">{t(`pricing.frequencies.${f.id}`)}</span>
                  {f.discount > 0 && (
                    <span className="rounded-full bg-brand-green/30 px-2 py-0.5 text-xs font-semibold text-brand-green-deep">
                      {t("pricing.frequencies.save", { percent: Math.round(f.discount * 100) })}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold">{t("booking.q.schedule")}</h3>
            <div className="mt-6 max-w-xs">
              <label className="text-sm font-medium flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> {t("booking.preferredDate")}
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-2 text-xs text-muted-foreground">{t("booking.scheduleHint")}</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl font-bold">{t("booking.q.details")}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium">{t("booking.fullName")}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" placeholder={t("booking.fullNamePlaceholder")} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("booking.email")}</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder={t("booking.emailPlaceholder")} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("booking.phone")}</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" placeholder={t("booking.phonePlaceholder")} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 border-t border-border pt-6">
        <div>
          {!isCommercial && quote > 0 ? (
            <div>
              <div className="text-xs text-muted-foreground">{t("booking.estimatedQuote")}</div>
              <div className="font-display text-2xl font-bold text-primary">
                ${quote}
                <span className="ml-1 text-sm font-normal text-muted-foreground">
                  {frequency === "once" ? t("booking.perClean") : t("booking.perVisit")}
                </span>
              </div>
            </div>
          ) : isCommercial ? (
            <div className="text-sm text-muted-foreground">{t("booking.commercialQuote")}</div>
          ) : (
            <div className="text-sm text-muted-foreground">{t("booking.selectToSee")}</div>
          )}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={back}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted transition"
            >
              <ArrowLeft className="h-4 w-4" /> {t("common.back")}
            </button>
          )}
          {step < stepKeys.length - 1 ? (
            <button
              onClick={next}
              disabled={!canAdvance()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-brand)] transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("common.continue")} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <Button
              onClick={() => canAdvance() && setSubmitted(true)}
              disabled={!canAdvance()}
              className="rounded-full px-6"
            >
              {t("booking.confirm")} <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
