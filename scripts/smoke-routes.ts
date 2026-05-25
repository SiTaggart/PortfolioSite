const routes = [
  '/',
  '/posts',
  '/posts/2016-02-01-how-we-css-at-bigcommerce',
  '/posts/2016-02-20-how-we-use-sass-maps-for-design-tokens-and-developer-happiness',
  '/posts/2016-03-04-the-living-styleguide-pattern-lab',
  '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me',
  '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-%40-me',
  '/posts/2021-01-01-2020-year-in-review',
];

const expectedContentByRoute = new Map<string, string>([
  ['/', 'Simon'],
  ['/posts', '2020 - Year in review'],
  ['/posts/2016-02-01-how-we-css-at-bigcommerce', 'CSS is hard'],
  [
    '/posts/2016-02-20-how-we-use-sass-maps-for-design-tokens-and-developer-happiness',
    'How we use Sass Maps for Design Tokens and Developer Happiness',
  ],
  ['/posts/2016-03-04-the-living-styleguide-pattern-lab', 'Pattern-Lab'],
  [
    '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me',
    'I’m super good at CSS',
  ],
  [
    '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-%40-me',
    'I’m super good at CSS',
  ],
  ['/posts/2021-01-01-2020-year-in-review', '2020 - Year in review'],
]);

const expectedSiteWideHeadContent = [
  'type="application/ld+json"',
  'https://schema.org',
  'https://static.cloudflareinsights.com/beacon.min.js',
  'data-cf-beacon',
  '511d2ddb672f42599f188f248a7bc403',
  'profile:first_name',
  'profile:last_name',
];

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;

const server = Bun.spawn(
  ['bun', 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    stderr: 'pipe',
    stdout: 'pipe',
  },
);

const previewReadyPattern = new RegExp(`https?://[^\\s]+:${port}/`);
const decoder = new TextDecoder();
let previewExitedCode: number | null = null;
let previewOutput = '';
let previewReady = false;

async function waitForPreviewExit(): Promise<number> {
  const exitCode = await server.exited;
  previewExitedCode = exitCode;
  return exitCode;
}

// Keep this unawaited so preview startup can race against an early process exit.
// oxlint-disable-next-line unicorn/prefer-top-level-await
const previewExited = waitForPreviewExit();

async function collectProcessOutput(stream: ReadableStream<Uint8Array> | null): Promise<void> {
  if (!stream) {
    return;
  }

  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      previewOutput += decoder.decode();
      return;
    }

    const chunk = decoder.decode(value, { stream: true });
    previewOutput += chunk;

    if (previewReadyPattern.test(previewOutput)) {
      previewReady = true;
    }
  }
}

const outputCollected = Promise.all([
  collectProcessOutput(server.stdout),
  collectProcessOutput(server.stderr),
]);

async function previewExitError(exitCode: number): Promise<Error> {
  await outputCollected;

  const output = previewOutput.trim();

  return new Error(
    output
      ? `Preview server exited with code ${exitCode} before ${baseUrl} was ready:\n${output}`
      : `Preview server exited with code ${exitCode} before ${baseUrl} was ready`,
  );
}

async function assertPreviewRunning(): Promise<void> {
  if (previewExitedCode !== null) {
    throw await previewExitError(previewExitedCode);
  }
}

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    await assertPreviewRunning();

    if (previewReady) {
      try {
        const response = await fetch(baseUrl);

        if (response.ok) {
          await assertPreviewRunning();
          return;
        }
      } catch (error: unknown) {
        if (!(error instanceof Error)) {
          throw error;
        }
      }
    }

    await Bun.sleep(250);
  }

  await assertPreviewRunning();
  throw new Error(`Preview server did not start at ${baseUrl}`);
}

try {
  await waitForServer();

  for (const route of routes) {
    const response = await fetch(`${baseUrl}${route}`);
    const body = await response.text();
    const expectedContent = expectedContentByRoute.get(route);

    if (response.status !== 200) {
      throw new Error(`${route} returned ${response.status}`);
    }

    if (!expectedContent || !body.includes(expectedContent)) {
      throw new Error(`${route} did not include expected content: ${expectedContent}`);
    }

    for (const expectedHeadContent of expectedSiteWideHeadContent) {
      if (!body.includes(expectedHeadContent)) {
        throw new Error(`${route} did not include site-wide head content: ${expectedHeadContent}`);
      }
    }

    console.log(`ok ${route}`);
  }
} finally {
  server.kill();
  await previewExited;
  await outputCollected;
}

export {};
