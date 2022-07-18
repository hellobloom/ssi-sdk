import secp256k1 from 'secp256k1'
// @ts-expect-error: implicit type import; not a ts package
import keyto from '@trust/keyto'
// @ts-expect-error: implicit type import; not a ts package
import * as base58 from 'base58-universal'

const compressedHexEncodedPublicKeyLength = 66

export type PrivateKeyJWK = {
  kty: string
  crv: string
  d: string
  x: string
  y: string
  kid: string
}

export type PublicKeyJWK = {
  kty: string
  crv: string
  x: string
  y: string
  kid: string
}

export const publicKeyHexFrom = {
  publicKeyBase58: (publicKeyBase58: string): string => Buffer.from(base58.decode(publicKeyBase58)).toString('hex'),
  publicKeyJWK: (jwk: PublicKeyJWK): string =>
    Buffer.from(
      secp256k1.publicKeyConvert(
        Buffer.from(
          keyto
            .from(
              {
                ...jwk,
                crv: 'K-256',
              },
              'jwk',
            )
            .toString('blk', 'public'),
          'hex',
        ),
        true,
      ),
    ).toString('hex'),
  publicKeyUint8Array: (publicKeyUint8Array: Uint8Array): string => Buffer.from(publicKeyUint8Array).toString('hex'),
  privateKeyHex: (privateKeyHex: string): string =>
    Buffer.from(secp256k1.publicKeyCreate(new Uint8Array(Buffer.from(privateKeyHex, 'hex')))).toString('hex'),
}

export const privateKeyHexFrom = {
  privateKeyBase58: (privateKeyBase58: string): string => Buffer.from(base58.decode(privateKeyBase58)).toString('hex'),
  privateKeyJWK: (jwk: PrivateKeyJWK): string =>
    keyto
      .from(
        {
          ...jwk,
          crv: 'K-256',
        },
        'jwk',
      )
      .toString('blk', 'private'),
  privateKeyUint8Array: (privateKeyUint8Array: Uint8Array): string => Buffer.from(privateKeyUint8Array).toString('hex'),
}

export const publicKeyUint8ArrayFrom = {
  publicKeyBase58: (publicKeyBase58: string): Uint8Array => base58.decode(publicKeyBase58),
  publicKeyHex: (publicKeyHex: string): Uint8Array => Uint8Array.from(Buffer.from(publicKeyHex, 'hex')),
  publicKeyJWK: (jwk: PublicKeyJWK): Uint8Array => {
    let asBuffer = Buffer.from(publicKeyHexFrom.publicKeyJWK(jwk), 'hex')
    let padding = 32 - asBuffer.length
    while (padding > 0) {
      asBuffer = Buffer.concat([Buffer.from('00', 'hex'), asBuffer])
      padding -= 1
    }
    return Uint8Array.from(asBuffer)
  },
  privateKeyUint8Array: (privateKeyUint8Array: Uint8Array): Uint8Array => secp256k1.publicKeyCreate(privateKeyUint8Array),
}

export const privateKeyUint8ArrayFrom = {
  privateKeyBase58: (privateKeyBase58: string): Uint8Array => base58.decode(privateKeyBase58),
  privateKeyHex: (privateKeyHex: string): Uint8Array => Uint8Array.from(Buffer.from(privateKeyHex, 'hex')),
  privateKeyJWK: (jwk: PrivateKeyJWK): Uint8Array => {
    let asBuffer = Buffer.from(privateKeyHexFrom.privateKeyJWK(jwk), 'hex')
    let padding = 32 - asBuffer.length
    while (padding > 0) {
      asBuffer = Buffer.concat([Buffer.from('00', 'hex'), asBuffer])
      padding -= 1
    }
    return Uint8Array.from(asBuffer)
  },
}

export const publicKeyJWKFrom = {
  publicKeyBase58: (publicKeybase58: string, kid: string): PublicKeyJWK =>
    publicKeyJWKFrom.publicKeyHex(Buffer.from(base58.decode(publicKeybase58)).toString('hex'), kid),
  publicKeyHex: (publicKeyHex: string, kid: string): PublicKeyJWK => {
    const key =
      publicKeyHex.length === compressedHexEncodedPublicKeyLength
        ? Buffer.from(secp256k1.publicKeyConvert(Buffer.from(publicKeyHex, 'hex'), false)).toString('hex')
        : publicKeyHex

    return {
      ...keyto.from(key, 'blk').toJwk('public'),
      crv: 'secp256k1',
      kid,
    }
  },
  publicKeyUint8Array: (publicKeyUint8Array: Uint8Array, kid: string): PublicKeyJWK =>
    publicKeyJWKFrom.publicKeyHex(Buffer.from(publicKeyUint8Array).toString('hex'), kid),
  privateKeyJWK: (privateKeyJWK: PrivateKeyJWK): PublicKeyJWK => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { d, ...publicKeyJWK } = privateKeyJWK

    return publicKeyJWK
  },
}

export const privateKeyJWKFrom = {
  privateKeyBase58: (privateKeybase58: string, kid: string): PrivateKeyJWK =>
    privateKeyJWKFrom.privateKeyHex(Buffer.from(base58.decode(privateKeybase58)).toString('hex'), kid),
  privateKeyHex: (privateKeyHex: string, kid: string): PrivateKeyJWK => ({
    ...keyto.from(privateKeyHex, 'blk').toJwk('private'),
    crv: 'secp256k1',
    kid,
  }),
  privateKeyUint8Array: (privateKeyUint8Array: Uint8Array, kid: string): PrivateKeyJWK =>
    privateKeyJWKFrom.privateKeyHex(privateKeyHexFrom.privateKeyUint8Array(privateKeyUint8Array), kid),
}
