# Roam & Relax Holidays - Setup Guide

This document contains the complete setup instructions to get your website running in production.

## 🚀 Quick Start Summary

The website is **95% production-ready**. You need to:
1. Set up environment variables
2. Create the Supabase database
3. Configure Resend for emails
4. Deploy

---

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Resend account (free tier works)
- Git (optional, for deployment)

---

## 🔧 Step 1: Environment Variables

### Create `.env.local` file

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

### Fill in your credentials:

#### 1. Supabase Configuration

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project (or use existing)
3. Go to **Project Settings** → **API**
4. Copy the following values:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

#### 2. Resend Configuration

1. Go to [https://resend.com](https://resend.com)
2. Sign up or log in
3. Go to **API Keys** and create a new key
4. Copy your API key:

```env
RESEND_API_KEY=re_your_resend_api_key_here
```

5. Set your business email (where enquiries will be sent):

```env
BUSINESS_EMAIL=bookings@roamandrelaxholidays.com
```

6. Set the sender email (must be verified in Resend):

```env
RESEND_FROM_EMAIL=Roam & Relax Enquiries <onboarding@resend.dev>
```

> **Note:** For production, you should verify your own domain in Resend and use your domain email instead of `onboarding@resend.dev`.

---

## 🗄️ Step 2: Database Setup

### Create Supabase Database Table

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Open the file `supabase-schema.sql` in this project
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **Run** to execute

This will create:
- `enquiries` table with all necessary fields
- Indexes for better performance
- Automatic timestamp updates
- Row Level Security (RLS) policies

### Verify Database Creation

Run this query in the SQL Editor to verify:

```sql
SELECT COUNT(*) FROM enquiries;
```

You should see `0` (empty table) without any errors.

---

## 📧 Step 3: Email Configuration (Resend)

### For Development (Free Tier)

The default `onboarding@resend.dev` sender works immediately for testing.

### For Production

1. **Verify your domain** in Resend:
   - Go to Resend Dashboard → **Domains**
   - Add your domain (e.g., `roamandrelaxholidays.com`)
   - Add the DNS records Resend provides to your domain registrar
   - Wait for verification (usually a few minutes)

2. **Update sender email** in `.env.local`:
   ```env
   RESEND_FROM_EMAIL=Enquiries <enquiries@roamandrelaxholidays.com>
   ```

---

## 📱 Step 4: Contact Information

Update your business contact details in `lib/site-data.ts`:

```typescript
export const CONTACT_CONFIG: ContactConfig = {
  phone: '+91 9901 330 330',        // Your display phone
  phoneFormatted: '+919901330330',  // Your tel: link format
  email: 'bookings@roamandrelaxholidays.com',
  whatsapp: '919901330330',         // WhatsApp number (no + or spaces)
  address: 'Bengaluru, Karnataka, India',
  socials: {
    instagram: 'https://instagram.com/roamandrelax',  // Update when live
    facebook: 'https://facebook.com/roamandrelax',     // Update when live
    youtube: 'https://youtube.com/@roamandrelax',      // Update when live
    twitter: 'https://x.com/roamandrelax',             // Update when live
  },
}
```

Set social media URLs to `null` if accounts don't exist yet:

```typescript
socials: {
  instagram: null,  // Icon will be hidden
  facebook: null,
  youtube: null,
  twitter: null,
}
```

---

## 🏃 Step 5: Run Development Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✅ Step 6: Test Everything

### Test Enquiry Form

1. Go to your website
2. Click "Plan Your Trip" or "Enquire Now" on any package
3. Fill out the form with valid details:
   - Name: Your name
   - Phone: 10-digit Indian mobile (e.g., 9876543210)
   - Email: Your email
   - Select a package
   - Choose travel date
   - Select travellers
   - Add a message
4. Submit the form
5. Check:
   - ✅ Success message appears
   - ✅ Entry appears in Supabase `enquiries` table
   - ✅ Email arrives at `BUSINESS_EMAIL`

### Test Package Detail Pages

1. Click on any package card
2. Verify:
   - ✅ Detail page loads correctly
   - ✅ All sections display (overview, itinerary, inclusions, gallery)
   - ✅ "Enquire About This Package" button works
   - ✅ Package is pre-selected in the enquiry form

### Test Navigation

1. Click through all navbar links
2. Test the package dropdown menu
3. Click destination cards
4. Verify all links work correctly

### Test WhatsApp Button

1. Click the floating WhatsApp button
2. Verify it opens WhatsApp with your number

---

## 🚀 Step 7: Deploy to Production

### Recommended: Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `BUSINESS_EMAIL`
   - `RESEND_FROM_EMAIL`
5. Deploy

### Alternative: Other Platforms

The site works on any Next.js hosting platform:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🔍 Troubleshooting

### Enquiry Form Not Submitting

**Check:**
1. `.env.local` exists and has correct values
2. Supabase credentials are correct
3. Database table was created (check SQL Editor)
4. Browser console for errors (F12 → Console tab)

**Common issues:**
- RLS policies: Make sure anonymous inserts are allowed
- API key: Verify it's the `anon` key, not the `service_role` key

### Email Not Arriving

**Check:**
1. `RESEND_API_KEY` is correct
2. `BUSINESS_EMAIL` is correct
3. Check spam folder
4. Check Resend dashboard logs for errors

**Fallback:**
- If Resend isn't configured, enquiries still save to database
- Check server logs: `npm run dev` output shows "Logged to console"

### Package Images Not Loading

**Check:**
- All images are in `public/images/` folder
- Image paths in `lib/site-data.ts` match actual filenames
- File extensions match (`.png`, `.jpg`, etc.)

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

---

## 📊 Admin Dashboard (Phase 2)

The database is ready for an admin dashboard. Future implementation will allow you to:

- View all enquiries in a table
- Filter by status (new, contacted, follow-up, converted, closed)
- Update enquiry status
- Search by customer name/email
- Export enquiries to CSV

The backend structure supports this - it just needs a frontend interface with authentication.

---

## 🔐 Security Notes

### Environment Variables

- **Never commit** `.env.local` to Git
- Use different credentials for development and production
- Rotate API keys periodically

### Supabase RLS

The current setup allows:
- ✅ Anonymous users can INSERT enquiries (form submissions)
- ❌ Anonymous users cannot READ/UPDATE/DELETE enquiries

For admin dashboard, you'll need to:
1. Set up Supabase Auth
2. Create authenticated user policies
3. Implement login system

---

## 📞 Support

If you encounter issues:

1. Check this document first
2. Review error messages in browser console (F12)
3. Check server logs in terminal
4. Verify environment variables are loaded correctly
5. Test with simple data first (dummy phone, email)

---

## ✨ What's Working Now

✅ Complete package detail pages with itineraries  
✅ Context-aware enquiry forms (auto-selects packages)  
✅ 10-digit Indian phone validation  
✅ Client + server-side validation  
✅ Supabase database persistence  
✅ Resend email notifications  
✅ Responsive design (mobile + desktop)  
✅ Navigation and all buttons work  
✅ Welcome popup with enquiry form  
✅ WhatsApp integration  
✅ Package search in navbar  
✅ Professional email templates  
✅ Form state management (loading, success, error)  

---

## 📝 Next Steps After Launch

1. **Analytics:** Add Google Analytics or Plausible
2. **Admin Dashboard:** Build enquiry management interface
3. **SEO:** Add meta descriptions, structured data
4. **Performance:** Optimize images, add caching
5. **A/B Testing:** Test different CTA copy
6. **Customer Emails:** Add auto-reply to customers
7. **SMS:** Add SMS notifications via Twilio
8. **Payment:** Integrate payment gateway for deposits
9. **Reviews:** Add testimonial collection system
10. **Chat:** Add live chat widget

---

**Last Updated:** August 18, 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
