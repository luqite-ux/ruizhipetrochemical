'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { R2_BANNERS } from '@/lib/r2-assets'

const SLIDES = [
  {
    id: 'banner-1',
    image: R2_BANNERS[0],
    eyebrow: 'Xuyi 22,000 m² Source Factory',
    headline: 'Integrated Petrochemical Equipment Fabrication & Plant Engineering',
    description:
      '16+ years integrating design, heavy fabrication, and site installation for pressure vessels, storage tanks, heat exchangers, and distillation columns.',
    ctaLabel: 'Explore Equipment Catalog',
    ctaHref: '/products',
    secondaryLabel: 'Request Quotation',
    secondaryHref: '/contact#inquiry-rfq',
    side: 'left' as const,
    tone: 'light' as const,
    objectPos: 'object-right',
  },
  {
    id: 'banner-2',
    image: R2_BANNERS[1],
    eyebrow: 'Heavy Vessel Fabrication Workshop',
    headline: 'Custom Pressure Vessels, Heat Exchangers & Distillation Columns',
    description:
      '50/10-ton overhead crane bays, CNC laser blanking, automated submerged-arc welding, alloy PMI spectroscopy, and full NDT weld inspection.',
    ctaLabel: 'Inspect Manufacturing Facility',
    ctaHref: '/manufacturing',
    secondaryLabel: 'Quality & Certifications',
    secondaryHref: '/quality',
    side: 'right' as const,
    tone: 'dark' as const,
    objectPos: 'object-left',
  },
  {
    id: 'banner-3',
    image: R2_BANNERS[2],
    eyebrow: '37+ Delivered Engineering Projects',
    headline: 'Proven Across Major Refining, Chemical & Energy Complexes',
    description:
      'Trusted by Sinopec Jiangsu, Shandong Haiyou, Jiangsu Fuqiang, ADAMA Anpon, Datang Environmental, and Nanjing Jinling Huntsman.',
    ctaLabel: 'View Project Case Studies',
    ctaHref: '/projects',
    secondaryLabel: 'Contact Engineering Team',
    secondaryHref: '/contact#inquiry-rfq',
    side: 'left' as const,
    tone: 'light' as const,
    objectPos: 'object-right',
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6500)
    return () => clearInterval(timer)
  }, [paused])

  const slide = SLIDES[index]
  const isLight = slide.tone === 'light'
  const isRight = slide.side === 'right'

  return (
    <section
      id="hero-carousel"
      aria-label="Featured engineering capabilities"
      className="relative border-b border-hairline bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop: full-width adaptive negative-space composition */}
      <div className="relative hidden md:block md:min-h-[540px] lg:min-h-[600px]">
        {SLIDES.map((s, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.id}
            src={s.image}
            alt={s.headline}
            className={`absolute inset-0 h-full w-full object-cover ${s.objectPos} transition-opacity duration-700 ${
              idx === index ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />
        ))}

        <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-8 py-16 lg:min-h-[600px]">
          <div className={`max-w-xl ${isRight ? 'ml-auto' : 'mr-auto'}`}>
            <p
              className={`font-mono text-xs font-semibold uppercase tracking-[0.18em] ${
                isLight ? 'text-crimson' : 'text-red-300'
              }`}
            >
              {slide.eyebrow}
            </p>
            <h1
              className={`mt-3 text-4xl font-semibold leading-[1.12] tracking-tight lg:text-5xl ${
                isLight ? 'text-ink' : 'text-white'
              }`}
            >
              {slide.headline}
            </h1>
            <p
              className={`mt-4 text-base leading-relaxed ${
                isLight ? 'text-body' : 'text-slate-100'
              }`}
            >
              {slide.description}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={slide.ctaHref}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                  isLight
                    ? 'bg-navy text-white hover:bg-navy/90'
                    : 'bg-white text-navy hover:bg-slate-100'
                }`}
              >
                {slide.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={slide.secondaryHref}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                  isLight
                    ? 'border-navy/25 bg-white/85 text-navy hover:border-navy'
                    : 'border-white/40 bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {slide.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile 390px: clean full-bleed image top + crisp stacked copy panel below */}
      <div className="md:hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-alabaster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.headline}
            className={`h-full w-full object-cover ${slide.objectPos}`}
          />
        </div>
        <div className={`px-5 py-7 ${isLight ? 'bg-white text-ink' : 'bg-navy text-white'}`}>
          <p className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-crimson' : 'text-red-300'}`}>
            {slide.eyebrow}
          </p>
          <h1 className={`mt-2 text-2xl font-semibold leading-snug ${isLight ? 'text-ink' : 'text-white'}`}>
            {slide.headline}
          </h1>
          <p className={`mt-3 text-sm leading-relaxed ${isLight ? 'text-body' : 'text-slate-200'}`}>
            {slide.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href={slide.ctaHref}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium ${
                isLight ? 'bg-navy text-white' : 'bg-white text-navy'
              }`}
            >
              {slide.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="border-t border-hairline bg-white/95 px-5 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Banner slides">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === index}
                aria-label={`Slide ${idx + 1}: ${s.eyebrow}`}
                onClick={() => setIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === index ? 'w-8 bg-navy' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-body">
              0{index + 1} / 0{SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
              aria-label="Previous slide"
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-ink hover:border-navy hover:text-navy"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-ink hover:border-navy hover:text-navy"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % SLIDES.length)}
              aria-label="Next slide"
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-ink hover:border-navy hover:text-navy"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
