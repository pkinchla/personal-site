module.exports = {
  extends: ['eslint:recommended', 'preact', 'prettier'],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
  },
};
