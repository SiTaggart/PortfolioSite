import type { ReactElement } from 'react';

import { resume } from '../../content/resume';
import { Arrow } from './Arrow';
import { Row } from './Row';

export function Hero(): ReactElement {
  const [lead, support] = resume.intro;

  return (
    <header>
      <h1 className="font-serif text-display">{resume.name}</h1>
      <Row>
        <p className="mt-5 font-mono text-role text-muted-foreground">{resume.descriptor}</p>
        <p className="mt-10 text-lead">{lead}</p>
        <p className="mt-5">{support}</p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-meta">
          <a className="tap-target" href="#work">
            View selected work <Arrow />
          </a>
          <a className="tap-target" href={resume.cvUrl}>
            Download CV <Arrow />
          </a>
        </div>
      </Row>
    </header>
  );
}
