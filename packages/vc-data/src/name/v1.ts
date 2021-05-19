import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base/v1'
import {
  CreateThing,
  OneOrMore,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  ExpandThing,
  createContextEntry,
  createVCContextEntry,
} from '../util'

// Person Related

type NamePersonV1Mixin = CreateThing<
  'NamePerson',
  | {
      name: string
    }
  | {
      givenName: string
      familyName: string
    }
>

export type NamePersonV1 = ExtendThing<NamePersonV1Mixin, PersonEV1>

export type VCSNamePersonV1 = ExtendableVCSubject<ExpandThing<NamePersonV1>>

export type VCNamePersonV1 = ExtendableVC<VCSNamePersonV1, 'NameCredentialPersonV1'>

export const getVCNamePersonV1Context = () => {
  const namePersonEntry = createContextEntry<NamePersonV1Mixin, PersonEV1>({
    type: 'NamePerson',
    typeIdBase: 'bloomSchema',
    fields: {
      name: 'schema',
      givenName: 'schema',
      familyName: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCNamePersonV1>({
    type: 'NameCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [namePersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type NameOrganizationV1Mixin = CreateThing<
  'NameOrganization',
  {
    name: OneOrMore<string>
  }
>

export type NameOrganizationV1 = ExtendThing<NameOrganizationV1Mixin, OrganizationEV1>

export type VCSNameOrganizationV1 = ExtendableVCSubject<ExpandThing<NameOrganizationV1>>

export type VCNameOrganizationV1 = ExtendableVC<VCSNameOrganizationV1, 'NameCredentialOrganizationV1'>

export const getVCNameOrganizationV1Context = () => {
  const nameOrganizationEntry = createContextEntry<NameOrganizationV1Mixin, OrganizationEV1>({
    type: 'NameOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      name: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCNameOrganizationV1>({
    type: 'NameCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [nameOrganizationEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
