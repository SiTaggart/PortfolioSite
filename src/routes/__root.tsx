/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router';
import { Box } from '@twilio-paste/core/box';
import { CustomizationProvider } from '@twilio-paste/core/customization';
import { StylingGlobals, css } from '@twilio-paste/core/styling-library';
import type { GenericThemeShape } from '@twilio-paste/core/theme';
import type React from 'react';
import { ComponentProvider } from '../../components/ComponentProvider';
import { SiteFooter } from '../../components/SiteFooter';
import PortfolioTheme from '../../theme/theme.json';
import { getPrismStyles } from '../../theme/prism';
import { defaultMeta } from '../seo';

interface GlobalStylesProps {
  theme: Partial<GenericThemeShape>;
}

const globalStyles = (props: GlobalStylesProps): ReturnType<ReturnType<typeof css>> =>
  css({
    body: {
      backgroundColor: '#232946',
    },
  })(props);

export const Route = createRootRoute({
  component: RootComponent,
  head: () => ({
    links: [
      {
        href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤓</text></svg>',
        rel: 'icon',
      },
      {
        crossOrigin: '',
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Fira+Mono&display=swap',
        rel: 'stylesheet',
      },
    ],
    meta: [
      {
        charSet: 'utf8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      ...defaultMeta(),
    ],
  }),
  shellComponent: RootDocument,
});

function RootComponent(): React.ReactElement {
  return (
    <ComponentProvider>
      <CustomizationProvider baseTheme="default" theme={PortfolioTheme}>
        <StylingGlobals styles={getPrismStyles({ theme: PortfolioTheme })} />
        <StylingGlobals styles={globalStyles({ theme: PortfolioTheme })} />
        <Box
          as="main"
          maxWidth="size90"
          paddingLeft={['space50', 'space70', 'space0']}
          paddingRight={['space50', 'space70', 'space0']}
          paddingTop={['space50', 'space70', 'space170']}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Outlet />
          <SiteFooter />
        </Box>
      </CustomizationProvider>
    </ComponentProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
