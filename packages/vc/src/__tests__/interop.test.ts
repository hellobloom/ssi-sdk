import * as transmuteVC from '@transmute/vc.js'
import { signVC } from '../sign'
import { verifyVC } from '../verify'

import { documentLoader, getIssuerSignSuite, getIssuerVerifySuite, unsignedVC } from './__fixtures__'

const digitalbazaarVC = require('@digitalbazaar/vc')

describe('Interop:', () => {
  describe('a Bloom issued VC is verifiable by', () => {
    let bloomSignedVC: any

    beforeAll(async () => {
      bloomSignedVC = await signVC({
        unsigned: unsignedVC,
        documentLoader,
        suite: await getIssuerSignSuite()
      })
    })

    // This test won't pass until @transmute/vc.js is updated
    it.skip('Transmute', async () => {
      const result = await transmuteVC.ld.validateCredential({
        credential: bloomSignedVC,
        documentLoader,
        suite: await getIssuerVerifySuite(),
        compactProof: false,
      } as any)

      expect(result.valid).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const result = await digitalbazaarVC.verifyCredential({
        credential: bloomSignedVC,
        documentLoader,
        suite: await getIssuerVerifySuite(),
      })

      expect(result.verified).toBeTruthy()
    })
  })

  describe('Bloom can verify credentials issued by', () => {
    it('Transmute', async () => {
      const transmuteSignedVC = await transmuteVC.ld.issue({
        credential: {...unsignedVC},
        documentLoader,
        suite: await getIssuerSignSuite(),
        compactProof: false,
      } as any)

      const result = await verifyVC({
        vc: transmuteSignedVC,
        getSuite: ({controller}) => {
          switch (controller) {
            case 'did:example:issuer':
              return getIssuerVerifySuite()
            default:
              throw new Error(`unknown controller: ${controller}`)
          }
        },
        documentLoader
      })

      expect(result.success).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const digitalbazaarSignedVC = await digitalbazaarVC.issue({
        credential: {...unsignedVC},
        documentLoader,
        suite: await getIssuerSignSuite()
      })

      const result = await verifyVC({
        vc: digitalbazaarSignedVC,
        getSuite: ({controller}) => {
          switch (controller) {
            case 'did:example:issuer':
              return getIssuerVerifySuite()
            default:
              throw new Error(`unknown controller: ${controller}`)
          }
        },
        documentLoader
      })

      expect(result.success).toBeTruthy()
    })
  })
})
