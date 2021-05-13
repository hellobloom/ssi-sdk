import randomBytes from 'randombytes';

import { EcdsaSecp256k1VerificationKey2019 } from '../index';

import { privateKeyPair, publicKeyPair } from './__fixtures__';

describe('EcdsaSecp256k1VerificationKey2019', () => {
  describe('class', () => {
    test('has extra properties', () => {
      expect(EcdsaSecp256k1VerificationKey2019).toHaveProperty(
        'suite',
        'EcdsaSecp256k1VerificationKey2019'
      );
      expect(EcdsaSecp256k1VerificationKey2019).toHaveProperty(
        'SUITE_CONTEXT',
        'https://ns.did.ai/suites/secp256k1-2019/v1'
      );
    });
  });

  describe('constructor', () => {
    test('sets publicKeyBase58 if not provided but privateKeyBase58 is provided', () => {
      const key = new EcdsaSecp256k1VerificationKey2019({
        controller: privateKeyPair.controller,
        id: privateKeyPair.id,
        privateKeyBase58: privateKeyPair.privateKeyBase58,
      });

      expect(key.publicKeyBase58).toEqual(privateKeyPair.publicKeyBase58);
    });

    test('throw if no publicKey58 is provided', () => {
      let error;
      try {
        new EcdsaSecp256k1VerificationKey2019({
          controller: privateKeyPair.controller,
          id: privateKeyPair.id,
        });
      } catch (e) {
        error = e;
      }

      expect(error).toMatchInlineSnapshot(
        `[TypeError: The "publicKeyBase58" property is required.]`
      );
    });
  });

  describe('generate', () => {
    test('generates a key pair', async () => {
      const key = await EcdsaSecp256k1VerificationKey2019.generate({
        controller: 'did:example:hello',
        id: 'did:example:hello#123',
      });

      expect(key).toBeDefined();
      expect(key.publicKeyBase58).toBeDefined();
      expect(key.privateKeyBase58).toBeDefined();
    });

    test('generates a key pair with compressed publicKey', async () => {
      const key = await EcdsaSecp256k1VerificationKey2019.generate({
        controller: 'did:example:hello',
        id: 'did:example:hello#123',
        compressed: true,
      });

      expect(key).toBeDefined();
      expect(key.publicKeyBase58).toBeDefined();
      expect(key.privateKeyBase58).toBeDefined();
    });

    test('generates a key pair from a seed', async () => {
      const seed = randomBytes(32);

      const key1 = await EcdsaSecp256k1VerificationKey2019.generate({
        seed,
        controller: 'did:example:hello',
        id: 'did:example:hello#123',
      });

      const key2 = await EcdsaSecp256k1VerificationKey2019.generate({
        seed,
        controller: 'did:example:hello',
        id: 'did:example:hello#123',
      });

      expect(key1).toEqual(key2);
    });
  });

  describe('export', () => {
    test('exports publicKey', () => {
      const key = EcdsaSecp256k1VerificationKey2019.from(privateKeyPair);

      expect(key.export({ publicKey: true })).toMatchInlineSnapshot(`
        Object {
          "controller": "did:example:signer",
          "id": "did:example:signer#123",
          "publicKeyBase58": "cY3XbJUu1pz9VU18qTU12pXmvi5rVohUSpekndrnM1Vt",
          "revoked": undefined,
          "type": "EcdsaSecp256k1VerificationKey2019",
        }
      `);
    });

    test('exports privateKey', () => {
      const key = EcdsaSecp256k1VerificationKey2019.from(privateKeyPair);

      expect(key.export({ privateKey: true })).toMatchInlineSnapshot(`
        Object {
          "controller": "did:example:signer",
          "id": "did:example:signer#123",
          "privateKeyBase58": "E8HCuTCVWHSAZSobCqFrriv7vMWhfbRLCU1YT9Upm625",
          "revoked": undefined,
          "type": "EcdsaSecp256k1VerificationKey2019",
        }
      `);
    });

    test('exports with context', () => {
      const key = EcdsaSecp256k1VerificationKey2019.from(privateKeyPair);

      expect(
        key.export({ privateKey: true, publicKey: true, includeContext: true })
      ).toMatchInlineSnapshot(`
        Object {
          "@context": "https://ns.did.ai/suites/secp256k1-2019/v1",
          "controller": "did:example:signer",
          "id": "did:example:signer#123",
          "privateKeyBase58": "E8HCuTCVWHSAZSobCqFrriv7vMWhfbRLCU1YT9Upm625",
          "publicKeyBase58": "cY3XbJUu1pz9VU18qTU12pXmvi5rVohUSpekndrnM1Vt",
          "revoked": undefined,
          "type": "EcdsaSecp256k1VerificationKey2019",
        }
      `);
    });

    test('exports without context', () => {
      const key = EcdsaSecp256k1VerificationKey2019.from(privateKeyPair);

      expect(key.export({ privateKey: true, publicKey: true }))
        .toMatchInlineSnapshot(`
        Object {
          "controller": "did:example:signer",
          "id": "did:example:signer#123",
          "privateKeyBase58": "E8HCuTCVWHSAZSobCqFrriv7vMWhfbRLCU1YT9Upm625",
          "publicKeyBase58": "cY3XbJUu1pz9VU18qTU12pXmvi5rVohUSpekndrnM1Vt",
          "revoked": undefined,
          "type": "EcdsaSecp256k1VerificationKey2019",
        }
      `);
    });

    describe('throws', () => {
      test('when no options are passed', () => {
        const key = EcdsaSecp256k1VerificationKey2019.from(privateKeyPair);

        expect(() => key.export()).toThrowErrorMatchingInlineSnapshot(
          `"export requires specifying either \\"publicKey\\" or \\"privateKey\\"."`
        );
      });

      test('when trying to export privateKey when constructed from publicKeyPair', () => {
        const key = EcdsaSecp256k1VerificationKey2019.from(publicKeyPair);

        expect(() =>
          key.export({ privateKey: true })
        ).toThrowErrorMatchingInlineSnapshot(`"No privateKey to export."`);
      });
    });
  });

  describe('from', () => {
    test('creates key with exported keyPair', () => {
      const key = new EcdsaSecp256k1VerificationKey2019(privateKeyPair);
      const exported = key.export({ publicKey: true, privateKey: true });
      const imported = EcdsaSecp256k1VerificationKey2019.from(exported);

      expect(imported.export({ publicKey: true, privateKey: true })).toEqual(
        exported
      );
    });

    test('creates key with hex keys', () => {
      const imported = EcdsaSecp256k1VerificationKey2019.from({
        controller: 'did:example:hello',
        id: 'did:example:hello#123',
        privateKeyHex:
          '16e4438c119c762c2e217470a4ebe119430a3043b4db77604dbafc4dbccb85fd',
      });

      expect(imported.export({ publicKey: true, privateKey: true }))
        .toMatchInlineSnapshot(`
        Object {
          "controller": "did:example:hello",
          "id": "did:example:hello#123",
          "privateKeyBase58": "2YMr8WzjdFuMQkLdDWzvUsVq5bpdXfeZANeFyLb2ouwr",
          "publicKeyBase58": "dcCSWtPga6Gfeb8GgCB9SiChEbRXCMBxGcmurdebVasH",
          "revoked": undefined,
          "type": "EcdsaSecp256k1VerificationKey2019",
        }
      `);
    });
  });
});
