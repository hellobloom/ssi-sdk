import {
  VCNatIDNumPersonV1,
  VCSNatIDNumPersonV1,
  getVCNatIDNumPersonV1Context,
  VCNatIDNumOrganizationV1,
  VCSNatIDNumOrganizationV1,
  getVCNatIDNumOrganizationV1Context,
} from '../../nationalid/v1'
import { expandVC } from '../__fixtures__'

describe('VCNatIDNumPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCNatIDNumPersonV1, VCSNatIDNumPersonV1>({
      type: 'NatIDNumCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'NatIDNumPerson'],
        nationality: {
          '@type': ['Role', 'NationalityRole'],
          identifier: {
            '@type': ['PropertyValue', 'NatPropertyValue'],
            propertyID: 'SSN',
            value: '123-12-1234',
          },
          nationality: {
            '@type': 'Country',
            name: 'United States Of America',
          },
        },
      },
      context: getVCNatIDNumPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/NatIDNumCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/NatIDNumPerson",
                ],
                "https://schema.bloom.co/nationality": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Role",
                      "https://schema.bloom.co/NationalityRole",
                    ],
                    "https://schema.bloom.co/nationality": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Country",
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "United States Of America",
                          },
                        ],
                      },
                    ],
                    "https://schema.org/identifier": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PropertyValue",
                          "https://schema.bloom.co/NatPropertyValue",
                        ],
                        "https://schema.bloom.co/propertyID": Array [
                          Object {
                            "@value": "SSN",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "123-12-1234",
                          },
                        ],
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

describe('VCNatIDNumOrganizationV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCNatIDNumOrganizationV1, VCSNatIDNumOrganizationV1>({
      type: 'NatIDNumCredentialOrganizationV1',
      data: {
        '@type': ['Organization', 'OrganizationE', 'NatIDNumOrganization'],
        nationality: {
          '@type': ['Role', 'NationalityRole'],
          identifier: {
            '@type': ['PropertyValue', 'NatPropertyValue'],
            propertyID: 'Business ID',
            value: '123-123-123',
          },
          nationality: {
            '@type': 'Country',
            name: 'United States Of America',
          },
        },
      },
      context: getVCNatIDNumOrganizationV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/NatIDNumCredentialOrganizationV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Organization",
                  "https://schema.bloom.co/OrganizationE",
                  "https://schema.bloom.co/NatIDNumOrganization",
                ],
                "https://schema.bloom.co/nationality": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/Role",
                      "https://schema.bloom.co/NationalityRole",
                    ],
                    "https://schema.bloom.co/nationality": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Country",
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "United States Of America",
                          },
                        ],
                      },
                    ],
                    "https://schema.org/identifier": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/PropertyValue",
                          "https://schema.bloom.co/NatPropertyValue",
                        ],
                        "https://schema.bloom.co/propertyID": Array [
                          Object {
                            "@value": "Business ID",
                          },
                        ],
                        "https://schema.org/value": Array [
                          Object {
                            "@value": "123-123-123",
                          },
                        ],
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
