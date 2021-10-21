import {
  VCAccountPersonV1,
  VCSAccountPersonV1,
  getVCAccountPersonV1Context,
  VCAccountOrganizationV1,
  VCSAccountOrganizationV1,
  getVCAccountOrganizationV1Context,
  AccountV1,
  BankAccountTransactionGroupV1,
} from '../../account/v1'
import { expandVC } from '../__fixtures__'

const income: BankAccountTransactionGroupV1 = {
  '@type': 'BankAccountTransactionGroup',
  identifier: 1234,
  startDate: '2020-06-01T00:00:00.000Z',
  endDate: '2021-06-01T00:00:00.000Z',
  cashflowCategory: 'category',
  cashflowSubcategory: 'subcategory',
  payrollAgency: true,
  memo: 'memo',
  length: 10,
  payee: 'payee',
  payer: 'payer',
  rank: 'rank',
  frequency: 'daily',
  periodicity: 1,
  valueStddev: {
    '@type': 'MonetaryAmount',
    value: '100',
    currency: 'USD',
    maxValue: '100',
  },
  valueTotal: {
    '@type': 'MonetaryAmount',
    value: '100',
    currency: 'USD',
    maxValue: '100',
  },
  valueMean: {
    '@type': 'MonetaryAmount',
    value: '100',
    currency: 'USD',
    maxValue: '100',
  },
  valueMedian: {
    '@type': 'MonetaryAmount',
    value: '100',
    currency: 'USD',
    maxValue: '100',
  },
  transactions: {
    '@type': 'BankAccountTransaction',
    transactionType: 'credit',
    value: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    memo: 'memo',
  },
}

const account: AccountV1 = {
  '@type': 'Account',
  identifier: '1234',
  organization: {
    '@type': ['Organization', 'OrganizationE', 'OrganizationAccount'],
    serviceTypes: ['type1', 'type2'],
    nationality: {
      '@type': 'State',
      name: 'Washington',
    },
    name: 'My Org',
  },
  startDate: '2020-06-01T00:00:00.000Z',
  endDate: '2021-06-01T00:00:00.000Z',
  accountType: 'accountType',
  accountTypeConfidence: 1,
  accountStatements: [
    {
      '@type': 'AccountStatement',
      statementDate: '2020-06-01T00:00:00.000Z',
      dueDate: '2020-07-01T00:00:00.000Z',
    },
  ],
  accountPayments: [
    {
      '@type': 'AccountPayment',
      paymentDate: '2020-06-01T00:00:00.000Z',
      amount: {
        '@type': 'MonetaryAmount',
        value: '1000',
        currency: 'USD',
        maxValue: '100',
      },
    },
  ],
  hasValue: {
    '@type': 'MonetaryAmount',
    value: '1000',
    currency: 'USD',
    maxValue: '100',
  },
  bankAccountCategory: 'checking',
  hasIncome: {
    '@type': 'BankAccountTransactionGroup',
    identifier: 1234,
    startDate: '2020-06-01T00:00:00.000Z',
    endDate: '2021-06-01T00:00:00.000Z',
    cashflowCategory: 'category',
    cashflowSubcategory: 'subcategory',
    payrollAgency: true,
    memo: 'memo',
    length: 10,
    payee: 'payee',
    payer: 'payer',
    rank: 'rank',
    frequency: 'daily',
    periodicity: 1,
    valueStddev: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueTotal: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueMean: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueMedian: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    transactions: {
      '@type': 'BankAccountTransaction',
      transactionType: 'credit',
      value: {
        '@type': 'MonetaryAmount',
        value: '100',
        currency: 'USD',
        maxValue: '100',
      },
      memo: 'memo',
    },
  },
  hasExpense: {
    '@type': 'BankAccountTransactionGroup',
    identifier: 1234,
    startDate: '2020-06-01T00:00:00.000Z',
    endDate: '2021-06-01T00:00:00.000Z',
    cashflowCategory: 'category',
    cashflowSubcategory: 'subcategory',
    payrollAgency: true,
    memo: 'memo',
    length: 10,
    payee: 'payee',
    payer: 'payer',
    rank: 'rank',
    frequency: 'daily',
    periodicity: 1,
    valueStddev: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueTotal: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueMean: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    valueMedian: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
      maxValue: '100',
    },
    transactions: {
      '@type': 'BankAccountTransaction',
      transactionType: 'credit',
      value: {
        '@type': 'MonetaryAmount',
        value: '100',
        currency: 'USD',
        maxValue: '100',
      },
      memo: 'memo',
    },
  },
  hasTransactions: [
    {
      '@type': 'BankAccountTransaction',
      transactionType: 'credit',
      value: {
        '@type': 'MonetaryAmount',
        value: '100',
        currency: 'USD',
        maxValue: '100',
      },
      memo: 'memo',
    },
    {
      '@type': 'BankAccountTransaction',
      transactionType: 'credit',
      value: {
        '@type': 'MonetaryAmount',
        value: '100',
        currency: 'USD',
        maxValue: '100',
      },
      memo: 'memo',
    },
  ],
}

