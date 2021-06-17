import { FromSchema } from 'json-schema-to-ts'
import { SubmissionRequirement, submissionRequirementSchema } from './submissionRequirement'
import { InputDescriptor, inputDescriptorSchema } from './inputDescriptor'

export * from './inputDescriptor'
export * from './submissionRequirement'

export const baseJwtFormatSchema = {
  type: 'object',
  properties: {
    alg: {
      type: 'array',
      minItems: 1,
      items: { type: 'string' },
    },
  },
  required: ['alg'],
  additionalProperties: false,
} as const

export type BaseJwtFormatSchema = FromSchema<typeof baseJwtFormatSchema>

export const baseLdpFormatSchema = {
  type: 'object',
  properties: {
    proof_type: {
      type: 'array',
      minItems: 1,
      items: { type: 'string' },
    },
  },
  required: ['proof_type'],
  additionalProperties: false,
} as const

export type BaseLdpFormatSchema = FromSchema<typeof baseLdpFormatSchema>

export const formatSchema = {
  type: 'object',
  properties: {
    jwt: baseJwtFormatSchema,
    jwt_vc: baseJwtFormatSchema,
    jwt_vp: baseJwtFormatSchema,
    ldp: baseLdpFormatSchema,
    ldp_vc: baseLdpFormatSchema,
    ldp_vp: baseLdpFormatSchema,
  },
  additionalProperties: false,
} as const

export type Format = FromSchema<typeof formatSchema>

export const presentationDefinitionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    input_descriptors: { type: 'array', items: inputDescriptorSchema },
    name: { type: 'string' },
    purpose: { type: 'string' },
    format: formatSchema,
    submission_requirements: { type: 'array', items: submissionRequirementSchema },
  },
  required: ['id', 'input_descriptors'],
  additionalProperties: false,
} as const

export type PresentationDefinition = Omit<
  FromSchema<typeof presentationDefinitionSchema>,
  'submission_requirements' | 'input_descriptors'
> & {
  input_descriptors: InputDescriptor[]
  submission_requirements?: SubmissionRequirement[]
}
