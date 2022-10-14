import { L } from 'ts-toolbelt'

import { createSubjectContext, createContextConfig, MergeSubjects, createContext, CreateVCType } from '../../util/v2'
import { expandVCV2 } from '../__fixtures__'

describe('createSubjectContext', () => {
  test('builds the correct context', () => {
    const context = createSubjectContext<{ '@type': 'Thing'; prop1: string; prop2: number }>({
      type: 'Thing',
      base: 'schema',
      properties: {
        prop1: 'bloomSchema',
        prop2: 'bloomSchema',
      },
    })

    expect(context).toMatchInlineSnapshot(`
      Object {
        "Thing": Object {
          "@context": Object {
            "@protected": true,
            "@version": 1.1,
            "prop1": "https://schema.bloom.co/prop1",
            "prop2": "https://schema.bloom.co/prop2",
          },
          "@id": "https://schema.org/Thing",
        },
      }
    `)
  })
})

describe('createContextConfig', () => {
  test('builds the correct context with no duplicated subjects', () => {
    const thingSubject = createSubjectContext<{ '@type': 'Thing'; prop1: string }>({
      type: 'Thing',
      base: 'schema',
      properties: {
        prop1: 'bloomSchema',
      },
    })

    const otherSubject = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
      type: 'Other',
      base: 'bloomSchema',
      properties: {
        prop2: 'bloomSchema',
      },
    })

    const contextConfig = createContextConfig<'CustomCredential'>({
      type: 'CustomCredential',
      subjects: [thingSubject, otherSubject],
    })

    expect(contextConfig).toMatchInlineSnapshot(`
      Object {
        "subject": Object {
          "Other": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
              "prop2": "https://schema.bloom.co/prop2",
            },
            "@id": "https://schema.bloom.co/Other",
          },
          "Thing": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
              "prop1": "https://schema.bloom.co/prop1",
            },
            "@id": "https://schema.org/Thing",
          },
        },
        "vc": Object {
          "CustomCredential": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/CustomCredential",
          },
        },
      }
    `)
  })

  test('builds the correct context with duplicated subjects', () => {
    const otherSubject = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
      type: 'Other',
      base: 'bloomSchema',
      properties: {
        prop2: 'bloomSchema',
      },
    })

    const otherSubjectCopy = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
      type: 'Other',
      base: 'bloomSchema',
      properties: {
        prop2: 'bloomSchema',
      },
    })

    const config = createContextConfig<'CustomCredential'>({
      type: 'CustomCredential',
      subjects: [otherSubject, otherSubjectCopy],
    })

    expect(config).toMatchInlineSnapshot(`
      Object {
        "subject": Object {
          "Other": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
              "prop2": "https://schema.bloom.co/prop2",
            },
            "@id": "https://schema.bloom.co/Other",
          },
        },
        "vc": Object {
          "CustomCredential": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/CustomCredential",
          },
        },
      }
    `)
  })

  describe('fails with overloaded subjects', () => {
    test('with mismatched ids', () => {
      const otherSubject = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
        type: 'Other',
        base: 'bloomSchema',
        properties: {
          prop2: 'bloomSchema',
        },
      })

      const otherSubjectCopy = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
        type: 'Other',
        base: 'schema',
        properties: {
          prop2: 'bloomSchema',
        },
      })

      expect(() => {
        createContextConfig<'CustomCredential'>({
          type: 'CustomCredential',
          subjects: [otherSubject, otherSubjectCopy],
        })
      }).toThrowErrorMatchingInlineSnapshot('"Type Other is already defined in this context"')
    })

    test('mismatched properties', () => {
      const otherSubject = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
        type: 'Other',
        base: 'bloomSchema',
        properties: {
          prop2: 'schema',
        },
      })

      const otherSubjectCopy = createSubjectContext<{ '@type': 'Other'; prop2: string }>({
        type: 'Other',
        base: 'bloomSchema',
        properties: {
          prop2: 'bloomSchema',
        },
      })

      expect(() => {
        createContextConfig<'CustomCredential'>({
          type: 'CustomCredential',
          subjects: [otherSubject, otherSubjectCopy],
        })
      }).toThrowErrorMatchingInlineSnapshot('"Type Other is already defined in this context"')
    })
  })
})

