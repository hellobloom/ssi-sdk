import { IDDocumentPersonV2, VCIDDocumentPersonV2Type, getVCIDDocumentPersonV2Context } from '../../iddocument/v2'
import { expandVCV2 } from '../__fixtures__'

describe('VCIDDocumentPersonV2', () => {
  it('expands correctly', async () => {
    const expanded = await expandVCV2<VCIDDocumentPersonV2Type, IDDocumentPersonV2>({
      type: 'IDDocumentCredentialPersonV2',
      data: {
        '@type': 'IDDocumentPerson',
        hasIDDocument: {
          '@type': 'IDDocumentRole',
          authenticationResult: '...',
          tamperResult: '...',
          selfieImage: 'base64:...',
          faceMatch: {
            '@type': 'IDDocumentMatch',
            isMatch: true,
            score: 100,
            transactionId: '123',
            criteria: 'face',
          },
          hasIDDocument: {
            '@type': 'IDDocument',
            issuer: {
              '@type': 'IDDocumentIssuer',
              name: 'New Jersey',
              id: '123',
            },
            documentType: 'doc-type',
            issueDate: '2021-10-27T23:36:52.781Z',
            expirationDate: '2021-10-27T23:36:52.781Z',
            idClass: 'drivers_license',
            idClassName: 'class-name',
            countryCode: 'USA',
            frontImage: 'base64:...',
            backImage: 'base64:...',
            generic: true,
            keesingCode: '...',
          },
        },
      },
      context: getVCIDDocumentPersonV2Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/IDDocumentCredentialPersonV2",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.bloom.co/IDDocumentPerson",
                ],
                "https://schema.bloom.co/hasIDDocument": Array [
                  Object {
                    "@type": Array [
                      "https://schema.bloom.co/IDDocumentRole",
                    ],
                    "https://schema.bloom.co/authenticationResult": Array [
                      Object {
                        "@value": "...",
                      },
                    ],
                    "https://schema.bloom.co/faceMatch": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/IDDocumentMatch",
                        ],
                        "https://schema.bloom.co/criteria": Array [
                          Object {
                            "@value": "face",
                          },
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
                        "https://schema.bloom.co/transactionId": Array [
                          Object {
                            "@value": "123",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/hasIDDocument": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/IDDocument",
                        ],
                        "https://schema.bloom.co/backImage": Array [
                          Object {
                            "@value": "base64:...",
                          },
                        ],
                        "https://schema.bloom.co/countryCode": Array [
                          Object {
                            "@value": "USA",
                          },
                        ],
                        "https://schema.bloom.co/documentType": Array [
                          Object {
                            "@value": "doc-type",
                          },
                        ],
                        "https://schema.bloom.co/expirationDate": Array [
                          Object {
                            "@value": "2021-10-27T23:36:52.781Z",
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
                            "@value": "drivers_license",
                          },
                        ],
                        "https://schema.bloom.co/idClassName": Array [
                          Object {
                            "@value": "class-name",
                          },
                        ],
                        "https://schema.bloom.co/issueDate": Array [
                          Object {
                            "@value": "2021-10-27T23:36:52.781Z",
                          },
                        ],
                        "https://schema.bloom.co/issuer": Array [
                          Object {
                            "@type": Array [
                              "https://schema.bloom.co/IDDocumentIssuer",
                            ],
                            "https://schema.bloom.co/id": Array [
                              Object {
                                "@value": "123",
                              },
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "New Jersey",
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/keesingCode": Array [
                          Object {
                            "@value": "...",
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
                        "@value": "...",
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
