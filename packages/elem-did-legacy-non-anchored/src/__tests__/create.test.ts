import {createDIDFromMnemonic, createDIDFromKeyPairs} from '../create'

import {profiles} from './__fixtures__'

describe('create', () => {
  describe('createDidFromMnemonic', () => {
    test('creates a DID with a 12 word mnemonic', async () => {
      const profile = profiles['12Word']
      const {did, didDocument, keyPairs} = await createDIDFromMnemonic(profile.mnemonic)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
      expect(keyPairs).toEqual(profile.keyPairs)
    })

    test('creates a DID with a 24 word mnemonic', async () => {
      const profile = profiles['24Word']
      const {did, didDocument, keyPairs} = await createDIDFromMnemonic(profile.mnemonic)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
      expect(keyPairs).toEqual(profile.keyPairs)
    })
  })

  describe('createDidFromKeyPairs', () => {
    test('creates a DID with keyPairs from a 12 word mnemonic', async () => {
      const profile = profiles['12Word']
      const {did, didDocument} = await createDIDFromKeyPairs(profile.keyPairs)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
    })

    test('creates a DID with keyPairs from a 24 word mnemonic', async () => {
      const profile = profiles['24Word']
      const {did, didDocument} = await createDIDFromKeyPairs(profile.keyPairs)

      expect(did).toEqual(profile.did)
      expect(didDocument).toEqual(profile.didDocument)
    })
  })
})
