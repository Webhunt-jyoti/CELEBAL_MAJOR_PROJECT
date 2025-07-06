/* eslint-env node */

module.exports = {
  // your ESLint config
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
