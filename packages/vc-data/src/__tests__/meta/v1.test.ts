import {
  VCMetaPersonV1,
  VCSMetaPersonV1,
  getVCMetaPersonV1Context,
  VCMetaOrganizationV1,
  VCSMetaOrganizationV1,
  getVCMetaOrganizationV1Context,
} from '../../meta/v1'
import { expandVC } from '../__fixtures__'

describe('VCMetaPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCMetaPersonV1, VCSMetaPersonV1>({
      type: 'MetaCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'MetaPerson'],
        name: 'Bob Belcher',
        receivedCredentials: {
          '@type': ['Role', 'ReceivedCredentialRole'],
          startDate: 'start',
          endDate: 'end',
          aggregatorDID: 'did:elem:...',
          typesSome: ['type 1'],
          typesAll: ['type 2'],
          typesNot: ['type 3'],
          contextsSome: ['context 1'],
          contextsAll: ['context 2'],
          contextsNot: ['context 3'],
          issuerDIDIn: ['did 1'],
          issuerDIDNotIn: ['did 2'],
          receivedCredentials: ['vc 1', 'vc 2'],
        },
      },
      context: getVCMetaPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/MetaCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/MetaPerson",
                ],
                "https://schema.bloom.co/receivedCredentials": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Role",
                      "https://schema.bloom.co/ReceivedCredentialRole",
                    ],
                    "https://schema.bloom.co/aggregatorDID": Array [
                      Object {
                        "@value": "did:elem:...",
                      },
                    ],
                    "https://schema.bloom.co/contextsAll": Array [
                      Object {
                        "@value": "context 2",
                      },
                    ],
                    "https://schema.bloom.co/contextsNot": Array [
                      Object {
                        "@value": "context 3",
                      },
                    ],
                    "https://schema.bloom.co/contextsSome": Array [
                      Object {
                        "@value": "context 1",
                      },
                    ],
                    "https://schema.bloom.co/issuerDIDIn": Array [
                      Object {
                        "@value": "did 1",
                      },
                    ],
                    "https://schema.bloom.co/issuerDIDNotIn": Array [
                      Object {
                        "@value": "did 2",
                      },
                    ],
                    "https://schema.bloom.co/receivedCredentials": Array [
                      Object {
                        "@value": "vc 1",
                      },
                      Object {
                        "@value": "vc 2",
                      },
                    ],
                    "https://schema.bloom.co/typesAll": Array [
                      Object {
                        "@value": "type 2",
                      },
                    ],
                    "https://schema.bloom.co/typesNot": Array [
                      Object {
                        "@value": "type 3",
                      },
                    ],
                    "https://schema.bloom.co/typesSome": Array [
                      Object {
                        "@value": "type 1",
                      },
                    ],
                    "https://schema.org/endDate": Array [
                      Object {
                        "@value": "end",
                      },
                    ],
                    "https://schema.org/startDate": Array [
                      Object {
                        "@value": "start",
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

describe('VCMetaOrganizationV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCMetaOrganizationV1, VCSMetaOrganizationV1>({
      type: 'MetaCredentialOrganizationV1',
      data: {
        '@type': ['Organization', 'OrganizationE', 'MetaOrganization'],
        name: 'Bob Belcher',
        receivedCredentials: {
          '@type': ['Role', 'ReceivedCredentialRole'],
          startDate: 'start',
          endDate: 'end',
          aggregatorDID: 'did:elem:...',
          typesSome: ['type 1'],
          typesAll: ['type 2'],
          typesNot: ['type 3'],
          contextsSome: ['context 1'],
          contextsAll: ['context 2'],
          contextsNot: ['context 3'],
          issuerDIDIn: ['did 1'],
          issuerDIDNotIn: ['did 2'],
          receivedCredentials: ['vc 1', 'vc 2'],
        },
      },
      context: getVCMetaOrganizationV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/MetaCredentialOrganizationV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Organization",
                  "https://schema.bloom.co/OrganizationE",
                  "https://schema.bloom.co/MetaOrganization",
                ],
                "https://schema.bloom.co/receivedCredentials": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Role",
                      "https://schema.bloom.co/ReceivedCredentialRole",
                    ],
                    "https://schema.bloom.co/aggregatorDID": Array [
                      Object {
                        "@value": "did:elem:...",
                      },
                    ],
                    "https://schema.bloom.co/contextsAll": Array [
                      Object {
                        "@value": "context 2",
                      },
                    ],
                    "https://schema.bloom.co/contextsNot": Array [
                      Object {
                        "@value": "context 3",
                      },
                    ],
                    "https://schema.bloom.co/contextsSome": Array [
                      Object {
                        "@value": "context 1",
                      },
                    ],
                    "https://schema.bloom.co/issuerDIDIn": Array [
                      Object {
                        "@value": "did 1",
                      },
                    ],
                    "https://schema.bloom.co/issuerDIDNotIn": Array [
                      Object {
                        "@value": "did 2",
                      },
                    ],
                    "https://schema.bloom.co/receivedCredentials": Array [
                      Object {
                        "@value": "vc 1",
                      },
                      Object {
                        "@value": "vc 2",
                      },
                    ],
                    "https://schema.bloom.co/typesAll": Array [
                      Object {
                        "@value": "type 2",
                      },
                    ],
                    "https://schema.bloom.co/typesNot": Array [
                      Object {
                        "@value": "type 3",
                      },
                    ],
                    "https://schema.bloom.co/typesSome": Array [
                      Object {
                        "@value": "type 1",
                      },
                    ],
                    "https://schema.org/endDate": Array [
                      Object {
                        "@value": "end",
                      },
                    ],
                    "https://schema.org/startDate": Array [
                      Object {
                        "@value": "start",
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
