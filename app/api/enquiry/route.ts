import { NextRequest, NextResponse } from 'next/server'
import { saveEnquiryToDatabase } from '@/lib/db'
import { sendEnquiryEmailNotification, sendCustomerConfirmationEmail } from '@/lib/email'
import {
  normalizePhone,
  sanitizeForStorage,
  validateEnquiryForm,
  type EnquiryFormInput,
} from '@/lib/validation'

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 },
    )
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 },
    )
  }

  const raw = body as Record<string, unknown>

  // Spam protection: check honeypot
  if (raw.website_hp && typeof raw.website_hp === 'string' && raw.website_hp.trim().length > 0) {
    console.warn('[Spam Detected] Honeypot field was filled.')
    return NextResponse.json({
      success: true,
      message: 'Thank you! Our travel specialist will contact you shortly.',
    })
  }

  const formInput: EnquiryFormInput = {
    name: typeof raw.name === 'string' ? raw.name : '',
    phone: typeof raw.phone === 'string' ? raw.phone : '',
    email: typeof raw.email === 'string' ? raw.email : '',
    destination: typeof raw.destination === 'string' ? raw.destination : '',
    travelDate: typeof raw.travelDate === 'string' ? raw.travelDate : '',
    travellers: typeof raw.travellers === 'string' ? raw.travellers : '',
    message: typeof raw.message === 'string' ? raw.message : '',
    website_hp: typeof raw.website_hp === 'string' ? raw.website_hp : '',
  }

  const errors = validateEnquiryForm(formInput)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please correct the errors in the form.',
        errors,
      },
      { status: 400 },
    )
  }

  const normalizedPhone = normalizePhone(formInput.phone)
  const packageOrDestination = sanitizeForStorage(formInput.destination, 200)

  const enquiry = {
    name: sanitizeForStorage(formInput.name, 100),
    phone: normalizedPhone,
    email: sanitizeForStorage(formInput.email, 254).toLowerCase(),
    destination: packageOrDestination,
    package: packageOrDestination,
    travelDate: formInput.travelDate ? sanitizeForStorage(formInput.travelDate, 20) : '',
    travellers: sanitizeForStorage(formInput.travellers, 100),
    message: sanitizeForStorage(formInput.message, 2000),
  }

  const saveResult = await saveEnquiryToDatabase(enquiry)

  if (!saveResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'We could not save your enquiry. Please try again or contact us directly.',
      },
      { status: 500 },
    )
  }

  const emailResult = await sendEnquiryEmailNotification(enquiry)
  const customerEmailResult = await sendCustomerConfirmationEmail(enquiry)

  if (!emailResult.sent && process.env.RESEND_API_KEY) {
    console.warn('[Enquiry API] Saved but business email failed:', emailResult.message)
  }
  if (!customerEmailResult.sent && process.env.RESEND_API_KEY) {
    console.warn('[Enquiry API] Saved but customer email failed:', customerEmailResult.message)
  }

  return NextResponse.json({
    success: true,
    id: saveResult.id,
    message: 'Thank you! Our travel specialist will contact you shortly.',
    storage: saveResult.source,
    emailSent: emailResult.sent,
  })
}
