# The Logic Room — Portfolio Website

An immersive, animation-heavy portfolio for **The Logic Room** studio.

Built with Next.js 14 (App Router, TypeScript), Tailwind CSS, Three.js via @react-three/fiber, Framer Motion, Lenis smooth scroll, and Supabase.

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/your-org/the-logic-room.git
cd the-logic-room
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **No Supabase yet?** That's fine — the site falls back to beautiful placeholder data automatically.

### 3. (Optional) Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Paste and run the contents of `supabase/schema.sql`
4. Add your project URL + anon key to `.env.local`

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
the-logic-room/
├── app/
│   ├── layout.tsx          # Root layout (Lenis, Cursor, Navbar, Footer)
│   └── page.tsx            # Home page — renders all sections
├── components/
│   ├── canvas/
│   │   └── Scene.tsx       # Three.js 3D TorusKnot + particle field
│   ├── layout/
│   │   ├── Navbar.tsx      # Animated sticky nav with mobile menu
│   │   ├── Footer.tsx      # Full footer
│   │   └── SmoothScrollProvider.tsx  # Lenis wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx     # Full-screen hero + 3D canvas
│   │   ├── MarqueeSection.tsx  # Orange ticker tape
│   │   ├── ServicesSection.tsx # Web Dev + AI cards
│   │   ├── ProjectsSection.tsx # Supabase-driven project list
│   │   ├── AboutSection.tsx    # Animated word reveal + values
│   │   └── ContactSection.tsx  # Contact form
│   └── ui/
│       └── CustomCursor.tsx    # Custom cursor with spring physics
├── hooks/
│   ├── useLenis.ts             # Lenis hook (standalone use)
│   └── useScrollProgress.ts    # Scroll progress + parallax helpers
├── lib/
│   └── supabase.ts             # Supabase client + data fetchers + fallbacks
├── styles/
│   └── globals.css             # Global CSS (fonts, cursor, grid, marquee...)
├── types/
│   └── index.ts                # TypeScript types (Project, Service, etc.)
├── supabase/
│   └── schema.sql              # SQL to create & seed the projects table
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Key Design Decisions

| Feature | Implementation |
|---------|----------------|
| Smooth scroll | Lenis 1.x, configured globally in `SmoothScrollProvider` |
| 3D shape | `@react-three/fiber` TorusKnot + particle field, dynamically imported (SSR-safe) |
| Scroll binding | `framer-motion` `useScroll` + `useTransform` piped as `MotionValue` into Three.js `useFrame` |
| Text reveals | Clip-path overflow + `y: '110%' → 0%` animation per line |
| Animated statement | Per-word opacity + y driven by `scrollYProgress` |
| Custom cursor | Spring-physics dot + trailing ring, reacts to hover + click |
| Supabase | Async RSC fetch in `app/page.tsx` — graceful fallback to static data |

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Customisation

- **Colors**: Edit `tailwind.config.ts` → `theme.extend.colors`
- **Fonts**: Swap the Google Fonts import in `styles/globals.css`
- **3D shape**: In `components/canvas/Scene.tsx` replace `torusKnotGeometry` with `icosahedronGeometry`, `octahedronGeometry`, etc.
- **Projects**: Add rows to Supabase `projects` table or edit `FALLBACK_PROJECTS` in `lib/supabase.ts`
