import Ajv, { ValidateFunction } from 'ajv'
import addFormats from 'ajv-formats'
import { expectType } from 'tsd'

import { VC, vcSchema, VP, vpSchema } from '../core'
import { signVC, signVP } from '../sign'
import {
  documentLoader,
  unsignedVC,
  getUnsignedVP,
  getIssuerEd25519Suite,
  getIssuerEcdsaSecp256k1Suite,
  getHolderEd25519Suite,
  getHolderEcdsaSecp256k1Suite,
  UniversityDegreeVC,
  unsignedDegreeVC,
  universityDegreeVCSchema,
} from './__fixtures__'

describe('signVC', () => {
  let ajv: Ajv
  let validate: ValidateFunction

  beforeAll(() => {
    ajv = new Ajv({ strictTuples: false })
    addFormats(ajv)
    validate = ajv.compile(vcSchema)
  })
  ;[
    {
      name: 'Ed25519 Signature',
      suite: getIssuerEd25519Suite(),
    },
    {
      name: 'EcdsaSecp256k1 Signature',
      suite: getIssuerEcdsaSecp256k1Suite(),
    },
  ].forEach(({ name, suite }) => {
    it(`signs a VC (${name})`, async () => {
      const signed = await signVC({
        unsigned: unsignedVC,
        documentLoader,
        suite,
      })

      expect(validate(signed)).toBeTruthy()
      expectType<VC>(signed)
    })

    it(`signs a VC with custom type (${name})`, async () => {
      const signed = await signVC({
        unsigned: unsignedDegreeVC,
        documentLoader,
        suite,
      })

      const validate = ajv.compile(universityDegreeVCSchema)
      expect(validate(signed)).toBeTruthy()
      expectType<UniversityDegreeVC>(signed)
    })
  })
})

describe('signVP', () => {
  let validate: ValidateFunction
  let unsignedVP: Omit<VP, 'proof'>

  beforeAll(async () => {
    const vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: getIssuerEd25519Suite(),
    })

    unsignedVP = getUnsignedVP([vc])

    const ajv = new Ajv({ strictTuples: false })
    addFormats(ajv)
    validate = ajv.compile(vpSchema)
  })
  ;[
    {
      name: 'Ed25519 Signature',
      suite: getHolderEd25519Suite(),
    },
    {
      name: 'EcdsaSecp256k1 Signature',
      suite: getHolderEcdsaSecp256k1Suite(),
    },
  ].forEach(({ name, suite }) => {
    it(`signs a VP (${name})`, async () => {
      const signed = await signVP({
        unsigned: unsignedVP,
        documentLoader,
        suite,
        proofPurposeOptions: {
          challenge: 'challenge',
          domain: 'domain',
        },
      })

      expect(validate(signed)).toBeTruthy()
    })
  })
})
