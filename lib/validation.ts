/**
 * Input validation helpers for Roam & Relax Holidays forms.
 * Used on both client and server.
 */

export const TRAVELLER_OPTIONS = [
  '1 Traveller',
  '2 Travellers',
  '3-5 Travellers',
  '6+ Travellers',
] as const

export type EnquiryFormInput = {
  name: string
  phone: string
  email: string
  destination: string
  travelDate: string
  travellers: string
  message: string
  website_hp?: string
}

export type EnquiryValidationErrors = Partial<Record<keyof EnquiryFormInput, string>>

/** Strip to digits only; optional leading 91 for Indian country code. */
export function normalizePhone(phone: string): string {
  const trimmed = phone.trim()
  const digitsOnly = trimmed.replace(/\D/g, '')
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2)
  }
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return digitsOnly.slice(1)
  }
  return digitsOnly
}

export function validateName(name: string): string | null {
  const trimmed = name.trim()
  if (!trimmed) {
    return 'Full name is required'
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters long'
  }
  if (trimmed.length > 100) {
    return 'Name must be 100 characters or fewer'
  }
  const nameRegex = /^[a-zA-Z\s'.-]+$/
  if (!nameRegex.test(trimmed)) {
    return 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'
  }
  if (/\d/.test(trimmed)) {
    return 'Name cannot contain numbers'
  }
  return null
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim()
  if (!trimmed) {
    return 'Phone number is required'
  }
  if (/[a-zA-Z]/.test(trimmed)) {
    return 'Phone number cannot contain letters'
  }
  const cleaned = normalizePhone(trimmed)
  if (cleaned.length !== 10) {
    return 'Phone number must be exactly 10 digits'
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9'
  }
  return null
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) {
    return 'Email address is required'
  }
  if (trimmed.length > 254) {
    return 'Email address is too long'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address'
  }
  return null
}

export function validateTravelDate(dateStr: string): string | null {
  if (!dateStr) {
    return null
  }
  const selectedDate = new Date(dateStr)
  if (isNaN(selectedDate.getTime())) {
    return 'Please select a valid date'
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (selectedDate < today) {
    return 'Travel date cannot be in the past'
  }
  return null
}

export function validateTravellers(travellers: string): string | null {
  const trimmed = travellers.trim()
  if (!trimmed) {
    return 'Please select number of travellers'
  }
  if (!TRAVELLER_OPTIONS.includes(trimmed as (typeof TRAVELLER_OPTIONS)[number])) {
    return 'Please select a valid number of travellers'
  }
  return null
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) {
    return null
  }
  if (message.trim().length > 2000) {
    return 'Message must be 2000 characters or fewer'
  }
  return null
}

export function validateDestination(destination: string): string | null {
  if (!destination.trim()) {
    return null
  }
  if (destination.trim().length > 200) {
    return 'Destination selection is too long'
  }
  return null
}

export function validateEnquiryForm(data: EnquiryFormInput): EnquiryValidationErrors {
  const errors: EnquiryValidationErrors = {}

  const nameErr = validateName(data.name)
  if (nameErr) errors.name = nameErr

  const phoneErr = validatePhone(data.phone)
  if (phoneErr) errors.phone = phoneErr

  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr

  const dateErr = validateTravelDate(data.travelDate)
  if (dateErr) errors.travelDate = dateErr

  const travellersErr = validateTravellers(data.travellers)
  if (travellersErr) errors.travellers = travellersErr

  const messageErr = validateMessage(data.message)
  if (messageErr) errors.message = messageErr

  const destinationErr = validateDestination(data.destination)
  if (destinationErr) errors.destination = destinationErr

  return errors
}

/** Trim and remove control characters for safe database storage. */
export function sanitizeForStorage(str: string, maxLength = 2000): string {
  if (!str) return ''
  return str
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength)
}

/** Escape HTML entities for safe inclusion in email templates. */
export function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/** @deprecated Use sanitizeForStorage on server and escapeHtml in emails. */
export function sanitizeInput(str: string): string {
  return sanitizeForStorage(str)
}
