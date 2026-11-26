import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { CATEGORIES } from '@/lib/catalog'
import { COMPANY, NAV_ITEMS } from '@/lib/site'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline bg-alabaster">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <BrandLogo heightClass="h-14" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-body">
            Direct source factory for petrochemical pressure vessels, storage tanks,
            heat exchangers, columns and reactors — design, fabrication and site
            installation.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-ink">Company</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-body hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Equipment categories">
          <h2 className="eyebrow text-ink">Equipment</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="text-body hover:text-navy"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-ink">Contact</h2>
          <ul className="mt-4 space-y-4 text-sm text-body">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <a href={COMPANY.phoneHref} className="font-mono hover:text-navy">
                {COMPANY.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-navy">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <span>{COMPANY.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-body sm:px-8">
          © {currentYear} Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
