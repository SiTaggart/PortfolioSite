import { Anchor } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import { Text } from '@twilio-paste/core/text';
import type React from 'react';

import GithubIcon from '../icons/ic-github.svg?react';
import LinkedInIcon from '../icons/ic-linkedin.svg?react';
import TwitterIcon from '../icons/ic-twitter.svg?react';
import { AppLink } from './AppLink';

type SiteFooterIconName = 'github' | 'linkedin' | 'twitter';

const siteFooterIcons = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
} satisfies Record<SiteFooterIconName, React.FunctionComponent<React.SVGProps<SVGSVGElement>>>;

export function StyledSiteFooter(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Box
      as="footer"
      marginLeft={['space0', 'space50', 'space100']}
      marginRight={['space0', 'space50', 'space100']}
      marginTop="space180"
      paddingBottom="space140"
      paddingTop="space70"
      {...props}
    />
  );
}

export function SiteFooterList(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Box
      alignItems="center"
      as="ul"
      display="flex"
      justifyContent="space-between"
      margin="space0"
      padding="space0"
      {...props}
    />
  );
}

export function SiteFooterListItem(props: React.PropsWithChildren): React.ReactElement {
  return <Box as="li" listStyleType="none" {...props} />;
}

export function SiteFooterIconWrapper(props: React.PropsWithChildren): React.ReactElement {
  return (
    <Text
      _hover={{
        color: 'colorTextLink',
      }}
      as="span"
      color="colorTextBrandHighlight"
      display="flex"
      {...props}
    />
  );
}

interface SiteFooterIconProps {
  name: SiteFooterIconName;
}

function SiteFooterIcon({ name }: SiteFooterIconProps): React.ReactElement {
  const Icon = siteFooterIcons[name];

  return (
    <Box aria-hidden="true" as="span" display="block" height="sizeIcon90" width="sizeIcon90">
      <Icon
        aria-hidden="true"
        focusable="false"
        height="100%"
        style={{ display: 'block', fill: 'currentColor' }}
        width="100%"
      />
    </Box>
  );
}

export function SiteFooter(): React.ReactElement {
  return (
    <StyledSiteFooter>
      <SiteFooterList>
        <SiteFooterListItem>
          <AppLink to="/">Home</AppLink>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.twitter.com/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="twitter" />
              <ScreenReaderOnly>Find me on Twitter</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.github.com/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="github" />
              <ScreenReaderOnly>Find me on GitHub</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.linkedin.com/in/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon name="linkedin" />
              <ScreenReaderOnly>Find me on LinkedIn</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
      </SiteFooterList>
    </StyledSiteFooter>
  );
}
