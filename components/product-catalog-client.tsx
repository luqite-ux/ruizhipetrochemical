'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { LiveCategory, LiveProduct } from '@/lib/supabase'

interface Props {
  categories: LiveCategory[]
  products: LiveProduct[]
  initialCategory?: string
}

export function ProductCatalogClient({ categories, products, initialCategory = '' }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCat = searchParams.get('category') || initialCategory
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      if (activeCat && p.category_slug !== activeCat) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    })
  }, [products, activeCat, query])

  const selectCategory = (slug: string) => {
    if (!slug) router.push('/products', { scroll: false })
    else router.push(`/products?category=${encodeURIComponent(slug)}`, { scroll: false })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      {/* Category Filter Bar + Search */}
      <div className="flex flex-col gap-5 border-b border-hairline pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Equipment categories">
          <button
            type="button"
            onClick={() => selectCategory('')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              !activeCat
                ? 'bg-navy text-white'
                : 'border border-hairline bg-white text-body hover:border-navy hover:text-navy'
            }`}
          >
            All Equipment ({products.length})
          </button>
          {categories.map((c) => {
            const count = products.filter((p) => p.category_slug === c.slug).length
            const isSel = activeCat === c.slug
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => selectCategory(c.slug)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  isSel
                    ? 'bg-navy text-white'
                    : 'border border-hairline bg-white text-body hover:border-navy hover:text-navy'
                }`}
              >
                {c.name} ({count})
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-body" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search model or spec..."
            aria-label="Search equipment"
            className="w-full rounded-full border border-hairline bg-alabaster py-2 pr-4 pl-10 text-sm text-ink focus:border-navy focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prod) => {
          const topSpecs = Object.entries(prod.specs || {}).slice(0, 3)
          return (
            <Link
              key={prod.slug}
              href={`/products/${prod.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-alabaster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image_url}
                  alt={prod.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full border border-hairline bg-white/95 px-3 py-1 font-mono text-[11px] font-semibold text-navy">
                  {prod.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs font-semibold text-crimson">{prod.model}</span>
                <h2 className="mt-1 text-lg font-semibold text-ink group-hover:text-navy">
                  {prod.name}
                </h2>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-body">{prod.description}</p>
                <dl className="mt-4 space-y-1.5 border-t border-hairline pt-4 text-xs">
                  {topSpecs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <dt className="text-body">{k}</dt>
                      <dd className="truncate font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-semibold text-navy">
                  View Engineering Parameters <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-hairline bg-alabaster p-12 text-center">
          <p className="text-base font-semibold text-ink">No matching equipment found.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              selectCategory('')
            }}
            className="mt-4 rounded-full bg-navy px-5 py-2 text-xs font-semibold text-white"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
