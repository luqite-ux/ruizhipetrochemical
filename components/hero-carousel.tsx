'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { getHeroSlides, withLocale, type Locale } from '@/lib/i18n'

export function HeroCarousel({ locale = 'en' }: { locale?: Locale }) {
  const slides = getHeroSlides(locale)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(timer)
  }, [paused, slides.length])

  const slide = slides[index]
  const isLight = slide.tone === 'light'
  const isRight = slide.side === 'right'

  return (
    <section
      id="hero-carousel"
      aria-label={locale === 'zh' ? '核心制造与装备能力展示' : 'Featured manufacturing capabilities'}
      className="relative border-b border-hairline bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop: full-width adaptive negative-space composition */}
      <div className="relative hidden md:block md:min-h-[540px] lg:min-h-[600px]">
        {slides.map((s, idx) => (
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
              className={`mt-3 text-4xl font-semibold leading-[1.15] tracking-tight lg:text-5xl ${
                isLight ? 'text-ink' : 'text-white'
              }`}
            >
              {slide.headline}
            </h1>
            {'highlights' in slide && slide.highlights?.length ? (
              <ul
                className={`mt-4 space-y-2 text-base leading-relaxed ${
                  isLight ? 'text-body' : 'text-slate-100'
                }`}
              >
                {slide.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className={`mt-2.5 size-1.5 shrink-0 rounded-full ${
                        isLight ? 'bg-crimson' : 'bg-red-300'
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className={`mt-4 text-base leading-relaxed ${
                  isLight ? 'text-body' : 'text-slate-100'
                }`}
              >
                {slide.description}
              </p>
            )}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={withLocale(slide.ctaHref, locale)}
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
                href={withLocale(slide.secondaryHref, locale)}
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
            src={'mobileImage' in slide && slide.mobileImage ? slide.mobileImage : slide.image}
            alt={slide.headline}
            className={`h-full w-full object-cover ${'mobileImage' in slide && slide.mobileImage ? 'object-center' : slide.objectPos}`}
          />
        </div>
        <div className={`px-5 py-7 ${isLight ? 'bg-white text-ink' : 'bg-navy text-white'}`}>
          <p className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${isLight ? 'text-crimson' : 'text-red-300'}`}>
            {slide.eyebrow}
          </p>
          <h1 className={`mt-2 text-2xl font-semibold leading-snug ${isLight ? 'text-ink' : 'text-white'}`}>
            {slide.headline}
          </h1>
          {'highlights' in slide && slide.highlights?.length ? (
            <ul className={`mt-3 space-y-1.5 text-sm leading-relaxed ${isLight ? 'text-body' : 'text-slate-200'}`}>
              {slide.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className={`mt-2 size-1.5 shrink-0 rounded-full ${
                      isLight ? 'bg-crimson' : 'bg-red-300'
                    }`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`mt-3 text-sm leading-relaxed ${isLight ? 'text-body' : 'text-slate-200'}`}>
              {slide.description}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href={withLocale(slide.ctaHref, locale)}
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
          <div className="flex items-center gap-2" role="tablist" aria-label={locale === 'zh' ? '轮播图切换' : 'Banner slides'}>
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === index}
                aria-label={`${locale === 'zh' ? '第' : 'Slide '} ${idx + 1}: ${s.eyebrow}`}
                onClick={() => setIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === index ? 'w-8 bg-navy' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
            <span className="ml-2 font-mono text-xs text-body">
              0{index + 1} / 0{slides.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              aria-label={locale === 'zh' ? '上一张' : 'Previous slide'}
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-ink hover:border-navy hover:text-navy"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? (locale === 'zh' ? '播放轮播' : 'Play slideshow') : (locale === 'zh' ? '暂停轮播' : 'Pause slideshow')}
              className="flex size-8 items-center justify-center rounded-full border border-hairline text-ink hover:border-navy hover:text-navy"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              aria-label={locale === 'zh' ? '下一张' : 'Next slide'}
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
