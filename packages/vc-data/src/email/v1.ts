import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  OneOrMore,
  ExtendableVCSubject,
  ExtendableVC,
  createContextEntry,
  createVCContextEntry,
} from '../util'

// Person Related

type EmailPersonV1Mixin = CreateThing<
  'EmailPerson',
  {
    email: OneOrMore<string>
  }
>

export type EmailPersonV1 = ExtendThing<EmailPersonV1Mixin, PersonEV1>

export type VCSEmailPersonV1 = ExtendableVCSubject<ExpandThing<EmailPersonV1>>

export type VCEmailPersonV1 = ExtendableVC<VCSEmailPersonV1, 'EmailCredentialPersonV1'>

export const getVCEmailPersonV1Context = () => {
  const dobPersonEntry = createContextEntry<EmailPersonV1Mixin, PersonEV1>({
    type: 'EmailPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      email: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCEmailPersonV1>({
    type: 'EmailCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [dobPersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type EmailOrganizationV1Mixin = CreateThing<
  'EmailOrganization',
  {
    email: OneOrMore<string>
  }
>

export type EmailOrganizationV1 = ExtendThing<EmailOrganizationV1Mixin, OrganizationEV1>

export type VCSEmailOrganizationV1 = ExtendableVCSubject<ExpandThing<EmailOrganizationV1>>

export type VCEmailOrganizationV1 = ExtendableVC<VCSEmailOrganizationV1, 'EmailCredentialOrganizationV1'>

export const getVCEmailOrganizationV1Context = () => {
  const emailOrganizationEntry = createContextEntry<EmailOrganizationV1Mixin, OrganizationEV1>({
    type: 'EmailOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      email: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCEmailOrganizationV1>({
    type: 'EmailCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [emailOrganizationEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
