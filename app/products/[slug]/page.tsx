import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { ProductGalleryClient } from '@/components/product-gallery-client'
import { RfqForm } from '@/components/rfq-form'
import { getProductBySlug, getProducts } from '@/lib/supabase'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Equipment Not Found' }
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [product, allProducts] = await Promise.all([getProductBySlug(slug), getProducts()])
  if (!product) notFound()

  const related = allProducts
    .filter((p) => p.category_slug === product.category_slug && p.slug !== product.slug)
    .slice(0, 3)

  return (
    <div className="bg-white">
      <div className="border-b border-hairline bg-alabaster/70">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <Link
            href={`/products?category=${encodeURIComponent(product.category_slug)}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-crimson"
          >
            <ArrowLeft className="size-3.5" /> Back to {product.category}
          </Link>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <ProductGalleryClient images={product.gallery} name={product.name} />

        <div>
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
            {product.model} · {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-body">{product.description}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-white">
            <div className="border-b border-hairline bg-alabaster px-5 py-3">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                Technical Specifications & Engineering Parameters
              </h2>
            </div>
            <dl className="divide-y divide-hairline">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-[1fr_1.35fr] gap-4 px-5 py-3 text-sm">
                  <dt className="font-medium text-body">{key}</dt>
                  <dd className="font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="mt-6 grid gap-2 text-xs text-ink sm:grid-cols-2">
            {[
              'Direct Source Factory (Xuyi, Jiangsu)',
              'Technical Datasheets & NDT Records',
              'OEM / ODM Custom Drawings Accepted',
              'Third-Party Pre-Shipment Inspection',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="size-4 shrink-0 text-navy" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Product-Scoped Inquiry Section */}
      <section className="border-y border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
              Equipment Inquiry
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
              Request Specifications & Quotation for {product.name}
            </h2>
          </div>
          <RfqForm
            captchaScope={`product-detail-${product.slug}`}
            defaultProduct={`${product.name} (${product.model})`}
            sourcePage={`/products/${product.slug}`}
          />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 className="text-xl font-semibold text-ink">Related {product.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-white hover:border-navy/40 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[11px] font-semibold text-crimson">{item.model}</span>
                  <h3 className="mt-1 text-base font-semibold text-ink group-hover:text-navy">{item.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy">
                    View Details <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
