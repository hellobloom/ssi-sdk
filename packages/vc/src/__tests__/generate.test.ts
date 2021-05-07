import {EcdsaSecp256k1VerificationKey2019} from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'

describe.skip('Generate:', () => {
  test('', async () => {
    const key = await EcdsaSecp256k1VerificationKey2019.generate({id: 'did:example:holder#456', controller: 'did:example:holder'})

    console.log({key: key.export({publicKey: true, privateKey: true, includeContext: true})})
  })
})
