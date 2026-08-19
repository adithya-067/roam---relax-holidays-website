'use client'

import { ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'
import { useEnquiry } from './enquiry-context'

export function FinalCta() {
  const { openEnquiry } = useEnquiry()

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/cta.png"
          alt="Winding coastal road along dramatic cliffs at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal className="flex flex-col items-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Start Planning
          </span>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-balance text-white sm:text-5xl md:text-6xl">
            Ready for Your Next Escape?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pretty text-white/85">
            Tell us where you dream of going in India, and our specialists will craft a journey made entirely
            for you.
          </p>
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-accent-foreground shadow-xl transition-all duration-300 hover:brightness-105"
          >
            Plan Your Trip
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
