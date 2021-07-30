import * as inputDescriptor from './inputDescriptor'
import * as submissionRequirement from './submissionRequirement'

import { createPresentationDefinition, validatePresentationDefinition as validate } from '../../__fixtures__'
import { BaseJwtFormatSchema, BaseLdpFormatSchema, Format, PresentationDefinition } from '../../../types'

describe('Presentation Definition Schema', () => {
  test('base', () => {
    const pd = createPresentationDefinition({})

    expect(validate(pd)).toBeTruthy()
  })

  describe('id', () => {
    test('is non-string', () => {
      // @ts-expect-error
      const pd = createPresentationDefinition({ id: 123 })

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/id",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/id/type",
          },
        ]
      `)
    })

    test('is undefined', () => {
      const pd = createPresentationDefinition({})
      // @ts-expect-error
      pd.id = undefined

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'id'",
            "params": Object {
              "missingProperty": "id",
            },
            "schemaPath": "#/required",
          },
        ]
      `)
    })
  })

  describe('input_descriptors', () => {
    inputDescriptor.runTests()
  })

  describe('name', () => {
    test('is string', () => {
      const pd = createPresentationDefinition({ name: 'name' })

      expect(validate(pd)).toBeTruthy()
    })

    test('is non-string', () => {
      // @ts-expect-error
      const pd = createPresentationDefinition({ name: 123 })

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/name",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/name/type",
          },
        ]
      `)
    })
  })

  describe('purpose', () => {
    test('is string', () => {
      const pd = createPresentationDefinition({ purpose: 'purpose' })

      expect(validate(pd)).toBeTruthy()
    })

    test('is non-string', () => {
      // @ts-expect-error
      const pd = createPresentationDefinition({ purpose: 123 })

      expect(validate(pd)).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/purpose",
            "keyword": "type",
            "message": "must be string",
            "params": Object {
              "type": "string",
            },
            "schemaPath": "#/properties/purpose/type",
          },
        ]
      `)
    })
  })

  describe('format', () => {
    const setFormat = (format: Format): PresentationDefinition => createPresentationDefinition({ format })
    const setFormatFor =
      (key: keyof Format) =>
      (jwtFormat: BaseJwtFormatSchema | BaseLdpFormatSchema): PresentationDefinition =>
        setFormat({ [key]: jwtFormat })

    describe('jwt', () => {
      const setJWTFormat = setFormatFor('jwt')

      describe('alg', () => {
        test('is array', () => {
          const pd = setJWTFormat({ alg: ['EdDSA'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setJWTFormat({ alg: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt/alg",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/jwt/properties/alg/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setJWTFormat({ alg: ['EdDSA', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt/alg/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/jwt/properties/alg/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setJWTFormat({ alg: 'EdDSA' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt/alg",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/jwt/properties/alg/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setJWTFormat({ alg: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt",
                "keyword": "required",
                "message": "must have required property 'alg'",
                "params": Object {
                  "missingProperty": "alg",
                },
                "schemaPath": "#/properties/format/properties/jwt/required",
              },
            ]
          `)
        })
      })
    })

    describe('jwt_vc', () => {
      const setJWTVCFormat = setFormatFor('jwt_vc')

      describe('alg', () => {
        test('is array', () => {
          const pd = setJWTVCFormat({ alg: ['EdDSA'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setJWTVCFormat({ alg: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vc/alg",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/jwt_vc/properties/alg/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setJWTVCFormat({ alg: ['EdDSA', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vc/alg/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/jwt_vc/properties/alg/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setJWTVCFormat({ alg: 'EdDSA' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vc/alg",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/jwt_vc/properties/alg/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setJWTVCFormat({ alg: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vc",
                "keyword": "required",
                "message": "must have required property 'alg'",
                "params": Object {
                  "missingProperty": "alg",
                },
                "schemaPath": "#/properties/format/properties/jwt_vc/required",
              },
            ]
          `)
        })
      })
    })

    describe('jwt_vp', () => {
      const setJWTVPFormat = setFormatFor('jwt_vp')

      describe('alg', () => {
        test('is array', () => {
          const pd = setJWTVPFormat({ alg: ['EdDSA'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setJWTVPFormat({ alg: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vp/alg",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/jwt_vp/properties/alg/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setJWTVPFormat({ alg: ['EdDSA', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vp/alg/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/jwt_vp/properties/alg/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setJWTVPFormat({ alg: 'EdDSA' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vp/alg",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/jwt_vp/properties/alg/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setJWTVPFormat({ alg: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/jwt_vp",
                "keyword": "required",
                "message": "must have required property 'alg'",
                "params": Object {
                  "missingProperty": "alg",
                },
                "schemaPath": "#/properties/format/properties/jwt_vp/required",
              },
            ]
          `)
        })
      })
    })

    describe('ldp', () => {
      const setLDPFormat = setFormatFor('ldp')

      describe('proof_type', () => {
        test('is array', () => {
          const pd = setLDPFormat({ proof_type: ['JsonWebSignature2020'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setLDPFormat({ proof_type: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp/proof_type",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/ldp/properties/proof_type/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setLDPFormat({ proof_type: ['JsonWebSignature2020', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp/proof_type/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/ldp/properties/proof_type/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setLDPFormat({ proof_type: 'JsonWebSignature2020' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp/proof_type",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/ldp/properties/proof_type/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setLDPFormat({ proof_type: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp",
                "keyword": "required",
                "message": "must have required property 'proof_type'",
                "params": Object {
                  "missingProperty": "proof_type",
                },
                "schemaPath": "#/properties/format/properties/ldp/required",
              },
            ]
          `)
        })
      })
    })

    describe('ldp_vc', () => {
      const setLDPVCFormat = setFormatFor('ldp_vc')

      describe('proof_type', () => {
        test('is array', () => {
          const pd = setLDPVCFormat({ proof_type: ['JsonWebSignature2020'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setLDPVCFormat({ proof_type: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vc/proof_type",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/ldp_vc/properties/proof_type/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setLDPVCFormat({ proof_type: ['JsonWebSignature2020', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vc/proof_type/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/ldp_vc/properties/proof_type/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setLDPVCFormat({ proof_type: 'JsonWebSignature2020' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vc/proof_type",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/ldp_vc/properties/proof_type/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setLDPVCFormat({ proof_type: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vc",
                "keyword": "required",
                "message": "must have required property 'proof_type'",
                "params": Object {
                  "missingProperty": "proof_type",
                },
                "schemaPath": "#/properties/format/properties/ldp_vc/required",
              },
            ]
          `)
        })
      })
    })

    describe('ldp_vp', () => {
      const setLDPVPFormat = setFormatFor('ldp_vp')

      describe('proof_type', () => {
        test('is array', () => {
          const pd = setLDPVPFormat({ proof_type: ['JsonWebSignature2020'] })

          expect(validate(pd)).toBeTruthy()
        })

        test('is empty array', () => {
          const pd = setLDPVPFormat({ proof_type: [] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vp/proof_type",
                "keyword": "minItems",
                "message": "must NOT have fewer than 1 items",
                "params": Object {
                  "limit": 1,
                },
                "schemaPath": "#/properties/format/properties/ldp_vp/properties/proof_type/minItems",
              },
            ]
          `)
        })

        test('is array of non-string', () => {
          // @ts-expect-error
          const pd = setLDPVPFormat({ proof_type: ['JsonWebSignature2020', 123] })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vp/proof_type/1",
                "keyword": "type",
                "message": "must be string",
                "params": Object {
                  "type": "string",
                },
                "schemaPath": "#/properties/format/properties/ldp_vp/properties/proof_type/items/type",
              },
            ]
          `)
        })

        test('is non-array', () => {
          // @ts-expect-error
          const pd = setLDPVPFormat({ proof_type: 'JsonWebSignature2020' })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vp/proof_type",
                "keyword": "type",
                "message": "must be array",
                "params": Object {
                  "type": "array",
                },
                "schemaPath": "#/properties/format/properties/ldp_vp/properties/proof_type/type",
              },
            ]
          `)
        })

        test('is undefined', () => {
          // @ts-expect-error
          const pd = setLDPVPFormat({ proof_type: undefined })

          expect(validate(pd)).toBeFalsy()
          expect(validate.errors).toMatchInlineSnapshot(`
            Array [
              Object {
                "instancePath": "/format/ldp_vp",
                "keyword": "required",
                "message": "must have required property 'proof_type'",
                "params": Object {
                  "missingProperty": "proof_type",
                },
                "schemaPath": "#/properties/format/properties/ldp_vp/required",
              },
            ]
          `)
        })
      })
    })
  })

  describe('submission_requirements', () => {
    submissionRequirement.runTests()
  })
})
