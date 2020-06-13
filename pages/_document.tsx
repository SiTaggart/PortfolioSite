import * as React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

// eslint-disable-next-line import/no-default-export
export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
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
      </html>
    );
  }
}
