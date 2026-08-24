import { Text } from '@twilio-paste/core/text';
import type React from 'react';

import { formatPostDate } from '../content/formatPostDate';
import type { PostMeta } from '../types';

interface PostLayoutProps {
  children: React.ReactNode;
  meta: PostMeta;
}

export function PostLayout({
  children,
  meta: { date, title },
}: PostLayoutProps): React.ReactElement {
  return (
    <>
      <Text
        as="h1"
        color="colorTextWeak"
        fontSize={['fontSize80', 'fontSize100']}
        letterSpacing="-1px"
        lineHeight={['lineHeight80', 'lineHeight100']}
      >
        {title}
      </Text>
      <Text as="p" color="colorTextWeak" marginBottom="space100">
        {formatPostDate(date)}
      </Text>
      {children}
    </>
  );
}
