import { R4 } from '@ahryman40k/ts-fhir-types'

import {
  VCInsuranceAccountPersonV1,
  VCSInsuranceAccountCoverageV1,
  VCSInsuranceAccountPatientV1,
  getVCInsuranceAccountPersonV1Context,
} from '../../insuranceaccount/v1'
import { expandVC } from '../__fixtures__'

describe('VCInsuranceAccountPersonV1', () => {
  it('expands correctly', async () => {
    expect.assertions(1)

    const expanded = await expandVC<VCInsuranceAccountPersonV1, VCSInsuranceAccountCoverageV1 | VCSInsuranceAccountPatientV1>({
      type: 'InsuranceAccountCredentialPersonV1',
      data: [
        {
          '@type': 'Coverage',
          resourceType: 'Coverage',
          identifier: [{ id: '1234', use: R4.IdentifierUseKind._usual }],
          status: 'status',
          type: { id: '1234', coding: [{ system: 'sys' }] }, // This is invalid
          subscriberId: '1234',
          payor: [{ id: '1234' }],
          beneficiary: { id: '1234' },
          period: { start: 'start date', end: 'end date' },

          order: 1234,
          policyHolder: { id: '1234' },
          dependent: 'dep',
          relationship: { id: '1234', coding: [{ system: 'sys' }] },
          class: [{ type: { id: '1234', coding: [{ system: 'sys' }] } }],
          network: 'net',
          costToBeneficiary: [{ valueMoney: { value: 1000, currency: 'USD' } }],
          contract: [{ id: '1234' }],
        },
        {
          '@type': 'Patient',
          resourceType: 'Patient',
          identifier: [{ id: '1234', use: R4.IdentifierUseKind._usual }],

          active: true,
          name: [{ family: 'Belcher', given: ['Bob'] }],
          gender: R4.PatientGenderKind._male,
          birthDate: 'date',
          telecom: [{ value: '555 555 5555' }],
          address: [{ line: ['123 Main St'], city: 'City', state: 'State' }],
          contact: [{ name: { family: 'Belcher', given: ['Linda'] }, telecom: [{ value: '555 555 5555' }] }],
          communication: [{ language: { id: '1234', coding: [{ system: 'sys' }] } }],
        },
      ],
      context: getVCInsuranceAccountPersonV1Context(),
    })

    expect(expanded).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/InsuranceAccountCredentialPersonV1",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "http://hl7.org/fhir/Coverage",
                ],
                "http://hl7.org/fhir/beneficiary": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/class": Array [
                  Object {
                    "http://hl7.org/fhir/type": Array [
                      Object {
                        "http://hl7.org/fhir/coding": Array [
                          Object {
                            "http://hl7.org/fhir/system": Array [
                              Object {
                                "@value": "sys",
                              },
                            ],
                          },
                        ],
                        "http://hl7.org/fhir/id": Array [
                          Object {
                            "@value": "1234",
                          },
                        ],
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/contract": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/costToBeneficiary": Array [
                  Object {
                    "http://hl7.org/fhir/valueMoney": Array [
                      Object {
                        "http://hl7.org/fhir/currency": Array [
                          Object {
                            "@value": "USD",
                          },
                        ],
                        "http://hl7.org/fhir/value": Array [
                          Object {
                            "@value": 1000,
                          },
                        ],
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/dependent": Array [
                  Object {
                    "@value": "dep",
                  },
                ],
                "http://hl7.org/fhir/identifier": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "http://hl7.org/fhir/use": Array [
                      Object {
                        "@value": "usual",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/network": Array [
                  Object {
                    "@value": "net",
                  },
                ],
                "http://hl7.org/fhir/order": Array [
                  Object {
                    "@value": 1234,
                  },
                ],
                "http://hl7.org/fhir/payor": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/period": Array [
                  Object {
                    "http://hl7.org/fhir/end": Array [
                      Object {
                        "@value": "end date",
                      },
                    ],
                    "http://hl7.org/fhir/start": Array [
                      Object {
                        "@value": "start date",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/policyHolder": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/relationship": Array [
                  Object {
                    "http://hl7.org/fhir/coding": Array [
                      Object {
                        "http://hl7.org/fhir/system": Array [
                          Object {
                            "@value": "sys",
                          },
                        ],
                      },
                    ],
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/resourceType": Array [
                  Object {
                    "@value": "Coverage",
                  },
                ],
                "http://hl7.org/fhir/status": Array [
                  Object {
                    "@value": "status",
                  },
                ],
                "http://hl7.org/fhir/subscriberId": Array [
                  Object {
                    "@value": "1234",
                  },
                ],
                "http://hl7.org/fhir/type": Array [
                  Object {
                    "http://hl7.org/fhir/coding": Array [
                      Object {
                        "http://hl7.org/fhir/system": Array [
                          Object {
                            "@value": "sys",
                          },
                        ],
                      },
                    ],
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "http://hl7.org/fhir/Patient",
                ],
                "http://hl7.org/fhir/active": Array [
                  Object {
                    "@value": true,
                  },
                ],
                "http://hl7.org/fhir/address": Array [
                  Object {
                    "http://hl7.org/fhir/city": Array [
                      Object {
                        "@value": "City",
                      },
                    ],
                    "http://hl7.org/fhir/line": Array [
                      Object {
                        "@value": "123 Main St",
                      },
                    ],
                    "http://hl7.org/fhir/state": Array [
                      Object {
                        "@value": "State",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/birthDate": Array [
                  Object {
                    "@value": "date",
                  },
                ],
                "http://hl7.org/fhir/communication": Array [
                  Object {
                    "http://hl7.org/fhir/language": Array [
                      Object {
                        "http://hl7.org/fhir/coding": Array [
                          Object {
                            "http://hl7.org/fhir/system": Array [
                              Object {
                                "@value": "sys",
                              },
                            ],
                          },
                        ],
                        "http://hl7.org/fhir/id": Array [
                          Object {
                            "@value": "1234",
                          },
                        ],
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/contact": Array [
                  Object {
                    "http://hl7.org/fhir/name": Array [
                      Object {
                        "http://hl7.org/fhir/family": Array [
                          Object {
                            "@value": "Belcher",
                          },
                        ],
                        "http://hl7.org/fhir/given": Array [
                          Object {
                            "@value": "Linda",
                          },
                        ],
                      },
                    ],
                    "http://hl7.org/fhir/telecom": Array [
                      Object {
                        "http://hl7.org/fhir/value": Array [
                          Object {
                            "@value": "555 555 5555",
                          },
                        ],
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/gender": Array [
                  Object {
                    "@value": "male",
                  },
                ],
                "http://hl7.org/fhir/identifier": Array [
                  Object {
                    "http://hl7.org/fhir/id": Array [
                      Object {
                        "@value": "1234",
                      },
                    ],
                    "http://hl7.org/fhir/use": Array [
                      Object {
                        "@value": "usual",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/name": Array [
                  Object {
                    "http://hl7.org/fhir/family": Array [
                      Object {
                        "@value": "Belcher",
                      },
                    ],
                    "http://hl7.org/fhir/given": Array [
                      Object {
                        "@value": "Bob",
                      },
                    ],
                  },
                ],
                "http://hl7.org/fhir/resourceType": Array [
                  Object {
                    "@value": "Patient",
                  },
                ],
                "http://hl7.org/fhir/telecom": Array [
                  Object {
                    "http://hl7.org/fhir/value": Array [
                      Object {
                        "@value": "555 555 5555",
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
