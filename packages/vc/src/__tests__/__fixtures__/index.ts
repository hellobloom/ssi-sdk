import { FromSchema } from "json-schema-to-ts";
import { VC, VP, vcSchema, vpSchema } from "../../core";
import { DocumentLoader } from "../../shared";

const {Ed25519VerificationKey2020} = require('@digitalbazaar/ed25519-verification-key-2020');
const {Ed25519Signature2020} = require('@digitalbazaar/ed25519-signature-2020');

const credentialsContextDoc = require('./contexts/credentials-v1.json')
const examplesContextDoc = require('./contexts/examples-v1.json')
const odrlContextDoc = require('./contexts/odrl.json')
const didContextDoc = require('./contexts/did-v0.11.json')
const revocationList2020ContextDoc = require('./contexts/revocation-list-2020-v1.json')
const holderDidDoc = require('./didDocuments/holder.json')
const issuerDidDoc = require('./didDocuments/issuer.json')
const issuerKey = require('./keys/issuer.json')
const holderKey = require('./keys/issuer.json')

const contextMap: {[url: string]: Record<string, unknown>} = {
  'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
  'https://www.w3.org/2018/credentials/examples/v1': examplesContextDoc,
  'https://www.w3.org/ns/odrl.jsonld': odrlContextDoc,
  'https://w3id.org/did/v0.11': didContextDoc,
  'https://w3id.org/vc-revocation-list-2020/v1': revocationList2020ContextDoc,
}

const didDocMap: {[url: string]: Record<string, unknown>} = {
  'did:example:holder': holderDidDoc,
  'did:example:issuer': issuerDidDoc,
}

export const documentLoader: DocumentLoader = (url: string) => {
  const withoutFragment: string = url.split('#')[0];
  const document = (withoutFragment.startsWith('did:') ? didDocMap : contextMap)[withoutFragment] || null

  if (document === null) console.log({withoutFragment, url})

  return {
    contextUrl: null,
    document,
    documentUrl: url
  }
}

const getSuite = async (keyInfo: any) =>
  new Ed25519Signature2020({key: Ed25519VerificationKey2020.fromEd25519VerificationKey2018(keyInfo)})

export const getIssuerSignSuite = async () =>
  getSuite(issuerKey['private'])

export const getHolderSignSuite = async () =>
  getSuite(holderKey['private'])

export const getIssuerVerifySuite = async () =>
  getSuite(issuerKey['public'])

export const getHolderVerifySuite = async () =>
  getSuite(holderKey['public'])

const universityDegreeVCSubjectSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uri' },
    degree: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['type', 'name']
    }
  },
  required: ['degree'],
  additionalProperties: true
} as const

export type UniversityDegreeVCSubject = FromSchema<typeof universityDegreeVCSubjectSchema>

export const universityDegreeVCTypeSchema = {
  type: 'array',
  items: [{const: 'VerifiableCredential'}, {const: 'UniversityDegreeCredential'}],
  additionalItems: { type: 'string' },
  minItems: 1,
} as const

export type UniversityDegreeVCType = FromSchema<typeof universityDegreeVCTypeSchema>

export const universityDegreeVCSchema = {
  type: 'object',
  properties: {
    ...vcSchema.properties,
    type: universityDegreeVCTypeSchema,
    credentialSubject: universityDegreeVCSubjectSchema,
    credentialStatus: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uri' },
        type: { type: 'string' },
        revocationListIndex: { type: 'string' },
        revocationListCredential: { type: 'string', format: 'uri' },
      }
    }
  },
  required: vcSchema.required,
  additionalProperties: false,
} as const

export type UniversityDegreeVC = FromSchema<typeof universityDegreeVCSchema>

export const universityDegreeVPSchema = {
  type: 'object',
  properties: {
    ...vpSchema.properties,
    verifiableCredential: {
      type: 'array',
      items: {
        anyOf: [
          vcSchema,
          universityDegreeVCSchema
        ]
      },
      contains: universityDegreeVCSchema,
    }
  },
  required: vpSchema.required,
  additionalProperties: false,
} as const

export type UniversityDegreeVP = FromSchema<typeof universityDegreeVPSchema>


export const unsignedVC: Omit<VC, 'proof'> = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://www.w3.org/2018/credentials/examples/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'UniversityDegreeCredential'],
  issuanceDate: new Date().toISOString(),
  issuer: 'did:example:issuer',
  credentialSubject: {}
}

export const unsignedDegreeVC: Omit<UniversityDegreeVC, 'proof'> = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://www.w3.org/2018/credentials/examples/v1', 'https://w3id.org/vc-revocation-list-2020/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'UniversityDegreeCredential'],
  issuanceDate: new Date().toISOString(),
  issuer: 'did:example:issuer',
  credentialSubject: {
    degree: {
      type: 'BachelorDegree',
      name: 'Bachelor of Science and Arts'
    }
  },
  credentialStatus: {
    id: 'https://example.com/credentials/status/3#94567',
    type: 'RevocationList2020Status',
    revocationListIndex: '94567',
    revocationListCredential: 'https://example.com/credentials/status/3'
  }
}

export const getUnsignedVP = (vcs: VC[]): Omit<VP, 'proof'> =>
  ({
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    type: ['VerifiablePresentation'],
    holder: 'did:example:holder',
    verifiableCredential: vcs
  })
