import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { CaseStudyPage } from '../../components/resume/CaseStudyPage';
import { PageShell } from '../../components/resume/PageShell';
import { sesco } from '../../content/work';
import { buildHead } from '../../seo';
import { currentSite } from '../../site';

export const Route = createFileRoute('/work/sesco')({
  component: RouteComponent,
  head: () =>
    buildHead({
      description: sesco.description,
      ogType: 'article',
      path: sesco.to,
      site: currentSite(),
      title: sesco.title,
    }),
});

function RouteComponent(): ReactElement {
  return (
    <PageShell>
      <CaseStudyPage study={sesco} />
    </PageShell>
  );
}
