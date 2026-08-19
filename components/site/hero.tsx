'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEnquiry } from './enquiry-context'

export function Hero() {
  const { openEnquiry } = useEnquiry()

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Aerial view of a dramatic tropical coastline at golden hour"
          className="h-full w-full object-cover"
        />
        {/* Dark overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <div className="max-w-3xl">
          <p className="animate-fade-up flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-accent [animation-delay:100ms]">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Bespoke Indian Journeys
          </p>

          <h1 className="animate-fade-up mt-6 font-serif text-4xl leading-[1.05] text-balance text-white [animation-delay:200ms] sm:text-6xl lg:text-7xl">
            Your Journey.
            <br />
            <span className="text-accent">Our Expertise.</span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/85 [animation-delay:350ms]">
            Discover unforgettable Indian destinations and thoughtfully planned holidays with Roam &amp;
            Relax Holidays.
          </p>

          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center [animation-delay:500ms]">
            <Link
              href="/#packages"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-105 hover:shadow-xl"
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <Link
        href="/#destinations"
        aria-label="Scroll to destinations"
        className="animate-fade-in absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white [animation-delay:900ms] md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </Link>
    </section>
  )
}
