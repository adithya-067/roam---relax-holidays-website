import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Destinations } from '@/components/site/destinations'
import { Packages } from '@/components/site/packages'
import { Experiences } from '@/components/site/experiences'
import { About } from '@/components/site/about'
import { Offers } from '@/components/site/offers'
import { Testimonials } from '@/components/site/testimonials'
import { FinalCta } from '@/components/site/final-cta'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Packages />
        <Experiences />
        <About />
        <Offers />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
