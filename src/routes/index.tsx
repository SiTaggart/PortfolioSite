import { createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { Hero } from '../components/resume/Hero';
import { LinkList } from '../components/resume/LinkList';
import { PageShell } from '../components/resume/PageShell';
import { RoleEntry } from '../components/resume/RoleEntry';
import { Section } from '../components/resume/Section';
import { WorkEntry } from '../components/resume/WorkEntry';
import { resume } from '../content/resume';
import { caseStudies } from '../content/work';
import { buildHead, personJsonLd } from '../seo';
import { currentSite } from '../site';

export const Route = createFileRoute('/')({
  component: Index,
  head: () =>
    buildHead({
      description:
        'Simon Taggart designs and builds data-heavy products, then turns the patterns that work into systems other teams can ship with. Product Engineer at SESCO; previously Twilio, Meta and Salesforce.',
      path: '/',
      site: currentSite(),
      title: 'Product Engineer',
    }),
});

function Index(): ReactElement {
  return (
    <>
      <PageShell>
        <Hero />
        <div className="mt-16 flex flex-col gap-18 lg:mt-24">
          <Section id="work" label="Selected work">
            <div className="flex flex-col gap-12">
              {caseStudies.map((study) => (
                <WorkEntry key={study.to} study={study} />
              ))}
            </div>
          </Section>
          <Section id="experience" label="Experience">
            <div className="flex flex-col gap-12">
              {resume.experience.map((role) => (
                <RoleEntry key={role.company} role={role} />
              ))}
              <RoleEntry role={resume.earlier} />
            </div>
          </Section>
          <Section id="about" label="About">
            <div className="space-y-5">
              {resume.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Section>
          <Section id="contact" label="Contact">
            <LinkList links={resume.contact} />
          </Section>
        </div>
      </PageShell>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(currentSite())).replaceAll('<', String.raw`\u003c`),
        }}
        type="application/ld+json"
      />
    </>
  );
}
