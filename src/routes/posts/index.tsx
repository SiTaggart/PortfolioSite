import { Link, createFileRoute } from '@tanstack/react-router';
import type { ReactElement } from 'react';

import { PageShell } from '../../components/resume/PageShell';
import { Row } from '../../components/resume/Row';
import { Section } from '../../components/resume/Section';
import { WritingList } from '../../components/resume/WritingList';
import { formatPostDate, posts } from '../../content/posts';
import { externalWriting } from '../../content/writing';
import { buildHead } from '../../seo';
import { currentSite } from '../../site';

export const Route = createFileRoute('/posts/')({
  component: Writing,
  head: () =>
    buildHead({
      description:
        'Posts by Simon Taggart on CSS, design systems and design tokens, plus pieces published elsewhere.',
      path: '/posts',
      site: currentSite(),
      title: 'Writing',
    }),
});

function Writing(): ReactElement {
  return (
    <PageShell>
      <h1 className="font-serif text-title">Writing</h1>
      <Row>
        <p className="mt-5 font-mono text-role text-muted-foreground">
          Posts from this site, and pieces published elsewhere.
        </p>
      </Row>
      <div className="mt-16 flex flex-col gap-18 lg:mt-20">
        <Section id="posts" label="Posts">
          <ul className="flex flex-col gap-9">
            {posts.map((post) => (
              <li key={post.slug}>
                <h3 className="font-serif text-heading">
                  <Link params={{ slug: post.slug }} to="/posts/$slug">
                    {post.meta.title}
                  </Link>
                </h3>
                <p className="mt-1 font-mono text-meta text-muted-foreground">
                  {formatPostDate(post.meta.date)}
                </p>
                <p className="mt-2">{post.meta.description}</p>
              </li>
            ))}
          </ul>
        </Section>
        <Section id="elsewhere" label="Elsewhere">
          <WritingList rows={externalWriting} />
        </Section>
      </div>
    </PageShell>
  );
}
