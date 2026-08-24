import type { JSX } from 'react';

export interface Site {
  isProduction: boolean;
  origin: string;
}

export interface Head {
  links: Array<JSX.IntrinsicElements['link']>;
  meta: Array<JSX.IntrinsicElements['meta']>;
}

export interface HeadOptions {
  description: string;
  image?: string;
  ogType?: 'article' | 'website';
  path: string;
  site: Site;
  title?: string;
}

const productionOrigin = 'https://www.simontaggart.com';

const productionHosts = new Set(['simontaggart.com', 'www.simontaggart.com']);

const siteName = 'Simon Taggart';
const titleTemplate = 'Simon Taggart — %s';
const imageAlt = 'Simon Taggart — Product Engineer, Redwood City, California';
const twitterHandle = 'SiTaggart';

export function resolveSite(protocol: string, host: string): Site {
  const isProduction = productionHosts.has(host.split(':')[0].toLowerCase());

  return { isProduction, origin: isProduction ? productionOrigin : `${protocol}://${host}` };
}

export function pageTitle(title?: string): string {
  return title ? titleTemplate.replace('%s', title) : siteName;
}

export function buildHead({
  description,
  image,
  ogType = 'website',
  path,
  site,
  title,
}: HeadOptions): Head {
  const resolvedTitle = pageTitle(title);
  const url = `${site.origin}${path}`;
  const imageUrl = image ?? `${site.origin}/og.png`;

  return {
    links: site.isProduction ? [{ href: url, rel: 'canonical' }] : [],
    meta: [
      { title: resolvedTitle },
      { content: description, name: 'description' },
      { content: siteName, name: 'author' },
      ...(site.isProduction ? [] : [{ content: 'noindex, nofollow', name: 'robots' }]),
      { content: ogType, property: 'og:type' },
      { content: 'en_US', property: 'og:locale' },
      { content: siteName, property: 'og:site_name' },
      { content: resolvedTitle, property: 'og:title' },
      { content: description, property: 'og:description' },
      { content: url, property: 'og:url' },
      { content: imageUrl, property: 'og:image' },
      { content: '1200', property: 'og:image:width' },
      { content: '630', property: 'og:image:height' },
      { content: imageAlt, property: 'og:image:alt' },
      { content: 'Simon', property: 'profile:first_name' },
      { content: 'Taggart', property: 'profile:last_name' },
      { content: 'summary_large_image', name: 'twitter:card' },
      { content: twitterHandle, name: 'twitter:site' },
      { content: twitterHandle, name: 'twitter:creator' },
      { content: resolvedTitle, name: 'twitter:title' },
      { content: description, name: 'twitter:description' },
      { content: imageUrl, name: 'twitter:image' },
    ],
  };
}

export function personJsonLd(site: Site): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
      addressLocality: 'Redwood City',
      addressRegion: 'CA',
    },
    email: 'mailto:me@simontaggart.com',
    image: `${site.origin}/og.png`,
    jobTitle: 'Product Engineer',
    name: siteName,
    sameAs: ['https://github.com/SiTaggart', 'https://www.linkedin.com/in/SiTaggart'],
    url: site.origin,
    worksFor: {
      '@type': 'Organization',
      name: 'SESCO',
    },
  };
}

export function robotsTxt(site: Site): string {
  return site.isProduction
    ? `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';
}

export function sitemapXml(site: Site, paths: ReadonlyArray<string>): string {
  const entries = paths.map((path) => `  <url>\n    <loc>${site.origin}${path}</loc>\n  </url>`);

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
}
