import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { getCategoriesNav, getCompany, getNavItems, withLocale, type Locale } from '@/lib/i18n'

export function SiteFooter({ locale = 'en' }: { locale?: Locale }) {
  const currentYear = new Date().getFullYear()
  const company = getCompany(locale)
  const navItems = getNavItems(locale)
  const categories = getCategoriesNav(locale)

  return (
    <footer className="border-t border-hairline bg-alabaster">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.8fr_1fr_1.55fr]">
        <div>
          <BrandLogo heightClass="h-14" locale={locale} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-body">
            {locale === 'zh'
              ? '专注石油化工压力容器、大型储罐、换热器、精馏塔与反应釜的源头制造工厂——集设计、制造与现场安装于一体。'
              : 'Direct source factory for petrochemical pressure vessels, storage tanks, heat exchangers, columns and reactors — design, fabrication and site installation.'}
          </p>
        </div>

        <nav aria-label={locale === 'zh' ? '页脚导航' : 'Footer'}>
          <h2 className="eyebrow text-ink">{locale === 'zh' ? '网站导航' : 'Company'}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={withLocale(item.href, locale)} className="text-body hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={locale === 'zh' ? '产品分类' : 'Equipment categories'}>
          <h2 className="eyebrow text-ink">{locale === 'zh' ? '核心装备' : 'Equipment'}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={withLocale(`/products?category=${c.slug}`, locale)}
                  className="text-body hover:text-navy"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-ink">{locale === 'zh' ? '联系方式' : 'Contact'}</h2>
          <ul className="mt-4 space-y-4 text-sm text-body">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <a href={company.phoneHref} className="font-mono hover:text-navy">
                {company.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <a href={`mailto:${company.email}`} className="whitespace-nowrap hover:text-navy">
                {company.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden />
              <span>{company.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-body sm:px-8">
          {locale === 'zh'
            ? `© ${currentYear} 江苏锐志石化工程有限公司 版权所有。`
            : `© ${currentYear} Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. All rights reserved.`}
        </p>
      </div>
    </footer>
  )
}
