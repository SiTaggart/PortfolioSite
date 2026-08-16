import type { ReactElement, ReactNode } from 'react';

export function PageFrame({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="mx-auto max-w-[43.5rem] px-6 py-16 sm:px-10 lg:max-w-[58rem] lg:py-28">
      {children}
    </div>
  );
}
