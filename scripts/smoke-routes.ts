import { readdirSync } from 'node:fs';

import { cloudflareBeaconToken } from '../src/analytics';

const siteUrl = 'https://www.simontaggart.com';
const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;

const postSlugs = readdirSync(new URL('../src/content/posts', import.meta.url), {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

if (postSlugs.length === 0) {
  throw new Error('No posts found to smoke test');
}

interface RouteCheck {
  expected: Array<string>;
  url: string;
}

const checks: Array<RouteCheck> = [
  { expected: ['Simon'], url: '/' },
  {
    // The router percent-encodes slugs when it builds hrefs.
    expected: postSlugs.map((slug) => `href="/posts/${encodeURIComponent(slug)}"`),
    url: '/posts',
  },
];

for (const slug of postSlugs) {
  // A post's canonical URL is built from its directory name, so requesting the
  // percent-encoded form must resolve to the same page and the same canonical.
  const canonical = `href="${siteUrl}/posts/${slug}" rel="canonical"`;

  checks.push({ expected: [canonical, '<h1'], url: `/posts/${slug}` });

  const encodedSlug = encodeURIComponent(slug);

  if (encodedSlug !== slug) {
    checks.push({ expected: [canonical, '<h1'], url: `/posts/${encodedSlug}` });
  }
}

const expectedSiteWideContent = [
  'type="application/ld+json"',
  'https://schema.org',
  'https://static.cloudflareinsights.com/beacon.min.js',
  'data-cf-beacon',
  cloudflareBeaconToken,
  'profile:first_name',
  'profile:last_name',
];

const server = Bun.spawn(
  ['bun', 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    stderr: 'pipe',
    stdout: 'pipe',
  },
);

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);

      if (response.ok) {
        return;
      }
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
    }

    await Bun.sleep(250);
  }

  throw new Error(`Preview server did not start at ${baseUrl}`);
}

try {
  await waitForServer();

  for (const { expected, url } of checks) {
    const response = await fetch(`${baseUrl}${url}`);
    const body = await response.text();

    if (response.status !== 200) {
      throw new Error(`${url} returned ${response.status}`);
    }

    for (const content of [...expected, ...expectedSiteWideContent]) {
      if (!body.includes(content)) {
        throw new Error(`${url} did not include expected content: ${content}`);
      }
    }

    console.log(`ok ${url}`);
  }

  const notFound = await fetch(`${baseUrl}/posts/this-post-does-not-exist`);

  if (notFound.status !== 404) {
    throw new Error(`Unknown post returned ${notFound.status}, expected 404`);
  }

  console.log('ok 404 for unknown post');
} finally {
  server.kill();
  await server.exited;
}

export {};
