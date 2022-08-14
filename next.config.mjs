import remarkGfm from 'remark-gfm';
import mdxPrism from 'mdx-prism';
import nextMdx from '@next/mdx';

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [mdxPrism],
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  ...withMDX({
    pageExtensions: ['js', 'jsx', 'tsx', 'ts', 'mdx', 'md'],
  }),
};

// eslint-disable-next-line import/no-default-export
export default nextConfig;
