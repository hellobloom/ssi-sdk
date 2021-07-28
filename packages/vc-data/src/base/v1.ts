import { R4 } from '@ahryman40k/ts-fhir-types'
import { CreateThing, ExtendThing, OneOrMore, createContextEntry, ExpandThing, CreateExpandedThing } from '../util'

export type GovernmentOrgV1 =
  | CreateThing<'Country'>
  | CreateThing<'State'>
  | CreateThing<'City'>
  | OrganizationEV1
  | CreateThing<'Corporation'>
  | CreateThing<'GovernmentOrganization'>
  | CreateThing<'AdministrativeArea'>

export type MonetaryAmountRV1Mixin = CreateThing<
  'MonetaryAmount',
  {
    currency?: string
    value?: number | string
    availableValue?: number | string
  }
>
export type MonetaryAmountRV1 = ExtendThing<MonetaryAmountRV1Mixin, CreateThing<'MonetaryAmount'>>

type PersonEV1Mixin = CreateThing<'PersonE'>

export type PersonEV1 = ExtendThing<PersonEV1Mixin, CreateThing<'Person'>>

type CredentialV1Mixin = CreateThing<
  'Credential',
  {
    dateRevoked?: string
    recognizedBy?: OneOrMore<ExpandThing<GovernmentOrgV1>>
  }
>

export type CredentialV1 = ExtendThing<CredentialV1Mixin, CreateThing<'EducationalOccupationalCredential'>>

type OrganizationalCredentialV1Mixin = CreateThing<
  'OrganizationalCredential',
  {
    credentialCategory: string // 'incorporation', 'foreign-registration'
    organizationType?: string | ExpandThing<CreateThing<'DefinedTerm'>>
    goodStanding?: boolean // Company is in "good standing" with the recognizing authority
    active?: boolean // Company has "active" status within recognizing authority's jurisdiction
    primaryJurisdiction?: boolean
    identifier?: ExpandThing<CreateThing<'PropertyValue'>> | string | number
  }
>
export type OrganizationalCredentialV1 = ExtendThing<OrganizationalCredentialV1Mixin, CredentialV1>

export type CredentialUV1 = OrganizationalCredentialV1 | CredentialV1

type OrganizationEV1Mixin = CreateThing<
  'OrganizationE',
  {
    hasCredential?: OneOrMore<ExpandThing<OrganizationalCredentialV1> | ExpandThing<CredentialV1>>
    industry?: OneOrMore<string>
    identifiers?: OneOrMore<CreateExpandedThing<'PropertyValue'> | string | number>
  }
>

export type OrganizationEV1 = ExtendThing<OrganizationEV1Mixin, CreateThing<'Organization'>>

export type FHIRPatientE = R4.IPatient & {
  '@type': 'Patient'
  resourceType: 'Patient'
  identifier: Array<R4.IIdentifier>

  active: boolean
  name: Array<R4.IHumanName>
  gender: R4.PatientGenderKind
  birthDate: string

  telecom?: Array<R4.IContactPoint>
  address?: Array<R4.IAddress>
  contact?: Array<R4.IPatient_Contact>
  communication?: Array<R4.IPatient_Communication>

  [key: string]: unknown
}

export const getBaseV1ContextEntries = () => {
  const personEV1ContextEntry = createContextEntry<PersonEV1Mixin>({
    type: 'PersonE',
    typeIdBase: 'bloomSchema',
    fields: {},
    vocab: 'schema',
  })

  const organizationEV1ContextEntry = createContextEntry<OrganizationEV1Mixin>({
    type: 'OrganizationE',
    typeIdBase: 'bloomSchema',
    fields: {
      hasCredential: 'schema',
      industry: 'bloomSchema',
      identifiers: 'bloomSchema',
    },
    vocab: 'schema',
  })

  const credentialEntry = createContextEntry<CredentialV1Mixin>({
    type: 'Credential',
    typeIdBase: 'bloomSchema',
    fields: {
      dateRevoked: 'bloomSchema',
      recognizedBy: 'bloomSchema',
    },
    vocab: 'schema',
  })

  const organizationalCredentialEntry = createContextEntry<OrganizationalCredentialV1Mixin>({
    type: 'OrganizationalCredential',
    typeIdBase: 'bloomSchema',
    fields: {
      credentialCategory: 'bloomSchema',
      organizationType: 'bloomSchema',
      goodStanding: 'bloomSchema',
      active: 'bloomSchema',
      primaryJurisdiction: 'bloomSchema',
      identifier: 'schema',
    },
    vocab: 'schema',
  })

  const monetaryAmountRV1ContextEntry = createContextEntry<MonetaryAmountRV1Mixin>({
    type: 'MonetaryAmount',
    typeIdBase: 'bloomSchema',
    fields: {
      currency: 'bloomSchema',
      value: 'bloomSchema',
      availableValue: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return [personEV1ContextEntry, organizationEV1ContextEntry, credentialEntry, organizationalCredentialEntry, monetaryAmountRV1ContextEntry]
}

export const getFHIRV1ContextEntries = () => {
  const patientEntry = createContextEntry<FHIRPatientE, R4.IPatient>({
    type: 'Patient',
    typeIdBase: 'fhir',
    fields: {
      resourceType: 'fhir',
      identifier: 'fhir',
      active: 'fhir',
      name: 'fhir',
      gender: 'fhir',
      birthDate: 'fhir',
      telecom: 'fhir',
      address: 'fhir',
      contact: 'fhir',
      communication: 'fhir',
    },
    vocab: 'fhir',
  })

  return [patientEntry]
}
