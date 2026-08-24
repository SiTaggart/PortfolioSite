import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { CaseStudyPage } from '../../components/resume/CaseStudyPage';
import { PageShell } from '../../components/resume/PageShell';
import { paste } from '../../content/work';
import { buildHead } from '../../seo';
import { currentSite } from '../../site';

export const Route = createFileRoute('/work/paste')({
  component: RouteComponent,
  head: () =>
    buildHead({
      description: paste.description,
      ogType: 'article',
      path: paste.to,
      site: currentSite(),
      title: paste.title,
    }),
});

function RouteComponent(): ReactElement {
  return (
    <PageShell>
      <CaseStudyPage study={paste} />
    </PageShell>
  );
}
