import { FromSchema } from 'json-schema-to-ts';
import { EcdsaSecp256k1Signature2019 } from '@bloomprotocol/ecdsa-secp256k1-signature-2019';
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019';

import { VC, VP, vcSchema, vpSchema, vcSubjectSchema, vcTypeSchema } from '../../core';
import { DocumentLoader } from '../../shared';
import { GetSuiteFn } from '../../verify';

const {
  Ed25519VerificationKey2020,
} = require('@digitalbazaar/ed25519-verification-key-2020');
const Ed25519Signature2020 = require('@digitalbazaar/ed25519-signature-2020')
  .Ed25519Signature2020;
const jsonld = require('jsonld');

const credentialsContextDoc = require('./contexts/credentials-v1.json');
const examplesContextDoc = require('./contexts/examples-v1.json');
const odrlContextDoc = require('./contexts/odrl.json');
const didContextDoc = require('./contexts/did-v0.11.json');
const revocationList2020ContextDoc = require('./contexts/revocation-list-2020-v1.json');
const ed255192020ContextDoc = require('./contexts/ed25519-2020-v1.json');
const secp256k12019ContextDoc = require('./contexts/secp256k1-2019-v1.json');
const securityV1ContextDoc = require('./contexts/security-v1.json');
const securityV2ContextDoc = require('./contexts/security-v2.json');
const presentationSubmissionV1ContextDoc = require('./contexts/presentation-submission-v1.json');
const holderDidDoc = require('./didDocuments/holder.json');
const issuerDidDoc = require('./didDocuments/issuer.json');
const issuerKey = require('./keys/issuer.json');
const holderKey = require('./keys/issuer.json');

const contextMap: { [url: string]: Record<string, unknown> } = {
  'https://www.w3.org/2018/credentials/v1': credentialsContextDoc,
  'https://www.w3.org/2018/credentials/examples/v1': examplesContextDoc,
  'https://www.w3.org/ns/odrl.jsonld': odrlContextDoc,
  'https://w3id.org/did/v0.11': didContextDoc,
  'https://w3id.org/vc-revocation-list-2020/v1': revocationList2020ContextDoc,
  'https://w3id.org/security/suites/ed25519-2020/v1': ed255192020ContextDoc,
  'https://ns.did.ai/suites/secp256k1-2019/v1': secp256k12019ContextDoc,
  'https://w3id.org/security/v1': securityV1ContextDoc,
  'https://w3id.org/security/v2': securityV2ContextDoc,
  'https://identity.foundation/presentation-exchange/submission/v1': presentationSubmissionV1ContextDoc,
};

const didDocMap: { [url: string]: Record<string, unknown> } = {
  'did:example:holder': holderDidDoc,
  'did:example:issuer': issuerDidDoc,
};

export const documentLoader: DocumentLoader = (url: string) => {
  const withoutFragment = url.split('#')[0];
  const document =
    (withoutFragment.startsWith('did:') ? didDocMap : contextMap)[
      withoutFragment
    ] || null;

  if (document === null) console.log({ url, withoutFragment });

  return {
    document,
    documentUrl: url,
  };
};

class Ed25519Signature2020Patched extends Ed25519Signature2020 {
  constructor({
    key,
    signer,
    verifier,
    proof,
    date,
    useNativeCanonize,
  }: any = {}) {
    super({
      key,
      signer,
      verifier,
      proof,
      date,
      useNativeCanonize,
    });
  }

  async getVerificationMethod({ proof, documentLoader }: any) {
    let { verificationMethod } = proof;

    if (typeof verificationMethod === 'object') {
      verificationMethod = verificationMethod.id;
    }

    if (!verificationMethod) {
      throw new Error('No "verificationMethod" found in proof.');
    }

    // Note: `expansionMap` is intentionally not passed; we can safely drop
    // properties here and must allow for it
    const framed = await jsonld.frame(
      verificationMethod,
      {
        '@context': this.contextUrl,
        '@embed': '@always',
        id: verificationMethod,
      },
      { documentLoader, compactToRelative: false }
    );
    if (!framed) {
      throw new Error(`Verification method ${verificationMethod} not found.`);
    }

    // ensure verification method has not been revoked
    if (framed.revoked !== undefined) {
      throw new Error('The verification method has been revoked.');
    }

    await this.assertVerificationMethod({ verificationMethod: framed });

    return framed;
  }
}

const getEd25519Suite = (keyPair?: any) => {
  return new Ed25519Signature2020Patched({
    key: keyPair ? new Ed25519VerificationKey2020(keyPair) : undefined,
  });
};

