import {
  AccountPersonV2,
  VCAccountPersonV2Type,
  BankAccountTransactionGroupV2,
  AccountV2,
  getVCAccountPersonV2Context,
} from '../../account/v2'
import { expandVCV2 } from '../__fixtures__'

const income: BankAccountTransactionGroupV2 = {
  '@type': 'BankAccountTransactionGroup',
  startDate: '2020-06-01T00:00:00.000Z',
  endDate: '2021-06-01T00:00:00.000Z',
  cashflowCategory: 'category',
  cashflowSubcategory: 'subcategory',
  valueTotal: {
    '@type': 'MonetaryAmount',
    value: '100',
    currency: 'USD',
  },
}

const account: AccountV2 = {
  '@type': 'Account',
  identifier: '1234',
  organization: {
    '@type': 'AccountOrganization',
    name: 'My Org',
  },
  accountType: 'accountType',
  hasValue: {
    '@type': 'MonetaryAmount',
    value: '1000',
    currency: 'USD',
    availableValue: '100',
  },
  hasIncome: income,
  hasExpense: {
    '@type': 'BankAccountTransactionGroup',
    startDate: '2020-06-01T00:00:00.000Z',
    endDate: '2021-06-01T00:00:00.000Z',
    cashflowCategory: 'category',
    cashflowSubcategory: 'subcategory',
    valueTotal: {
      '@type': 'MonetaryAmount',
      value: '100',
      currency: 'USD',
    },
  },
}

describe('VCAccountPersonV2', () => {
  it('expands correctly', async () => {
    const expanded = await expandVCV2<VCAccountPersonV2Type, AccountPersonV2>({
      type: 'AccountCredentialPersonV2',
      data: {
        '@type': 'AccountPerson',
        hasAccount: account,
        hasIncome: income,
      },
      context: getVCAccountPersonV2Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/AccountCredentialPersonV2",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/AccountPerson",
                ],
                "https://schema.bloom.co/hasAccount": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/Account",
                    ],
                    "https://schema.bloom.co/accountType": Array [
                      Object {
                        "@value": "accountType",
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
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.org/startDate": Array [
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
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "100",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/endDate": Array [
                          Object {
                            "@value": "2021-06-01T00:00:00.000Z",
                          },
                        ],
                        "https://schema.org/startDate": Array [
                          Object {
                            "@value": "2020-06-01T00:00:00.000Z",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasValue": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                        "https://schema.org/availableValue": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                        "https://schema.org/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "1000",
                          },
                        ],
                      },
                    ],
                    "https://schema.org/identifier": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "https://schema.org/organization": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AccountOrganization",
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "My Org",
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
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "100",
                          },
                        ],
                      },
                    ],
                    "https://schema.org/endDate": Array [
                      Object {
                        "@value": "2021-06-01T00:00:00.000Z",
                      },
                    ],
                    "https://schema.org/startDate": Array [
                      Object {
                        "@value": "2020-06-01T00:00:00.000Z",
                      },
                    ],
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
