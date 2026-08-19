import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export async function GET() {
  // 1. Supabase read
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        return NextResponse.json({ success: true, enquiries: data, source: 'supabase' })
      }
    } catch (err) {
      console.error('[Admin API] Supabase query error:', err)
    }
  }

  // 2. Local JSON read fallback
  try {
    const filePath = path.join(process.cwd(), 'data', 'enquiries.json')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const enquiries = JSON.parse(content)
      return NextResponse.json({ success: true, enquiries, source: 'local_json' })
    }
    return NextResponse.json({ success: true, enquiries: [], source: 'local_json' })
  } catch (err) {
    console.error('[Admin API] Local file read error:', err)
    return NextResponse.json(
      { success: false, message: 'Could not fetch enquiries' },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()
    if (!id || !status) {
      return NextResponse.json({ success: false, message: 'Missing id or status' }, { status: 400 })
    }

    const validStatuses = ['new', 'contacted', 'follow-up', 'converted', 'closed']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 })
    }

    // 1. Supabase update
    if (supabase) {
      const { error } = await supabase
        .from('enquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (!error) {
        return NextResponse.json({ success: true, message: `Status updated to ${status}` })
      }
    }

    // 2. Local JSON update fallback
    const filePath = path.join(process.cwd(), 'data', 'enquiries.json')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const enquiries = JSON.parse(content)
      const index = enquiries.findIndex((e: { id: string }) => e.id === id)
      if (index !== -1) {
        enquiries[index].status = status
        fs.writeFileSync(filePath, JSON.stringify(enquiries, null, 2), 'utf-8')
        return NextResponse.json({ success: true, message: `Status updated to ${status}` })
      }
    }

    return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 })
  } catch (err) {
    console.error('[Admin API] Update error:', err)
    return NextResponse.json({ success: false, message: 'Failed to update status' }, { status: 500 })
  }
}
