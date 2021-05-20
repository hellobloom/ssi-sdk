import {
  VCCourtRecordSearchPersonV1,
  VCSCourtRecordSearchPersonV1,
  getVCCourtRecordSearchPersonV1Context,
} from '../../courtRecordSearch/v1'
import { expandVC } from '../__fixtures__'

describe('VCAMLPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCCourtRecordSearchPersonV1, VCSCourtRecordSearchPersonV1>({
      type: 'CourtRecordSearchCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'CourtRecordSearchPerson'],
        hasCourtRecordSearch: {
          '@type': 'CourtRecordSearch',
          result: 'pass',
          query: {
            '@type': 'CourtRecordSearchQuery',
            parent: {
              '@type': ['Person', 'PersonE'],
              name: 'Bob Belcher',
            },
            spouse: {
              '@type': ['Person', 'PersonE'],
              name: 'Jimmy Pesto',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Denver',
              addressRegion: 'CO',
              postalCode: '80209',
              streetAddress: '7 S. Broadway',
            },
            addressStatus: 'current',
          },
        },
        name: 'Tine Belcher',
      },
      context: getVCCourtRecordSearchPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/CourtRecordSearchCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/CourtRecordSearchPerson",
                ],
                "https://schema.bloom.co/hasCourtRecordSearch": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/CourtRecordSearch",
                    ],
                    "https://schema.bloom.co/query": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/CourtRecordSearchQuery",
                        ],
                        "https://schema.bloom.co/addressStatus": Array [
                          Object {
                            "@value": "current",
                          },
                        ],
                        "https://schema.org/address": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/PostalAddress",
                            ],
                            "https://schema.org/addressLocality": Array [
                              Object {
                                "@value": "Denver",
                              },
                            ],
                            "https://schema.org/addressRegion": Array [
                              Object {
                                "@value": "CO",
                              },
                            ],
                            "https://schema.org/postalCode": Array [
                              Object {
                                "@value": "80209",
                              },
                            ],
                            "https://schema.org/streetAddress": Array [
                              Object {
                                "@value": "7 S. Broadway",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/parent": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/Person",
                              "https://schema.bloom.co/PersonE",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Bob Belcher",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/spouse": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/Person",
                              "https://schema.bloom.co/PersonE",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Jimmy Pesto",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/result": Array [
                      Object {
                        "@value": "pass",
                      },
                    ],
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Tine Belcher",
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

  it('expands correctly with address as string', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCCourtRecordSearchPersonV1, VCSCourtRecordSearchPersonV1>({
      type: 'CourtRecordSearchCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'CourtRecordSearchPerson'],
        hasCourtRecordSearch: {
          '@type': 'CourtRecordSearch',
          result: 'pass',
          query: {
            '@type': 'CourtRecordSearchQuery',
            parent: {
              '@type': ['Person', 'PersonE'],
              name: 'Bob Belcher',
            },
            spouse: {
              '@type': ['Person', 'PersonE'],
              name: 'Jimmy Pesto',
            },
            address: '7 S. Broadway, Denver CO 80209',
            addressStatus: 'current',
            birthDate: '2000-01-01',
          },
        },
        name: 'Tine Belcher',
      },
      context: getVCCourtRecordSearchPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/CourtRecordSearchCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/CourtRecordSearchPerson",
                ],
                "https://schema.bloom.co/hasCourtRecordSearch": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/CourtRecordSearch",
                    ],
                    "https://schema.bloom.co/query": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/CourtRecordSearchQuery",
                        ],
                        "https://schema.bloom.co/addressStatus": Array [
                          Object {
                            "@value": "current",
                          },
                        ],
                        "https://schema.org/address": Array [
                          Object {
                            "@value": "7 S. Broadway, Denver CO 80209",
                          },
                        ],
                        "https://schema.org/birthDate": Array [
                          Object {
                            "@value": "2000-01-01",
                          },
                        ],
                        "https://schema.org/parent": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/Person",
                              "https://schema.bloom.co/PersonE",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Bob Belcher",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/spouse": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/Person",
                              "https://schema.bloom.co/PersonE",
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Jimmy Pesto",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/result": Array [
                      Object {
                        "@value": "pass",
                      },
                    ],
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Tine Belcher",
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
