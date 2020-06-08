import * as React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';
import twitter from 'twitter-text';
import { css } from '@styled-system/css';
import {
  Anchor,
  Text,
  Paragraph,
  Heading,
  Card,
  Box,
  MediaObject,
  MediaFigure,
  MediaBody,
} from '@twilio-paste/core';
// @ts-ignore
import { frontMatter as lastestPost } from './posts/2019-01-11-im-super-good-at-css-and-i-dont-recommend-the-cascade-dont-@-me/index.mdx';
import TwitterSVG from '../svg/icons/ic-twitter.svg';
import { SiteMainHeading } from '../components/SiteMainHeading';
import { SiteSubHeading } from '../components/SiteSubHeading';
import { FeaturePost } from '../components/FeaturedPost';

type Tweet = {
  text: string;
};
type Tweets = Tweet[];

const fetcher = (url: string): Promise<Tweets> => fetch(url).then((r) => r.json());

const Index: React.FC = () => {
  const { data: twitterData } = useSWR('api/tweets', fetcher);
  const employmentStartDate = new Date(2004, 9, 1);
  const yoe = new Date(Date.now()).getFullYear() - employmentStartDate.getFullYear();
  return (
    <>
      <SiteMainHeading>
        Simon <br /> Taggart
      </SiteMainHeading>

      <SiteSubHeading>Design Systems &amp; Accessibility</SiteSubHeading>

      <Paragraph>
        A UX Engineer currently working as a Principal UX Engineer at{' '}
        <Anchor href="https://www.twilio.com">Twilio</Anchor>, on{' '}
        <Anchor href="https://paste.twilio.design">Design Systems</Anchor>. I have over {yoe} years
        experience in Web Development and Front-End Engineering, specialising in building user
        interfaces for web sites and web applications.
      </Paragraph>

      <Paragraph>
        Expert in Rapid Prototyping and Semantic and Accessible interfaces, I lead and work with
        engineering and design teams.
      </Paragraph>

      <Paragraph>
        Maker of accessibility colour contrast checker:{' '}
        <Anchor href="https://www.aremycolorsaccessible.com">Are My Colours Accessible</Anchor>
      </Paragraph>

      <Paragraph>
        Previously <Anchor href="https://lightningdesignsystem.com">Salesforce</Anchor>,{' '}
        <Anchor href="https://www.bigcommerce.com">BigCommerce</Anchor>,{' '}
        <Anchor href="https://www.flippa.com">Flippa</Anchor>,{' '}
        <Anchor href="https://www.sitepoint.com">SitePoint</Anchor>,{' '}
        <Anchor href="https://www.orchard.com.au">Orchard</Anchor> and{' '}
        <Anchor href="https://www.abacusemedia.com/">Abacus e-media</Anchor>.
      </Paragraph>

      <Box marginBottom="space140" marginTop="space140">
        <Heading as="h2" variant="heading30">
          Latest post
        </Heading>
        <FeaturePost post={lastestPost} />

        <Text as="div" marginTop="space30" textAlign="center">
          <Link href="/posts/" passHref>
            <Anchor href="/posts/">All posts</Anchor>
          </Link>
        </Text>
      </Box>

      {twitterData && (
        <Box marginBottom="space140" marginTop="space140">
          <Card>
            <Text
              as="h2"
              css={{
                color: '#fffffe',
              }}
              fontSize="fontSize60"
              fontWeight="fontWeightSemibold"
              lineHeight="lineHeight60"
              marginBottom="space20"
            >
              <MediaObject verticalAlign="center">
                <MediaFigure spacing="space20">
                  <Text as="span" color="colorTextBrandHighlight" display="flex">
                    <TwitterSVG
                      aria-hidden="true"
                      css={css({
                        height: 'sizeIcon90',
                        width: 'sizeIcon90',
                        path: {
                          fill: 'currentColor',
                        },
                      })}
                    />
                  </Text>
                </MediaFigure>
                <MediaBody>
                  <Anchor href="https://www.twitter.com/SiTaggart">SiTaggart</Anchor>
                </MediaBody>
              </MediaObject>
            </Text>
            <Text
              as="p"
              dangerouslySetInnerHTML={{
                __html: twitter.autoLink(twitter.htmlEscape(twitterData[0].text)),
              }}
              margin="space0"
            />
          </Card>
        </Box>
      )}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Index;