export const getIssuerEd25519Suite = () =>
  getEd25519Suite(issuerKey['Ed25519VerificationKey2020']['private']);

export const getHolderEd25519Suite = () =>
  getEd25519Suite(holderKey['Ed25519VerificationKey2020']['private']);

export const getEd25519VerifySuite = () => getEd25519Suite();

const getEcdsaSecp256k1Suite = (keyPair?: any) => {
  return new EcdsaSecp256k1Signature2019({
    key: keyPair ? new EcdsaSecp256k1VerificationKey2019(keyPair) : undefined,
  });
};

export const getIssuerEcdsaSecp256k1Suite = () =>
  getEcdsaSecp256k1Suite(
    issuerKey['EcdsaSecp256k1VerificationKey2019']['private']
  );

export const getHolderEcdsaSecp256k1Suite = () =>
  getEcdsaSecp256k1Suite(
    holderKey['EcdsaSecp256k1VerificationKey2019']['private']
  );

export const getEcdsaSecp256k1VerifySuite = () => getEcdsaSecp256k1Suite();

export const getVerifySuite: GetSuiteFn = ({ proofType }) => {
  switch (proofType) {
    case 'EcdsaSecp256k1Signature2019':
      return getEcdsaSecp256k1VerifySuite();
    case 'Ed25519Signature2020':
      return getEd25519VerifySuite();
    default:
      throw new Error(`Unsupported proofType: ${proofType}`);
  }
};

export const universityDegreeVCSubjectSchema = {
  allOf: [
    {
      type: 'object',
      properties: {
        degree: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            name: { type: 'string' },
          },
          required: ['type', 'name'],
        },
      },
      required: ['degree'],
      additionalProperties: true,
    },
    vcSubjectSchema
  ]
} as const

export type UniversityDegreeVCSubject = FromSchema<typeof universityDegreeVCSubjectSchema>

export const universityDegreeVCTypeSchema = {
  allOf: [
    {
      type: 'array',
      items: [{type: 'string'}, { const: 'UniversityDegreeCredential' }],
      additionalItems: { type: 'string' },
      minItems: 2,
    },
    vcTypeSchema
  ]
} as const

export type UniversityDegreeVCType = FromSchema<typeof universityDegreeVCTypeSchema>

export const universityDegreeVCSchema = {
  allOf: [
    {
      type: 'object',
      properties: {
        type: universityDegreeVCTypeSchema,
        credentialSubject: universityDegreeVCSubjectSchema,
        credentialStatus: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uri' },
            type: { type: 'string' },
            revocationListIndex: { type: 'string' },
            revocationListCredential: { type: 'string', format: 'uri' },
          },
        },
      },
    },
    {
      ...vcSchema,
      additionalProperties: true
    },
  ],
} as const

export type UniversityDegreeVC = FromSchema<typeof universityDegreeVCSchema>

export const universityDegreeVPSchema = {
  type: 'object',
  properties: {
    ...vpSchema.properties,
    verifiableCredential: {
      type: 'array',
      items: {
        anyOf: [vcSchema, universityDegreeVCSchema],
      },
      contains: universityDegreeVCSchema,
    },
  },
  required: vpSchema.required,
  additionalProperties: false,
} as const

export type UniversityDegreeVP = FromSchema<typeof universityDegreeVPSchema>;

export const unsignedVC: Omit<VC, 'proof'> = {
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential'],
  issuanceDate: new Date().toISOString(),
  issuer: 'did:example:issuer',
  credentialSubject: {},
};

export const unsignedDegreeVC: Omit<UniversityDegreeVC, 'proof'> = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1',
    'https://w3id.org/vc-revocation-list-2020/v1',
  ],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'UniversityDegreeCredential'],
  issuanceDate: new Date().toISOString(),
  issuer: 'did:example:issuer',
  credentialSubject: {
    degree: {
      type: 'BachelorDegree',
      name: 'Bachelor of Science and Arts',
    },
  },
  credentialStatus: {
    id: 'https://example.com/credentials/status/3#94567',
    type: 'RevocationList2020Status',
    revocationListIndex: '94567',
    revocationListCredential: 'https://example.com/credentials/status/3',
  },
};

export const getUnsignedVP = (vcs: VC[]): Omit<VP, 'proof'> => ({
  '@context': ['https://www.w3.org/2018/credentials/v1'],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiablePresentation'],
  holder: 'did:example:holder',
  verifiableCredential: vcs,
});
