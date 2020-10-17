import * as React from 'react';
import { Heading } from '@twilio-paste/core/heading';

const Layout: React.FC = ({ children: content, frontMatter }: any) => (
  <div>
    <Heading as="h1" variant="heading10">
      {frontMatter.title}
    </Heading>
    {content}
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
