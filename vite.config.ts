import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    mdx({
      providerImportSource: '@mdx-js/react',
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkGfm],
    }),
    svgr(),
    react(),
  ],
});
