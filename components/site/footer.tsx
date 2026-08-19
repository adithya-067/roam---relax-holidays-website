'use client'

import Link from 'next/link'
import { Compass, Phone, Mail, MapPin } from 'lucide-react'
import { DESTINATIONS, CONTACT_CONFIG } from '@/lib/site-data'
import { InstagramIcon, FacebookIcon, XIcon, YoutubeIcon, WhatsappIcon } from './social-icons'

const QUICK_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Packages', href: '/#packages' },
  { label: 'Services', href: '/#experiences' },
  { label: 'Contact', href: '/#contact' },
]

function isValidUrl(url: string | null): url is string {
  return !!url && (url.startsWith('http://') || url.startsWith('https://'))
}

export function Footer() {
  const whatsappUrl = CONTACT_CONFIG.whatsapp
    ? `https://wa.me/${CONTACT_CONFIG.whatsapp}?text=Hi Roam & Relax Holidays, I'm interested in planning a trip. Please share the available packages and details.`
    : null

  const socials = [
    { label: 'Instagram', icon: InstagramIcon, href: CONTACT_CONFIG.socials.instagram },
    { label: 'WhatsApp', icon: WhatsappIcon, href: whatsappUrl },
    { label: 'Facebook', icon: FacebookIcon, href: CONTACT_CONFIG.socials.facebook },
    { label: 'Twitter', icon: XIcon, href: CONTACT_CONFIG.socials.twitter },
    { label: 'YouTube', icon: YoutubeIcon, href: CONTACT_CONFIG.socials.youtube },
  ]
    .filter((s) => isValidUrl(s.href))
    .map((s) => ({ ...s, href: s.href! }))

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
                <Compass className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg">Roam &amp; Relax</span>
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/60">
                  Holidays
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Thoughtfully planned, luxurious holidays across India. Your journey, our expertise
              — every step of the way.
            </p>
            {socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <s.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Destinations
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {DESTINATIONS.map((d) => (
                <li key={d.name}>
                  <Link
                    href="/#packages"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-white/70">
              {CONTACT_CONFIG.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{CONTACT_CONFIG.address}</span>
                </li>
              )}
              {CONTACT_CONFIG.phone && (
                <li>
                  <a
                    href={`tel:${CONTACT_CONFIG.phoneFormatted}`}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-accent" />
                    {CONTACT_CONFIG.phone}
                  </a>
                </li>
              )}
              {CONTACT_CONFIG.whatsapp && (
                <li>
                  <a
                    href={whatsappUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <WhatsappIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                    <span>WhatsApp Chat</span>
                  </a>
                </li>
              )}
              {CONTACT_CONFIG.email && (
                <li>
                  <a
                    href={`mailto:${CONTACT_CONFIG.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-accent" />
                    {CONTACT_CONFIG.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Roam &amp; Relax Holidays. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
