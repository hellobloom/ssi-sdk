import { FromSchema } from 'json-schema-to-ts';
import { presentationDefinitionSchema } from '@bloomprotocol/presentation-exchange';

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
      items: { type: 'string' },
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
    properties: { type: 'array', items: displayMappingObjectSchema },
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
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          uri: { type: 'string' },
        },
      },
      required: ['uri'],
    },

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
