import { OneOrMore, CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import { MonetaryAmountV2, monetaryAmountV2Context } from '../base/v2'

// Helper Types

export type BankAccountTransactionGroupV2 = {
  '@type': 'BankAccountTransactionGroup'
  cashflowCategory?: string
  cashflowSubcategory?: string
  startDate?: string
  endDate?: string
  valueTotal?: OneOrMore<MonetaryAmountV2>
}

export type AccountOrganizationV2 = {
  '@type': 'AccountOrganization'
  name: string
}

export type AccountV2 = {
  '@type': 'Account'
  organization: AccountOrganizationV2
  accountType?: string
  identifier?: string | number
  description?: string
  name?: OneOrMore<string>
  hasIncome?: OneOrMore<BankAccountTransactionGroupV2>
  hasExpense?: OneOrMore<BankAccountTransactionGroupV2>
  hasValue?: MonetaryAmountV2
  verified?: boolean
}

const getHelperContextEntries = () => {
  const accountEntry = createSubjectContext<AccountV2>({
    type: 'Account',
    base: 'bloomSchema',
    properties: {
      organization: 'schema',
      identifier: 'schema',
      description: 'schema',
      name: 'schema',
      accountType: 'bloomSchema',
      hasIncome: 'bloomSchema',
      hasExpense: 'bloomSchema',
      hasValue: 'bloomSchema',
      verified: 'bloomSchema',
    },
  })

  const accountOrganizationEntry = createSubjectContext<AccountOrganizationV2>({
    type: 'AccountOrganization',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
    },
  })

  const bankAccountTransactionGroupEntry = createSubjectContext<BankAccountTransactionGroupV2>({
    type: 'BankAccountTransactionGroup',
    base: 'bloomSchema',
    properties: {
      cashflowCategory: 'bloomSchema',
      cashflowSubcategory: 'bloomSchema',
      startDate: 'schema',
      endDate: 'schema',
      valueTotal: 'bloomSchema',
    },
  })

  return [accountEntry, accountOrganizationEntry, bankAccountTransactionGroupEntry, monetaryAmountV2Context]
}

// Person Related

export type AccountPersonV2 = {
  '@type': 'AccountPerson'
  hasAccount: OneOrMore<AccountV2>
  hasIncome?: OneOrMore<BankAccountTransactionGroupV2>
}

export type VCAccountPersonV2Type = 'AccountCredentialPersonV2'

export const getVCAccountPersonV2ContextConfig = () => {
  const accountPersonContext = createSubjectContext<AccountPersonV2>({
    type: 'AccountPerson',
    base: 'bloomSchema',
    properties: {
      hasAccount: 'bloomSchema',
      hasIncome: 'bloomSchema',
    },
  })

  return createContextConfig<VCAccountPersonV2Type>({
    type: 'AccountCredentialPersonV2',
    subjects: [accountPersonContext].concat(getHelperContextEntries()),
  })
}

// Export a pre-built VC type and context for easier use

export type VCAccountPersonV2 = CreateVCType<[VCAccountPersonV2Type], AccountPersonV2>

export const getVCAccountPersonV2Context = () => {
  return createContext(getVCAccountPersonV2ContextConfig())
}
