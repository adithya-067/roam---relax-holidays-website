import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { EnquiryProvider } from '@/components/site/enquiry-context'
import { EnquiryModal } from '@/components/site/enquiry-modal'
import { WelcomePopup } from '@/components/site/welcome-popup'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Roam & Relax Holidays | Luxury Tours & Bespoke Travel',
  description:
    'Discover unforgettable Indian destinations and thoughtfully planned holidays with Roam & Relax Holidays. Your journey, our expertise.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#16233f',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <EnquiryProvider>
          {children}
          <EnquiryModal />
          <WelcomePopup />
        </EnquiryProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
