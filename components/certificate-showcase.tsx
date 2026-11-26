'use client'

import { useState } from 'react'
import { Award, X, ZoomIn } from 'lucide-react'
import { R2_CERTIFICATES } from '@/lib/r2-assets'

export function CertificateShowcase() {
  const [zoomed, setZoomed] = useState<(typeof R2_CERTIFICATES)[number] | null>(null)

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        {R2_CERTIFICATES.map((cert) => (
          <article
            key={cert.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setZoomed(cert)}
              className="group relative flex aspect-[4/3] w-full items-center justify-center bg-alabaster p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              aria-label={`Inspect ${cert.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.url}
                alt={`${cert.title} — ${cert.code}`}
                className="max-h-full max-w-full rounded border border-hairline/80 object-contain shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full border border-hairline bg-white/95 px-3 py-1 text-xs font-medium text-navy shadow-xs">
                <ZoomIn className="size-3.5" /> Inspect Original
              </span>
            </button>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-crimson">
                <Award className="size-4" />
                <span>{cert.code}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-ink">{cert.title}</h3>
              <dl className="mt-4 space-y-2 border-t border-hairline pt-4 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-body">Certificate Holder</dt>
                  <dd className="font-medium text-ink">{cert.holder}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-body">Authorized Scope</dt>
                  <dd className="text-body">{cert.scope}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-body">Issuing Authority</dt>
                  <dd className="text-body">{cert.issuer}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-xs"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-hairline pb-3">
              <div>
                <p className="font-mono text-xs text-crimson">{zoomed.code}</p>
                <h4 className="text-base font-semibold text-ink">{zoomed.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                aria-label="Close certificate preview"
                className="flex size-9 items-center justify-center rounded-full border border-hairline text-ink hover:bg-alabaster"
              >
                <X className="size-4" />
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoomed.url} alt={zoomed.title} className="mx-auto max-h-[75vh] w-auto object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
