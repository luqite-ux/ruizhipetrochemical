import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import {
  getDepartmentValues,
  getFacilityCaption,
  getMetrics,
  withLocale,
} from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'
import { R2_FACILITY } from '@/lib/r2-assets'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '关于我们',
      description:
        '一家专注于压力容器与石化设备设计制造，并以此为内核驱动石油化工、机电工程总承包的综合性服务商，坐落江苏盱眙 22,000 m² 现代化制造基地。',
    }
  }
  return {
    title: 'About Us',
    description:
      'A comprehensive service provider focused on pressure vessel and petrochemical equipment design and manufacturing, driving petrochemical and electromechanical EPC general contracting from our 22,000 m² Xuyi base.',
  }
}

export default async function AboutPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const metrics = getMetrics(locale)
  const deptValues = getDepartmentValues(locale)
  const rdCaption = getFacilityCaption(R2_FACILITY[0].slug, R2_FACILITY[0].caption, locale)

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '关于锐志石化' : 'About Ruizhi Petrochemical'}
        title={isZh ? '关于我们' : 'About Us'}
        description={
          isZh
            ? '一家专注于压力容器与石化设备设计制造，并以此为内核驱动石油化工、机电工程总承包的综合性服务商'
            : 'A comprehensive service provider focused on the design and manufacturing of pressure vessels and petrochemical equipment, driving petrochemical and electromechanical EPC general contracting from this manufacturing core.'
        }
      />

      {/* Metrics */}
      <section className="border-b border-hairline bg-alabaster/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {metrics.map((m, idx) => (
            <Reveal key={m.label} index={idx} className="px-6 py-8 sm:px-8">
              <p className="font-mono text-3xl font-semibold text-navy">{m.value}</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{m.label}</p>
              <p className="text-xs text-body">{m.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Company Narrative + Photo */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
            {isZh ? '源头制造工厂' : 'Direct Source Factory'}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">
            {isZh ? '以压力容器与石化设备设计制造为内核，延伸总包交付' : 'Anchored in Pressure Vessel Fabrication, Extended to Turnkey Delivery'}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {isZh
              ? '江苏锐志石化工程有限公司坐落于江苏省淮安市盱眙县经济开发区，是一家专注于压力容器与石化设备设计制造，并以此为内核驱动石油化工、机电工程总承包的综合性服务商，长期服务于石油化工、精细化工、能源、冶金及环保水处理等领域。'
              : "Headquartered in the Economic Development Zone of Xuyi County, Huai'an, Jiangsu Province, Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. is a comprehensive service provider focused on pressure vessel and petrochemical equipment design and manufacturing, driving petrochemical and electromechanical EPC general contracting across petrochemical, fine chemical, energy, metallurgical, and environmental protection sectors."}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-body">
            {isZh
              ? '公司持有石油化工工程施工总承包三级与机电工程施工总承包三级资质，拥有 33 亩（22,000 平方米）现代化制造基地，将重型装备制造与现场吊装总包有机结合，有效降低总包方与业主方的沟通成本并缩短项目建设周期。'
              : 'Holding Grade III General Contracting qualifications for both Petrochemical Engineering Construction and Mechanical & Electrical Engineering Construction, we operate a 33-mu (22,000 m²) manufacturing base that unites equipment fabrication with heavy field installation — reducing coordination friction and project lead times for EPC contractors and plant owners.'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={withLocale('/projects', locale)}
              className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {isZh ? '查看 37+ 项工程业绩' : 'View 37+ Reference Projects'}
            </Link>
            <Link
              href={withLocale('/quality', locale)}
              className="rounded-full border border-hairline bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:border-navy"
            >
              {isZh ? '查看官方资质证书' : 'View Individual Certificates'}
            </Link>
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-alabaster shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={R2_FACILITY[0].url}
              alt={rdCaption}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Corporate Values */}
      <section className="border-t border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={isZh ? '企业文化与管理体系' : 'Corporate Culture'}
              title={isZh ? '四大核心部门制造与执行标准' : 'Four-Department Manufacturing & Execution Standards'}
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deptValues.map((v, idx) => (
              <Reveal key={v.dept} index={idx}>
                <div className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 shadow-2xs">
                  <span className="font-mono text-xs font-semibold text-crimson">0{idx + 1}</span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{v.dept}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
