import * as React from 'react';
import { Heading } from '@twilio-paste/core';

const Layout = (frontMatter: any) => ({ children: content }: any) => (
  <div>
    <Heading as="h1" variant="heading10">
      {frontMatter.title}
    </Heading>
    {content}
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
