import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE, absoluteUrl } from '../data/site.js'

export default function SEOHead({
  title = SITE.defaultTitle,
  description = SITE.defaultDescription,
  canonical = '/',
  ogTitle,
  ogDescription,
  ogImage = SITE.defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  structuredData,
}) {
  const canonicalUrl = canonical ? absoluteUrl(canonical) : undefined
  const imageUrl = ogImage ? absoluteUrl(ogImage) : undefined
  const schemaItems = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
      ? [structuredData]
      : []

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />

      <meta property="og:title" content={ogTitle || title} />
      {description && (
        <meta property="og:description" content={ogDescription || description} />
      )}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      {description && (
        <meta name="twitter:description" content={ogDescription || description} />
      )}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {schemaItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}
