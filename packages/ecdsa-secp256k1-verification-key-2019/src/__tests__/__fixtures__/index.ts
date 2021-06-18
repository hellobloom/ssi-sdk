export const keyConfig = {
  privateKeyHex: '42bbd1cc99e74decde73a603895f3402c79a730a27fc93f294d58f948b67bcfa',
  publicKeyHex: '031e1c387aef9e6321b1585b80c6086b76a9d084fc8d36d5c29e2fff290d737a29',

  privateKeyBase58: '5VW1xpufuLGiqRB1cDPvSSxku5JP3kwoJAArNEFzDEvu',
  publicKeyBase58: 'viVJUVxmaviV1VFyHvnCUbf95eiD6G2qrqeG74xsLwV2',

  privateKeyJWK: {
    kty: 'EC',
    crv: 'secp256k1',
    d: 'QrvRzJnnTezec6YDiV80Aseacwon_JPylNWPlItnvPo',
    x: 'Hhw4eu-eYyGxWFuAxghrdqnQhPyNNtXCni__KQ1zeik',
    y: 'fnmECouL1f2Gi4Bj6BQpYSuTHWIinddmeEqEz3fplkk',
    kid: 'kid',
  },
  publicKeyJWK: {
    kty: 'EC',
    crv: 'secp256k1',
    x: 'Hhw4eu-eYyGxWFuAxghrdqnQhPyNNtXCni__KQ1zeik',
    y: 'fnmECouL1f2Gi4Bj6BQpYSuTHWIinddmeEqEz3fplkk',
    kid: 'kid',
  },

  // prettier-ignore
  privateKeyUint8Array: new Uint8Array([
     66, 187, 209, 204, 153, 231,  77,
    236, 222, 115, 166,   3, 137,  95,
     52,   2, 199, 154, 115,  10,  39,
    252, 147, 242, 148, 213, 143, 148,
    139, 103, 188, 250,
  ]),
  // prettier-ignore
  publicKeyUint8Array: new Uint8Array([
     3,  30,  28,  56, 122, 239, 158,  99,
    33, 177,  88,  91, 128, 198,   8, 107,
   118, 169, 208, 132, 252, 141,  54, 213,
   194, 158,  47, 255,  41,  13, 115, 122,
    41,
  ]),
}

export const document = {
  '@context': ['http://schema.org', 'https://ns.did.ai/suites/secp256k1-2019/v1'],
  '@type': 'Person',
  name: 'Bob Belcher',
}

export const publicKeyPair = {
  '@context': 'https://ns.did.ai/suites/secp256k1-2019/v1',
  id: 'did:example:signer#123',
  type: 'EcdsaSecp256k1VerificationKey2019',
  controller: 'did:example:signer',
  publicKeyBase58: 'cY3XbJUu1pz9VU18qTU12pXmvi5rVohUSpekndrnM1Vt',
}

export const privateKeyPair = {
  '@context': 'https://ns.did.ai/suites/secp256k1-2019/v1',
  id: 'did:example:signer#123',
  type: 'EcdsaSecp256k1VerificationKey2019',
  controller: 'did:example:signer',
  publicKeyBase58: 'cY3XbJUu1pz9VU18qTU12pXmvi5rVohUSpekndrnM1Vt',
  privateKeyBase58: 'E8HCuTCVWHSAZSobCqFrriv7vMWhfbRLCU1YT9Upm625',
}
