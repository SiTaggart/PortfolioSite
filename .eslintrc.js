module.exports = {
  extends: ['@sitaggart/eslint-config-ts', 'plugin:@next/next/recommended'],
  settings: {
    react: {
      version: '17.0.2',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'unicorn/filename-case': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-underscore-dangle': 0,
    'unicorn/prefer-module': 0,
  },
};
