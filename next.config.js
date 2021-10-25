const nodePath = require('path');
const mdxPrism = require('mdx-prism');

const withMdxEnhanced = require('next-mdx-enhanced')({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['md', 'mdx'],
  remarkPlugins: [],
  rehypePlugins: [mdxPrism],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) => {
      const pagesDir = nodePath.resolve(__dirname, './pages');
      const path = `/${frontMatter.__resourcePath}`
        .replace(pagesDir, '')
        .replace('.mdx', '')
        .replace('.md', '')
        .replace('.tsx', '')
        .replace(/^\/index$/, '/')
        .replace(/\/index$/, '');
      return {
        path,
        url: `https://www.simontaggart.com${path}`,
      };
    },
  },
});

module.exports = {
  ...withMdxEnhanced({
    pageExtensions: ['js', 'jsx', 'tsx', 'ts', 'mdx', 'md'],
  }),
  target: 'serverless',
  webpack5: false,
};
