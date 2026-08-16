import type { ReactElement } from 'react';

import type { ElsewhereLink } from '../../content/resume';

export function LinkList({ links }: { links: ReadonlyArray<ElsewhereLink> }): ReactElement {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline" key={link.href}>
          <span className="font-mono text-label tracking-[0.2em] text-muted-foreground uppercase sm:w-24 sm:shrink-0">
            {link.label}
          </span>
          <a href={link.href}>{link.display}</a>
        </li>
      ))}
    </ul>
  );
}
