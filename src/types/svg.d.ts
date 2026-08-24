// Plain `*.svg` imports are typed by vite/client.
declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';

  const Component: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default Component;
}
