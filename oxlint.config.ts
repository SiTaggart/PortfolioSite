import nkzw from '@nkzw/oxlint-config';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nkzw],
  ignorePatterns: [
    '.cache/',
    '.vinxi/',
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
      env: {
        browser: true,
      },
      files: ['cypress/**/*.js', 'cypress.config.ts'],
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['src/theme/prism.ts'],
      rules: {
        'perfectionist/sort-objects': 'off',
      },
    },
  ],
});
