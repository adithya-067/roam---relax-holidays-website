import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

export type EnquiryRecord = {
  id?: string
  name: string
  phone: string
  email: string
  destination: string
  package: string
  travelDate: string
  travellers: string
  message: string
  status?: string
  createdAt?: string
  ip?: string
}

/*
Supabase SQL Schema Script (Run in Supabase SQL Editor):

For the complete schema with indexes and RLS policies, see supabase-schema.sql in the project root.

Quick version:
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  destination VARCHAR(255),
  package VARCHAR(255),
  travel_date DATE,
  travellers VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/

const supabaseUrl = process.env.SUPABASE_URL

// Server-side: use service_role key to bypass RLS for trusted inserts from the API route.
// This key is NEVER sent to the browser — it lives only in .env.local / server env.
// SUPABASE_ANON_KEY (publishable key) does not embed a PostgreSQL role claim, so RLS
// policies for the 'anon' role do not fire with it. The service_role key is the correct
// choice for server-side writes where you control and trust the code.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

// Fallback: anon key (used only if service key is not configured — will likely hit RLS)
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

function createSupabaseAdminClient() {
  if (!supabaseUrl) return null

  const key = supabaseServiceKey || supabaseAnonKey
  if (!key) return null

  const client = createClient(supabaseUrl, key, {
    auth: {
      // Disable auto session management — this is a server-side-only client
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  if (supabaseServiceKey) {
    console.log('[DB] Supabase admin client ready (service_role). URL:', supabaseUrl)
  } else {
    console.warn(
      '[DB] SUPABASE_SERVICE_KEY not set — falling back to anon key.\n' +
      '  Add SUPABASE_SERVICE_KEY to .env.local for reliable server-side inserts.\n' +
      '  Get it from: Supabase Dashboard → Project Settings → API → service_role secret key'
    )
  }

  return client
}

// Singleton — created once when the module is first imported (server startup)
const supabase = createSupabaseAdminClient()

export async function saveEnquiryToDatabase(data: EnquiryRecord): Promise<{ success: boolean; id: string; source: string }> {
  const id = `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  const timestamp = new Date().toISOString()

  // 1. Supabase path
  if (supabase) {
    const payload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      destination: data.destination,
      package: data.package,
      travel_date: data.travelDate || null,
      travellers: data.travellers,
      message: data.message,
      status: 'new',
    }

    try {
      const { data: inserted, error } = await supabase
        .from('enquiries')
        .insert([payload])
        .select()

      if (!error && inserted && inserted.length > 0) {
        console.log('[DB] Enquiry saved to Supabase. ID:', inserted[0].id)
        return { success: true, id: inserted[0].id || id, source: 'supabase' }
      }

      console.error('[DB] Supabase insert failed:')
      console.error('  Code:', error?.code)
      console.error('  Message:', error?.message)
      console.error('  Details:', error?.details)
      console.error('  Hint:', error?.hint)

      if (error?.code === '42501' || error?.message?.includes('row-level security')) {
        console.error(
          '[DB] RLS VIOLATION — The SUPABASE_SERVICE_KEY in .env.local is wrong or missing.\n' +
          '  Get the service_role secret key from:\n' +
          '  Supabase Dashboard → Project Settings → API → service_role (secret)\n' +
          '  It is a long JWT starting with eyJ...'
        )
      }

      return { success: false, id: '', source: 'supabase_error' }
    } catch (err) {
      console.error('[DB] Supabase connection error:', err)
      return { success: false, id: '', source: 'supabase_error' }
    }
  }

  // 2. Dev Fallback: Persist locally to data/enquiries.json
  // (only runs when SUPABASE_URL is not set at all)
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    const filePath = path.join(dataDir, 'enquiries.json')
    let existing: EnquiryRecord[] = []
    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        existing = JSON.parse(fileContent)
      } catch {
        existing = []
      }
    }

    const newRecord: EnquiryRecord = {
      id,
      ...data,
      status: 'new',
      createdAt: timestamp,
    }

    existing.unshift(newRecord)
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf-8')
    console.log(`[DB Local Persistence] Enquiry stored in data/enquiries.json (ID: ${id})`)
    return { success: true, id, source: 'local_json' }
  } catch (fileErr) {
    console.error('[DB Local Persistence] Failed to write file:', fileErr)
    return { success: false, id, source: 'failed' }
  }
}
