'use client'

import React, { useEffect } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useEnquiry } from './enquiry-context'
import { EnquiryFormFields } from './enquiry-form-fields'
import { useEnquiryForm } from '@/hooks/use-enquiry-form'

export function EnquiryModal() {
  const { isOpen, selectedPackage, closeEnquiry } = useEnquiry()

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
  } = useEnquiryForm({ initialDestination: selectedPackage })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      resetForm()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, resetForm])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div
        className="fixed inset-0 bg-primary/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={closeEnquiry}
      />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-md border border-border/80 bg-card p-6 shadow-2xl sm:p-8 md:p-10 animate-fade-up">
        <button
          type="button"
          onClick={closeEnquiry}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-white"
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
              <CheckCircle className="h-10 w-10 text-accent-foreground" />
            </div>
            <h3 className="mt-6 font-serif text-3xl text-primary sm:text-4xl">Enquiry Received!</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">
              Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. Our travel specialist will contact you shortly to plan your custom journey.
            </p>
            <button
              type="button"
              onClick={closeEnquiry}
              className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:brightness-105"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center sm:text-left">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-accent-foreground/70">
                Plan Your Trip
              </span>
              <h2 className="mt-1 font-serif text-2xl text-primary sm:text-3xl">
                Start Your Journey
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us your travel preferences and our specialists will craft your perfect itinerary.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
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
              />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
