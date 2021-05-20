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

type PhonePersonV1Mixin = CreateThing<
  'PhonePerson',
  {
    telephone: OneOrMore<string>
  }
>

export type PhonePersonV1 = ExtendThing<PhonePersonV1Mixin, PersonEV1>

export type VCSPhonePersonV1 = ExtendableVCSubject<ExpandThing<PhonePersonV1>>

export type VCPhonePersonV1 = ExtendableVC<VCSPhonePersonV1, 'PhoneCredentialPersonV1'>

export const getVCPhonePersonV1Context = () => {
  const phonePersonEntry = createContextEntry<PhonePersonV1Mixin, PersonEV1>({
    type: 'PhonePerson',
    typeIdBase: 'bloomSchema',
    fields: {
      telephone: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCPhonePersonV1>({
    type: 'PhoneCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [phonePersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type PhoneOrganizationV1Mixin = CreateThing<
  'PhoneOrganization',
  {
    telephone: OneOrMore<string>
  }
>

export type PhoneOrganizationV1 = ExtendThing<PhoneOrganizationV1Mixin, OrganizationEV1>

export type VCSPhoneOrganizationV1 = ExtendableVCSubject<ExpandThing<PhoneOrganizationV1>>

export type VCPhoneOrganizationV1 = ExtendableVC<VCSPhoneOrganizationV1, 'PhoneCredentialOrganizationV1'>

export const getVCPhoneOrganizationV1Context = () => {
  const phoneOrganizationEntry = createContextEntry<PhoneOrganizationV1Mixin, OrganizationEV1>({
    type: 'PhoneOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      telephone: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCPhoneOrganizationV1>({
    type: 'PhoneCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [phoneOrganizationEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
