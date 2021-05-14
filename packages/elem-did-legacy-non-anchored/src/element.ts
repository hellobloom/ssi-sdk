import base64url from 'base64url'
import createHash from 'create-hash'
import multihashes from 'multihashes'
import * as secp256k1 from 'secp256k1'

export const encodeJson = (payload: any) => base64url.encode(Buffer.from(JSON.stringify(payload)))

export const decodeJson = (encodedPayload: string) => JSON.parse(base64url.decode(encodedPayload))

const payloadToHash = (payload: any) => {
  const encodedPayload = encodeJson(payload)
  const encodedOperationPayloadBuffer = Buffer.from(encodedPayload)
  const hash = createHash('sha256').update(encodedOperationPayloadBuffer).digest()
  const hashAlgorithmName = multihashes.codes[18] // 18 is code for sha256
  const multihash = multihashes.encode(hash, hashAlgorithmName)
  const encodedMultihash = base64url.encode(Buffer.from(multihash))
  return encodedMultihash
}

export const getDidUniqueSuffix = (operation: any) => {
  const header = decodeJson(operation.protected)
  switch (header.operation) {
    case 'create':
      return payloadToHash(operation.payload)
    case 'update':
    case 'recover':
    case 'delete':
      return decodeJson(operation.payload).didUniqueSuffix
    default:
      throw Error(`Cannot extract didUniqueSuffixe from: ${operation}`)
  }
}

const signEncodedPayload = (encodedHeader: string, encodedPayload: string, privateKey: string) => {
  const toBeSigned = `${encodedHeader}.${encodedPayload}`
  const hash = createHash('sha256').update(Buffer.from(toBeSigned)).digest()
  const privateKeyBuffer = Buffer.from(privateKey, 'hex')
  const { signature } = secp256k1.ecdsaSign(hash, privateKeyBuffer)
  const encodedSignature = base64url.encode(Buffer.from(signature))
  return encodedSignature
}

const makeSignedOperation = (header: any, payload: any, privateKey: any) => {
  const encodedHeader = encodeJson(header)
  const encodedPayload = encodeJson(payload)
  const signature = signEncodedPayload(encodedHeader, encodedPayload, privateKey)
  const operation = {
    protected: encodedHeader,
    payload: encodedPayload,
    signature,
  }
  return operation
}

export const getCreatePayload = (didDocumentModel: {}, primaryKey: { privateKey: string }) => {
  // Create the encoded protected header.
  // Note: Explicitly declaring this objects properties in alphabetical order.
  const header = {
    alg: 'ES256K',
    kid: '#primary',
    operation: 'create',
  }

  const mso = makeSignedOperation(header, didDocumentModel, primaryKey.privateKey)
  // Note: Explicitly declaring this objects properties in alphabetical order.
  const alphaMso = {
    payload: mso.payload,
    protected: mso.protected,
    signature: mso.signature,
  }
  return alphaMso
}

export const verifyOperationSignature = (encodedHeader: string, encodedPayload: string, signature: string, publicKey: any) => {
  const toBeVerified = `${encodedHeader}.${encodedPayload}`
  const hash = createHash('sha256').update(Buffer.from(toBeVerified)).digest()
  const publicKeyBuffer = Buffer.from(publicKey, 'hex')
  return secp256k1.ecdsaVerify(base64url.toBuffer(signature), hash, publicKeyBuffer)
}
