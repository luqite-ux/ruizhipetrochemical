import Link from 'next/link'
import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  crumbs?: { label: string; href?: string }[]
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, crumbs, children }: PageHeroProps) {
  return (
    <section className="blueprint-grid relative border-b border-hairline">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-body">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy">
                Home
              </Link>
            </li>
            {(crumbs ?? [{ label: title }]).map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-navy">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow flex items-center gap-3 text-crimson">
          <span aria-hidden className="h-px w-8 bg-crimson" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
