'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Compass, RefreshCw, Search, Phone, Mail, Calendar, User, CheckCircle, Clock } from 'lucide-react'

type Enquiry = {
  id: string
  name: string
  phone: string
  email: string
  destination: string
  package?: string
  travel_date?: string
  travelDate?: string
  travellers: string
  message: string
  status: 'new' | 'contacted' | 'follow-up' | 'converted' | 'closed'
  created_at?: string
  createdAt?: string
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/enquiries')
      const data = await res.json()
      if (data.success && Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries)
      }
    } catch (err) {
      console.error('Failed to load enquiries', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEnquiries()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id)
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const data = await res.json()
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus as Enquiry['status'] } : e)),
        )
      }
    } catch (err) {
      console.error('Failed to update status', err)
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = enquiries.filter((e) => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      !query ||
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.phone.includes(query) ||
      (e.package || e.destination || '').toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'follow-up':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'converted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Admin Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
              <Compass className="h-5 w-5" />
            </span>
            <span className="font-serif text-lg font-bold text-primary">Roam &amp; Relax Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchEnquiries}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors bg-slate-100 px-3 py-1.5 rounded-full"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link
              href="/"
              className="text-xs font-semibold text-accent-foreground hover:underline"
            >
              Back to Main Site &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">Customer Enquiries</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage and track customer trip requests in real time. Total enquiries: {enquiries.length}
            </p>
          </div>

          {/* Filter Status Pills */}
          <div className="flex flex-wrap gap-2">
            {['all', 'new', 'contacted', 'follow-up', 'converted', 'closed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full capitalize transition-all ${
                  filterStatus === st
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {st} {st !== 'all' && `(${enquiries.filter((e) => e.status === st).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Enquiries Table */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-lg border border-slate-200 p-8 text-slate-500">
            No enquiries found matching your search and filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[0.7rem] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Package / Destination</th>
                  <th className="py-3 px-4">Travel Date &amp; Travellers</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Status &amp; Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                        <Phone className="h-3 w-3 shrink-0" />
                        <a href={`tel:${item.phone}`} className="hover:underline">{item.phone}</a>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                        <Mail className="h-3 w-3 shrink-0" />
                        <a href={`mailto:${item.email}`} className="hover:underline truncate max-w-[140px]">{item.email}</a>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <span className="font-medium text-slate-800">
                        {item.package || item.destination || 'General Enquiry'}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top text-slate-600">
                      <div>{item.travel_date || item.travelDate || 'Flexible'}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.travellers}</div>
                    </td>

                    <td className="py-4 px-4 align-top max-w-xs text-slate-600">
                      <p className="line-clamp-3 text-xs leading-relaxed">
                        {item.message || 'No special requirements.'}
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top text-xs text-slate-500 whitespace-nowrap">
                      {(item.created_at || item.createdAt)
                        ? new Date(item.created_at || item.createdAt!).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Recent'}
                    </td>

                    <td className="py-4 px-4 align-top">
                      <select
                        value={item.status || 'new'}
                        disabled={updatingId === item.id}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-xs font-semibold rounded-md border px-2.5 py-1.5 focus:outline-none ${getStatusBadge(
                          item.status || 'new',
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="follow-up">Follow-Up</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
