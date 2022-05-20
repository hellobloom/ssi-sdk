import { IdentityPersonV2, VCIdentityPersonV2Type, getVCIdentityPersonV2Context } from '../../identity/v2'
import { expandVCV2 } from '../__fixtures__'

describe('VCIdentityPersonV2', () => {
  it('expands correctly', async () => {
    const expanded = await expandVCV2<VCIdentityPersonV2Type, IdentityPersonV2>({
      type: 'IdentityCredentialPersonV2',
      data: {
        '@type': 'IdentityPerson',
        additionalName: 'foobar',
        birthDate: 'foobar',
        email: 'foobar',
        familyName: 'foobar',
        gender: 'foobar',
        givenName: 'foobar',
        name: 'foobar',
        nationality: 'foobar',

        address: {
          '@type': 'PostalAddress',
        },
        hasIdentityCheck: {
          '@type': 'IdentityCheck',
          status: 'success',
          addressCheck: {
            '@type': 'AddressCheck',
            status: 'match',
          },
        },
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'ssn',
          value: '333-33-3333',
        },
      },
      context: getVCIdentityPersonV2Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/IdentityCredentialPersonV2",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/IdentityPerson",
                ],
                "https://schema.bloom.co/hasIdentityCheck": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/IdentityCheck",
                    ],
                    "https://schema.bloom.co/addressCheck": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/AddressCheck",
                        ],
                        "https://schema.bloom.co/status": Array [
                          Object {
                            "@value": "match",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/status": Array [
                      Object {
                        "@value": "success",
                      },
                    ],
                  },
                ],
                "https://schema.org/additionalName": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/address": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/PostalAddress",
                    ],
                  },
                ],
                "https://schema.org/birthDate": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/email": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/familyName": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/gender": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/givenName": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/identifier": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/PropertyValue",
                    ],
                    "https://schema.org/propertyID": Array [
                      Object {
                        "@value": "ssn",
                      },
                    ],
                    "https://schema.org/value": Array [
                      Object {
                        "@value": "333-33-3333",
                      },
                    ],
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "foobar",
                  },
                ],
                "https://schema.org/nationality": Array [
                  Object {
                    "@value": "foobar",
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
