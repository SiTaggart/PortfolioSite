import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import type { CaseStudy } from '../../content/work';
import { Arrow } from './Arrow';
import { EvidenceLinks } from './EvidenceLinks';
import { MetaLabel } from './MetaLabel';

export function WorkEntry({ study }: { study: CaseStudy }): ReactElement {
  return (
    <article>
      <h3 className="font-serif text-heading">
        <Link to={study.to}>{study.name}</Link>
      </h3>
      <p className="mt-1">{study.summary}</p>
      <p className="mt-3 flex flex-col gap-x-3 text-muted-foreground sm:flex-row sm:items-baseline">
        <MetaLabel>Role</MetaLabel>
        <span>{study.role}</span>
      </p>
      <ul className="bullet-list mt-3 space-y-2">
        {study.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-meta">
        <Link className="tap-target" to={study.to}>
          Read case study<span className="sr-only">: {study.name}</span> <Arrow />
        </Link>
      </p>
      <div className="mt-4">
        <MetaLabel>Evidence</MetaLabel>
        <div className="mt-1.5">
          <EvidenceLinks links={study.evidence.slice(0, 3)} />
        </div>
      </div>
    </article>
  );
}
