import { FromSchema } from 'json-schema-to-ts'

import { contextSchema, holderSchema } from './shared'
import { vcSchema } from './vc'
import { sdvcSchema } from './sdvc'

export const vpProofSchema = {
  oneOf: [
    {
      type: 'object',
      properties: {
        type: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        proofPurpose: { const: 'authentication' },
        verificationMethod: { type: 'string' },
        challenge: { type: 'string' },
        domain: { type: 'string' },
        jws: { type: 'string' },
      },
      required: ['type', 'created', 'proofPurpose', 'verificationMethod', 'challenge', 'domain', 'jws'],
    },
    {
      type: 'object',
      properties: {
        type: { type: 'string' },
        created: { type: 'string', format: 'date-time' },
        proofPurpose: { const: 'authentication' },
        verificationMethod: { type: 'string' },
        challenge: { type: 'string' },
        domain: { type: 'string' },
        proofValue: { type: 'string' },
      },
      required: ['type', 'created', 'proofPurpose', 'verificationMethod', 'challenge', 'domain', 'proofValue'],
    },
  ],
} as const

export type VPProof = FromSchema<typeof vpProofSchema>

export const vpTypeSchema = {
  type: 'array',
  items: { type: 'string' },
  contains: { const: 'VerifiablePresentation' },
  minItems: 1,
} as const

export type VPType = FromSchema<typeof vpTypeSchema>

export const vpSchema = {
  type: 'object',
  properties: {
    '@context': contextSchema,
    id: { type: 'string', format: 'uri' },
    type: vpTypeSchema,
    verifiableCredential: { type: 'array', items: { oneOf: [vcSchema, sdvcSchema] } },
    holder: holderSchema,
    proof: vpProofSchema,
  },
  required: ['@context', 'id', 'type', 'verifiableCredential', 'holder', 'proof'],
} as const

export type VP = FromSchema<typeof vpSchema>
