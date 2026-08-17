import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { CaseStudyPage } from '../../components/resume/CaseStudyPage';
import { PageShell } from '../../components/resume/PageShell';
import { accessibleSystems } from '../../content/work';
import { buildHead } from '../../seo';
import { currentSite } from '../../site';

export const Route = createFileRoute('/work/accessible-systems')({
  component: RouteComponent,
  head: () =>
    buildHead({
      description: accessibleSystems.description,
      ogType: 'article',
      path: accessibleSystems.to,
      site: currentSite(),
      title: accessibleSystems.title,
    }),
});

function RouteComponent(): ReactElement {
  return (
    <PageShell>
      <CaseStudyPage study={accessibleSystems} />
    </PageShell>
  );
}
