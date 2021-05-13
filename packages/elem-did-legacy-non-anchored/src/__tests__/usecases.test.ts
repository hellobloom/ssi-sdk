import {
  DocumentLoader,
  GetProofPurposeOptionsFn,
  GetSuiteFn,
  signVC,
  verifyVC,
} from '@bloomprotocol/vc';
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019';
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019';

import { generateDID, GenerateResult } from '../create';
import { resolve } from '../resolve';

const credentialsContextDoc = require('./__fixtures__/contexts/credentials-v1.json');
const secp256k12019ContextDoc = require('./__fixtures__/contexts/secp256k1-2019-v1.json');
const securityV2ContextDoc = require('./__fixtures__/contexts/security-v2.json');

const contextMap: { [url: string]: Record<string, unknown> } = {
  'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
  'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
  'https://w3id.org/security/v2': securityV2ContextDoc,
};

const documentLoader: DocumentLoader = url => {
  let document;

  if (url.startsWith('did:')) {
    // Because DIDDocument is an interface it doesn't play nice with Record<string, unknown> :/
    document = resolve(url) as any;
  } else {
    document = contextMap[url] || null;
  }

  if (document === null) console.log({ url });

  return {
    document,
    documentUrl: url,
  };
};

const getSuite: GetSuiteFn = ({
  verificationMethod,
  controller,
  proofType,
}) => {
  switch (proofType) {
    case 'EcdsaSecp256k1Signature2019':
      if (
        controller.startsWith('did:elem') &&
        controller.indexOf('elem:initial-state') >= 0
      ) {
        const didDoc = resolve(controller);
        if (!didDoc) throw new Error(`Could not resolve DID: ${controller}`);

        const publicKey = didDoc.publicKey?.find(
          ({ id }) => id === verificationMethod
        );
        if (!publicKey)
          throw new Error(
            `Could not find matching publicKey for verificationMethod: ${verificationMethod}`
          );

        return new EcdsaSecp256k1Signature2019({
          key: EcdsaSecp256k1VerificationKey2019.from({
            controller,
            id: verificationMethod,
            publicKeyHex: publicKey.publicKeyHex,
          }),
        });
      }

      return new EcdsaSecp256k1Signature2019();
    default:
      throw new Error(`Unsupported proofType: ${proofType}`);
  }
};

const getProofPurposeOptions: GetProofPurposeOptionsFn = ({
  controller,
  proofPurpose,
}) => {
  switch (proofPurpose) {
    case 'assertionMethod':
    case 'authentication':
      if (
        controller.startsWith('did:elem') &&
        controller.indexOf('elem:initial-state') >= 0
      ) {
        // We need to supply a controller document here because the
        // controller string will be different from the resolved DIDDocument.id
        return {
          controller: resolve(controller),
        };
      }

      return {};
    default:
      throw new Error(`Unsupported proofPurpose: ${proofPurpose}`);
  }
};

describe('Use Cases', () => {
  describe('Signing And Verifing VCs', () => {
    let issuerDID: GenerateResult;

    beforeAll(() => {
      issuerDID = generateDID();
    });

    test('can be used to sign a VC', async () => {
      const controller = issuerDID.did;
      const keyId = `${issuerDID.didDocument.id}#primary`;

      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from({
          controller,
          id: keyId,
          publicKeyHex: issuerDID.keyPairs.primaryKeyPair.publicKeyHex,
          privateKeyHex: issuerDID.keyPairs.primaryKeyPair.privateKeyHex,
        }),
      });

      const vc = await signVC({
        unsigned: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: ['VerifiableCredential'],
          issuanceDate: new Date().toISOString(),
          issuer: controller,
          credentialSubject: {},
        },
        suite,
        documentLoader,
      });

      expect(vc.proof.verificationMethod).toEqual(keyId);
    });

    test('can be used to verify a VC', async () => {
      const controller = issuerDID.did;
      const keyId = `${issuerDID.didDocument.id}#primary`;

      const suite = new EcdsaSecp256k1Signature2019({
        key: EcdsaSecp256k1VerificationKey2019.from({
          controller,
          id: keyId,
          publicKeyHex: issuerDID.keyPairs.primaryKeyPair.publicKeyHex,
          privateKeyHex: issuerDID.keyPairs.primaryKeyPair.privateKeyHex,
        }),
      });

      const vc = await signVC({
        unsigned: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
          type: ['VerifiableCredential'],
          issuanceDate: new Date().toISOString(),
          issuer: controller,
          credentialSubject: {},
        },
        suite,
        documentLoader,
      });

      const result = await verifyVC({
        vc,
        documentLoader,
        getSuite,
        getProofPurposeOptions,
      });

      expect(result.success).toBeTruthy();
    });
  });
});
