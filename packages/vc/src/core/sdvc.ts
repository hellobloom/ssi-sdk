import { FromSchema } from 'json-schema-to-ts'

export const selectiveSharedSchema = {
  type: 'object',
  properties: {
    vcId: { type: 'string' },
    nodeId: { type: 'string' },
    path: { type: 'string' },
    nodeType: { type: 'string' },
  },
  required: ['vcId', 'nodeId', 'path'],
} as const
export type SelectiveShared = FromSchema<typeof selectiveSharedSchema>

export const selectiveMetaSchema = {
  type: 'object',
  properties: {
    '@type': { const: 'SelectiveMeta' },
    vcId: { type: 'string' },
    nodes: { type: 'array', items: { type: 'string' } },
  },
  required: ['@type', 'vcId', 'nodes'],
} as const
export type SelectiveMeta = FromSchema<typeof selectiveMetaSchema>

export const selectiveNodeSchema = {
  allOf: [
    selectiveSharedSchema,
    {
      type: 'object',
      properties: {
        '@type': { const: 'SelectiveNode' },
        nodeIsRoot: { type: 'boolean' },
        nodeDepth: { type: 'number' },
      },
      required: ['@type', 'nodeIsRoot', 'nodeDepth'],
    },
  ],
} as const
export type SelectiveNode = FromSchema<typeof selectiveNodeSchema>

export const selectiveEdgeSchema = {
  allOf: [
    selectiveSharedSchema,
    {
      type: 'object',
      properties: {
        '@type': { const: 'SelectiveEdge' },
        property: { type: 'string' },
        targetNodeId: { type: 'string' },
        targetNodeType: { type: 'string' },
        arrayIndex: { type: 'number' },
      },
      required: ['@type', 'property', 'targetNodeId'],
    },
  ],
} as const
export type SelectiveEdge = FromSchema<typeof selectiveEdgeSchema>

export const selectivePropertyListSchema = {
  allOf: [
    selectiveSharedSchema,
    {
      type: 'object',
      properties: {
        '@type': { const: 'SelectiveNodePropertyList' },
        properties: { type: 'array', items: { type: 'string' } },
      },
      required: ['@type', 'properties'],
    },
  ],
} as const
export type SelectivePropertyList = FromSchema<typeof selectivePropertyListSchema>

export const selectivePropertySchema = {
  allOf: [
    selectiveSharedSchema,
    {
      type: 'object',
      properties: {
        '@type': { const: 'SelectiveProperty' },
        property: { type: 'string' },
        propertyType: { type: 'string' },
        value: {},
      },
      required: ['@type', 'property', 'propertyType', 'value'],
    },
  ],
} as const
export type SelectiveProperty = FromSchema<typeof selectivePropertySchema>

export type SelectiveAtom = SelectiveMeta | SelectiveNode | SelectiveEdge | SelectivePropertyList | SelectiveProperty

export const signedSelectiveMetaSchema = {
  type: 'object',
  properties: { sig: { type: 'string' }, payload: selectiveMetaSchema },
  required: ['sig', 'payload'],
} as const
export type SignedSelectiveMeta = FromSchema<typeof signedSelectiveMetaSchema>
export const signedSelectiveNodeSchema = {
  type: 'object',
  properties: { sig: { type: 'string' }, payload: selectiveNodeSchema },
  required: ['sig', 'payload'],
} as const
export type SignedSelectiveNode = FromSchema<typeof signedSelectiveNodeSchema>
export const signedSelectiveEdgeSchema = {
  type: 'object',
  properties: { sig: { type: 'string' }, payload: selectiveEdgeSchema },
  required: ['sig', 'payload'],
} as const
export type SignedSelectiveEdge = FromSchema<typeof signedSelectiveEdgeSchema>
export const signedSelectivePropertyListSchema = {
  type: 'object',
  properties: { sig: { type: 'string' }, payload: selectivePropertyListSchema },
  required: ['sig', 'payload'],
} as const
export type SignedSelectivePropertyList = FromSchema<typeof signedSelectivePropertyListSchema>
export const signedSelectivePropertySchema = {
  type: 'object',
  properties: { sig: { type: 'string' }, payload: selectivePropertySchema },
  required: ['sig', 'payload'],
} as const
export type SignedSelectiveProperty = FromSchema<typeof signedSelectivePropertySchema>
export type SignedSelectiveAtom =
  | SignedSelectiveMeta
  | SignedSelectiveNode
  | SignedSelectiveEdge
  | SignedSelectivePropertyList
  | SignedSelectiveProperty

export const selectiveAtomsSchema = {
  type: 'object',
  properties: {
    issuer: { type: 'string' },
    meta: { type: 'array', items: selectiveMetaSchema },
    nodes: { type: 'array', items: selectiveNodeSchema },
    edges: { type: 'array', items: selectiveEdgeSchema },
    properties: { type: 'array', items: selectivePropertySchema },
    property_lists: { type: 'array', items: selectivePropertyListSchema },
  },
  required: ['issuer', 'meta', 'nodes', 'edges', 'properties', 'property_lists'],
} as const
export type SelectiveAtoms = FromSchema<typeof selectiveAtomsSchema>

export const signedSelectiveAtomsSchema = {
  type: 'object',
  properties: {
    issuer: { type: 'string' },
    meta: { type: 'array', items: signedSelectiveMetaSchema },
    nodes: { type: 'array', items: signedSelectiveNodeSchema },
    edges: { type: 'array', items: signedSelectiveEdgeSchema },
    properties: { type: 'array', items: signedSelectivePropertySchema },
    property_lists: { type: 'array', items: signedSelectivePropertyListSchema },
  },
  required: ['issuer', 'meta', 'nodes', 'edges', 'properties', 'property_lists'],
} as const
export type SignedSelectiveAtoms = FromSchema<typeof signedSelectiveAtomsSchema>

export const sdvcTypeSchema = {
  type: 'array',
  items: { type: 'string' },
  contains: { const: 'SelectiveDisclosureVerifiableCredential' },
  minItems: 1,
} as const
export type SDVCType = FromSchema<typeof sdvcTypeSchema>

export const sdvcSchema = {
  allOf: [
    {
      type: 'object',
      properties: {
        type: sdvcTypeSchema,
      },
      required: ['type'],
    },
    signedSelectiveAtomsSchema,
  ],
} as const
export type SDVC = FromSchema<typeof sdvcSchema>
