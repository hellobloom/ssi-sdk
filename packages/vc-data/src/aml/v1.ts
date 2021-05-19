import { GovernmentOrgV1, PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  OneOrMore,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
} from '../util'

// Helper Types

export type AMLListV1 = CreateThing<
  'AMLList',
  {
    name?: string
    url?: string
  }
>

export type AMLHitV1 = CreateThing<
  'AMLHit',
  {
    identifier?: string
    name?: string
  }
>

export type AMLSearchV1 = CreateThing<
  'AMLSearch',
  {
    hitLocation?: string | ExpandThing<GovernmentOrgV1>
    hitNumber?: number
    lists?: Array<AMLListV1>
    recordId?: OneOrMore<string>
    identifier?: string
    score?: string | number
    hits?: Array<AMLHitV1>
    flagType?: string
    comment?: string
  }
>

const getHelperContextEntries = () => {
  const amlListEntry = createContextEntry<AMLListV1>({
    type: 'AMLList',
    typeIdBase: 'bloomSchema',
    fields: {
      name: 'schema',
      url: 'schema',
    },
  })

  const amlHitEntry = createContextEntry<AMLHitV1>({
    type: 'AMLHit',
    typeIdBase: 'bloomSchema',
    fields: {
      identifier: 'bloomSchema',
      name: 'bloomSchema',
    },
  })

  const amlSearchEntry = createContextEntry<AMLSearchV1>({
    type: 'AMLSearch',
    typeIdBase: 'bloomSchema',
    fields: {
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

// Person Related

type AMLPersonV1Mixin = CreateThing<
  'AMLPerson',
  {
    hasAMLSearch: AMLSearchV1
  }
>

export type AMLPersonV1 = ExtendThing<AMLPersonV1Mixin, PersonEV1>

export type VCSAMLPersonV1 = ExtendableVCSubject<ExpandThing<AMLPersonV1>>

export type VCAMLPersonV1 = ExtendableVC<VCSAMLPersonV1, 'AMLCredentialPersonV1'>

export const getVCAMLPersonV1Context = () => {
  const amlPersonEntry = createContextEntry<AMLPersonV1Mixin, PersonEV1>({
    type: 'AMLPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasAMLSearch: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAMLPersonV1>({
    type: 'AMLCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [amlPersonEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type AMLOrganizationV1Mixin = CreateThing<
  'AMLOrganization',
  {
    hasAMLSearch: AMLSearchV1
  }
>

export type AMLOrganizationV1 = ExtendThing<AMLOrganizationV1Mixin, OrganizationEV1>

export type VCSAMLOrganizationV1 = ExtendableVCSubject<ExpandThing<AMLOrganizationV1>>

export type VCAMLOrganizationV1 = ExtendableVC<VCSAMLOrganizationV1, 'AMLCredentialOrganizationV1'>

export const getVCAMLOrganizationV1Context = () => {
  const amlOrganizationEntry = createContextEntry<AMLOrganizationV1Mixin, OrganizationEV1>({
    type: 'AMLOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      hasAMLSearch: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAMLOrganizationV1>({
    type: 'AMLCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [amlOrganizationEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
