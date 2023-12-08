import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'
import {
  // OrganizationV2,
  // organizationV2Context,
  PostalAddressV2,
  postalAddressV2Context,
  OrganizationV2,
  organizationV2Context,
  PropertyValueV2,
  propertyValueV2Context,
} from '../base/v2'

// Helper Types

export type AccreditationV2 = {
  '@type': 'Accreditation'
  accreditationType?: OneOrMore<string>
  accreditationCriteria?: OneOrMore<string>
  accreditationReason?: OneOrMore<string>
  accreditor?: OneOrMore<OrganizationV2>
  createdAt?: string
  expiresAt?: string
  url?: string
}

const getHelperContextEntries = () => {
  const accreditationEntry = createSubjectContext<AccreditationV2>({
    type: 'Accreditation',
    base: 'bloomSchema',
    properties: {
      accreditationType: 'bloomSchema',
      accreditationCriteria: 'bloomSchema',
      accreditationReason: 'bloomSchema',
      accreditor: 'bloomSchema',
      createdAt: 'bloomSchema',
      expiresAt: 'bloomSchema',
      url: 'schema',
    },
  })

  return [accreditationEntry]
}

// Person-related

export type AccreditationPersonV2 = {
  '@type': 'AccreditationPerson'
  identifier?: string | OneOrMore<PropertyValueV2>
  nationality?: string
  hasAccreditation: OneOrMore<AccreditationV2>

  address?: OneOrMore<PostalAddressV2>

  email?: string
  birthDate?: string
  name?: string
  givenName?: string
  additionalName?: string
  familyName?: string
}

export type VCAccreditationPersonV2Type = 'AccreditationCredentialPersonV2'

export const getVCAccreditationPersonV2ContextConfig = () => {
  const accreditationPersonContext = createSubjectContext<AccreditationPersonV2>({
    type: 'AccreditationPerson',
    base: 'bloomSchema',
    properties: {
      identifier: 'schema',
      nationality: 'schema',
      hasAccreditation: 'bloomSchema',

      address: 'schema',
      birthDate: 'schema',
      email: 'schema',
      name: 'schema',
      givenName: 'schema',
      additionalName: 'schema',
      familyName: 'schema',
    },
  })

  return createContextConfig<VCAccreditationPersonV2Type>({
    type: 'AccreditationCredentialPersonV2',
    subjects: [accreditationPersonContext, postalAddressV2Context, propertyValueV2Context, organizationV2Context].concat(
      getHelperContextEntries(),
    ),
  })
}

// Export a pre-built VC type and context for easier use

export type VCAccreditationPersonV2 = CreateVCType<[VCAccreditationPersonV2Type], AccreditationPersonV2>

export const getVCAccreditationPersonV2Context = () => {
  return createContext(getVCAccreditationPersonV2ContextConfig())
}
