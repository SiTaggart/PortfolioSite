/**
 * Serves the built site and asserts the things type-checking and linting cannot
 * see: that every route actually responds, that unknown paths 404, and that the
 * production-only parts of the head and robots.txt switch on the request host.
 *
 * Run `bun run build` first; this drives `vite preview` against `dist/`.
 */
import { sleep, spawn } from 'bun';

const port = 4178;
const baseUrl = `http://127.0.0.1:${port}`;
const productionHost = 'www.simontaggart.com';
const productionOrigin = `https://${productionHost}`;

interface Page {
  body: string;
  status: number;
}

async function get(path: string, host?: string): Promise<Page> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: host === undefined ? {} : { host },
    redirect: 'manual',
  });

  return { body: await response.text(), status: response.status };
}

const failures: Array<string> = [];

function check(description: string, condition: boolean): void {
  if (!condition) {
    failures.push(description);
  }
}

async function checkProductionHead(): Promise<void> {
  const { body } = await get('/', productionHost);

  check(
    'production / has a canonical pointing at the production origin',
    body.includes(`href="${productionOrigin}/" rel="canonical"`),
  );
  check(
    'production / has an absolute og:image',
    body.includes(`content="${productionOrigin}/og.png" property="og:image"`),
  );
  check('production / is indexable', !body.includes('name="robots"'));
}

async function checkPreviewHead(): Promise<void> {
  const { body } = await get('/');

  check('preview / is noindex', body.includes('name="robots"') && body.includes('noindex'));
  check('preview / has no canonical', !body.includes('rel="canonical"'));
}

async function checkRoutes(): Promise<void> {
  const home = await get('/');

  check('/ responds 200', home.status === 200);
  check('/ renders the name in an h1', /<h1[^>]*>Simon Taggart</.test(home.body));
  check(
    '/ keeps the h1 inside the main landmark the skip link targets',
    home.body.indexOf('id="main"') < home.body.indexOf('<h1'),
  );
  check('/ links to the case study', home.body.includes('href="/work/paste"'));

  const study = await get('/work/paste');

  check('/work/paste responds 200', study.status === 200);
  check('/work/paste renders its title in an h1', /<h1[^>]*>Paste and Twilio/.test(study.body));

  const missing = await get('/nope');

  check('an unknown path responds 404', missing.status === 404);
  check('an unknown path renders the not-found page', missing.body.includes('Nothing here.'));
}

async function checkRobots(): Promise<void> {
  const preview = await get('/robots.txt');

  check('preview robots.txt responds 200', preview.status === 200);
  check('preview robots.txt disallows crawling', preview.body.includes('Disallow: /'));

  const production = await get('/robots.txt', productionHost);

  check('production robots.txt allows crawling', production.body.includes('Allow: /'));
  check(
    'production robots.txt points at the production sitemap',
    production.body.includes(`Sitemap: ${productionOrigin}/sitemap.xml`),
  );
}

async function checkSitemap(): Promise<void> {
  const { body, status } = await get('/sitemap.xml', productionHost);

  check('sitemap.xml responds 200', status === 200);
  check('sitemap.xml lists the front page', body.includes(`<loc>${productionOrigin}/</loc>`));
  check(
    'sitemap.xml lists the case study',
    body.includes(`<loc>${productionOrigin}/work/paste</loc>`),
  );
}

async function waitForServer(): Promise<void> {
  const deadline = Date.now() + 60_000;

  while (Date.now() < deadline) {
    try {
      await fetch(baseUrl, { signal: AbortSignal.timeout(2000) });

      return;
    } catch {
      await sleep(250);
    }
  }

  throw new Error(`the preview server did not start on ${baseUrl} within 60s`);
}

const server = spawn(
  ['bun', 'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  { stderr: 'pipe', stdout: 'pipe' },
);

try {
  await waitForServer();

  await checkRoutes();
  await checkRobots();
  await checkSitemap();
  await checkProductionHead();
  await checkPreviewHead();
} finally {
  server.kill();
  await server.exited;
}

if (failures.length > 0) {
  console.error(`Smoke failed:\n${failures.map((failure) => `  - ${failure}`).join('\n')}`);
  process.exit(1);
}

console.log('Smoke passed.');
