module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  }
}
