import { VCCreditScorePersonV1, VCSCreditScorePersonV1, getVCCreditScorePersonV1Context } from '../../credit/v1'
import { expandVC } from '../__fixtures__'

describe('VCCreditScorePersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCCreditScorePersonV1, VCSCreditScorePersonV1>({
      type: 'CreditScoreCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'CreditScorePerson'],
        name: 'Bob Belcher',
        hasCreditScore: {
          '@type': 'CreditScore',
          score: 0,
          scoreType: 'scoreType',
          populationRank: 0,
          provider: 'provider',
          lastUpdatedDate: 'lastUpdatedDate',
          utilizationPercentage: 0,
          historyStartDate: 'historyStartDate',
          paymentHistoryPercentage: 0,
          statement: 'statement',
          tradelines: [
            {
              '@type': 'Tradeline',
              accountType: 'accountType',
              accountNumber: 'accountNumber',
              creditType: 'creditType',
              balanceCurrent: { '@type': 'MonetaryAmount', value: 100, currency: 'USD' },
              balanceMax: { '@type': 'MonetaryAmount', value: 100, currency: 'USD' },
              balancePercentage: 0,
              rating: 'rating',
              open: true,
              statement: 'statement',

              subscriberCode: 'subscriberCode',
              verifiedDate: 'verifiedDate',
              reportedDate: 'reportedDate',
              openedDate: 'openedDate',
              accountStatusDate: 'accountStatusDate',
              closedDate: 'closedDate',
              bureau: 'bureau',
              accountCondition: 'accountCondition',
              accountDesignator: 'accountDesignator',
              disputeFlag: 'disputeFlag',
              industryCode: 'industryCode',
              accountIsOpen: true,
              payStatus: 'payStatus',
              verificationIndicator: 'verificationIndicator',
              remark: [
                {
                  '@type': 'TradelineRemark',
                  remark: 'remark',
                  remarkCode: 'remarkCode',
                },
              ],
              monthsReviewed: 'monthsReviewed',
              monthlyPayment: 'monthlyPayment',
              late90Count: 'late90Count',
              late60Count: 'late60Count',
              late30Count: 'late30Count',
              dateLatePayment: 'dateLatePayment',
              termMonths: 'termMonths',
              collateral: 'collateral',
              amountPastDue: { '@type': 'MonetaryAmount', value: 100, currency: 'USD' },
              worstPastStatusCount: 'worstPastStatusCount',
              paymentFrequency: 'paymentFrequency',
              termType: 'termType',
              worstPayStatus: 'worstPayStatus',
              payStatuses: [
                {
                  '@type': 'TradelinePayStatus',
                  date: 'date',
                  status: 'status',
                },
              ],
              creditLimit: 'creditLimit',
              creditor: 'creditor',
              position: 'position',
            },
          ],
          creditDataSuppressed: 'creditDataSuppressed',
          totalAccounts: 'totalAccounts',
          totalClosedAccounts: 'totalClosedAccounts',
          delinquentAccounts: 'delinquentAccounts',
          derogatoryAccounts: 'derogatoryAccounts',
          openAccounts: 'openAccounts',
          totalBalances: 'totalBalances',
          totalMonthlyPayments: 'totalMonthlyPayments',
          numberOfInquiries: 'numberOfInquiries',
          totalPublicRecords: 'totalPublicRecords',
          recentInquiries: 'recentInquiries',
          balanceOpenRevolvingAccounts: 'balanceOpenRevolvingAccounts',
          totalOpenRevolvingAccounts: 'totalOpenRevolvingAccounts',
          balanceOpenInstallmentAccounts: 'balanceOpenInstallmentAccounts',
          totalOpenInstallmentAccounts: 'totalOpenInstallmentAccounts',
          balanceOpenMortgageAccounts: 'balanceOpenMortgageAccounts',
          totalOpenMortgageAccounts: 'totalOpenMortgageAccounts',
          balanceOpenCollectionAccounts: 'balanceOpenCollectionAccounts',
          totalOpenCollectionAccounts: 'totalOpenCollectionAccounts',
          balanceOpenOtherAccounts: 'balanceOpenOtherAccounts',
          totalOpenOtherAccounts: 'totalOpenOtherAccounts',
          availableCredit: 'availableCredit',
          utilization: 'utilization',
          onTimePaymentPercentage: 'onTimePaymentPercentage',
          latePaymentPercentage: 'latePaymentPercentage',
          recentTradelinesOpened: 'recentTradelinesOpened',
          dateOfOldestTrade: 'dateOfOldestTrade',
          ageOfCredit: 'ageOfCredit',
          paymentHistory: 'paymentHistory',
          securityFreeze: 'securityFreeze',
          fraudAlert: 'fraudAlert',
        },
      },
      context: getVCCreditScorePersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/CreditScoreCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/CreditScorePerson",
                ],
                "https://schema.bloom.co/hasCreditScore": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/CreditScore",
                    ],
                    "https://schema.bloom.co/ageOfCredit": Array [
                      Object {
                        "@value": "ageOfCredit",
                      },
                    ],
                    "https://schema.bloom.co/availableCredit": Array [
                      Object {
                        "@value": "availableCredit",
                      },
                    ],
                    "https://schema.bloom.co/balanceOpenCollectionAccounts": Array [
                      Object {
                        "@value": "balanceOpenCollectionAccounts",
                      },
                    ],
                    "https://schema.bloom.co/balanceOpenInstallmentAccounts": Array [
                      Object {
                        "@value": "balanceOpenInstallmentAccounts",
                      },
                    ],
                    "https://schema.bloom.co/balanceOpenMortgageAccounts": Array [
                      Object {
                        "@value": "balanceOpenMortgageAccounts",
                      },
                    ],
                    "https://schema.bloom.co/balanceOpenOtherAccounts": Array [
                      Object {
                        "@value": "balanceOpenOtherAccounts",
                      },
                    ],
                    "https://schema.bloom.co/balanceOpenRevolvingAccounts": Array [
                      Object {
                        "@value": "balanceOpenRevolvingAccounts",
                      },
                    ],
                    "https://schema.bloom.co/creditDataSuppressed": Array [
                      Object {
                        "@value": "creditDataSuppressed",
                      },
                    ],
                    "https://schema.bloom.co/dateOfOldestTrade": Array [
                      Object {
                        "@value": "dateOfOldestTrade",
                      },
                    ],
                    "https://schema.bloom.co/delinquentAccounts": Array [
                      Object {
                        "@value": "delinquentAccounts",
                      },
                    ],
                    "https://schema.bloom.co/derogatoryAccounts": Array [
                      Object {
                        "@value": "derogatoryAccounts",
                      },
                    ],
                    "https://schema.bloom.co/fraudAlert": Array [
                      Object {
                        "@value": "fraudAlert",
                      },
                    ],
                    "https://schema.bloom.co/historyStartDate": Array [
                      Object {
                        "@value": "historyStartDate",
                      },
                    ],
                    "https://schema.bloom.co/lastUpdatedDate": Array [
                      Object {
                        "@value": "lastUpdatedDate",
                      },
                    ],
                    "https://schema.bloom.co/latePaymentPercentage": Array [
                      Object {
                        "@value": "latePaymentPercentage",
                      },
                    ],
                    "https://schema.bloom.co/numberOfInquiries": Array [
                      Object {
                        "@value": "numberOfInquiries",
                      },
                    ],
                    "https://schema.bloom.co/onTimePaymentPercentage": Array [
                      Object {
                        "@value": "onTimePaymentPercentage",
                      },
                    ],
                    "https://schema.bloom.co/openAccounts": Array [
                      Object {
                        "@value": "openAccounts",
                      },
                    ],
                    "https://schema.bloom.co/paymentHistory": Array [
                      Object {
                        "@value": "paymentHistory",
                      },
                    ],
                    "https://schema.bloom.co/paymentHistoryPercentage": Array [
                      Object {
                        "@value": 0,
                      },
                    ],
                    "https://schema.bloom.co/populationRank": Array [
                      Object {
                        "@value": 0,
                      },
                    ],
                    "https://schema.bloom.co/provider": Array [
                      Object {
                        "@value": "provider",
                      },
                    ],
                    "https://schema.bloom.co/recentInquiries": Array [
                      Object {
                        "@value": "recentInquiries",
                      },
                    ],
                    "https://schema.bloom.co/recentTradelinesOpened": Array [
                      Object {
                        "@value": "recentTradelinesOpened",
                      },
                    ],
                    "https://schema.bloom.co/score": Array [
                      Object {
                        "@value": 0,
                      },
                    ],
                    "https://schema.bloom.co/scoreType": Array [
                      Object {
                        "@value": "scoreType",
                      },
                    ],
                    "https://schema.bloom.co/securityFreeze": Array [
                      Object {
                        "@value": "securityFreeze",
                      },
                    ],
                    "https://schema.bloom.co/statement": Array [
                      Object {
                        "@value": "statement",
                      },
                    ],
                    "https://schema.bloom.co/totalAccounts": Array [
                      Object {
                        "@value": "totalAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalBalances": Array [
                      Object {
                        "@value": "totalBalances",
                      },
                    ],
                    "https://schema.bloom.co/totalClosedAccounts": Array [
                      Object {
                        "@value": "totalClosedAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalMonthlyPayments": Array [
                      Object {
                        "@value": "totalMonthlyPayments",
                      },
                    ],
                    "https://schema.bloom.co/totalOpenCollectionAccounts": Array [
                      Object {
                        "@value": "totalOpenCollectionAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalOpenInstallmentAccounts": Array [
                      Object {
                        "@value": "totalOpenInstallmentAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalOpenMortgageAccounts": Array [
                      Object {
                        "@value": "totalOpenMortgageAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalOpenOtherAccounts": Array [
                      Object {
                        "@value": "totalOpenOtherAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalOpenRevolvingAccounts": Array [
                      Object {
                        "@value": "totalOpenRevolvingAccounts",
                      },
                    ],
                    "https://schema.bloom.co/totalPublicRecords": Array [
                      Object {
                        "@value": "totalPublicRecords",
                      },
                    ],
                    "https://schema.bloom.co/tradelines": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/Tradeline",
                        ],
                        "https://schema.bloom.co/accountCondition": Array [
                          Object {
                            "@value": "accountCondition",
                          },
                        ],
                        "https://schema.bloom.co/accountDesignator": Array [
                          Object {
                            "@value": "accountDesignator",
                          },
                        ],
                        "https://schema.bloom.co/accountIsOpen": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/accountNumber": Array [
                          Object {
                            "@value": "accountNumber",
                          },
                        ],
                        "https://schema.bloom.co/accountStatusDate": Array [
                          Object {
                            "@value": "accountStatusDate",
                          },
                        ],
                        "https://schema.bloom.co/accountType": Array [
                          Object {
                            "@value": "accountType",
                          },
                        ],
                        "https://schema.bloom.co/amountPastDue": Array [
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
                                "@value": 100,
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/balanceCurrent": Array [
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
                                "@value": 100,
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/balanceMax": Array [
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
                                "@value": 100,
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/balancePercentage": Array [
                          Object {
                            "@value": 0,
                          },
                        ],
                        "https://schema.bloom.co/bureau": Array [
                          Object {
                            "@value": "bureau",
                          },
                        ],
                        "https://schema.bloom.co/closedDate": Array [
                          Object {
                            "@value": "closedDate",
                          },
                        ],
                        "https://schema.bloom.co/collateral": Array [
                          Object {
                            "@value": "collateral",
                          },
                        ],
                        "https://schema.bloom.co/creditLimit": Array [
                          Object {
                            "@value": "creditLimit",
                          },
                        ],
                        "https://schema.bloom.co/creditType": Array [
                          Object {
                            "@value": "creditType",
                          },
                        ],
                        "https://schema.bloom.co/creditor": Array [
                          Object {
                            "@value": "creditor",
                          },
                        ],
                        "https://schema.bloom.co/dateLatePayment": Array [
                          Object {
                            "@value": "dateLatePayment",
                          },
                        ],
                        "https://schema.bloom.co/disputeFlag": Array [
                          Object {
                            "@value": "disputeFlag",
                          },
                        ],
                        "https://schema.bloom.co/industryCode": Array [
                          Object {
                            "@value": "industryCode",
                          },
                        ],
                        "https://schema.bloom.co/late30Count": Array [
                          Object {
                            "@value": "late30Count",
                          },
                        ],
                        "https://schema.bloom.co/late60Count": Array [
                          Object {
                            "@value": "late60Count",
                          },
                        ],
                        "https://schema.bloom.co/late90Count": Array [
                          Object {
                            "@value": "late90Count",
                          },
                        ],
                        "https://schema.bloom.co/monthlyPayment": Array [
                          Object {
                            "@value": "monthlyPayment",
                          },
                        ],
                        "https://schema.bloom.co/monthsReviewed": Array [
                          Object {
                            "@value": "monthsReviewed",
                          },
                        ],
                        "https://schema.bloom.co/open": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/openedDate": Array [
                          Object {
                            "@value": "openedDate",
                          },
                        ],
                        "https://schema.bloom.co/payStatus": Array [
                          Object {
                            "@value": "payStatus",
                          },
                        ],
                        "https://schema.bloom.co/payStatuses": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/TradelinePayStatus",
                            ],
                            "https://schema.bloom.co/date": Array [
                              Object {
                                "@value": "date",
                              },
                            ],
                            "https://schema.bloom.co/status": Array [
                              Object {
                                "@value": "status",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/paymentFrequency": Array [
                          Object {
                            "@value": "paymentFrequency",
                          },
                        ],
                        "https://schema.bloom.co/position": Array [
                          Object {
                            "@value": "position",
                          },
                        ],
                        "https://schema.bloom.co/rating": Array [
                          Object {
                            "@value": "rating",
                          },
                        ],
                        "https://schema.bloom.co/remark": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/TradelineRemark",
                            ],
                            "https://schema.bloom.co/remark": Array [
                              Object {
                                "@value": "remark",
                              },
                            ],
                            "https://schema.bloom.co/remarkCode": Array [
                              Object {
                                "@value": "remarkCode",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/reportedDate": Array [
                          Object {
                            "@value": "reportedDate",
                          },
                        ],
                        "https://schema.bloom.co/statement": Array [
                          Object {
                            "@value": "statement",
                          },
                        ],
                        "https://schema.bloom.co/subscriberCode": Array [
                          Object {
                            "@value": "subscriberCode",
                          },
                        ],
                        "https://schema.bloom.co/termMonths": Array [
                          Object {
                            "@value": "termMonths",
                          },
                        ],
                        "https://schema.bloom.co/termType": Array [
                          Object {
                            "@value": "termType",
                          },
                        ],
                        "https://schema.bloom.co/verificationIndicator": Array [
                          Object {
                            "@value": "verificationIndicator",
                          },
                        ],
                        "https://schema.bloom.co/verifiedDate": Array [
                          Object {
                            "@value": "verifiedDate",
                          },
                        ],
                        "https://schema.bloom.co/worstPastStatusCount": Array [
                          Object {
                            "@value": "worstPastStatusCount",
                          },
                        ],
                        "https://schema.bloom.co/worstPayStatus": Array [
                          Object {
                            "@value": "worstPayStatus",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/utilization": Array [
                      Object {
                        "@value": "utilization",
                      },
                    ],
                    "https://schema.bloom.co/utilizationPercentage": Array [
                      Object {
                        "@value": 0,
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
            "@value": "Wed May 19 2021",
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
