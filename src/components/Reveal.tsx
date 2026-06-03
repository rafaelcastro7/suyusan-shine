import { ReactNode } from "react";
import { useIntersection } from "@/hooks/use-intersection";

interface RevealProps {
  /** Lines of text to reveal sequentially. Each becomes its own masked line. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  /** Delay between lines in ms */
  stagger?: number;
}

/**
 * Kinetic typography: each line is masked and slides up into view on scroll.
 * Used for hero / section headlines.
 */
export function Reveal({ lines, className = "", lineClassName = "", stagger = 120 }: RevealProps) {
  const [ref, isVisible] = useIntersection({ threshold: 0.3, triggerOnce: true });

  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`kinetic-line ${lineClassName}`}>
          <span
            style={{
              animationDelay: isVisible ? `${i * stagger}ms` : undefined,
              animationPlayState: isVisible ? "running" : "paused",
              opacity: isVisible ? undefined : 0,
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
