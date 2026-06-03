import { ReactNode, HTMLAttributes } from "react";

interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/**
 * 2026 bento grid: responsive auto-rows with generous gap.
 * Children use col-span / row-span via BentoCard `span` prop.
 */
export function BentoGrid({ children, className = "", ...rest }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(11rem,auto)] gap-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

type BentoSpan = "1x1" | "2x1" | "1x2" | "2x2";

const spanClasses: Record<BentoSpan, string> = {
  "1x1": "lg:col-span-1 lg:row-span-1",
  "2x1": "sm:col-span-2 lg:col-span-2 lg:row-span-1",
  "1x2": "lg:col-span-1 lg:row-span-2",
  "2x2": "sm:col-span-2 lg:col-span-2 lg:row-span-2",
};

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  span?: BentoSpan;
  className?: string;
  /** Apply the brand gradient background */
  gradient?: boolean;
  /** Use a background image */
  image?: string;
}

export function BentoCard({
  children,
  span = "1x1",
  className = "",
  gradient = false,
  image,
  ...rest
}: BentoCardProps) {
  const base =
    "group relative overflow-hidden rounded-[var(--radius-bento)] border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]";
  const bg = gradient
    ? "bg-[var(--gradient-brand)] text-primary-foreground"
    : image
      ? "text-white"
      : "bg-card";

  return (
    <div className={`${base} ${bg} ${spanClasses[span]} ${className}`} {...rest}>
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
