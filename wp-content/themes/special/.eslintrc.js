module.exports = {
  extends: ['eslint:recommended'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true}],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    "indent": ["error", 2],
  },
}