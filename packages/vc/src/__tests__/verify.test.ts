import { expectType } from 'tsd';

import { VC, VP } from '../core';
import { signVC, signVP } from '../sign';
import { verifyVC, verifyVP } from '../verify';

import {
  documentLoader,
  unsignedVC,
  getUnsignedVP,
  getIssuerSignSuite,
  getHolderSignSuite,
  getHolderVerifySuite,
  getIssuerVerifySuite,
  universityDegreeVCSchema,
  UniversityDegreeVC,
  universityDegreeVPSchema,
  UniversityDegreeVP,
  unsignedDegreeVC,
} from './__fixtures__';

describe('verifyVC', () => {
  let vc: VC;

  beforeAll(async () => {
    vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite(),
    });
  });

  it('verifies a valid VC', async () => {
    const result = await verifyVC({
      vc,
      documentLoader,
      getSuite: ({ controller }) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite();
          case 'did:example:issuer':
            return getIssuerVerifySuite();
          default:
            throw new Error(`Unknown controller: ${controller}`);
        }
      },
    });

    expect(result.success).toBeTruthy();
    if (result.success) {
      expectType<VC>(result.vc);
    }
  });

  it('verifies a valid VC with custom type/schema', async () => {
    const vc = await signVC({
      unsigned: unsignedDegreeVC,
      documentLoader,
      suite: await getIssuerSignSuite(),
    });

    const result = await verifyVC<UniversityDegreeVC>({
      vc,
      documentLoader,
      getSuite: ({ controller }) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite();
          case 'did:example:issuer':
            return getIssuerVerifySuite();
          default:
            throw new Error(`Unknown controller: ${controller}`);
        }
      },
      schema: universityDegreeVCSchema,
    });

    expect(result.success).toBeTruthy();
    if (result.success) {
      expectType<UniversityDegreeVC>(result.vc);
    }
  });

  describe('it does not verify a VC when', () => {
    it('the VC has been tampered with', async () => {
      const tampered = {
        ...vc,
        credentialSubject: {
          ...vc.credentialSubject,
          degree: {
            type: 'MasterDegree',
            name: 'Master of Science and Arts',
          },
        },
      };
      const result = await verifyVC({
        vc: tampered,
        documentLoader,
        getSuite: ({ controller }) => {
          switch (controller) {
            case 'did:example:holder':
              return getHolderVerifySuite();
            case 'did:example:issuer':
              return getIssuerVerifySuite();
            default:
              throw new Error(`Unknown controller: ${controller}`);
          }
        },
      });

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.schemaErrors).toBeUndefined();
        expect(result.proofErrors).toMatchInlineSnapshot(`
          Array [
            [Error: Invalid signature.],
          ]
        `);
      }
    });

    it('the VC does not match the schema', async () => {
      const invalid = await signVC({
        unsigned: {
          ...unsignedVC,
          type: ['UniversityDegreeCredential', 'VerifiableCredential'],
        } as any,
        documentLoader,
        suite: await getIssuerSignSuite(),
      });

      const result = await verifyVC({
        vc: invalid,
        documentLoader,
        getSuite: ({ controller }) => {
          switch (controller) {
            case 'did:example:holder':
              return getHolderVerifySuite();
            case 'did:example:issuer':
              return getIssuerVerifySuite();
            default:
              throw new Error(`Unknown controller: ${controller}`);
          }
        },
      });

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.proofErrors).toBeUndefined();
        expect(result.schemaErrors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "/type/0",
              "keyword": "const",
              "message": "must be equal to constant",
              "params": Object {
                "allowedValue": "VerifiableCredential",
              },
              "schemaPath": "#/properties/type/items/0/const",
            },
          ]
        `);
      }
    });

    it('the VC has unknown fields', async () => {
      type RevocableVC = VC & {
        credentialStatus: {
          id: string;
          type: string;
          revocationListIndex: string;
          revocationListCredential: string;
        };
      };

      const invalid = await signVC<RevocableVC>({
        unsigned: {
          ...unsignedVC,
          '@context': [
            ...unsignedVC['@context'],
            'https://w3id.org/vc-revocation-list-2020/v1',
          ],
          credentialStatus: {
            id: 'https://dmv.example.gov/credentials/status/3#94567',
            type: 'RevocationList2020Status',
            revocationListIndex: '94567',
            revocationListCredential:
              'https://example.com/credentials/status/3',
          },
        },
        documentLoader,
        suite: await getIssuerSignSuite(),
      });

      const result = await verifyVC({
        vc: invalid,
        documentLoader,
        getSuite: ({ controller }) => {
          switch (controller) {
            case 'did:example:holder':
              return getHolderVerifySuite();
            case 'did:example:issuer':
              return getIssuerVerifySuite();
            default:
              throw new Error(`Unknown controller: ${controller}`);
          }
        },
      });

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.proofErrors).toBeUndefined();
        expect(result.schemaErrors).toMatchInlineSnapshot(`
          Array [
            Object {
              "instancePath": "",
              "keyword": "additionalProperties",
              "message": "must NOT have additional properties",
              "params": Object {
                "additionalProperty": "credentialStatus",
              },
              "schemaPath": "#/additionalProperties",
            },
          ]
        `);
      }
    });
  });
});

describe('verifyVP', () => {
  let vc: VC;
  let vp: VP;

  beforeAll(async () => {
    vc = await signVC({
      unsigned: unsignedVC,
      documentLoader,
      suite: await getIssuerSignSuite(),
    });

    vp = await signVP({
      unsigned: getUnsignedVP([vc]),
      documentLoader,
      suite: await getHolderSignSuite(),
      proofPurposeOptions: {
        challenge: 'challenge',
        domain: 'domain',
      },
    });
  });

  it('verifies a valid VP containing a valid VC', async () => {
    const result = await verifyVP({
      vp,
      documentLoader,
      getSuite: ({ controller }) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite();
          case 'did:example:issuer':
            return getIssuerVerifySuite();
          default:
            throw new Error(`Unknown controller: ${controller}`);
        }
      },
    });

    expect(result.success).toBeTruthy();
    if (result.success) {
      expectType<VP>(result.vp);
    }
  });

  it('verifies a valid VP containing a valid VC with custom type/schema', async () => {
    const vc = await signVC({
      unsigned: unsignedDegreeVC,
      documentLoader,
      suite: await getIssuerSignSuite(),
    });

    const vp = await signVP({
      unsigned: getUnsignedVP([vc]),
      documentLoader,
      suite: await getHolderSignSuite(),
      proofPurposeOptions: {
        challenge: 'challenge',
        domain: 'domain',
      },
    });

    const result = await verifyVP<UniversityDegreeVP>({
      vp,
      documentLoader,
      getSuite: ({ controller }) => {
        switch (controller) {
          case 'did:example:holder':
            return getHolderVerifySuite();
          case 'did:example:issuer':
            return getIssuerVerifySuite();
          default:
            throw new Error(`Unknown controller: ${controller}`);
        }
      },
      schema: universityDegreeVPSchema,
    });

    if (!result.success) console.log({ errors: result.schemaErrors });

    expect(result.success).toBeTruthy();
    if (result.success) {
      expectType<UniversityDegreeVP>(result.vp);
    }
  });

  describe('it does not verify a VP when', () => {
    it('the VP has been tampered with', async () => {
      const tampered = {
        ...vp,
        id: 'urn:example:invalid',
      };
      const result = await verifyVP({
        vp: tampered,
        documentLoader,
        getSuite: ({ controller }) => {
          switch (controller) {
            case 'did:example:holder':
              return getHolderVerifySuite();
            case 'did:example:issuer':
              return getIssuerVerifySuite();
            default:
              throw new Error(`Unknown controller: ${controller}`);
          }
        },
      });

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.schemaErrors).toBeUndefined();
        expect(result.credentialProofErrors).toBeUndefined();
        expect(result.proofErrors).toMatchInlineSnapshot(`
          Array [
            [Error: Invalid signature.],
          ]
        `);
      }
    });

    it('one of the VCs within the VP has been tampered with', async () => {
      const tampered = {
        ...vc,
        credentialSubject: {
          ...vc.credentialSubject,
          degree: {
            type: 'MasterDegree',
            name: 'Master of Science and Arts',
          },
        },
      };
      const vp = await signVP({
        unsigned: getUnsignedVP([tampered]),
        documentLoader,
        suite: await getHolderSignSuite(),
        proofPurposeOptions: {
          challenge: 'challenge',
          domain: 'domain',
        },
      });
      const result = await verifyVP({
        vp,
        documentLoader,
        getSuite: ({ controller }) => {
          switch (controller) {
            case 'did:example:holder':
              return getHolderVerifySuite();
            case 'did:example:issuer':
              return getIssuerVerifySuite();
            default:
              throw new Error(`Unknown controller: ${controller}`);
          }
        },
      });

      expect(result.success).toBeFalsy();
      if (!result.success) {
        expect(result.schemaErrors).toBeUndefined();
        expect(result.proofErrors).toBeUndefined();
        expect(result.credentialProofErrors).toMatchInlineSnapshot(`
          Array [
            Object {
              "errors": Array [
                [Error: Invalid signature.],
              ],
              "id": "urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
            },
          ]
        `);
      }
    });

    it.skip("the VP doesn't match the schema", async () => {});
  });
});
