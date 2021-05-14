import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'

import { EcdsaSecp256k1Signature2019 } from '../index'

import { document, privateKeyPair, publicKeyPair, documentLoader } from './__fixtures__'

const jsigs = require('jsonld-signatures')

const { AssertionProofPurpose } = jsigs.purposes

describe('EcdsaSecp256k1Signature2019', () => {
  describe('signs a document', () => {
    test('with key pair', async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
        date: '2021-04-20T00:00:00Z',
      })

      const signedDocument = await jsigs.sign(
        { ...document },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(signedDocument).toMatchInlineSnapshot(`
        Object {
          "@context": Array [
            "http://schema.org",
            "https://ns.did.ai/suites/secp256k1-2019/v1",
          ],
          "@type": "Person",
          "name": "Bob Belcher",
          "proof": Object {
            "created": "2021-04-20T00:00:00Z",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..g1hW0hlWm_eSlqFRDouZhpqSq7dl0TzzD2hjJDOWKlE6f8UIkFOWTMll9rBNCh-likdOwfRiWJedB9DXUndLAA",
            "proofPurpose": "assertionMethod",
            "type": "EcdsaSecp256k1Signature2019",
            "verificationMethod": "did:example:signer#123",
          },
        }
      `)
    })

    test('with signer param', async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        signer: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair).signer(),
        date: '2021-04-20T00:00:00Z',
      })

      const signedDocument = await jsigs.sign(
        { ...document },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(signedDocument).toMatchInlineSnapshot(`
        Object {
          "@context": Array [
            "http://schema.org",
            "https://ns.did.ai/suites/secp256k1-2019/v1",
          ],
          "@type": "Person",
          "name": "Bob Belcher",
          "proof": Object {
            "created": "2021-04-20T00:00:00Z",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..g1hW0hlWm_eSlqFRDouZhpqSq7dl0TzzD2hjJDOWKlE6f8UIkFOWTMll9rBNCh-likdOwfRiWJedB9DXUndLAA",
            "proofPurpose": "assertionMethod",
            "type": "EcdsaSecp256k1Signature2019",
            "verificationMethod": "did:example:signer#123",
          },
        }
      `)
    })

    test('and adds the correct context when no compatible context is set', async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
        date: '2021-04-20T00:00:00Z',
      })

      const signedDocument = await jsigs.sign(
        { ...document, '@context': 'http://schema.org' },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(signedDocument).toMatchInlineSnapshot(`
        Object {
          "@context": Array [
            "http://schema.org",
            "https://ns.did.ai/suites/secp256k1-2019/v1",
          ],
          "@type": "Person",
          "name": "Bob Belcher",
          "proof": Object {
            "created": "2021-04-20T00:00:00Z",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..g1hW0hlWm_eSlqFRDouZhpqSq7dl0TzzD2hjJDOWKlE6f8UIkFOWTMll9rBNCh-likdOwfRiWJedB9DXUndLAA",
            "proofPurpose": "assertionMethod",
            "type": "EcdsaSecp256k1Signature2019",
            "verificationMethod": "did:example:signer#123",
          },
        }
      `)
    })

    describe('does not add suite context', () => {
      test('if context includes "https://www.w3.org/2018/credentials/v1"', async () => {
        const suite = new EcdsaSecp256k1Signature2019({
          key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
          date: '2021-04-20T00:00:00Z',
        })

        const signedDocument = await jsigs.sign(
          {
            ...document,
            '@context': ['http://schema.org', 'https://www.w3.org/2018/credentials/v1'],
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(signedDocument).toMatchInlineSnapshot(`
          Object {
            "@context": Array [
              "http://schema.org",
              "https://www.w3.org/2018/credentials/v1",
            ],
            "@type": "Person",
            "name": "Bob Belcher",
            "proof": Object {
              "created": "2021-04-20T00:00:00Z",
              "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..g1hW0hlWm_eSlqFRDouZhpqSq7dl0TzzD2hjJDOWKlE6f8UIkFOWTMll9rBNCh-likdOwfRiWJedB9DXUndLAA",
              "proofPurpose": "assertionMethod",
              "type": "EcdsaSecp256k1Signature2019",
              "verificationMethod": "did:example:signer#123",
            },
          }
        `)
      })

      test('if context includes "https://w3id.org/security/v2"', async () => {
        const suite = new EcdsaSecp256k1Signature2019({
          key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
          date: '2021-04-20T00:00:00Z',
        })

        const signedDocument = await jsigs.sign(
          {
            ...document,
            '@context': ['http://schema.org', 'https://w3id.org/security/v2'],
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(signedDocument).toMatchInlineSnapshot(`
          Object {
            "@context": Array [
              "http://schema.org",
              "https://w3id.org/security/v2",
            ],
            "@type": "Person",
            "name": "Bob Belcher",
            "proof": Object {
              "created": "2021-04-20T00:00:00Z",
              "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..g1hW0hlWm_eSlqFRDouZhpqSq7dl0TzzD2hjJDOWKlE6f8UIkFOWTMll9rBNCh-likdOwfRiWJedB9DXUndLAA",
              "proofPurpose": "assertionMethod",
              "type": "EcdsaSecp256k1Signature2019",
              "verificationMethod": "did:example:signer#123",
            },
          }
        `)
      })
    })

    describe('throws', () => {
      test('when no signer is provided', async () => {
        const suite = new EcdsaSecp256k1Signature2019({
          date: '2021-04-20T00:00:00Z',
        })

        await expect(
          jsigs.sign(
            { ...document },
            {
              suite,
              purpose: new AssertionProofPurpose(),
              documentLoader,
            },
          ),
        ).rejects.toThrowErrorMatchingInlineSnapshot('"A signer API has not been specified."')
      })

      test('when key has no publicKeyBase58', async () => {
        const suite = new EcdsaSecp256k1Signature2019({
          key: EcdsaSecp256k1VerificationKey2019.from(publicKeyPair),
          date: '2021-04-20T00:00:00Z',
        })

        await expect(
          jsigs.sign(
            { ...document },
            {
              suite,
              purpose: new AssertionProofPurpose(),
              documentLoader,
            },
          ),
        ).rejects.toThrowErrorMatchingInlineSnapshot('"No private key to sign with."')
      })

      test('when document is missing the suite and addSuiteContext is false', async () => {
        const suite = new EcdsaSecp256k1Signature2019({
          key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
          date: '2021-04-20T00:00:00Z',
        })

        await expect(
          jsigs.sign(
            { ...document, '@context': 'http://schema.org' },
            {
              suite,
              purpose: new AssertionProofPurpose(),
              documentLoader,
              addSuiteContext: false,
            },
          ),
        ).rejects.toThrowErrorMatchingInlineSnapshot(
          '"The document to be signed must contain this suite\'s @context, \\"https://ns.did.ai/suites/secp256k1-2019/v1\\"."',
        )
      })
    })
  })

  describe('verifies a document', () => {
    let signedDocument: any

    beforeEach(async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from(privateKeyPair),
        date: '2021-04-20T00:00:00Z',
      })

      signedDocument = await jsigs.sign(
        { ...document },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )
    })

    test('without a key', async () => {
      const suite = new EcdsaSecp256k1Signature2019()

      const result = await jsigs.verify(
        { ...signedDocument },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(result.verified).toBeTruthy()
    })

    test('with a key', async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from(publicKeyPair),
      })

      const result = await jsigs.verify(
        { ...signedDocument },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(result.verified).toBeTruthy()
    })

    test('with a verifier', async () => {
      const suite = new EcdsaSecp256k1Signature2019({
        verifier: EcdsaSecp256k1VerificationKey2019.from(publicKeyPair).verifier(),
      })

      const result = await jsigs.verify(
        { ...signedDocument },
        {
          suite,
          purpose: new AssertionProofPurpose(),
          documentLoader,
        },
      )

      expect(result.verified).toBeTruthy()
    })

    describe('fails', () => {
      test('when "proof.jws" is not a string', async () => {
        const suite = new EcdsaSecp256k1Signature2019()

        const result = await jsigs.verify(
          {
            ...signedDocument,
            proof: {
              ...signedDocument.proof,
              jws: {},
            },
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(result.verified).toBeFalsy()
        expect(result.error.errors).toMatchInlineSnapshot(`
          Array [
            [TypeError: The proof does not include a valid "jws" property.],
          ]
        `)
      })

      test('when "proof.jws" is not given', async () => {
        const suite = new EcdsaSecp256k1Signature2019()

        const result = await jsigs.verify(
          {
            ...signedDocument,
            proof: {
              ...signedDocument.proof,
              jws: undefined,
            },
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(result.verified).toBeFalsy()
        expect(result.error.errors).toMatchInlineSnapshot(`
          Array [
            [TypeError: The proof does not include a valid "jws" property.],
          ]
        `)
      })

      test('when the document has been tampered with', async () => {
        const suite = new EcdsaSecp256k1Signature2019()

        const result = await jsigs.verify(
          {
            ...signedDocument,
            name: 'Linda Belcher',
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(result.verified).toBeFalsy()
        expect(result.error.errors).toMatchInlineSnapshot(`
          Array [
            [Error: Invalid signature.],
          ]
        `)
      })

      test('when proof type is not EcdsaSecp256k1Signature2019', async () => {
        const suite = new EcdsaSecp256k1Signature2019()

        const result = await jsigs.verify(
          {
            ...signedDocument,
            proof: {
              ...signedDocument.proof,
              type: 'EcdsaSecp256k1Signature2020',
            },
          },
          {
            suite,
            purpose: new AssertionProofPurpose(),
            documentLoader,
          },
        )

        expect(result.verified).toBeFalsy()
        expect(result.error.errors).toMatchInlineSnapshot(`
          Array [
            [Error: Could not verify any proofs; no proofs matched the required suite and purpose.],
          ]
        `)
      })
    })
  })
})
