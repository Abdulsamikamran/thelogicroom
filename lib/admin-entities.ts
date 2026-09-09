export const ADMIN_ENTITIES = [
  'services',
  'notable_products',
  'projects',
  'team_members',
] as const

export type AdminEntity = (typeof ADMIN_ENTITIES)[number]

export const ENTITY_COLUMNS: Record<AdminEntity, string[]> = {
  services: [
    'number',
    'title',
    'subtitle',
    'description',
    'features',
    'accent',
    'order_index',
  ],
  notable_products: [
    'tag',
    'title',
    'description',
    'image',
    'stats',
    'order_index',
  ],
  projects: [
    'title',
    'description',
    'image',
    'link',
    'category',
    'tags',
    'year',
    'order_index',
  ],
  team_members: ['name', 'role', 'image', 'desc', 'order_index'],
}

export function isAdminEntity(value: string): value is AdminEntity {
  return ADMIN_ENTITIES.includes(value as AdminEntity)
}

export function pickAllowedFields(entity: AdminEntity, body: Record<string, unknown>) {
  const allowed = ENTITY_COLUMNS[entity]
  const payload: Record<string, unknown> = {}

  for (const key of allowed) {
    if (body[key] !== undefined) payload[key] = body[key]
  }

  return payload
}
