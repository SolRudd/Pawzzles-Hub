import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import ResourceLeadCapture from '../components/ResourceLeadCapture.jsx'
import Disclaimer from '../components/Disclaimer.jsx'
import SEOHead from '../components/SEOHead.jsx'
import { Icon } from '../components/icons/Icons.jsx'
import { ImagePlaceholder } from '../components/placeholders/Scenes.jsx'
import { PawMark } from '../components/PawAccent.jsx'
import { getResourceContent } from '../data/content/index.js'
import { getResource } from '../data/resources.js'
import { SITE, absoluteUrl } from '../data/site.js'
import { trackVisitShop } from '../lib/tracking.js'

export default function ResourceDetail() {
  const { slug } = useParams()
  const content = getResourceContent(slug)

  useEffect(() => {
    if (content?.metaTitle) document.title = content.metaTitle
    return () => {
      document.title = 'Pawzzles Resource Hub | Practical Tools for Dog Owners'
    }
  }, [content])

  if (!content) {
    return <Navigate to="/resources" replace />
  }

  const related = (content.related || [])
    .map((id) => getResource(id))
    .filter(Boolean)

  const canonical = `/resources/${content.slug}`
  const newsletterInterests = [
    content.category.toLowerCase(),
    ...(content.slug.includes('slow-feeder') ? ['slow_feeders'] : []),
    ...(content.slug.includes('mealtime') ? ['mealtime_routines'] : []),
    ...(content.slug.includes('toy-safety') ? ['toy_safety'] : []),
    ...(content.slug.includes('puppy') ? ['puppy', 'training'] : []),
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    description: content.metaDescription || content.intro,
    image: content.imageSrc ? absoluteUrl(content.imageSrc) : undefined,
    mainEntityOfPage: absoluteUrl(canonical),
    author: {
      '@type': 'Organization',
      name: SITE.brandName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.brandName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/pawzzles-logo.svg'),
      },
    },
  }

  return (
    <>
      <SEOHead
        title={content.metaTitle || `${content.title} | Pawzzles`}
        description={content.metaDescription || content.intro}
        canonical={canonical}
        ogType="article"
        ogImage={content.imageSrc || SITE.defaultOgImage}
        structuredData={schema}
      />
      <PageHero
        eyebrow={content.category}
        title={content.title}
        intro={content.intro}
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Resources', to: '/resources' },
          { label: content.title },
        ]}
        meta={[
          { icon: 'clock', label: content.time },
          { icon: 'paw', label: content.type },
        ]}
      />

      <section className="pb-24 sm:pb-28">
        <div className="max-w-7xl mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* hero image */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="relative aspect-[5/4] lg:aspect-[5/5] rounded-3xl overflow-hidden ring-1 ring-navy/5 shadow-card bg-white">
                  <ImagePlaceholder
                    name={content.image}
                    src={content.imageSrc}
                    alt={content.imageAlt}
                    label={content.title}
                  />
                </div>
                <Disclaimer className="mt-6" />
              </div>
            </div>

            {/* body */}
            <article className="lg:col-span-7">
              <div className="prose-pawzzles space-y-8">
                {content.sections.map((s) => (
                  <section key={s.heading}>
                    <h2 className="font-display text-2xl sm:text-3xl text-navy flex items-center gap-2.5">
                      <PawMark size={18} color="#f58232" />
                      {s.heading}
                    </h2>
                    {s.body && (
                      <p className="mt-3 text-navy/85 leading-relaxed">{s.body}</p>
                    )}
                    {s.list && (
                      <ul className="mt-4 space-y-2.5">
                        {s.list.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex w-5 h-5 items-center justify-center rounded-full bg-teal text-white shrink-0">
                              <Icon name="check" className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-navy/85">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <ResourceLeadCapture
                className="mt-10"
                title="Get dog care tips by email"
                body="Join the Pawzzles Pack for practical guides, routines and dog-friendly ideas linked to this topic."
                buttonLabel="Join the pack"
                sourceComponent="resource_article_signup"
                interests={[...new Set(newsletterInterests)]}
              />

              {/* cta block */}
              {content.cta && (
                <div className="mt-10 rounded-3xl bg-soft-blue ring-1 ring-teal/10 p-6 sm:p-8">
                  <p className="eyebrow">Next step</p>
                  <h3 className="mt-1 font-display text-2xl text-navy">
                    {content.cta.title}
                  </h3>
                  <p className="mt-2 text-muted">{content.cta.body}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link to={content.cta.href} className="btn-primary">
                      {content.cta.button}
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </Link>
                    <a
                      href={SITE.shopUrl}
                      className="btn-ghost"
                      onClick={() => trackVisitShop('resource_article_cta')}
                    >
                      Visit Shop
                    </a>
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* related */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                <h2 className="font-display text-2xl sm:text-3xl text-navy">Related resources</h2>
                <Link to="/resources" className="text-sm font-bold text-teal hover:text-teal-deep inline-flex items-center gap-1.5">
                  See all resources <Icon name="arrowRight" className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
