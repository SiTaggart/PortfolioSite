import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { Footer } from '../components/resume/Footer';
import { Header } from '../components/resume/Header';
import { LinkList } from '../components/resume/LinkList';
import { PageFrame } from '../components/resume/PageFrame';
import { ProjectEntry } from '../components/resume/ProjectEntry';
import { RoleEntry } from '../components/resume/RoleEntry';
import { Section } from '../components/resume/Section';
import { SkipLink } from '../components/resume/SkipLink';
import { resume } from '../content/resume';
import { defaultMeta } from '../seo';

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({
    meta: defaultMeta('Product Engineer'),
  }),
});

function Index(): ReactElement {
  return (
    <>
      <SkipLink />
      <PageFrame>
        <Header />
        <main className="mt-16 flex flex-col gap-18 outline-none lg:mt-24" id="main" tabIndex={-1}>
          <Section id="now" label="Now">
            <RoleEntry role={resume.now} />
          </Section>
          <Section id="experience" label="Experience">
            <div className="flex flex-col gap-12">
              {resume.experience.map((role) => (
                <RoleEntry key={role.company} role={role} />
              ))}
              <RoleEntry role={resume.earlier} />
            </div>
          </Section>
          <Section id="selected-work" label="Selected work">
            <div className="flex flex-col gap-8">
              {resume.projects.map((project) => (
                <ProjectEntry key={project.name} project={project} />
              ))}
            </div>
          </Section>
          <Section id="about" label="About">
            <div className="space-y-5">
              {resume.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>
          <Section id="elsewhere" label="Elsewhere">
            <LinkList links={resume.elsewhere} />
          </Section>
        </main>
        <Footer />
      </PageFrame>
    </>
  );
}
