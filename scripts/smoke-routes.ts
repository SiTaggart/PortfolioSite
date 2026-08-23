interface RouteCheck {
  content?: ReadonlyArray<string>;
  path: string;
  status: number;
}

const port = 4174;
const baseUrl = `http://127.0.0.1:${port}`;
const productionOrigin = 'https://www.simontaggart.com';

const routeChecks: Array<RouteCheck> = [
  {
    content: [
      'Simon Taggart',
      'Product Engineer · Redwood City, California',
      'the components, patterns and systems the screens are built from',
      'Selected work',
      'Paste and Twilio product unification',
      'Experience',
      'About',
      'sim racing, video games and watch collecting',
      'Contact',
      'Simon Taggart — Product Engineer',
      'application/ld+json',
      'https://schema.org',
    ],
    path: '/',
    status: 200,
  },
  {
    content: [
      'Paste and Twilio product unification',
      'every Twilio team was on Paste or adopting it',
      'first principal-level front-end engineer',
      'Aayush Iyer',
      'twilio-labs/paste',
      'Loreina Chew',
      'Back to selected work',
      'Simon Taggart — Paste and Twilio product unification',
    ],
    path: '/work/paste',
    status: 200,
  },
  { content: ['Nothing here.', 'Back to the front page'], path: '/posts', status: 404 },
  { content: ['Nothing here.'], path: '/posts/2021-01-01-2020-year-in-review', status: 404 },
  { content: ['Nothing here.'], path: '/posts/some-nonsense', status: 404 },
  { content: ['Nothing here.'], path: '/work/sesco', status: 404 },
  { content: ['Nothing here.'], path: '/work/accessible-systems', status: 404 },
  { content: ['Nothing here.'], path: '/work/nope', status: 404 },
];

const retiredClaims = [
  'a few desks away',
  'sit nearby',
  'sit close by',
  'It is a small team',
  'nobody to hand off to',
  'Download CV',
  'I do not recommend the cascade',
  'meme generator',
  'the writing index',
  'I was product owner and architect from inception',
  'SESCO trading platform',
  'Accessible product systems',
];

const expectedSiteWideHeadContent = [
  'https://static.cloudflareinsights.com/beacon.min.js',
  'data-cf-beacon',
  '511d2ddb672f42599f188f248a7bc403',
];

interface HostMode {
  headers?: Record<string, string>;
  indexable: boolean;
  label: string;
  origin: string;
  robotsTxt: string;
}

const hostModes: Array<HostMode> = [
  {
    indexable: false,
    label: 'preview host',
    origin: baseUrl,
    robotsTxt: 'User-agent: *\nDisallow: /\n',
  },
  {
    headers: { host: 'www.simontaggart.com' },
    indexable: true,
    label: 'production host',
    origin: productionOrigin,
    robotsTxt: `User-agent: *\nAllow: /\nSitemap: ${productionOrigin}/sitemap.xml\n`,
  },
];

function headTags(html: string, key: string): Array<string> {
  return [...html.matchAll(/<(?:meta|link)\b[^>]*>/g)]
    .map(([tag]) => tag)
    .filter(
      (tag) =>
        tag.includes(`name="${key}"`) ||
        tag.includes(`property="${key}"`) ||
        tag.includes(`rel="${key}"`),
    );
}

function onlyTag(html: string, key: string, context: string): string {
  const found = headTags(html, key);

  if (found.length !== 1) {
    throw new Error(`${context} has ${found.length} "${key}" tags, expected exactly 1`);
  }

  return found[0];
}

function attribute(tag: string, name: string, context: string): string {
  const value = new RegExp(`${name}="([^"]*)"`).exec(tag)?.[1];

  if (value === undefined) {
    throw new Error(`${context} tag ${tag} has no ${name} attribute`);
  }

  return value;
}

function expectEqual(actual: string, expected: string, context: string): void {
  if (actual !== expected) {
    throw new Error(
      `${context}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`,
    );
  }
}

