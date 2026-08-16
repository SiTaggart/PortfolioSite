import interWoff2 from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
import instrumentSerifWoff2 from '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2?url';
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import type { ReactElement, ReactNode } from 'react';

import { PageFrame } from '../components/resume/PageFrame';
import { Row } from '../components/resume/Row';
import { SkipLink } from '../components/resume/SkipLink';
import { canonicalLink, defaultMeta, socialProfileJsonLd } from '../seo';

import appCss from '../styles.css?url';

const cloudflareBeaconConfig = JSON.stringify({ token: '511d2ddb672f42599f188f248a7bc403' });
const socialProfileJsonLdScript = JSON.stringify(socialProfileJsonLd).replaceAll(
  '<',
  String.raw`\u003c`,
);

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤓</text></svg>',
        rel: 'icon',
      },
      canonicalLink,
      {
        href: appCss,
        rel: 'stylesheet',
      },
    ],
    meta: [
      {
        // oxlint-disable-next-line text-encoding-identifier-case -- the HTML spec label is utf-8
        charSet: 'utf-8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        content: 'light dark',
        name: 'color-scheme',
      },
      ...defaultMeta(),
    ],
  }),
  notFoundComponent: NotFound,
  scripts: () => [
    {
      'data-cf-beacon': cloudflareBeaconConfig,
      defer: true,
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
    },
  ],
  shellComponent: RootDocument,
});

function RootComponent(): ReactElement {
  return <Outlet />;
}

function NotFound(): ReactElement {
  return (
    <>
      <SkipLink />
      <PageFrame>
        <main className="outline-none" id="main" tabIndex={-1}>
          <h1 className="font-serif text-display">Nothing here.</h1>
          <Row>
            <p className="mt-8">
              That page does not exist, or it did once and does not any more.{' '}
              <Link to="/">Back to the front page</Link>.
            </p>
          </Row>
        </main>
      </PageFrame>
    </>
  );
}

function RootDocument({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta content="#fbfaf6" media="(prefers-color-scheme: light)" name="theme-color" />
        <meta content="#130e0b" media="(prefers-color-scheme: dark)" name="theme-color" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={instrumentSerifWoff2}
          rel="preload"
          type="font/woff2"
        />
        <link as="font" crossOrigin="anonymous" href={interWoff2} rel="preload" type="font/woff2" />
        <HeadContent />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{ __html: socialProfileJsonLdScript }}
          type="application/ld+json"
        />
        <Scripts />
      </body>
    </html>
  );
}
