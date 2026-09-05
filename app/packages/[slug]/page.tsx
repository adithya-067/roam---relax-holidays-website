import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, MapPin, Check, X, Calendar, ArrowLeft, Send, Sparkles, Shield, ChevronRight } from 'lucide-react'
import { PACKAGES } from '@/lib/site-data'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal } from '@/components/site/reveal'
import { PackageDetailCta } from '@/components/site/package-detail-cta'

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    slug: pkg.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = PACKAGES.find((p) => p.slug === slug)
  if (!pkg) return { title: 'Package Not Found' }
  return {
    title: `${pkg.name} | Roam & Relax Holidays`,
    description: pkg.overview,
  }
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = PACKAGES.find((p) => p.slug === slug)

  if (!pkg) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Package Hero */}
      <section className="relative flex min-h-[60vh] sm:min-h-[70vh] items-end overflow-hidden pb-12 pt-32">
        <div className="absolute inset-0">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Link
            href="/#packages"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-widest text-accent mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-accent-foreground backdrop-blur-sm">
                <MapPin className="h-3.5 w-3.5" />
                {pkg.destination}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-white backdrop-blur-sm">
                <Clock className="h-3.5 w-3.5" />
                {pkg.duration}
              </span>
            </div>

            <h1 className="font-serif text-4xl text-white sm:text-5xl md:text-6xl">
              {pkg.name}
            </h1>
            <p className="mt-3 text-lg text-white/85 font-light sm:text-xl">
              {pkg.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <PackageDetailCta packageName={pkg.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Quick Highlights */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview & Highlights */}
              <Reveal>
                <h2 className="font-serif text-3xl text-primary">Package Overview</h2>
                <div className="mt-4 h-1 w-16 bg-accent rounded-full" />
                <p className="mt-6 text-base leading-relaxed text-foreground/85 sm:text-lg">
                  {pkg.overview}
                </p>






                {/* Value Badges */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 rounded-md border border-border/80 bg-card p-4">
                    <Sparkles className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-primary">Tailor-Made</h4>
                      <p className="text-xs text-muted-foreground">Customizable Itinerary</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-border/80 bg-card p-4">
                    <Shield className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-primary">Luxury Stays</h4>
                      <p className="text-xs text-muted-foreground">Handpicked 4-5★ Resorts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border border-border/80 bg-card p-4">
                    <Calendar className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase text-primary">Flexible Dates</h4>
                      <p className="text-xs text-muted-foreground">Year-Round Booking</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <section className="mt-16">
                  <h2 className="font-serif text-3xl text-primary">
                    About the Trip
                  </h2>

                  <div className="mt-4 h-1 w-16 bg-accent rounded-full" />

                  <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Experience an unforgettable holiday with a trip thoughtfully planned
                      around your preferences. Enjoy a comfortable and memorable getaway
                      while we take care of the planning.
                    </p>

                    <p>
                      Whether you're travelling with family, friends or as a couple, we'll
                      help create a holiday that suits your dates, preferences and travel
                      style.
                    </p>
                  </div>

                  <div className="mt-12">
                    <h2 className="font-serif text-3xl text-primary">
                      Why Choose This Trip?
                    </h2>

                    <div className="mt-4 h-1 w-16 bg-accent rounded-full" />

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-md border border-border/70 bg-card p-5">
                        <h3 className="font-serif text-xl text-primary">
                          Personalized Planning
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Your holiday can be tailored around your preferences and travel
                          dates.
                        </p>
                      </div>

                      <div className="rounded-md border border-border/70 bg-card p-5">
                        <h3 className="font-serif text-xl text-primary">
                          Comfortable Stay Options
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Choose accommodation options that suit your needs and budget.
                        </p>
                      </div>

                      <div className="rounded-md border border-border/70 bg-card p-5">
                        <h3 className="font-serif text-xl text-primary">
                          Flexible Travel
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Plan your getaway around what works best for you.
                        </p>
                      </div>

                      <div className="rounded-md border border-border/70 bg-card p-5">
                        <h3 className="font-serif text-xl text-primary">
                          Personal Assistance
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Our team is here to help you plan your perfect getaway.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 rounded-md border border-border/70 bg-card p-8 text-center">
                    <h2 className="font-serif text-3xl text-primary">
                      Interested in This Trip?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                      Want the complete itinerary and personalized pricing? Contact us and
                      we'll help plan your perfect getaway.
                    </p>

                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                      <a
                        href="/#contact"
                        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                      >
                        Contact Us
                      </a>

                      <a
                        href="https://wa.me/919743233663"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-primary transition hover:bg-secondary"
                      >
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </section>
              </Reveal>


              {/* Important Information */}
              <Reveal delay={180}>
                <h2 className="font-serif text-3xl text-primary">Important Information & Notes</h2>
                <div className="mt-4 h-1 w-16 bg-accent rounded-full mb-6" />
                <div className="rounded-md border border-border/80 bg-card p-6 text-sm space-y-3 text-muted-foreground">
                  <p><strong className="text-foreground">Customization:</strong> All itineraries can be fully customized based on your preferred travel dates, hotel choices, and specific flight schedules.</p>
                  <p><strong className="text-foreground">Transfers:</strong> Private chauffeur-driven vehicle provided throughout the journey for seamless comfort.</p>
                  <p><strong className="text-foreground">Support:</strong> 24/7 dedicated Roam &amp; Relax travel concierge helpline available during your trip.</p>
                </div>
              </Reveal>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-md border border-border/80 bg-card p-6 shadow-xl">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    Bespoke Journey
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-primary">Plan This Package</h3>
                  <div className="mt-3 inline-block rounded-md bg-accent/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    Contact us for a personalised quote
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Interested in <span className="font-medium text-foreground">{pkg.name}</span>? Speak with our trip specialists to customize your itinerary and dates.
                  </p>

                  <div className="mt-6 space-y-3 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Destination:</span>
                      <span className="font-medium text-foreground">{pkg.destination}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium text-foreground">{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <PackageDetailCta packageName={pkg.name} fullWidth />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
