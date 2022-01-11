import { AMLPersonV2, VCAMLPersonV2Type, getVCAMLPersonV2Context } from '../../aml/v2'
import { expandVCV2 } from '../__fixtures__'

describe('VCAMLPersonV2', () => {
  it('expands correctly', async () => {
    const expanded = await expandVCV2<VCAMLPersonV2Type, AMLPersonV2>({
      type: 'AMLCredentialPersonV2',
      data: {
        '@type': 'AMLPerson',
        hasAMLSearch: {
          '@type': 'AMLSearch',
          hitLocation: 'location',
          hitNumber: 1,
          lists: [
            {
              '@type': 'AMLList',
              name: 'My AML List',
              identifier: 'US_ABC',
              url: 'https://amllist.com',
            },
          ],
          recordId: '1234',
          identifier: '1234',
          score: '0',
          hits: [
            {
              '@type': 'AMLHit',
              identifier: '1234',
              name: 'AML Hit 1',
              hasCriteria: {
                '@type': 'AMLHitCriteria',
                name: 'AML Hit Criteria 1',
                identifier: '1234',
                matchDegree: '50',
              },
            },
          ],
          flagType: 'type',
          comment: 'some comment',
        },
      },
      context: getVCAMLPersonV2Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/AMLCredentialPersonV2",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/AMLPerson",
                ],
                "https://schema.bloom.co/hasAMLSearch": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/AMLSearch",
                    ],
                    "https://schema.bloom.co/comment": Array [
                      Object {
                        "@value": "some comment",
                      },
                    ],
                    "https://schema.bloom.co/flagType": Array [
                      Object {
                        "@value": "type",
                      },
                    ],
                    "https://schema.bloom.co/hitLocation": Array [
                      Object {
                        "@value": "location",
                      },
                    ],
                    "https://schema.bloom.co/hitNumber": Array [
                      Object {
                        "@value": 1,
                      },
                    ],
                    "https://schema.bloom.co/hits": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AMLHit",
                        ],
                        "https://schema.bloom.co/hasCriteria": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/AMLHitCriteria",
                            ],
                            "https://schema.bloom.co/identifier": Array [
                              Object {
                                "@value": "1234",
                              },
                            ],
                            "https://schema.bloom.co/matchDegree": Array [
                              Object {
                                "@value": "50",
                              },
                            ],
                            "https://schema.bloom.co/name": Array [
                              Object {
                                "@value": "AML Hit Criteria 1",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/identifier": Array [
                          Object {
                            "@value": "1234",
                          },
                        ],
                        "https://schema.bloom.co/name": Array [
                          Object {
                            "@value": "AML Hit 1",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/identifier": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "https://schema.bloom.co/lists": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AMLList",
                        ],
                        "https://schema.org/identifier": Array [
                          Object {
                            "@value": "US_ABC",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "My AML List",
                          },
                        ],
                        "https://schema.org/url": Array [
                          Object {
                            "@value": "https://amllist.com",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/recordId": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "https://schema.bloom.co/score": Array [
                      Object {
                        "@value": "0",
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
