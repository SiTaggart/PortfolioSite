import type { ReactElement, ReactNode } from 'react';

export function MetaLabel({ children }: { children: ReactNode }): ReactElement {
  return (
    <span className="block font-mono text-label tracking-[0.2em] text-muted-foreground uppercase">
      {children}
    </span>
  );
}
