import type { ComponentType } from 'react';

export interface PostContentProps {
  components?: Record<string, unknown>;
}

export interface PostMeta {
  date: string;
  description: string;
  slug: string;
  title: string;
}

export interface Post {
  Content: ComponentType<PostContentProps>;
  meta: PostMeta;
  slug: string;
}

interface PostModule {
  default: ComponentType<PostContentProps>;
  meta: PostMeta;
}

const postModules = import.meta.glob<PostModule>('./posts/*/index.mdx', { eager: true });

export const posts: ReadonlyArray<Post> = Object.values(postModules)
  .map((module) => ({
    Content: module.default,
    meta: module.meta,
    slug: module.meta.slug.replace('/posts/', ''),
  }))
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date));

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatPostDate(date: string): string {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    throw new RangeError(`Invalid post date: ${date}`);
  }

  return `${parsed.getUTCDate()} ${months[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}
