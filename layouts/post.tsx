import * as React from 'react';
import { Text } from '@twilio-paste/core';

const Post = (frontMatter: any) => ({ children: content }: any) => (
  <>
    <Text
      as="h1"
      css={{
        color: '#fffffe',
      }}
      fontSize={['fontSize80', 'fontSize100']}
      letterSpacing="-1px"
      lineHeight={['lineHeight80', 'lineHeight100']}
      marginBottom="space100"
    >
      {frontMatter.title}
    </Text>
    {content}
  </>
);

// eslint-disable-next-line import/no-default-export
export default Post;
