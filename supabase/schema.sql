-- ─── The Logic Room — Supabase Schema ─────────────────────────────────────
-- Run this in your Supabase SQL Editor to create the projects table.

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  category    text not null check (category in ('Web Development', 'AI Agent')),
  description text not null,
  tags        text[] not null default '{}',
  image_url   text,
  live_url    text,
  github_url  text,
  featured    boolean not null default false,
  year        integer not null default extract(year from now())::integer,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- Allow public read access
create policy "Public can read projects"
  on public.projects
  for select
  using (true);

-- Seed data
insert into public.projects (title, slug, category, description, tags, featured, year)
values
  (
    'NeuralCart AI',
    'neuralcart-ai',
    'AI Agent',
    'Autonomous e-commerce agent with real-time inventory intelligence, dynamic pricing logic, and multi-channel fulfilment orchestration.',
    array['Next.js','LangChain','Supabase','OpenAI'],
    true,
    2024
  ),
  (
    'Axiom Platform',
    'axiom-platform',
    'Web Development',
    'Full-stack SaaS analytics platform. Real-time dashboards, role-based access, serverless edge functions, and a pixel-perfect design system.',
    array['React','Node.js','PostgreSQL','Tailwind'],
    true,
    2024
  ),
  (
    'VoxAgent',
    'voxagent',
    'AI Agent',
    'Voice-first customer support bot with sentiment analysis, escalation routing, and CRM sync. Reduced resolution time by 68%.',
    array['Python','Whisper','FastAPI','Twilio'],
    false,
    2023
  ),
  (
    'Meridian Design Co.',
    'meridian-design',
    'Web Development',
    'Award-winning agency portfolio. GSAP-powered scroll theatre, WebGL hero, zero-JS fallback, 100 Lighthouse score.',
    array['Next.js','GSAP','Three.js','Framer Motion'],
    false,
    2023
  );
