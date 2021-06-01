# VC

TypeScript types, JSON schemas, and signing and verifying functions for Verifiable Credentials and Presentations.

## Installation

```
npm i @bloomprotocol/vc
```

OR

```
yarn add @bloomprotocol/vc
```

## Usage

### Signing

#### signVC

`signVC` takes a single parameter with the following properties:

| Name                | Description                                                                                                   | Type                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unsigned            | The unsigned VC to be signed                                                                                  | `Omit<VC, 'proof'>`                                                                                                                                              |
| suite               | Signing suite that is compatible with [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures) | Class that is compatible with [LinkedDataSignature](https://github.com/digitalbazaar/jsonld-signatures/blob/master/lib/suites/LinkedDataSignature.js)            |
| documentLoader      | Function that resolves context URLs and DIDs                                                                  | `(url: string) => Promise<{document: null \| Record<string, unknown>, documentUrl: string}> \| {document: null \| Record<string, unknown>, documentUrl: string}` |
| proofPurposeOptions | Additional options to pass to the proof purpose class                                                         | `undefined \| Record<string, unknown>`                                                                                                                           |

```ts
import { signVC, VC } from '@bloomprotocol/vc'

const { Ed25519VerificationKey2020 } = require('@digitalbazaar/ed25519-verification-key-2020')
const { Ed25519Signature2020 } = require('@digitalbazaar/ed25519-signature-2020')

const unsignedVC: Omit<VC, 'proof'> = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/ed25519-2020/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential'],
  issuanceDate: new Date().toISOString(),
  issuer: 'did:example:issuer',
  credentialSubject: {},
}

const suite = new Ed25519Signature2020({
  key: new Ed25519VerificationKey2020(keyPair),
})

const vc = await signVC({
  unsigned: unsigngedVC,
  suite,
  documentLoader: (url: string) => {
    //...
  },
})
```

#### signVP

`signVP` takes a single parameter with the following properties:

| Name                | Description                                                                                                   | Type                                                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| unsigned            | The unsigned VP to be signed                                                                                  | `Omit<VP, 'proof'>`                                                                                                                                              |
| suite               | Signing suite that is compatible with [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures) | Class that is compatible with [LinkedDataSignature](https://github.com/digitalbazaar/jsonld-signatures/blob/master/lib/suites/LinkedDataSignature.js)            |
| documentLoader      | Function that resolves context URLs and DIDs                                                                  | `(url: string) => Promise<{document: null \| Record<string, unknown>, documentUrl: string}> \| {document: null \| Record<string, unknown>, documentUrl: string}` |
| proofPurposeOptions | Additional options to pass to the proof purpose class                                                         | `{challenge: string, domain: string, [k: string]?: unknown}`                                                                                                     |

```ts
import { signVC, VC } from '@bloomprotocol/vc'

const { Ed25519VerificationKey2020 } = require('@digitalbazaar/ed25519-verification-key-2020')
const { Ed25519Signature2020 } = require('@digitalbazaar/ed25519-signature-2020')

const unsignedVP: Omit<VP, 'proof'> = {
  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/suites/ed25519-2020/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiablePresentation'],
  holder: 'did:example:holder',
  verifiableCredential: [vc]
}

const suite = new Ed25519Signature2020({
  key: new Ed25519VerificationKey2020(keyPair),
})

const vp = await signVP({
  unsigned: unsigngedVP,
  suite,
  proofPurposeOptions: {
    challenge: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    domain: 'https://example.com'
  },
  documentLoader: (url: string) => {
    //...
  },
})
```

### Verifying

#### verifyVC

`verifyVC` takes a single parameter with the following properties:

| Name                   | Description                                                                                                                           | Type                                                                                                                                                             | Required | Default      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| vc                     | The VC to be verified                                                                                                                 | `unknown`                                                                                                                                                        | Yes      | -            |
| getSuite               | Function that returns a signing suite that is compatible with [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures) | `(options: { verificationMethod: string, controller: string, proofType: string }) => any \| Promise<any>`                                                        | Yes      | -            |
| documentLoader         | Function that resolves context URLs and DIDs                                                                                          | `(url: string) => Promise<{document: null \| Record<string, unknown>, documentUrl: string}> \| {document: null \| Record<string, unknown>, documentUrl: string}` | Yes      | -            |
| getProofPurposeOptions | Function that returns additional options to pass to the proof purpose class                                                           | `(options: { proofPurpose: string, verificationMethod: string, controller: string }) => Record<string, unknown> \| Promise<Record<string, unknown>>`             | No       | -            |
| schema                 | Custom json schema to validate the `vc` against                                                                                       | `JSONSchema`                                                                                                                                                     | No       | `vcSchema`   |
| ajv                    | Custom Ajv instance to use when validating the `vc`                                                                                   | `Ajv`                                                                                                                                                            | No       | -            |
| schemaKey              | Custom key to use for Ajv caching of schemas                                                                                          | `string`                                                                                                                                                         | No       | `"vcSchema"` |

On success `verifyVC` returns:

```ts
type VerifyVCResponseSuccess<VCType extends VC> = {
  success: true
  vc: VCType
}
```

And on failure returns:

```ts
type VerifyVCResposeFailure = {
  success: false
  schemaErrors?: ErrorObject[]
  proofErrors?: ProofError[]
  issuanceErrors?: IssuanceError[]
}
```

- `schemaErrors` are errors returned from Ajv
- `proofErrors` are errors returned from jsonld-signatures
- `issuanceErrors` are errors about the VC's issuance and expiration date

#### verifyVP

`verifyVP` takes a single parameter with the following properties:

| Name                   | Description                                                                                                                           | Type                                                                                                                                                             | Required | Default      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| vp                     | The VP to be verified                                                                                                                 | `unknown`                                                                                                                                                        | Yes      | -            |
| getSuite               | Function that returns a signing suite that is compatible with [jsonld-signatures](https://github.com/digitalbazaar/jsonld-signatures) | `(options: { verificationMethod: string, controller: string, proofType: string }) => any \| Promise<any>`                                                        | Yes      | -            |
| documentLoader         | Function that resolves context URLs and DIDs                                                                                          | `(url: string) => Promise<{document: null \| Record<string, unknown>, documentUrl: string}> \| {document: null \| Record<string, unknown>, documentUrl: string}` | Yes      | -            |
| getProofPurposeOptions | Function that returns additional options to pass to the proof purpose class                                                           | `(options: { proofPurpose: string, verificationMethod: string, controller: string }) => Record<string, unknown> \| Promise<Record<string, unknown>>`             | No       | -            |
| schema                 | Custom json schema to validate the `vp` against                                                                                       | `JSONSchema`                                                                                                                                                     | No       | `vpSchema`   |
| ajv                    | Custom Ajv instance to use when validating the `vp`                                                                                   | `Ajv`                                                                                                                                                            | No       | -            |
| schemaKey              | Custom key to use for Ajv caching of schemas                                                                                          | `string`                                                                                                                                                         | No       | `"vpSchema"` |

On success `verifyVC` returns:

```ts
type VerifyVPResponseSuccess<VPType extends VP> = {
  success: true
  vp: VPType
}
```

And on failure returns:

```ts
type VerifyVPResposeFailure = {
  success: false
  schemaErrors?: ErrorObject[]
  proofErrors?: ProofError[]
  credentialProofErrors?: {id: string, errors: ProofError[]}[]
  credentialiIssuanceErrors?: {id: string, errors: IssuanceError[]}[]
}
```

- `schemaErrors` are errors returned from Ajv
- `proofErrors` are errors returned from jsonld-signatures for the VP
- `credentialProofErrors` are errors returned from jsonld-signatures for the VCs within the VP
- `credentialIssuanceErrors` are errors about the issuance and expiration date for the VCs within the VP
