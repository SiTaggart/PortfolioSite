import type React from 'react';

import type { PostMeta } from '../types';

interface PostModule {
  default: React.ComponentType;
  meta: PostMeta;
}

export interface BlogPost {
  Component: React.ComponentType;
  meta: PostMeta;
  slug: string;
}

const postModules = import.meta.glob<PostModule>('./posts/*/index.mdx', {
  eager: true,
});

// A post's directory name is its published URL, so it is the only slug.
function slugFromModulePath(path: string): string {
  return path.replace('./posts/', '').replace('/index.mdx', '');
}

export const posts: Array<BlogPost> = Object.entries(postModules)
  .map(([path, module]) => ({
    Component: module.default,
    meta: module.meta,
    slug: slugFromModulePath(path),
  }))
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date));

const postsBySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return postsBySlug.get(slug);
}

export function postPath(slug: string): string {
  return `/posts/${slug}`;
}
