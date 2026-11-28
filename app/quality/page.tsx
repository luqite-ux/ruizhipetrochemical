import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CertificateShowcase } from '@/components/certificate-showcase'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { getEquipmentGroup, getEquipmentTitle } from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'
import { R2_EQUIPMENT } from '@/lib/r2-assets'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '质量与资质认证',
      description: '独立展示 D 级压力容器制造许可证、GC2 工业管道安装许可证、安全生产许可证、石油化工/机电施工总承包贰级资质证书及营业执照，以及直读光谱仪、无损检测与精密计量检测仪器。',
    }
  }
  return {
    title: 'Quality & Certifications',
    description:
      'Individual display of Class D Pressure Vessel License, GC2 Industrial Piping License, Work Safety License, Grade II Petrochemical & Electromechanical Construction Qualification Certificate, and Business License, plus PMI spectrometer, NDT, and precision dimensional inspection equipment.',
  }
}

export default async function QualityPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const ndtEquipment = R2_EQUIPMENT.filter((e) => e.group === 'Quality & NDT')

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '质量管理与资质认证' : 'Quality Assurance & Credentials'}
        title={isZh ? '法定工程资质与全流程无损检测' : 'Individual Qualifications & Non-Destructive Inspection'}
        description={
          isZh
            ? '每台压力容器、换热器与精馏塔出厂前均严格执行合金材质复检、焊缝无损检测（NDT）、几何尺寸检验及水压试验。'
            : 'Every pressure vessel, heat exchanger, and distillation column undergoes alloy material verification, weld NDT testing, dimensional inspection, and hydrostatic pressure testing prior to dispatch.'
        }
      />

      {/* Individual Qualification Certificates */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={isZh ? '官方资质文件' : 'Official Statutory Credentials'}
            title={isZh ? '独立资质证书展示' : 'Individual Qualification Certificates'}
            description={isZh ? '点击任意证书卡片可放大查看高清原件。' : 'Click any certificate to inspect the full-resolution original document.'}
          />
        </Reveal>
        <div className="mt-10">
          <CertificateShowcase locale={locale} />
        </div>
      </section>

      {/* Quality & NDT Inspection Instruments */}
      <section className="border-t border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={isZh ? '检验检测仪器' : 'Inspection & Testing Instruments'}
              title={isZh ? '材质光谱分析、无损检测与精密计量' : 'Material Spectroscopy, NDT & Precision Metrology'}
              description={
                isZh
                  ? '全制造工序留存完整质量追溯记录，并全面配合第三方驻厂监检。'
                  : 'Documented quality management records and third-party inspection support across every stage of fabrication.'
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ndtEquipment.map((eq, idx) => {
              const title = getEquipmentTitle(eq.slug, eq.title, locale)
              const group = getEquipmentGroup(eq.group, locale)
              return (
                <Reveal key={eq.slug} index={idx}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xs">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={eq.url} alt={title} className="h-full w-full object-cover" />
                    </div>
                    <figcaption className="p-4">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-crimson">
                        {group}
                      </span>
                      <p className="mt-1 text-sm font-semibold text-ink">{title}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
