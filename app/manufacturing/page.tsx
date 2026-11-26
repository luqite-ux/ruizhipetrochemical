import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { CAPABILITIES } from '@/lib/site'
import { R2_EQUIPMENT, R2_FACILITY } from '@/lib/r2-assets'

export const metadata: Metadata = {
  title: 'Manufacturing Facility',
  description:
    '22,000 m² (33 mu) Xuyi petrochemical equipment manufacturing base with 50/10t overhead bridge cranes, CNC fiber laser cutting, hydraulic plate rolling, submerged-arc welding, and shot blasting.',
}

export default function ManufacturingPage() {
  const fabEquipment = R2_EQUIPMENT.filter((e) => e.group !== 'Quality & NDT')

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Xuyi Manufacturing Base"
        title="22,000 m² Integrated Fabrication & Assembly Facility"
        description="Purpose-built 33-mu production campus in Xuyi Economic Development Zone supporting heavy shell rolling, CNC blanking, submerged-arc welding, shot blasting, and pre-shipment hydrostatic testing."
      />

      {/* Core Fabrication Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, idx) => (
            <Reveal key={cap.title} index={idx}>
              <div className="flex h-full flex-col rounded-2xl border border-hairline bg-alabaster/70 p-6">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
                  {cap.metric}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-ink">{cap.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-body">{cap.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5 Optimized Company Facility Photos */}
      <section className="border-y border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Production Campus"
              title="R&D Building, Aerial Plant Layout & Heavy Fabrication Bays"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {R2_FACILITY.map((f, idx) => (
              <Reveal key={f.slug} index={idx}>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.url} alt={f.caption} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="p-4 text-sm font-medium text-ink">{f.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Fabrication Machinery */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Fabrication Machinery"
            title="Cutting, Rolling, Milling, Welding & Surface Preparation Equipment"
            description="In-house heavy plate forming, beveling, automated submerged-arc welding, and abrasive shot-blasting equipment."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fabEquipment.map((eq, idx) => (
            <Reveal key={eq.slug} index={idx}>
              <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xs">
                <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={eq.url} alt={eq.title} className="h-full w-full object-cover" />
                </div>
                <figcaption className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-crimson">
                    {eq.group}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-ink">{eq.title}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/quality"
            className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy/90"
          >
            Inspect Quality Control & NDT Lab
          </Link>
        </div>
      </section>
    </div>
  )
}
