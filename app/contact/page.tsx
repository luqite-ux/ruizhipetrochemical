import type { Metadata } from 'next'
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { RfqForm } from '@/components/rfq-form'
import { getCompany, withLocale } from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '联系我们与技术询盘',
      description: '联系江苏锐志石化工程有限公司（江苏盱眙），获取压力容器、换热器、储罐与精馏塔源头工厂技术报价。',
    }
  }
  return {
    title: 'Contact & RFQ',
    description:
      'Contact Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. in Xuyi, Jiangsu for pressure vessel, heat exchanger, and distillation column quotations.',
  }
}

export default async function ContactPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const company = getCompany(locale)

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '工程技术询盘' : 'Engineering Inquiry'}
        title={isZh ? '联系我们的工程技术与报价团队' : 'Contact Our Technical & Quotation Team'}
        description={
          isZh
            ? '欢迎提供工艺数据表、容器容积、操作压力或总装配图纸，获取源头工厂直供技术方案与报价。'
            : 'Share your process datasheet, vessel volume, operating pressure, or general arrangement drawings for a direct factory quotation.'
        }
      />

      <section id="inquiry-rfq" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div className="rounded-2xl border border-hairline bg-alabaster/70 p-5 sm:p-8">
            <h2 className="text-xl font-semibold text-ink">{company.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">{company.summary}</p>
            <div className="mt-6 space-y-4 border-t border-hairline pt-6 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-navy" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {isZh ? '联系电话' : 'Official Phone'}
                  </p>
                  <a href={company.phoneHref} className="font-mono font-semibold text-ink hover:text-navy">
                    {company.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {isZh ? '企业邮箱' : 'Email'}
                  </p>
                  <a href={`mailto:${company.email}`} className="text-[13px] font-semibold whitespace-nowrap text-ink hover:text-navy sm:text-sm">
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {isZh ? '制造基地地址' : 'Manufacturing Base'}
                  </p>
                  <p className="text-ink">{company.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-white p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
              {isZh ? '询盘建议附带信息' : 'What to Include in Your RFQ'}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              {(isZh
                ? [
                    '设备类型（压力容器、储罐、换热器、精馏塔、反应釜等）',
                    '设计压力、设计温度、容积（m³）或换热面积（m²）',
                    '主体材质要求（碳钢、SS304、SS316L、双相钢、镍基合金等）',
                    '检验检测标准与期望交货周期',
                  ]
                : [
                    'Equipment type (pressure vessel, storage tank, heat exchanger, column, reactor)',
                    'Design pressure, temperature, capacity (m³) or heat transfer area (m²)',
                    'Preferred material (carbon steel, SS304, SS316L, duplex, nickel alloy)',
                    'Inspection requirements and target delivery schedule',
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RfqForm
          captchaScope="contact-page-rfq"
          sourcePage={withLocale('/contact', locale)}
          locale={locale}
        />
      </section>
    </div>
  )
}
