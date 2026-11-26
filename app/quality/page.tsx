import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { CertificateShowcase } from '@/components/certificate-showcase'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { R2_EQUIPMENT } from '@/lib/r2-assets'

export const metadata: Metadata = {
  title: 'Quality & Certifications',
  description:
    'Individual display of Work Safety License and Grade III Petrochemical & Electromechanical Construction Qualification Certificate, plus PMI spectrometer, NDT, and precision dimensional inspection equipment.',
}

export default function QualityPage() {
  const ndtEquipment = R2_EQUIPMENT.filter((e) => e.group === 'Quality & NDT')

  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Quality Assurance & Credentials"
        title="Individual Qualifications & Non-Destructive Inspection"
        description="Every pressure vessel, heat exchanger, and distillation column undergoes alloy material verification, weld NDT testing, dimensional inspection, and hydrostatic pressure testing prior to dispatch."
      />

      {/* Individual Qualification Certificates */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Official Statutory Credentials"
            title="Individual Qualification Certificates"
            description="Click any certificate to inspect the full-resolution original document."
          />
        </Reveal>
        <div className="mt-10">
          <CertificateShowcase />
        </div>
      </section>

      {/* Quality & NDT Inspection Instruments */}
      <section className="border-t border-hairline bg-alabaster/70 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Inspection & Testing Instruments"
              title="Material Spectroscopy, NDT & Precision Metrology"
              description="Documented quality management records and third-party inspection support across every stage of fabrication."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ndtEquipment.map((eq, idx) => (
              <Reveal key={eq.slug} index={idx}>
                <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xs">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={eq.url} alt={eq.title} className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="p-4">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-crimson">
                      {eq.group}
                    </span>
                    <p className="mt-1 text-sm font-semibold text-ink">{eq.title}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
