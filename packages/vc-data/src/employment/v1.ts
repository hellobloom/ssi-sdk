import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries, MonetaryAmountRV1 } from '../base'
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

// Person Related

export type SalaryV1 = CreateThing<
  'Salary',
  {
    gross: ExpandThing<MonetaryAmountRV1>
    net: ExpandThing<MonetaryAmountRV1>
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Hourly' | 'Annual'
  }
>

type PersonEmployeeRoleEV1Mixin = CreateThing<
  'PersonEmployeeRoleE',
  {
    reference?: OneOrMore<CreateExpandedThing<'ContactPoint'>>
    skills?: OneOrMore<CreateExpandedThing<'DefinedTerm'> | string>
    worksFor: ExpandThing<OrganizationEV1>
    offerLetter?: CreateExpandedThing<'URL'> | string
    experienceLetter?: CreateExpandedThing<'URL'> | string
    salary?: SalaryV1
  }
>

export type PersonEmployeeRoleEV1 = ExtendThing<PersonEmployeeRoleEV1Mixin, CreateThing<'EmployeeRole'>>

type EmploymentPersonV1Mixin = CreateThing<
  'EmploymentPerson',
  {
    worksFor: OneOrMore<PersonEmployeeRoleEV1>
  }
>

export type EmploymentPersonV1 = ExtendThing<EmploymentPersonV1Mixin, PersonEV1>

export type VCSEmploymentPersonV1 = ExtendableVCSubject<ExpandThing<EmploymentPersonV1>>

export type VCEmploymentPersonV1 = ExtendableVC<VCSEmploymentPersonV1, 'EmploymentCredentialPersonV1'>

export const getVCEmploymentPersonV1Context = () => {
  const employmentPersonEntry = createContextEntry<EmploymentPersonV1Mixin, PersonEV1>({
    type: 'EmploymentPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      worksFor: 'schema',
    },
    vocab: 'schema',
  })

  const personEmployeeRole = createContextEntry<PersonEmployeeRoleEV1Mixin>({
    type: 'PersonEmployeeRoleE',
    typeIdBase: 'bloomSchema',
    fields: {
      reference: 'bloomSchema',
      skills: 'bloomSchema',
      worksFor: 'schema',
      offerLetter: 'bloomSchema',
      experienceLetter: 'bloomSchema',
      salary: 'bloomSchema',
    },
    vocab: 'schema',
  })

  const salary = createContextEntry<SalaryV1>({
    type: 'Salary',
    typeIdBase: 'bloomSchema',
    fields: {
      gross: 'bloomSchema',
      net: 'bloomSchema',
      frequency: 'bloomSchema',
    },
  })

  return createVCContextEntry<VCEmploymentPersonV1>({
    type: 'EmploymentCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [employmentPersonEntry, personEmployeeRole, salary, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type OrganizationEmployeeRoleV1Mixin = CreateThing<
  'OrganizationEmployeeRole',
  {
    member: ExpandThing<PersonEV1>
  }
>

export type OrganizationEmployeeRoleEV1 = ExtendThing<OrganizationEmployeeRoleV1Mixin, CreateThing<'EmployeeRole'>>

type EmploymentOrganizationV1Mixin = CreateThing<
  'EmploymentOrganization',
  {
    member: OneOrMore<ExpandThing<OrganizationEmployeeRoleEV1>>
  }
>

export type EmploymentOrganizationV1 = ExtendThing<EmploymentOrganizationV1Mixin, OrganizationEV1>

export type VCSEmploymentOrganizationV1 = ExtendableVCSubject<ExpandThing<EmploymentOrganizationV1>>

export type VCEmploymentOrganizationV1 = ExtendableVC<VCSEmploymentOrganizationV1, 'EmploymentCredentialOrganizationV1'>

export const getVCEmploymentOrganizationV1Context = () => {
  const employmentOrganizationEntry = createContextEntry<EmploymentOrganizationV1Mixin, OrganizationEV1>({
    type: 'EmploymentOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      member: 'schema',
    },
    vocab: 'schema',
  })

  const organizationEmployeeRole = createContextEntry<OrganizationEmployeeRoleV1Mixin>({
    type: 'OrganizationEmployeeRole',
    typeIdBase: 'bloomSchema',
    fields: {
      member: 'schema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCEmploymentOrganizationV1>({
    type: 'EmploymentCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [employmentOrganizationEntry, organizationEmployeeRole, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
