import base64url from 'base64url'
import {DIDResolver, DIDDocument, VerificationMethod, parse, DIDResolutionResult, ParsedDID} from 'did-resolver'

import * as element from './element'

type InitialState = {
  protected: string
  payload: string
  signature: string
}

type Protected = {
  operation: string
  kid: string
  alg: string
}

const resolver = (parsed: ParsedDID): DIDResolutionResult => {
  if (!parsed.params || typeof parsed.params['elem:initial-state'] !== 'string') {
    console.log('no initial state')
    return {
      didResolutionMetadata: {
        error: 'invalidDid',
        message: 'Element DID must have the elem:initial-state matrix parameter.'
      },
      didDocumentMetadata: {},
      didDocument: null,
    }
  }

  const initialState = parsed.params['elem:initial-state']
  const decodedInitialState = base64url.decode(initialState)
  const parsedInitialState: InitialState = JSON.parse(decodedInitialState)
  const decodedProtected = base64url.decode(parsedInitialState.protected)
  const parsedProtected: Protected = JSON.parse(decodedProtected)
  const decodedPayload = base64url.decode(parsedInitialState.payload)
  const parsedPayload: DIDDocument = JSON.parse(decodedPayload)

  const publicKey = parsedPayload.publicKey?.find(
    ({id}: VerificationMethod) => id === parsedProtected.kid
  )

  if (!publicKey) {
    console.log('no pub key')
    return {
      didResolutionMetadata: {
        error: 'invalidDid',
        message: `Cannot find public key with id: ${parsedProtected.kid}`
      },
      didDocumentMetadata: {},
      didDocument: null,
    }
  }

  const isSigValid = element.verifyOperationSignature(
    parsedInitialState.protected,
    parsedInitialState.payload,
    parsedInitialState.signature,
    publicKey.publicKeyHex
  )

  if (!isSigValid) {
    console.log('sig invalid')
    return {
      didResolutionMetadata: {
        error: 'invalidDid',
        message: 'Cannot validate create operation'
      },
      didDocumentMetadata: {},
      didDocument: null,
    }
  }

  const prependBaseDID = (field: any) => {
    if (typeof field === 'string') {
      if (field.startsWith('#')) {
        return `${parsed.did}${field}`
      } else {
        return field
      }
    } else if (
      typeof field === 'object' &&
      'id' in field &&
      typeof field.id === 'string'
    ) {
      if (field.id.startsWith('#')) {
        return {...field, id: `${parsed.did}${field.id}`}
      } else {
        return field
      }
    }
  }

  const didDocument: DIDDocument = {
    ...parsedPayload,
    id: parsed.did,
    publicKey: (parsedPayload.publicKey || []).map(prependBaseDID),
    assertionMethod: (parsedPayload.assertionMethod || []).map(prependBaseDID),
    authentication: (parsedPayload.authentication || []).map(prependBaseDID),
  }

  return {
    didResolutionMetadata: {},
    didDocument,
    didDocumentMetadata: {},
  }
}

export const resolve = (did: string): DIDDocument | null => {
  const parsed = parse(did)
  if (!parsed) return null

  return resolver(parsed).didDocument
}

export const resolverRegistry: {elem: DIDResolver} = {
  elem: async (_, parsed) => resolver(parsed)
}
