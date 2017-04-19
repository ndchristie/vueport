// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.config.js',
      },
    },
  },
  rules: {
  // add your custom rules here
    'no-bitwise': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
