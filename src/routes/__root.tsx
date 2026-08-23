import dmSansWoff2 from '@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url';
import dmSerifDisplayWoff2 from '@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2?url';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter,
} from '@tanstack/react-router';
import { type ReactElement, type ReactNode, useEffect } from 'react';

import { Atmosphere } from '../components/resume/Atmosphere';
import { PageShell } from '../components/resume/PageShell';
import { Row } from '../components/resume/Row';
import { pageTitle } from '../seo';
import { currentSite } from '../site';

import appCss from '../styles.css?url';

const cloudflareBeaconConfig = JSON.stringify({ token: '511d2ddb672f42599f188f248a7bc403' });

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤓</text></svg>',
        rel: 'icon',
      },
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
      { title: pageTitle() },
      ...(currentSite().isProduction ? [] : [{ content: 'noindex, nofollow', name: 'robots' }]),
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
  return (
    <>
      <RouteFocus />
      <Outlet />
    </>
  );
}

function RouteFocus(): null {
  const router = useRouter();

  useEffect(
    () =>
      router.subscribe('onResolved', ({ fromLocation, toLocation }) => {
        if (fromLocation?.pathname === toLocation.pathname) {
          return;
        }

        const anchor = document.getElementById(toLocation.hash.replace('#', ''));

        if (anchor) {
          anchor.focus();

          return;
        }

        globalThis.scrollTo({ behavior: 'instant', left: 0, top: 0 });
        document.querySelector('main')?.focus({ preventScroll: true });
      }),
    [router],
  );

  return null;
}

function NotFound(): ReactElement {
  return (
    <PageShell>
      <h1 className="font-serif text-title">Nothing here.</h1>
      <Row>
        <p className="mt-8">
          That page does not exist, or it did once and does not any more.{' '}
          <Link to="/">Back to the front page</Link>.
        </p>
      </Row>
    </PageShell>
  );
}

function RootDocument({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta content="#0a0e18" name="theme-color" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={dmSerifDisplayWoff2}
          rel="preload"
          type="font/woff2"
        />
        <link as="font" crossOrigin="anonymous" href={dmSansWoff2} rel="preload" type="font/woff2" />
        <HeadContent />
      </head>
      <body>
        <Atmosphere />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
