module.exports = {
  extends: ['@sitaggart/eslint-config-ts'],
  settings: {
    jest: {
      version: 29,
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'unicorn/filename-case': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-throw-literal': 0,
    'import/no-default-export': 0,
    'no-underscore-dangle': 0,
    'unicorn/prefer-module': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  overrides: [
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-await-in-loop': 0,
        'no-console': 0,
        'no-restricted-syntax': 0,
      },
    },
    {
      files: ['cypress.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
