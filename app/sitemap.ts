import type { MetadataRoute } from 'next'
import { getArticles, getProducts } from '@/lib/supabase'

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ruizhipetrochemicalequipment.com').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/products', '/projects', '/manufacturing', '/quality', '/about', '/news', '/contact']
  const [products, articles] = await Promise.all([getProducts(), getArticles()])
  const now = new Date()

  return [
    ...staticRoutes.map((r) => ({ url: `${BASE}${r || '/'}`, lastModified: now, changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${BASE}/products/${p.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...articles.map((a) => ({ url: `${BASE}/news/${a.slug}`, lastModified: a.published_at ? new Date(a.published_at) : now, changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]
}
