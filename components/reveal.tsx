'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  index?: number
  className?: string
  as?: ElementType
}

const STAGGER_MS = 70

export function Reveal({ children, index = 0, className, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [state, setState] = useState<'visible' | 'hidden'>('visible')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) return

    setState('hidden')
    let revealed = false
    const revealNow = () => {
      if (revealed) return
      revealed = true
      setState('visible')
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          revealNow()
        }
      },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
    )
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        revealNow()
      }
    }
    observer.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal={state}
      className={cn('reveal', className)}
      style={{ ['--reveal-delay' as string]: `${Math.min(index, 8) * STAGGER_MS}ms` }}
    >
      {children}
    </Tag>
  )
}
