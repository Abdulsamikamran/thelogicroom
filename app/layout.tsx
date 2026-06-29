import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'The Logic Room — Web Development & AI Agents',
    template: '%s | The Logic Room',
  },
  description:
    'We architect precision digital experiences. Expert web development and intelligent AI agents for companies that refuse to be ordinary.',
  keywords: [
    'web development',
    'AI agents',
    'frontend',
    'backend',
    'Next.js',
    'machine learning',
    'automation',
  ],
  authors: [{ name: 'The Logic Room' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thelogicroom.dev',
    siteName: 'The Logic Room',
    title: 'The Logic Room — Web Development & AI Agents',
    description:
      'We architect precision digital experiences. Expert web development and intelligent AI agents.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Logic Room',
    description:
      'We architect precision digital experiences. Expert web development and intelligent AI agents.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white noise-overlay antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
