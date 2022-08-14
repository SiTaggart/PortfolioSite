import type React from 'react';
import { Heading } from '@twilio-paste/core/heading';

const Layout: React.FC = ({ children, meta }: any) => (
  <div>
    <Heading as="h1" variant="heading10">
      {meta.title}
    </Heading>
    {children}
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
