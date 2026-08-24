import type { ReactElement, ReactNode } from 'react';

import { PageFrame } from './PageFrame';
import { SkipLink } from './SkipLink';

export function PageShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <SkipLink />
      <PageFrame>
        <main className="outline-none" id="main" tabIndex={-1}>
          {children}
        </main>
      </PageFrame>
    </>
  );
}
