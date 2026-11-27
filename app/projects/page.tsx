import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, MapPin, Calendar } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import {
  getCaseCaption,
  getFabricationProjects,
  getInstallationTrackRecord,
  getMajorClients,
  withLocale,
} from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'
import { R2_CASES } from '@/lib/r2-assets'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '工程案例与合作客户',
      description: '查看江苏锐志石化累计交付的 37 项以上石化设备制造与装置安装工程业绩，长期合作中石化、海右石化、富强新材料、安道麦安邦与金陵亨斯迈等企业。',
    }
  }
  return {
    title: 'Projects & Clients',
    description:
      'Explore 37+ petrochemical equipment fabrication and plant installation projects delivered for Sinopec, Shandong Haiyou, Jiangsu Fuqiang, ADAMA Anpon, Datang Environmental, and Nanjing Jinling Huntsman.',
  }
}

export default async function ProjectsPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const clients = getMajorClients(locale)
  const fabProjects = getFabricationProjects(locale)
  const installRecords = getInstallationTrackRecord(locale)

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '工程交付实绩' : 'Engineering Track Record'}
        title={isZh ? '交付工程案例与合作客户' : 'Delivered Projects & Cooperating Clients'}
        description={
          isZh
            ? '从化工研究院定制中试反应器，到 101 米延迟焦化塔、386 吨环氧丙烷主反应器吊装及中石化 5,000 m³ 油库罐群。'
            : 'From custom pilot reactors for chemical research institutes to 101 m delayed coking towers, 386-ton propylene oxide reactors, and 5,000 m³ Sinopec tank farms.'
        }
      />

      {/* Enterprise Clients Roster */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={isZh ? '重点合作客户' : 'Cooperating Clients'}
            title={isZh ? '赢得 18 家以上大型石化、化工与能源企业信赖' : 'Trusted by 18+ Major Petrochemical, Chemical & Energy Enterprises'}
            description={
              isZh
                ? '与国有能源集团、上市化工龙头及专业化工研究院建立长期设备制造与现场安装合作关系。'
                : 'Long-term fabrication and field installation partnerships across state-owned energy groups, listed chemical leaders, and research institutes.'
            }
          />
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {clients.map((c, idx) => (
            <Reveal key={c.name} index={idx}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-hairline bg-alabaster/70 p-4">
                <Building2 className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="text-sm font-semibold text-ink">{c.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-body">{c.sector}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Authentic Project Photography */}
      <section className="border-y border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={isZh ? '现场与车间实拍' : 'Field & Workshop Installations'}
              title={isZh ? '代表性工程实景案例' : 'Photographic Case Studies'}
              description={
                isZh
                  ? '来自已交付化工、炼油与环保工程项目的真实制造及现场安装实拍。'
                  : 'Real fabrication and site erection photography from delivered chemical, refining, and environmental projects.'
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {R2_CASES.map((item, idx) => {
              const caption = getCaseCaption(item.slug, item.caption, locale)
              return (
                <Reveal key={item.slug} index={idx}>
                  <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.url} alt={caption} className="h-full w-full object-cover" />
                    </div>
                    <figcaption className="flex-1 p-5 text-sm font-medium leading-snug text-ink">
                      {caption}
                    </figcaption>
                  </figure>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recent Equipment Fabrication Projects */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={isZh ? '2023 – 2025 设备制造实绩' : '2023 – 2025 Equipment Fabrication'}
            title={isZh ? '近期定制工艺装置与反应器交付案例' : 'Recent Custom Process Unit & Reactor Deliveries'}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fabProjects.map((p, idx) => (
            <Reveal key={p.no} index={idx}>
              <article className="flex h-full flex-col rounded-2xl border border-hairline bg-white p-6 shadow-2xs">
                <span className="font-mono text-xs font-semibold text-crimson">{p.category}</span>
                <h3 className="mt-2 text-base font-semibold text-ink">{p.client}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{p.project}</p>
                <div className="mt-4 flex flex-wrap gap-4 border-t border-hairline pt-4 font-mono text-xs text-body">
                  <span className="inline-flex items-center gap-1"><Calendar className="size-3.5 text-navy" /> {p.period}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="size-3.5 text-navy" /> {p.location}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Complete Engineering Installation Track Record Table */}
      <section className="border-t border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={isZh ? '详细工程业绩清单' : 'Detailed Reference List'}
              title={isZh ? '主要石化与工业安装工程实绩一览' : 'Major Engineering Installation Track Record'}
              description={
                isZh
                  ? '精选多专业石化装置、储罐群、焦化塔及环保水处理工程安装业绩。'
                  : 'Selected multi-discipline petrochemical, tank farm, coking tower, and environmental engineering installation projects.'
              }
            />
          </Reveal>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-hairline bg-white shadow-xs">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-hairline bg-alabaster font-mono text-xs uppercase tracking-wider text-navy">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">{isZh ? '业主 / 客户单位' : 'Client / Owner'}</th>
                  <th className="px-5 py-3.5">{isZh ? '工程内容与范围' : 'Project Scope'}</th>
                  <th className="px-5 py-3.5">{isZh ? '施工周期' : 'Period'}</th>
                  <th className="px-5 py-3.5">{isZh ? '项目地点' : 'Location'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {installRecords.map((row) => (
                  <tr key={row.no} className="hover:bg-alabaster/50">
                    <td className="px-5 py-3.5 font-mono text-xs text-body">{String(row.no).padStart(2, '0')}</td>
                    <td className="px-5 py-3.5 font-semibold text-ink">{row.client}</td>
                    <td className="px-5 py-3.5 text-body">{row.project}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-body">{row.period}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-body">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Link
              href={withLocale('/contact#inquiry-rfq', locale)}
              className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              {isZh ? '洽谈您的新建或改造项目' : 'Discuss Your Upcoming Project'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
