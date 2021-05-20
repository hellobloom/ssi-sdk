import { VCEmploymentOfferPersonV1, VCSEmploymentOfferPersonV1, getVCEmploymentOfferPersonV1Context } from '../../employmentOffer/v1'
import { expandVC } from '../__fixtures__'

describe('VCEmploymentOfferPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCEmploymentOfferPersonV1, VCSEmploymentOfferPersonV1>({
      type: 'EmploymentOfferCredentialPersonV1',
      data: {
        '@type': ['Person', 'PersonE', 'EmploymentOfferPerson'],
        worksFor: {
          '@type': ['EmployeeRole', 'PersonEmployeeRoleE', 'PersonEmployeeCandidateRoleE'],
          expectedStartDate: '2022-04-21T20:00',
          offerDate: '2022-04-20T20:00',
          interview: {
            '@type': 'EmploymentInterview',
            interviewer: {
              '@type': 'ContactPoint',
              name: 'Tina Belcher',
              email: 'tinabelcher@gmail.com',
            },
            date: '2022-01-21T20:00',
            location: {
              '@type': 'PostalAddress',
              addressLocality: 'Denver',
              addressRegion: 'CO',
              postalCode: '80209',
              streetAddress: '7 S. Broadway',
            },
          },
          reference: {
            '@type': 'ContactPoint',
            name: 'Linda Belcher',
            email: 'lindabelcher@gmail.com',
          },
          skills: ['burger', 'fries'],
          worksFor: {
            '@type': ['Organization', 'OrganizationE'],
            name: "Bob's Burgers",
          },
        },
        name: 'Bob Belcher',
      },
      context: getVCEmploymentOfferPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/EmploymentOfferCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Person",
                  "https://schema.bloom.co/PersonE",
                  "https://schema.bloom.co/EmploymentOfferPerson",
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
                      "https://schema.org/PersonEmployeeRoleE",
                      "https://schema.bloom.co/PersonEmployeeCandidateRoleE",
                    ],
                    "https://schema.bloom.co/expectedStartDate": Array [
                      Object {
                        "@value": "2022-04-21T20:00",
                      },
                    ],
                    "https://schema.bloom.co/interview": Array [
                      Object {
                        "@type": Array [
                          "https://schema.bloom.co/EmploymentInterview",
                        ],
                        "https://schema.bloom.co/interviewer": Array [
                          Object {
                            "@type": Array [
                              "https://schema.org/ContactPoint",
                            ],
                            "https://schema.org/email": Array [
                              Object {
                                "@value": "tinabelcher@gmail.com",
                              },
                            ],
                            "https://schema.org/name": Array [
                              Object {
                                "@value": "Tina Belcher",
                              },
                            ],
                          },
                        ],
                        "https://schema.org/date": Array [
                          Object {
                            "@value": "2022-01-21T20:00",
                          },
                        ],
                        "https://schema.org/location": Array [
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
                      },
                    ],
                    "https://schema.org/offerDate": Array [
                      Object {
                        "@value": "2022-04-20T20:00",
                      },
                    ],
                    "https://schema.org/reference": Array [
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
                    "https://schema.org/skills": Array [
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
