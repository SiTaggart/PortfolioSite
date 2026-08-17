import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import type { ComponentProps, ReactElement } from 'react';

import { Arrow } from '../../components/resume/Arrow';
import { PageShell } from '../../components/resume/PageShell';
import { Row } from '../../components/resume/Row';
import { findPost, formatPostDate } from '../../content/posts';
import { buildHead } from '../../seo';
import { currentSite } from '../../site';

export const Route = createFileRoute('/posts/$slug')({
  component: PostRoute,
  head: ({ params }) => {
    const post = findPost(params.slug);

    return post
      ? buildHead({
          description: post.meta.description,
          ogType: 'article',
          path: `/posts/${post.slug}`,
          site: currentSite(),
          title: post.meta.title,
        })
      : {};
  },
  loader: ({ params }) => {
    if (!findPost(params.slug)) {
      throw notFound();
    }
  },
});

// Scrollable code blocks and tables need a keyboard-reachable scroll container.
const mdxComponents = {
  pre: (props: ComponentProps<'pre'>): ReactElement => <pre {...props} tabIndex={0} />,
  table: (props: ComponentProps<'table'>): ReactElement => (
    <div className="table-scroll" tabIndex={0}>
      <table {...props} />
    </div>
  ),
};

function PostRoute(): ReactElement {
  const { slug } = Route.useParams();
  const post = findPost(slug);

  if (!post) {
    throw notFound();
  }

  const { Content, meta } = post;

  return (
    <PageShell>
      <article>
        <h1 className="font-serif text-title">{meta.title}</h1>
        <Row>
          <p className="mt-5 font-mono text-role text-muted-foreground">
            {formatPostDate(meta.date)}
          </p>
          <div className="prose mt-12">
            <Content components={mdxComponents} />
          </div>
        </Row>
      </article>
      <nav aria-label="More writing" className="mt-14 border-t border-border pt-8">
        <Row>
          <p className="font-mono text-meta">
            <Link className="tap-target" to="/posts">
              <Arrow direction="back" /> All writing
            </Link>
          </p>
        </Row>
      </nav>
    </PageShell>
  );
}
