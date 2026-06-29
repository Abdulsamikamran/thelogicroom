'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
]

export function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Subtle orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-DEFAULT/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-7 h-7 relative">
                <div className="absolute inset-0 border-2 border-orange-DEFAULT rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
                <div className="absolute inset-[4px] bg-orange-DEFAULT rotate-45" />
              </div>
              <span className="font-display text-lg tracking-widest uppercase text-white">
                The Logic Room
              </span>
            </Link>
            <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
              We architect precision digital experiences. Web development and AI
              agents for companies that refuse to be ordinary.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-orange-DEFAULT mb-6">
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300 orange-line"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-orange-DEFAULT mb-6">
              Get In Touch
            </p>
            <a
              href="mailto:hello@thelogicroom.dev"
              className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300 block mb-3 orange-line"
            >
              hello@thelogicroom.dev
            </a>
            <div className="flex gap-6 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase text-white/30 hover:text-orange-DEFAULT transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/20 tracking-widest">
            © {new Date().getFullYear()} THE LOGIC ROOM. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-xs text-white/20 tracking-widest">
            CRAFTED WITH PRECISION & INTENTION
          </p>
        </div>
      </div>
    </footer>
  )
}
