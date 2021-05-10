import { FromSchema } from 'json-schema-to-ts';

import { holderSchema, issuerSchema, contextSchema } from './shared';

const vcSubjectItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uri' },
  },
  required: [],
  additionalProperties: true,
} as const;

export const vcSubjectSchema = {
  oneOf: [vcSubjectItemSchema, { type: 'array', items: vcSubjectItemSchema }],
} as const;

export type VCSubject = FromSchema<typeof vcSubjectSchema>;

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
      required: [
        'type',
        'created',
        'proofPurpose',
        'verificationMethod',
        'jws',
      ],
      additionalProperties: false,
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
      required: [
        'type',
        'created',
        'proofPurpose',
        'verificationMethod',
        'proofValue',
      ],
      additionalProperties: false,
    },
  ],
} as const;

export type VCProof = FromSchema<typeof vcProofSchema>;

export const vcTypeSchema = {
  type: 'array',
  items: [{ const: 'VerifiableCredential' }],
  additionalItems: { type: 'string' },
  minItems: 1,
} as const;

export type VCType = FromSchema<typeof vcTypeSchema>;

export const vcSchema = {
  type: 'object',
  properties: {
    '@context': contextSchema,
    id: { type: 'string', format: 'uri' },
    type: vcTypeSchema,
    holder: holderSchema,
    credentialSubject: vcSubjectSchema,
    issuanceDate: { type: 'string', format: 'date-time' },
    expirationDate: { type: 'string', format: 'date-time' },
    issuer: issuerSchema,
    proof: vcProofSchema,
  },
  required: [
    '@context',
    'id',
    'type',
    'credentialSubject',
    'issuanceDate',
    'issuer',
    'proof',
  ],
  additionalProperties: false,
} as const;

export type VC = FromSchema<typeof vcSchema>;
