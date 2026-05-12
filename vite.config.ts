import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
    react(),
  ],
});
