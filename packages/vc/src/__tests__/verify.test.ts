import { expectType } from 'tsd';

import { VC, VP } from '../core'
import { signVC, signVP } from '../sign'
import { verifyVC, verifyVP } from '../verify'

import {
  documentLoader,
  unsignedVC,
  getUnsignedVP,
  getIssuerSignSuite,
  getHolderSignSuite,
  getHolderVerifySuite,
  getIssuerVerifySuite,
  universityDegreeVCSchema,
  UniversityDegreeVC,
  universityDegreeVPSchema,
  UniversityDegreeVP,
} from './__fixtures__'

describe('verifyVC', () => {
  let vc: VC

  beforeAll(async () => {
    vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite()
    })
  })

  it('verifies a valid VC', async () => {
    const result = await verifyVC({
      vc,
      documentLoader,
      getSuite: ({controller}) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite()
          case 'did:example:issuer':
            return getIssuerVerifySuite()
          default:
            throw new Error(`Unknown controller: ${controller}`)
        }
      },
    })

    expect(result.success).toBeTruthy()
    if (result.success) {
      expectType<VC>(result.vc)
    }
  })

  it('verifies a valid VC with custom type/schema', async () => {
    const result = await verifyVC<UniversityDegreeVC>({
      vc,
      documentLoader,
      getSuite: ({controller}) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite()
          case 'did:example:issuer':
            return getIssuerVerifySuite()
          default:
            throw new Error(`Unknown controller: ${controller}`)
        }
      },
      schema: universityDegreeVCSchema
    })

    expect(result.success).toBeTruthy()
    if (result.success) {
      expectType<UniversityDegreeVC>(result.vc)
    }
  })
})

describe.only('verifyVP', () => {
  let vp: VP

  beforeAll(async () => {
    const vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite()
    })

    vp = await signVP({
      unsigned: getUnsignedVP([vc]),
      documentLoader,
      suite: await getHolderSignSuite(),
      proofPurposeOptions: {
        challenge: 'challenge',
        domain: 'domain',
      }
    })
  })

  it('verifies a valid VP containing a valid VC', async () => {
    const result = await verifyVP({
      vp,
      documentLoader,
      getSuite: ({controller}) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite()
          case 'did:example:issuer':
            return getIssuerVerifySuite()
          default:
            throw new Error(`Unknown controller: ${controller}`)
        }
      }
    })

    expect(result.success).toBeTruthy()
    if (result.success) {
      expectType<VP>(result.vp)
    }
  })

  it('verifies a valid VP containing a valid VC with custom type/schema', async () => {
    const result = await verifyVP<UniversityDegreeVP>({
      vp,
      documentLoader,
      getSuite: ({controller}) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite()
          case 'did:example:issuer':
            return getIssuerVerifySuite()
          default:
            throw new Error(`Unknown controller: ${controller}`)
        }
      },
      schema: universityDegreeVPSchema
    })

    expect(result.success).toBeTruthy()
    if (result.success) {
      expectType<UniversityDegreeVP>(result.vp)
    }
  })
})
