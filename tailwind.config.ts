import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0A0A0A',
          100: '#111111',
          200: '#1A1A1A',
          300: '#222222',
          400: '#2A2A2A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          muted: '#A0A0A0',
          faint: '#4A4A4A',
        },
        orange: {
          DEFAULT: '#FF6B00',
          light: '#FF8C33',
          dark: '#CC5500',
          glow: 'rgba(255, 107, 0, 0.15)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '11xl': ['12rem', { lineHeight: '0.85', letterSpacing: '-0.05em' }],
        '12xl': ['14rem', { lineHeight: '0.82', letterSpacing: '-0.06em' }],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-orange': 'pulse-orange 3s ease-in-out infinite',
        'flicker': 'flicker 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
      },
      keyframes: {
        'pulse-orange': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(255,107,0,0.8), 0 0 120px rgba(255,107,0,0.4)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.6' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.4' },
          '97%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        'orange-radial': 'radial-gradient(circle at center, rgba(255,107,0,0.15) 0%, transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '80px 80px',
      },
    },
  },
  plugins: [],
}

export default config
