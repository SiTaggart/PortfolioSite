import { createFileRoute, notFound } from '@tanstack/react-router';
import type React from 'react';

import { getPostBySlug, postPath } from '../../content/posts';
import { canonicalUrl, postMeta } from '../../seo';

export const Route = createFileRoute('/posts/$slug')({
  component: PostRoute,
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      return {};
    }

    const path = postPath(post.slug);

    return {
      links: [{ href: canonicalUrl(path), rel: 'canonical' }],
      meta: postMeta(post.meta, path),
    };
  },
  // Only a rejection from the loader makes the server respond 404; throwing
  // from the component alone still renders the not-found page with a 200.
  loader: ({ params }) => {
    if (!getPostBySlug(params.slug)) {
      throw notFound();
    }
  },
});

function PostRoute(): React.ReactElement {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    throw notFound();
  }

  return <post.Component />;
}
