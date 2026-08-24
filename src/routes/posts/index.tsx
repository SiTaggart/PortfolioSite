import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@twilio-paste/core/box';
import type React from 'react';

import { FeaturePost } from '../../components/FeaturedPost';
import { SiteMainHeading } from '../../components/SiteMainHeading';
import { SiteSubHeading } from '../../components/SiteSubHeading';
import { posts } from '../../content/posts';
import { canonicalUrl, defaultMeta } from '../../seo';

export const Route = createFileRoute('/posts/')({
  component: Posts,
  head: () => ({
    links: [{ href: canonicalUrl('/posts'), rel: 'canonical' }],
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
        {posts.map((post) => (
          <Box as="li" key={post.slug} listStyleType="none" marginBottom="space40">
            <FeaturePost post={post} />
          </Box>
        ))}
      </Box>
    </>
  );
}
