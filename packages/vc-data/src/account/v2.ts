import { OneOrMore, CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import {
  MonetaryAmountV2,
  OrganizationV2,
  GovernmentOrgV2,
  PostalAddressV2,
  monetaryAmountV2Context,
  postalAddressV2Context,
  governmentOrgContexts,
} from '../base/v2'

// Helper Types

export type BankAccountTransactionV2 = {
  '@type': 'BankAccountTransaction'
  transactionType: 'credit' | 'debit'
  value: MonetaryAmountV2
  memo?: string
}

export type BankAccountTransactionGroupV2 = {
  '@type': 'BankAccountTransactionGroup'
  cashflowCategory?: string
  cashflowSubcategory?: string
  startDate?: string
  endDate?: string
  valueTotal?: OneOrMore<MonetaryAmountV2>
  valueAnnualMean?: OneOrMore<MonetaryAmountV2>
  transactions?: OneOrMore<BankAccountTransactionV2>
}

export type AccountOrganizationV2 = Omit<OrganizationV2, '@type'> & {
  '@type': 'AccountOrganization'
  name: string
  serviceTypes?: Array<string>
  nationality?: GovernmentOrgV2
}

export type AccountStatementV2 = {
  '@type': 'AccountStatement'
  statementDate?: string
  dueDate?: string
}

export type AccountPaymentV2 = {
  '@type': 'AccountPayment'
  paymentDate?: string
  amount: MonetaryAmountV2
}

// expands AccountStatementV2
export type ServiceAccountStatementV2 = {
  '@type': 'ServiceAccountStatement'
  balanceAdjustments?: MonetaryAmountV2
  totalBill?: MonetaryAmountV2
  serviceAddress?: OneOrMore<PostalAddressV2 | string>
  billingAddress?: OneOrMore<PostalAddressV2 | string>
  statementDate?: string
  dueDate?: string
}

export type TransferInformationV2 = {
  '@type': 'TransferInformation'
  transferType?: string // ach, eft, international, bacs
  accountCode?: string | number
  routingCode?: string | number
  wireRoutingCode?: string | number
  institutionCode?: string | number
  branchCode?: string | number
  bicCode?: string | number
  ibanCode?: string | number
  sortCode?: string | number
}

export type AccountV2 = {
  '@type': 'Account'
  accountPayments?: Array<AccountPaymentV2>
  accountType?: string
  accountTypeConfidence?: number
  bankAccountCategory?: string
  description?: string
  endDate?: string
  hasExpense?: OneOrMore<BankAccountTransactionGroupV2>
  hasIncome?: OneOrMore<BankAccountTransactionGroupV2>
  hasTotalIncome?: OneOrMore<BankAccountTransactionGroupV2>
  hasTransactions?: OneOrMore<BankAccountTransactionV2>
  hasValue?: MonetaryAmountV2
  identifier?: string | number
  hasTransferInformation?: OneOrMore<TransferInformationV2>
  name?: OneOrMore<string>
  organization?: AccountOrganizationV2
  startDate?: string
  verified?: boolean
}

const getHelperContextEntries = () => {
  const accountStatementEntry = createSubjectContext<AccountStatementV2>({
    type: 'AccountStatement',
    base: 'bloomSchema',
    properties: {
      statementDate: 'bloomSchema',
      dueDate: 'bloomSchema',
    },
  })

  const accountPaymentEntry = createSubjectContext<AccountPaymentV2>({
    type: 'AccountPayment',
    base: 'bloomSchema',
    properties: {
      paymentDate: 'bloomSchema',
      amount: 'bloomSchema',
    },
  })

  const serviceAccountStatementEntry = createSubjectContext<ServiceAccountStatementV2>({
    type: 'ServiceAccountStatement',
    base: 'bloomSchema',
    properties: {
      balanceAdjustments: 'bloomSchema',
      totalBill: 'bloomSchema',
      serviceAddress: 'bloomSchema',
      billingAddress: 'bloomSchema',
      statementDate: 'bloomSchema',
      dueDate: 'bloomSchema',
    },
  })

  const accountEntry = createSubjectContext<AccountV2>({
    type: 'Account',
    base: 'bloomSchema',
    properties: {
      identifier: 'schema',
      name: 'schema',
      organization: 'schema',
      description: 'schema',

      accountPayments: 'bloomSchema',
      accountType: 'bloomSchema',
      accountTypeConfidence: 'bloomSchema',
      bankAccountCategory: 'bloomSchema',
      endDate: 'bloomSchema',
      hasExpense: 'bloomSchema',
      hasTransferInformation: 'bloomSchema',
      hasTotalIncome: 'bloomSchema',
      hasIncome: 'bloomSchema',
      hasTransactions: 'bloomSchema',
      hasValue: 'bloomSchema',
      startDate: 'bloomSchema',
      verified: 'bloomSchema',
    },
  })

  const accountOrganizationEntry = createSubjectContext<AccountOrganizationV2>({
    type: 'AccountOrganization',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      serviceTypes: 'bloomSchema',
      nationality: 'bloomSchema',
    },
  })

  const transferInformationEntry = createSubjectContext<TransferInformationV2>({
    type: 'TransferInformation',
    base: 'bloomSchema',
    properties: {
      transferType: 'bloomSchema',
      accountCode: 'bloomSchema',
      routingCode: 'bloomSchema',
      wireRoutingCode: 'bloomSchema',
      institutionCode: 'bloomSchema',
      branchCode: 'bloomSchema',
      bicCode: 'bloomSchema',
      ibanCode: 'bloomSchema',
      sortCode: 'bloomSchema',
    },
  })

  const bankAccountTransactionEntry = createSubjectContext<BankAccountTransactionV2>({
    type: 'BankAccountTransaction',
    base: 'bloomSchema',
    properties: {
      transactionType: 'bloomSchema',
      value: 'bloomSchema',
      memo: 'bloomSchema',
    },
  })

  const bankAccountTransactionGroupEntry = createSubjectContext<BankAccountTransactionGroupV2>({
    type: 'BankAccountTransactionGroup',
    base: 'bloomSchema',
    properties: {
      valueAnnualMean: 'bloomSchema',
      cashflowCategory: 'bloomSchema',
      cashflowSubcategory: 'bloomSchema',
      startDate: 'schema',
      endDate: 'schema',
      valueTotal: 'bloomSchema',
      transactions: 'bloomSchema',
    },
  })

  return [
    accountStatementEntry,
    accountPaymentEntry,
    transferInformationEntry,
    serviceAccountStatementEntry,
    bankAccountTransactionEntry,
    bankAccountTransactionGroupEntry,
    accountEntry,
    accountOrganizationEntry,
    monetaryAmountV2Context,
    postalAddressV2Context,
    ...governmentOrgContexts,
  ]
}

// Person Related

export type AccountPersonV2 = {
  '@type': 'AccountPerson'
  hasAccount: OneOrMore<AccountV2>
  hasIncome?: OneOrMore<BankAccountTransactionGroupV2>
  hasTotalIncome?: OneOrMore<BankAccountTransactionGroupV2>
}

export type VCAccountPersonV2Type = 'AccountCredentialPersonV2'

export const getVCAccountPersonV2ContextConfig = () => {
  const accountPersonContext = createSubjectContext<AccountPersonV2>({
    type: 'AccountPerson',
    base: 'bloomSchema',
    properties: {
      hasAccount: 'bloomSchema',
      hasIncome: 'bloomSchema',
      hasTotalIncome: 'bloomSchema',
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
