import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { COMPANY } from '@/lib/site'
import { R2_BANNERS, R2_LOGO_URL } from '@/lib/r2-assets'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ruizhipetrochemicalequipment.com').replace(/\/$/, '')

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} | Petrochemical Pressure Vessels, Heat Exchangers & Distillation Columns`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description:
    'Source factory for petrochemical pressure vessels, storage tanks, heat exchangers, condensers, distillation columns and reactors. Design, fabrication and site installation from a 22,000 m² base in Xuyi, Jiangsu.',
  applicationName: COMPANY.shortName,
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  keywords: [
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
    siteName: COMPANY.name,
    title: COMPANY.name,
    description: 'Design, fabrication and site installation of petrochemical process equipment.',
    images: [{ url: R2_BANNERS[0] }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  alternateName: 'RZ Petrochemical Engineering',
  url: SITE_URL,
  logo: R2_LOGO_URL,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 19-8 Longshan Road, Economic Development Zone',
    addressLocality: "Xuyi County, Huai'an",
    addressRegion: 'Jiangsu',
    addressCountry: 'CN',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-background font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
