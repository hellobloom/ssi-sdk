import { DocumentLoader } from '@bloomprotocol/vc'
import { createDIDFromMnemonic, FromMnemonicResult, resolve } from '@bloomprotocol/elem-did-legacy-non-anchored'
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019'
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

import {
  DescriptorMap,
  DescriptorMapItem,
  Field,
  Format,
  InputDescriptor,
  PresentationDefinition,
  presentationDefinitionSchema,
  PresentationSubmission,
  presentationSubmissionSchema,
  SubmissionRequirement,
} from '../../types'

const credentialsContextDoc = require('./contexts/credentials-v1.json')
const examplesContextDoc = require('./contexts/examples-v1.json')
const odrlContextDoc = require('./contexts/odrl.json')
const didContextDoc = require('./contexts/did-v0.11.json')
const revocationList2020ContextDoc = require('./contexts/revocation-list-2020-v1.json')
const ed255192020ContextDoc = require('./contexts/ed25519-2020-v1.json')
const secp256k12019ContextDoc = require('./contexts/secp256k1-2019-v1.json')
const securityV1ContextDoc = require('./contexts/security-v1.json')
const securityV2ContextDoc = require('./contexts/security-v2.json')
const presentationSubmissionV1ContextDoc = require('./contexts/presentation-submission-v1.json')

const contextMap: { [url: string]: Record<string, unknown> } = {
  'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
  'https://www.w3.org/2018/credentials/examples/v1': examplesContextDoc,
  'https://www.w3.org/ns/odrl.jsonld': odrlContextDoc,
  'https://w3id.org/did/v0.11': didContextDoc,
  'https://w3id.org/vc-revocation-list-2020/v1': revocationList2020ContextDoc,
  'https://w3id.org/security/suites/ed25519-2020/v1': ed255192020ContextDoc,
  'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
  'https://w3id.org/security/v1': securityV1ContextDoc,
  'https://w3id.org/security/v2': securityV2ContextDoc,
  'https://identity.foundation/presentation-exchange/submission/v1': presentationSubmissionV1ContextDoc,
}

export const documentLoader: DocumentLoader = (url: string) => {
  const withoutFragment = url.split('#')[0]
  const document = (withoutFragment.startsWith('did:') ? (resolve(withoutFragment) as any) : contextMap[withoutFragment]) || null

  if (document === null) console.log({ url, withoutFragment })

  return {
    document,
    documentUrl: url,
  }
}

export const issuer = createDIDFromMnemonic('notice tank distance gallery funny tent emerge knife circle vehicle post verify')
export const verifier = createDIDFromMnemonic('album clean eager win wash replace farm decorate evidence kitchen narrow penci')
export const holder1 = createDIDFromMnemonic('change wild defense poem cat hurdle gate castle more cover tiger light')
export const holder2 = createDIDFromMnemonic('fiscal tunnel sugar catch gate list jealous wash common half fresh priority')

const getSuite = (keyPair?: { controller: string; id: string; privateKeyHex: string }) => {
  return new EcdsaSecp256k1Signature2019({
    key: keyPair ? EcdsaSecp256k1VerificationKey2019.from(keyPair) : undefined,
    date: '2021-06-10T00:00:00.000Z',
  })
}

export const getSuiteFor = (config: FromMnemonicResult) =>
  getSuite({
    controller: config.did,
    id: `${config.didDocument.id}#primary`,
    privateKeyHex: config.keyPairs.primaryKeyPair.privateKeyHex,
  })

export const removeUndefinedKeys = <T extends Record<string, unknown>>(obj: T) => {
  const copy = { ...obj }
  Object.keys(copy).forEach((key) => (copy[key] === undefined ? delete copy[key] : {}))
  return copy
}

export const createPresentationSubmission = ({
  id = '123',
  definition_id = 'definition_id',
  descriptor_map = [],
}: {
  id?: string
  definition_id?: string
  descriptor_map?: DescriptorMap
}): PresentationSubmission =>
  removeUndefinedKeys({
    '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
    id: `urn:example:${id}`,
    type: ['VerifiablePresentation', 'PresentationSubmission'],
    presentation_submission: {
      id,
      definition_id,
      descriptor_map,
    },
    verifiableCredential: [],
    holder: 'did:example:123',
    proof: {
      type: '',
      proofPurpose: 'authentication',
      verificationMethod: '',
      created: new Date().toISOString(),
      challenge: '',
      domain: '',
      jws: '',
    },
  })

