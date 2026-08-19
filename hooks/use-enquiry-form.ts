'use client'

import { useCallback, useEffect, useState } from 'react'
import { submitEnquiry } from '@/lib/enquiry-client'
import { PACKAGES } from '@/lib/site-data'
import {
  validateDestination,
  validateEmail,
  validateMessage,
  validateName,
  validatePhone,
  validateTravelDate,
  validateTravellers,
  type EnquiryFormInput,
} from '@/lib/validation'

export const DEFAULT_ENQUIRY_FORM: EnquiryFormInput = {
  name: '',
  phone: '',
  email: '',
  destination: '',
  travelDate: '',
  travellers: '2 Travellers',
  message: '',
  website_hp: '',
}

type UseEnquiryFormOptions = {
  initialDestination?: string
  onSuccess?: () => void
}

function resolvePackageName(dest: string): string {
  if (!dest) return ''
  const match = PACKAGES.find(
    (p) =>
      p.name.toLowerCase() === dest.toLowerCase() ||
      p.destination.toLowerCase().includes(dest.toLowerCase()) ||
      dest.toLowerCase().includes(p.destination.toLowerCase()),
  )
  return match ? match.name : dest
}

export function useEnquiryForm({ initialDestination = '', onSuccess }: UseEnquiryFormOptions = {}) {
  const [formData, setFormData] = useState<EnquiryFormInput>({
    ...DEFAULT_ENQUIRY_FORM,
    destination: resolvePackageName(initialDestination),
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [todayIso, setTodayIso] = useState('')

  useEffect(() => {
    setTodayIso(new Date().toISOString().split('T')[0])
  }, [])

  useEffect(() => {
    if (initialDestination) {
      setFormData((prev) => ({ ...prev, destination: resolvePackageName(initialDestination) }))
    }
  }, [initialDestination])

  const resetForm = useCallback(() => {
    setFormData({ ...DEFAULT_ENQUIRY_FORM, destination: resolvePackageName(initialDestination) })
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setSubmitError(null)
    setIsSubmitting(false)
  }, [initialDestination])

  const validateField = useCallback((field: keyof EnquiryFormInput, value: string) => {
    let err: string | null = null
    switch (field) {
      case 'name':
        err = validateName(value)
        break
      case 'phone':
        err = validatePhone(value)
        break
      case 'email':
        err = validateEmail(value)
        break
      case 'travelDate':
        err = validateTravelDate(value)
        break
      case 'travellers':
        err = validateTravellers(value)
        break
      case 'message':
        err = validateMessage(value)
        break
      case 'destination':
        err = validateDestination(value)
        break
    }

    setErrors((prev) => {
      const updated = { ...prev }
      if (err) {
        updated[field] = err
      } else {
        delete updated[field]
      }
      return updated
    })
    return err
  }, [])

  const handleBlur = useCallback(
    (field: keyof EnquiryFormInput) => {
      setTouched((prev) => ({ ...prev, [field]: true }))
      validateField(field, formData[field] || '')
    },
    [formData, validateField],
  )

  const updateField = useCallback(
    (field: keyof EnquiryFormInput, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (touched[field]) {
        validateField(field, value)
      }
    },
    [touched, validateField],
  )

  const handleNameChange = useCallback(
    (value: string) => {
      updateField('name', value.replace(/[^a-zA-Z\s'.-]/g, ''))
    },
    [updateField],
  )

  const handlePhoneChange = useCallback(
    (value: string) => {
      updateField('phone', value.replace(/[^\d+\s\-()]/g, ''))
    },
    [updateField],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (isSubmitting) return

      const fields: (keyof EnquiryFormInput)[] = [
        'name',
        'phone',
        'email',
        'travelDate',
        'travellers',
        'message',
        'destination',
      ]

      const newErrors: Record<string, string> = {}
      for (const field of fields) {
        const err = validateField(field, formData[field] || '')
        if (err) newErrors[field] = err
      }

      setErrors(newErrors)
      setTouched({
        name: true,
        phone: true,
        email: true,
        travelDate: true,
        travellers: true,
        message: true,
        destination: true,
      })

      if (Object.keys(newErrors).length > 0) {
        return
      }

      setIsSubmitting(true)
      setSubmitError(null)

      const result = await submitEnquiry(formData)

      if (!result.ok) {
        setSubmitError(result.message)
        if (result.errors) {
          setErrors((prev) => ({ ...prev, ...result.errors }))
        }
        setIsSubmitting(false)
        return
      }

      setSubmitted(true)
      setIsSubmitting(false)
      onSuccess?.()
    },
    [formData, isSubmitting, onSuccess, validateField],
  )

  return {
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
    setFormData,
  }
}
