import { COPY } from '../data/copy'
import { PRODUCTS } from '../data/products'
import { absoluteUrl } from '../data/seo'
import { PRIVACY_PATH, SITE } from '../data/site'
import { richTextToPlain } from '../utils/richText'

export function HomeJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.siteUrl}/#website`,
        url: SITE.siteUrl,
        name: SITE.name,
        description:
          'Pasticceria artigianale delle Isole Eolie. Dolci tipici siciliani, ordini e spedizioni.',
        inLanguage: 'it-IT',
        publisher: { '@id': `${SITE.siteUrl}/#organization` },
      },
      {
        '@type': 'Bakery',
        '@id': `${SITE.siteUrl}/#organization`,
        name: SITE.name,
        url: SITE.siteUrl,
        email: SITE.email,
        telephone: SITE.phone,
        image: absoluteUrl('/og-image.jpg'),
        servesCuisine: 'Sicilian',
        areaServed: {
          '@type': 'Country',
          name: 'Italy',
        },
        sameAs: [SITE.facebookUrl],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SITE.phone,
          contactType: 'customer service',
          availableLanguage: ['Italian'],
          areaServed: 'IT',
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE.siteUrl}/#webpage`,
        url: SITE.siteUrl,
        name: SITE.name,
        isPartOf: { '@id': `${SITE.siteUrl}/#website` },
        about: { '@id': `${SITE.siteUrl}/#organization` },
        inLanguage: 'it-IT',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.siteUrl}/#faq`,
        isPartOf: { '@id': `${SITE.siteUrl}/#webpage` },
        mainEntity: COPY.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: richTextToPlain(item.answer),
          },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'I Nostri Dolci',
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            description: p.description,
            image: absoluteUrl(p.image),
            brand: { '@type': 'Brand', name: SITE.name },
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function PrivacyJsonLd() {
  const url = absoluteUrl(PRIVACY_PATH)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: 'Informativa privacy',
        isPartOf: { '@id': `${SITE.siteUrl}/#website` },
        inLanguage: 'it-IT',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: SITE.name,
            item: SITE.siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Informativa privacy',
            item: url,
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
