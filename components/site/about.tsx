import { Check } from 'lucide-react'
import { STATS } from '@/lib/site-data'
import { Reveal } from './reveal'

const HIGHLIGHTS = [
  'Personal travel specialists for every journey',
  'Handpicked hotels, transfers & experiences',
  'Transparent pricing with no hidden fees',
]

export function About() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <Reveal className="order-1">
          <div className="relative">
            <div className="overflow-hidden rounded-sm">
              <img
                src="/images/about.png"
                alt="Travellers admiring a mountain and lake vista from a luxury lodge terrace"
                className="h-[26rem] w-full object-cover lg:h-[34rem]"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-3 hidden rounded-sm border border-border/70 bg-card p-6 shadow-xl sm:block lg:-right-8">
              <p className="font-serif text-4xl text-primary">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Years of crafting journeys</p>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal className="order-2" delay={120}>
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-foreground/70">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            About Us
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-balance text-primary sm:text-4xl md:text-5xl">
            Thoughtful travel, expertly arranged
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground">
            At Roam &amp; Relax Holidays, we believe the best journeys are the ones you never have to
            worry about. For over a decade, our specialists have designed seamless, luxurious
            holidays across the globe — pairing genuine local expertise with the personal care of a
            team that treats every trip as its own.
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl text-primary sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
