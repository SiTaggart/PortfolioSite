import type { ReactElement } from 'react';

export function Arrow({ direction = 'forward' }: { direction?: 'back' | 'forward' }): ReactElement {
  return <span aria-hidden="true">{direction === 'back' ? '←' : '→'}</span>;
}
