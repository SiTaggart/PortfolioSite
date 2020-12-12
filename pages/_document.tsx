import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤓</text></svg>"
            rel="icon"
          />
          <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Fira+Mono&display=swap"
            rel="stylesheet"
          />
          <link crossOrigin="" href="https://www.google-analytics.com" rel="preconnect" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-10401619-1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (!window.Cypress) {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'UA-10401619-1');
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
