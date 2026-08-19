'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { DESTINATIONS, PACKAGES } from '@/lib/site-data'
import { SectionHeading } from './section-heading'
import { Reveal } from './reveal'

export function Destinations() {
  return (
    <section id="destinations" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Popular Destinations"
          title="Explore Incredible India"
          description="From snow-capped Himalayan peaks to tranquil tropical backwaters, discover India's most breathtaking travel destinations."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest, i) => {
            const matchingPkg = PACKAGES.find((p) =>
              p.destination.toLowerCase().includes(dest.name.toLowerCase())
            )
            const targetHref = matchingPkg ? `/packages/${matchingPkg.slug}` : '/#packages'

            return (
              <Reveal key={dest.name} delay={(i % 3) * 100}>
                <Link
                  href={targetHref}
                  className="group relative block h-80 overflow-hidden rounded-sm"
                >
                  <img
                    src={dest.image || '/placeholder.svg'}
                    alt={`Scenic view of ${dest.name}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent transition-opacity duration-500 group-hover:from-primary" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                    <div>
                      <h3 className="font-serif text-2xl text-white">{dest.name}</h3>
                      <p className="mt-1 max-w-[16rem] translate-y-1 text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        {dest.tagline}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Explore Package
                        <span className="h-px w-5 bg-accent transition-all duration-300 group-hover:w-8" />
                      </span>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
