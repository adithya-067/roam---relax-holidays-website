import { Resend } from 'resend'
import { CONTACT_CONFIG } from './site-data'
import { EnquiryRecord } from './db'
import { escapeHtml } from './validation'

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function sendEnquiryEmailNotification(enquiry: EnquiryRecord): Promise<{ sent: boolean; message: string }> {
  const recipientEmail = process.env.BUSINESS_EMAIL || CONTACT_CONFIG.email || 'bookings@roamandrelaxholidays.com'
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Roam & Relax Enquiries <onboarding@resend.dev>'

  const safeName = escapeHtml(enquiry.name)
  const safePhone = escapeHtml(enquiry.phone)
  const safeEmail = escapeHtml(enquiry.email)
  const safePackage = escapeHtml(enquiry.package || enquiry.destination || 'General Enquiry')
  const safeTravelDate = escapeHtml(enquiry.travelDate || 'Flexible')
  const safeTravellers = escapeHtml(enquiry.travellers || '2 Travellers')
  const safeMessage = escapeHtml(enquiry.message || 'No special requirements provided.')

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #16233f;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background-color: #16233f; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; font-family: Georgia, serif; margin: 0; font-size: 22px;">Roam & Relax Holidays</h1>
          <p style="color: #bd9b60; text-transform: uppercase; letter-spacing: 2px; font-size: 11px; margin-top: 4px;">New Customer Enquiry</p>
        </div>
        
        <div style="padding: 24px;">
          <h2 style="font-size: 18px; color: #16233f; border-bottom: 2px solid #bd9b60; padding-bottom: 8px; margin-top: 0;">
            Customer Trip Details
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #555;">Full Name:</td>
              <td style="padding: 8px 0; color: #16233f;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td>
              <td style="padding: 8px 0; color: #16233f;"><a href="tel:${safePhone}" style="color: #bd9b60;">${safePhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
              <td style="padding: 8px 0; color: #16233f;"><a href="mailto:${safeEmail}" style="color: #bd9b60;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Package / Destination:</td>
              <td style="padding: 8px 0; color: #16233f; font-weight: bold;">${safePackage}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Travel Date:</td>
              <td style="padding: 8px 0; color: #16233f;">${safeTravelDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Travellers:</td>
              <td style="padding: 8px 0; color: #16233f;">${safeTravellers}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background-color: #f8f9fa; border-left: 4px solid #bd9b60; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; font-size: 13px; color: #555;">Customer Message:</p>
            <p style="margin-top: 6px; font-size: 14px; line-height: 1.5; color: #16233f; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>

        <div style="background-color: #f4f6f8; padding: 16px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0;">
          Sent automatically by Roam & Relax Holidays Booking Engine
        </div>
      </div>
    </div>
  `

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: `New Trip Enquiry: ${enquiry.name} (${enquiry.package || enquiry.destination || 'India Tour'})`,
        html: htmlContent,
      })

      if (error) {
        console.error('[Email Notification Error]', error)
        return { sent: false, message: error.message }
      }

      console.log('[Email Notification Sent] Message ID:', data?.id)
      return { sent: true, message: `Email notification sent to ${recipientEmail}` }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Email dispatch failed'
      console.error('[Email Notification Exception]', err)
      return { sent: false, message }
    }
  }

  console.log('====================================================')
  console.log('[NOTIFICATION LOG - RESEND_API_KEY NOT SET]')
  console.log(`TO: ${recipientEmail}`)
  console.log(`SUBJECT: New Trip Enquiry: ${enquiry.name}`)
  console.log(`CUSTOMER: ${enquiry.name} | Phone: ${enquiry.phone} | Email: ${enquiry.email}`)
  console.log(`PACKAGE: ${enquiry.package || enquiry.destination}`)
  console.log(`TRAVEL DATE: ${enquiry.travelDate} | TRAVELLERS: ${enquiry.travellers}`)
  console.log(`MESSAGE: ${enquiry.message}`)
  console.log('====================================================')

  return { sent: true, message: 'Logged to server console (Resend API key missing)' }
}

export async function sendCustomerConfirmationEmail(enquiry: EnquiryRecord): Promise<{ sent: boolean; message: string }> {
  if (!enquiry.email) {
    return { sent: false, message: 'No customer email provided' }
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Roam & Relax Holidays <onboarding@resend.dev>'
  const safeName = escapeHtml(enquiry.name)
  const safePackage = escapeHtml(enquiry.package || enquiry.destination || 'Luxury Tour')

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px; color: #16233f;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background-color: #16233f; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; font-family: Georgia, serif; margin: 0; font-size: 22px;">Roam & Relax Holidays</h1>
          <p style="color: #bd9b60; text-transform: uppercase; letter-spacing: 2px; font-size: 11px; margin-top: 4px;">Enquiry Received</p>
        </div>
        
        <div style="padding: 28px;">
          <h2 style="font-size: 18px; color: #16233f; margin-top: 0;">Dear ${safeName},</h2>
          <p style="font-size: 15px; leading: 1.6; color: #333333;">
            Thank you for reaching out to <strong>Roam & Relax Holidays</strong>! We have received your trip enquiry for <strong>${safePackage}</strong>.
          </p>
          <p style="font-size: 14px; leading: 1.6; color: #555555;">
            Our travel specialists are currently reviewing your preferences and will get in touch with you shortly to assist with your custom itinerary.
          </p>

          <div style="margin-top: 24px; padding: 16px; background-color: #f8f9fa; border-left: 4px solid #bd9b60; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #666666;">Need immediate assistance?</p>
            <p style="margin-top: 4px; font-size: 14px; font-weight: bold; color: #16233f;">
              Call/WhatsApp us: <a href="tel:+919901330330" style="color: #bd9b60; text-decoration: none;">+91 9901 330 330</a>
            </p>
          </div>
        </div>

        <div style="background-color: #f4f6f8; padding: 16px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e0e0e0;">
          &copy; ${new Date().getFullYear()} Roam & Relax Holidays. All rights reserved.
        </div>
      </div>
    </div>
  `

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: enquiry.email,
        subject: `Your Trip Enquiry with Roam & Relax Holidays: ${safePackage}`,
        html: htmlContent,
      })

      if (error) {
        console.error('[Customer Email Error]', error)
        return { sent: false, message: error.message }
      }

      console.log('[Customer Email Sent] Message ID:', data?.id)
      return { sent: true, message: `Confirmation email sent to ${enquiry.email}` }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Customer email dispatch failed'
      console.error('[Customer Email Exception]', err)
      return { sent: false, message }
    }
  }

  console.log(`[CUSTOMER CONFIRMATION LOG] Would send to: ${enquiry.email}`)
  return { sent: true, message: 'Customer email logged (Resend API key missing)' }
}

