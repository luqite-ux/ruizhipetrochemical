import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { getCompany, stripLocale, withLocale } from '@/lib/i18n'
import { getServerLocale, getServerPathname } from '@/lib/server-locale'
import { R2_BANNERS, R2_LOGO_URL } from '@/lib/r2-assets'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ruizhipetrochemicalequipment.com').replace(/\/$/, '')

export async function generateMetadata(): Promise<Metadata> {
  const [locale, pathname] = await Promise.all([getServerLocale(), getServerPathname()])
  const company = getCompany(locale)
  const basePath = stripLocale(pathname)
  const enUrl = `${SITE_URL}${basePath === '/' ? '/' : basePath}`
  const zhUrl = `${SITE_URL}${withLocale(basePath, 'zh')}`
  const isZh = locale === 'zh'

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isZh
        ? `${company.name} | 石化压力容器、换热器与精馏塔源头工厂`
        : `${company.name} | Petrochemical Pressure Vessels, Heat Exchangers & Distillation Columns`,
      template: `%s | ${company.shortName}`,
    },
    description: isZh
      ? '江苏锐志石化工程有限公司专注石油化工压力容器、大型储罐、管壳式换热器、冷凝器、精馏塔与反应釜设计、制造与现场安装，坐落江苏盱眙 22,000 m² 现代化制造基地。'
      : 'Source factory for petrochemical pressure vessels, storage tanks, heat exchangers, condensers, distillation columns and reactors. Design, fabrication and site installation from a 22,000 m² base in Xuyi, Jiangsu.',
    applicationName: company.shortName,
    alternates: {
      canonical: isZh ? zhUrl : enUrl,
      languages: {
        en: enUrl,
        zh: zhUrl,
        'x-default': enUrl,
      },
    },
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
    },
    keywords: isZh
      ? ['压力容器厂家', '大型储罐制造', '管壳式换热器', '精馏塔', '工业冷凝器', '化工反应釜', '江苏锐志石化工程有限公司']
      : [
          'pressure vessel manufacturer',
          'storage tank fabrication',
          'shell and tube heat exchanger',
          'distillation column',
          'industrial condenser',
          'petrochemical reactor',
          'Jiangsu Ruizhi Petrochemical Engineering',
        ],
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      siteName: company.name,
      title: company.name,
      description: isZh
        ? '集石油化工压力容器、储罐、换热器、精馏塔及反应釜设计、制造与现场安装于一体的源头工厂。'
        : 'Design, fabrication and site installation of petrochemical process equipment.',
      images: [{ url: R2_BANNERS[0] }],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getServerLocale()
  const company = getCompany(locale)
  const isZh = locale === 'zh'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    alternateName: isZh ? 'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.' : 'RZ Petrochemical Engineering',
    url: isZh ? `${SITE_URL}/zh` : SITE_URL,
    logo: R2_LOGO_URL,
    email: company.email,
    telephone: company.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: isZh ? '经济开发区龙山路19-8号' : 'No. 19-8 Longshan Road, Economic Development Zone',
      addressLocality: isZh ? '淮安市盱眙县' : "Xuyi County, Huai'an",
      addressRegion: isZh ? '江苏省' : 'Jiangsu',
      addressCountry: 'CN',
    },
  }

  return (
    <html lang={isZh ? 'zh-CN' : 'en'} className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          {isZh ? '跳至正文内容' : 'Skip to content'}
        </a>
        <SiteHeader initialLocale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || '5e874773-b846-4fa2-ba06-56de93fb51c4')}`}
        />
      </body>
    </html>
  )
}
