import Ajv, { ValidateFunction } from 'ajv'
import addFormats from "ajv-formats"
import { expectType } from 'tsd';

import { VC, vcSchema, VP, vpSchema } from '../core'
import { signVC, signVP } from '../sign'
import { documentLoader, unsignedVC, getUnsignedVP, getIssuerSignSuite, getHolderSignSuite, UniversityDegreeVC, unsignedDegreeVC, universityDegreeVCSchema } from './__fixtures__'

describe('signVC', () => {
  let ajv: Ajv
  let validate: ValidateFunction

  beforeAll(() => {
    ajv = new Ajv({strictTuples: false})
    addFormats(ajv)
    validate = ajv.compile(vcSchema)
  })

  it('signs a VC', async () => {
    const signed = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: getIssuerSignSuite()
    })

    expect(validate(signed)).toBeTruthy()
    expectType<VC>(signed)
  })

  it('signs a VC with custom type', async () => {
    const signed = await signVC({
      unsigned: unsignedDegreeVC,
      documentLoader,
      suite: getIssuerSignSuite()
    })

    const validate = ajv.compile(universityDegreeVCSchema)
    expect(validate(signed)).toBeTruthy()
    expectType<UniversityDegreeVC>(signed)
  })
})

describe('signVP', () => {
  let validate: ValidateFunction
  let unsignedVP: Omit<VP, 'proof'>

  beforeAll(async () => {
    const vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: getIssuerSignSuite()
    })

    unsignedVP = getUnsignedVP([vc])

    const ajv = new Ajv({strictTuples: false})
    addFormats(ajv)
    validate = ajv.compile(vpSchema)
  })

  it('signs a VP', async () => {
    const signed = await signVP({
      unsigned: unsignedVP,
      documentLoader,
      suite: getHolderSignSuite(),
      proofPurposeOptions: {
        challenge: 'challenge',
        domain: 'domain',
      }
    })

    expect(validate(signed)).toBeTruthy()
  })
})
