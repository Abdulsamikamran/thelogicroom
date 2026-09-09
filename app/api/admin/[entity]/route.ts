import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import {
  isAdminEntity,
  pickAllowedFields,
} from '@/lib/admin-entities'
import { createAdminClient } from '@/lib/supabase-admin'

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET(
  _request: Request,
  { params }: { params: { entity: string } },
) {
  if (!isAdminAuthenticated()) return unauthorized()
  if (!isAdminEntity(params.entity)) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from(params.entity)
    .select('*')
    .order('order_index', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(
  request: Request,
  { params }: { params: { entity: string } },
) {
  if (!isAdminAuthenticated()) return unauthorized()
  if (!isAdminEntity(params.entity)) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
  }

  const body = await request.json()
  const payload = pickAllowedFields(params.entity, body)
  const admin = createAdminClient()
  const { data, error } = await admin
    .from(params.entity)
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PUT(
  request: Request,
  { params }: { params: { entity: string } },
) {
  if (!isAdminAuthenticated()) return unauthorized()
  if (!isAdminEntity(params.entity)) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
  }

  const body = await request.json()
  const id = body.id
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const payload = pickAllowedFields(params.entity, body)
  const admin = createAdminClient()
  const { data, error } = await admin
    .from(params.entity)
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  { params }: { params: { entity: string } },
) {
  if (!isAdminAuthenticated()) return unauthorized()
  if (!isAdminEntity(params.entity)) {
    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 })
  }

  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const admin = createAdminClient()
  const { error } = await admin.from(params.entity).delete().eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
