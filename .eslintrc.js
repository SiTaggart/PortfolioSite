module.exports = {
  extends: ['@sitaggart/eslint-config-ts'],
  settings: {
    react: {
      version: '16.13.1',
    },
  },
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'unicorn/filename-case': 0,
  },
};
