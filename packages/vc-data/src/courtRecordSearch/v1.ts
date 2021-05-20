import { PersonEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
  CreateExpandedThing,
} from '../util'

// Helper Types

export type CourtRecordSearchQueryV1 = CreateThing<
  'CourtRecordSearchQuery',
  {
    parent?: PersonEV1
    spouse?: PersonEV1
    birthDate?: string
    address: CreateExpandedThing<'PostalAddress'> | string
    addressStatus: 'current' | 'permanent' | 'past'
  }
>

export type CourtRecordSearchV1 = CreateThing<
  'CourtRecordSearch',
  {
    result: 'pass' | 'fail'
    query: CourtRecordSearchQueryV1
  }
>

const getHelperContextEntries = () => {
  const courtRecordSearchQueryEntry = createContextEntry<CourtRecordSearchQueryV1>({
    type: 'CourtRecordSearchQuery',
    typeIdBase: 'bloomSchema',
    fields: {
      parent: 'schema',
      birthDate: 'schema',
      spouse: 'schema',
      address: 'schema',
      addressStatus: 'bloomSchema',
    },
  })

  const courtRecordSearchEntry = createContextEntry<CourtRecordSearchV1>({
    type: 'CourtRecordSearch',
    typeIdBase: 'bloomSchema',
    fields: {
      result: 'bloomSchema',
      query: 'bloomSchema',
    },
  })

  return [courtRecordSearchEntry, courtRecordSearchQueryEntry]
}

// Person Related

type CourtRecordSearchPersonV1Mixin = CreateThing<
  'CourtRecordSearchPerson',
  {
    hasCourtRecordSearch: CourtRecordSearchV1
  }
>

export type CourtRecordSearchPersonV1 = ExtendThing<CourtRecordSearchPersonV1Mixin, PersonEV1>

export type VCSCourtRecordSearchPersonV1 = ExtendableVCSubject<ExpandThing<CourtRecordSearchPersonV1>>

export type VCCourtRecordSearchPersonV1 = ExtendableVC<VCSCourtRecordSearchPersonV1, 'CourtRecordSearchCredentialPersonV1'>

export const getVCCourtRecordSearchPersonV1Context = () => {
  const courtRecordSearchPersonEntry = createContextEntry<CourtRecordSearchPersonV1Mixin, PersonEV1>({
    type: 'CourtRecordSearchPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasCourtRecordSearch: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCCourtRecordSearchPersonV1>({
    type: 'CourtRecordSearchCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [courtRecordSearchPersonEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
