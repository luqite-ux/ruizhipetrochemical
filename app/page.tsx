import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { HeroCarousel } from '@/components/hero-carousel'
import { ThreeVesselStudio } from '@/components/three-vessel-studio'
import { CertificateShowcase } from '@/components/certificate-showcase'
import { RfqForm } from '@/components/rfq-form'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCategories, getProducts } from '@/lib/supabase'
import { COMPANY, FAQS, METRICS } from '@/lib/site'
import { MAJOR_CLIENTS } from '@/lib/projects-data'
import { R2_CASES, R2_FACILITY } from '@/lib/r2-assets'

export const revalidate = 60

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()])
  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 8)
  const displayProducts = featuredProducts.length ? featuredProducts : products.slice(0, 8)

  const categoryCards = categories.map((cat) => {
    const matching = products.filter((p) => p.category_slug === cat.slug)
    return {
      ...cat,
      count: matching.length,
      cover: matching[0]?.image_url || R2_FACILITY[2].url,
    }
  })

  const flagshipCases = [
    {
      title: "Sinopec Huai'an Qihu Oil Depot Tank Farm",
      client: 'Sinopec Jiangsu Petroleum Branch',
      scope: '8×5,000 m³, 4×3,000 m³ & 2×1,000 m³ storage tanks, process piping, fire protection & instrumentation',
      image: R2_CASES[3].url,
    },
    {
      title: '100,000 t/yr Propylene Oxide Main Reaction Unit',
      client: 'Jiangsu Fuqiang New Materials Co., Ltd.',
      scope: 'Heavy rigging of 3×386-ton main reactors, multi-level steel structures, piping & anti-corrosion',
      image: R2_CASES[4].url,
    },
    {
      title: 'Multi-Column Chlorination Tower Pilot Unit',
      client: 'Gansu Research Institute of Chemical Industry',
      scope: 'Skid-mounted 3-column chlorination reactor & feed system engineered for continuous pilot operation',
      image: R2_CASES[1].url,
    },
    {
      title: '59,600 t/yr Lithium Battery Additive Complete Unit',
      client: 'Jiangsu Hankang Electronic Materials Co., Ltd.',
      scope: 'Complete process equipment installation, piping, structural steel, electrical & instrumentation',
      image: R2_CASES[8].url,
    },
  ]

  return (
    <div className="bg-white">
      {/* 1. Adaptive 3-Slide Hero Carousel */}
      <HeroCarousel />

      {/* 2. Verified Engineering & Scale Metrics */}
      <section id="key-metrics" className="border-b border-hairline bg-alabaster/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {METRICS.map((m, idx) => (
            <Reveal key={m.label} index={idx} className="px-6 py-8 sm:px-8 sm:py-10">
              <p className="font-mono text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-0.5 text-xs text-body">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. Equipment Categories Matrix */}
      <section id="category-matrix" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Equipment Lineup"
              title="Seven Specialized Process Equipment Categories"
              description="Custom-fabricated carbon steel, stainless steel, and alloy process vessels engineered to your thermal, pressure, and installation specifications."
            />
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              View All {products.length} Models <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((cat, idx) => (
            <Reveal key={cat.slug} index={idx}>
              <Link
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-alabaster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.cover}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-semibold text-ink group-hover:text-navy">{cat.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4 font-mono text-xs text-body">
                    <span>{cat.count} {cat.count === 1 ? 'Model' : 'Models'}</span>
                    <span className="inline-flex items-center gap-1 font-sans font-medium text-navy">
                      Explore <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4. Interactive Light-Canvas Three.js 3D Petrochemical Equipment Cutaway Studio */}
      <section id="threejs-process-studio" className="border-y border-hairline bg-alabaster/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Interactive 3D Engineering"
              title="Inspect Internal Vessel & Heat Exchanger Geometry"
              description="Switch between distillation columns, helical-baffle shell-and-tube heat exchangers, agitated pressure reactors, and industrial storage tanks in our real-time Three.js studio."
            />
          </Reveal>
          <Reveal index={1} className="mt-10">
            <ThreeVesselStudio />
          </Reveal>
        </div>
      </section>

      {/* 5. Featured Engineered Equipment */}
      <section id="featured-equipment" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Featured Fabrication"
              title="Representative Process Vessels & Thermal Units"
              description="Direct workshop fabrication backed by material spectroscopy, NDT weld testing, and hydrostatic pressure verification."
            />
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              Browse Full Catalog <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((prod, idx) => {
            const topSpec = Object.entries(prod.specs || {}).slice(0, 2)
            return (
              <Reveal key={prod.slug} index={idx}>
                <Link
                  href={`/products/${prod.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-crimson">
                      {prod.model || prod.category}
                    </span>
                    <h3 className="mt-1.5 line-clamp-2 text-base font-semibold text-ink group-hover:text-navy">
                      {prod.name}
                    </h3>
                    <div className="mt-3 space-y-1 border-t border-hairline pt-3 text-xs text-body">
                      {topSpec.map(([k, v]) => (
                        <p key={k} className="truncate">
                          <span className="font-medium text-ink">{k}:</span> {v}
                        </p>
                      ))}
                    </div>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-semibold text-navy">
                      Technical Specs <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 6. Major Cooperating Clients & Flagship Engineering Projects */}
      <section id="client-projects-showcase" className="border-y border-hairline bg-alabaster/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Clients & Engineering Track Record"
                title="Trusted by Leading Petrochemical, Chemical & Energy Enterprises"
                description="Over 37 major equipment fabrication and plant installation contracts delivered across oil depots, refining complexes, fine chemicals, and environmental engineering."
              />
              <Link
                href="/projects"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
              >
                Explore All 37+ Projects <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* Cooperating Clients Grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {MAJOR_CLIENTS.slice(0, 12).map((client, idx) => (
              <Reveal key={client.name} index={idx}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-hairline bg-white px-4 py-3.5 shadow-2xs">
                  <Building2 className="mt-0.5 size-4 shrink-0 text-navy" />
                  <div>
                    <p className="text-sm font-semibold text-ink leading-snug">{client.name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-body">{client.sector}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 4 Flagship Project Case Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {flagshipCases.map((item, idx) => (
              <Reveal key={item.title} index={idx}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-mono text-[11px] font-semibold text-crimson">{item.client}</p>
                    <h3 className="mt-1.5 text-base font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-body">{item.scope}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Individual Qualification Certificates */}
      <section id="individual-certifications" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Official Credentials"
              title="Individual Engineering & Safety Qualifications"
              description="Each statutory contracting and work-safety qualification certificate is presented individually for direct procurement due diligence."
            />
            <Link
              href="/quality"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              Quality & NDT Lab <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal index={1} className="mt-10">
          <CertificateShowcase />
        </Reveal>
      </section>

      {/* 8. Xuyi 22,000 m² Manufacturing Base */}
      <section id="manufacturing-base" className="border-y border-hairline bg-alabaster/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="Manufacturing Base"
                title="22,000 m² (33 Mu) Xuyi Fabrication & Assembly Plant"
                description="Integrated R&D building, 50/10-ton overhead crane fabrication hall, CNC fiber laser cutting, hydraulic plate rolling, submerged-arc welding, and automated shot blasting."
              />
              <Link
                href="/manufacturing"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
              >
                Explore All 22 Workshop Machines <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={R2_FACILITY[1].url}
                  alt={R2_FACILITY[1].caption}
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="px-5 py-3.5 text-xs font-medium text-body">
                  {R2_FACILITY[1].caption}
                </figcaption>
              </figure>
            </Reveal>
            <Reveal index={1} className="md:col-span-5">
              <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={R2_FACILITY[2].url}
                  alt={R2_FACILITY[2].caption}
                  className="aspect-[16/10] h-full w-full object-cover md:aspect-auto md:h-[calc(100%-3rem)]"
                />
                <figcaption className="px-5 py-3.5 text-xs font-medium text-body">
                  {R2_FACILITY[2].caption}
                </figcaption>
              </figure>
            </Reveal>
            {[R2_FACILITY[0], R2_FACILITY[3], R2_FACILITY[4]].map((fac, idx) => (
              <Reveal key={fac.slug} index={idx + 2} className="md:col-span-4">
                <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fac.url} alt={fac.caption} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="px-4 py-3 text-xs font-medium text-body">{fac.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Procurement & Engineering FAQ */}
      <section id="buyer-faq" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Procurement Guide"
            title="Frequently Asked Engineering & Ordering Questions"
            description="Key ordering terms covering MOQ, OEM/ODM custom engineering, lead times, design life, and inspection documentation."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.slice(0, 3).map((item, idx) => (
              <AccordionItem key={item.q} value={`left-${idx}`} className="rounded-xl border border-hairline bg-white px-5">
                <AccordionTrigger className="text-left text-sm font-semibold text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-body">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.slice(3).map((item, idx) => (
              <AccordionItem key={item.q} value={`right-${idx}`} className="rounded-xl border border-hairline bg-white px-5">
                <AccordionTrigger className="text-left text-sm font-semibold text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-body">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 10. Balanced Contact & RFQ Section */}
      <section id="inquiry-rfq" className="border-t border-hairline bg-alabaster/80 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-crimson">
              Direct Engineering Desk
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Request a Technical Quotation
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body">{COMPANY.summary}</p>

            <div className="mt-6 space-y-3 rounded-2xl border border-hairline bg-white p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Official Phone</p>
                  <a href={COMPANY.phoneHref} className="font-mono text-sm font-semibold text-ink hover:text-navy">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Engineering Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-sm font-semibold text-ink hover:text-navy">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Manufacturing Base</p>
                  <p className="text-sm text-ink">{COMPANY.address}</p>
                </div>
              </div>
            </div>

            <ul className="mt-6 grid gap-2.5 text-xs text-body sm:grid-cols-2">
              {[
                'MOQ: 1 Engineered Unit',
                'Standard Lead Time: 30–45 Days',
                'OEM / ODM Custom Drawings Supported',
                'Third-Party Inspection & NDT Reports',
              ].map((pt) => (
                <li key={pt} className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="size-4 shrink-0 text-navy" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={1}>
            <RfqForm captchaScope="home-rfq" sourcePage="/" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
