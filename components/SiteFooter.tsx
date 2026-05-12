import type React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';
import { ScreenReaderOnly } from '@twilio-paste/core/screen-reader-only';
import twitterSvg from '../svg/icons/ic-twitter.svg';
import githubSvg from '../svg/icons/ic-github.svg';
import linkedinSvg from '../svg/icons/ic-linkedin.svg';
import { AppLink } from './AppLink';

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
  src: string;
}

function SiteFooterIcon({ src }: SiteFooterIconProps): React.ReactElement {
  return (
    <Box
      aria-hidden="true"
      as="span"
      display="block"
      height="sizeIcon90"
      style={{
        backgroundColor: 'currentColor',
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
      width="sizeIcon90"
    />
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
              <SiteFooterIcon src={twitterSvg} />
              <ScreenReaderOnly>Find me on Twitter</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.github.com/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon src={githubSvg} />
              <ScreenReaderOnly>Find me on GitHub</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
        <SiteFooterListItem>
          <Anchor href="https://www.linkedin.com/in/SiTaggart">
            <SiteFooterIconWrapper>
              <SiteFooterIcon src={linkedinSvg} />
              <ScreenReaderOnly>Find me on LinkedIn</ScreenReaderOnly>
            </SiteFooterIconWrapper>
          </Anchor>
        </SiteFooterListItem>
      </SiteFooterList>
    </StyledSiteFooter>
  );
}
