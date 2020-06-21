import * as React from 'react';
import { AppProps } from 'next/app';
import { StylingGlobals, styled, ThemeProvider, css } from '@twilio-paste/styling-library';
import { CSSObject } from '@styled-system/css';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import { pasteBaseStyles, ThemeShape } from '@twilio-paste/theme';
import { Box } from '@twilio-paste/core';
import { PortfolioTheme } from '../theme';
import { getPrismStyles } from '../theme/prism';
import { ComponentProvider } from '../components/ComponentProvider';
import { SiteFooter } from '../components/SiteFooter';
import defaultSeoConfig from '../next-seo.json';

const StyledBase = styled(Box)(pasteBaseStyles);

interface GlobalStylesProps {
  theme: ThemeShape;
}
const globalStyles = (props: GlobalStylesProps): CSSObject =>
  css({
    html: {
      fontSize: '100%',
      height: '100vh',
    },
    body: {
      backgroundColor: '#232946',
      margin: 0,
      fontSize: 'fontSize30',
      height: '100vh',
    },
  })(props);

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
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
      <ThemeProvider theme={PortfolioTheme}>
        <StylingGlobals styles={globalStyles({ theme: PortfolioTheme })} />
        <StylingGlobals styles={getPrismStyles({ theme: PortfolioTheme })} />
        <StyledBase
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
        </StyledBase>
      </ThemeProvider>
    </ComponentProvider>
  </>
);

// eslint-disable-next-line import/no-default-export
export default App;
