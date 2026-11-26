import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3 text-crimson">
        <span aria-hidden className="h-px w-8 bg-crimson" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  )
}
