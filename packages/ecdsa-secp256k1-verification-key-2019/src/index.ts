import base64url from 'base64url'
import createHash from 'create-hash'
import * as secp256k1 from 'secp256k1'
import randomBytes from 'randombytes'

const cryptoLd = require('crypto-ld')
const base58 = require('base58-universal')

const SUITE_ID = 'EcdsaSecp256k1VerificationKey2019'

const sha256 = (data: any) => createHash('sha256').update(data).digest()

type ExportedKey = {
  '@context'?: string
  type: string
  id: string
  controller: string
  publicKeyBase58?: string
  privateKeyBase58?: string
  revoked?: boolean
}

type EcdsaSecp256k1VerificationKey2019Options = {
  controller: string
  id: string
  revoked?: boolean
  publicKeyBase58?: string
  privateKeyBase58?: string
}

type EcdsaSecp256k1VerificationKey2019HexKeyOptions = {
  controller: string
  id: string
  revoked?: boolean
  publicKeyHex?: string
  privateKeyHex?: string
}

export class EcdsaSecp256k1VerificationKey2019 extends cryptoLd.LDKeyPair {
  public type: string

  public publicKeyBase58?: string

  public privateKeyBase58?: string

  constructor({ publicKeyBase58, privateKeyBase58, ...options }: EcdsaSecp256k1VerificationKey2019Options) {
    super(options)

    if (privateKeyBase58 && !publicKeyBase58) {
      const publicKey = secp256k1.publicKeyCreate(base58.decode(privateKeyBase58))
      this.publicKeyBase58 = base58.encode(publicKey)
    } else {
      this.publicKeyBase58 = publicKeyBase58
    }

    this.type = SUITE_ID
    this.privateKeyBase58 = privateKeyBase58

    if (!this.publicKeyBase58) {
      throw new TypeError('The "publicKeyBase58" property is required.')
    }
  }

  static from(options: EcdsaSecp256k1VerificationKey2019Options | EcdsaSecp256k1VerificationKey2019HexKeyOptions) {
    if ((options as any).publicKeyHex || (options as any).privateKeyHex) {
      const { publicKeyHex, privateKeyHex, ...rest } = options as any

      return new EcdsaSecp256k1VerificationKey2019({
        ...rest,
        publicKeyBase58: publicKeyHex ? base58.encode(Buffer.from(publicKeyHex, 'hex')) : undefined,
        privateKeyBase58: privateKeyHex ? base58.encode(Buffer.from(privateKeyHex, 'hex')) : undefined,
      })
    }

    return new EcdsaSecp256k1VerificationKey2019(options)
  }

  static async generate({
    seed,
    compressed,
    ...keyPairOptions
  }: Omit<EcdsaSecp256k1VerificationKey2019Options, 'publicKeyBase58' | 'privateKeyBase58'> & { seed?: Uint8Array; compressed?: boolean }) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const privateKey = seed || new Uint8Array(randomBytes(32))
      const publicKey = secp256k1.publicKeyCreate(privateKey, compressed)

      if (!secp256k1.privateKeyVerify(privateKey) || !secp256k1.publicKeyVerify(publicKey)) {
        // eslint-disable-next-line no-continue
        continue
      }

      const privateKeyBase58 = base58.encode(privateKey)
      const publicKeyBase58 = base58.encode(publicKey)

      return new EcdsaSecp256k1VerificationKey2019({
        publicKeyBase58,
        privateKeyBase58,
        ...keyPairOptions,
      })
    }
  }

  export({
    publicKey = false,
    privateKey = false,
    includeContext = false,
  }: {
    publicKey?: boolean
    privateKey?: boolean
    includeContext?: boolean
  } = {}): ExportedKey {
    if (!(publicKey || privateKey)) {
      throw new TypeError('export requires specifying either "publicKey" or "privateKey".')
    }

    if (privateKey && !this.privateKeyBase58) {
      throw new TypeError('No privateKey to export.')
    }

    if (publicKey && !this.publicKeyBase58) {
      throw new TypeError('No publicKey to export.')
    }

    const exported: ExportedKey = {
      type: this.type,
      id: this.id,
      controller: this.controller,
      revoked: this.revoked,
    }

    if (includeContext) {
      exported['@context'] = EcdsaSecp256k1VerificationKey2019.SUITE_CONTEXT
    }
    if (privateKey) exported.privateKeyBase58 = this.privateKeyBase58
    if (publicKey) exported.publicKeyBase58 = this.publicKeyBase58

    return exported
  }

  signer() {
    const { privateKeyBase58 } = this

    if (!privateKeyBase58) {
      return {
        async sign() {
          throw new Error('No private key to sign with.')
        },
        id: this.id,
      }
    }

    return {
      async sign({ data }: { data: Uint8Array }) {
        const encodedHeader = base64url.encode(
          JSON.stringify({
            alg: 'ES256K',
            b64: false,
            crit: ['b64'],
          }),
        )

        const payload = Buffer.from(data.buffer, data.byteOffset, data.length)
        const digest = sha256(
          Buffer.from(
            Buffer.concat([Buffer.from(`${encodedHeader}.`, 'utf8'), Buffer.from(payload.buffer, payload.byteOffset, payload.length)]),
          ),
        )

        const { signature } = secp256k1.ecdsaSign(digest, base58.decode(privateKeyBase58))
        const encodedSignature = base64url.encode(Buffer.from(signature))

        return `${encodedHeader}..${encodedSignature}`
      },
      id: this.id,
    }
  }

  verifier() {
    const { publicKeyBase58 } = this

    if (!publicKeyBase58) {
      return {
        async verify() {
          throw new Error('No public key to verify against')
        },
        id: this.id,
      }
    }

    return {
      async verify({ data, signature }: { data: Uint8Array; signature: string }) {
        if (signature.indexOf('..') < 0) return false

        const [encodedHeader, encodedSignature] = signature.split('..')
        const header = JSON.parse(base64url.decode(encodedHeader))
        const isHeaderInvalid =
          header.alg !== 'ES256K' || header.b64 !== false || !header.crit || !header.crit.length || header.crit[0] !== 'b64'

        if (isHeaderInvalid) return false

        const payload = Buffer.from(data.buffer, data.byteOffset, data.length)
        const digest = sha256(
          Buffer.from(
            Buffer.concat([Buffer.from(`${encodedHeader}.`, 'utf8'), Buffer.from(payload.buffer, payload.byteOffset, payload.length)]),
          ),
        )

        let verified: boolean
        try {
          verified = secp256k1.ecdsaVerify(
            Buffer.from(base64url.decode(encodedSignature, 'hex'), 'hex'),
            digest,
            base58.decode(publicKeyBase58),
          )
        } catch {
          verified = false
        }

        return verified
      },
      id: this.id,
    }
  }
}

EcdsaSecp256k1VerificationKey2019.suite = SUITE_ID
EcdsaSecp256k1VerificationKey2019.SUITE_CONTEXT = 'https://ns.did.ai/suites/secp256k1-2019/v1'
