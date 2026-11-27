import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PageHero } from '@/components/page-hero'
import { ProductCatalogClient } from '@/components/product-catalog-client'
import { getCategories, getProducts } from '@/lib/supabase'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Equipment Catalog',
  description:
    'Browse 28 custom petrochemical equipment models across 7 categories: storage tanks, pressure vessels, reactors, distillation columns, heat exchangers, condensers, and filtration units.',
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Equipment Catalog"
        title="Engineered Petrochemical Process Equipment"
        description="Filter across seven specialized fabrication categories. Every vessel, heat exchanger, column, and reactor is built to client process parameters and drawings."
      />
      <Suspense fallback={<div className="mx-auto max-w-7xl px-5 py-16 text-sm text-body">Loading equipment catalog...</div>}>
        <ProductCatalogClient categories={categories} products={products} />
      </Suspense>
    </div>
  )
}
