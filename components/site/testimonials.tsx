import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/site-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

export function Testimonials() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by Travellers"
          description="The trips we plan become stories our travellers carry for a lifetime. Here's what a few of them had to say."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-sm border border-border/70 bg-card p-8 shadow-sm">
                <Quote className="h-8 w-8 text-accent" strokeWidth={1.5} />
                <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-pretty text-foreground/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-medium text-primary">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
