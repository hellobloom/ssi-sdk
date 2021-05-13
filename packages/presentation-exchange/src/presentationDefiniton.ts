import { FromSchema } from 'json-schema-to-ts';

export const schemaSchema = {
  type: 'object',
  properties: {
    uri: { type: 'string' },
    required: { type: 'boolean' },
  },
  required: ['uri'],
  additionalProperties: false,
} as const;

export type Schema = FromSchema<typeof schemaSchema>;

export const filterSchema = {
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
} as const;

export type Filter = FromSchema<typeof filterSchema>;

export const formatSchema = {
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
  },
  additionalProperties: false,
} as const;

export type Format = FromSchema<typeof formatSchema>;

export const submissionRequirementSchema = {
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
} as const;

export type SubmissionRequirement = FromSchema<
  typeof submissionRequirementSchema
>;

export const submissionRequirementsSchema = {
  type: 'array',
  items: submissionRequirementSchema,
} as const;

export type SubmissionRequirements = FromSchema<
  typeof submissionRequirementsSchema
>;

export const inputDescriptorSchema = {
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
      items: schemaSchema,
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
} as const;

export type InputDescriptor = FromSchema<typeof inputDescriptorSchema>;

export const inputDescriptorsSchema = {
  type: 'array',
  items: inputDescriptorSchema,
} as const;

export type InputDescriptors = FromSchema<typeof inputDescriptorsSchema>;

export const presentationDefinitionSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    id: { type: 'string' },
    input_descriptors: inputDescriptorsSchema,
    name: { type: 'string' },
    purpose: { type: 'string' },
    format: formatSchema,
    submission_requirements: submissionRequirementsSchema,
  },
  required: ['id', 'input_descriptors'],
  additionalProperties: false,
} as const;

export type PresentationDefinition = FromSchema<
  typeof presentationDefinitionSchema
>;
