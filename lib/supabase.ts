import { createClient } from '@supabase/supabase-js'

export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || ''
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function resolveI18n(
  map: Record<string, string> | null | undefined,
  fallback: string,
  locale = 'en',
  defaultLocale = 'en'
): string {
  if (map && typeof map === 'object') {
    if (map[locale]?.trim()) return map[locale].trim()
    if (map[defaultLocale]?.trim()) return map[defaultLocale].trim()
    const first = Object.values(map).find((v) => typeof v === 'string' && v.trim())
    if (first) return first.trim()
  }
  return fallback
}

export interface LiveCategory {
  id: string
  slug: string
  name: string
  sort_order: number
}

export interface LiveProduct {
  id: string
  slug: string
  name: string
  model: string
  category: string
  category_slug: string
  description: string
  specs: Record<string, string>
  image_url: string
  gallery: string[]
  is_featured: boolean
  sort_order: number
}

export interface LiveArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string | null
  published_at: string
}

export async function getCategories(locale = 'en'): Promise<LiveCategory[]> {
  const sb = getSupabaseClient()
  if (!sb || !TENANT_ID) return []
  const { data } = await sb
    .from('product_categories')
    .select('id, slug, name, name_en, name_i18n, sort_order')
    .eq('tenant_id', TENANT_ID)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  return (data || []).map((c: any) => ({
    id: c.id,
    slug: c.slug,
    name: resolveI18n(c.name_i18n, c.name_en || c.name, locale),
    sort_order: c.sort_order ?? 0,
  }))
}

export async function getProducts(locale = 'en'): Promise<LiveProduct[]> {
  const sb = getSupabaseClient()
  if (!sb || !TENANT_ID) return []
  const { data } = await sb
    .from('products')
    .select('id, slug, name, name_en, name_i18n, model, category, category_slug, description, description_en, description_i18n, specs, image_url, extra_data, sort_order')
    .eq('tenant_id', TENANT_ID)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  return (data || []).map((p: any) => {
    const gallery: string[] = Array.isArray(p.extra_data?.gallery) && p.extra_data.gallery.length
      ? p.extra_data.gallery
      : p.image_url ? [p.image_url] : []
    return {
      id: p.id,
      slug: p.slug,
      name: resolveI18n(p.name_i18n, p.name_en || p.name, locale),
      model: p.model || '',
      category: p.category || '',
      category_slug: p.category_slug || '',
      description: resolveI18n(p.description_i18n, p.description_en || p.description || '', locale),
      specs: (p.specs && typeof p.specs === 'object') ? p.specs : {},
      image_url: p.image_url || gallery[0] || '',
      gallery,
      is_featured: Boolean(p.extra_data?.is_featured),
      sort_order: p.sort_order ?? 0,
    }
  })
}

export async function getProductBySlug(slug: string, locale = 'en'): Promise<LiveProduct | null> {
  const all = await getProducts(locale)
  return all.find((p) => p.slug === slug) || null
}

export async function getArticles(locale = 'en'): Promise<LiveArticle[]> {
  const sb = getSupabaseClient()
  if (!sb || !TENANT_ID) return []
  const { data } = await sb
    .from('articles')
    .select('id, slug, title, title_i18n, excerpt, excerpt_i18n, content, content_i18n, featured_image, published_at, created_at')
    .eq('tenant_id', TENANT_ID)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  return (data || []).map((a: any) => ({
    id: a.id,
    slug: a.slug,
    title: resolveI18n(a.title_i18n, a.title || '', locale),
    excerpt: resolveI18n(a.excerpt_i18n, a.excerpt || '', locale),
    content: resolveI18n(a.content_i18n, a.content || '', locale),
    featured_image: a.featured_image || null,
    published_at: a.published_at || a.created_at || '',
  }))
}
