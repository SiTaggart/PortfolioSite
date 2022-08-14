import type React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import { StylingGlobals, css } from '@twilio-paste/core/styling-library';
import { GenericThemeShape } from '@twilio-paste/core/theme';
import { CustomizationProvider } from '@twilio-paste/core/customization';
import { Box } from '@twilio-paste/core/box';
import PortfolioTheme from '../theme/theme.json';
import { getPrismStyles } from '../theme/prism';
import { ComponentProvider } from '../components/ComponentProvider';
import { SiteFooter } from '../components/SiteFooter';
import defaultSeoConfig from '../next-seo.json';

interface GlobalStylesProps {
  theme: Partial<GenericThemeShape>;
}
const globalStyles = (props: GlobalStylesProps): any =>
  css({
    body: {
      backgroundColor: '#232946',
    },
  })(props);

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </Head>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-10401619-1" />
    <Script id="google-analytics">
      {`
        if (!window.Cypress) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-10401619-1');
        }
      `}
    </Script>
    <DefaultSeo {...defaultSeoConfig} />
    <SocialProfileJsonLd
      name="Simon Taggart"
      sameAs={[
        'https://twitter.com/sitaggart',
        'https://github.com/SiTaggart',
        'https://www.facebook.com/sitaggart',
        'https://www.instagram.com/sitaggart/',
        'https://www.linkedin.com/in/SiTaggart/',
      ]}
      type="Person"
      url="https://www.simontaggart.com"
    />
    <ComponentProvider>
      <CustomizationProvider baseTheme="default" theme={PortfolioTheme}>
        <StylingGlobals styles={getPrismStyles({ theme: PortfolioTheme })} />
        <StylingGlobals styles={globalStyles({ theme: PortfolioTheme })} />
        <Box
          as="main"
          // @ts-ignore
          marginLeft={['space50', 'space70', 'auto']}
          // @ts-ignore
          marginRight={['space50', 'space70', 'auto']}
          maxWidth="size90"
          paddingTop={['space50', 'space70', 'space170']}
        >
          <Component {...pageProps} />
          <SiteFooter />
        </Box>
      </CustomizationProvider>
    </ComponentProvider>
  </>
);

// eslint-disable-next-line import/no-default-export
export default App;
