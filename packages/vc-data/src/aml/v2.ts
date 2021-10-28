import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'

// Helper Types

export type AMLListV2 = {
  '@type': 'AMLList'
  name?: string
  url?: string
}

export type AMLHitV2 = {
  '@type': 'AMLHit'
  identifier?: string
  name?: string
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
      name: 'schema',
      url: 'schema',
    },
  })

  const amlHitEntry = createSubjectContext<AMLHitV2>({
    type: 'AMLHit',
    base: 'bloomSchema',
    properties: {
      identifier: 'bloomSchema',
      name: 'bloomSchema',
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

  return [amlListEntry, amlHitEntry, amlSearchEntry]
}

// Person Realated

export type AMLPersonV2 = {
  '@type': 'AMLPerson'
  hasAMLSearch: OneOrMore<AMLSearchV2>
}

export type VCAMLPersonV2Type = 'AMLCredentialPersonV2'

export const getVCAMLPersonV2ContextConfig = () => {
  const amlPersonContext = createSubjectContext<AMLPersonV2>({
    type: 'AMLPerson',
    base: 'bloomSchema',
    properties: { hasAMLSearch: 'bloomSchema' },
  })

  return createContextConfig<VCAMLPersonV2Type>({
    type: 'AMLCredentialPersonV2',
    subjects: [amlPersonContext].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCAMLPersonV2 = CreateVCType<[VCAMLPersonV2Type], AMLPersonV2>

export const getVCAMLPersonV2Context = () => {
  return createContext(getVCAMLPersonV2ContextConfig())
}
