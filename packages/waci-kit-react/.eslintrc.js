module.exports = {
  extends: ['@bloomprotocol/eslint-config/react'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react/require-default-props': 0,
  },
}
