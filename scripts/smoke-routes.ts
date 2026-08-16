interface RouteCheck {
  content?: ReadonlyArray<string>;
  path: string;
  status: number;
}

const routeChecks: Array<RouteCheck> = [
  {
    content: ['Simon Taggart', 'SESCO', 'Twilio', 'Are My Colors Accessible'],
    path: '/',
    status: 200,
  },
  { content: ['Nothing here.'], path: '/posts', status: 404 },
];

const expectedSiteWideHeadContent = [
  'type="application/ld+json"',
  'https://schema.org',
  'https://static.cloudflareinsights.com/beacon.min.js',
  'data-cf-beacon',
  '511d2ddb672f42599f188f248a7bc403',
  'profile:first_name',
  'profile:last_name',
];

const port = 4174;
const baseUrl = `http://127.0.0.1:${port}`;

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

  for (const { content, path, status } of routeChecks) {
    const response = await fetch(`${baseUrl}${path}`);
    const body = await response.text();

    if (response.status !== status) {
      throw new Error(`${path} returned ${response.status}, expected ${status}`);
    }

    for (const expectedContent of content ?? []) {
      if (!body.includes(expectedContent)) {
        throw new Error(`${path} did not include expected content: ${expectedContent}`);
      }
    }

    for (const expectedHeadContent of expectedSiteWideHeadContent) {
      if (!body.includes(expectedHeadContent)) {
        throw new Error(`${path} did not include site-wide head content: ${expectedHeadContent}`);
      }
    }

    console.log(`ok ${path}`);
  }
} finally {
  server.kill();
  await server.exited;
}

export {};
