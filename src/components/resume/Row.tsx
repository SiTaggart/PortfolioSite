import type { ReactElement, ReactNode } from 'react';

interface RowProps {
  children: ReactNode;
  label?: string;
  labelId?: string;
}

export function Row({ children, label, labelId }: RowProps): ReactElement {
  return (
    <div className="grid gap-x-10 gap-y-5 lg:grid-cols-[12rem_minmax(0,1fr)]">
      {label === undefined ? null : (
        <h2
          className="font-mono text-label font-medium tracking-[0.2em] text-muted-foreground uppercase lg:pt-2.5 lg:text-right"
          id={labelId}
          tabIndex={-1}
        >
          {label}
        </h2>
      )}
      <div className="min-w-0 lg:col-start-2">{children}</div>
    </div>
  );
}