describe('createContext', () => {
  test('builds correct context for single VC type', async () => {
    type Thing = {
      '@type': 'Thing'
      prop1: string
    }

    type CustomCredential = 'CustomCredential'
    type CustomCredentialSubject = Thing

    const thingSubject = createSubjectContext<Thing>({
      type: 'Thing',
      base: 'schema',
      properties: {
        prop1: 'bloomSchema',
      },
    })

    const context = createContext(
      createContextConfig<CustomCredential>({
        type: 'CustomCredential',
        subjects: [thingSubject],
      }),
    )

    expect(context).toMatchInlineSnapshot(`
      Object {
        "CustomCredential": Object {
          "@context": Object {
            "@protected": true,
            "@version": 1.1,
          },
          "@id": "https://schema.bloom.co/CustomCredential",
        },
        "data": Object {
          "@context": Array [
            null,
            Object {
              "@protected": true,
              "@version": 1.1,
              "Thing": Object {
                "@context": Object {
                  "@protected": true,
                  "@version": 1.1,
                  "prop1": "https://schema.bloom.co/prop1",
                },
                "@id": "https://schema.org/Thing",
              },
            },
          ],
          "@id": "https://schema.bloom.co/data",
        },
      }
    `)

    const result = await expandVCV2<CustomCredential, CustomCredentialSubject>({
      type: 'CustomCredential',
      data: {
        '@type': 'Thing',
        prop1: 'value',
      },
      context,
    })

    expect(result).toMatchInlineSnapshot(`
      Object {
        "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        "@type": Array [
          "https://www.w3.org/2018/credentials#VerifiableCredential",
          "https://schema.bloom.co/CustomCredential",
        ],
        "https://www.w3.org/2018/credentials#credentialSubject": Array [
          Object {
            "https://schema.bloom.co/data": Array [
              Object {
                "@type": Array [
                  "https://schema.org/Thing",
                ],
                "https://schema.bloom.co/prop1": Array [
                  Object {
                    "@value": "value",
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

  describe('builds correct context for multiple VC types', () => {
    test('with out duplicated subjects', async () => {
      type FirstCredSubject = {
        '@type': 'FirstCredSubject'
        prop1: string
      }
      type FirstCredType = 'FirstCred'
      const firstCredSubject = createSubjectContext<FirstCredSubject>({
        type: 'FirstCredSubject',
        base: 'bloomSchema',
        properties: {
          prop1: 'bloomSchema',
        },
      })
      const firstCredContextConfig = createContextConfig<FirstCredType>({
        type: 'FirstCred',
        subjects: [firstCredSubject],
      })

      type SecondCredSubject = {
        '@type': 'SecondCredSubject'
        prop2: string
      }
      type SecondCredType = 'SecondCred'
      const secondCredSubject = createSubjectContext<SecondCredSubject>({
        type: 'SecondCredSubject',
        base: 'bloomSchema',
        properties: {
          prop2: 'bloomSchema',
        },
      })
      const secondCredContextConfig = createContextConfig<SecondCredType>({
        type: 'SecondCred',
        subjects: [secondCredSubject],
      })

      type MergedCredentialSubject = MergeSubjects<FirstCredSubject, SecondCredSubject, ['FirstCredSubject', 'SecondCredSubject']>
      type MergedCredential = CreateVCType<[FirstCredType, SecondCredType], MergedCredentialSubject>

      const context = createContext(firstCredContextConfig, secondCredContextConfig)

      expect(context).toMatchInlineSnapshot(`
        Object {
          "FirstCred": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/FirstCred",
          },
          "SecondCred": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/SecondCred",
          },
          "data": Object {
            "@context": Array [
              null,
              Object {
                "@protected": true,
                "@version": 1.1,
                "FirstCredSubject": Object {
                  "@context": Object {
                    "@protected": true,
                    "@version": 1.1,
                    "prop1": "https://schema.bloom.co/prop1",
                  },
                  "@id": "https://schema.bloom.co/FirstCredSubject",
                },
                "SecondCredSubject": Object {
                  "@context": Object {
                    "@protected": true,
                    "@version": 1.1,
                    "prop2": "https://schema.bloom.co/prop2",
                  },
                  "@id": "https://schema.bloom.co/SecondCredSubject",
                },
              },
            ],
            "@id": "https://schema.bloom.co/data",
          },
        }
      `)

      const result = await expandVCV2<L.Tail<MergedCredential['type']>, MergedCredentialSubject>({
        type: ['FirstCred', 'SecondCred'],
        data: {
          '@type': ['FirstCredSubject', 'SecondCredSubject'],
          prop1: 'value',
          prop2: 'value',
        },
        context,
      })

      expect(result).toMatchInlineSnapshot(`
        Object {
          "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          "@type": Array [
            "https://www.w3.org/2018/credentials#VerifiableCredential",
            "https://schema.bloom.co/FirstCred",
            "https://schema.bloom.co/SecondCred",
          ],
          "https://www.w3.org/2018/credentials#credentialSubject": Array [
            Object {
              "https://schema.bloom.co/data": Array [
                Object {
                  "@type": Array [
                    "https://schema.bloom.co/FirstCredSubject",
                    "https://schema.bloom.co/SecondCredSubject",
                  ],
                  "https://schema.bloom.co/prop1": Array [
                    Object {
                      "@value": "value",
                    },
                  ],
                  "https://schema.bloom.co/prop2": Array [
                    Object {
                      "@value": "value",
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

    test('with duplicated subjects', async () => {
      type SharedCredSubject = {
        '@type': 'SharedCredSubject'
        prop1: string
      }
      const sharedCredSubject = createSubjectContext<SharedCredSubject>({
        type: 'SharedCredSubject',
        base: 'bloomSchema',
        properties: {
          prop1: 'bloomSchema',
        },
      })

      type FirstCredType = 'FirstCred'
      const firstCredContextConfig = createContextConfig<FirstCredType>({
        type: 'FirstCred',
        subjects: [sharedCredSubject],
      })

      type SecondCredType = 'SecondCred'
      const secondCredContextConfig = createContextConfig<SecondCredType>({
        type: 'SecondCred',
        subjects: [sharedCredSubject],
      })

      type MergedCredential = CreateVCType<[FirstCredType, SecondCredType], SharedCredSubject>

      const context = createContext(firstCredContextConfig, secondCredContextConfig)

      expect(context).toMatchInlineSnapshot(`
        Object {
          "FirstCred": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/FirstCred",
          },
          "SecondCred": Object {
            "@context": Object {
              "@protected": true,
              "@version": 1.1,
            },
            "@id": "https://schema.bloom.co/SecondCred",
          },
          "data": Object {
            "@context": Array [
              null,
              Object {
                "@protected": true,
                "@version": 1.1,
                "SharedCredSubject": Object {
                  "@context": Object {
                    "@protected": true,
                    "@version": 1.1,
                    "prop1": "https://schema.bloom.co/prop1",
                  },
                  "@id": "https://schema.bloom.co/SharedCredSubject",
                },
              },
            ],
            "@id": "https://schema.bloom.co/data",
          },
        }
      `)

      const result = await expandVCV2<L.Tail<MergedCredential['type']>, SharedCredSubject>({
        type: ['FirstCred', 'SecondCred'],
        data: {
          '@type': 'SharedCredSubject',
          prop1: 'value',
        },
        context,
      })

      expect(result).toMatchInlineSnapshot(`
        Object {
          "@id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          "@type": Array [
            "https://www.w3.org/2018/credentials#VerifiableCredential",
            "https://schema.bloom.co/FirstCred",
            "https://schema.bloom.co/SecondCred",
          ],
          "https://www.w3.org/2018/credentials#credentialSubject": Array [
            Object {
              "https://schema.bloom.co/data": Array [
                Object {
                  "@type": Array [
                    "https://schema.bloom.co/SharedCredSubject",
                  ],
                  "https://schema.bloom.co/prop1": Array [
                    Object {
                      "@value": "value",
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

  describe('fails with overloaded subjects', () => {
    test('with mismatched ids', () => {
      type FirstCredSubject = {
        '@type': 'FirstCredSubject'
        prop1: string
      }
      type FirstCredType = 'FirstCred'
      const firstCredSubject = createSubjectContext<FirstCredSubject>({
        type: 'FirstCredSubject',
        base: 'bloomSchema',
        properties: {
          prop1: 'bloomSchema',
        },
      })
      const firstCredContextConfig = createContextConfig<FirstCredType>({
        type: 'FirstCred',
        subjects: [firstCredSubject],
      })

      type SecondCredSubject = {
        '@type': 'FirstCredSubject'
        prop1: string
      }
      type SecondCredType = 'SecondCred'
      const secondCredSubject = createSubjectContext<SecondCredSubject>({
        type: 'FirstCredSubject',
        base: 'schema',
        properties: {
          prop1: 'bloomSchema',
        },
      })
      const secondCredContextConfig = createContextConfig<SecondCredType>({
        type: 'SecondCred',
        subjects: [secondCredSubject],
      })

      expect(() => {
        createContext(firstCredContextConfig, secondCredContextConfig)
      }).toThrowErrorMatchingInlineSnapshot('"Type FirstCredSubject is already defined in this context"')
    })

    test('with mismatched properties', () => {
      type FirstCredSubject = {
        '@type': 'FirstCredSubject'
        prop1: string
      }
      type FirstCredType = 'FirstCred'
      const firstCredSubject = createSubjectContext<FirstCredSubject>({
        type: 'FirstCredSubject',
        base: 'bloomSchema',
        properties: {
          prop1: 'bloomSchema',
        },
      })
      const firstCredContextConfig = createContextConfig<FirstCredType>({
        type: 'FirstCred',
        subjects: [firstCredSubject],
      })

      type SecondCredSubject = {
        '@type': 'FirstCredSubject'
        prop2: string
      }
      type SecondCredType = 'SecondCred'
      const secondCredSubject = createSubjectContext<SecondCredSubject>({
        type: 'FirstCredSubject',
        base: 'bloomSchema',
        properties: {
          prop2: 'bloomSchema',
        },
      })
      const secondCredContextConfig = createContextConfig<SecondCredType>({
        type: 'SecondCred',
        subjects: [secondCredSubject],
      })

      expect(() => {
        createContext(firstCredContextConfig, secondCredContextConfig)
      }).toThrowErrorMatchingInlineSnapshot('"Type FirstCredSubject is already defined in this context"')
    })
  })

  test('fails with overloaded VC type', () => {
    type FirstCredSubject = {
      '@type': 'FirstCredSubject'
      prop1: string
    }
    type FirstCredType = 'FirstCred'
    const firstCredSubject = createSubjectContext<FirstCredSubject>({
      type: 'FirstCredSubject',
      base: 'bloomSchema',
      properties: {
        prop1: 'bloomSchema',
      },
    })
    const firstCredContextConfig = createContextConfig<FirstCredType>({
      type: 'FirstCred',
      subjects: [firstCredSubject],
    })

    type SecondCredSubject = {
      '@type': 'SecondCredSubject'
      prop2: string
    }
    type SecondCredType = 'FirstCred'
    const secondCredSubject = createSubjectContext<SecondCredSubject>({
      type: 'SecondCredSubject',
      base: 'bloomSchema',
      properties: {
        prop2: 'bloomSchema',
      },
    })
    const secondCredContextConfig = createContextConfig<SecondCredType>({
      type: 'FirstCred',
      subjects: [secondCredSubject],
    })

    expect(() => {
      createContext(firstCredContextConfig, secondCredContextConfig)
    }).toThrowErrorMatchingInlineSnapshot('"Type FirstCred is already defined in this context"')
  })
})
