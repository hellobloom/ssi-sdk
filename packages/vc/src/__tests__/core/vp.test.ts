import Ajv, { ValidateFunction } from 'ajv'
import addFormats from 'ajv-formats'

import { VPProof, vpProofSchema, VPType, vpTypeSchema } from '../../core'

describe('vpProofSchema', () => {
  let ajv: Ajv
  let validate: ValidateFunction<VPProof>

  beforeAll(() => {
    ajv = addFormats(new Ajv())
    ajv.addSchema(vpProofSchema, 'vpProofSchema')
  })

  beforeEach(() => {
    validate = ajv.getSchema('vpProofSchema')!
  })

  test('valiates a valid VP Proof', () => {
    const value: VPProof = {
      type: 'EcdsaSecp256k1Signature2019',
      created: '2021-06-03T00:00:00Z',
      proofPurpose: 'authentication',
      verificationMethod: 'did:example:issuer#123',
      jws: 'jws',
      challenge: 'challenge',
      domain: 'domain',
    }

    expect(validate(value)).toBeTruthy()
  })

  describe('fails an invalid VP Proof:', () => {
    test('missing type', () => {
      const value = {
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'authentication',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'type'",
            "params": Object {
              "missingProperty": "type",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'type'",
            "params": Object {
              "missingProperty": "type",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing created', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        proofPurpose: 'authentication',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'created'",
            "params": Object {
              "missingProperty": "created",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'created'",
            "params": Object {
              "missingProperty": "created",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing proofPurpose', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'proofPurpose'",
            "params": Object {
              "missingProperty": "proofPurpose",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'proofPurpose'",
            "params": Object {
              "missingProperty": "proofPurpose",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('invalid proofPurpose', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'assertionMethod',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "/proofPurpose",
            "keyword": "const",
            "message": "must be equal to constant",
            "params": Object {
              "allowedValue": "authentication",
            },
            "schemaPath": "#/oneOf/0/properties/proofPurpose/const",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'proofValue'",
            "params": Object {
              "missingProperty": "proofValue",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing verificationMethod', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'authentication',
        jws: 'jws',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'verificationMethod'",
            "params": Object {
              "missingProperty": "verificationMethod",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'verificationMethod'",
            "params": Object {
              "missingProperty": "verificationMethod",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing jws', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'authentication',
        verificationMethod: 'did:example:issuer#123',
        challenge: 'challenge',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'jws'",
            "params": Object {
              "missingProperty": "jws",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'proofValue'",
            "params": Object {
              "missingProperty": "proofValue",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing challenge', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'authentication',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        domain: 'domain',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'challenge'",
            "params": Object {
              "missingProperty": "challenge",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'challenge'",
            "params": Object {
              "missingProperty": "challenge",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })

    test('missing domain', () => {
      const value = {
        type: 'EcdsaSecp256k1Signature2019',
        created: '2021-06-03T00:00:00Z',
        proofPurpose: 'authentication',
        verificationMethod: 'did:example:issuer#123',
        jws: 'jws',
        challenge: 'challenge',
      }

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'domain'",
            "params": Object {
              "missingProperty": "domain",
            },
            "schemaPath": "#/oneOf/0/required",
          },
          Object {
            "instancePath": "",
            "keyword": "required",
            "message": "must have required property 'domain'",
            "params": Object {
              "missingProperty": "domain",
            },
            "schemaPath": "#/oneOf/1/required",
          },
          Object {
            "instancePath": "",
            "keyword": "oneOf",
            "message": "must match exactly one schema in oneOf",
            "params": Object {
              "passingSchemas": null,
            },
            "schemaPath": "#/oneOf",
          },
        ]
      `)
    })
  })
})

describe('VPTypeSchema', () => {
  let ajv: Ajv
  let validate: ValidateFunction<VPType>

  beforeAll(() => {
    ajv = addFormats(new Ajv())
    ajv.addSchema(vpTypeSchema, 'vpTypeSchema')
  })

  beforeEach(() => {
    validate = ajv.getSchema('vpTypeSchema')!
  })

  describe('valiates a valid VP Type:', () => {
    test('single item', () => {
      const value: VPType = ['VerifiablePresentation']

      expect(validate(value)).toBeTruthy()
    })

    test('multiple item', () => {
      const value: VPType = ['VerifiablePresentation', 'CustomPresentation']

      expect(validate(value)).toBeTruthy()
    })

    test('multiple item with different order', () => {
      const value: VPType = ['CustomPresentation', 'VerifiablePresentation']

      expect(validate(value)).toBeTruthy()
    })
  })

  describe('fails an invalid VP Type:', () => {
    test('empty array', () => {
      const value: string[] = []

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "minItems",
            "message": "must NOT have fewer than 1 items",
            "params": Object {
              "limit": 1,
            },
            "schemaPath": "#/minItems",
          },
        ]
      `)
    })

    test('missing VerifiablePresentation', () => {
      const value: string[] = ['CustomPresentation']

      const result = validate(value)

      expect(result).toBeFalsy()
      expect(validate.errors).toMatchInlineSnapshot(`
        Array [
          Object {
            "instancePath": "",
            "keyword": "contains",
            "message": "must contain at least 1 valid item(s)",
            "params": Object {
              "minContains": 1,
            },
            "schemaPath": "#/contains",
          },
        ]
      `)
    })
  })
})
