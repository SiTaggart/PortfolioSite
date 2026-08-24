import type { ReactElement, ReactNode } from 'react';

import { SkipLink } from './SkipLink';

export function PageShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <SkipLink />
      <div className="reading-frame mx-auto max-w-[43.5rem] px-6 py-16 sm:px-10 lg:max-w-[58rem] lg:py-28">
        <main className="outline-none" id="main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </>
  );
}
