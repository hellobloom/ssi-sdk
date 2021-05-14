import { generateDID, createDIDFromMnemonic, createDIDFromKeyPairs } from '../create'

import { profiles } from './__fixtures__'

describe('create', () => {
  describe('generateDID', () => {
    test('generates a DID', () => {
      const { mnemonic, did, didDocument, keyPairs } = generateDID()

      expect(mnemonic.split(' ')).toHaveLength(12)
      expect(mnemonic).toBeDefined()
      expect(did).toBeDefined()
      expect(didDocument).toBeDefined()
      expect(keyPairs).toBeDefined()
    })

    test('generates a DID with a different strength', () => {
      const { mnemonic, did, didDocument, keyPairs } = generateDID(256)

      expect(mnemonic.split(' ')).toHaveLength(24)
      expect(mnemonic).toBeDefined()
      expect(did).toBeDefined()
      expect(didDocument).toBeDefined()
      expect(keyPairs).toBeDefined()
    })
  })

  describe('createDIDFromMnemonic', () => {
    test('creates a DID with a 12 word mnemonic', () => {
      const profile = profiles['12Word']
      const { did, didDocument, keyPairs } = createDIDFromMnemonic(profile.mnemonic)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
      expect(keyPairs).toEqual(profile.keyPairs)
    })

    test('creates a DID with a 24 word mnemonic', () => {
      const profile = profiles['24Word']
      const { did, didDocument, keyPairs } = createDIDFromMnemonic(profile.mnemonic)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
      expect(keyPairs).toEqual(profile.keyPairs)
    })
  })

  describe('createDIDFromKeyPairs', () => {
    test('creates a DID with keyPairs from a 12 word mnemonic', () => {
      const profile = profiles['12Word']
      const { did, didDocument } = createDIDFromKeyPairs(profile.keyPairs)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
    })

    test('creates a DID with keyPairs from a 24 word mnemonic', () => {
      const profile = profiles['24Word']
      const { did, didDocument } = createDIDFromKeyPairs(profile.keyPairs)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
    })
  })
})
