import { combineContextEntries, ExpandThing, SimpleThing } from '../../util'
import { getBaseV1ContextEntries, PersonEV1, OrganizationEV1, CredentialV1, OrganizationalCredentialV1 } from '../../base/v1'

const jsonld = require('jsonld')

const baseContext = combineContextEntries({ entries: getBaseV1ContextEntries() })

const expand = async <D extends SimpleThing>(data: ExpandThing<D>) => {
  const obj = {
    '@context': baseContext,
    ...data,
  }

  const expanded = await jsonld.expand(obj)

  return expanded
}

describe('The base context entries', () => {
  it('expand a Person', async () => {
    const expanded = await expand<PersonEV1>({
      '@type': ['Person', 'PersonE'],
      name: 'Bob Belcher',
    })

    expect(expanded).toMatchInlineSnapshot(`
      Array [
        Object {
          "@type": Array [
            "Person",
            "https://schema.bloom.co/PersonE",
          ],
          "https://schema.org/name": Array [
            Object {
              "@value": "Bob Belcher",
            },
          ],
        },
      ]
    `)
  })

  it('expand an Organization', async () => {
    const expanded = await expand<OrganizationEV1>({
      '@type': ['Organization', 'OrganizationE'],
      name: "Bob's Burgers",
      identifiers: [
        {
          '@type': 'PropertyValue',
          propertyID: 'PAN',
          value: 'ASDF0017F',
        },
      ],
    })

    expect(expanded).toMatchInlineSnapshot(`
      Array [
        Object {
          "@type": Array [
            "Organization",
            "https://schema.bloom.co/OrganizationE",
          ],
          "https://schema.bloom.co/identifiers": Array [
            Object {
              "@type": Array [
                "PropertyValue",
              ],
            },
          ],
          "https://schema.org/name": Array [
            Object {
              "@value": "Bob's Burgers",
            },
          ],
        },
      ]
    `)
  })

  it('expand a Credential', async () => {
    const expanded = await expand<CredentialV1>({
      '@type': ['EducationalOccupationalCredential', 'Credential'],
      educationalLevel: 'beginner',
      dateRevoked: 'date',
      recognizedBy: {
        '@type': 'City',
        name: 'Seattle',
      },
    })

    expect(expanded).toMatchInlineSnapshot(`
      Array [
        Object {
          "@type": Array [
            "EducationalOccupationalCredential",
            "https://schema.bloom.co/Credential",
          ],
          "https://schema.bloom.co/dateRevoked": Array [
            Object {
              "@value": "date",
            },
          ],
          "https://schema.bloom.co/recognizedBy": Array [
            Object {
              "@type": Array [
                "City",
              ],
            },
          ],
          "https://schema.org/educationalLevel": Array [
            Object {
              "@value": "beginner",
            },
          ],
        },
      ]
    `)
  })

  it('expand an OrganizationalCredential', async () => {
    const expanded = await expand<OrganizationalCredentialV1>({
      '@type': ['EducationalOccupationalCredential', 'Credential', 'OrganizationalCredential'],
      educationalLevel: 'beginner',
      dateRevoked: 'date',
      recognizedBy: {
        '@type': 'City',
        name: 'Seattle',
      },
      credentialCategory: 'incorporation',
      organizationType: 'llc',
      goodStanding: true,
      active: true,
      primaryJurisdiction: true,
      identifier: '1234',
    })

    expect(expanded).toMatchInlineSnapshot(`
      Array [
        Object {
          "@type": Array [
            "EducationalOccupationalCredential",
            "https://schema.bloom.co/Credential",
            "https://schema.bloom.co/OrganizationalCredential",
          ],
          "https://schema.bloom.co/active": Array [
            Object {
              "@value": true,
            },
          ],
          "https://schema.bloom.co/credentialCategory": Array [
            Object {
              "@value": "incorporation",
            },
          ],
          "https://schema.bloom.co/dateRevoked": Array [
            Object {
              "@value": "date",
            },
          ],
          "https://schema.bloom.co/goodStanding": Array [
            Object {
              "@value": true,
            },
          ],
          "https://schema.bloom.co/organizationType": Array [
            Object {
              "@value": "llc",
            },
          ],
          "https://schema.bloom.co/primaryJurisdiction": Array [
            Object {
              "@value": true,
            },
          ],
          "https://schema.bloom.co/recognizedBy": Array [
            Object {
              "@type": Array [
                "City",
              ],
            },
          ],
          "https://schema.org/educationalLevel": Array [
            Object {
              "@value": "beginner",
            },
          ],
          "https://schema.org/identifier": Array [
            Object {
              "@value": "1234",
            },
          ],
        },
      ]
    `)
  })
})
