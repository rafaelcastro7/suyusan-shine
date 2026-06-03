import { ReactNode } from 'react'
import { useIntersection } from '@/hooks/use-intersection'

type FadeInVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'zoom'

interface FadeInProps {
  children: ReactNode
  variant?: FadeInVariant
  delay?: number
  duration?: number
  className?: string
}

const variantClasses: Record<FadeInVariant, string> = {
  'fade-up': 'animate-fade-up',
  'fade-left': 'animate-fade-left',
  'fade-right': 'animate-fade-right',
  'zoom': 'animate-zoom-in',
}

export function FadeIn({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
}: FadeInProps) {
  const [ref, isVisible] = useIntersection({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={`${isVisible ? variantClasses[variant] : 'opacity-0'} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
