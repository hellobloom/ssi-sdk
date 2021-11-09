import { GovernmentOrgV1, PersonEV1, OrganizationEV1, getBaseV1ContextEntries, MonetaryAmountEV1, MonetaryAmountRV1 } from '../base'
import {
  CreateThing,
  OneOrMore,
  ExpandThing,
  ExtendThing,
  CreateExpandedThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
} from '../util/v1'

// Helper Types

export type AccountStatementV1 = CreateThing<
  'AccountStatement',
  {
    statementDate?: string
    dueDate?: string
  }
>

export type AccountPaymentV1 = CreateThing<
  'AccountPayment',
  {
    paymentDate?: string
    amount: ExpandThing<MonetaryAmountRV1>
  }
>

type ServiceAccountStatementV1Mixin = CreateThing<
  'ServiceAccountStatement',
  {
    balanceAdjustments?: ExpandThing<MonetaryAmountRV1>
    totalBill?: ExpandThing<MonetaryAmountRV1>
    serviceAddress?: CreateExpandedThing<'PostalAddress'>
    billingAddress?: CreateExpandedThing<'PostalAddress'>
  }
>

export type ServiceAccountStatementV1 = ExtendThing<ServiceAccountStatementV1Mixin, AccountStatementV1>

export type BankAccountTransactionV1 = CreateThing<
  'BankAccountTransaction',
  {
    transactionType: 'credit' | 'debit'
    value: ExpandThing<MonetaryAmountRV1>
    memo?: string
  }
>

export type BankAccountTransactionGroupV1 = CreateThing<
  'BankAccountTransactionGroup',
  {
    identifier?: number
    startDate?: string
    endDate?: string
    cashflowCategory?: string
    cashflowSubcategory?: string
    payrollAgency?: boolean
    memo?: string
    length?: number // Length in days
    payee?: string
    payer?: string
    rank?: string
    frequency?: string // 'daily', 'weekly', 'biweekly', 'monthly', 'semiMonthly', 'annually', 'irregular', ...
    periodicity?: number
    valueStddev?: ExpandThing<MonetaryAmountRV1>
    valueTotal?: OneOrMore<ExpandThing<MonetaryAmountRV1>>
    valueMean?: ExpandThing<MonetaryAmountRV1>
    valueMedian?: ExpandThing<MonetaryAmountRV1>
    transactions?: OneOrMore<BankAccountTransactionV1>
  }
>

type OrganizationAccountV1Mixin = CreateThing<
  'OrganizationAccount',
  {
    serviceTypes?: Array<string>
    nationality?: ExpandThing<GovernmentOrgV1>
  }
>

export type OrganizationAccountV1 = ExtendThing<OrganizationAccountV1Mixin, OrganizationEV1>

export type AccountV1 = CreateThing<
  'Account',
  {
    name?: string | Array<string>
    identifier?: string | number
    description?: string
    organization: ExpandThing<OrganizationAccountV1>
    startDate?: string
    endDate?: string
    accountType?: string
    accountTypeConfidence?: number
    accountStatements?: Array<AccountStatementV1>
    accountPayments?: Array<AccountPaymentV1>
    hasValue?: OneOrMore<ExpandThing<MonetaryAmountRV1> | ExpandThing<MonetaryAmountEV1>>
    bankAccountCategory?: string
    hasIncome?: OneOrMore<BankAccountTransactionGroupV1>
    hasExpense?: OneOrMore<BankAccountTransactionGroupV1>
    hasTransactions?: OneOrMore<BankAccountTransactionV1>
  }
>

