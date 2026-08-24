import { createFileRoute } from '@tanstack/react-router';

import { robotsTxt } from '../seo';
import { currentSite } from '../site';

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: () =>
        new Response(robotsTxt(currentSite()), {
          headers: { 'content-type': 'text/plain; charset=utf-8' },
        }),
    },
  },
});
