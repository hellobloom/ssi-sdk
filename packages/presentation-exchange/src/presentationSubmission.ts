import { FromSchema } from 'json-schema-to-ts';

export const descriptorMapItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    format: { type: 'string' },
    path: { type: 'string' },
    path_nested: { type: 'object' },
  },
  required: ['id', 'format', 'path'],
  additionalProperties: false
} as const

export type DescriptorMapItem = FromSchema<typeof descriptorMapItemSchema>

export const descriptorMapSchema = {
  type: 'array',
  items: descriptorMapItemSchema
} as const

export type DescriptorMap = FromSchema<typeof descriptorMapSchema>

export const presentationSubmissionSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    id: { type: 'string' },
    definition_id: { type: 'string' },
    descriptor_map: descriptorMapSchema,
  },
  required: ['id', 'definition_id', 'descriptor_map'],
  additionalProperties: false,
} as const;

export type PresentationSubmission = FromSchema<typeof presentationSubmissionSchema>
