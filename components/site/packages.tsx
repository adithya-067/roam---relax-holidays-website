'use client'

import Link from 'next/link'
import { Clock, MapPin, ArrowRight } from 'lucide-react'
import { PACKAGES } from '@/lib/site-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'
import { useEnquiry } from './enquiry-context'

export function Packages() {
  const { openEnquiry } = useEnquiry()

  return (
    <section id="packages" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Featured Journeys"
          title="Curated Indian Packages"
          description="Handpicked itineraries crafted by our travel specialists — luxury stays, private transfers, and unforgettable regional experiences."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={(i % 3) * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border/70 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/packages/${pkg.slug}`} className="relative h-60 overflow-hidden block">
                  <img
                    src={pkg.image || '/placeholder.svg'}
                    alt={`${pkg.name} in ${pkg.destination}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm shadow-sm">
                    <Clock className="h-3.5 w-3.5 text-accent-foreground" />
                    {pkg.duration}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-accent-foreground" />
                    {pkg.destination}
                  </p>
                  <Link href={`/packages/${pkg.slug}`}>
                    <h3 className="mt-2 font-serif text-2xl text-primary transition-colors hover:text-accent-foreground">
                      {pkg.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {pkg.tagline}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/60">
                    <button
                      type="button"
                      onClick={() => openEnquiry(pkg.name)}
                      className="text-xs font-semibold uppercase tracking-wider text-accent-foreground hover:underline"
                    >
                      Enquire Now
                    </button>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="group/btn inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
