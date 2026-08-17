import { Link } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { Row } from './Row';

export function Footer(): ReactElement {
  return (
    <footer className="mt-18 border-t border-border pt-8">
      <Row>
        <p className="font-mono text-meta text-muted-foreground">
          <Link to="/">Simon Taggart</Link>. Set in Instrument Serif, Inter and JetBrains Mono.
          Built with TanStack Start, deployed on Cloudflare Workers.{' '}
          <a href="https://github.com/SiTaggart/PortfolioSite">Source on GitHub</a>. ©{' '}
          {new Date().getFullYear()}.
        </p>
      </Row>
    </footer>
  );
}
