import type { ReactElement, ReactNode } from 'react';

import { Row } from './Row';

interface SectionProps {
  children: ReactNode;
  id: string;
  label: string;
}

export function Section({ children, id, label }: SectionProps): ReactElement {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-8">
      <Row label={label} labelId={id}>
        {children}
      </Row>
    </section>
  );
}
