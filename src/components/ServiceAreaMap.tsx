import { MapPin } from "lucide-react";
import { neighborhoods } from "@/data/neighborhoods";

export function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`grid lg:grid-cols-2 gap-8 items-stretch ${className}`}>
      <div className="overflow-hidden rounded-[var(--radius-bento)] border border-border min-h-[15rem] md:min-h-[20rem]">
        <iframe
          title="Suyusan Solutions service area — Greater Toronto Area"
          src="https://www.google.com/maps?q=Greater+Toronto+Area,+Ontario,+Canada&output=embed"
          className="h-full w-full min-h-[15rem] md:min-h-[20rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="rounded-[var(--radius-bento)] border border-border bg-card p-5 md:p-8">
        <div className="flex items-center gap-2 text-primary">
          <MapPin className="h-5 w-5" />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">Where we clean</span>
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold">Serving the Greater Toronto Area</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          We bring the same trusted crews and consistent standard across the GTA and surrounding regions.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {neighborhoods.map((n) => (
            <span
              key={n}
              className="rounded-full border border-border bg-background px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-foreground/90"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
