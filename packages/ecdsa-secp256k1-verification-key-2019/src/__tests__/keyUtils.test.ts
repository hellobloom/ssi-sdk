import * as keyUtils from '../keyUtils'

import { keyConfig } from './__fixtures__'

describe('publicKeyHexFrom', () => {
  const from = keyUtils.publicKeyHexFrom
  const expected = keyConfig.publicKeyHex

  test('publicKeyBase58', () => {
    expect(from.publicKeyBase58(keyConfig.publicKeyBase58)).toEqual(expected)
  })

  test('publicKeyJWK', () => {
    expect(from.publicKeyJWK(keyConfig.publicKeyJWK)).toEqual(expected)
  })

  test('publicKeyUint8Array', () => {
    expect(from.publicKeyUint8Array(keyConfig.publicKeyUint8Array)).toEqual(expected)
  })

  test('privateKeyHex', () => {
    expect(from.privateKeyHex(keyConfig.privateKeyHex)).toEqual(expected)
  })
})

describe('privateKeyHexFrom', () => {
  const from = keyUtils.privateKeyHexFrom
  const expected = keyConfig.privateKeyHex

  test('privateKeyBase58', () => {
    expect(from.privateKeyBase58(keyConfig.privateKeyBase58)).toEqual(expected)
  })

  test('privateKeyJWK', () => {
    expect(from.privateKeyJWK(keyConfig.privateKeyJWK)).toEqual(expected)
  })

  test('privateKeyUint8Array', () => {
    expect(from.privateKeyUint8Array(keyConfig.privateKeyUint8Array)).toEqual(expected)
  })
})

describe('publicKeyUint8ArrayFrom', () => {
  const from = keyUtils.publicKeyUint8ArrayFrom
  const expected = keyConfig.publicKeyUint8Array

  test('publicKeyBase58', () => {
    expect(from.publicKeyBase58(keyConfig.publicKeyBase58)).toEqual(expected)
  })

  test('publicKeyHex', () => {
    expect(from.publicKeyHex(keyConfig.publicKeyHex)).toEqual(expected)
  })

  test('publicKeyJWK', () => {
    expect(from.publicKeyJWK(keyConfig.publicKeyJWK)).toEqual(expected)
  })

  test('privateKeyUint8Array', () => {
    expect(from.privateKeyUint8Array(keyConfig.privateKeyUint8Array)).toEqual(expected)
  })
})

describe('privateKeyUint8ArrayFrom', () => {
  const from = keyUtils.privateKeyUint8ArrayFrom
  const expected = keyConfig.privateKeyUint8Array

  test('privateKeyBase58', () => {
    expect(from.privateKeyBase58(keyConfig.privateKeyBase58)).toEqual(expected)
  })

  test('privateKeyHex', () => {
    expect(from.privateKeyHex(keyConfig.privateKeyHex)).toEqual(expected)
  })

  test('privateKeyJWK', () => {
    expect(from.privateKeyJWK(keyConfig.privateKeyJWK)).toEqual(expected)
  })
})

describe('publicKeyJWKFrom', () => {
  const from = keyUtils.publicKeyJWKFrom
  const expected = keyConfig.publicKeyJWK
  const kid = 'kid'

  test('publicKeyBase58', () => {
    expect(from.publicKeyBase58(keyConfig.publicKeyBase58, kid)).toEqual(expected)
  })

  test('publicKeyHex', () => {
    expect(from.publicKeyHex(keyConfig.publicKeyHex, kid)).toEqual(expected)
  })

  test('publicKeyUint8Array', () => {
    expect(from.publicKeyUint8Array(keyConfig.publicKeyUint8Array, kid)).toEqual(expected)
  })

  test('privateKeyJWK', () => {
    expect(from.privateKeyJWK(keyConfig.privateKeyJWK)).toEqual(expected)
  })
})

describe('privateKeyJWKFrom', () => {
  const from = keyUtils.privateKeyJWKFrom
  const expected = keyConfig.privateKeyJWK
  const kid = 'kid'

  test('privateKeyBase58', () => {
    expect(from.privateKeyBase58(keyConfig.privateKeyBase58, kid)).toEqual(expected)
  })

  test('privateKeyHex', () => {
    expect(from.privateKeyHex(keyConfig.privateKeyHex, kid)).toEqual(expected)
  })

  test('privateKeyUint8Array', () => {
    expect(from.privateKeyUint8Array(keyConfig.privateKeyUint8Array, kid)).toEqual(expected)
  })
})
