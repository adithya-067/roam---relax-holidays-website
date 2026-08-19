import type { EnquiryFormInput } from './validation'

export type EnquirySubmitResult =
  | { ok: true; id: string; message: string }
  | { ok: false; message: string; errors?: Record<string, string> }

export async function submitEnquiry(data: EnquiryFormInput): Promise<EnquirySubmitResult> {
  const response = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const payload = (await response.json()) as {
    success?: boolean
    message?: string
    id?: string
    errors?: Record<string, string>
  }

  if (!response.ok) {
    return {
      ok: false,
      message: payload.message || 'Unable to submit your enquiry. Please try again.',
      errors: payload.errors,
    }
  }

  return {
    ok: true,
    id: payload.id || '',
    message: payload.message || 'Your enquiry has been received.',
  }
}
