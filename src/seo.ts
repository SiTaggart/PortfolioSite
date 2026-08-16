import type { JSX } from 'react';

const siteUrl = 'https://www.simontaggart.com';
const canonicalUrl = `${siteUrl}/`;
const ogImageUrl = `${siteUrl}/og.png`;

const defaultSeoConfig = {
  description:
    'Product Engineer at SESCO. Twenty years of front-end engineering, design systems and accessibility.',
  openGraph: {
    imageAlt: 'Simon Taggart — Product Engineer, Redwood City, California',
    locale: 'en_US',
    profile: {
      firstName: 'Simon',
      lastName: 'Taggart',
    },
    siteName: 'Simon Taggart',
    type: 'website',
  },
  title: 'Simon Taggart',
  titleTemplate: 'Simon Taggart — %s',
  twitter: {
    cardType: 'summary_large_image',
    handle: 'SiTaggart',
    site: 'SiTaggart',
  },
} as const;

function pageTitle(title?: string): string {
  if (!title) {
    return defaultSeoConfig.title;
  }

  return defaultSeoConfig.titleTemplate.replace('%s', title);
}

export function defaultMeta(
  title?: string,
  description: string = defaultSeoConfig.description,
): Array<JSX.IntrinsicElements['meta']> {
  const resolvedTitle = pageTitle(title);

  return [
    { title: resolvedTitle },
    { content: description, name: 'description' },
    { content: 'Simon Taggart', name: 'author' },
    { content: defaultSeoConfig.openGraph.type, property: 'og:type' },
    { content: defaultSeoConfig.openGraph.locale, property: 'og:locale' },
    { content: defaultSeoConfig.openGraph.siteName, property: 'og:site_name' },
    { content: canonicalUrl, property: 'og:url' },
    { content: resolvedTitle, property: 'og:title' },
    { content: description, property: 'og:description' },
    { content: ogImageUrl, property: 'og:image' },
    { content: '1200', property: 'og:image:width' },
    { content: '630', property: 'og:image:height' },
    { content: defaultSeoConfig.openGraph.imageAlt, property: 'og:image:alt' },
    { content: defaultSeoConfig.openGraph.profile.firstName, property: 'profile:first_name' },
    { content: defaultSeoConfig.openGraph.profile.lastName, property: 'profile:last_name' },
    { content: defaultSeoConfig.twitter.cardType, name: 'twitter:card' },
    { content: defaultSeoConfig.twitter.site, name: 'twitter:site' },
    { content: defaultSeoConfig.twitter.handle, name: 'twitter:creator' },
    { content: ogImageUrl, name: 'twitter:image' },
  ];
}

export const canonicalLink: JSX.IntrinsicElements['link'] = {
  href: canonicalUrl,
  rel: 'canonical',
};

export const socialProfileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressLocality: 'Redwood City',
    addressRegion: 'CA',
  },
  email: 'mailto:me@simontaggart.com',
  image: ogImageUrl,
  jobTitle: 'Product Engineer',
  name: 'Simon Taggart',
  sameAs: ['https://github.com/SiTaggart', 'https://www.linkedin.com/in/SiTaggart'],
  url: siteUrl,
  worksFor: {
    '@type': 'Organization',
    name: 'SESCO',
  },
};
