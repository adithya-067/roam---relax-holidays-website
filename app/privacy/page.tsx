import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

export const metadata = {
  title: 'Privacy Policy | Roam & Relax Holidays',
  description: 'Privacy Policy and data protection terms for Roam & Relax Holidays.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-20 sm:px-8">
        <h1 className="font-serif text-4xl text-primary sm:text-5xl">Privacy Policy</h1>
        <div className="mt-3 h-1 w-20 bg-accent rounded-full mb-8" />

        <div className="space-y-6 text-base leading-relaxed text-foreground/85 font-light">
          <p>
            At <strong>Roam &amp; Relax Holidays</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or inquire about our holiday packages.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">1. Information We Collect</h2>
          <p>
            When you fill out our trip enquiry forms or contact us directly, we may collect personal information including your full name, phone number, email address, travel dates, preferred destinations, and specific trip preferences.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To design, personalize, and quote bespoke travel itineraries tailored to your preferences.</li>
            <li>To communicate with you regarding your trip booking and provide ongoing customer support.</li>
            <li>To send relevant travel updates, confirmation emails, and customer care notifications.</li>
          </ul>

          <h2 className="font-serif text-2xl text-primary mt-8">3. Data Protection &amp; Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information to third parties. Information is shared only with vetted travel partners (e.g. hotel resorts, private transport drivers) as strictly necessary to fulfill your booked itinerary.
          </p>

          <h2 className="font-serif text-2xl text-primary mt-8">4. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:bookings@roamandrelaxholidays.com" className="text-accent-foreground font-medium underline">bookings@roamandrelaxholidays.com</a> or call us at +91 9901 330 330.
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
