import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const isLight = tone === 'light'

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            'flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em]',
            isLight ? 'text-accent' : 'text-accent-foreground/70',
          )}
        >
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          'font-serif text-3xl leading-tight text-balance sm:text-4xl md:text-5xl',
          isLight ? 'text-background' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed text-pretty',
            isLight ? 'text-background/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
