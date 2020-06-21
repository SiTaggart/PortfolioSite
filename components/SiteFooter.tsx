import * as React from 'react';
import Link from 'next/link';
import { Box, Text, Anchor, ScreenReaderOnly } from '@twilio-paste/core';
import TwitterSVG from '../svg/icons/ic-twitter.svg';
import GithubSVG from '../svg/icons/ic-github.svg';
import LinkedinSVG from '../svg/icons/ic-linkedin.svg';

export const StyledSiteFooter: React.FC<{}> = (props) => (
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

export const SiteFooterList: React.FC<{}> = (props) => (
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

export const SiteFooterListItem: React.FC<{}> = (props) => (
  <Box as="li" listStyleType="none" {...props} />
);

export const SiteFooterIconWrapper: React.FC<{}> = (props) => (
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

export const SiteFooter: React.FC<{}> = () => (
  <StyledSiteFooter>
    <SiteFooterList>
      <SiteFooterListItem>
        <Link href="/">
          <Anchor href="/">Home</Anchor>
        </Link>
      </SiteFooterListItem>
      <SiteFooterListItem>
        <Anchor href="https://www.twitter.com/SiTaggart">
          <SiteFooterIconWrapper>
            <Box
              aria-hidden="true"
              as={TwitterSVG as any}
              css={{
                path: {
                  fill: 'currentColor',
                },
              }}
              height="sizeIcon90"
              width="sizeIcon90"
            />
            <ScreenReaderOnly>Find me on Twitter</ScreenReaderOnly>
          </SiteFooterIconWrapper>
        </Anchor>
      </SiteFooterListItem>
      <SiteFooterListItem>
        <Anchor href="https://www.github.com/SiTaggart">
          <SiteFooterIconWrapper>
            <Box
              aria-hidden="true"
              as={GithubSVG as any}
              css={{
                path: {
                  fill: 'currentColor',
                },
              }}
              height="sizeIcon90"
              width="sizeIcon90"
            />
            <ScreenReaderOnly>Find me on GitHub</ScreenReaderOnly>
          </SiteFooterIconWrapper>
        </Anchor>
      </SiteFooterListItem>
      <SiteFooterListItem>
        <Anchor href="https://www.linkedin.com/in/SiTaggart">
          <SiteFooterIconWrapper>
            <Box
              aria-hidden="true"
              as={LinkedinSVG as any}
              css={{
                path: {
                  fill: 'currentColor',
                },
              }}
              height="sizeIcon90"
              width="sizeIcon90"
            />
            <ScreenReaderOnly>Find me on LinkedIn</ScreenReaderOnly>
          </SiteFooterIconWrapper>
        </Anchor>
      </SiteFooterListItem>
    </SiteFooterList>
  </StyledSiteFooter>
);
