import { VC } from '@bloomprotocol/vc'

import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base/v1'
import {
  CreateThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  ExpandThing,
  OneOrMore,
  createContextEntry,
  createVCContextEntry,
} from '../util/v1'

// Helper Types

type ReceivedCredentialRoleV1Mixin = CreateThing<
  'ReceivedCredentialRole',
  {
    startDate?: string
    endDate?: string
    aggregatorDID?: string
    typesSome?: Array<string>
    typesAll?: Array<string>
    typesNot?: Array<string>
    contextsSome?: Array<string>
    contextsAll?: Array<string>
    contextsNot?: Array<string>
    issuerDIDIn?: Array<string>
    issuerDIDNotIn?: Array<string>
    receivedCredentials: OneOrMore<string | VC>
  }
>

export type ReceivedCredentialRoleV1 = ExtendThing<ReceivedCredentialRoleV1Mixin, CreateThing<'Role'>>

const getHelperContextEntries = () => {
  const receivedCredentialRoleEntry = createContextEntry<ReceivedCredentialRoleV1Mixin>({
    type: 'ReceivedCredentialRole',
    typeIdBase: 'bloomSchema',
    fields: {
      startDate: 'schema',
      endDate: 'schema',
      aggregatorDID: 'bloomSchema',
      typesSome: 'bloomSchema',
      typesAll: 'bloomSchema',
      typesNot: 'bloomSchema',
      contextsSome: 'bloomSchema',
      contextsAll: 'bloomSchema',
      contextsNot: 'bloomSchema',
      issuerDIDIn: 'bloomSchema',
      issuerDIDNotIn: 'bloomSchema',
      receivedCredentials: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return [receivedCredentialRoleEntry]
}

// Person Related

type MetaPersonV1Mixin = CreateThing<
  'MetaPerson',
  {
    receivedCredentials: OneOrMore<ExpandThing<ReceivedCredentialRoleV1>>
  }
>

export type MetaPersonV1 = ExtendThing<MetaPersonV1Mixin, PersonEV1>

export type VCSMetaPersonV1 = ExtendableVCSubject<ExpandThing<MetaPersonV1>>

export type VCMetaPersonV1 = ExtendableVC<VCSMetaPersonV1, 'MetaCredentialPersonV1'>

export const getVCMetaPersonV1Context = () => {
  const metaPersonEntry = createContextEntry<MetaPersonV1Mixin, PersonEV1>({
    type: 'MetaPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      receivedCredentials: 'bloomSchema',
    },
    vocab: 'schema',
  })
  return createVCContextEntry<VCMetaPersonV1>({
    type: 'MetaCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [metaPersonEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type MetaOrganizationV1Mixin = CreateThing<
  'MetaOrganization',
  {
    receivedCredentials: OneOrMore<ReceivedCredentialRoleV1>
  }
>

export type MetaOrganizationV1 = ExtendThing<MetaOrganizationV1Mixin, OrganizationEV1>

export type VCSMetaOrganizationV1 = ExtendableVCSubject<ExpandThing<MetaOrganizationV1>>

export type VCMetaOrganizationV1 = ExtendableVC<VCSMetaOrganizationV1, 'MetaCredentialOrganizationV1'>

export const getVCMetaOrganizationV1Context = () => {
  const metaOrganizationEntry = createContextEntry<MetaOrganizationV1Mixin, OrganizationEV1>({
    type: 'MetaOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      receivedCredentials: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCMetaOrganizationV1>({
    type: 'MetaCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [metaOrganizationEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
