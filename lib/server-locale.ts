import { headers } from 'next/headers'
import type { Locale } from '@/lib/i18n'

export async function getServerLocale(): Promise<Locale> {
  const h = await headers()
  return h.get('x-locale') === 'zh' ? 'zh' : 'en'
}

export async function getServerPathname(): Promise<string> {
  const h = await headers()
  return h.get('x-pathname') || '/'
}
