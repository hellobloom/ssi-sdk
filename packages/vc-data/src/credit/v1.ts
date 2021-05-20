import { PersonEV1, OrganizationEV1, MonetaryAmountRV1, getBaseV1ContextEntries } from '../base'
import {
  CreateThing,
  OneOrMore,
  ExpandThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  createContextEntry,
  createVCContextEntry,
} from '../util'

// Helper Types

export type TradelinePayStatusV1 = CreateThing<
  'TradelinePayStatus',
  {
    date: string
    status: string
  }
>

export type TradelineRemarkV1 = CreateThing<
  'TradelineRemark',
  {
    remark: string
    remarkCode: string
  }
>

export type TradelineV1 = CreateThing<
  'Tradeline',
  {
    accountType?: string
    accountNumber?: string | number
    creditType?: string
    balanceCurrent?: ExpandThing<MonetaryAmountRV1>
    balanceMax?: ExpandThing<MonetaryAmountRV1>
    balancePercentage?: number
    rating?: string
    open?: boolean
    statement?: string

    subscriberCode?: string
    verifiedDate?: string
    reportedDate?: string
    openedDate?: string
    accountStatusDate?: string
    closedDate?: string
    bureau?: string
    accountCondition?: string
    accountDesignator?: string
    disputeFlag?: string
    industryCode?: string
    accountIsOpen?: boolean
    payStatus?: string
    verificationIndicator?: string
    remark?: OneOrMore<TradelineRemarkV1>

    monthsReviewed?: string
    monthlyPayment?: string
    late90Count?: string
    late60Count?: string
    late30Count?: string
    dateLatePayment?: string
    termMonths?: string
    collateral?: string
    amountPastDue?: ExpandThing<MonetaryAmountRV1>
    worstPastStatusCount?: string
    paymentFrequency?: string
    termType?: string
    worstPayStatus?: string
    payStatuses?: Array<TradelinePayStatusV1>
    creditLimit?: string

    creditor?: string | ExpandThing<OrganizationEV1>
    position?: string
  }
>

export type CreditScoreV1 = CreateThing<
  'CreditScore',
  {
    score?: number
    scoreType?: string
    populationRank?: number
    provider?: string
    lastUpdatedDate?: string
    utilizationPercentage?: number
    historyStartDate?: string
    paymentHistoryPercentage?: number
    statement?: string
    tradelines?: Array<TradelineV1>

    // Snapshot data
    creditDataSuppressed?: string
    totalAccounts?: string
    totalClosedAccounts?: string
    delinquentAccounts?: string
    derogatoryAccounts?: string
    openAccounts?: string
    totalBalances?: string
    totalMonthlyPayments?: string
    numberOfInquiries?: string
    totalPublicRecords?: string
    recentInquiries?: string
    balanceOpenRevolvingAccounts?: string
    totalOpenRevolvingAccounts?: string
    balanceOpenInstallmentAccounts?: string
    totalOpenInstallmentAccounts?: string
    balanceOpenMortgageAccounts?: string
    totalOpenMortgageAccounts?: string
    balanceOpenCollectionAccounts?: string
    totalOpenCollectionAccounts?: string
    balanceOpenOtherAccounts?: string
    totalOpenOtherAccounts?: string
    availableCredit?: string
    utilization?: string
    onTimePaymentPercentage?: string
    latePaymentPercentage?: string
    recentTradelinesOpened?: string
    dateOfOldestTrade?: string
    ageOfCredit?: string
    paymentHistory?: string
    securityFreeze?: string
    fraudAlert?: string
  }
>

