import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
  CreateExpandedThing,
} from '../util/v1'

// Person Related

// Directly from schema.org
// If you are NOT exhaustively listing every possible field, use expanded thing
type EducationalOcupationalCredential = CreateExpandedThing<
  'EducationalOcupationalCredential',
  {
    credentialCategory?: string | CreateExpandedThing<'DefinedTerm', { name: string }>
    educationalLevel?: string | CreateExpandedThing<'DefinedTerm', { name: string }>
    recognizedBy?: ExpandThing<OrganizationEV1>
    competencyRequired?: string | CreateExpandedThing<'DefinedTerm', { name: string }>
    validFor?: string // string ISO 8601 duration format
    validIn?: CreateExpandedThing<'AdministrativeArea'> // Leaving 2nd arg blank because we are not defining the typescript types at the moment
    dateCreated?: string // string ISO 8601 date format
  }
>

type EducationPersonV1Mixin = CreateThing<
  'EducationPerson',
  {
    hasCredential: EducationalOcupationalCredential
  }
>

export type EducationPersonV1 = ExtendThing<EducationPersonV1Mixin, PersonEV1>

export type VCSEducationPersonV1 = ExtendableVCSubject<ExpandThing<EducationPersonV1>>

export type VCEducationPersonV1 = ExtendableVC<VCSEducationPersonV1, 'EducationCredentialPersonV1'>

export const getVCEducationPersonV1Context = () => {
  const educationPersonEntry = createContextEntry<EducationPersonV1Mixin, PersonEV1>({
    type: 'EducationPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasCredential: 'schema',
    },
    vocab: 'schema', // vocab fills in the context for all the places we used 'expand thing' and didn't list out all the possible fields
  })

  return createVCContextEntry<VCEducationPersonV1>({
    type: 'EducationCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [educationPersonEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
