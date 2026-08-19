'use client'

import { MessageCircle } from 'lucide-react'
import { CONTACT_CONFIG } from '@/lib/site-data'

export function WhatsAppButton() {
  const whatsappNum = CONTACT_CONFIG.whatsapp || '919876543210'

  return (
    <a
      href={`https://wa.me/${whatsappNum}?text=Hi%20Roam%20%26%20Relax%2C%20I%27d%20like%20to%20plan%20a%20trip.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-all duration-300 hover:pr-5 hover:shadow-xl"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[8rem] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  )
}
