module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js'],
      },
    ],
  },
};
