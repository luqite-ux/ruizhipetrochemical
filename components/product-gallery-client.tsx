'use client'

import { useState } from 'react'

export function ProductGalleryClient({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const safeImages = images.length ? images : []

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-hairline bg-alabaster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={safeImages[active] || safeImages[0]}
          alt={name}
          className="aspect-[4/3] w-full object-contain bg-white p-2"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {safeImages.map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              className={`overflow-hidden rounded-xl border bg-white p-1 transition-all ${
                idx === active ? 'border-navy ring-2 ring-navy/20' : 'border-hairline hover:border-navy/40'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${name} view ${idx + 1}`} className="aspect-[4/3] w-full object-cover rounded-lg" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
