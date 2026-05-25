import { createFileRoute, notFound } from '@tanstack/react-router';
import type React from 'react';

import { getPostBySlug, postSlugs } from '../../content/posts';
import { postMeta } from '../../seo';

export const Route = createFileRoute('/posts/$slug')({
  component: PostRoute,
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      return {};
    }

    return {
      links: [
        {
          href: `https://www.simontaggart.com${post.meta.slug}`,
          rel: 'canonical',
        },
      ],
      meta: postMeta(post.meta),
    };
  },
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return post.meta;
  },
});

function PostRoute(): React.ReactElement {
  const { slug } = Route.useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    throw notFound();
  }

  const { Component } = post;

  return <Component />;
}

export function getStaticPaths(): Array<string> {
  return postSlugs;
}
