import { Navbar } from '@/components/site/navbar'
import { Packages } from '@/components/site/packages'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export const metadata = {
  title: 'All Tour Packages | Roam & Relax Holidays',
  description: 'Explore our handpicked Indian tour packages including Goa, Kerala, Kashmir, Rajasthan, Himachal Pradesh, and Andaman Islands.',
}

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <Packages />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
