import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import {
  getCapabilities,
  getEquipmentGroup,
  getEquipmentTitle,
  getFacilityCaption,
  withLocale,
} from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'
import { R2_EQUIPMENT, R2_FACILITY } from '@/lib/r2-assets'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '制造实力',
      description: '江苏盱眙 22,000 m²（33 亩）石化装备制造基地，配备 50/10 吨行车、数控光纤激光切割、重型液压卷板、自动埋弧焊与抛丸喷砂系统。',
    }
  }
  return {
    title: 'Manufacturing Facility',
    description:
      '22,000 m² (33 mu) Xuyi petrochemical equipment manufacturing base with 50/10t overhead bridge cranes, CNC fiber laser cutting, hydraulic plate rolling, submerged-arc welding, and shot blasting.',
  }
}

export default async function ManufacturingPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const capabilities = getCapabilities(locale)
  const fabEquipment = R2_EQUIPMENT.filter((e) => e.group !== 'Quality & NDT')

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '盱眙现代化制造基地' : 'Xuyi Manufacturing Base'}
        title={isZh ? '22,000 m² 一体化重型制造与装配工厂' : '22,000 m² Integrated Fabrication & Assembly Facility'}
        description={
          isZh
            ? '位于盱眙经济开发区的 33 亩自建厂区，具备重型筒体卷制、数控激光下料、自动埋弧焊、抛丸喷砂及出厂水压试验全流程制造能力。'
            : 'Purpose-built 33-mu production campus in Xuyi Economic Development Zone supporting heavy shell rolling, CNC blanking, submerged-arc welding, shot blasting, and pre-shipment hydrostatic testing.'
        }
      />

      {/* Core Fabrication Capabilities */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, idx) => (
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
              eyebrow={isZh ? '厂区实景' : 'Production Campus'}
              title={isZh ? '研发大楼、航拍全景与重型制造车间' : 'R&D Building, Aerial Plant Layout & Heavy Fabrication Bays'}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {R2_FACILITY.map((f, idx) => {
              const cap = getFacilityCaption(f.slug, f.caption, locale)
              return (
                <Reveal key={f.slug} index={idx}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-alabaster">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.url} alt={cap} className="h-full w-full object-cover" />
                    </div>
                    <figcaption className="p-4 text-sm font-medium text-ink">{cap}</figcaption>
                  </figure>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Workshop Fabrication Machinery */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={isZh ? '加工制造装备' : 'Fabrication Machinery'}
            title={isZh ? '下料、卷板、铣边、自动焊接与表面处理设备' : 'Cutting, Rolling, Milling, Welding & Surface Preparation Equipment'}
            description={
              isZh
                ? '自有重型钢板成型、坡口铣边、自动埋弧焊及喷砂抛丸除锈全套生产装备。'
                : 'In-house heavy plate forming, beveling, automated submerged-arc welding, and abrasive shot-blasting equipment.'
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fabEquipment.map((eq, idx) => {
            const title = getEquipmentTitle(eq.slug, eq.title, locale)
            const group = getEquipmentGroup(eq.group, locale)
            return (
              <Reveal key={eq.slug} index={idx}>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xs">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={eq.url} alt={title} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="flex flex-1 flex-col p-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-crimson">
                      {group}
                    </span>
                    <span className="mt-1 text-sm font-semibold text-ink">{title}</span>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={withLocale('/quality', locale)}
            className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy/90"
          >
            {isZh ? '查看质量控制与无损检测中心' : 'Inspect Quality Control & NDT Lab'}
          </Link>
        </div>
      </section>
    </div>
  )
}
