import {
  VCCargoReceiptV1,
  VCSCargoReceiptV1,
  getVCCargoReceiptV1Context,
  VCBillOfLadingV1,
  VCSBillOfLadingV1,
  getVCBillOfLadingV1Context,
} from '../../trade/v1'
import { expandVC } from '../__fixtures__'

describe('VCCargoReceiptV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCCargoReceiptV1, VCSCargoReceiptV1>({
      type: 'CargoReceiptCredentialV1',
      data: {
        '@type': 'CargoReceipt',
        shipper: {
          '@type': ['Person', 'PersonE'],
        },
        recipient: {
          '@type': ['Person', 'PersonE'],
        },
        shipment: {
          '@type': 'Shipment',
          hasValue: {
            '@type': 'MonetaryAmount',
          },
          shippedOn: '',
          originAddress: {
            '@type': 'PostalAddress',
          },
          deliveryAddress: {
            '@type': 'PostalAddress',
          },
          orderedItem: {
            '@type': ['Product', 'ProductE'],
            hasValue: {
              '@type': 'MonetaryAmount',
              value: '1000',
              currency: 'USD',
            },
          },
        },
        portLoading: {
          '@type': ['Place', 'Port'],
          name: 'Port 1',
        },
        portUnloading: {
          '@type': ['Place', 'Port'],
          name: 'Port 2',
        },
      },
      context: getVCCargoReceiptV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/CargoReceiptCredentialV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/CargoReceipt",
                ],
                "https://schema.bloom.co/portLoading": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Place",
                      "https://schema.bloom.co/Port",
                    ],
                    "https://schema.org/name": Array [
                      Object {
                        "@value": "Port 1",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/portUnloading": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Place",
                      "https://schema.bloom.co/Port",
                    ],
                    "https://schema.org/name": Array [
                      Object {
                        "@value": "Port 2",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/recipient": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Person",
                      "https://schema.bloom.co/PersonE",
                    ],
                  },
                ],
                "https://schema.bloom.co/shipment": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/Shipment",
                    ],
                    "https://schema.bloom.co/deliveryAddress": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PostalAddress",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasValue": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/orderedItem": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Product",
                          "https://schema.bloom.co/ProductE",
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
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "1000",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/originAddress": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PostalAddress",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/shippedOn": Array [
                      Object {
                        "@value": "",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/shipper": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Person",
                      "https://schema.bloom.co/PersonE",
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

describe('VCBillOfLadingV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCBillOfLadingV1, VCSBillOfLadingV1>({
      type: 'BillOfLadingCredentialV1',
      data: {
        '@type': ['CargoReceipt', 'BillOfLading'],
        shipper: {
          '@type': ['Person', 'PersonE'],
        },
        recipient: {
          '@type': ['Person', 'PersonE'],
        },
        shipment: {
          '@type': 'Shipment',
          hasValue: {
            '@type': 'MonetaryAmount',
          },
          shippedOn: '',
          originAddress: {
            '@type': 'PostalAddress',
          },
          deliveryAddress: {
            '@type': 'PostalAddress',
          },
          orderedItem: {
            '@type': ['Product', 'ProductE'],
            hasValue: {
              '@type': 'MonetaryAmount',
              value: '1000',
              currency: 'USD',
            },
          },
        },
        portLoading: {
          '@type': ['Place', 'Port'],
          name: 'Port 1',
        },
        portUnloading: {
          '@type': ['Place', 'Port'],
          name: 'Port 2',
        },
      },
      context: getVCBillOfLadingV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/BillOfLadingCredentialV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/CargoReceipt",
                  "https://schema.bloom.co/BillOfLading",
                ],
                "https://schema.bloom.co/portLoading": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Place",
                      "https://schema.bloom.co/Port",
                    ],
                    "https://schema.org/name": Array [
                      Object {
                        "@value": "Port 1",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/portUnloading": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Place",
                      "https://schema.bloom.co/Port",
                    ],
                    "https://schema.org/name": Array [
                      Object {
                        "@value": "Port 2",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/recipient": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Person",
                      "https://schema.bloom.co/PersonE",
                    ],
                  },
                ],
                "https://schema.bloom.co/shipment": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/Shipment",
                    ],
                    "https://schema.bloom.co/deliveryAddress": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PostalAddress",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasValue": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/MonetaryAmount",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/orderedItem": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Product",
                          "https://schema.bloom.co/ProductE",
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
                            "https://schema.org/value": Array [
                              Object {
                                "@value": "1000",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/originAddress": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PostalAddress",
                        ],
                      },
                    ],
                    "https://schema.bloom.co/shippedOn": Array [
                      Object {
                        "@value": "",
                      },
                    ],
                  },
                ],
                "https://schema.bloom.co/shipper": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Person",
                      "https://schema.bloom.co/PersonE",
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
