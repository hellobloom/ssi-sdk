import * as bip39 from 'bip39';
import HDKey from 'hdkey';
import secp256k1 from 'secp256k1';
import { Resolver, DIDDocument } from 'did-resolver';

import * as element from './element';
import { resolverRegistry } from './resolve';

const DERIVATION_PATHS = {
  primary: `m/44'/60'/0'/0/0`,
  recovery: `m/44'/60'/0'/0/1`,
};

export type KeyPair = {
  privateKeyHex: string;
  publicKeyHex: string;
};

export type KeyPairs = {
  primaryKeyPair: KeyPair;
  recoveryKeyPair: KeyPair;
};

const getKeyPairsFromHDKey = (hdkey: HDKey): KeyPairs => {
  const primaryKey = hdkey.derive(DERIVATION_PATHS.primary);
  const recoveryKey = hdkey.derive(DERIVATION_PATHS.recovery);

  return {
    primaryKeyPair: {
      privateKeyHex: primaryKey.privateKey.toString('hex'),
      publicKeyHex: Buffer.from(
        secp256k1.publicKeyConvert(primaryKey.publicKey, true)
      ).toString('hex'),
    },
    recoveryKeyPair: {
      privateKeyHex: recoveryKey.privateKey.toString('hex'),
      publicKeyHex: Buffer.from(
        secp256k1.publicKeyConvert(recoveryKey.publicKey, true)
      ).toString('hex'),
    },
  };
};

type FromKeyPairsResult = {
  did: string;
  didDocument: DIDDocument;
};

export const createDIDFromKeyPairs = async (
  keyPairs: KeyPairs
): Promise<FromKeyPairsResult> => {
  // Note: Explicitly declaring this objects properties in alphabetical order.
  const didDocumentModel = {
    '@context': 'https://w3id.org/security/v2',
    assertionMethod: ['#primary'],
    authentication: ['#primary'],
    publicKey: [
      {
        id: '#primary',
        publicKeyHex: keyPairs.primaryKeyPair.publicKeyHex,
        type: 'Secp256k1VerificationKey2018',
        usage: 'signing',
      },
      {
        id: '#recovery',
        publicKeyHex: keyPairs.recoveryKeyPair.publicKeyHex,
        type: 'Secp256k1VerificationKey2018',
        usage: 'recovery',
      },
    ],
  };

  const createPayload = element.getCreatePayload(didDocumentModel, {
    privateKey: keyPairs.primaryKeyPair.privateKeyHex,
  });
  const uniqueSuffix = element.getDidUniqueSuffix(createPayload);
  const encodedPaylod = element.encodeJson(createPayload);
  const did = `did:elem:${uniqueSuffix};elem:initial-state=${encodedPaylod}`;
  const { didDocument } = await new Resolver(resolverRegistry).resolve(did);

  if (!didDocument) {
    throw new Error('Could not resolve DID Document from newly created DID');
  }

  return {
    did,
    didDocument,
  };
};

type FromMnemonicResult = FromKeyPairsResult & {
  keyPairs: KeyPairs;
};

export const createDIDFromMnemonic = async (
  mnemonic: string
): Promise<FromMnemonicResult> => {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdKey = HDKey.fromMasterSeed(seed);
  const keyPairs = getKeyPairsFromHDKey(hdKey);
  const { did, didDocument } = await createDIDFromKeyPairs(keyPairs);

  return {
    did,
    didDocument,
    keyPairs,
  };
};
