import { VC, VCSubject, RemoveIndex, signVC, DocumentLoader } from '@bloomprotocol/vc'
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019'
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'
import { createDIDFromMnemonic } from '@bloomprotocol/elem-did-legacy-non-anchored'
import { SimpleThing } from '../../util/v2'

const jsonld = require('jsonld')

const credentialsV1ContextDoc = require('./contexts/credentials-v1.json')

const contextMap: Record<string, unknown> = {
  'https://www.w3.org/2018/credentials/v1': credentialsV1ContextDoc,
}

export const expandVC = async <V extends VC & { type: ['VerifiableCredential', string, ...string[]] }, VS extends VCSubject>({
  data,
  type,
  context,
}: {
  data: VS['data'] | VS['data'][]
  type: V['type'][1]
  context: { [key: string]: any }
}) => {
  const issuer = createDIDFromMnemonic('train process into royal pen salmon perfect frozen solution behave wrong build')

  const documentLoader: DocumentLoader = (url) => {
    const document = url.startsWith('did:') ? (issuer.didDocument as any) : contextMap[url]

    if (!document) console.log({ url })

    return {
      document,
      documentUrl: url,
    }
  }

  const unsigned: Omit<RemoveIndex<VC>, 'proof'> = {
    '@context': ['https://www.w3.org/2018/credentials/v1', context],
    type: ['VerifiableCredential', type],
    id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    credentialSubject: (Array.isArray(data) ? data : [data]).map((item) => ({ data: item })),
    holder: {
      id: 'did:example:123',
    },
    issuanceDate: '2021-05-20T00:00:00.000Z',
    issuer: {
      id: issuer.did,
    },
  }

  // Ensure that the VC can be signed, this makes sure all fields are properly mapped in the context
  try {
    await signVC({
      unsigned,
      documentLoader,
      suite: new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from({
          controller: issuer.did,
          id: `${issuer.didDocument.id}#primary`,
          publicKeyHex: issuer.keyPairs.primaryKeyPair.publicKeyHex,
          privateKeyHex: issuer.keyPairs.primaryKeyPair.privateKeyHex,
        }),
      }),
    })
  } catch (error) {
    fail(error)
  }

  return (await jsonld.expand(unsigned, { documentLoader }))[0]
}

export const expandVCV2 = async <Type extends string | string[], Subject extends SimpleThing>({
  type,
  data,
  context,
}: {
  type: Type
  data: Subject
  context: Record<string, unknown>
}) => {
  const issuer = createDIDFromMnemonic('train process into royal pen salmon perfect frozen solution behave wrong build')

  const documentLoader: DocumentLoader = (url) => {
    const document = url.startsWith('did:') ? (issuer.didDocument as any) : contextMap[url]

    if (!document) console.log({ url })

    return {
      document,
      documentUrl: url,
    }
  }

  let types = ['VerifiableCredential']

  if (Array.isArray(type)) {
    types = types.concat(type)
  } else {
    types.push(type)
  }

  const unsigned: Omit<RemoveIndex<VC>, 'proof'> = {
    '@context': ['https://www.w3.org/2018/credentials/v1', context],
    type: types,
    id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    credentialSubject: { data },
    holder: {
      id: 'did:example:123',
    },
    issuanceDate: '2021-05-20T00:00:00.000Z',
    issuer: {
      id: issuer.did,
    },
  }

  // Ensure that the VC can be signed, this makes sure all fields are properly mapped in the context
  try {
    await signVC({
      unsigned,
      documentLoader,
      suite: new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from({
          controller: issuer.did,
          id: `${issuer.didDocument.id}#primary`,
          publicKeyHex: issuer.keyPairs.primaryKeyPair.publicKeyHex,
          privateKeyHex: issuer.keyPairs.primaryKeyPair.privateKeyHex,
        }),
      }),
    })
  } catch (error) {
    fail(error)
  }

  return (await jsonld.expand(unsigned, { documentLoader }))[0]
}
