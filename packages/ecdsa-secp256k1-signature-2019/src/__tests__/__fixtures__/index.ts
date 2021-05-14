const credentialsContextDoc = require('./contexts/credentials-v1.json')
const didContextDoc = require('./contexts/did-v0.11.json')
const secp256k12019ContextDoc = require('./contexts/secp256k1-2019-v1.json')
const schemaContextDoc = require('./contexts/schema.json')
const didDoc = require('./didDocument.json')
const keyPair = require('./keyPair.json')

const contextMap: { [url: string]: Record<string, unknown> } = {
  'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
  'https://w3id.org/did/v0.11': didContextDoc,
  'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
  'http://schema.org': schemaContextDoc,
}

const didDocMap: { [url: string]: Record<string, unknown> } = {
  'did:example:signer': didDoc,
}

export const documentLoader = (url: string) => {
  const withoutFragment = url.split('#')[0]
  const document = (withoutFragment.startsWith('did:') ? didDocMap : contextMap)[withoutFragment] || null

  if (document === null) console.log({ url, withoutFragment })

  return {
    document,
    documentUrl: url,
  }
}

export const document = {
  '@context': ['http://schema.org', 'https://ns.did.ai/suites/secp256k1-2019/v1'],
  '@type': 'Person',
  name: 'Bob Belcher',
}

export const publicKeyPair = keyPair.public
export const privateKeyPair = keyPair.private
