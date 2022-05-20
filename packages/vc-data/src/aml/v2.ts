import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'
import { OrganizationV2, organizationV2Context, PropertyValueV2, propertyValueV2Context } from '../base/v2'

// Helper Types

export type AMLHitCriteriaV2 = {
  '@type': 'AMLHitCriteria'

  identifier?: string

  matchDegree?: string | number

  dateOfBirth?: string

  documentType?: string
  documentIdentifier?: string

  location?: string
  countryCode?: string

  name?: string
  primaryName?: boolean

  lowQualityNameMatch?: boolean
}

export type AMLListV2 = {
  '@type': 'AMLList'
  name?: string
  identifier?: string
  author?: OneOrMore<OrganizationV2>
  url?: string
}

export type AMLHitV2 = {
  '@type': 'AMLHit'
  identifier?: string
  name?: string
  hasCriteria?: OneOrMore<AMLHitCriteriaV2>
}

export type AMLSearchV2 = {
  '@type': 'AMLSearch'
  hitLocation?: string
  hitNumber?: number
  lists?: AMLListV2[]
  recordId?: OneOrMore<string>
  identifier?: string
  score?: string | number
  hits?: AMLHitV2[]
  flagType?: string
  comment?: string
}

const getHelperContextEntries = () => {
  const amlListEntry = createSubjectContext<AMLListV2>({
    type: 'AMLList',
    base: 'bloomSchema',
    properties: {
      name: 'bloomSchema',
      identifier: 'bloomSchema',
      author: 'bloomSchema',
      url: 'bloomSchema',
    },
  })

  const amlHitEntry = createSubjectContext<AMLHitV2>({
    type: 'AMLHit',
    base: 'bloomSchema',
    properties: {
      identifier: 'bloomSchema',
      name: 'bloomSchema',
      hasCriteria: 'bloomSchema',
    },
  })

  const amlHitCriteria = createSubjectContext<AMLHitCriteriaV2>({
    type: 'AMLHitCriteria',
    base: 'bloomSchema',
    properties: {
      identifier: 'bloomSchema',
      matchDegree: 'bloomSchema',
      dateOfBirth: 'bloomSchema',
      documentType: 'bloomSchema',
      documentIdentifier: 'bloomSchema',
      location: 'bloomSchema',
      countryCode: 'bloomSchema',
      name: 'bloomSchema',
      primaryName: 'bloomSchema',
      lowQualityNameMatch: 'bloomSchema',
    },
  })

  const amlSearchEntry = createSubjectContext<AMLSearchV2>({
    type: 'AMLSearch',
    base: 'bloomSchema',
    properties: {
      hitLocation: 'bloomSchema',
      hitNumber: 'bloomSchema',
      lists: 'bloomSchema',
      recordId: 'bloomSchema',
      identifier: 'bloomSchema',
      score: 'bloomSchema',
      hits: 'bloomSchema',
      flagType: 'bloomSchema',
      comment: 'bloomSchema',
    },
  })

  return [amlListEntry, amlHitEntry, amlHitCriteria, amlSearchEntry]
}

// Person-related

export type AMLPersonV2 = {
  '@type': 'AMLPerson'
  hasAMLSearch: OneOrMore<AMLSearchV2>
  identifier?: OneOrMore<PropertyValueV2>
  nationality?: string
}

export type VCAMLPersonV2Type = 'AMLCredentialPersonV2'

export const getVCAMLPersonV2ContextConfig = () => {
  const amlPersonContext = createSubjectContext<AMLPersonV2>({
    type: 'AMLPerson',
    base: 'bloomSchema',
    properties: {
      identifier: 'schema',
      nationality: 'schema',
      hasAMLSearch: 'bloomSchema',
    },
  })

  return createContextConfig<VCAMLPersonV2Type>({
    type: 'AMLCredentialPersonV2',
    subjects: [amlPersonContext, organizationV2Context, propertyValueV2Context].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCAMLPersonV2 = CreateVCType<[VCAMLPersonV2Type], AMLPersonV2>

export const getVCAMLPersonV2Context = () => {
  return createContext(getVCAMLPersonV2ContextConfig())
}
