import dmSansWoff2 from '@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url';
import instrumentSerifWoff2 from '@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2?url';
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
  errorComponent: ErrorPage,
  head: () => ({
    links: [
      {
        href: '/favicon.svg',
        rel: 'icon',
        type: 'image/svg+xml',
      },
      {
        href: '/favicon-32.png',
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        href: '/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        sizes: '180x180',
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

function ErrorPage(): ReactElement {
  return (
    <PageShell>
      <h1 className="font-serif text-title">Something went wrong.</h1>
      <Row>
        <p className="mt-8">
          That one is on me, not you. Reload the page, or start again from the{' '}
          <Link to="/">front page</Link>.
        </p>
      </Row>
    </PageShell>
  );
}

function RootDocument({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="en">
      <head>
        <meta content="#040614" name="theme-color" />
        <link
          as="font"
          crossOrigin="anonymous"
          href={instrumentSerifWoff2}
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          href={dmSansWoff2}
          rel="preload"
          type="font/woff2"
        />
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
