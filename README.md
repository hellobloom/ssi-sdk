# SSI SDK

A comprehensive mono-repo containing all Bloom related SSI related libraries.

## [@bloomprotocol/vc](./packages/vc)

TypeScript types, JSON schemas, and signing and verifying functions for Verifiable Credentials and Presentations.

## [@bloomprotocol/ecdsa-secp256k1-signature-2019](./packages/ecdsa-secp256k1-signature-2019)

EcdsaSecp256k1Signature2019 Linked Data Proof suite for use with jsonld-signatures.

## [@bloomprotocol/ecdsa-secp256k1-verification-key-2019](./packages/ecdsa-secp256k1-verification-key-2019)

TypeScript library for generating and working with EcdsaSecp256k1VerificationKey2019 key pairs, for use with crypto-ld.

## [@bloomprotocol/elem-did-legacy-non-anchored](./packages/elem-did-legacy-non-anchored)

Library for creating and resolving non-anchored legacy Element DIDs

## [@bloomprotocol/waci-kit-react](./packages/waci-kit-react)

Render a QR Code or button to initiate a [WACI](https://identity.foundation/wallet-and-credential-interactions/versions/v0.1.0) interaction

## [@bloomprotocol/waci-core](./packages/waci-core)

TypeScript types to be used in any implementation of [WACI](https://identity.foundation/wallet-and-credential-interactions/versions/v0.1.0)

## [@bloomprotocol/waci-jose](./packages/waci-jose)

Thin wrapper around [`jose`](https://github.com/panva/jose) for creating and verifying [WACI](https://identity.foundation/wallet-and-credential-interactions/versions/v0.1.0) JWTs.

## [@bloomprotocol/credential-manifest](./packages/credential-manifest)

Contains types used to implement WACI's working version of the [DIF Credential Manifest Spec](https://identity.foundation/wallet-and-credential-interactions/versions/v0.1.0/#credential-manifest-working-copy).

## [@bloomprotocol/presentation-exchange](./packages/presentation-exchange)

Contains types used to implement the [DIF Presentation Exchange Spec](https://identity.foundation/presentation-exchange/).