describe('VCAccountPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCAccountPersonV1, VCSAccountPersonV1>({
      type: 'AccountCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'AccountPerson'],
        hasAccount: account,
        hasIncome: income,
        name: 'Bob Belcher',
      },
      context: getVCAccountPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/AccountCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/AccountPerson",
                ],
                "https://schema.bloom.co/hasAccount": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/Account",
                    ],
                    "https://schema.bloom.co/accountPayments": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AccountPayment",
                        ],
                        "https://schema.bloom.co/amount": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "1000",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/paymentDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/accountStatements": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AccountStatement",
                        ],
                        "https://schema.bloom.co/dueDate": Array [
                          Object {
                            "@value": "2020-07-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/statementDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/accountType": Array [
                      Object {
                        "@value": "accountType",
                      },
                    ],
                    "https://schema.bloom.co/accountTypeConfidence": Array [
                      Object {
                        "@value": 1,
                      },
                    ],
                    "https://schema.bloom.co/bankAccountCategory": Array [
                      Object {
                        "@value": "checking",
                      },
                    ],
                    "https://schema.bloom.co/endDate": Array [
                      Object {
                        "@value": "2021-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/hasExpense": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransactionGroup",
                        ],
                        "https://schema.bloom.co/cashflowCategory": Array [
                          Object {
                            "@value": "category",
                          },
                        ],
                        "https://schema.bloom.co/cashflowSubcategory": Array [
                          Object {
                            "@value": "subcategory",
                          },
                        ],
                        "https://schema.bloom.co/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "daily",
                          },
                        ],
                        "https://schema.bloom.co/identifier": Array [
                          Object {
                            "@value": 1234,
                          },
                        ],
                        "https://schema.bloom.co/length": Array [
                          Object {
                            "@value": 10,
                          },
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/payee": Array [
                          Object {
                            "@value": "payee",
                          },
                        ],
                        "https://schema.bloom.co/payer": Array [
                          Object {
                            "@value": "payer",
                          },
                        ],
                        "https://schema.bloom.co/payrollAgency": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/periodicity": Array [
                          Object {
                            "@value": 1,
                          },
                        ],
                        "https://schema.bloom.co/rank": Array [
                          Object {
                            "@value": "rank",
                          },
                        ],
                        "https://schema.bloom.co/startDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/transactions": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/BankAccountTransaction",
                            ],
                            "https://schema.bloom.co/memo": Array [
                              Object {
                                "@value": "memo",
                              },
                            ],
                            "https://schema.bloom.co/transactionType": Array [
                              Object {
                                "@value": "credit",
                              },
                            ],
                            "https://schema.bloom.co/value": Array [
                              Object {
                                "@type": Array [
                                  "https://schema.org/MonetaryAmount",
                                ],
                                "https://schema.org/currency": Array [
                                  Object {
                                    "@value": "USD",
                                  },
                                ],
                                "https://schema.org/maxValue": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                                "https://schema.org/value": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMean": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMedian": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueStddev": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueTotal": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasIncome": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransactionGroup",
                        ],
                        "https://schema.bloom.co/cashflowCategory": Array [
                          Object {
                            "@value": "category",
                          },
                        ],
                        "https://schema.bloom.co/cashflowSubcategory": Array [
                          Object {
                            "@value": "subcategory",
                          },
                        ],
                        "https://schema.bloom.co/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "daily",
                          },
                        ],
                        "https://schema.bloom.co/identifier": Array [
                          Object {
                            "@value": 1234,
                          },
                        ],
                        "https://schema.bloom.co/length": Array [
                          Object {
                            "@value": 10,
                          },
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/payee": Array [
                          Object {
                            "@value": "payee",
                          },
                        ],
                        "https://schema.bloom.co/payer": Array [
                          Object {
                            "@value": "payer",
                          },
                        ],
                        "https://schema.bloom.co/payrollAgency": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/periodicity": Array [
                          Object {
                            "@value": 1,
                          },
                        ],
                        "https://schema.bloom.co/rank": Array [
                          Object {
                            "@value": "rank",
                          },
                        ],
                        "https://schema.bloom.co/startDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/transactions": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/BankAccountTransaction",
                            ],
                            "https://schema.bloom.co/memo": Array [
                              Object {
                                "@value": "memo",
                              },
                            ],
                            "https://schema.bloom.co/transactionType": Array [
                              Object {
                                "@value": "credit",
                              },
                            ],
                            "https://schema.bloom.co/value": Array [
                              Object {
                                "@type": Array [
                                  "https://schema.org/MonetaryAmount",
                                ],
                                "https://schema.org/currency": Array [
                                  Object {
                                    "@value": "USD",
                                  },
                                ],
                                "https://schema.org/maxValue": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                                "https://schema.org/value": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMean": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMedian": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueStddev": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueTotal": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasTransactions": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasValue": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "1000",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/identifier": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "https://schema.bloom.co/organization": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Organization",
                          "https://schema.bloom.co/OrganizationE",
                          "https://schema.bloom.co/OrganizationAccount",
                        ],
                        "https://schema.bloom.co/nationality": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/State",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Washington",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/serviceTypes": Array [
                          Object {
                            "@value": "type1",
                          },
                          Object {
                            "@value": "type2",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "My Org",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/startDate": Array [
                      Object {
                        "@value": "2020-06-01T00:00:00.000Z",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/hasIncome": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/BankAccountTransactionGroup",
                    ],
                    "https://schema.bloom.co/cashflowCategory": Array [
                      Object {
                        "@value": "category",
                      },
                    ],
                    "https://schema.bloom.co/cashflowSubcategory": Array [
                      Object {
                        "@value": "subcategory",
                      },
                    ],
                    "https://schema.bloom.co/endDate": Array [
                      Object {
                        "@value": "2021-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/frequency": Array [
                      Object {
                        "@value": "daily",
                      },
                    ],
                    "https://schema.bloom.co/identifier": Array [
                      Object {
                        "@value": 1234,
                      },
                    ],
                    "https://schema.bloom.co/length": Array [
                      Object {
                        "@value": 10,
                      },
                    ],
                    "https://schema.bloom.co/memo": Array [
                      Object {
                        "@value": "memo",
                      },
                    ],
                    "https://schema.bloom.co/payee": Array [
                      Object {
                        "@value": "payee",
                      },
                    ],
                    "https://schema.bloom.co/payer": Array [
                      Object {
                        "@value": "payer",
                      },
                    ],
                    "https://schema.bloom.co/payrollAgency": Array [
                      Object {
                        "@value": true,
                      },
                    ],
                    "https://schema.bloom.co/periodicity": Array [
                      Object {
                        "@value": 1,
                      },
                    ],
                    "https://schema.bloom.co/rank": Array [
                      Object {
                        "@value": "rank",
                      },
                    ],
                    "https://schema.bloom.co/startDate": Array [
                      Object {
                        "@value": "2020-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/transactions": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueMean": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueMedian": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueStddev": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueTotal": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Bob Belcher",
                  },
                ],
              },
            ],
          },
        ],
        "https://www.w3.org/2018/credentials#holder": Array [
          Object {
            "@id": "did:example:123",
          },
        ],
        "https://www.w3.org/2018/credentials#issuanceDate": Array [
          Object {
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
            "@value": "2021-05-20T00:00:00.000Z",
          },
        ],
        "https://www.w3.org/2018/credentials#issuer": Array [
          Object {
            "@id": "did:elem:EiD73F4C1VzN7w-bSUN26nRPOh0ohVSkPR0Lv2aybnkqZQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15T0dNeU1UVTVaRGN5WWpoaE1qRTNNV0ZoTjJNMFpqVTVZek13TVRobE1qQXdaVFUyTW1Zek16UTNZalkzTWpNd1lqUTNNVEZoWkRaaVpqSmxPRGczSWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ETm1OekExWVdaaFpHTTJaRGswTnpBMlkyUmtZalF4WmpSaU5UTTNOelEzWlRKa1pURTNZV0psT1dKbU16WmlZakUxTVRCaE5EWXdZemMzTkRrek16Wm1JaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiZTNRVGRjVk41T3U3bVBJdHZ0U1Q1NmFPdktPNmxBYXlYTkE5Tnl1OXg2eHBNWFBuSVIyd1pCbE1fSXZiby03eVloREpfX21hNzZHMldFVXVTZFZxVFEifQ",
          },
        ],
      }
    `)
  })
})

describe('VCAccountOrganizationV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCAccountOrganizationV1, VCSAccountOrganizationV1>({
      type: 'AccountCredentialOrganizationV1',
      data: {
        '@type': ['Organization', 'OrganizationE', 'AccountOrganization'],
        hasAccount: account,
        hasIncome: income,
        name: "Bob's Burgers",
      },
      context: getVCAccountOrganizationV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/AccountCredentialOrganizationV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Organization",
                  "https://schema.bloom.co/OrganizationE",
                  "https://schema.bloom.co/AccountOrganization",
                ],
                "https://schema.bloom.co/hasAccount": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/Account",
                    ],
                    "https://schema.bloom.co/accountPayments": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AccountPayment",
                        ],
                        "https://schema.bloom.co/amount": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "1000",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/paymentDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/accountStatements": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AccountStatement",
                        ],
                        "https://schema.bloom.co/dueDate": Array [
                          Object {
                            "@value": "2020-07-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/statementDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/accountType": Array [
                      Object {
                        "@value": "accountType",
                      },
                    ],
                    "https://schema.bloom.co/accountTypeConfidence": Array [
                      Object {
                        "@value": 1,
                      },
                    ],
                    "https://schema.bloom.co/bankAccountCategory": Array [
                      Object {
                        "@value": "checking",
                      },
                    ],
                    "https://schema.bloom.co/endDate": Array [
                      Object {
                        "@value": "2021-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/hasExpense": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransactionGroup",
                        ],
                        "https://schema.bloom.co/cashflowCategory": Array [
                          Object {
                            "@value": "category",
                          },
                        ],
                        "https://schema.bloom.co/cashflowSubcategory": Array [
                          Object {
                            "@value": "subcategory",
                          },
                        ],
                        "https://schema.bloom.co/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "daily",
                          },
                        ],
                        "https://schema.bloom.co/identifier": Array [
                          Object {
                            "@value": 1234,
                          },
                        ],
                        "https://schema.bloom.co/length": Array [
                          Object {
                            "@value": 10,
                          },
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/payee": Array [
                          Object {
                            "@value": "payee",
                          },
                        ],
                        "https://schema.bloom.co/payer": Array [
                          Object {
                            "@value": "payer",
                          },
                        ],
                        "https://schema.bloom.co/payrollAgency": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/periodicity": Array [
                          Object {
                            "@value": 1,
                          },
                        ],
                        "https://schema.bloom.co/rank": Array [
                          Object {
                            "@value": "rank",
                          },
                        ],
                        "https://schema.bloom.co/startDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/transactions": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/BankAccountTransaction",
                            ],
                            "https://schema.bloom.co/memo": Array [
                              Object {
                                "@value": "memo",
                              },
                            ],
                            "https://schema.bloom.co/transactionType": Array [
                              Object {
                                "@value": "credit",
                              },
                            ],
                            "https://schema.bloom.co/value": Array [
                              Object {
                                "@type": Array [
                                  "https://schema.org/MonetaryAmount",
                                ],
                                "https://schema.org/currency": Array [
                                  Object {
                                    "@value": "USD",
                                  },
                                ],
                                "https://schema.org/maxValue": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                                "https://schema.org/value": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMean": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMedian": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueStddev": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueTotal": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasIncome": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransactionGroup",
                        ],
                        "https://schema.bloom.co/cashflowCategory": Array [
                          Object {
                            "@value": "category",
                          },
                        ],
                        "https://schema.bloom.co/cashflowSubcategory": Array [
                          Object {
                            "@value": "subcategory",
                          },
                        ],
                        "https://schema.bloom.co/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "daily",
                          },
                        ],
                        "https://schema.bloom.co/identifier": Array [
                          Object {
                            "@value": 1234,
                          },
                        ],
                        "https://schema.bloom.co/length": Array [
                          Object {
                            "@value": 10,
                          },
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/payee": Array [
                          Object {
                            "@value": "payee",
                          },
                        ],
                        "https://schema.bloom.co/payer": Array [
                          Object {
                            "@value": "payer",
                          },
                        ],
                        "https://schema.bloom.co/payrollAgency": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/periodicity": Array [
                          Object {
                            "@value": 1,
                          },
                        ],
                        "https://schema.bloom.co/rank": Array [
                          Object {
                            "@value": "rank",
                          },
                        ],
                        "https://schema.bloom.co/startDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.bloom.co/transactions": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/BankAccountTransaction",
                            ],
                            "https://schema.bloom.co/memo": Array [
                              Object {
                                "@value": "memo",
                              },
                            ],
                            "https://schema.bloom.co/transactionType": Array [
                              Object {
                                "@value": "credit",
                              },
                            ],
                            "https://schema.bloom.co/value": Array [
                              Object {
                                "@type": Array [
                                  "https://schema.org/MonetaryAmount",
                                ],
                                "https://schema.org/currency": Array [
                                  Object {
                                    "@value": "USD",
                                  },
                                ],
                                "https://schema.org/maxValue": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                                "https://schema.org/value": Array [
                                  Object {
                                    "@value": "100",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMean": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueMedian": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueStddev": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/valueTotal": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasTransactions": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasValue": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "1000",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/identifier": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "https://schema.bloom.co/organization": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Organization",
                          "https://schema.bloom.co/OrganizationE",
                          "https://schema.bloom.co/OrganizationAccount",
                        ],
                        "https://schema.bloom.co/nationality": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/State",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Washington",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/serviceTypes": Array [
                          Object {
                            "@value": "type1",
                          },
                          Object {
                            "@value": "type2",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "My Org",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/startDate": Array [
                      Object {
                        "@value": "2020-06-01T00:00:00.000Z",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/hasIncome": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/BankAccountTransactionGroup",
                    ],
                    "https://schema.bloom.co/cashflowCategory": Array [
                      Object {
                        "@value": "category",
                      },
                    ],
                    "https://schema.bloom.co/cashflowSubcategory": Array [
                      Object {
                        "@value": "subcategory",
                      },
                    ],
                    "https://schema.bloom.co/endDate": Array [
                      Object {
                        "@value": "2021-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/frequency": Array [
                      Object {
                        "@value": "daily",
                      },
                    ],
                    "https://schema.bloom.co/identifier": Array [
                      Object {
                        "@value": 1234,
                      },
                    ],
                    "https://schema.bloom.co/length": Array [
                      Object {
                        "@value": 10,
                      },
                    ],
                    "https://schema.bloom.co/memo": Array [
                      Object {
                        "@value": "memo",
                      },
                    ],
                    "https://schema.bloom.co/payee": Array [
                      Object {
                        "@value": "payee",
                      },
                    ],
                    "https://schema.bloom.co/payer": Array [
                      Object {
                        "@value": "payer",
                      },
                    ],
                    "https://schema.bloom.co/payrollAgency": Array [
                      Object {
                        "@value": true,
                      },
                    ],
                    "https://schema.bloom.co/periodicity": Array [
                      Object {
                        "@value": 1,
                      },
                    ],
                    "https://schema.bloom.co/rank": Array [
                      Object {
                        "@value": "rank",
                      },
                    ],
                    "https://schema.bloom.co/startDate": Array [
                      Object {
                        "@value": "2020-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.bloom.co/transactions": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/BankAccountTransaction",
                        ],
                        "https://schema.bloom.co/memo": Array [
                          Object {
                            "@value": "memo",
                          },
                        ],
                        "https://schema.bloom.co/transactionType": Array [
                          Object {
                            "@value": "credit",
                          },
                        ],
                        "https://schema.bloom.co/value": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "USD",
                              },
                            ],
                            "https://schema.org/maxValue": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueMean": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueMedian": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueStddev": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/valueTotal": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/maxValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Bob's Burgers",
                  },
                ],
              },
            ],
          },
        ],
        "https://www.w3.org/2018/credentials#holder": Array [
          Object {
            "@id": "did:example:123",
          },
        ],
        "https://www.w3.org/2018/credentials#issuanceDate": Array [
          Object {
            "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
            "@value": "2021-05-20T00:00:00.000Z",
          },
        ],
        "https://www.w3.org/2018/credentials#issuer": Array [
          Object {
            "@id": "did:elem:EiD73F4C1VzN7w-bSUN26nRPOh0ohVSkPR0Lv2aybnkqZQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15T0dNeU1UVTVaRGN5WWpoaE1qRTNNV0ZoTjJNMFpqVTVZek13TVRobE1qQXdaVFUyTW1Zek16UTNZalkzTWpNd1lqUTNNVEZoWkRaaVpqSmxPRGczSWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ETm1OekExWVdaaFpHTTJaRGswTnpBMlkyUmtZalF4WmpSaU5UTTNOelEzWlRKa1pURTNZV0psT1dKbU16WmlZakUxTVRCaE5EWXdZemMzTkRrek16Wm1JaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiZTNRVGRjVk41T3U3bVBJdHZ0U1Q1NmFPdktPNmxBYXlYTkE5Tnl1OXg2eHBNWFBuSVIyd1pCbE1fSXZiby03eVloREpfX21hNzZHMldFVXVTZFZxVFEifQ",
          },
        ],
      }
    `)
  })
})
