declare module '*.mdx' {
  import type { ComponentType } from 'react';

  import type { MetaDataShape } from './index';

  export const meta: MetaDataShape;

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
