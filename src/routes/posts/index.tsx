import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@twilio-paste/core/box';
import type React from 'react';

import { FeaturePost } from '../../components/FeaturedPost';
import { SiteMainHeading } from '../../components/SiteMainHeading';
import { SiteSubHeading } from '../../components/SiteSubHeading';
import { posts } from '../../content/posts';
import { defaultMeta } from '../../seo';

export const Route = createFileRoute('/posts/')({
  component: Posts,
  head: () => ({
    meta: defaultMeta('Posts'),
  }),
});

function Posts(): React.ReactElement {
  return (
    <>
      <SiteMainHeading>
        Simon <br /> Taggart
      </SiteMainHeading>

      <SiteSubHeading>Design Systems &amp; Accessibility</SiteSubHeading>
      <Box as="ul" margin="space0" padding="space0">
        {posts.map(({ meta }) => (
          <Box as="li" key={meta.slug} listStyleType="none" marginBottom="space40">
            <FeaturePost post={meta} />
          </Box>
        ))}
      </Box>
    </>
  );
}
