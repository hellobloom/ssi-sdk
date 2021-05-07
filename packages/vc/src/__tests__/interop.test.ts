import * as transmuteVC from '@transmute/vc.js'
import { signVC } from '../sign'
import { verifyVC } from '../verify'

import { documentLoader, getIssuerSignSuite, getVerifySuite, unsignedVC } from './__fixtures__'

const digitalbazaarVC = require('@digitalbazaar/vc')

describe('Interop:', () => {
  describe('a Bloom issued VC is verifiable by', () => {
    let bloomSignedVC: any

    beforeAll(async () => {
      bloomSignedVC = await signVC({
        unsigned: unsignedVC,
        documentLoader,
        suite: getIssuerSignSuite()
      })
    })

    // This test won't pass until @transmute/vc.js is updated
    // https://github.com/transmute-industries/vc.js/issues/64
    it.skip('Transmute', async () => {
      const result = await transmuteVC.ld.validateCredential({
        credential: bloomSignedVC,
        documentLoader,
        suite: getVerifySuite(),
        compactProof: false,
      } as any)

      expect(result.valid).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const result = await digitalbazaarVC.verifyCredential({
        credential: bloomSignedVC,
        documentLoader,
        suite: getVerifySuite(),
      })

      expect(result.verified).toBeTruthy()
    })
  })

  describe('Bloom can verify credentials issued by', () => {
    it('Transmute', async () => {
      const transmuteSignedVC = await transmuteVC.ld.issue({
        credential: {...unsignedVC},
        documentLoader,
        suite: getIssuerSignSuite(),
        compactProof: false,
      } as any)

      const result = await verifyVC({
        vc: transmuteSignedVC,
        suite: getVerifySuite(),
        documentLoader
      })

      expect(result.success).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const digitalbazaarSignedVC = await digitalbazaarVC.issue({
        credential: {...unsignedVC},
        documentLoader,
        suite: getIssuerSignSuite()
      })

      const result = await verifyVC({
        vc: digitalbazaarSignedVC,
        suite: getVerifySuite(),
        documentLoader
      })

      expect(result.success).toBeTruthy()
    })
  })
})
