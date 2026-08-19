'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, MessageCircle, X, Compass, ChevronDown, Clock, MapPin, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, PACKAGES } from '@/lib/site-data'
import { useEnquiry } from './enquiry-context'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false)
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
  const { openEnquiry } = useEnquiry()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const solid = scrolled || mobileOpen || desktopDropdownOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid
          ? 'border-b border-border/60 bg-background/95 backdrop-blur-md shadow-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border transition-colors',
              solid ? 'border-primary/25 text-primary' : 'border-white/40 text-white',
            )}
          >
            <Compass className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                'font-serif text-xl tracking-tight transition-colors',
                solid ? 'text-primary' : 'text-white',
              )}
            >
              Roam &amp; Relax
            </span>
            <span
              className={cn(
                'text-[0.65rem] font-medium uppercase tracking-[0.4em] transition-colors mt-0.5',
                solid ? 'text-accent-foreground/70' : 'text-white/70',
              )}
            >
              Holidays
            </span>
          </span>
        </Link>

        {/* Desktop links - Increased font size to text-[15px] / text-base for improved readability */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            if (link.label === 'Packages') {
              return (
                <li
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <Link
                    href="/#packages"
                    className={cn(
                      'group/btn flex items-center gap-1.5 text-base font-medium transition-colors py-2 tracking-wide',
                      solid
                        ? 'text-foreground/85 hover:text-primary'
                        : 'text-white/90 hover:text-white',
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-180" />
                    <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover/btn:w-full" />
                  </Link>

                  {/* Desktop Dropdown Menu */}
                  <div
                    className={cn(
                      'absolute top-full left-1/2 -translate-x-1/2 w-[34rem] rounded-md border border-border/80 bg-card p-5 shadow-2xl transition-all duration-300 origin-top',
                      desktopDropdownOpen
                        ? 'opacity-100 scale-100 pointer-events-auto translate-y-2'
                        : 'opacity-0 scale-95 pointer-events-none translate-y-0',
                    )}
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                        <Sparkles className="h-3.5 w-3.5" />
                        Explore Indian Packages
                      </span>
                      <Link
                        href="/#packages"
                        className="text-xs font-medium text-primary hover:text-accent transition-colors"
                        onClick={() => setDesktopDropdownOpen(false)}
                      >
                        View All Packages &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {PACKAGES.map((pkg) => (
                        <Link
                          key={pkg.slug}
                          href={`/packages/${pkg.slug}`}
                          onClick={() => setDesktopDropdownOpen(false)}
                          className="group/item flex items-start gap-3 rounded-md p-2.5 transition-colors hover:bg-secondary"
                        >
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="h-12 w-14 shrink-0 rounded object-cover transition-transform duration-300 group-hover/item:scale-105"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-serif text-sm font-semibold text-primary truncate group-hover/item:text-accent-foreground">
                              {pkg.name}
                            </h4>
                            <p className="flex items-center gap-1 text-[0.7rem] text-muted-foreground mt-0.5">
                              <MapPin className="h-3 w-3 shrink-0 text-accent-foreground" />
                              <span className="truncate">{pkg.destination}</span>
                            </p>
                            <p className="flex items-center gap-1 text-[0.7rem] font-medium text-foreground/75 mt-0.5">
                              <Clock className="h-3 w-3 shrink-0" />
                              {pkg.duration}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'group relative text-base font-medium transition-colors py-2 tracking-wide',
                    solid
                      ? 'text-foreground/85 hover:text-primary'
                      : 'text-white/90 hover:text-white',
                  )}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">




          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden',
              solid ? 'text-primary hover:bg-secondary' : 'text-white hover:bg-white/10',
            )}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'overflow-y-auto border-t border-border/60 bg-background transition-[max-height] duration-500 ease-in-out lg:hidden',
          mobileOpen ? 'max-h-[85vh]' : 'max-h-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4 sm:px-8">
          {NAV_LINKS.map((link) => {
            if (link.label === 'Packages') {
              return (
                <li key={link.label} className="flex flex-col">
                  <div className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary">
                    <Link
                      href="/#packages"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobilePackagesOpen((prev) => !prev)}
                      className="p-1 text-muted-foreground hover:text-primary"
                      aria-label="Toggle packages sub-menu"
                    >
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 transition-transform duration-300',
                          mobilePackagesOpen && 'rotate-180',
                        )}
                      />
                    </button>
                  </div>

                  {/* Mobile Accordion Submenu */}
                  <div
                    className={cn(
                      'overflow-hidden transition-[max-height] duration-300 pl-4 border-l-2 border-accent/40 my-1 space-y-1',
                      mobilePackagesOpen ? 'max-h-[30rem]' : 'max-h-0',
                    )}
                  >
                    {PACKAGES.map((pkg) => (
                      <Link
                        key={pkg.slug}
                        href={`/packages/${pkg.slug}`}
                        onClick={() => {
                          setMobileOpen(false)
                          setMobilePackagesOpen(false)
                        }}
                        className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
                      >
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="h-8 w-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-serif font-medium text-xs text-primary">{pkg.name}</p>
                          <p className="text-[0.65rem] text-muted-foreground">{pkg.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li className="pt-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false)
                openEnquiry()
              }}
              className="block w-full rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground shadow"
            >
              Plan Your Trip
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
