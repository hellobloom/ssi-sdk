import { OneOrMore, CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import {
  PostalAddressV2,
  MonetaryAmountV2,
  OrganizationV2,
  GovernmentOrgV2,
  monetaryAmountV2Context,
  postalAddressV2Context,
  governmentOrgContexts,
} from '../base/v2'

// Helper Types

export type IncomeOrganizationV2 = Omit<OrganizationV2, '@type'> & {
  '@type': 'IncomeOrganization'
  name: string
  nationality?: GovernmentOrgV2
}

export type MonetaryFlowV2 = {
  '@type': 'MonetaryFlow'
  identifier?: string
  cashflowCategory?: string
  cashflowSubcategory?: string
  cashflowSource?: OneOrMore<IncomeOrganizationV2>
  startDate?: string
  endDate?: string
  valueTotal?: OneOrMore<MonetaryAmountV2>
  valueAnnualMean?: OneOrMore<MonetaryAmountV2>
  valueAfterDeductionsAnnualMean?: OneOrMore<MonetaryAmountV2>
  valueAfterDeductionsTotal?: OneOrMore<MonetaryAmountV2>
  reportingSource?: 'payroll' | 'tax_form' | 'bank'
  frequency?: 'daily' | 'weekly' | 'biweekly' | 'semi_monthly' | 'monthly' | 'bimonthly' | 'unknown'
  transactionCount?: number
}

const getHelperContextEntries = () => {
  const incomeOrganizationEntry = createSubjectContext<IncomeOrganizationV2>({
    type: 'IncomeOrganization',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      nationality: 'bloomSchema',
    },
  })

  const monetaryFlowEntry = createSubjectContext<MonetaryFlowV2>({
    type: 'MonetaryFlow',
    base: 'bloomSchema',
    properties: {
      identifier: 'schema',
      cashflowCategory: 'bloomSchema',
      cashflowSubcategory: 'bloomSchema',
      cashflowSource: 'bloomSchema',
      startDate: 'schema',
      endDate: 'schema',
      valueTotal: 'bloomSchema',
      valueAnnualMean: 'bloomSchema',
      valueAfterDeductionsAnnualMean: 'bloomSchema',
      valueAfterDeductionsTotal: 'bloomSchema',
      reportingSource: 'bloomSchema',
      frequency: 'bloomSchema',
      transactionCount: 'bloomSchema',
    },
  })

  return [monetaryFlowEntry, incomeOrganizationEntry, monetaryAmountV2Context, postalAddressV2Context, ...governmentOrgContexts]
}

// Person Related

export type IncomePersonV2 = {
  '@type': 'IncomePerson'
  name?: string
  givenName?: string
  additionalName?: string
  familyName?: string
  address?: OneOrMore<PostalAddressV2>
  hasIncome?: OneOrMore<MonetaryFlowV2>
  hasTotalIncome?: OneOrMore<MonetaryFlowV2>
  employedBy?: OneOrMore<IncomeOrganizationV2>
}

export type VCIncomePersonV2Type = 'IncomeCredentialPersonV2'

export const getVCIncomePersonV2ContextConfig = () => {
  const accountPersonContext = createSubjectContext<IncomePersonV2>({
    type: 'IncomePerson',
    base: 'bloomSchema',
    properties: {
      hasIncome: 'bloomSchema',
      hasTotalIncome: 'bloomSchema',
      address: 'bloomSchema',
      name: 'bloomSchema',
      givenName: 'bloomSchema',
      additionalName: 'bloomSchema',
      familyName: 'bloomSchema',
      employedBy: 'bloomSchema',
    },
  })

  return createContextConfig<VCIncomePersonV2Type>({
    type: 'IncomeCredentialPersonV2',
    subjects: [accountPersonContext].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCIncomePersonV2 = CreateVCType<[VCIncomePersonV2Type], IncomePersonV2>

export const getVCIncomePersonV2Context = () => {
  return createContext(getVCIncomePersonV2ContextConfig())
}
