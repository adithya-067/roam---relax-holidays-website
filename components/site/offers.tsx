'use client'

import { ArrowRight } from 'lucide-react'
import { Reveal } from './reveal'
import { useEnquiry } from './enquiry-context'

export function Offers() {
  const { openEnquiry } = useEnquiry()

  return (
    <section className="bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src="/images/offers.png"
            alt="Tropical beach resort at sunset"
            className="h-[28rem] w-full object-cover sm:h-[24rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <Reveal className="max-w-xl px-6 py-10 sm:px-12">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Bespoke Planning
              </span>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-balance text-white sm:text-4xl md:text-5xl">
                Your Dream Holiday Starts Here
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">
                Handcrafted itineraries for couples, families, and solo travellers across India. Speak with a specialist today.
              </p>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-105"
              >
                Plan Your Escapes
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
