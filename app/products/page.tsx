import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHero } from '@/components/page-hero'
import { ProductCatalogClient } from '@/components/product-catalog-client'
import { getCategories, getProducts } from '@/lib/supabase'
import { getServerLocale } from '@/lib/server-locale'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '产品中心',
      description: '浏览江苏锐志石化 7 大核心类别、28 款非标定制石化工艺装备：储罐与压力容器、反应釜、精馏塔、换热器、冷凝器、环保水处理及过滤设备。',
    }
  }
  return {
    title: 'Equipment Catalog',
    description:
      'Browse 28 custom petrochemical equipment models across 7 categories: storage tanks, pressure vessels, reactors, distillation columns, heat exchangers, condensers, and filtration units.',
  }
}

export default async function ProductsPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const [categories, products] = await Promise.all([getCategories(locale), getProducts(locale)])

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '产品中心' : 'Equipment Catalog'}
        title={isZh ? '非标定制石化工艺装备目录' : 'Engineered Petrochemical Process Equipment'}
        description={
          isZh
            ? '覆盖七大专业制造类别。每台压力容器、换热器、精馏塔及反应釜均按买方工艺参数与图纸非标定制。'
            : 'Filter across seven specialized fabrication categories. Every vessel, heat exchanger, column, and reactor is built to client process parameters and drawings.'
        }
      />
      <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-16 text-sm text-body">{isZh ? '正在加载产品目录...' : 'Loading equipment catalog...'}</div>}>
        <ProductCatalogClient categories={categories} products={products} locale={locale} />
      </Suspense>
    </div>
  )
}
