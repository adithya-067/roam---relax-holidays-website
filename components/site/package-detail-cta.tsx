'use client'

import React from 'react'
import { Send } from 'lucide-react'
import { useEnquiry } from './enquiry-context'
import { cn } from '@/lib/utils'

export function PackageDetailCta({
  packageName,
  fullWidth = false,
}: {
  packageName: string
  fullWidth?: boolean
}) {
  const { openEnquiry } = useEnquiry()

  return (
    <button
      type="button"
      onClick={() => openEnquiry(packageName)}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-105 hover:shadow-xl',
        fullWidth && 'w-full',
      )}
    >
      Enquire About This Package
      <Send className="h-4 w-4" />
    </button>
  )
}
