import { FromSchema } from "json-schema-to-ts";

import { contextSchema, holderSchema } from "./shared";
import { vcSchema } from "./vc";

export const vpProofSchema = {
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
  additionalProperties: false
} as const

export type VPProof = FromSchema<typeof vpProofSchema>

export const vpTypeSchema = {
  type: 'array',
  items: [{const: 'VerifiablePresentation'}],
  additionalItems: { type: 'string' },
  minItems: 1,
} as const

export type VPType = FromSchema<typeof vpTypeSchema>

export const vpSchema = {
  type: 'object',
  properties: {
    '@context': contextSchema,
    id: { type: 'string', format: 'uri' },
    type: vpTypeSchema,
    verifiableCredential: { type: 'array', items: vcSchema },
    holder: holderSchema,
    proof: vpProofSchema,
  },
  required: ['@context', 'id', 'type', 'verifiableCredential', 'holder', 'proof'],
  additionalProperties: false,
} as const

export type VP = FromSchema<typeof vpSchema>
