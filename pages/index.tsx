import * as React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import fetch from 'isomorphic-unfetch';
import { NextSeo } from 'next-seo';
import { Anchor } from '@twilio-paste/core/anchor';
import { Text } from '@twilio-paste/core/text';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { SiteMainHeading } from '../components/SiteMainHeading';
import { SiteSubHeading } from '../components/SiteSubHeading';
import { FeaturePost } from '../components/FeaturedPost';
// @ts-ignore
import { meta as lastestPost } from './posts/2021-01-01-2020-year-in-review/index.mdx';
import { TweetCard } from '../components/TweetCard';
import { Tweets } from '../types';

const fetcher = (url: string): Promise<Tweets> => fetch(url).then((r) => r.json());

const Index: React.FC = () => {
  const { data: twitterData } = useSWR('api/tweets', fetcher);
  const employmentStartDate = new Date(2004, 9, 1);
  const yoe = new Date(Date.now()).getFullYear() - employmentStartDate.getFullYear();
  return (
    <>
      <NextSeo title="Hi" />
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

      {twitterData && <TweetCard twitterData={twitterData} />}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Index;
