import { FromSchema } from 'json-schema-to-ts'

import { holderSchema, issuerSchema, contextSchema } from './shared'

export const vcSubjectSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uri' },
  },
  required: [],
} as const

export type VCSubject = FromSchema<typeof vcSubjectSchema>

export const vcSchemaSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uri' },
    type: { type: 'string', format: 'uri' },
  },
  required: ['id', 'type'],
  additionalProperties: false,
} as const

export type VCSchema = FromSchema<typeof vcSchemaSchema>

export const vcProofSchema = {
  oneOf: [
    {
      type: 'object',
      properties: {
        type: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        proofPurpose: { const: 'assertionMethod' },
        verificationMethod: { type: 'string' },
        jws: { type: 'string' },
      },
      required: ['type', 'created', 'proofPurpose', 'verificationMethod', 'jws'],
    },
    {
      type: 'object',
      properties: {
        type: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        proofPurpose: { const: 'assertionMethod' },
        verificationMethod: { type: 'string' },
        proofValue: { type: 'string' },
      },
      required: ['type', 'created', 'proofPurpose', 'verificationMethod', 'proofValue'],
    },
  ],
} as const

export type VCProof = FromSchema<typeof vcProofSchema>

export const vcTypeSchema = {
  type: 'array',
  items: { type: 'string' },
  contains: { const: 'VerifiableCredential' },
  minItems: 1,
} as const

export type VCType = FromSchema<typeof vcTypeSchema>

export const vcSchema = {
  type: 'object',
  properties: {
    '@context': contextSchema,
    id: { type: 'string', format: 'uri' },
    type: vcTypeSchema,
    holder: holderSchema,
    credentialSubject: {
      oneOf: [vcSubjectSchema, { type: 'array', items: vcSubjectSchema }],
    },
    credentialSchema: {
      oneOf: [vcSchemaSchema, { type: 'array', items: vcSchemaSchema }],
    },
    issuanceDate: { type: 'string', format: 'date-time' },
    expirationDate: { type: 'string', format: 'date-time' },
    issuer: issuerSchema,
    proof: vcProofSchema,
  },
  required: ['@context', 'id', 'type', 'credentialSubject', 'issuanceDate', 'issuer', 'proof'],
} as const

export type VC = FromSchema<typeof vcSchema>
