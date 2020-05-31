import * as React from 'react';

const Layout = (frontMatter: any) => ({ children: content }: any) => (
  <div>
    <h1>{frontMatter.title}</h1>
    {content}
  </div>
);

// eslint-disable-next-line import/no-default-export
export default Layout;
