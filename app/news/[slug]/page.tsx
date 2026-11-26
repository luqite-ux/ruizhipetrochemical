import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar } from 'lucide-react'
import { getArticles } from '@/lib/supabase'

export const revalidate = 60

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const articles = await getArticles()
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/news" className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-crimson">
        <ArrowLeft className="size-3.5" /> Back to News
      </Link>
      <div className="mt-6 flex items-center gap-2 font-mono text-xs text-body">
        <Calendar className="size-3.5 text-navy" />
        <time dateTime={article.published_at}>
          {article.published_at ? new Date(article.published_at).toISOString().slice(0, 10) : ''}
        </time>
      </div>
      <h1 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{article.title}</h1>
      {article.featured_image && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-hairline bg-alabaster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.featured_image} alt={article.title} className="w-full object-cover" />
        </div>
      )}
      <div className="prose prose-slate mt-8 max-w-none text-sm leading-relaxed text-body whitespace-pre-line">
        {article.content}
      </div>
    </article>
  )
}
