'use client'

import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset']

const DEFAULT_SCROLL_OFFSET: ScrollOffset = ['start end', 'end start']

export function useScrollProgress(
  offset: ScrollOffset = DEFAULT_SCROLL_OFFSET
) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  })

  return { ref, scrollYProgress }
}

export function useParallax(
  scrollY: MotionValue<number>,
  distance: number
): MotionValue<number> {
  return useTransform(scrollY, [0, 1], [-distance, distance])
}
