module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'arrow-body-style': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'react/jsx-one-expression-per-line': [true, 'single-child'],
    // 'object-curly-newline': ['error', { 'consistent': true }],
  },
};
