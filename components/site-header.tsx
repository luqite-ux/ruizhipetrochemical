'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Globe, Menu } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getLocaleFromPathname, getNavItems, stripLocale, withLocale, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

function isActive(basePathname: string, href: string) {
  return href === '/' ? basePathname === '/' : basePathname.startsWith(href)
}

function LanguageSwitcher({
  locale,
  basePathname,
  onSwitch,
  className,
}: {
  locale: Locale
  basePathname: string
  onSwitch?: () => void
  className?: string
}) {
  const enHref = basePathname
  const zhHref = withLocale(basePathname, 'zh')

  return (
    <div
      role="group"
      aria-label={locale === 'zh' ? '切换语言' : 'Language switcher'}
      className={cn(
        'inline-flex items-center rounded-full border border-hairline bg-alabaster/90 p-0.5 text-xs font-semibold',
        className,
      )}
    >
      <Globe className="ml-2 mr-1 hidden size-3.5 text-navy sm:inline-block" aria-hidden />
      <Link
        href={enHref}
        onClick={onSwitch}
        hrefLang="en"
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          locale === 'en'
            ? 'bg-navy text-white shadow-2xs'
            : 'text-body hover:text-navy',
        )}
      >
        EN
      </Link>
      <Link
        href={zhHref}
        onClick={onSwitch}
        hrefLang="zh"
        className={cn(
          'rounded-full px-2.5 py-1 transition-colors',
          locale === 'zh'
            ? 'bg-navy text-white shadow-2xs'
            : 'text-body hover:text-navy',
        )}
      >
        中文
      </Link>
    </div>
  )
}

export function SiteHeader({ initialLocale = 'en' }: { initialLocale?: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const locale: Locale = pathname ? getLocaleFromPathname(pathname) : initialLocale
  const basePathname = stripLocale(pathname || '/')
  const navItems = getNavItems(locale)

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-3 px-4 sm:gap-5 sm:px-8 lg:h-20">
        <BrandLogo heightClass="h-12 sm:h-16 lg:h-[4.25rem]" locale={locale} />

        <nav aria-label={locale === 'zh' ? '主导航' : 'Primary'} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active = isActive(basePathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={withLocale(item.href, locale)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium text-body transition-colors hover:text-navy',
                      active &&
                        'text-navy after:absolute after:inset-x-2.5 after:-bottom-[1.3rem] after:h-0.5 after:bg-crimson',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher locale={locale} basePathname={basePathname} />
          <Button
            asChild
            className="hidden rounded-full bg-navy px-4 text-white hover:bg-navy/90 sm:inline-flex"
          >
            <Link href={withLocale('/contact#inquiry-rfq', locale)}>
              {locale === 'zh' ? '获取报价' : 'Request a Quote'}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label={locale === 'zh' ? '打开导航菜单' : 'Open menu'}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,22rem)] bg-white">
              <SheetHeader>
                <SheetTitle className="eyebrow text-crimson">
                  {locale === 'zh' ? '导航菜单' : 'Menu'}
                </SheetTitle>
              </SheetHeader>
              <nav aria-label={locale === 'zh' ? '移动端导航' : 'Mobile'} className="px-4">
                <ul className="flex flex-col">
                  {navItems.map((item) => {
                    const active = isActive(basePathname, item.href)
                    return (
                      <li key={item.href} className="border-b border-hairline">
                        <Link
                          href={withLocale(item.href, locale)}
                          onClick={() => setOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center justify-between py-4 text-lg font-medium text-ink',
                            active && 'text-navy',
                          )}
                        >
                          {item.label}
                          {active && (
                            <span aria-hidden className="size-2 rounded-full bg-crimson" />
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <Button
                  asChild
                  className="mt-6 w-full rounded-full bg-navy text-white hover:bg-navy/90"
                >
                  <Link href={withLocale('/contact#inquiry-rfq', locale)} onClick={() => setOpen(false)}>
                    {locale === 'zh' ? '获取技术报价' : 'Request a Quote'}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
