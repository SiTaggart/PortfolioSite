import reverse from 'lodash.reverse';
import sortBy from 'lodash.sortby';
import type React from 'react';
import type { MetaDataShape } from '../../types';

interface PostModule {
  default: React.ComponentType;
  meta: MetaDataShape;
}

export interface BlogPost {
  Component: React.ComponentType;
  meta: MetaDataShape;
}

const postModules = import.meta.glob<PostModule>('../../pages/posts/*/index.mdx', {
  eager: true,
});

export const posts: BlogPost[] = reverse(
  sortBy(
    Object.values(postModules).map((module) => ({
      Component: module.default,
      meta: module.meta,
    })),
    ['meta.date']
  )
);

export const postSlugs = posts.map(({ meta }) => meta.slug);

export function getPostBySlug(slug: string): BlogPost | undefined {
  const normalizedSlug = slug.startsWith('/posts/') ? slug : `/posts/${slug}`;

  return posts.find(({ meta }) => meta.slug === normalizedSlug);
}
