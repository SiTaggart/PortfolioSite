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
  description = defaultSeoConfig.description
): MetaDescriptor[] {
  const resolvedTitle = pageTitle(title);

  return [
    { title: resolvedTitle },
    { name: 'description', content: description },
    { property: 'author', content: 'Simon Taggart' },
    { property: 'og:type', content: defaultSeoConfig.openGraph.type },
    { property: 'og:locale', content: defaultSeoConfig.openGraph.locale },
    { property: 'og:site_name', content: defaultSeoConfig.openGraph.site_name },
    { property: 'og:title', content: resolvedTitle },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: defaultSeoConfig.twitter.cardType },
    { name: 'twitter:site', content: defaultSeoConfig.twitter.site },
    { name: 'twitter:creator', content: defaultSeoConfig.twitter.handle },
  ];
}

export function postMeta(post: MetaDataShape): MetaDescriptor[] {
  const url = `${siteUrl}${post.slug}`;

  return [
    ...defaultMeta(post.title, post.description),
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: url },
    { property: 'article:published_time', content: new Date(post.date).toISOString().slice(0, 10) },
  ];
}

export const socialProfileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Simon Taggart',
  url: siteUrl,
  sameAs: [
    'https://twitter.com/sitaggart',
    'https://github.com/SiTaggart',
    'https://www.facebook.com/sitaggart',
    'https://www.instagram.com/sitaggart/',
    'https://www.linkedin.com/in/SiTaggart/',
  ],
};
