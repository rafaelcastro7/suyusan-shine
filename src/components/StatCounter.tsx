import { useEffect, useState } from "react";
import { useIntersection } from "@/hooks/use-intersection";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  duration?: number;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  label,
  duration = 1500,
}: StatCounterProps) {
  const [ref, isVisible] = useIntersection({ threshold: 0.4, triggerOnce: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref}>
      <div className="font-display text-3xl md:text-4xl font-bold text-foreground tabular-nums">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
