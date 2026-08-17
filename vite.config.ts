import { cloudflare } from '@cloudflare/vite-plugin';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import remarkGfm from 'remark-gfm';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tailwindcss(),
    tanstackStart(),
    mdx({ remarkPlugins: [remarkGfm] }),
    react(),
  ],
  preview: { allowedHosts: ['simontaggart.com', 'www.simontaggart.com'] },
  resolve: { tsconfigPaths: true },
});
