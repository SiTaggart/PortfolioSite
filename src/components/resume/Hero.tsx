import type { ReactElement } from 'react';

import { resume } from '../../content/resume';
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
      </Row>
    </header>
  );
}
