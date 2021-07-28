import { FromSchema } from 'json-schema-to-ts'
import { O } from 'ts-toolbelt'
import { RemoveIndex, VP, vpSchema } from '@bloomprotocol/vc'

export const descriptorMapItemSchema = {
  type: 'object',
  definitions: {
    descriptor: {
      $id: '#descriptor_map_item',
      type: 'object',
      properties: {
        id: { type: 'string' },
        path: { type: 'string' },
        path_nested: {
          type: 'object',
          $ref: '#descriptor_map_item',
        },
        format: {
          type: 'string',
          enum: ['jwt', 'jwt_vc', 'jwt_vp', 'ldp', 'ldp_vc', 'ldp_vp'],
        },
      },
      required: ['id', 'path', 'format'],
      additionalProperties: false,
    },
  },
  properties: {
    id: { type: 'string' },
    format: {
      type: 'string',
      enum: ['jwt', 'jwt_vc', 'jwt_vp', 'ldp', 'ldp_vc', 'ldp_vp'],
    },
    path: { type: 'string' },
    path_nested: { $ref: '#descriptor_map_item' },
  },
  required: ['id', 'format', 'path'],
  additionalProperties: false,
} as const

export type DescriptorMapItem = O.Omit<FromSchema<typeof descriptorMapItemSchema>, 'path_nested'> & {
  path_nested?: DescriptorMapItem
}

export const descriptorMapSchema = {
  type: 'array',
  items: descriptorMapItemSchema,
} as const

export type DescriptorMap = DescriptorMapItem[]

export const presentationSubmissionEmbedItemSchema = {
  type: 'object',
  properties: {
    presentation_submission: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        definition_id: { type: 'string' },
        descriptor_map: descriptorMapSchema,
      },
      required: ['id', 'definition_id', 'descriptor_map'],
      additionalProperties: false,
    },
  },
  required: ['presentation_submission'],
  additionalProperties: true,
} as const

export type PresentationSubmissionEmbedItem = O.P.Update<
  FromSchema<typeof presentationSubmissionEmbedItemSchema>,
  ['presentation_submission', 'descriptor_map'],
  DescriptorMap
>

export const presentationSubmissionSchema = {
  allOf: [
    {
      type: 'object',
      properties: {
        '@context': {
          type: 'array',
          contains: { const: 'https://identity.foundation/presentation-exchange/submission/v1' },
        },
        type: {
          type: 'array',
          contains: { const: 'PresentationSubmission' },
        },
      },
    },
    presentationSubmissionEmbedItemSchema,
    vpSchema,
  ],
} as const

export type PresentationSubmission = O.Omit<RemoveIndex<VP>, '@context' | 'type'> &
  PresentationSubmissionEmbedItem & {
    '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1', ...string[]]
    type: ['VerifiablePresentation', 'PresentationSubmission', ...string[]]
    [key: string]: unknown
  }
