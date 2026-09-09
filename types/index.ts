export interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
  category: string
  tags: string[]
  year: string
  order_index: number
  created_at: string
}

export interface Service {
  id: number
  number: string
  title: string
  subtitle: string
  description: string
  features: string[]
  accent: string
  order_index: number
  created_at: string
}

export interface TitlePart {
  text: string
  orange: boolean
}

export interface NotableProduct {
  id: number
  tag: string
  title: TitlePart[]
  description: string
  image: string
  stats: string[]
  order_index: number
  created_at: string
}

export interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  desc: string
  order_index: number
  created_at: string
}

export interface NavItem {
  label: string
  href: string
}
