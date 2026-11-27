import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Newspaper } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { getArticles } from '@/lib/supabase'
import { getServerLocale } from '@/lib/server-locale'
import { withLocale } from '@/lib/i18n'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  if (locale === 'zh') {
    return {
      title: '新闻动态',
      description: '江苏锐志石化工程有限公司企业公告、车间发运动态与行业技术资讯。',
    }
  }
  return {
    title: 'News',
    description:
      'Company announcements, fabrication milestones, and technical updates from Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.',
  }
}

export default async function NewsPage() {
  const locale = await getServerLocale()
  const isZh = locale === 'zh'
  const articles = await getArticles(locale)

  return (
    <div className="bg-white">
      <PageHero
        eyebrow={isZh ? '企业资讯与动态' : 'News & Updates'}
        title={isZh ? '新闻动态' : 'News'}
        description={
          isZh
            ? '江苏锐志石化工程有限公司官方公告、装备发运实况及工程技术资讯。'
            : 'Official announcements, workshop deliveries, and engineering updates from Jiangsu Ruizhi Petrochemical Engineering Co., Ltd.'
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {articles.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-hairline bg-alabaster/70 p-12 text-center">
            <Newspaper className="mx-auto size-10 text-navy/60" />
            <h2 className="mt-4 text-xl font-semibold text-ink">
              {isZh ? '暂无已发布新闻' : 'No Published News Yet'}
            </h2>
            <p className="mt-2 text-sm text-body">
              {isZh
                ? '后续通过管理后台发布的项目发运新闻与技术文章将自动同步展示于此。'
                : 'New project dispatches and technical articles published from our management portal will appear here automatically.'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href={withLocale('/projects', locale)}
                className="rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white hover:bg-navy/90"
              >
                {isZh ? '查看工程案例' : 'View Engineering Projects'}
              </Link>
              <Link
                href={withLocale('/products', locale)}
                className="rounded-full border border-hairline bg-white px-5 py-2.5 text-xs font-semibold text-navy hover:border-navy"
              >
                {isZh ? '浏览产品目录' : 'Browse Equipment Catalog'}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white shadow-2xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {art.featured_image && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-alabaster">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.featured_image} alt={art.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-body">
                    <Calendar className="size-3.5 text-navy" />
                    <time dateTime={art.published_at}>
                      {art.published_at ? new Date(art.published_at).toISOString().slice(0, 10) : ''}
                    </time>
                  </div>
                  <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-ink">
                    <Link href={withLocale(`/news/${art.slug}`, locale)} className="hover:text-navy">
                      {art.title}
                    </Link>
                  </h2>
                  {art.excerpt && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{art.excerpt}</p>
                  )}
                  <Link
                    href={withLocale(`/news/${art.slug}`, locale)}
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-semibold text-navy hover:text-crimson"
                  >
                    {isZh ? '阅读全文' : 'Read Article'} <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
