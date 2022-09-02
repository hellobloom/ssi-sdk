import { OneOrMore, CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import {
  MonetaryAmountV2,
  OrganizationV2,
  GovernmentOrgV2,
  monetaryAmountV2Context,
  postalAddressV2Context,
  governmentOrgContexts,
} from '../base/v2'

// Helper Types

export type MonetaryFlowV2 = {
  '@type': 'MonetaryFlow'
  cashflowCategory?: string
  cashflowSubcategory?: string
  startDate?: string
  endDate?: string
  valueTotal?: OneOrMore<MonetaryAmountV2>
  valueAnnualMean?: OneOrMore<MonetaryAmountV2>
  reportingSource?: 'payroll' | 'tax_form' | 'bank'
}

export type IncomeOrganizationV2 = Omit<OrganizationV2, '@type'> & {
  '@type': 'IncomeOrganization'
  name: string
  nationality?: GovernmentOrgV2
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
      valueAnnualMean: 'bloomSchema',
      cashflowCategory: 'bloomSchema',
      cashflowSubcategory: 'bloomSchema',
      startDate: 'schema',
      endDate: 'schema',
      valueTotal: 'bloomSchema',
      reportingSource: 'bloomSchema',
    },
  })

  return [monetaryFlowEntry, incomeOrganizationEntry, monetaryAmountV2Context, postalAddressV2Context, ...governmentOrgContexts]
}

// Person Related

export type IncomePersonV2 = {
  '@type': 'IncomePerson'
  hasIncome?: OneOrMore<MonetaryFlowV2>
  hasTotalIncome?: OneOrMore<MonetaryFlowV2>
}

export type VCIncomePersonV2Type = 'IncomeCredentialPersonV2'

export const getVCIncomePersonV2ContextConfig = () => {
  const accountPersonContext = createSubjectContext<IncomePersonV2>({
    type: 'IncomePerson',
    base: 'bloomSchema',
    properties: {
      hasIncome: 'bloomSchema',
      hasTotalIncome: 'bloomSchema',
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
