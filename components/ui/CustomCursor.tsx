'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  const trailX = useSpring(cursorX, { damping: 30, stiffness: 150, mass: 0.8 })
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 150, mass: 0.8 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleDown = () => setClicked(true)
    const handleUp = () => setClicked(false)

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setHovered(true)
      }
    }

    const handleLeave = () => setHovered(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Trail dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-orange-DEFAULT/40"
          animate={{
            width: hovered ? 56 : 32,
            height: hovered ? 56 : 32,
            opacity: hovered ? 0.6 : 0.3,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-orange-DEFAULT"
          animate={{
            width: clicked ? 6 : hovered ? 10 : 8,
            height: clicked ? 6 : hovered ? 10 : 8,
            opacity: clicked ? 0.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
    </>
  )
}
