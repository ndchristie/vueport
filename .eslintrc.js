module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
    'json',
  ],
  rules: {
    'no-bitwise': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.config.js',
      },
    },
  },
};
