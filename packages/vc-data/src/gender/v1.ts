import { PersonEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
  OneOrMore,
  CreateExpandedThing,
} from '../util'

// Person Related

type GenderPersonV1Mixin = CreateThing<
  'GenderPerson',
  {
    gender: OneOrMore<CreateExpandedThing<'GenderType'> | string>
  }
>

export type GenderPersonV1 = ExtendThing<GenderPersonV1Mixin, PersonEV1>

export type VCSGenderPersonV1 = ExtendableVCSubject<ExpandThing<GenderPersonV1>>

export type VCGenderPersonV1 = ExtendableVC<VCSGenderPersonV1, 'GenderCredentialPersonV1'>

export const getVCGenderPersonV1Context = () => {
  const genderPersonEntry = createContextEntry<GenderPersonV1Mixin, PersonEV1>({
    type: 'GenderPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      gender: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCGenderPersonV1>({
    type: 'GenderCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [genderPersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
