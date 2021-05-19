import { PersonEV1, getBaseV1ContextEntries } from '../base'
import { PersonEmployeeRoleEV1 } from '../employment'
import {
  CreateThing,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  OneOrMore,
  createContextEntry,
  createVCContextEntry,
  CreateExpandedThing,
} from '../util'

type EmploymentInterviewV1 = CreateThing<
  'EmploymentInterview', // becomes @type
  {
    interviewer: OneOrMore<CreateExpandedThing<'ContactPoint'>>
    date: string
    location: CreateExpandedThing<'PostalAddress'>
  }
>

type PersonEmployeeCandidateRoleEV1Mixin = CreateThing<
  'PersonEmployeeCandidateRoleE',
  {
    expectedStartDate?: string
    offerDate: string
    interview: OneOrMore<EmploymentInterviewV1>
  }
>

export type PersonEmployeeCandidateRoleEV1 = ExtendThing<PersonEmployeeCandidateRoleEV1Mixin, PersonEmployeeRoleEV1>

type EmploymentOfferPersonV1Mixin = CreateThing<
  'EmploymentOfferPerson',
  {
    worksFor: OneOrMore<PersonEmployeeCandidateRoleEV1>
  }
>

export type EmploymentOfferPersonV1 = ExtendThing<EmploymentOfferPersonV1Mixin, PersonEV1>

export type VCSEmploymentOfferPersonV1 = ExtendableVCSubject<ExpandThing<EmploymentOfferPersonV1>>

export type VCEmploymentOfferPersonV1 = ExtendableVC<VCSEmploymentOfferPersonV1, 'EmploymentOfferCredentialPersonV1'>

export const getVCEmploymentOfferPersonV1Context = () => {
  const employmentOfferPersonEntry = createContextEntry<EmploymentOfferPersonV1Mixin, PersonEV1>({
    type: 'EmploymentOfferPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      worksFor: 'schema',
    },
    vocab: 'schema',
  })

  const personEmployeeCandidateRole = createContextEntry<PersonEmployeeCandidateRoleEV1Mixin>({
    type: 'PersonEmployeeCandidateRoleE',
    typeIdBase: 'bloomSchema',
    fields: {
      expectedStartDate: 'bloomSchema',
      offerDate: 'schema',
      interview: 'bloomSchema',
    },
    vocab: 'schema',
  })

  const employmentInterviewV1 = createContextEntry<EmploymentInterviewV1>({
    type: 'EmploymentInterview',
    typeIdBase: 'bloomSchema',
    fields: {
      interviewer: 'bloomSchema',
      date: 'schema',
      location: 'schema',
    },
  })

  return createVCContextEntry<VCEmploymentOfferPersonV1>({
    type: 'EmploymentOfferCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [employmentOfferPersonEntry, personEmployeeCandidateRole, employmentInterviewV1, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
