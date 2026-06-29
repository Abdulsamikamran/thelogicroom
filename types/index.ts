export interface Project {
  id: string
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  image_url: string | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  year: number
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface NavItem {
  label: string
  href: string
}
