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
    'no-param-reassign': ['error', { props: false }],
    'no-mixed-operators': 0,
    'no-bitwise': 0,
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': 0,
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
