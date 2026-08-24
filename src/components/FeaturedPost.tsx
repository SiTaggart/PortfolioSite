import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import type React from 'react';

import { formatPostDate } from '../content/formatPostDate';
import type { PostMeta } from '../types';
import { AppLink } from './AppLink';

interface FeaturedPostProps {
  headingLevel?: 'h2' | 'h3';
  post: {
    meta: PostMeta;
    slug: string;
  };
}

export function FeaturePost({
  headingLevel = 'h2',
  post: { meta, slug },
}: FeaturedPostProps): React.ReactElement {
  return (
    <Box
      borderColor="colorBorder"
      borderRadius="borderRadius30"
      borderStyle="solid"
      borderWidth="borderWidth20"
      padding="space40"
    >
      <Text
        as={headingLevel}
        fontSize="fontSize50"
        fontWeight="fontWeightNormal"
        lineHeight="lineHeight50"
      >
        <AppLink params={{ slug }} to="/posts/$slug">
          {meta.title}
        </AppLink>
      </Text>
      <Text
        as="p"
        color="colorTextWeak"
        fontSize="fontSize30"
        lineHeight="lineHeight30"
        marginBottom="space20"
      >
        {formatPostDate(meta.date)}
      </Text>
      <Text as="p" fontSize="fontSize30" lineHeight="lineHeight30">
        {meta.description}
      </Text>
    </Box>
  );
}
