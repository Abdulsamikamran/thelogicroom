'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-black/80 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-3 -mx-2'
              : ''
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 border-2 border-orange-DEFAULT rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
                <div className="absolute inset-[5px] bg-orange-DEFAULT rotate-45 group-hover:rotate-[225deg] transition-transform duration-700 delay-75" />
              </div>
              <span className="font-display text-xl tracking-widest text-white uppercase">
                The Logic Room
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="font-mono text-xs tracking-widest uppercase text-white/60 hover:text-orange-DEFAULT transition-colors duration-300 orange-line"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="font-mono text-xs tracking-widest uppercase px-5 py-2.5 border border-orange-DEFAULT text-orange-DEFAULT hover:bg-orange-DEFAULT hover:text-black transition-all duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Let&apos;s Build
            </motion.a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden relative z-10 flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white"
              animate={{ opacity: menuOpen ? 0 : 1, x: menuOpen ? 10 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-white origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center items-start px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-8 w-full">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="font-display text-6xl tracking-wider text-white hover:text-orange-DEFAULT transition-colors"
                  onClick={() => setMenuOpen(false)}
                  initial={{ x: -60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="mt-16 font-mono text-xs tracking-widest text-white/30 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              hello@thelogicroom.dev
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
