import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import type { CaseStudy } from '../../content/work';
import { Arrow } from './Arrow';
import { EvidenceLinks } from './EvidenceLinks';
import { Row } from './Row';
import { Section } from './Section';

export function CaseStudyPage({ study }: { study: CaseStudy }): ReactElement {
  return (
    <>
      <h1 className="font-serif text-title">{study.title}</h1>
      <Row>
        <p className="mt-5 font-mono text-role text-muted-foreground">{study.standfirst}</p>
        <dl className="mt-8 space-y-3">
          <CaseStudyFact term="Role" value={study.role} />
          <CaseStudyFact term="Years" value={study.years} />
          <CaseStudyFact term="Organisation" value={study.organisation} />
        </dl>
      </Row>
      <div className="mt-16 flex flex-col gap-14 lg:mt-20">
        {study.sections.map((section) => (
          <Section id={section.id} key={section.id} label={section.heading}>
            <div className="space-y-5">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>
        ))}
        <Section id="evidence" label="Evidence">
          <EvidenceLinks links={study.evidence} />
        </Section>
      </div>
      <nav aria-label="Selected work" className="mt-14 border-t border-border pt-8">
        <Row>
          <p className="font-mono text-meta">
            <Link className="tap-target" hash="work" to="/">
              <Arrow direction="back" /> Back to selected work
            </Link>
          </p>
        </Row>
      </nav>
    </>
  );
}

function CaseStudyFact({ term, value }: { term: string; value: string }): ReactElement {
  return (
    <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline">
      <dt className="font-mono text-label tracking-[0.2em] text-muted-foreground uppercase sm:w-32 sm:shrink-0">
        {term}
      </dt>
      <dd className="text-muted-foreground">{value}</dd>
    </div>
  );
}
