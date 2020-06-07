import * as React from 'react';
import { useUID } from 'react-uid';
import Link from 'next/link';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';
import twitter from 'twitter-text';
import {
  Anchor,
  Text,
  Paragraph,
  UnorderedList,
  ListItem,
  Heading,
  Card,
  Box,
  MediaObject,
  MediaFigure,
  MediaBody,
} from '@twilio-paste/core';
import sortBy from 'lodash.sortby';
import reverse from 'lodash.reverse';
// @ts-ignore
import { frontMatter as allPosts } from './posts/**/*.mdx';
import * as TwitterSVG from '../svg/icons/ic-twitter.svg';

type Tweet = {
  text: string;
};
type Tweets = Tweet[];

const fetcher = (url: string): Promise<Tweets> => fetch(url).then((r) => r.json());

const Index: React.FC = () => {
  const { data: twitterData } = useSWR('api/tweets', fetcher);
  const employmentStartDate = new Date(2004, 9, 1);
  const yoe = new Date(Date.now()).getFullYear() - employmentStartDate.getFullYear();
  const sortedPosts = reverse(sortBy(allPosts, ['date']));
  return (
    <>
      <Text
        as="h1"
        css={{
          color: '#fffffe',
        }}
        fontSize={['fontSize80', 'fontSize110']}
        fontWeight="fontWeightBold"
        letterSpacing="-1px"
        lineHeight={['lineHeight80', 'lineHeight100']}
        marginBottom="space30"
      >
        Simon <br /> Taggart
      </Text>
      <Text
        as="p"
        css={{
          color: '#ff5470',
        }}
        fontSize={['fontSize50', 'fontSize90']}
        fontWeight="fontWeightSemibold"
        lineHeight={['lineHeight60', 'lineHeight90']}
        marginBottom={['space70', 'space140']}
      >
        Design Systems &amp; Accessibility
      </Text>

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
                  <Text as="span" color="colorTextBrandHighlight">
                    <TwitterSVG
                      css={{
                        path: {
                          fill: 'currentColor',
                        },
                      }}
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

      <Heading as="h2" variant="heading20">
        <Link href="/posts/" passHref>
          <Anchor href="/posts/">Long form</Anchor>
        </Link>
      </Heading>
      <UnorderedList>
        {sortedPosts.map((post) => (
          <ListItem key={useUID()}>
            <Link href={post.__resourcePath.replace('index.mdx', '')} passHref>
              <Anchor href={post.__resourcePath.replace('index.mdx', '')}>{post.title}</Anchor>
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Index;
