const packagesToTransform = [
  'base58-universal',
].join('|')

module.exports = {
  testEnvironment: 'node',
  transformIgnorePatterns: [
    `[/\\\\]node_modules[/\\\\](?!(${packagesToTransform})).+\\.(js|jsx)$`,
  ],
  moduleNameMapper: {
    'base58-universal': 'base58-universal/main.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  }
}
