// import { createClient } from '@supabase/supabase-js'
// import type { Project } from '@/types'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// // ─── Fallback placeholder data ─────────────────────────────────────────────
// export const FALLBACK_PROJECTS: Project[] = [
//   {
//     id: '1',
//     title: 'NeuralCart AI',
//     slug: 'neuralcart-ai',
//     category: 'AI Agent',
//     description:
//       'Autonomous e-commerce agent with real-time inventory intelligence, dynamic pricing logic, and multi-channel fulfilment orchestration.',
//     tags: ['Next.js', 'LangChain', 'Supabase', 'OpenAI'],
//     image_url: null,
//     live_url: null,
//     github_url: null,
//     featured: true,
//     year: 2024,
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     title: 'Axiom Platform',
//     slug: 'axiom-platform',
//     category: 'Web Development',
//     description:
//       'Full-stack SaaS analytics platform. Real-time dashboards, role-based access, serverless edge functions, and a pixel-perfect design system.',
//     tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
//     image_url: null,
//     live_url: null,
//     github_url: null,
//     featured: true,
//     year: 2024,
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: '3',
//     title: 'VoxAgent',
//     slug: 'voxagent',
//     category: 'AI Agent',
//     description:
//       'Voice-first customer support bot with sentiment analysis, escalation routing, and CRM sync. Reduced resolution time by 68%.',
//     tags: ['Python', 'Whisper', 'FastAPI', 'Twilio'],
//     image_url: null,
//     live_url: null,
//     github_url: null,
//     featured: false,
//     year: 2023,
//     created_at: new Date().toISOString(),
//   },
//   {
//     id: '4',
//     title: 'Meridian Design Co.',
//     slug: 'meridian-design',
//     category: 'Web Development',
//     description:
//       'Award-winning agency portfolio. GSAP-powered scroll theatre, WebGL hero, zero-JS fallback, 100 Lighthouse score.',
//     tags: ['Next.js', 'GSAP', 'Three.js', 'Framer Motion'],
//     image_url: null,
//     live_url: null,
//     github_url: null,
//     featured: false,
//     year: 2023,
//     created_at: new Date().toISOString(),
//   },
// ]

// // ─── Data fetchers ──────────────────────────────────────────────────────────
// export async function getProjects(): Promise<Project[]> {
//   try {
//     if (!supabaseUrl || !supabaseAnonKey) {
//       return FALLBACK_PROJECTS
//     }

//     const { data, error } = await supabase
//       .from('projects')
//       .select('*')
//       .order('created_at', { ascending: false })

//     if (error || !data || data.length === 0) {
//       return FALLBACK_PROJECTS
//     }

//     return data as Project[]
//   } catch {
//     return FALLBACK_PROJECTS
//   }
// }

// export async function getFeaturedProjects(): Promise<Project[]> {
//   try {
//     if (!supabaseUrl || !supabaseAnonKey) {
//       return FALLBACK_PROJECTS.filter((p) => p.featured)
//     }

//     const { data, error } = await supabase
//       .from('projects')
//       .select('*')
//       .eq('featured', true)
//       .order('created_at', { ascending: false })

//     if (error || !data || data.length === 0) {
//       return FALLBACK_PROJECTS.filter((p) => p.featured)
//     }

//     return data as Project[]
//   } catch {
//     return FALLBACK_PROJECTS.filter((p) => p.featured)
//   }
// }
