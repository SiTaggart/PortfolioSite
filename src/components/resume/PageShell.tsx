import type { ReactElement, ReactNode } from 'react';

import { Footer } from './Footer';
import { PageFrame } from './PageFrame';
import { SkipLink } from './SkipLink';

interface PageShellProps {
  children: ReactNode;
  header?: ReactNode;
}

export function PageShell({ children, header }: PageShellProps): ReactElement {
  return (
    <>
      <SkipLink />
      <PageFrame>
        {header}
        <main className="outline-none" id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </PageFrame>
    </>
  );
}
