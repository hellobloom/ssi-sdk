const packagesToTransform = [
  '@digitalbazaar/ed25519-signature-2020',
  '@digitalbazaar/ed25519-verification-key-2020',
  '@digitalbazaar/ed25519-signature-2020-context',
  'base58-universal',
].join('|')

module.exports = {
  testEnvironment: 'node',
  transformIgnorePatterns: [
    `[/\\\\]node_modules[/\\\\](?!(${packagesToTransform})).+\\.(js|jsx)$`,
  ],
  moduleNameMapper: {
    '@digitalbazaar/ed25519-signature-2020': '@digitalbazaar/ed25519-signature-2020/lib/main.js',
    '@digitalbazaar/ed25519-verification-key-2020': '@digitalbazaar/ed25519-verification-key-2020/lib/main.js',
    '@digitalbazaar/ed25519-signature-2020-context': '@digitalbazaar/ed25519-signature-2020-context/lib/main.js',
    'base58-universal': 'base58-universal/main.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  }
}
