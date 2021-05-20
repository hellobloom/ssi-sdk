import {
  VCEmploymentPersonV1,
  VCSEmploymentPersonV1,
  getVCEmploymentPersonV1Context,
  VCEmploymentOrganizationV1,
  VCSEmploymentOrganizationV1,
  getVCEmploymentOrganizationV1Context,
} from '../../employment/v1'
import { expandVC } from '../__fixtures__'

describe('VCEmploymentPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCEmploymentPersonV1, VCSEmploymentPersonV1>({
      type: 'EmploymentCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'EmploymentPerson'],
        worksFor: {
          '@type': ['EmployeeRole', 'PersonEmployeeRoleE'],
          reference: {
            '@type': 'ContactPoint',
            name: 'Linda Belcher',
            email: 'lindabelcher@gmail.com',
          },
          skills: ['burger', 'fries'],
          offerLetter: 'https://google.com',
          experienceLetter: 'https://google.com',
          worksFor: {
            '@type': ['Organization', 'OrganizationE'],
            name: "Bob's Burgers",
          },
          salary: {
            '@type': 'Salary',
            gross: {
              '@type': 'MonetaryAmount',
              value: 10000,
              currency: 'INR',
            },
            net: {
              '@type': 'MonetaryAmount',
              value: 8000,
              currency: 'INR',
            },
            frequency: 'Monthly',
          },
        },
        name: 'Bob Belcher',
      },
      context: getVCEmploymentPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/EmploymentCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/EmploymentPerson",
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Bob Belcher",
                  },
                ],
                "https://schema.org/worksFor": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/EmployeeRole",
                      "https://schema.bloom.co/PersonEmployeeRoleE",
                    ],
                    "https://schema.bloom.co/experienceLetter": Array [
                      Object {
                        "@value": "https://google.com",
                      },
                    ],
                    "https://schema.bloom.co/offerLetter": Array [
                      Object {
                        "@value": "https://google.com",
                      },
                    ],
                    "https://schema.bloom.co/reference": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/ContactPoint",
                        ],
                        "https://schema.org/email": Array [
                          Object {
                            "@value": "lindabelcher@gmail.com",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "Linda Belcher",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/salary": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/Salary",
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "Monthly",
                          },
                        ],
                        "https://schema.bloom.co/gross": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "INR",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": 10000,
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/net": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "INR",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": 8000,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/skills": Array [
                      Object {
                        "@value": "burger",
                      },
                      Object {
                        "@value": "fries",
                      },
                    ],
                    "https://schema.org/worksFor": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Organization",
                          "https://schema.bloom.co/OrganizationE",
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "Bob's Burgers",
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
  it('Reference can be an array', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCEmploymentPersonV1, VCSEmploymentPersonV1>({
      type: 'EmploymentCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'EmploymentPerson'],
        worksFor: {
          '@type': ['EmployeeRole', 'PersonEmployeeRoleE'],
          reference: [
            {
              '@type': 'ContactPoint',
              name: 'Linda Belcher',
              email: 'lindabelcher@gmail.com',
            },
            {
              '@type': 'ContactPoint',
              name: 'Gene Belcher',
              email: 'genebelcher@gmail.com',
            },
          ],
          skills: ['burger', 'fries'],
          offerLetter: 'https://google.com',
          experienceLetter: 'https://google.com',
          worksFor: {
            '@type': ['Organization', 'OrganizationE'],
            name: "Bob's Burgers",
          },
          salary: {
            '@type': 'Salary',
            gross: {
              '@type': 'MonetaryAmount',
              value: 10000,
              currency: 'INR',
            },
            net: {
              '@type': 'MonetaryAmount',
              value: 8000,
              currency: 'INR',
            },
            frequency: 'Monthly',
          },
        },
        name: 'Bob Belcher',
      },
      context: getVCEmploymentPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/EmploymentCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/EmploymentPerson",
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Bob Belcher",
                  },
                ],
                "https://schema.org/worksFor": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/EmployeeRole",
                      "https://schema.bloom.co/PersonEmployeeRoleE",
                    ],
                    "https://schema.bloom.co/experienceLetter": Array [
                      Object {
                        "@value": "https://google.com",
                      },
                    ],
                    "https://schema.bloom.co/offerLetter": Array [
                      Object {
                        "@value": "https://google.com",
                      },
                    ],
                    "https://schema.bloom.co/reference": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/ContactPoint",
                        ],
                        "https://schema.org/email": Array [
                          Object {
                            "@value": "lindabelcher@gmail.com",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "Linda Belcher",
                          },
                        ],
                      },
                      Object {
                        "@type": Array [
                          "https://schema.org/ContactPoint",
                        ],
                        "https://schema.org/email": Array [
                          Object {
                            "@value": "genebelcher@gmail.com",
                          },
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "Gene Belcher",
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/salary": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/Salary",
                        ],
                        "https://schema.bloom.co/frequency": Array [
                          Object {
                            "@value": "Monthly",
                          },
                        ],
                        "https://schema.bloom.co/gross": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "INR",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": 10000,
                              },
                            ],
                          },
                        ],
                        "https://schema.bloom.co/net": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/MonetaryAmount",
                            ],
                            "https://schema.org/currency": Array [
                              Object {
                                "@value": "INR",
                              },
                            ],
                            "https://schema.org/value": Array [
                              Object {
                                "@value": 8000,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    "https://schema.bloom.co/skills": Array [
                      Object {
                        "@value": "burger",
                      },
                      Object {
                        "@value": "fries",
                      },
                    ],
                    "https://schema.org/worksFor": Array [
                      Object {
                        "@type": Array [
                          "https://schema.org/Organization",
                          "https://schema.bloom.co/OrganizationE",
                        ],
                        "https://schema.org/name": Array [
                          Object {
                            "@value": "Bob's Burgers",
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

describe('VCEmploymentOrganizationV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCEmploymentOrganizationV1, VCSEmploymentOrganizationV1>({
      type: 'EmploymentCredentialOrganizationV1',
      data: {
        '@type': ['Organization', 'OrganizationE', 'EmploymentOrganization'],
        member: {
          '@type': ['EmployeeRole', 'OrganizationEmployeeRole'],
          member: {
            '@type': ['Person', 'PersonE'],
            name: 'Bob Belcher',
          },
        },
        name: "Bob's Burgers",
      },
      context: getVCEmploymentOrganizationV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/EmploymentCredentialOrganizationV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Organization",
                  "https://schema.bloom.co/OrganizationE",
                  "https://schema.bloom.co/EmploymentOrganization",
                ],
                "https://schema.org/member": Array [
                  Object {
                    "@type": Array [
                      "https://schema.org/EmployeeRole",
                      "https://schema.bloom.co/OrganizationEmployeeRole",
                    ],
                    "https://schema.org/member": Array [
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
                  },
                ],
                "https://schema.org/name": Array [
                  Object {
                    "@value": "Bob's Burgers",
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
