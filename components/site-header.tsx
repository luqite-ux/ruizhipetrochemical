'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { NAV_ITEMS } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
        <BrandLogo heightClass="h-14 sm:h-16 lg:h-[4.25rem]" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-md px-3 py-2 text-sm font-medium text-body transition-colors hover:text-navy',
                      active &&
                        'text-navy after:absolute after:inset-x-3 after:-bottom-[1.3rem] after:h-0.5 after:bg-crimson',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="hidden rounded-full bg-navy px-5 text-white hover:bg-navy/90 sm:inline-flex"
          >
            <Link href="/contact#inquiry-rfq">Request a Quote</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,22rem)] bg-white">
              <SheetHeader>
                <SheetTitle className="eyebrow text-crimson">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="px-4">
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href} className="border-b border-hairline">
                        <Link
                          href={item.href}
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
                  <Link href="/contact#inquiry-rfq" onClick={() => setOpen(false)}>
                    Request a Quote
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
