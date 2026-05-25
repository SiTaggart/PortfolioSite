import defaultSeoConfig from '../next-seo.json';
import type { MetaDataShape } from '../types';

const siteUrl = 'https://www.simontaggart.com';

interface MetaDescriptor {
  charSet?: string;
  content?: string;
  name?: string;
  property?: string;
  title?: string;
}

export function pageTitle(title?: string): string {
  if (!title) {
    return defaultSeoConfig.title;
  }

  return defaultSeoConfig.titleTemplate.replace('%s', title);
}

export function defaultMeta(
  title?: string,
  description = defaultSeoConfig.description,
): Array<MetaDescriptor> {
  const resolvedTitle = pageTitle(title);

  return [
    { title: resolvedTitle },
    { content: description, name: 'description' },
    { content: 'Simon Taggart', property: 'author' },
    { content: defaultSeoConfig.openGraph.type, property: 'og:type' },
    { content: defaultSeoConfig.openGraph.locale, property: 'og:locale' },
    { content: defaultSeoConfig.openGraph.site_name, property: 'og:site_name' },
    { content: resolvedTitle, property: 'og:title' },
    { content: description, property: 'og:description' },
    { content: defaultSeoConfig.twitter.cardType, name: 'twitter:card' },
    { content: defaultSeoConfig.twitter.site, name: 'twitter:site' },
    { content: defaultSeoConfig.twitter.handle, name: 'twitter:creator' },
  ];
}

export function postMeta(post: MetaDataShape): Array<MetaDescriptor> {
  const url = `${siteUrl}${post.slug}`;

  return [
    ...defaultMeta(post.title, post.description),
    { content: 'article', property: 'og:type' },
    { content: url, property: 'og:url' },
    { content: new Date(post.date).toISOString().slice(0, 10), property: 'article:published_time' },
  ];
}

export const socialProfileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Simon Taggart',
  sameAs: [
    'https://twitter.com/sitaggart',
    'https://github.com/SiTaggart',
    'https://www.facebook.com/sitaggart',
    'https://www.instagram.com/sitaggart/',
    'https://www.linkedin.com/in/SiTaggart/',
  ],
  url: siteUrl,
};
