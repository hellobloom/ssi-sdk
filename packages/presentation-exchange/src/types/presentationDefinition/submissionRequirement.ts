import { FromSchema } from 'json-schema-to-ts'
import { O } from 'ts-toolbelt'

export const submissionRequirementFromSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    purpose: { type: 'string' },
    rule: {
      type: 'string',
      enum: ['all', 'pick'],
    },
    count: { type: 'integer', minimum: 1 },
    min: { type: 'integer', minimum: 0 },
    max: { type: 'integer', minimum: 0 },
    from: { type: 'string' },
  },
  required: ['rule', 'from'],
  additionalProperties: false,
} as const

export type SubmissionRequirementFrom = FromSchema<typeof submissionRequirementFromSchema>

export const submissionRequirementFromNestedSchema = {
  definitions: {
    submission_requirements: {
      $id: '#submission_requirements',
      type: 'object',
      oneOf: [
        {
          properties: {
            name: { type: 'string' },
            purpose: { type: 'string' },
            rule: {
              type: 'string',
              enum: ['all', 'pick'],
            },
            count: { type: 'integer', minimum: 1 },
            min: { type: 'integer', minimum: 0 },
            max: { type: 'integer', minimum: 0 },
            from: { type: 'string' },
          },
          required: ['rule', 'from'],
          additionalProperties: false,
        },
        {
          properties: {
            name: { type: 'string' },
            purpose: { type: 'string' },
            rule: {
              type: 'string',
              enum: ['all', 'pick'],
            },
            count: { type: 'integer', minimum: 1 },
            min: { type: 'integer', minimum: 0 },
            max: { type: 'integer', minimum: 0 },
            from_nested: {
              type: 'array',
              minItems: 1,
              items: {
                $ref: '#submission_requirements',
              },
            },
          },
          required: ['rule', 'from_nested'],
          additionalProperties: false,
        },
      ],
    },
  },
  type: 'object',
  properties: {
    name: { type: 'string' },
    purpose: { type: 'string' },
    rule: {
      type: 'string',
      enum: ['all', 'pick'],
    },
    count: { type: 'integer', minimum: 1 },
    min: { type: 'integer', minimum: 0 },
    max: { type: 'integer', minimum: 0 },
    from_nested: {
      type: 'array',
      minItems: 1,
      items: {
        $ref: '#submission_requirements',
      },
    },
  },
  required: ['rule', 'from_nested'],
  additionalProperties: false,
} as const

export type SubmissionRequirementFromNested = O.Omit<SubmissionRequirementFrom, 'from'> & {
  from_nested: (SubmissionRequirementFrom | SubmissionRequirementFromNested)[]
}

export const submissionRequirementSchema = {
  oneOf: [submissionRequirementFromSchema, submissionRequirementFromNestedSchema],
} as const

export type SubmissionRequirement = SubmissionRequirementFrom | SubmissionRequirementFromNested
