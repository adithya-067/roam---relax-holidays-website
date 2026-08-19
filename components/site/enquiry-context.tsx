'use client'

import React, { createContext, useContext, useState } from 'react'

type EnquiryContextType = {
  isOpen: boolean
  selectedPackage: string
  openEnquiry: (packageName?: string) => void
  closeEnquiry: () => void
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined)

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState('')

  const openEnquiry = (packageName?: string) => {
    if (packageName) {
      setSelectedPackage(packageName)
    }
    setIsOpen(true)
  }

  const closeEnquiry = () => {
    setIsOpen(false)
  }

  return (
    <EnquiryContext.Provider value={{ isOpen, selectedPackage, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export function useEnquiry() {
  const context = useContext(EnquiryContext)
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider')
  }
  return context
}
