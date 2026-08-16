import type { ReactElement } from 'react';

import { resume } from '../../content/resume';
import { Row } from './Row';

export function Header(): ReactElement {
  return (
    <header>
      <h1 className="font-serif text-display">{resume.name}</h1>
      <Row>
        <p className="mt-5 font-mono text-role text-muted-foreground">{resume.roleLine}</p>
        <div className="mt-10 space-y-5">
          {resume.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Row>
    </header>
  );
}
