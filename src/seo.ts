import type { PostMeta } from './types';

const siteUrl = 'https://www.simontaggart.com';
const defaultSeoConfig = {
  description: 'UX Engineer, Design Systems Builder, Accessibility Specialist.',
  openGraph: {
    locale: 'en_US',
    profile: {
      firstName: 'Simon',
      lastName: 'Taggart',
    },
    siteName: 'Simon Taggart',
    type: 'website',
  },
  title: 'Simon Taggart',
  titleTemplate: '%s | Simon Taggart',
  twitter: {
    cardType: 'summary_large_image',
    handle: 'SiTaggart',
    site: 'SiTaggart',
  },
} as const;

interface MetaDescriptor {
  charSet?: string;
  content?: string;
  name?: string;
  property?: string;
  title?: string;
}

export function canonicalUrl(path: string): string {
  return `${siteUrl}${path}`;
}

function pageTitle(title?: string): string {
  if (!title) {
    return defaultSeoConfig.title;
  }

  return defaultSeoConfig.titleTemplate.replace('%s', title);
}

export function defaultMeta(
  title?: string,
  description: string = defaultSeoConfig.description,
): Array<MetaDescriptor> {
  const resolvedTitle = pageTitle(title);

  return [
    { title: resolvedTitle },
    { content: description, name: 'description' },
    { content: 'Simon Taggart', name: 'author' },
    { content: defaultSeoConfig.openGraph.type, property: 'og:type' },
    { content: defaultSeoConfig.openGraph.locale, property: 'og:locale' },
    { content: defaultSeoConfig.openGraph.siteName, property: 'og:site_name' },
    { content: resolvedTitle, property: 'og:title' },
    { content: description, property: 'og:description' },
    { content: defaultSeoConfig.openGraph.profile.firstName, property: 'profile:first_name' },
    { content: defaultSeoConfig.openGraph.profile.lastName, property: 'profile:last_name' },
    { content: defaultSeoConfig.twitter.cardType, name: 'twitter:card' },
    { content: defaultSeoConfig.twitter.site, name: 'twitter:site' },
    { content: defaultSeoConfig.twitter.handle, name: 'twitter:creator' },
  ];
}

export function postMeta(post: PostMeta, path: string): Array<MetaDescriptor> {
  return [
    ...defaultMeta(post.title, post.description),
    { content: 'article', property: 'og:type' },
    { content: canonicalUrl(path), property: 'og:url' },
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
