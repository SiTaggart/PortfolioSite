import type { ReactElement } from 'react';

import type { EvidenceLink } from '../../content/work';

export function EvidenceLinks({ links }: { links: ReadonlyArray<EvidenceLink> }): ReactElement {
  return (
    <ul className="space-y-1.5 font-mono text-meta">
      {links.map((link) => (
        <li key={link.href}>
          <a className="tap-target" href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
