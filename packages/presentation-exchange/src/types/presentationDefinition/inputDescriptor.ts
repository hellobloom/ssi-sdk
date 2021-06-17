import { FromSchema, JSONSchema } from 'json-schema-to-ts'
import { O } from 'ts-toolbelt'

export const statusDirectiveSchema = {
  type: 'object',
  properties: {
    directive: {
      type: 'string',
      enum: ['required', 'allowed', 'disallowed'],
    },
  },
  required: ['directive'],
  additionalProperties: false,
} as const

export type StatusDirective = FromSchema<typeof statusDirectiveSchema>

export const statusesSchema = {
  type: 'object',
  properties: {
    active: statusDirectiveSchema,
    suspended: statusDirectiveSchema,
    revoked: statusDirectiveSchema,
  },
  additionalProperties: false,
} as const

export type Statuses = FromSchema<typeof statusesSchema>

export const filterSchema = {
  $ref: 'http://json-schema.org/schema#',
} as const

export type Filter = Exclude<JSONSchema, boolean>

export const fieldNoPredicateSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    path: {
      type: 'array',
      items: { type: 'string' },
    },
    purpose: { type: 'string' },
    filter: filterSchema,
  },
  required: ['path'],
  additionalProperties: false,
} as const

export type FieldNoPredicate = O.Update<FromSchema<typeof fieldNoPredicateSchema>, 'filter', Filter>

export const fieldWithPredicateSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    path: {
      type: 'array',
      items: { type: 'string' },
    },
    purpose: { type: 'string' },
    filter: filterSchema,
    predicate: {
      type: 'string',
      enum: ['required', 'preferred'],
    },
  },
  required: ['path', 'filter', 'predicate'],
  additionalProperties: false,
} as const

export type FieldWithPredicate = O.Update<FromSchema<typeof fieldWithPredicateSchema>, 'filter', Filter>

export const fieldSchema = {
  oneOf: [fieldNoPredicateSchema, fieldWithPredicateSchema],
} as const

export type Field = FieldNoPredicate | FieldWithPredicate

export const isHolderSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      field_id: {
        type: 'array',
        items: { type: 'string' },
      },
      directive: {
        type: 'string',
        enum: ['required', 'preferred'],
      },
    },
    required: ['field_id', 'directive'],
    additionalProperties: false,
  },
} as const

export type IsHolder = FromSchema<typeof isHolderSchema>

export const sameSubjectSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      field_id: {
        type: 'array',
        items: { type: 'string' },
      },
      directive: {
        type: 'string',
        enum: ['required', 'preferred'],
      },
    },
    required: ['field_id', 'directive'],
    additionalProperties: false,
  },
} as const

export type SameSubject = FromSchema<typeof sameSubjectSchema>

export const constraintsSchema = {
  type: 'object',
  properties: {
    limit_disclosure: { type: 'string', enum: ['required', 'preferred'] },
    statuses: statusesSchema,
    fields: { type: 'array', items: fieldSchema },
    subject_is_issuer: { type: 'string', enum: ['required', 'preferred'] },
    is_holder: isHolderSchema,
    same_subject: sameSubjectSchema,
  },
  additionalProperties: false,
} as const

export type Constraints = O.Update<FromSchema<typeof constraintsSchema>, 'fields', Field[]>

export const schemaSchema = {
  type: 'object',
  properties: {
    uri: { type: 'string', format: 'uri' },
    required: { type: 'boolean' },
  },
  required: ['uri'],
  additionalProperties: false,
} as const

export type Schema = FromSchema<typeof schemaSchema>

export const inputDescriptorSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    purpose: { type: 'string' },
    group: { type: 'array', items: { type: 'string' } },
    schema: { type: 'array', items: schemaSchema },
    constraints: constraintsSchema,
  },
  required: ['id', 'schema'],
  additionalProperties: false,
} as const

export type InputDescriptor = O.Update<FromSchema<typeof inputDescriptorSchema>, 'constraints', Constraints>
