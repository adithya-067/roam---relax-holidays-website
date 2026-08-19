'use client'

import { MessageCircle } from 'lucide-react'
import { CONTACT_CONFIG } from '@/lib/site-data'

export function WhatsAppButton() {
  const whatsappNum = CONTACT_CONFIG.whatsapp || '919876543210'

  return (
    <a
      href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hi Roam & Relax Holidays, I'm interested in planning a trip. Please share the available packages and details.")}`} target="_blank"
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
