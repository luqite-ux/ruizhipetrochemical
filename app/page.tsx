import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { HeroCarousel } from '@/components/hero-carousel'
import { ThreeVesselStudio } from '@/components/three-vessel-studio'
import { CertificateShowcase } from '@/components/certificate-showcase'
import { RfqForm } from '@/components/rfq-form'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getCategories, getProducts } from '@/lib/supabase'
import {
  getCompany,
  getFacilityCaption,
  getFaqs,
  getMajorClients,
  getMetrics,
  withLocale,
} from '@/lib/i18n'
import { getServerLocale } from '@/lib/server-locale'
import { R2_CASES, R2_FACILITY } from '@/lib/r2-assets'

export const revalidate = 60

export default async function HomePage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const company = getCompany(locale)
  const metrics = getMetrics(locale)
  const faqs = getFaqs(locale)
  const clients = getMajorClients(locale)

  const [categories, products] = await Promise.all([getCategories(locale), getProducts(locale)])
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

  const flagshipCases = isZh
    ? [
        {
          title: '中石化淮安齐湖油库储罐群工程',
          client: '中国石化江苏石油分公司',
          scope: '8×5,000 m³、4×3,000 m³ 及 2×1,000 m³ 储罐、工艺管道、消防及自控仪表工程',
          image: R2_CASES[3].url,
        },
        {
          title: '10 万吨/年环氧丙烷主反应装置',
          client: '江苏富强新材料有限公司',
          scope: '3×386 吨主反应器重型吊装、多层钢结构、工艺配管及防腐工程',
          image: R2_CASES[4].url,
        },
        {
          title: '多塔氯化反应中试装置',
          client: '甘肃省化工研究院',
          scope: '撬装三塔氯化反应器及进料系统，支持连续中试工艺运行',
          image: R2_CASES[1].url,
        },
        {
          title: '59,600 吨/年锂电池添加剂成套装置',
          client: '江苏瀚康电子材料有限公司',
          scope: '成套工艺设备安装、管道、钢结构及电气仪表总包工程',
          image: R2_CASES[8].url,
        },
      ]
    : [
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
    <div className="overflow-x-clip bg-white">
      {/* 1. Adaptive 3-Slide Hero Carousel */}
      <HeroCarousel locale={locale} />

      {/* 2. Verified Engineering & Scale Metrics */}
      <section id="key-metrics" className="border-b border-hairline bg-alabaster/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {metrics.map((m, idx) => (
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
              eyebrow={isZh ? '核心产品矩阵' : 'Equipment Lineup'}
              title={isZh ? '七大专业石化工艺装备类别' : 'Seven Specialized Process Equipment Categories'}
              description={
                isZh
                  ? '按您的热工、承压与现场安装规范定制碳钢、不锈钢及特种合金工艺容器与成套设备。'
                  : 'Custom-fabricated carbon steel, stainless steel, and alloy process vessels engineered to your thermal, pressure, and installation specifications.'
              }
            />
            <Link
              href={withLocale('/products', locale)}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              {isZh ? `查看全部 ${products.length} 款设备` : `View All ${products.length} Models`}{' '}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((cat, idx) => (
            <Reveal key={cat.slug} index={idx} className="min-w-0">
              <Link
                href={withLocale(`/products?category=${encodeURIComponent(cat.slug)}`, locale)}
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
                    <span>
                      {isZh ? `${cat.count} 款产品` : `${cat.count} ${cat.count === 1 ? 'Model' : 'Models'}`}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans font-medium text-navy">
                      {isZh ? '查看分类' : 'Explore'}{' '}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
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
              eyebrow={isZh ? '交互式三维工程视图' : 'Interactive 3D Engineering'}
              title={isZh ? '直观预览容器与换热器内部结构' : 'Inspect Internal Vessel & Heat Exchanger Geometry'}
              description={
                isZh
                  ? '在实时三维视图中自由切换精馏塔、螺旋折流板管壳换热器、带搅拌压力反应釜及工业大型储罐，查看内部构件布局。'
                  : 'Switch between distillation columns, helical-baffle shell-and-tube heat exchangers, agitated pressure reactors, and industrial storage tanks in our real-time Three.js studio.'
              }
            />
          </Reveal>
          <Reveal index={1} className="mt-10 min-w-0">
            <ThreeVesselStudio locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* 5. Featured Engineered Equipment */}
      <section id="featured-equipment" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow={isZh ? '代表性制造产品' : 'Featured Fabrication'}
              title={isZh ? '核心工艺容器与传热装备' : 'Representative Process Vessels & Thermal Units'}
              description={
                isZh
                  ? '源头车间直造，全流程配备材质光谱复检、焊缝无损检测（NDT）与水压试验验证。'
                  : 'Direct workshop fabrication backed by material spectroscopy, NDT weld testing, and hydrostatic pressure verification.'
              }
            />
            <Link
              href={withLocale('/products', locale)}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              {isZh ? '浏览全部产品目录' : 'Browse Full Catalog'} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((prod, idx) => {
            const topSpec = Object.entries(prod.specs || {}).slice(0, 2)
            return (
              <Reveal key={prod.slug} index={idx} className="min-w-0">
                <Link
                  href={withLocale(`/products/${prod.slug}`, locale)}
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
                      {isZh ? '查看技术参数' : 'Technical Specs'}{' '}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
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
                eyebrow={isZh ? '合作客户与工程业绩' : 'Clients & Engineering Track Record'}
                title={isZh ? '服务国内大型石化、化工与能源领军企业' : 'Trusted by Leading Petrochemical, Chemical & Energy Enterprises'}
                description={
                  isZh
                    ? '累计交付 37 项以上大型设备制造与装置安装工程，覆盖油库罐区、炼化装置、精细化工及环保治理。'
                    : 'Over 37 major equipment fabrication and plant installation contracts delivered across oil depots, refining complexes, fine chemicals, and environmental engineering.'
                }
              />
              <Link
                href={withLocale('/projects', locale)}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
              >
                {isZh ? '查看全部 37+ 项工程业绩' : 'Explore All 37+ Projects'} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* Cooperating Clients Grid */}
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {clients.slice(0, 12).map((client, idx) => (
              <Reveal key={client.name} index={idx} className="min-w-0">
                <div className="flex h-full items-start gap-3 rounded-xl border border-hairline bg-white px-4 py-3.5 shadow-2xs">
                  <Building2 className="mt-0.5 size-4 shrink-0 text-navy" />
                  <div className="min-w-0">
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
              <Reveal key={item.title} index={idx} className="min-w-0">
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
              eyebrow={isZh ? '法定资质认证' : 'Official Credentials'}
              title={isZh ? '工程总承包与安全生产资质证书' : 'Individual Engineering & Safety Qualifications'}
              description={
                isZh
                  ? '逐一清晰展示每项法定工程总承包与安全生产许可原件，便于采购方与总包方直接核验。'
                  : 'Each statutory contracting and work-safety qualification certificate is presented individually for direct procurement due diligence.'
              }
            />
            <Link
              href={withLocale('/quality', locale)}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
            >
              {isZh ? '质量控制与检测中心' : 'Quality & NDT Lab'} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal index={1} className="mt-10">
          <CertificateShowcase locale={locale} />
        </Reveal>
      </section>

      {/* 8. Xuyi 22,000 m² Manufacturing Base */}
      <section id="manufacturing-base" className="border-y border-hairline bg-alabaster/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow={isZh ? '制造基地实力' : 'Manufacturing Base'}
                title={isZh ? '盱眙 22,000 m²（33 亩）现代化制造与装配基地' : '22,000 m² (33 Mu) Xuyi Fabrication & Assembly Plant'}
                description={
                  isZh
                    ? '集研发办公楼、50/10 吨行车重型制造车间、数控光纤激光下料、液压卷板、自动埋弧焊与抛丸喷砂室于一体。'
                    : 'Integrated R&D building, 50/10-ton overhead crane fabrication hall, CNC fiber laser cutting, hydraulic plate rolling, submerged-arc welding, and automated shot blasting.'
                }
              />
              <Link
                href={withLocale('/manufacturing', locale)}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy hover:text-crimson"
              >
                {isZh ? '查看全部 22 台套加工检测设备' : 'Explore All 22 Workshop Machines'} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={R2_FACILITY[1].url}
                  alt={getFacilityCaption(R2_FACILITY[1].slug, R2_FACILITY[1].caption, locale)}
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="px-5 py-3.5 text-xs font-medium text-body">
                  {getFacilityCaption(R2_FACILITY[1].slug, R2_FACILITY[1].caption, locale)}
                </figcaption>
              </figure>
            </Reveal>
            <Reveal index={1} className="md:col-span-5">
              <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={R2_FACILITY[2].url}
                  alt={getFacilityCaption(R2_FACILITY[2].slug, R2_FACILITY[2].caption, locale)}
                  className="aspect-[16/10] h-full w-full object-cover md:aspect-auto md:h-[calc(100%-3rem)]"
                />
                <figcaption className="px-5 py-3.5 text-xs font-medium text-body">
                  {getFacilityCaption(R2_FACILITY[2].slug, R2_FACILITY[2].caption, locale)}
                </figcaption>
              </figure>
            </Reveal>
            {[R2_FACILITY[0], R2_FACILITY[3], R2_FACILITY[4]].map((fac, idx) => {
              const cap = getFacilityCaption(fac.slug, fac.caption, locale)
              return (
                <Reveal key={fac.slug} index={idx + 2} className="md:col-span-4">
                  <figure className="h-full overflow-hidden rounded-2xl border border-hairline bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fac.url} alt={cap} className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="px-4 py-3 text-xs font-medium text-body">{cap}</figcaption>
                  </figure>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. Procurement & Engineering FAQ */}
      <section id="buyer-faq" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={isZh ? '采购与定制指南' : 'Procurement Guide'}
            title={isZh ? '装备定制与采购常见问题' : 'Frequently Asked Manufacturing & Ordering Questions'}
            description={
              isZh
                ? '涵盖起订量、OEM/ODM 按图定制、常规交期、设计寿命、检测文件及现场安装等核心采购问题。'
                : 'Key ordering terms covering MOQ, OEM/ODM custom manufacturing, lead times, design life, and inspection documentation.'
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.slice(0, 3).map((item, idx) => (
              <AccordionItem key={item.q} value={`left-${idx}`} className="rounded-xl border border-hairline bg-white px-5">
                <AccordionTrigger className="text-left text-sm font-semibold text-ink hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-body">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.slice(3).map((item, idx) => (
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
          <Reveal className="min-w-0">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-crimson">
              {isZh ? '制造技术直联' : 'Direct Technical Desk'}
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              {isZh ? '获取定制技术方案与报价' : 'Request a Technical Quotation'}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-body">{company.summary}</p>

            <div className="mt-6 space-y-3 rounded-2xl border border-hairline bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-navy" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {isZh ? '联系电话' : 'Official Phone'}
                  </p>
                  <a href={company.phoneHref} className="font-mono text-sm font-semibold text-ink hover:text-navy">
                    {company.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy" />
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">
                    {isZh ? '业务邮箱' : 'Official Email'}
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
                  <p className="text-sm text-ink">{company.address}</p>
                </div>
              </div>
            </div>

            <ul className="mt-6 grid gap-2.5 text-xs text-body sm:grid-cols-2">
              {(isZh
                ? [
                    '起订量：1 台非标定制起订',
                    '常规交期：30–45 天发货',
                    '支持 OEM / ODM 按图定制',
                    '支持第三方检验与 NDT 报告',
                  ]
                : [
                    'MOQ: 1 Engineered Unit',
                    'Standard Lead Time: 30–45 Days',
                    'OEM / ODM Custom Drawings Supported',
                    'Third-Party Inspection & NDT Reports',
                  ]
              ).map((pt) => (
                <li key={pt} className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="size-4 shrink-0 text-navy" />
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={1} className="min-w-0">
            <RfqForm captchaScope="home-rfq" sourcePage={withLocale('/', locale)} locale={locale} />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