const getHelperContextEntries = () => {
  const tradelinePayStatusEntry = createContextEntry<TradelinePayStatusV1>({
    type: 'TradelinePayStatus',
    typeIdBase: 'bloomSchema',
    fields: {
      date: 'bloomSchema',
      status: 'bloomSchema',
    },
  })

  const tradelineRemarkEntry = createContextEntry<TradelineRemarkV1>({
    type: 'TradelineRemark',
    typeIdBase: 'bloomSchema',
    fields: {
      remark: 'bloomSchema',
      remarkCode: 'bloomSchema',
    },
  })

  const tradelineEntry = createContextEntry<TradelineV1>({
    type: 'Tradeline',
    typeIdBase: 'bloomSchema',
    fields: {
      accountType: 'bloomSchema',
      accountNumber: 'bloomSchema',
      creditType: 'bloomSchema',
      balanceCurrent: 'bloomSchema',
      balanceMax: 'bloomSchema',
      balancePercentage: 'bloomSchema',
      rating: 'bloomSchema',
      open: 'bloomSchema',
      statement: 'bloomSchema',

      subscriberCode: 'bloomSchema',
      verifiedDate: 'bloomSchema',
      reportedDate: 'bloomSchema',
      openedDate: 'bloomSchema',
      accountStatusDate: 'bloomSchema',
      closedDate: 'bloomSchema',
      bureau: 'bloomSchema',
      accountCondition: 'bloomSchema',
      accountDesignator: 'bloomSchema',
      disputeFlag: 'bloomSchema',
      industryCode: 'bloomSchema',
      accountIsOpen: 'bloomSchema',
      payStatus: 'bloomSchema',
      verificationIndicator: 'bloomSchema',
      remark: 'bloomSchema',

      monthsReviewed: 'bloomSchema',
      monthlyPayment: 'bloomSchema',
      late90Count: 'bloomSchema',
      late60Count: 'bloomSchema',
      late30Count: 'bloomSchema',
      dateLatePayment: 'bloomSchema',
      termMonths: 'bloomSchema',
      collateral: 'bloomSchema',
      amountPastDue: 'bloomSchema',
      worstPastStatusCount: 'bloomSchema',
      paymentFrequency: 'bloomSchema',
      termType: 'bloomSchema',
      worstPayStatus: 'bloomSchema',
      payStatuses: 'bloomSchema',
      creditLimit: 'bloomSchema',

      creditor: 'bloomSchema',
      position: 'bloomSchema',
    },
  })

  const creditScoreEntry = createContextEntry<CreditScoreV1>({
    type: 'CreditScore',
    typeIdBase: 'bloomSchema',
    fields: {
      score: 'bloomSchema',
      scoreType: 'bloomSchema',
      populationRank: 'bloomSchema',
      provider: 'bloomSchema',
      lastUpdatedDate: 'bloomSchema',
      utilizationPercentage: 'bloomSchema',
      historyStartDate: 'bloomSchema',
      paymentHistoryPercentage: 'bloomSchema',
      statement: 'bloomSchema',
      tradelines: 'bloomSchema',

      // Snapshot data
      creditDataSuppressed: 'bloomSchema',
      totalAccounts: 'bloomSchema',
      totalClosedAccounts: 'bloomSchema',
      delinquentAccounts: 'bloomSchema',
      derogatoryAccounts: 'bloomSchema',
      openAccounts: 'bloomSchema',
      totalBalances: 'bloomSchema',
      totalMonthlyPayments: 'bloomSchema',
      numberOfInquiries: 'bloomSchema',
      totalPublicRecords: 'bloomSchema',
      recentInquiries: 'bloomSchema',
      balanceOpenRevolvingAccounts: 'bloomSchema',
      totalOpenRevolvingAccounts: 'bloomSchema',
      balanceOpenInstallmentAccounts: 'bloomSchema',
      totalOpenInstallmentAccounts: 'bloomSchema',
      balanceOpenMortgageAccounts: 'bloomSchema',
      totalOpenMortgageAccounts: 'bloomSchema',
      balanceOpenCollectionAccounts: 'bloomSchema',
      totalOpenCollectionAccounts: 'bloomSchema',
      balanceOpenOtherAccounts: 'bloomSchema',
      totalOpenOtherAccounts: 'bloomSchema',
      availableCredit: 'bloomSchema',
      utilization: 'bloomSchema',
      onTimePaymentPercentage: 'bloomSchema',
      latePaymentPercentage: 'bloomSchema',
      recentTradelinesOpened: 'bloomSchema',
      dateOfOldestTrade: 'bloomSchema',
      ageOfCredit: 'bloomSchema',
      paymentHistory: 'bloomSchema',
      securityFreeze: 'bloomSchema',
      fraudAlert: 'bloomSchema',
    },
  })

  return [tradelinePayStatusEntry, tradelineRemarkEntry, tradelineEntry, creditScoreEntry]
}

// Person Related

type CreditScorePersonV1Mixin = CreateThing<
  'CreditScorePerson',
  {
    hasCreditScore: OneOrMore<CreditScoreV1>
  }
>

export type CreditScorePersonV1 = ExtendThing<CreditScorePersonV1Mixin, PersonEV1>

export type VCSCreditScorePersonV1 = ExtendableVCSubject<ExpandThing<CreditScorePersonV1>>

export type VCCreditScorePersonV1 = ExtendableVC<VCSCreditScorePersonV1, 'CreditScoreCredentialPersonV1'>

export const getVCCreditScorePersonV1Context = () => {
  const creditScorePersonEntry = createContextEntry<CreditScorePersonV1Mixin, PersonEV1>({
    type: 'CreditScorePerson',
    typeIdBase: 'bloomSchema',
    fields: {
      hasCreditScore: 'bloomSchema',
    },
    vocab: 'schema',
  })

  return createVCContextEntry<VCCreditScorePersonV1>({
    type: 'CreditScoreCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [creditScorePersonEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