const getHelperContextEntries = () => {
  const accountStatementEntry = createContextEntry<AccountStatementV1>({
    type: 'AccountStatement',
    typeIdBase: 'bloomSchema',
    fields: {
      statementDate: 'bloomSchema',
      dueDate: 'bloomSchema',
    },
  })

  const accountPaymentEntry = createContextEntry<AccountPaymentV1>({
    type: 'AccountPayment',
    typeIdBase: 'bloomSchema',
    fields: {
      paymentDate: 'bloomSchema',
      amount: 'bloomSchema',
    },
  })

  const serviceAccountStatementEntry = createContextEntry<ServiceAccountStatementV1Mixin, AccountStatementV1>({
    type: 'ServiceAccountStatement',
    typeIdBase: 'bloomSchema',
    fields: {
      balanceAdjustments: 'bloomSchema',
      totalBill: 'bloomSchema',
      serviceAddress: 'bloomSchema',
      billingAddress: 'bloomSchema',
    },
  })

  const bankAccountTransactionV1Entry = createContextEntry<BankAccountTransactionV1>({
    type: 'BankAccountTransaction',
    typeIdBase: 'bloomSchema',
    fields: {
      transactionType: 'bloomSchema',
      value: 'bloomSchema',
      memo: 'bloomSchema',
    },
  })

  const bankAccountTransactionGroupV1Entry = createContextEntry<BankAccountTransactionGroupV1>({
    type: 'BankAccountTransactionGroup',
    typeIdBase: 'bloomSchema',
    fields: {
      identifier: 'bloomSchema',
      startDate: 'bloomSchema',
      endDate: 'bloomSchema',
      cashflowCategory: 'bloomSchema',
      cashflowSubcategory: 'bloomSchema',
      payrollAgency: 'bloomSchema',
      memo: 'bloomSchema',
      length: 'bloomSchema',
      payee: 'bloomSchema',
      payer: 'bloomSchema',
      rank: 'bloomSchema',
      frequency: 'bloomSchema',
      periodicity: 'bloomSchema',
      valueStddev: 'bloomSchema',
      valueTotal: 'bloomSchema',
      valueMean: 'bloomSchema',
      valueMedian: 'bloomSchema',
      transactions: 'bloomSchema',
    },
  })

  const organizationAccountEntry = createContextEntry<OrganizationAccountV1Mixin, OrganizationEV1>({
    type: 'OrganizationAccount',
    typeIdBase: 'bloomSchema',
    fields: {
      serviceTypes: 'bloomSchema',
      nationality: 'bloomSchema',
    },
  })

  const accountEntry = createContextEntry<AccountV1>({
    type: 'Account',
    typeIdBase: 'bloomSchema',
    fields: {
      name: 'schema',
      identifier: 'bloomSchema',
      description: 'bloomSchema',
      organization: 'bloomSchema',
      startDate: 'bloomSchema',
      endDate: 'bloomSchema',
      accountType: 'bloomSchema',
      accountTypeConfidence: 'bloomSchema',
      accountStatements: 'bloomSchema',
      accountPayments: 'bloomSchema',
      hasValue: 'bloomSchema',
      bankAccountCategory: 'bloomSchema',
      hasIncome: 'bloomSchema',
      hasExpense: 'bloomSchema',
      hasTransactions: 'bloomSchema',
    },
  })

  return [
    accountStatementEntry,
    accountPaymentEntry,
    serviceAccountStatementEntry,
    bankAccountTransactionV1Entry,
    bankAccountTransactionGroupV1Entry,
    organizationAccountEntry,
    accountEntry,
  ]
}

// Person Related

type AccountPersonV1Mixin = CreateThing<
  'AccountPerson',
  {
    hasAccount: OneOrMore<AccountV1>
    hasIncome?: OneOrMore<BankAccountTransactionGroupV1>
  }
>

export type AccountPersonV1 = ExtendThing<AccountPersonV1Mixin, PersonEV1>

export type VCSAccountPersonV1 = ExtendableVCSubject<ExpandThing<AccountPersonV1>>

export type VCAccountPersonV1 = ExtendableVC<VCSAccountPersonV1, 'AccountCredentialPersonV1'>

export const getVCAccountPersonV1Context = () => {
  const accountPersonEntry = createContextEntry<AccountPersonV1Mixin, PersonEV1>({
    type: 'AccountPerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasAccount: 'bloomSchema',
      hasIncome: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAccountPersonV1>({
    type: 'AccountCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [accountPersonEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Organization Related

type AccountOrganizationV1Mixin = CreateThing<
  'AccountOrganization',
  {
    hasAccount: OneOrMore<AccountV1>
    hasIncome: OneOrMore<BankAccountTransactionGroupV1>
  }
>

export type AccountOrganizationV1 = ExtendThing<AccountOrganizationV1Mixin, OrganizationEV1>

export type VCSAccountOrganizationV1 = ExtendableVCSubject<ExpandThing<AccountOrganizationV1>>

export type VCAccountOrganizationV1 = ExtendableVC<VCSAccountOrganizationV1, 'AccountCredentialOrganizationV1'>

export const getVCAccountOrganizationV1Context = () => {
  const accountOrganizationEntry = createContextEntry<AccountOrganizationV1Mixin, OrganizationEV1>({
    type: 'AccountOrganization',
    typeIdBase: 'bloomSchema',
    fields: {
      hasAccount: 'bloomSchema',
      hasIncome: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCAccountOrganizationV1>({
    type: 'AccountCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [accountOrganizationEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
