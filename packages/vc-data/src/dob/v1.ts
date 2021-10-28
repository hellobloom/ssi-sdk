import { PersonEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
} from '../util/v1'

// Person Related

type DOBPersonV1Mixin = CreateThing<
  'DOBPerson',
  {
    birthDate: string
  }
>

export type DOBPersonV1 = ExtendThing<DOBPersonV1Mixin, PersonEV1>

export type VCSDOBPersonV1 = ExtendableVCSubject<ExpandThing<DOBPersonV1>>

export type VCDOBPersonV1 = ExtendableVC<VCSDOBPersonV1, 'DOBCredentialPersonV1'>

export const getVCDOBPersonV1Context = () => {
  const dobPersonEntry = createContextEntry<DOBPersonV1Mixin, PersonEV1>({
    type: 'DOBPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      birthDate: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCDOBPersonV1>({
    type: 'DOBCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [dobPersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
