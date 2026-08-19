'use client'

import React, { useEffect, useState } from 'react'
import { X, CheckCircle, Compass } from 'lucide-react'
import { EnquiryFormFields } from './enquiry-form-fields'
import { useEnquiryForm } from '@/hooks/use-enquiry-form'

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    formData,
    errors,
    touched,
    submitted,
    isSubmitting,
    submitError,
    todayIso,
    resetForm,
    handleBlur,
    updateField,
    handleNameChange,
    handlePhoneChange,
    handleSubmit,
  } = useEnquiryForm()

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('hasSeenWelcomePopup')
      if (!hasSeen) {
        const timer = setTimeout(() => {
          setIsOpen(true)
          sessionStorage.setItem('hasSeenWelcomePopup', 'true')
        }, 3000)
        return () => clearTimeout(timer)
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    resetForm()
    try {
      sessionStorage.setItem('hasSeenWelcomePopup', 'true')
    } catch {
      // ignore
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg border border-border/80 bg-card p-6 shadow-2xl sm:p-8 animate-fade-up">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-white"
          aria-label="Close welcome popup"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
              <CheckCircle className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="mt-4 font-serif text-2xl text-primary sm:text-3xl">Plan Request Received!</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Our travel specialists will craft a bespoke plan for your getaway.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-full bg-accent px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-105"
            >
              Explore Website
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 text-accent-foreground">
                <Compass className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent-foreground">
                Welcome to Roam &amp; Relax
              </span>
            </div>

            <h2 className="font-serif text-2xl text-primary sm:text-3xl">
              Plan Your Perfect Getaway
            </h2>
            <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm leading-relaxed">
              Tell us a little about your travel plans and our team will help you create the right holiday.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3.5" noValidate>
              <EnquiryFormFields
                formData={formData}
                errors={errors}
                touched={touched}
                todayIso={todayIso}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onBlur={handleBlur}
                onNameChange={handleNameChange}
                onPhoneChange={handlePhoneChange}
                onFieldChange={updateField}
                size="compact"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
