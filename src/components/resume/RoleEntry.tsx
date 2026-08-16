import type { ReactElement } from 'react';

import type { Role } from '../../content/resume';

export function RoleEntry({ role }: { role: Role }): ReactElement {
  const meta = [role.title, role.location].filter((part) => part !== undefined).join(' · ');

  return (
    <article>
      <div className="flex flex-col-reverse gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="font-serif text-heading">{role.company}</h3>
        <p className="font-mono text-meta text-muted-foreground sm:shrink-0">
          {role.start}–{role.end}
        </p>
      </div>
      {meta ? <p className="mt-1 text-muted-foreground">{meta}</p> : null}
      {role.summary ? <p className="mt-4">{role.summary}</p> : null}
      {role.bullets ? (
        <ul className="bullet-list mt-4 space-y-2">
          {role.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
