import type { ReactElement } from 'react';

export function SkipLink(): ReactElement {
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10 focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-meta"
      href="#main"
    >
      Skip to content
    </a>
  );
}
