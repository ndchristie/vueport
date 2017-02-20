module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
    'json'
  ],
  'rules': {
    'no-param-reassign': ["error", { "props": false }],
    'no-mixed-operators': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      "error",
      {
        "devDependencies": true,
      }
    ],
    'import/no-unresolved': 0,
  }
};
