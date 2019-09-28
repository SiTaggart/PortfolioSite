module.exports = {
  extends: ['@sitaggart/eslint-config', '@sitaggart/eslint-config-react'],
  globals: {
    graphql: true,
  },
  settings: {
    react: {
      version: '16.6.1',
    },
  },
};
