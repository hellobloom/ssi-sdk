# Legacy Element DID (and non-anchored)

:warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning:

This library is for _legacy_ and _non-anchored_ Element DIDs __ONLY__! It is a small implementation of [`element-lib@0.5.2`](https://github.com/decentralized-identity/element/tree/master/packages/element-lib).

:warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning::warning:

## Installation

```
npm i @bloomprotocol/elem-did-legacy-non-anchored
```

OR

```
yarn add @bloomprotocol/elem-did-legacy-non-anchored
```

## Usage

### Create

You can create an Element DID with either a mnemonic or a set of key pairs

#### With Mnemonic

```ts
import {createDIDFromMnemonic} from '@bloomprotocol/elem-did-legacy-non-anchored'

const {did, didDocument, keyPairs} = await createDIDFromMnemonic('item detail pizza drop any true gossip sick rival replace youth hat')
```

#### With KeyPairs

```ts
import {createDIDFromKeyPairs} from '@bloomprotocol/elem-did-legacy-non-anchored'

const {did, didDocument} = await createDIDFromKeyPairs({
  primaryKeyPair: {
    privateKeyHex: '10213f164214c50f8fad4699691a455a0844a6f5f6fde7b63dbd5e55b04cf1cc',
    publicKeyHex: '038c435746eb0b6763ca769e8aef6c14067bef97bac44a417764e3946efa70ef8a',
  },
  recoveryKeyPair: {
    privateKeyHex: 'f650724f24d34f19481a7796a949caf77e8c3f829b0f9089ccbf98dff5193a08',
    publicKeyHex: '022285b92a4b29a01fead8a2074ca7b16cd7938e93a6e06a4047a120cd673becd1',
  },
})
```

### Resolve

The provided resolver can only handle Element DIDs with their initial-state matrix parameter.

```ts
import {Resolver} from 'did-resolver'
import {resolve, resolverRegistry} from '@bloomprotocol/elem-did-legacy-non-anchored'

const did = 'did:elem:EiC6moFp-ktksdBfyEgd2kS0bcsHJLEjdUBPlYCOrdQiXQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE00WXpRek5UYzBObVZpTUdJMk56WXpZMkUzTmpsbE9HRmxaalpqTVRRd05qZGlaV1k1TjJKaFl6UTBZVFF4TnpjMk5HVXpPVFEyWldaaE56QmxaamhoSWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESXlNamcxWWpreVlUUmlNamxoTURGbVpXRmtPR0V5TURjMFkyRTNZakUyWTJRM09UTTRaVGt6WVRabE1EWmhOREEwTjJFeE1qQmpaRFkzTTJKbFkyUXhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoidjVQU1BtQ3FnUnhBVktKajMwY3ltQ0RYdnFONzFfajFaaGllZGhXbEcwb3NLR040cGZISE9JemdvbVdHOS1pNUJOdml6WGFpM2Ixa3d6c0NqX0U2MGcifQ'

const didDocumentResolutionResult = new Resolver(resolverRegistry).resolve(did)
// Or if you don't want to use `new Resolver`
const didDocument = resolve(did)
```
