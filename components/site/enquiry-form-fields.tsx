'use client'

import {
  Calendar,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
} from 'lucide-react'
import { PACKAGES } from '@/lib/site-data'
import type { EnquiryFormInput } from '@/lib/validation'
import { cn } from '@/lib/utils'

type EnquiryFormFieldsProps = {
  formData: EnquiryFormInput
  errors: Record<string, string>
  touched: Record<string, boolean>
  todayIso: string
  isSubmitting: boolean
  submitError: string | null
  onBlur: (field: keyof EnquiryFormInput) => void
  onNameChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onFieldChange: (field: keyof EnquiryFormInput, value: string) => void
  size?: 'default' | 'compact'
  submitLabel?: string
}

export function EnquiryFormFields({
  formData,
  errors,
  touched,
  todayIso,
  isSubmitting,
  submitError,
  onBlur,
  onNameChange,
  onPhoneChange,
  onFieldChange,
  size = 'default',
  submitLabel = 'Send Enquiry',
}: EnquiryFormFieldsProps) {
  const compact = size === 'compact'
  const labelClass = compact
    ? 'block text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground'
    : 'block text-xs font-medium uppercase tracking-wider text-muted-foreground'
  const inputClass = compact ? 'py-2 pl-9 pr-3 text-xs' : 'py-2.5 pl-10 pr-3 text-sm'
  const iconClass = compact ? 'h-3.5 w-3.5' : 'h-4 w-4'
  const iconLeft = compact ? 'left-3' : 'left-3'
  const gapClass = compact ? 'gap-3.5 space-y-3.5' : 'gap-4 space-y-4'

  const fieldClass = (field: keyof EnquiryFormInput) =>
    cn(
      `w-full rounded-sm border bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 ${inputClass}`,
      errors[field] && touched[field]
        ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
        : 'border-border focus:border-accent focus:ring-accent',
    )

  return (
    <>
      <div className={cn('grid grid-cols-1 sm:grid-cols-2', gapClass.split(' ')[0])}>
        <div>
          <label className={labelClass}>
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <User className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onBlur={() => onBlur('name')}
              onChange={(e) => onNameChange(e.target.value)}
              disabled={isSubmitting}
              className={fieldClass('name')}
            />
          </div>
          {errors.name && touched.name && (
            <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <Phone className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <input
              type="tel"
              inputMode="numeric"
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onBlur={() => onBlur('phone')}
              onChange={(e) => onPhoneChange(e.target.value)}
              disabled={isSubmitting}
              maxLength={14}
              className={fieldClass('phone')}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={cn('grid grid-cols-1 sm:grid-cols-2', gapClass.split(' ')[0])}>
        <div>
          <label className={labelClass}>
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <Mail className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <input
              type="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onBlur={() => onBlur('email')}
              onChange={(e) => onFieldChange('email', e.target.value)}
              disabled={isSubmitting}
              className={fieldClass('email')}
            />
          </div>
          {errors.email && touched.email && (
            <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Destination / Package</label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <MapPin className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <select
              value={formData.destination}
              onChange={(e) => onFieldChange('destination', e.target.value)}
              disabled={isSubmitting}
              className={fieldClass('destination')}
            >
              <option value="">Select a Package or Destination</option>
              {PACKAGES.map((pkg) => (
                <option key={pkg.slug} value={pkg.name}>
                  {pkg.name} ({pkg.destination})
                </option>
              ))}
              <option value="Custom Tour">Custom / Tailor-made Tour</option>
            </select>
          </div>
        </div>
      </div>

      <div className={cn('grid grid-cols-1 sm:grid-cols-2', gapClass.split(' ')[0])}>
        <div>
          <label className={labelClass}>Approximate Travel Date</label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <Calendar className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <input
              type="date"
              min={todayIso}
              value={formData.travelDate}
              onBlur={() => onBlur('travelDate')}
              onChange={(e) => onFieldChange('travelDate', e.target.value)}
              disabled={isSubmitting}
              className={fieldClass('travelDate')}
            />
          </div>
          {errors.travelDate && touched.travelDate && (
            <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
              {errors.travelDate}
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>Number of Travellers</label>
          <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
            <Users className={cn('absolute top-1/2 -translate-y-1/2 text-muted-foreground', iconClass, iconLeft)} />
            <select
              value={formData.travellers}
              onChange={(e) => onFieldChange('travellers', e.target.value)}
              disabled={isSubmitting}
              className={fieldClass('travellers')}
            >
              <option value="1 Traveller">1 Traveller (Solo)</option>
              <option value="2 Travellers">2 Travellers (Couple / Duo)</option>
              <option value="3-5 Travellers">3 - 5 Travellers (Family)</option>
              <option value="6+ Travellers">6+ Travellers (Group)</option>
            </select>
          </div>
          {errors.travellers && touched.travellers && (
            <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
              {errors.travellers}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Special Requests / Message</label>
        <div className={cn('relative', compact ? 'mt-1' : 'mt-1.5')}>
          <MessageSquare
            className={cn(
              'absolute text-muted-foreground',
              iconClass,
              iconLeft,
              compact ? 'top-2.5' : 'top-3',
            )}
          />
          <textarea
            rows={compact ? 2 : 3}
            placeholder="Tell us about hotel preferences, activities, or any specific requirements..."
            value={formData.message}
            onBlur={() => onBlur('message')}
            onChange={(e) => onFieldChange('message', e.target.value)}
            disabled={isSubmitting}
            maxLength={2000}
            className={fieldClass('message')}
          />
        </div>
        {errors.message && touched.message && (
          <p className={cn('text-rose-500', compact ? 'mt-0.5 text-[0.7rem]' : 'mt-1 text-xs')}>
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field for bot prevention */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website_hp || ''}
          onChange={(e) => onFieldChange('website_hp', e.target.value)}
        />
      </div>

      {submitError && (
        <p className="rounded-sm border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-foreground shadow-lg transition-all duration-300 hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60',
          compact ? 'py-3 text-xs' : 'mt-2 py-3.5 text-sm',
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className={cn('animate-spin', compact ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
            Sending...
          </>
        ) : (
          <>
            {submitLabel}
            <Send className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          </>
        )}
      </button>
    </>
  )
}
