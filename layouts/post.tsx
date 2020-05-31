import * as React from 'react';
import { Heading } from '@twilio-paste/core';

const Post = (frontMatter: any) => ({ children: content }: any) => (
  <>
    <Heading as="h1" variant="heading10">
      {frontMatter.title} - thing
    </Heading>
    {content}
  </>
);

// eslint-disable-next-line import/no-default-export
export default Post;
