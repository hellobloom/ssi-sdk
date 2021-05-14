import { DIDDocument } from 'did-resolver'

import { KeyPairs } from '../../create'

export type Profile = {
  mnemonic: string
  keyPairs: KeyPairs
  did: string
  didDocument: DIDDocument
}

export const profiles: { [k in '12Word' | '24Word']: Profile } = {
  '12Word': {
    mnemonic: 'item detail pizza drop any true gossip sick rival replace youth hat',
    keyPairs: {
      primaryKeyPair: {
        privateKeyHex: '10213f164214c50f8fad4699691a455a0844a6f5f6fde7b63dbd5e55b04cf1cc',
        publicKeyHex: '038c435746eb0b6763ca769e8aef6c14067bef97bac44a417764e3946efa70ef8a',
      },
      recoveryKeyPair: {
        privateKeyHex: 'f650724f24d34f19481a7796a949caf77e8c3f829b0f9089ccbf98dff5193a08',
        publicKeyHex: '022285b92a4b29a01fead8a2074ca7b16cd7938e93a6e06a4047a120cd673becd1',
      },
    },
    did: 'did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE00WXpRek5UYzBObVZpTUdJMk56WXpZMkUzTmpsbE9HRmxaalpqTVRRd05qZGlaV1k1TjJKaFl6UTBZVFF4TnpjMk5HVXpPVFEyWldaaE56QmxaamhoSWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESXlNamcxWWpreVlUUmlNamxoTURGbVpXRmtPR0V5TURjMFkyRTNZakUyWTJRM09UTTRaVGt6WVRabE1EWmhOREEwTjJFeE1qQmpaRFkzTTJKbFkyUXhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoidjVQU1BtQ3FnUnhBVktKajMwY3ltQ0RYdnFONzFfajFaaGllZGhXbEcwb3NLR040cGZISE9JemdvbVdHOS1pNUJOdml6WGFpM2Ixa3d6c0NqX0U2MGcifQ',
    didDocument: {
      id: 'did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ',
      '@context': 'https://w3id.org/security/v2',
      assertionMethod: ['did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ#primary'],
      authentication: ['did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ#primary'],
      publicKey: [
        {
          id: 'did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ#primary',
          publicKeyHex: '038c435746eb0b6763ca769e8aef6c14067bef97bac44a417764e3946efa70ef8a',
          type: 'Secp256k1VerificationKey2018',
          usage: 'signing',
        } as any,
        {
          id: 'did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ#recovery',
          publicKeyHex: '022285b92a4b29a01fead8a2074ca7b16cd7938e93a6e06a4047a120cd673becd1',
          type: 'Secp256k1VerificationKey2018',
          usage: 'recovery',
        } as any,
      ],
    },
  },
  '24Word': {
    mnemonic:
      'flat firm oppose swallow fee sleep pass whale yellow supreme improve quit crouch waste dust manage ridge float certain scatter original assume bubble symbol',
    keyPairs: {
      primaryKeyPair: {
        privateKeyHex: 'a72737d1076f5111ac9bf78161a7edf1db084e2290801a3292fec4805623df68',
        publicKeyHex: '021894815f2267240e5f77f052724a038d585a6a4d8e563deac376224d5df32404',
      },
      recoveryKeyPair: {
        privateKeyHex: '7aa29946ee333e664512b883c289c0c5a061e01d92998421cbf72a091323387e',
        publicKeyHex: '02bc26194b4a4592ee5cda5c55533cb5eff6ad91bec84ef22c44ea20d8d52ce604',
      },
    },
    did: 'did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNREl4T0RrME9ERTFaakl5TmpjeU5EQmxOV1kzTjJZd05USTNNalJoTURNNFpEVTROV0UyWVRSa09HVTFOak5rWldGak16YzJNakkwWkRWa1pqTXlOREEwSWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESmlZekkyTVRrMFlqUmhORFU1TW1WbE5XTmtZVFZqTlRVMU16TmpZalZsWm1ZMllXUTVNV0psWXpnMFpXWXlNbU0wTkdWaE1qQmtPR1ExTW1ObE5qQTBJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiNUt1LVRFaXF4MmZJS0VNT0c4RmhUa2lSMlE3dlFiVGltTmhSTms3M0RPVkY5MnVRN0Z5UzNaOEJQOEhhb0k0SWRqY0t5R0RsaE5pYUstZ0pwT3BIOXcifQ',
    didDocument: {
      id: 'did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ',
      '@context': 'https://w3id.org/security/v2',
      assertionMethod: ['did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ#primary'],
      authentication: ['did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ#primary'],
      publicKey: [
        {
          id: 'did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ#primary',
          publicKeyHex: '021894815f2267240e5f77f052724a038d585a6a4d8e563deac376224d5df32404',
          type: 'Secp256k1VerificationKey2018',
          usage: 'signing',
        } as any,
        {
          id: 'did:elem:EiDPyZ7juFpbBh9dQlfWdgS6FlYHAd8R-rN2bQjATjCYXQ#recovery',
          publicKeyHex: '02bc26194b4a4592ee5cda5c55533cb5eff6ad91bec84ef22c44ea20d8d52ce604',
          type: 'Secp256k1VerificationKey2018',
          usage: 'recovery',
        } as any,
      ],
    },
  },
}
