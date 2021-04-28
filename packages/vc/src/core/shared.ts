import { FromSchema } from "json-schema-to-ts";

export const holderSchema = {
  oneOf: [
    { type: 'string', format: 'uri' },
    {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uri' },
        type: { type: 'string' }
      },
      required: ['id'],
      additionalProperties: false
    }
  ]
} as const

export type Holder = FromSchema<typeof holderSchema>

export const issuerSchema = {
  oneOf: [
    { type: 'string', format: 'uri' },
    {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uri' },
        type: { type: 'string' }
      },
      required: ['id'],
      additionalProperties: false
    }
  ]
} as const

export type Issuer = FromSchema<typeof issuerSchema>

export const contextSchema = {
  type: 'array',
  items: [{const: 'https://www.w3.org/2018/credentials/v1'}],
  additionalItems: {
    anyOf: [
      { type: 'string', format: 'uri' },
      { type: 'object', additionalProperties: true, }
    ]
  },
  minItems: 1,
} as const

export type Context = FromSchema<typeof contextSchema>
