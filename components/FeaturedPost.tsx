import type React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { formatPostDate } from '../src/content/formatPostDate';
import { AppLink } from './AppLink';

interface FeaturedPostProps {
  post: {
    title: string;
    description: string;
    date: string;
    slug: string;
  };
}

function routeSlug(slug: string): string {
  const postsPrefix = '/posts/';

  return slug.startsWith(postsPrefix) ? slug.slice(postsPrefix.length) : slug;
}

export function FeaturePost({ post }: FeaturedPostProps): React.ReactElement {
  return (
    <Box
      borderColor="colorBorder"
      borderRadius="borderRadius30"
      borderStyle="solid"
      borderWidth="borderWidth20"
      padding="space40"
    >
      <Text as="h2" fontSize="fontSize50" fontWeight="fontWeightNormal" lineHeight="lineHeight50">
        <AppLink params={{ slug: routeSlug(post.slug) }} to="/posts/$slug">
          {post.title}
        </AppLink>
      </Text>
      <Text
        as="p"
        color="colorTextWeak"
        fontSize="fontSize30"
        lineHeight="lineHeight30"
        marginBottom="space20"
      >
        {formatPostDate(post.date)}
      </Text>
      <Text as="p" fontSize="fontSize30" lineHeight="lineHeight30">
        {post.description}
      </Text>
    </Box>
  );
}
