import type { JSONSchema } from 'json-schema-to-ts'

import type { Constraints, Field, InputDescriptor, IsHolder, PresentationDefinition, SameSubject, Schema, Statuses } from '../../../types'
import { createPresentationDefinition, removeUndefinedKeys, validatePresentationDefintion as validate } from '../../__fixtures__'

export const runTests = () => {
  const setInputDescriptors = (...inputDescriptors: InputDescriptor[]): PresentationDefinition =>
    createPresentationDefinition({ input_descriptors: inputDescriptors })

  const createInputDescriptor = ({
    id = 'input',
    name,
    purpose,
    group,
    schema = [{ uri: 'https://schema.org' }],
    constraints,
  }: {
    id?: string
    name?: string
    purpose?: string
    group?: string[]
    schema?: Schema[]
    constraints?: Constraints
  }): InputDescriptor =>
    removeUndefinedKeys({
      id,
      name,
      purpose,
      schema,
      group,
      constraints,
    })

  test('is non-array', () => {
    const pd = setInputDescriptors()
    pd.input_descriptors = createInputDescriptor({}) as any

    expect(validate(pd)).toBeFalsy()
    expect(validate.errors).toMatchInlineSnapshot(`
      Array [
        Object {
          "instancePath": "/input_descriptors",
          "keyword": "type",
          "message": "must be array",
          "params": Object {
            "type": "array",
          },
          "schemaPath": "#/properties/input_descriptors/type",
        },
      ]
    `)
  })

  describe('id', () => {
    test('is non-string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ id: 123 as any }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/id",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/id/type",
          },
        ]
      `)
    })

    test('is undefined', () => {
      const ido = createInputDescriptor({})
      ido.id = undefined as any
      const pd = setInputDescriptors(ido)

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0",
            "keyword": "required",
            "message": "must have required property 'id'",
            "params": Object {
              "missingProperty": "id",
            },
            "schemaPath": "#/properties/input_descriptors/items/required",
          },
        ]
      `)
    })
  })

  describe('name', () => {
    test('is string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ name: 'name' }))

      expect(validate(pd)).toBeTruthy()
    })

    test('is non-string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ name: 123 as any }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/name",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/name/type",
          },
        ]
      `)
    })
  })

  describe('purpose', () => {
    test('is string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ purpose: 'purpose' }))

      expect(validate(pd)).toBeTruthy()
    })

    test('is non-string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ purpose: 123 as any }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/purpose",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/purpose/type",
          },
        ]
      `)
    })
  })

  describe('group', () => {
    test('is array of strings', () => {
      const pd = setInputDescriptors(createInputDescriptor({ group: ['A', 'B'] }))

      expect(validate(pd)).toBeTruthy()
    })

    test('is array of non-string', () => {
      const pd = setInputDescriptors(createInputDescriptor({ group: ['A', 1 as any] }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/group/1",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/group/items/type",
          },
        ]
      `)
    })

    test('is non-array', () => {
      const pd = setInputDescriptors(createInputDescriptor({ group: 'A' as any }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/group",
            "keyword": "type",
            "message": "must be array",
            "params": Object {
              "type": "array",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/group/type",
          },
        ]
      `)
    })
  })

  describe('schema', () => {
    test('is non-array', () => {
      const pd = setInputDescriptors(createInputDescriptor({ schema: { uri: 'https://schema.org' } as any }))

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0/schema",
            "keyword": "type",
            "message": "must be array",
            "params": Object {
              "type": "array",
            },
            "schemaPath": "#/properties/input_descriptors/items/properties/schema/type",
          },
        ]
      `)
    })

    test('is undefined', () => {
      const ido = createInputDescriptor({})
      ido.schema = undefined as any
      const pd = setInputDescriptors(ido)

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/input_descriptors/0",
            "keyword": "required",
            "message": "must have required property 'schema'",
            "params": Object {
              "missingProperty": "schema",
            },
            "schemaPath": "#/properties/input_descriptors/items/required",
          },
        ]
      `)
    })

    describe('uri', () => {
      test('is non-uri string', () => {
        const pd = setInputDescriptors(createInputDescriptor({ schema: [{ uri: 'uri' }] }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/schema/0/uri",
              "keyword": "format",
              "message": "must match format \\"uri\\"",
              "params": Object {
                "format": "uri",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/schema/items/properties/uri/format",
            },
          ]
        `)
      })

      test('is non-string', () => {
        const pd = setInputDescriptors(createInputDescriptor({ schema: [{ uri: 123 as any }] }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/schema/0/uri",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/schema/items/properties/uri/type",
            },
          ]
        `)
      })

      test('is undefined', () => {
        const pd = setInputDescriptors(createInputDescriptor({ schema: [{ uri: undefined as any }] }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/schema/0",
              "keyword": "required",
              "message": "must have required property 'uri'",
              "params": Object {
                "missingProperty": "uri",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/schema/items/required",
            },
          ]
        `)
      })
    })

    describe('required', () => {
      test('is non-boolean', () => {
        const pd = setInputDescriptors(createInputDescriptor({ schema: [{ uri: 'https://schema.org', required: 'required' as any }] }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/schema/0/required",
              "keyword": "type",
              "message": "must be boolean",
              "params": Object {
                "type": "boolean",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/schema/items/properties/required/type",
            },
          ]
        `)
      })
    })
  })

  describe('constraints', () => {
    const setConstraints = (constraints: Constraints): PresentationDefinition => setInputDescriptors(createInputDescriptor({ constraints }))

    const createConstraints = ({
      limit_disclosure,
      statuses,
      fields,
      subject_is_issuer,
      is_holder,
      same_subject,
    }: {
      limit_disclosure?: 'required' | 'preferred'
      statuses?: Statuses
      fields?: Field[]
      subject_is_issuer?: 'required' | 'preferred'
      is_holder?: IsHolder
      same_subject?: SameSubject
    }): Constraints =>
      removeUndefinedKeys({
        limit_disclosure,
        statuses,
        fields,
        subject_is_issuer,
        is_holder,
        same_subject,
      })

    describe('limit_disclosure', () => {
      describe('is enum value', () => {
        test('required', () => {
          const pd = setConstraints(createConstraints({ limit_disclosure: 'required' }))

          expect(validate(pd)).toBeTruthy()
        })

        test('preferred', () => {
          const pd = setConstraints(createConstraints({ limit_disclosure: 'preferred' }))

          expect(validate(pd)).toBeTruthy()
        })
      })

      test('is non-enum value string', () => {
        const pd = setConstraints(createConstraints({ limit_disclosure: 'limit_disclosure' as any }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/limit_disclosure",
              "keyword": "enum",
              "message": "must be equal to one of the allowed values",
              "params": Object {
                "allowedValues": Array [
                  "required",
                  "preferred",
                ],
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/limit_disclosure/enum",
            },
          ]
        `)
      })

      test('is non-string', () => {
        const pd = setConstraints(createConstraints({ limit_disclosure: 123 as any }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/limit_disclosure",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/limit_disclosure/type",
            },
          ]
        `)
      })
    })

    describe('statuses', () => {
      const setStatuses = (statuses: Statuses): PresentationDefinition => setConstraints({ statuses })

      describe('active', () => {
        describe('directive', () => {
          describe('is enum value', () => {
            test('required', () => {
              const pd = setStatuses({ active: { directive: 'required' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('allowed', () => {
              const pd = setStatuses({ active: { directive: 'allowed' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('disallowed', () => {
              const pd = setStatuses({ active: { directive: 'disallowed' } })

              expect(validate(pd)).toBeTruthy()
            })
          })

          test('is non-enum value string', () => {
            const pd = setStatuses({ active: { directive: 'directive' as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/active/directive",
                  "keyword": "enum",
                  "message": "must be equal to one of the allowed values",
                  "params": Object {
                    "allowedValues": Array [
                      "required",
                      "allowed",
                      "disallowed",
                    ],
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/active/properties/directive/enum",
                },
              ]
            `)
          })

          test('is non-string', () => {
            const pd = setStatuses({ active: { directive: 123 as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/active/directive",
                  "keyword": "type",
                  "message": "must be string",
                  "params": Object {
                    "type": "string",
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/active/properties/directive/type",
                },
              ]
            `)
          })
        })
      })

      describe('suspended', () => {
        describe('directive', () => {
          describe('is enum value', () => {
            test('required', () => {
              const pd = setStatuses({ suspended: { directive: 'required' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('allowed', () => {
              const pd = setStatuses({ suspended: { directive: 'allowed' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('disallowed', () => {
              const pd = setStatuses({ suspended: { directive: 'disallowed' } })

              expect(validate(pd)).toBeTruthy()
            })
          })

          test('is non-enum value string', () => {
            const pd = setStatuses({ suspended: { directive: 'directive' as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/suspended/directive",
                  "keyword": "enum",
                  "message": "must be equal to one of the allowed values",
                  "params": Object {
                    "allowedValues": Array [
                      "required",
                      "allowed",
                      "disallowed",
                    ],
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/suspended/properties/directive/enum",
                },
              ]
            `)
          })

          test('is non-string', () => {
            const pd = setStatuses({ suspended: { directive: 123 as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/suspended/directive",
                  "keyword": "type",
                  "message": "must be string",
                  "params": Object {
                    "type": "string",
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/suspended/properties/directive/type",
                },
              ]
            `)
          })
        })
      })

      describe('revoked', () => {
        describe('directive', () => {
          describe('is enum value', () => {
            test('required', () => {
              const pd = setStatuses({ revoked: { directive: 'required' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('allowed', () => {
              const pd = setStatuses({ revoked: { directive: 'allowed' } })

              expect(validate(pd)).toBeTruthy()
            })

            test('disallowed', () => {
              const pd = setStatuses({ revoked: { directive: 'disallowed' } })

              expect(validate(pd)).toBeTruthy()
            })
          })

          test('is non-enum value string', () => {
            const pd = setStatuses({ revoked: { directive: 'directive' as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/revoked/directive",
                  "keyword": "enum",
                  "message": "must be equal to one of the allowed values",
                  "params": Object {
                    "allowedValues": Array [
                      "required",
                      "allowed",
                      "disallowed",
                    ],
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/revoked/properties/directive/enum",
                },
              ]
            `)
          })

          test('is non-string', () => {
            const pd = setStatuses({ revoked: { directive: 123 as any } })

            expect(validate(pd)).toBeFalsy()
            expect(validate.errors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "/input_descriptors/0/constraints/statuses/revoked/directive",
                  "keyword": "type",
                  "message": "must be string",
                  "params": Object {
                    "type": "string",
                  },
                  "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/statuses/properties/revoked/properties/directive/type",
                },
              ]
            `)
          })
        })
      })
    })

    describe('fields', () => {
      const setFields = (...fields: Field[]): PresentationDefinition => setConstraints({ fields })

      const createField = ({
        id,
        path = ['$'],
        purpose,
        filter,
        predicate,
      }: {
        id?: string
        path?: string[]
        purpose?: string
        filter?: Exclude<JSONSchema, boolean>
        predicate?: 'required' | 'preferred'
      }): Field =>
        removeUndefinedKeys({
          id,
          path,
          purpose,
          filter,
          predicate,
        })

      test('is array of fields', () => {
        const pd = setFields(createField({}))

        validate(pd)

        expect(validate(pd)).toBeTruthy()
      })

      test('is non-array', () => {
        const pd = setConstraints({ fields: createField({}) as any })

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/fields",
              "keyword": "type",
              "message": "must be array",
              "params": Object {
                "type": "array",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/type",
            },
          ]
        `)
      })

      describe('id', () => {
        test('is string', () => {
          const pd = setFields(createField({ id: 'id' }))

          expect(validate(pd)).toBeTruthy()
        })

        test('is non-string', () => {
          const pd = setFields(createField({ id: 123 as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/id",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/properties/id/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'filter'",
                "params": Object {
                  "missingProperty": "filter",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })
      })

      describe('path', () => {
        test('is array of non-string', () => {
          const pd = setFields(createField({ path: ['$', 123 as any] }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/path/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/properties/path/items/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'filter'",
                "params": Object {
                  "missingProperty": "filter",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })

        test('is non-array', () => {
          const pd = setFields(createField({ path: '$' as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/path",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/properties/path/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'filter'",
                "params": Object {
                  "missingProperty": "filter",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })

        test('is undefined', () => {
          const field = createField({ path: ['$', 123 as any] })
          field.path = undefined as any
          const pd = setFields(field)

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'path'",
                "params": Object {
                  "missingProperty": "path",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'path'",
                "params": Object {
                  "missingProperty": "path",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })
      })

      describe('purpose', () => {
        test('is string', () => {
          const pd = setFields(createField({ purpose: 'purpose' }))

          expect(validate(pd)).toBeTruthy()
        })

        test('is non-string', () => {
          const pd = setFields(createField({ purpose: 123 as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/purpose",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/properties/purpose/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'filter'",
                "params": Object {
                  "missingProperty": "filter",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })
      })

      describe('filter', () => {
        test('is schema', () => {
          const pd = setFields(createField({ filter: { type: 'object' } }))

          expect(validate(pd)).toBeTruthy()
        })

        test('is non-object', () => {
          const pd = setFields(createField({ filter: [] as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/filter",
                "keyword": "type",
                "message": "must be object,boolean",
                "params": Object {
                  "type": Array [
                    "object",
                    "boolean",
                  ],
                },
                "schemaPath": "#/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'predicate'",
                "params": Object {
                  "missingProperty": "predicate",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })

        test('is required if predicate is set', () => {
          const pd = setFields(createField({ predicate: 'preferred' }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "additionalProperties",
                "message": "must NOT have additional properties",
                "params": Object {
                  "additionalProperty": "predicate",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/additionalProperties",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "required",
                "message": "must have required property 'filter'",
                "params": Object {
                  "missingProperty": "filter",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/required",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })
      })

      describe('predicate', () => {
        describe('is enum value', () => {
          test('preferred', () => {
            const pd = setFields(createField({ filter: { type: 'object' }, predicate: 'preferred' }))

            expect(validate(pd)).toBeTruthy()
          })

          test('required', () => {
            const pd = setFields(createField({ filter: { type: 'object' }, predicate: 'required' }))

            expect(validate(pd)).toBeTruthy()
          })
        })

        test('is non-enum value string', () => {
          const pd = setFields(createField({ filter: { type: 'object' }, predicate: 'predicate' as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "additionalProperties",
                "message": "must NOT have additional properties",
                "params": Object {
                  "additionalProperty": "predicate",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/additionalProperties",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/predicate",
                "keyword": "enum",
                "message": "must be equal to one of the allowed values",
                "params": Object {
                  "allowedValues": Array [
                    "required",
                    "preferred",
                  ],
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/properties/predicate/enum",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })

        test('is non-string', () => {
          const pd = setFields(createField({ filter: { type: 'object' }, predicate: 123 as any }))

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "additionalProperties",
                "message": "must NOT have additional properties",
                "params": Object {
                  "additionalProperty": "predicate",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/0/additionalProperties",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/predicate",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/properties/predicate/type",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0/predicate",
                "keyword": "enum",
                "message": "must be equal to one of the allowed values",
                "params": Object {
                  "allowedValues": Array [
                    "required",
                    "preferred",
                  ],
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf/1/properties/predicate/enum",
              },
              Object {
                "instancePath": "/input_descriptors/0/constraints/fields/0",
                "keyword": "oneOf",
                "message": "must match exactly one schema in oneOf",
                "params": Object {
                  "passingSchemas": null,
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/fields/items/oneOf",
              },
            ]
          `)
        })
      })
    })

    describe('subject_is_issuer', () => {
      describe('is enum value', () => {
        test('required', () => {
          const pd = setConstraints(createConstraints({ subject_is_issuer: 'required' }))

          expect(validate(pd)).toBeTruthy()
        })

        test('preferred', () => {
          const pd = setConstraints(createConstraints({ subject_is_issuer: 'preferred' }))

          expect(validate(pd)).toBeTruthy()
        })
      })

      test('is non-enum value string', () => {
        const pd = setConstraints(createConstraints({ subject_is_issuer: 'subject_is_issuer' as any }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/subject_is_issuer",
              "keyword": "enum",
              "message": "must be equal to one of the allowed values",
              "params": Object {
                "allowedValues": Array [
                  "required",
                  "preferred",
                ],
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/subject_is_issuer/enum",
            },
          ]
        `)
      })

      test('is non-string', () => {
        const pd = setConstraints(createConstraints({ subject_is_issuer: 123 as any }))

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/subject_is_issuer",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/subject_is_issuer/type",
            },
          ]
        `)
      })
    })

    describe('is_holder', () => {
      const setIsHolder = (...isHolder: IsHolder): PresentationDefinition => setConstraints({ is_holder: isHolder })

      test('is array', () => {
        const pd = setIsHolder({ field_id: ['field_id'], directive: 'required' })

        expect(validate(pd)).toBeTruthy()
      })

      test('is non-array', () => {
        const pd = setConstraints({ is_holder: { field_id: ['field_id'], directive: 'required' } as any })

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/is_holder",
              "keyword": "type",
              "message": "must be array",
              "params": Object {
                "type": "array",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/type",
            },
          ]
        `)
      })

      describe('field_id', () => {
        test('is undefined', () => {
          const pd = setIsHolder({ field_id: undefined as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0",
                "keyword": "required",
                "message": "must have required property 'field_id'",
                "params": Object {
                  "missingProperty": "field_id",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/required",
              },
            ]
          `)
        })

        test('is non-array', () => {
          const pd = setIsHolder({ field_id: 'field_id' as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0/field_id",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/properties/field_id/type",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          const pd = setIsHolder({ field_id: ['field_id', 123] as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0/field_id/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/properties/field_id/items/type",
              },
            ]
          `)
        })
      })

      describe('directive', () => {
        describe('is enum value', () => {
          test('required', () => {
            const pd = setIsHolder({ field_id: ['field_id'], directive: 'required' })

            expect(validate(pd)).toBeTruthy()
          })

          test('preferred', () => {
            const pd = setIsHolder({ field_id: ['field_id'], directive: 'preferred' })

            expect(validate(pd)).toBeTruthy()
          })
        })

        test('is non-enum value string', () => {
          const pd = setIsHolder({ field_id: ['field_id'], directive: 'directive' as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0/directive",
                "keyword": "enum",
                "message": "must be equal to one of the allowed values",
                "params": Object {
                  "allowedValues": Array [
                    "required",
                    "preferred",
                  ],
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/properties/directive/enum",
              },
            ]
          `)
        })

        test('is non-string', () => {
          const pd = setIsHolder({ field_id: ['field_id'], directive: 123 as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0/directive",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/properties/directive/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          const pd = setIsHolder({ field_id: ['field_id'], directive: undefined as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/is_holder/0",
                "keyword": "required",
                "message": "must have required property 'directive'",
                "params": Object {
                  "missingProperty": "directive",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/is_holder/items/required",
              },
            ]
          `)
        })
      })
    })

    describe('same_subject', () => {
      const setSameSubject = (...sameSubject: SameSubject): PresentationDefinition => setConstraints({ same_subject: sameSubject })

      test('is array', () => {
        const pd = setSameSubject({ field_id: ['field_id'], directive: 'required' })

        expect(validate(pd)).toBeTruthy()
      })

      test('is non-array', () => {
        const pd = setConstraints({ same_subject: { field_id: ['field_id'], directive: 'required' } as any })

        expect(validate(pd)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/input_descriptors/0/constraints/same_subject",
              "keyword": "type",
              "message": "must be array",
              "params": Object {
                "type": "array",
              },
              "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/type",
            },
          ]
        `)
      })

      describe('field_id', () => {
        test('is undefined', () => {
          const pd = setSameSubject({ field_id: undefined as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0",
                "keyword": "required",
                "message": "must have required property 'field_id'",
                "params": Object {
                  "missingProperty": "field_id",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/required",
              },
            ]
          `)
        })

        test('is non-array', () => {
          const pd = setSameSubject({ field_id: 'field_id' as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0/field_id",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/properties/field_id/type",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          const pd = setSameSubject({ field_id: ['field_id', 123] as any, directive: 'required' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0/field_id/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/properties/field_id/items/type",
              },
            ]
          `)
        })
      })

      describe('directive', () => {
        describe('is enum value', () => {
          test('required', () => {
            const pd = setSameSubject({ field_id: ['field_id'], directive: 'required' })

            expect(validate(pd)).toBeTruthy()
          })

          test('preferred', () => {
            const pd = setSameSubject({ field_id: ['field_id'], directive: 'preferred' })

            expect(validate(pd)).toBeTruthy()
          })
        })

        test('is non-enum value string', () => {
          const pd = setSameSubject({ field_id: ['field_id'], directive: 'directive' as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0/directive",
                "keyword": "enum",
                "message": "must be equal to one of the allowed values",
                "params": Object {
                  "allowedValues": Array [
                    "required",
                    "preferred",
                  ],
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/properties/directive/enum",
              },
            ]
          `)
        })

        test('is non-string', () => {
          const pd = setSameSubject({ field_id: ['field_id'], directive: 123 as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0/directive",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/properties/directive/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          const pd = setSameSubject({ field_id: ['field_id'], directive: undefined as any })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/input_descriptors/0/constraints/same_subject/0",
                "keyword": "required",
                "message": "must have required property 'directive'",
                "params": Object {
                  "missingProperty": "directive",
                },
                "schemaPath": "#/properties/input_descriptors/items/properties/constraints/properties/same_subject/items/required",
              },
            ]
          `)
        })
      })
    })
  })
}
