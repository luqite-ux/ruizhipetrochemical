import type { MetadataRoute } from 'next'
import { getArticles, getProducts } from '@/lib/supabase'

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ruizhipetrochemicalequipment.com').replace(/\/$/, '')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/products', '/projects', '/manufacturing', '/quality', '/about', '/news', '/contact']
  const [products, articles] = await Promise.all([getProducts(), getArticles()])
  const now = new Date()

  const enStatic = staticRoutes.map((r) => ({
    url: `${BASE}${r || '/'}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 1 : 0.8,
  }))
  const zhStatic = staticRoutes.map((r) => ({
    url: `${BASE}/zh${r}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: r === '' ? 0.9 : 0.75,
  }))
  const enProducts = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  const zhProducts = products.map((p) => ({
    url: `${BASE}/zh/products/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))
  const enArticles = articles.map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  const zhArticles = articles.map((a) => ({
    url: `${BASE}/zh/news/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }))

  return [...enStatic, ...zhStatic, ...enProducts, ...zhProducts, ...enArticles, ...zhArticles]
}
