import { verifiable } from '@transmute/vc.js'
import { signVC } from '../sign'
import { verifyVC } from '../verify'

import { documentLoader, getIssuerEd25519Suite, getVerifySuite, unsignedVC } from './__fixtures__'

const digitalbazaarVC = require('@digitalbazaar/vc')

describe('Interop:', () => {
  describe('a Bloom issued VC is verifiable by', () => {
    let bloomSignedVC: any

    beforeAll(async () => {
      bloomSignedVC = await signVC({
        unsigned: unsignedVC,
        documentLoader,
        suite: getIssuerEd25519Suite(),
      })
    })

    // This test won't pass until @transmute/vc.js is updated
    // https://github.com/transmute-industries/vc.js/issues/64
    it.skip('Transmute', async () => {
      const result = await verifiable.credential.verify({
        credential: bloomSignedVC,
        documentLoader,
        suite: getVerifySuite({
          proofType: 'Ed25519Signature2020',
          controller: 'did:example:issuer',
          verificationMethod: 'did:example:issuer#123',
        }),
        compactProof: false,
      } as any)

      expect(result.valid).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const result = await digitalbazaarVC.verifyCredential({
        credential: bloomSignedVC,
        documentLoader,
        suite: getVerifySuite({
          proofType: 'Ed25519Signature2020',
          controller: 'did:example:issuer',
          verificationMethod: 'did:example:issuer#123',
        }),
      })

      expect(result.verified).toBeTruthy()
    })
  })

  describe('Bloom can verify credentials issued by', () => {
    it('Transmute', async () => {
      const credential = {
        ...unsignedVC,
        // @transmute/linked-data-proof doesn't auto add the suite's context like jsonld-signatures
        '@context': [...unsignedVC['@context'], 'https://w3id.org/security/suites/ed25519-2020/v1'],
      }

      const transmuteSignedVCs = await verifiable.credential.create({
        credential,
        documentLoader,
        suite: getIssuerEd25519Suite(),
        compactProof: false,
      } as any)

      const transmuteSignedVC = transmuteSignedVCs.items[0]

      const result = await verifyVC({
        vc: transmuteSignedVC,
        getSuite: getVerifySuite,
        documentLoader,
      })

      expect(result.success).toBeTruthy()
    })

    it('Digitalbazaar', async () => {
      const digitalbazaarSignedVC = await digitalbazaarVC.issue({
        credential: { ...unsignedVC },
        documentLoader,
        suite: getIssuerEd25519Suite(),
      })

      const result = await verifyVC({
        vc: digitalbazaarSignedVC,
        getSuite: getVerifySuite,
        documentLoader,
      })

      expect(result.success).toBeTruthy()
    })
  })
})
