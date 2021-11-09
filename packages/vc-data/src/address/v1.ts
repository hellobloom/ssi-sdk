import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  OneOrMore,
  ExpandThing,
  ExtendThing,
  CreateExpandedThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
} from '../util/v1'

// Person Related

type AddressPersonV1Mixin = CreateThing<
  'AddressPerson',
  {
    address: OneOrMore<CreateExpandedThing<'PostalAddress'>>
  }
>

export type AddressPersonV1 = ExtendThing<AddressPersonV1Mixin, PersonEV1>

export type VCSAddressPersonV1 = ExtendableVCSubject<ExpandThing<AddressPersonV1>>

export type VCAddressPersonV1 = ExtendableVC<VCSAddressPersonV1, 'AddressCredentialPersonV1'>

export const getVCAddressPersonV1Context = () => {
  const addressPersonEntry = createContextEntry<AddressPersonV1Mixin, PersonEV1>({
    type: 'AddressPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      address: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAddressPersonV1>({
    type: 'AddressCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [addressPersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type AddressOrganizationV1Mixin = CreateThing<
  'AddressOrganization',
  {
    address: OneOrMore<CreateExpandedThing<'PostalAddress'>>
  }
>

export type AddressOrganizationV1 = ExtendThing<AddressOrganizationV1Mixin, OrganizationEV1>

export type VCSAddressOrganizationV1 = ExtendableVCSubject<ExpandThing<AddressOrganizationV1>>

export type VCAddressOrganizationV1 = ExtendableVC<VCSAddressOrganizationV1, 'AddressCredentialOrganizationV1'>

export const getVCAddressOrganizationV1Context = () => {
  const addressOrganizationEntry = createContextEntry<AddressOrganizationV1Mixin, OrganizationEV1>({
    type: 'AddressOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      address: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAddressOrganizationV1>({
    type: 'AddressCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [addressOrganizationEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
