import { createFileRoute } from '@tanstack/react-router';

import { caseStudies } from '../content/work';
import { sitemapXml } from '../seo';
import { currentSite } from '../site';

const paths = ['/', ...caseStudies.map((study) => study.to)];

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(currentSite(), paths), {
          headers: { 'content-type': 'application/xml; charset=utf-8' },
        }),
    },
  },
});
