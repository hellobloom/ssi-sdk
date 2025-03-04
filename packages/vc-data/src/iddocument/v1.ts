import { PersonEV1, getBaseV1ContextEntries, GovernmentOrgV1 } from '../base'

import {
  CreateThing,
  CreateExpandedThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  OneOrMore,
  createContextEntry,
  createVCContextEntry,
} from '../util/v1'

import { PossibleCheckVals, PossibleMatchVals } from '../base/v2'

// Helper Types

export type TDocumentClassV1 =
  | 'unknown'
  | 'passport'
  | 'visa'
  | 'drivers_license'
  | 'identification_card'
  | 'permit'
  | 'currency'
  | 'residence_document'
  | 'travel_document'
  | 'birth_certificate'
  | 'vehicle_registration'
  | 'other'
  | 'weapon_license'
  | 'tribal_identification'
  | 'voter_identification'
  | 'military'

export type AddressCheckV1 = CreateThing<
  'AddressCheck',
  {
    '@type': 'AddressCheck'
    status: PossibleMatchVals
    postOfficeBox?: 'yes' | 'no' | 'no_data'
    type?: 'residential' | 'commercial' | 'no_data'
  }
>

export type IdentityCheckV1 = CreateThing<
  'IdentityCheck',
  {
    '@type': 'IdentityCheck'
    status?: PossibleCheckVals
    createdAt?: string
    completedAt?: string

    // General checks
    riskCheck?: PossibleCheckVals
    selfieCheck?: PossibleCheckVals

    // Individually validated attributes
    addressCheck?: AddressCheckV1
    nameCheck?: PossibleMatchVals
    birthDateCheck?: PossibleMatchVals
    identifierCheck?: PossibleMatchVals
    phoneCheck?: PossibleMatchVals

    // Active SMS verification, as opposed to passive database lookup
    smsCheck?: PossibleCheckVals
  }
>

type IDDocumentV1Mixin = CreateThing<
  'IDDocument',
  {
    identifier?: string
    issuer: ExpandThing<GovernmentOrgV1>
    documentType?: string
    issueDate?: string
    issueType?: string
    expirationDate?: string
    classificationMethod?: 'automatic' | 'manual'
    idClass: TDocumentClassV1
    idClassName?: string
    countryCode?: string
    frontImage?: string
    backImage?: string
    generic?: boolean
    keesingCode?: string
  }
>

export type IDDocumentV1 = ExtendThing<IDDocumentV1Mixin, CreateThing<'CreativeWork'>>

export type IDDocumentFaceMatchV1 = CreateThing<
  'IDDocumentFaceMatch',
  {
    isMatch?: boolean
    score?: number
    identifier?: number
  }
>

type IDDocumentRoleV1Mixin = CreateThing<
  'IDDocumentRole',
  {
    authenticationResult?: string
    tamperResult?: string
    selfieImage?: string
    faceMatch?: OneOrMore<ExpandThing<IDDocumentFaceMatchV1>>
    hasIDDocument: OneOrMore<ExpandThing<IDDocumentV1>>
  }
>

export type IDDocumentRoleV1 = ExtendThing<IDDocumentRoleV1Mixin, CreateThing<'Role'>>

const getHelperEntries = () => {
  const idDocumentEntry = createContextEntry<IDDocumentV1Mixin>({
    type: 'IDDocument',
    typeIdBase: 'bloomSchema',
    fields: {
      identifier: 'bloomSchema',
      issuer: 'bloomSchema',
      documentType: 'bloomSchema',
      issueDate: 'bloomSchema',
      issueType: 'bloomSchema',
      expirationDate: 'bloomSchema',
      classificationMethod: 'bloomSchema',
      idClass: 'bloomSchema',
      idClassName: 'bloomSchema',
      countryCode: 'bloomSchema',
      frontImage: 'bloomSchema',
      backImage: 'bloomSchema',
      generic: 'bloomSchema',
      keesingCode: 'bloomSchema',
    },
  })

  const idDocumentFaceMatchEntry = createContextEntry<IDDocumentFaceMatchV1>({
    type: 'IDDocumentFaceMatch',
    typeIdBase: 'bloomSchema',
    fields: {
      isMatch: 'bloomSchema',
      score: 'bloomSchema',
      identifier: 'schema',
    },
  })

  const idDocumentRoleEntry = createContextEntry<IDDocumentRoleV1Mixin>({
    type: 'IDDocumentRole',
    typeIdBase: 'bloomSchema',
    fields: {
      authenticationResult: 'bloomSchema',
      tamperResult: 'bloomSchema',
      selfieImage: 'bloomSchema',
      faceMatch: 'bloomSchema',
      hasIDDocument: 'bloomSchema',
    },
  })

  return [idDocumentEntry, idDocumentFaceMatchEntry, idDocumentRoleEntry]
}

// Person Related

type IDDocumentPersonV1Mixin = CreateThing<
  'IDDocumentPerson',
  {
    hasIdentityCheck: OneOrMore<ExpandThing<IdentityCheckV1>>
    hasIDDocument: OneOrMore<ExpandThing<IDDocumentRoleV1>>
    address?: OneOrMore<CreateExpandedThing<'PostalAddress'>>
  }
>

export type IDDocumentPersonV1 = ExtendThing<IDDocumentPersonV1Mixin, PersonEV1>

export type VCSIDDocumentPersonV1 = ExtendableVCSubject<ExpandThing<IDDocumentPersonV1>>

export type VCIDDocumentPersonV1 = ExtendableVC<VCSIDDocumentPersonV1, 'IDDocumentCredentialPersonV1'>

export const getVCIDDocumentPersonV1Context = () => {
  const idDocumentPersonEntry = createContextEntry<IDDocumentPersonV1Mixin, PersonEV1>({
    type: 'IDDocumentPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasIdentityCheck: 'bloomSchema',
      hasIDDocument: 'bloomSchema',
      address: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCIDDocumentPersonV1>({
    type: 'IDDocumentCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [idDocumentPersonEntry, ...getHelperEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
