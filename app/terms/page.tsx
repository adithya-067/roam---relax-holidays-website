import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export const metadata = {
  title: 'Terms of Service | Roam & Relax Holidays',
  description: 'Terms of service and booking conditions for Roam & Relax Holidays.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-20 sm:px-8">
        <h1 className="font-serif text-4xl text-primary sm:text-5xl">Terms of Service</h1>
        <div className="mt-3 h-1 w-20 bg-accent rounded-full mb-8" />
        
        <div className="space-y-6 text-base leading-relaxed text-foreground/85 font-light">
          <p>
            Welcome to <strong>Roam &amp; Relax Holidays</strong>. By accessing our website and utilizing our travel services, you agree to comply with the following terms and conditions.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">1. Trip Quotations &amp; Bookings</h2>
          <p>
            All trip package prices, room availabilities, and itineraries displayed on our site are subject to confirmation at the time of official booking. Prices may vary depending on seasonal surcharges, resort availability, and custom modifications requested.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">2. Payments &amp; Cancellations</h2>
          <p>
            A deposit is required to confirm bookings for luxury resorts, houseboats, and private transfers. Cancellation policies will be provided in detail in your personalized trip invoice prior to payment.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">3. Travel Insurance &amp; Liability</h2>
          <p>
            We strongly recommend all travellers acquire comprehensive travel insurance covering flight delays, personal belongings, and medical emergencies. Roam &amp; Relax Holidays is not liable for weather disruptions, natural events, or flight cancellations beyond our reasonable control.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">4. Contact Information</h2>
          <p>
            For any clarifications regarding booking terms, please contact our team at <a href="mailto:hello@roamandrelaxholidays.com" className="text-accent-foreground font-medium underline">hello@roamandrelaxholidays.com</a>.
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
