import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { COMPANY, METRICS } from '@/lib/site'
import { R2_FACILITY } from '@/lib/r2-assets'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. — 16 years of petrochemical, electromechanical, and power engineering experience with a 22,000 m² Xuyi manufacturing base.',
}

const DEPARTMENT_VALUES = [
  {
    dept: 'R&D Department',
    body: 'Continuous exploration of process fabrication technologies, workflow optimization, hands-on engineering learning, integrity, and long-term equipment competitiveness.',
  },
  {
    dept: 'Technical Engineering Department',
    body: 'Focused on technical reliability, operational safety, and buyer requirements — maintaining strict standards across product quality, system stability, and engineering drawings.',
  },
  {
    dept: 'Production Department',
    body: 'Strict adherence to fabrication procedure integrity, dimensional compliance, weld traceability, and on-schedule workshop delivery.',
  },
  {
    dept: 'Market & Project Coordination',
    body: 'Client-oriented communication, transparent technical quotation, and coordinated cross-departmental support from inquiry to site commissioning.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="About Ruizhi Petrochemical"
        title="16 Years Integrating Petrochemical Design, Fabrication & Installation"
        description={COMPANY.summary}
      />

      {/* Metrics */}
      <section className="border-b border-hairline bg-alabaster/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {METRICS.map((m, idx) => (
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
            Direct Source Factory
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">
            From Custom Pressure Vessels to Turnkey Plant Erection
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-body">
            Headquartered in the Economic Development Zone of Xuyi County, Huai&apos;an, Jiangsu Province, Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. is a comprehensive industrial engineering enterprise serving petrochemical, fine chemical, energy, power, metallurgical, and environmental protection sectors.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-body">
            Holding Grade III General Contracting qualifications for both Petrochemical Engineering Construction and Mechanical &amp; Electrical Engineering Construction, we operate a 33-mu (22,000 m²) manufacturing base that unites equipment fabrication with heavy field installation — reducing coordination friction and project lead times for EPC contractors and plant owners.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              View 37+ Reference Projects
            </Link>
            <Link
              href="/quality"
              className="rounded-full border border-hairline bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:border-navy"
            >
              View Individual Certificates
            </Link>
          </div>
        </Reveal>
        <Reveal index={1}>
          <div className="overflow-hidden rounded-2xl border border-hairline bg-alabaster shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={R2_FACILITY[0].url}
              alt={R2_FACILITY[0].caption}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Corporate Values (from PDF P04) */}
      <section className="border-t border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Corporate Culture"
              title="Four-Department Engineering Standards"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DEPARTMENT_VALUES.map((v, idx) => (
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
