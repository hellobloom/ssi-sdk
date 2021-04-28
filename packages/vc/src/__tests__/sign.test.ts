import Ajv, { ValidateFunction } from 'ajv'
import addFormats from "ajv-formats"
import { expectType } from 'tsd';

import { UnsignedVP, VC, vcSchema, VP, vpSchema } from '../core'
import { signVC, signVP } from '../sign'
import { documentLoader, unsignedVC, getUnsignedVP, getIssuerSignSuite, getHolderSignSuite, UniversityDegreeVC } from './__fixtures__'

describe('signVC', () => {
  let validate: ValidateFunction<VC>

  beforeAll(() => {
    const ajv = new Ajv({strictTuples: false})
    addFormats(ajv)
    validate = ajv.compile(vcSchema)
  })

  it('signs a VC', async () => {
    const signed = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite()
    })

    expect(validate(signed)).toBeTruthy()
    expectType<VC>(signed)
  })

  it('signs a VC with custom type', async () => {
    const signed = await signVC<UniversityDegreeVC>({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite()
    })

    expect(validate(signed)).toBeTruthy()
    expectType<UniversityDegreeVC>(signed)
  })
})

describe('signVP', () => {
  let validate: ValidateFunction<VP>
  let unsignedVP: UnsignedVP

  beforeAll(async () => {
    const vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite()
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
      suite: await getHolderSignSuite(),
      proofPurposeOptions: {
        challenge: 'challenge',
        domain: 'domain',
      }
    })

    expect(validate(signed)).toBeTruthy()
  })
})
