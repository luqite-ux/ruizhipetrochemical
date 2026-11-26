import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, MapPin, Calendar } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FABRICATION_PROJECTS, INSTALLATION_TRACK_RECORD, MAJOR_CLIENTS } from '@/lib/projects-data'
import { R2_CASES } from '@/lib/r2-assets'

export const metadata: Metadata = {
  title: 'Projects & Clients',
  description:
    'Explore 37+ petrochemical equipment fabrication and plant installation projects delivered for Sinopec, Shandong Haiyou, Jiangsu Fuqiang, ADAMA Anpon, Datang Environmental, and Nanjing Jinling Huntsman.',
}

export default function ProjectsPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Engineering Track Record"
        title="Delivered Projects & Cooperating Clients"
        description="From custom pilot reactors for chemical research institutes to 101 m delayed coking towers, 386-ton propylene oxide reactors, and 5,000 m³ Sinopec tank farms."
      />

      {/* Enterprise Clients Roster */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Cooperating Clients"
            title="Trusted by 18+ Major Petrochemical, Chemical & Energy Enterprises"
            description="Long-term fabrication and field installation partnerships across state-owned energy groups, listed chemical leaders, and research institutes."
          />
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {MAJOR_CLIENTS.map((c, idx) => (
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
              eyebrow="Field & Workshop Installations"
              title="Photographic Case Studies"
              description="Real fabrication and site erection photography from delivered chemical, refining, and environmental projects."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {R2_CASES.map((item, idx) => (
              <Reveal key={item.slug} index={idx}>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.url} alt={item.caption} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="flex-1 p-5 text-sm font-medium leading-snug text-ink">
                    {item.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Equipment Fabrication Projects */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="2023 – 2025 Equipment Fabrication"
            title="Recent Custom Process Unit & Reactor Deliveries"
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FABRICATION_PROJECTS.map((p, idx) => (
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
              eyebrow="Detailed Reference List"
              title="Major Engineering Installation Track Record"
              description="Selected multi-discipline petrochemical, tank farm, coking tower, and environmental engineering installation projects."
            />
          </Reveal>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-hairline bg-white shadow-xs">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-hairline bg-alabaster font-mono text-xs uppercase tracking-wider text-navy">
                <tr>
                  <th className="px-5 py-3.5">#</th>
                  <th className="px-5 py-3.5">Client / Owner</th>
                  <th className="px-5 py-3.5">Project Scope</th>
                  <th className="px-5 py-3.5">Period</th>
                  <th className="px-5 py-3.5">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {INSTALLATION_TRACK_RECORD.map((row) => (
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
              href="/contact#inquiry-rfq"
              className="inline-flex items-center rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              Discuss Your Upcoming Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
