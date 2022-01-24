import * as React from 'react';
import { useUID } from 'react-uid';
import reverse from 'lodash.reverse';
import sortBy from 'lodash.sortby';
import { NextSeo } from 'next-seo';
import { Box } from '@twilio-paste/core/box';
import { SiteMainHeading } from '../../components/SiteMainHeading';
import { SiteSubHeading } from '../../components/SiteSubHeading';
// @ts-ignore
import { meta as allPosts } from './**/*.mdx';
import { FeaturePost } from '../../components/FeaturedPost';

const Posts: React.FC = () => {
  const sortedPosts = reverse(sortBy(allPosts, ['date']));
  return (
    <>
      <NextSeo title="Posts" />
      <SiteMainHeading>
        Simon <br /> Taggart
      </SiteMainHeading>

      <SiteSubHeading>Design Systems &amp; Accessibility</SiteSubHeading>
      <Box as="ul" margin="space0" padding="space0">
        {sortedPosts.map((post) => (
          <Box key={useUID()} as="li" listStyleType="none" marginBottom="space40">
            <FeaturePost post={post} />
          </Box>
        ))}
      </Box>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Posts;
