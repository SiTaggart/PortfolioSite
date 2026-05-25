import { createFileRoute } from '@tanstack/react-router';
import { Anchor } from '@twilio-paste/core/anchor';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import type React from 'react';

import { AppLink } from '../../components/AppLink';
import { FeaturePost } from '../../components/FeaturedPost';
import { SiteMainHeading } from '../../components/SiteMainHeading';
import { SiteSubHeading } from '../../components/SiteSubHeading';
import { posts } from '../content/posts';
import { defaultMeta } from '../seo';

const employmentStartYear = 2004;
const yearsOfExperience = new Date().getFullYear() - employmentStartYear;

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: defaultMeta('Hi'),
  }),
});

function Index(): React.ReactElement {
  const latestPost = posts[0].meta;

  return (
    <>
      <SiteMainHeading>
        Simon <br /> Taggart
      </SiteMainHeading>

      <SiteSubHeading>Design Systems &amp; Accessibility</SiteSubHeading>

      <Paragraph>
        A UX Engineer currently working as an Architect / Director at{' '}
        <Anchor href="https://www.twilio.com">Twilio</Anchor>, on{' '}
        <Anchor href="https://paste.twilio.design">Design Systems</Anchor>. I have over{' '}
        {yearsOfExperience} years experience in Web Development and Front-End Engineering,
        specialising in building user interfaces for web sites and web applications.
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
        <FeaturePost post={latestPost} />

        <Text as="div" marginTop="space30" textAlign="center">
          <AppLink to="/posts">All posts</AppLink>
        </Text>
      </Box>
    </>
  );
}
