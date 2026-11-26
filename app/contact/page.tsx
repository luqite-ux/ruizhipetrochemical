import type { Metadata } from 'next'
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { RfqForm } from '@/components/rfq-form'
import { COMPANY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact & RFQ',
  description:
    'Contact Jiangsu Ruizhi Petrochemical Engineering Co., Ltd. in Xuyi, Jiangsu for pressure vessel, heat exchanger, and distillation column quotations.',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Engineering Inquiry"
        title="Contact Our Technical & Quotation Team"
        description="Share your process datasheet, vessel volume, operating pressure, or general arrangement drawings for a direct factory quotation."
      />

      <section id="inquiry-rfq" className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <div className="rounded-2xl border border-hairline bg-alabaster/70 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-ink">{COMPANY.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-body">{COMPANY.summary}</p>
            <div className="mt-6 space-y-4 border-t border-hairline pt-6 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Official Phone</p>
                  <a href={COMPANY.phoneHref} className="font-mono font-semibold text-ink hover:text-navy">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="font-semibold text-ink hover:text-navy">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-navy" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-body">Manufacturing Base</p>
                  <p className="text-ink">{COMPANY.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-hairline bg-white p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-crimson">
              What to Include in Your RFQ
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-body">
              {[
                'Equipment type (pressure vessel, storage tank, heat exchanger, column, reactor)',
                'Design pressure, temperature, capacity (m³) or heat transfer area (m²)',
                'Preferred material (carbon steel, SS304, SS316L, duplex, nickel alloy)',
                'Inspection requirements and target delivery schedule',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-navy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RfqForm captchaScope="contact-page-rfq" sourcePage="/contact" />
      </section>
    </div>
  )
}
