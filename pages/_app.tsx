import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { css, CSSObject } from '@styled-system/css';
import { pasteBaseStyles } from '@twilio-paste/theme';
import { Box } from '@twilio-paste/core';
import { PortfolioTheme } from '../theme';
import { getPrismStyles } from '../theme/prism';
import { ComponentProvider } from '../components/ComponentProvider';

const StyledBase = styled(Box)(pasteBaseStyles);

interface GlobalStylesProps {
  theme: {};
}
const globalStyles = (props: GlobalStylesProps): CSSObject =>
  css({
    html: {
      fontSize: '100%',
    },
    body: {
      margin: 0,
      fontSize: 'fontSize30',
    },
  })(props);

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Simon Taggart</title>
      <link
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤓</text></svg>"
        rel="icon"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Fira+Mono&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ComponentProvider>
      <ThemeProvider theme={PortfolioTheme}>
        <Global styles={globalStyles({ theme: PortfolioTheme })} />
        <Global styles={getPrismStyles({ theme: PortfolioTheme })} />
        <StyledBase
          as="main"
          marginBottom="space200"
          // @ts-ignore
          marginLeft={['space50', 'space50', 'auto']}
          // @ts-ignore
          marginRight={['space50', 'space50', 'auto']}
          marginTop={['space30', 'space30', 'space170']}
          maxWidth="size100"
        >
          <Component {...pageProps} />
        </StyledBase>
      </ThemeProvider>
    </ComponentProvider>
  </>
);

// eslint-disable-next-line import/no-default-export
export default App;