export const createDescriptorMapItem = ({
  id = 'descriptor_id',
  format = 'ldp_vc',
  path = '$.verifiableCredential[0]',
  path_nested,
}: {
  id?: string
  format?: 'jwt' | 'jwt_vc' | 'jwt_vp' | 'ldp' | 'ldp_vc' | 'ldp_vp'
  path?: string
  path_nested?: DescriptorMapItem
}): DescriptorMapItem =>
  removeUndefinedKeys({
    id,
    format,
    path,
    path_nested,
  })

export const createPresentationDefinition = ({
  id = '32f54163-7166-48f1-93d8-ff217bdb0653',
  input_descriptors = [],
  name,
  purpose,
  format,
  submission_requirements,
}: {
  id?: string
  input_descriptors?: InputDescriptor[]
  name?: string
  purpose?: string
  format?: Format
  submission_requirements?: SubmissionRequirement[]
}): PresentationDefinition =>
  removeUndefinedKeys({
    id,
    input_descriptors,
    name,
    purpose,
    format,
    submission_requirements,
  })

export const createSubmissionRequirement = ({
  name = 'Submission Requirement',
  purpose,
  rule,
  count,
  min,
  max,
  from,
  from_nested,
}: {
  name?: string
  purpose?: string
  rule: 'pick' | 'all'
  count?: number
  min?: number
  max?: number
  from?: string
  from_nested?: SubmissionRequirement[]
}): SubmissionRequirement =>
  removeUndefinedKeys({
    name,
    purpose,
    rule,
    count,
    min,
    max,
    from,
    from_nested,
  }) as any

const createInputDescriptor = ({ id, type, group, fields = [] }: { id: string; type: string; group?: string[]; fields?: Field[] }) => {
  const inputDescriptor: InputDescriptor = {
    id,
    schema: [{ uri: `https://schema.bloom.co/${type}` }],
    group,
    constraints: {
      fields: [
        {
          path: ['$.type'],
          purpose: `Credential must be of type ${type}`,
          filter: {
            type: 'array',
            items: { type: 'string' },
            contains: { const: type },
          },
        },
        ...fields,
      ],
    },
  }

  return inputDescriptor
}

export const createEmailInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `email_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({ id, group, type: 'EmailCredentialPersonV1' })
}

export const createPhoneInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `phone_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({ id, group, type: 'PhoneCredentialPersonV1' })
}

export const createAddressInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `address_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({ id, group, type: 'AddressCredentialPersonV1' })
}

export const createAccountInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `account_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({
    id,
    group,
    type: 'AccountCredentialPersonV1',
  })
}

export const createTwitterAccountInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `twitter_account_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({
    id,
    group,
    type: 'AccountCredentialPersonV1',
    fields: [
      {
        path: ['$.credentialSubject.data.hasAccount.organization.name'],
        purpose: 'This account credential must be for a Twitter account',
        filter: {
          type: 'string',
          const: 'Twitter',
        },
      },
    ],
  })
}

export const createGoogleAccountInputDescriptor = ({ idSuffix, group }: { idSuffix?: string; group?: string[] }) => {
  const id = `google_account_input${idSuffix ? `_${idSuffix}` : ''}`
  return createInputDescriptor({
    id,
    group,
    type: 'AccountCredentialPersonV1',
    fields: [
      {
        path: ['$.credentialSubject.data.hasAccount.organization.name'],
        purpose: 'This account credential must be for a Google account',
        filter: {
          type: 'string',
          const: 'Google',
        },
      },
    ],
  })
}

export const validatePresentationDefinition = addFormats(new Ajv()).compile<PresentationDefinition>(presentationDefinitionSchema)

export const validatePresentationSubmission = addFormats(new Ajv()).compile<PresentationSubmission>(presentationSubmissionSchema)