const singletonMetaKeys = [
  'description',
  'og:title',
  'og:description',
  'og:url',
  'og:image',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
];

function checkMetadata(html: string, mode: HostMode, path: string): void {
  const context = `${mode.label} ${path}`;
  const titles = [...html.matchAll(/<title>/g)];

  if (titles.length !== 1) {
    throw new Error(`${context} has ${titles.length} <title> tags, expected exactly 1`);
  }

  const url = `${mode.origin}${path}`;
  const image = `${mode.origin}/og.png`;

  for (const key of singletonMetaKeys) {
    onlyTag(html, key, context);
  }

  expectEqual(
    attribute(onlyTag(html, 'og:url', context), 'content', context),
    url,
    `${context} og:url`,
  );
  expectEqual(
    attribute(onlyTag(html, 'og:image', context), 'content', context),
    image,
    `${context} og:image`,
  );
  expectEqual(
    attribute(onlyTag(html, 'twitter:image', context), 'content', context),
    image,
    `${context} twitter:image`,
  );

  if (path === '/') {
    const jsonLd = /<script type="application\/ld\+json">(.*?)<\/script>/s.exec(html)?.[1] ?? '';

    for (const expected of [`"url":"${mode.origin}"`, `"image":"${image}"`]) {
      if (!jsonLd.includes(expected)) {
        throw new Error(`${context} Person JSON-LD is missing ${expected}`);
      }
    }
  }

  const canonicals = headTags(html, 'canonical');
  const robots = headTags(html, 'robots');

  if (mode.indexable) {
    expectEqual(
      attribute(onlyTag(html, 'canonical', context), 'href', context),
      url,
      `${context} canonical`,
    );

    if (robots.length > 0) {
      throw new Error(`${context} should not be noindexed, found ${robots.join(' ')}`);
    }

    return;
  }

  if (canonicals.length > 0) {
    throw new Error(`${context} should have no canonical, found ${canonicals.join(' ')}`);
  }

  expectEqual(
    attribute(onlyTag(html, 'robots', context), 'content', context),
    'noindex, nofollow',
    `${context} robots`,
  );
}

const server = Bun.spawn(
  ['bun', 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    stderr: 'inherit',
    stdout: 'inherit',
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

  for (const mode of hostModes) {
    const init = mode.headers ? { headers: mode.headers } : undefined;

    for (const { content, path, status } of routeChecks) {
      const response = await fetch(`${baseUrl}${path}`, init);
      const body = await response.text();

      if (response.status !== status) {
        throw new Error(`${mode.label} ${path} returned ${response.status}, expected ${status}`);
      }

      for (const expectedContent of content ?? []) {
        if (!body.includes(expectedContent)) {
          throw new Error(`${path} did not include expected content: ${expectedContent}`);
        }
      }

      for (const retiredClaim of retiredClaims) {
        if (body.includes(retiredClaim)) {
          throw new Error(`${path} still carries the retired claim: ${retiredClaim}`);
        }
      }

      for (const expectedHeadContent of expectedSiteWideHeadContent) {
        if (!body.includes(expectedHeadContent)) {
          throw new Error(`${path} did not include site-wide head content: ${expectedHeadContent}`);
        }
      }

      if (status === 200) {
        checkMetadata(body, mode, path);
      }

      console.log(`ok ${mode.label} ${path}`);
    }

    const robotsResponse = await fetch(`${baseUrl}/robots.txt`, init);

    expectEqual(
      robotsResponse.headers.get('content-type') ?? '',
      'text/plain; charset=utf-8',
      `${mode.label} /robots.txt content-type`,
    );
    expectEqual(await robotsResponse.text(), mode.robotsTxt, `${mode.label} /robots.txt`);

    console.log(`ok ${mode.label} /robots.txt`);
  }
} finally {
  server.kill();
  await server.exited;
}

export {};
