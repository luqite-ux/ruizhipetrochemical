import Link from 'next/link'
import { R2_LOGO_URL } from '@/lib/r2-assets'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  className?: string
  heightClass?: string
}

export function BrandLogo({ className, heightClass = 'h-14 sm:h-16' }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Jiangsu Ruizhi Petrochemical Engineering – Home"
      className={cn(
        'relative flex shrink-0 items-center rounded-sm focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none',
        heightClass,
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={R2_LOGO_URL}
        alt="Jiangsu Ruizhi Petrochemical Engineering Co., Ltd."
        className="h-full w-auto object-contain"
      />
    </Link>
  )
}
