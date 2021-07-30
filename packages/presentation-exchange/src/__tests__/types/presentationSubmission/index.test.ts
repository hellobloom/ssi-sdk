import { DescriptorMap } from '../../../types'
import { createDescriptorMapItem, createPresentationSubmission, validatePresentationSubmission as validate } from '../../__fixtures__'

describe('Presentation Submission Schema', () => {
  test('base', () => {
    const ps = createPresentationSubmission({})

    expect(validate(ps)).toBeTruthy()
  })

  describe('id', () => {
    test('is non-string', () => {
      const ps = createPresentationSubmission({
        // @ts-expect-error
        id: 123,
      })

      expect(validate(ps)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/presentation_submission/id",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/allOf/1/properties/presentation_submission/properties/id/type",
          },
        ]
      `)
    })

    test('is undefined', () => {
      const ps = createPresentationSubmission({})
      // @ts-expect-error
      ps.presentation_submission.id = undefined

      expect(validate(ps)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/presentation_submission",
            "keyword": "required",
            "message": "must have required property 'id'",
            "params": Object {
              "missingProperty": "id",
            },
            "schemaPath": "#/allOf/1/properties/presentation_submission/required",
          },
        ]
      `)
    })
  })

  describe('definition_id', () => {
    test('is non-string', () => {
      const ps = createPresentationSubmission({
        // @ts-expect-error
        definition_id: 123,
      })

      expect(validate(ps)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/presentation_submission/definition_id",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/allOf/1/properties/presentation_submission/properties/definition_id/type",
          },
        ]
      `)
    })

    test('is undefined', () => {
      const ps = createPresentationSubmission({})
      // @ts-expect-error
      ps.presentation_submission.definition_id = undefined

      expect(validate(ps)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/presentation_submission",
            "keyword": "required",
            "message": "must have required property 'definition_id'",
            "params": Object {
              "missingProperty": "definition_id",
            },
            "schemaPath": "#/allOf/1/properties/presentation_submission/required",
          },
        ]
      `)
    })
  })

  describe('descriptor_map', () => {
    const setDescriptorMap = (...descriptorMapItems: DescriptorMap) => createPresentationSubmission({ descriptor_map: descriptorMapItems })

    test('is non-array', () => {
      const ps = setDescriptorMap()
      // @ts-expect-error
      ps.presentation_submission.descriptor_map = createDescriptorMapItem({})

      expect(validate(ps)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/presentation_submission/descriptor_map",
            "keyword": "type",
            "message": "must be array",
            "params": Object {
              "type": "array",
            },
            "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/type",
          },
        ]
      `)
    })

    describe('id', () => {
      test('is non-string', () => {
        // @ts-expect-error
        const ps = setDescriptorMap(createDescriptorMapItem({ id: 123 }))

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0/id",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/properties/id/type",
            },
          ]
        `)
      })

      test('is undefined', () => {
        const descriptorMapItem = createDescriptorMapItem({})
        // @ts-expect-error
        descriptorMapItem.id = undefined
        const ps = setDescriptorMap(descriptorMapItem)

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0",
              "keyword": "required",
              "message": "must have required property 'id'",
              "params": Object {
                "missingProperty": "id",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/required",
            },
          ]
        `)
      })
    })

    describe('format', () => {
      test('is non-string', () => {
        // @ts-expect-error
        const ps = setDescriptorMap(createDescriptorMapItem({ format: 123 }))

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0/format",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/properties/format/type",
            },
          ]
        `)
      })

      test('is non-enum string', () => {
        // @ts-expect-error
        const ps = setDescriptorMap(createDescriptorMapItem({ format: 'format' }))

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0/format",
              "keyword": "enum",
              "message": "must be equal to one of the allowed values",
              "params": Object {
                "allowedValues": Array [
                  "jwt",
                  "jwt_vc",
                  "jwt_vp",
                  "ldp",
                  "ldp_vc",
                  "ldp_vp",
                ],
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/properties/format/enum",
            },
          ]
        `)
      })

      test('is undefined', () => {
        const descriptorMapItem = createDescriptorMapItem({})
        // @ts-expect-error
        descriptorMapItem.format = undefined
        const ps = setDescriptorMap(descriptorMapItem)

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0",
              "keyword": "required",
              "message": "must have required property 'format'",
              "params": Object {
                "missingProperty": "format",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/required",
            },
          ]
        `)
      })
    })

    describe('path', () => {
      test('is non-string', () => {
        // @ts-expect-error
        const ps = setDescriptorMap(createDescriptorMapItem({ path: 123 }))

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0/path",
              "keyword": "type",
              "message": "must be string",
              "params": Object {
                "type": "string",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/properties/path/type",
            },
          ]
        `)
      })

      test('is undefined', () => {
        const descriptorMapItem = createDescriptorMapItem({})
        // @ts-expect-error
        descriptorMapItem.path = undefined
        const ps = setDescriptorMap(descriptorMapItem)

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0",
              "keyword": "required",
              "message": "must have required property 'path'",
              "params": Object {
                "missingProperty": "path",
              },
              "schemaPath": "#/allOf/1/properties/presentation_submission/properties/descriptor_map/items/required",
            },
          ]
        `)
      })
    })

    describe('path_nested', () => {
      test('is non-string', () => {
        // @ts-expect-error
        const ps = setDescriptorMap(createDescriptorMapItem({ path_nested: 123 }))

        expect(validate(ps)).toBeFalsy()
        expect(validate.errors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/presentation_submission/descriptor_map/0/path_nested",
              "keyword": "type",
              "message": "must be object",
              "params": Object {
                "type": "object",
              },
              "schemaPath": "#/type",
            },
          ]
        `)
      })
    })
  })
})
