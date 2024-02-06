import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'
import {
  PostalAddressV2,
  postalAddressV2Context,
  PropertyValueV2,
  propertyValueV2Context,
  addressCheckV2Context, // i believe required with identityCheckV2Context
  IdentityCheckV2,
  identityCheckV2Context,
} from '../base/v2'

const getHelperContextEntries = () => {
  return [identityCheckV2Context, addressCheckV2Context]
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
      identifier: 'schema',
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
