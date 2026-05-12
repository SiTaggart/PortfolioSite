const routes = [
  '/',
  '/posts',
  '/posts/2016-02-01-how-we-css-at-bigcommerce',
  '/posts/2016-02-20-how-we-use-sass-maps-for-design-tokens-and-developer-happiness',
  '/posts/2016-03-04-the-living-styleguide-pattern-lab',
  '/posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me',
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
  ['/posts/2021-01-01-2020-year-in-review', '2020 - Year in review'],
]);

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;

const server = Bun.spawn(
  ['bun', 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port)],
  {
    stdout: 'pipe',
    stderr: 'pipe',
  }
);

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);

      if (response.ok) {
        return;
      }
    } catch {
      await Bun.sleep(250);
    }
  }

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

    console.log(`ok ${route}`);
  }
} finally {
  server.kill();
  await server.exited;
}

export {};
