'use client'

import { useEffect, useMemo, useState } from 'react'
import type { AdminEntity } from '@/lib/admin-entities'

type Row = Record<string, unknown> & { id?: number }

const TABS: { key: AdminEntity; label: string }[] = [
  { key: 'services', label: 'Services' },
  { key: 'notable_products', label: 'Products' },
  { key: 'projects', label: 'Projects' },
  { key: 'team_members', label: 'Team' },
]

const EMPTY: Record<AdminEntity, Record<string, string>> = {
  services: {
    number: '',
    title: '',
    subtitle: '',
    description: '',
    features: '',
    accent: '#FF6B00',
    order_index: '0',
  },
  notable_products: {
    tag: '',
    title: '[{"text":"","orange":true}]',
    description: '',
    image: '',
    stats: '',
    order_index: '0',
  },
  projects: {
    title: '',
    description: '',
    image: '',
    link: '',
    category: 'Web Development',
    tags: '',
    year: String(new Date().getFullYear()),
    order_index: '0',
  },
  team_members: {
    name: '',
    role: '',
    image: '',
    desc: '',
    order_index: '0',
  },
}

const LIST_FIELDS = new Set(['features', 'stats', 'tags'])
const JSON_FIELDS = new Set(['title'])
const TEXTAREA_FIELDS = new Set(['description', 'desc', 'title', 'features', 'stats', 'tags'])

function rowLabel(tab: AdminEntity, row: Row) {
  if (tab === 'notable_products') {
    const title = row.title
    if (Array.isArray(title)) {
      return title.map((p: { text?: string }) => p.text).join(' ')
    }
  }
  return String(row.title || row.name || row.tag || `#${row.id}`)
}

function rowToForm(tab: AdminEntity, row: Row): Record<string, string> {
  const form = { ...EMPTY[tab] }
  for (const key of Object.keys(form)) {
    const value = row[key]
    if (LIST_FIELDS.has(key) && Array.isArray(value)) {
      form[key] = value.join('\n')
    } else if (tab === 'notable_products' && key === 'title') {
      form[key] = JSON.stringify(value ?? [], null, 2)
    } else {
      form[key] = value == null ? '' : String(value)
    }
  }
  return form
}

function formToPayload(tab: AdminEntity, form: Record<string, string>) {
  const payload: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(form)) {
    if (LIST_FIELDS.has(key)) {
      payload[key] = value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    } else if (tab === 'notable_products' && JSON_FIELDS.has(key)) {
      payload[key] = JSON.parse(value)
    } else if (key === 'order_index') {
      payload[key] = Number(value) || 0
    } else {
      payload[key] = value
    }
  }
  return payload
}

export function AdminApp() {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<AdminEntity>('services')
  const [rows, setRows] = useState<Row[]>([])
  const [form, setForm] = useState<Record<string, string>>(EMPTY.services)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const fields = useMemo(() => Object.keys(EMPTY[tab]), [tab])

  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(Boolean(data.authenticated))
        setReady(true)
      })
      .catch(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!authenticated) return
    loadRows(tab)
  }, [authenticated, tab])

  async function loadRows(entity: AdminEntity) {
    setMessage('')
    const res = await fetch(`/api/admin/${entity}`)
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Failed to load')
      setRows([])
      return
    }
    setRows(data)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) {
      setAuthError('Invalid username or password')
      return
    }
    setAuthenticated(true)
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  function startCreate() {
    setEditingId(null)
    setForm({ ...EMPTY[tab] })
    setMessage('')
  }

  function startEdit(row: Row) {
    setEditingId(Number(row.id))
    setForm(rowToForm(tab, row))
    setMessage('')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      const payload = formToPayload(tab, form)
      const res = await fetch(`/api/admin/${tab}`, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingId ? { ...payload, id: editingId } : payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage(data.error || 'Save failed')
        return
      }
      setMessage(editingId ? 'Updated' : 'Created')
      setEditingId(null)
      setForm({ ...EMPTY[tab] })
      loadRows(tab)
    } catch {
      setMessage('Invalid JSON in title field')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this item?')) return
    const res = await fetch(`/api/admin/${tab}?id=${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || 'Delete failed')
      return
    }
    if (editingId === id) startCreate()
    setMessage('Deleted')
    loadRows(tab)
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">
        Loading…
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#111] text-white flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
          <h1 className="text-xl font-semibold mb-4">Admin</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="w-full bg-black border border-white/20 px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full bg-black border border-white/20 px-3 py-2 text-sm"
          />
          {authError && <p className="text-red-400 text-sm">{authError}</p>}
          <button
            type="submit"
            className="w-full bg-orange-600 text-black py-2 text-sm font-medium"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <strong className="text-sm">CMS</strong>
        <button onClick={handleLogout} className="text-xs text-white/60 hover:text-white">
          Logout
        </button>
      </header>

      <div className="flex overflow-x-auto border-b border-white/10">
        {TABS.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setTab(item.key)
              setEditingId(null)
              setForm({ ...EMPTY[item.key] })
              setMessage('')
            }}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              tab === item.key ? 'bg-orange-600 text-black' : 'text-white/70'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {message && (
        <div className="px-4 py-2 text-sm bg-white/5 text-orange-300">{message}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-4 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-white/50">Items</h2>
            <button onClick={startCreate} className="text-xs bg-white/10 px-2 py-1">
              New
            </button>
          </div>
          <div className="space-y-2">
            {rows.map((row) => (
              <div
                key={String(row.id)}
                className="flex items-center justify-between gap-3 border border-white/10 p-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm">{rowLabel(tab, row)}</p>
                  <p className="text-xs text-white/40">#{row.id}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => startEdit(row)}
                    className="text-xs text-orange-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(Number(row.id))}
                    className="text-xs text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {rows.length === 0 && (
              <p className="text-sm text-white/40">No items yet.</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="p-4 space-y-3">
          <h2 className="text-sm text-white/50">
            {editingId ? `Edit #${editingId}` : 'Create'}
          </h2>
          {fields.map((key) => (
            <label key={key} className="block">
              <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">
                {key.replace(/_/g, ' ')}
                {LIST_FIELDS.has(key) ? ' (one per line or comma-separated)' : ''}
                {tab === 'notable_products' && key === 'title' ? ' (JSON)' : ''}
              </span>
              {TEXTAREA_FIELDS.has(key) ? (
                <textarea
                  value={form[key] || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  rows={key === 'title' ? 6 : 3}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-sm font-mono"
                />
              ) : (
                <input
                  type={key === 'order_index' ? 'number' : 'text'}
                  value={form[key] || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full bg-black border border-white/20 px-3 py-2 text-sm"
                />
              )}
            </label>
          ))}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-orange-600 text-black py-2 text-sm font-medium disabled:opacity-60"
          >
            {saving ? 'Saving…' : editingId ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}
