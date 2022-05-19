import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'
import { PostalAddressV2, postalAddressV2Context, PropertyValueV2, propertyValueV2Context } from '../base/v2'

export type PossibleMatchVals = 'match' | 'partial_match' | 'no_match' | 'no_data' | 'no_input'
export type PossibleCheckVals = 'success' | 'failure' | 'not_checked'

export type AddressCheckV2 = {
  '@type': 'AddressCheck'
  status: 'match' | 'partial_match' | 'no_match' | 'no_data' | 'no_input'
  postOfficeBox?: 'yes' | 'no' | 'no_data'
  type?: 'residential' | 'commercial' | 'no_data'
}

export type IdentityCheckV2 = {
  '@type': 'IdentityCheck'
  status?: PossibleCheckVals
  createdAt?: string
  completedAt?: string

  // General checks
  riskCheck?: PossibleCheckVals
  selfieCheck?: PossibleCheckVals

  // Individually validated attributes
  addressCheck?: AddressCheckV2
  nameCheck?: PossibleMatchVals
  birthDateCheck?: PossibleMatchVals
  identifierCheck?: PossibleMatchVals
  phoneCheck?: PossibleMatchVals

  // Active SMS verification, as opposed to passive database lookup
  smsCheck?: PossibleCheckVals
}

const getHelperContextEntries = () => {
  return [
    // IdentityCheck
    createSubjectContext<IdentityCheckV2>({
      type: 'IdentityCheck',
      base: 'bloomSchema',
      properties: {
        status: 'bloomSchema',
        createdAt: 'bloomSchema',
        completedAt: 'bloomSchema',
        riskCheck: 'bloomSchema',
        selfieCheck: 'bloomSchema',
        addressCheck: 'bloomSchema',
        nameCheck: 'bloomSchema',
        birthDateCheck: 'bloomSchema',
        identifierCheck: 'bloomSchema',
        phoneCheck: 'bloomSchema',
        smsCheck: 'bloomSchema',
      },
    }),

    // AddressCheck
    createSubjectContext<AddressCheckV2>({
      type: 'AddressCheck',
      base: 'bloomSchema',
      properties: {
        status: 'bloomSchema',
        postOfficeBox: 'bloomSchema',
        type: 'bloomSchema',
      },
    }),
  ]
}

// Person-related

export type IdentityPersonV2 = {
  '@type': 'IdentityPerson'
  additionalName?: string
  birthDate?: string
  email?: string
  familyName?: string
  gender?: string
  givenName?: string
  name?: string
  nationality?: string

  address?: OneOrMore<PostalAddressV2>
  hasIdentityCheck?: OneOrMore<IdentityCheckV2>
  identifier?: OneOrMore<PropertyValueV2>
}

export type VCIdentityPersonV2Type = 'IdentityCredentialPersonV2'

export const getVCIdentityPersonV2ContextConfig = () => {
  const identityPersonContext = createSubjectContext<IdentityPersonV2>({
    type: 'IdentityPerson',
    base: 'bloomSchema',
    properties: {
      additionalName: 'schema',
      birthDate: 'schema',
      email: 'schema',
      familyName: 'schema',
      gender: 'schema',
      givenName: 'schema',
      name: 'schema',
      nationality: 'schema',

      address: 'schema',
      hasIdentityCheck: 'bloomSchema',
      identifier: 'bloomSchema',
    },
  })

  return createContextConfig<VCIdentityPersonV2Type>({
    type: 'IdentityCredentialPersonV2',
    subjects: [identityPersonContext, postalAddressV2Context, propertyValueV2Context].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCIdentityPersonV2 = CreateVCType<[VCIdentityPersonV2Type], IdentityPersonV2>

export const getVCIdentityPersonV2Context = () => {
  return createContext(getVCIdentityPersonV2ContextConfig())
}
