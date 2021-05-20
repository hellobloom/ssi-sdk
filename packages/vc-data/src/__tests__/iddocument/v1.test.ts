import { VCIDDocumentPersonV1, VCSIDDocumentPersonV1, getVCIDDocumentPersonV1Context } from '../../iddocument/v1'
import { expandVC } from '../__fixtures__'

describe('VCIDDocumentPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCIDDocumentPersonV1, VCSIDDocumentPersonV1>({
      type: 'IDDocumentCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'IDDocumentPerson'],
        hasIDDocument: {
          '@type': ['Role', 'IDDocumentRole'],
          authenticationResult: 'result',
          tamperResult: 'result',
          selfieImage: 'base64:...',
          faceMatch: {
            '@type': 'IDDocumentFaceMatch',
            isMatch: true,
            score: 100,
            identifier: 1234,
          },
          hasIDDocument: {
            '@type': ['CreativeWork', 'IDDocument'],
            issuer: {
              '@type': 'State',
              name: 'Washington',
            },
            documentType: 'type',
            issueDate: 'date',
            issueType: 'type',
            expirationDate: 'date',
            classificationMethod: 'automatic',
            idClass: 'birth_certificate',
            idClassName: 'className',
            countryCode: 'code',
            frontImage: 'base64:...',
            backImage: 'base64:...',
            generic: true,
            keesingCode: 'code',
          },
        },
        name: 'Bob Belcher',
      },
      context: getVCIDDocumentPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/IDDocumentCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/IDDocumentPerson",
                ],
                "https://schema.bloom.co/hasIDDocument": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Role",
                      "https://schema.bloom.co/IDDocumentRole",
                    ],
                    "https://schema.bloom.co/authenticationResult": Array [
                      Object {
                        "@value": "result",
                      },
                    ],
                    "https://schema.bloom.co/faceMatch": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/IDDocumentFaceMatch",
                        ],
                        "https://schema.bloom.co/isMatch": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/score": Array [
                          Object {
                            "@value": 100,
                          },
                        ],
                        "https://schema.org/identifier": Array [
                          Object {
                            "@value": 1234,
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasIDDocument": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/CreativeWork",
                          "https://schema.bloom.co/IDDocument",
                        ],
                        "https://schema.bloom.co/backImage": Array [
                          Object {
                            "@value": "base64:...",
                          },
                        ],
                        "https://schema.bloom.co/classificationMethod": Array [
                          Object {
                            "@value": "automatic",
                          },
                        ],
                        "https://schema.bloom.co/countryCode": Array [
                          Object {
                            "@value": "code",
                          },
                        ],
                        "https://schema.bloom.co/documentType": Array [
                          Object {
                            "@value": "type",
                          },
                        ],
                        "https://schema.bloom.co/expirationDate": Array [
                          Object {
                            "@value": "date",
                          },
                        ],
                        "https://schema.bloom.co/frontImage": Array [
                          Object {
                            "@value": "base64:...",
                          },
                        ],
                        "https://schema.bloom.co/generic": Array [
                          Object {
                            "@value": true,
                          },
                        ],
                        "https://schema.bloom.co/idClass": Array [
                          Object {
                            "@value": "birth_certificate",
                          },
                        ],
                        "https://schema.bloom.co/idClassName": Array [
                          Object {
                            "@value": "className",
                          },
                        ],
                        "https://schema.bloom.co/issueDate": Array [
                          Object {
                            "@value": "date",
                          },
                        ],
                        "https://schema.bloom.co/issueType": Array [
                          Object {
                            "@value": "type",
                          },
                        ],
                        "https://schema.bloom.co/issuer": Array [
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
                        "https://schema.bloom.co/keesingCode": Array [
                          Object {
                            "@value": "code",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/selfieImage": Array [
                      Object {
                        "@value": "base64:...",
                      },
                    ],
                    "https://schema.bloom.co/tamperResult": Array [
                      Object {
                        "@value": "result",
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
