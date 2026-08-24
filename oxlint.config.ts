import nkzw from '@nkzw/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    '.ai/',
    '.output/',
    '.tanstack/',
    '.wrangler/',
    'dist/',
    'node_modules/',
    'src/routeTree.gen.ts',
  ],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      files: ['scripts/**'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    'typescript/await-thenable': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-condition': 'error',
  },
});
