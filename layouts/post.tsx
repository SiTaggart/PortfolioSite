import * as React from 'react';
import { Text } from '@twilio-paste/core';

const Post = (frontMatter: any) => ({ children: content }: any) => {
  return (
    <>
      <Text
        as="h1"
        css={{
          color: '#fffffe',
        }}
        fontSize={['fontSize80', 'fontSize100']}
        letterSpacing="-1px"
        lineHeight={['lineHeight80', 'lineHeight100']}
      >
        {frontMatter.title}
      </Text>
      <Text as="p" color="colorTextWeak" marginBottom="space100">
        {frontMatter.date.toDateString()}
      </Text>
      {content}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Post;
