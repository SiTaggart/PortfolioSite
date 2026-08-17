import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import type { WritingRow } from '../../content/writing';

export function WritingList({ rows }: { rows: ReadonlyArray<WritingRow> }): ReactElement {
  return (
    <ul className="flex flex-col gap-7">
      {rows.map((row) => (
        <li key={row.kind === 'post' ? row.slug : row.href}>
          <h3 className="font-serif text-heading">
            {row.kind === 'post' ? (
              <Link params={{ slug: row.slug }} to="/posts/$slug">
                {row.title}
              </Link>
            ) : (
              <a href={row.href}>{row.title}</a>
            )}
          </h3>
          <p className="mt-1 font-mono text-meta text-muted-foreground">
            {row.source}
            {row.kind === 'external' && row.attribution ? ` · ${row.attribution}` : ''}
          </p>
        </li>
      ))}
    </ul>
  );
}
