import { FromSchema } from 'json-schema-to-ts';

const imageSchema = {
  type: 'object',
  properties: {
    uri: { type: 'string' },
    alt: { type: 'string' },
  },
  required: ['uri'],
  additionalProperties: false,
} as const;
export type Image = FromSchema<typeof imageSchema>;

const styleItemSchema = {
  type: 'object',
  properties: {
    color: { type: 'string' },
  },
  additionalProperties: false,
} as const;
export type StyleItem = FromSchema<typeof styleItemSchema>;

const stylesSchema = {
  type: 'object',
  properties: {
    thumbnail: imageSchema,
    hero: imageSchema,
    background: styleItemSchema,
    text: styleItemSchema,
  },
  additionalProperties: false,
} as const;
export type Styles = FromSchema<typeof stylesSchema>;

const displayMappingObjectSchema = {
  type: 'object',
  properties: {
    path: {
      type: 'array',
      item: { type: 'string' },
    },
    text: { type: ['number', 'string'] },
    label: { type: ['number', 'string'] },
  },
  additionalProperties: false,
} as const;
export type DisplayMappingObject = FromSchema<
  typeof displayMappingObjectSchema
>;

const displaySchema = {
  type: 'object',
  properties: {
    title: displayMappingObjectSchema,
    subtitle: displayMappingObjectSchema,
    description: displayMappingObjectSchema,
    properties: displayMappingObjectSchema,
  },
  additionalProperties: false,
} as const;
export type Display = FromSchema<typeof displaySchema>;

const outputDescriptorSchema = {
  title: 'Output Descriptor',
  $schema: 'http://json-schema.org/draft-07/schema#',

  type: 'object',
  properties: {
    id: { type: 'string' },
    schema: { type: 'array' },

    name: { type: 'string' },
    description: { type: 'string' },
    styles: stylesSchema,
    display: displaySchema,
  },
  required: ['id', 'schema'],
  additionalProperties: false,
} as const;
export type OutputDescriptor = FromSchema<typeof outputDescriptorSchema>;

const issuerSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    styles: stylesSchema,
  },
  required: ['id'],
  additionalProperties: false,
} as const;
export type Issuer = FromSchema<typeof issuerSchema>;

// TODO: Move presentationDefinitionSchema to a @bloomprotocol/presentation-exchange package and consume here
/**
 * Copied from: https://identity.foundation/presentation-exchange/#json-schema-2
 */
const presentationDefinitionSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Presentation Definition',
  definitions: {
    schema: {
      type: 'object',
      properties: {
        uri: { type: 'string' },
        required: { type: 'boolean' },
      },
      required: ['uri'],
      additionalProperties: false,
    },
    filter: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        format: { type: 'string' },
        pattern: { type: 'string' },
        minimum: { type: ['number', 'string'] },
        minLength: { type: 'integer' },
        maxLength: { type: 'integer' },
        exclusiveMinimum: { type: ['number', 'string'] },
        exclusiveMaximum: { type: ['number', 'string'] },
        maximum: { type: ['number', 'string'] },
        const: { type: ['number', 'string'] },
        enum: {
          type: 'array',
          items: { type: ['number', 'string'] },
        },
        not: {
          type: 'object',
          minProperties: 1,
        },
      },
      required: ['type'],
      additionalProperties: false,
    },
    format: {
      type: 'object',
      patternProperties: {
        '^jwt$|^jwt_vc$|^jwt_vp$': {
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
        },
        '^ldp_vc$|^ldp_vp$|^ldp$': {
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
        },
        additionalProperties: false,
      },
      additionalProperties: false,
    },
    submission_requirements: {
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
                $ref: '#/definitions/submission_requirements',
              },
            },
          },
          required: ['rule', 'from_nested'],
          additionalProperties: false,
        },
      ],
    },
    input_descriptors: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        purpose: { type: 'string' },
        group: {
          type: 'array',
          items: { type: 'string' },
        },
        schema: {
          type: 'array',
          items: { $ref: '#/definitions/schema' },
        },
        constraints: {
          type: 'object',
          properties: {
            limit_disclosure: {
              type: 'string',
              enum: ['required', 'preferred'],
            },
            statuses: {
              type: 'object',
              properties: {
                active: {
                  type: 'object',
                  properties: {
                    directive: {
                      type: 'string',
                      enum: ['required', 'allowed', 'disallowed'],
                    },
                  },
                },
                suspended: {
                  type: 'object',
                  properties: {
                    directive: {
                      type: 'string',
                      enum: ['required', 'allowed', 'disallowed'],
                    },
                  },
                },
                revoked: {
                  type: 'object',
                  properties: {
                    directive: {
                      type: 'string',
                      enum: ['required', 'allowed', 'disallowed'],
                    },
                  },
                },
              },
            },
            fields: {
              type: 'array',
              items: { $ref: '#/definitions/field' },
            },
            subject_is_issuer: {
              type: 'string',
              enum: ['required', 'preferred'],
            },
            is_holder: {
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
            },
            same_subject: {
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
            },
          },
          additionalProperties: false,
        },
      },
      required: ['id', 'schema'],
      additionalProperties: false,
    },
    field: {
      type: 'object',
      oneOf: [
        {
          properties: {
            id: { type: 'string' },
            path: {
              type: 'array',
              items: { type: 'string' },
            },
            purpose: { type: 'string' },
            filter: { $ref: '#/definitions/filter' },
          },
          required: ['path'],
          additionalProperties: false,
        },
        {
          properties: {
            id: { type: 'string' },
            path: {
              type: 'array',
              items: { type: 'string' },
            },
            purpose: { type: 'string' },
            filter: { $ref: '#/definitions/filter' },
            predicate: {
              type: 'string',
              enum: ['required', 'preferred'],
            },
          },
          required: ['path', 'filter', 'predicate'],
          additionalProperties: false,
        },
      ],
    },
  },
  type: 'object',
  properties: {
    presentation_definition: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        purpose: { type: 'string' },
        format: { $ref: '#/definitions/format' },
        submission_requirements: {
          type: 'array',
          items: {
            $ref: '#/definitions/submission_requirements',
          },
        },
        input_descriptors: {
          type: 'array',
          items: { $ref: '#/definitions/input_descriptors' },
        },
      },
      required: ['id', 'input_descriptors'],
      additionalProperties: false,
    },
  },
} as const;

const credentialManifestSchema = {
  title: 'Credential Manifest',
  $schema: 'http://json-schema.org/draft-07/schema#',

  type: 'object',
  properties: {
    issuer: issuerSchema,
    output_descriptors: {
      type: 'array',
      items: outputDescriptorSchema,
    },
    presentation_definition: presentationDefinitionSchema,
  },
  required: ['issuer', 'output_descriptors'],
  additionalProperties: false,
} as const;

export type CredentialManifest = FromSchema<typeof credentialManifestSchema>;
