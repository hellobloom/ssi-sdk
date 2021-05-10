import { expectType } from 'tsd';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';

import { VC, VP } from '../core';
import { signVC, signVP } from '../sign';
import { verifyVC, verifyVP } from '../verify';

import {
  documentLoader,
  unsignedVC,
  getUnsignedVP,
  getIssuerEd25519Suite,
  getIssuerEcdsaSecp256k1Suite,
  getHolderEd25519Suite,
  getHolderEcdsaSecp256k1Suite,
  getVerifySuite,
  universityDegreeVCSchema,
  UniversityDegreeVC,
  universityDegreeVPSchema,
  UniversityDegreeVP,
  unsignedDegreeVC,
} from './__fixtures__';

describe('verifyVC', () => {
  [
    {
      name: 'Ed25519 Signature',
      suite: getIssuerEd25519Suite(),
    },
    {
      name: 'EcdsaSecp256k1 Signature',
      suite: getIssuerEcdsaSecp256k1Suite(),
    },
  ].forEach(({name, suite}) => {
    describe(name, () => {
      it('verifies a valid VC', async () => {
        const vc = await signVC({
          unsigned: unsignedVC,
          documentLoader,
          suite,
        });

        const result = await verifyVC({
          vc,
          documentLoader,
          getSuite: getVerifySuite,
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
          suite,
        });

        const result = await verifyVC<UniversityDegreeVC>({
          vc,
          documentLoader,
          getSuite: getVerifySuite,
          schema: universityDegreeVCSchema,
        });

        expect(result.success).toBeTruthy();
        if (result.success) {
          expectType<UniversityDegreeVC>(result.vc);
        }
      });

      describe('it does not verify a VC when', () => {
        it('the VC has been tampered with', async () => {
          const vc = await signVC({
            unsigned: unsignedDegreeVC,
            documentLoader,
            suite,
          });
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
            getSuite: getVerifySuite,
            schema: universityDegreeVCSchema,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.schemaErrors).toBeUndefined();
            expect(result.issuanceErrors).toBeUndefined();
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
            suite,
          });

          const result = await verifyVC({
            vc: invalid,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.proofErrors).toBeUndefined();
            expect(result.issuanceErrors).toBeUndefined();
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

        it("the VC's issuanceDate is in the future", async () => {
          const issuanceDate = addDays(new Date(), 1).toISOString();
          const inactive = await signVC({
            unsigned: {
              ...unsignedVC,
              issuanceDate,
            } as any,
            documentLoader,
            suite,
          });

          const result = await verifyVC({
            vc: inactive,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.proofErrors).toBeUndefined();
            expect(result.schemaErrors).toBeUndefined();
            expect(result.issuanceErrors).toBeDefined();
            expect(result.issuanceErrors).toHaveLength(1);
            expect(result.issuanceErrors![0].type).toEqual('inactive');
            expect(result.issuanceErrors![0].message).toEqual(
              `VC is inactive until ${issuanceDate}`
            );
          }
        });

        it("the VC's expirationDate is in the past", async () => {
          const expirationDate = subDays(new Date(), 1).toISOString();
          const inactive = await signVC({
            unsigned: {
              ...unsignedVC,
              expirationDate,
            } as any,
            documentLoader,
            suite,
          });

          const result = await verifyVC({
            vc: inactive,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.proofErrors).toBeUndefined();
            expect(result.schemaErrors).toBeUndefined();
            expect(result.issuanceErrors).toBeDefined();
            expect(result.issuanceErrors).toHaveLength(1);
            expect(result.issuanceErrors![0].type).toEqual('expired');
            expect(result.issuanceErrors![0].message).toEqual(
              `VC expired at ${expirationDate}`
            );
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
            suite,
          });

          const result = await verifyVC({
            vc: invalid,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.proofErrors).toBeUndefined();
            expect(result.issuanceErrors).toBeUndefined();
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
    })
  })
});

describe('verifyVP', () => {
  [
    {
      name: 'Ed25519 Signature',
      suite: getIssuerEd25519Suite(),
      holderSuite: getHolderEd25519Suite()
    },
    {
      name: 'EcdsaSecp256k1 Signature',
      suite: getIssuerEcdsaSecp256k1Suite(),
      holderSuite: getHolderEcdsaSecp256k1Suite(),
    },
    {
      name: 'Ed25519 Signature + EcdsaSecp256k1 Signature',
      suite: getIssuerEd25519Suite(),
      holderSuite: getHolderEcdsaSecp256k1Suite()
    },
    {
      name: 'EcdsaSecp256k1 Signature + Ed25519 Signature',
      suite: getIssuerEcdsaSecp256k1Suite(),
      holderSuite: getHolderEd25519Suite(),
    },
  ].forEach(({name, suite, holderSuite}) => {
    describe(name, () => {
      it('verifies a valid VP containing a valid VC', async () => {
        const vc = await signVC({
          unsigned: unsignedVC,
          documentLoader,
          suite,
        });

        const vp = await signVP({
          unsigned: getUnsignedVP([vc]),
          documentLoader,
          suite: holderSuite,
          proofPurposeOptions: {
            challenge: 'challenge',
            domain: 'domain',
          },
        });

        const result = await verifyVP({
          vp,
          documentLoader,
          getSuite: getVerifySuite,
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
          suite,
        });

        const vp = await signVP({
          unsigned: getUnsignedVP([vc]),
          documentLoader,
          suite: holderSuite,
          proofPurposeOptions: {
            challenge: 'challenge',
            domain: 'domain',
          },
        });

        const result = await verifyVP<UniversityDegreeVP>({
          vp,
          documentLoader,
          getSuite: getVerifySuite,
          schema: universityDegreeVPSchema,
        });

        expect(result.success).toBeTruthy();
        if (result.success) {
          expectType<UniversityDegreeVP>(result.vp);
        }
      });

      describe('it does not verify a VP when', () => {
        it('the VP has been tampered with', async () => {
          const vc = await signVC({
            unsigned: unsignedVC,
            documentLoader,
            suite,
          });

          const vp = await signVP({
            unsigned: getUnsignedVP([vc]),
            documentLoader,
            suite: holderSuite,
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          });

          const tampered = {
            ...vp,
            id: 'urn:example:invalid',
          };
          const result = await verifyVP({
            vp: tampered,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.schemaErrors).toBeUndefined();
            expect(result.credentialProofErrors).toBeUndefined();
            expect(result.credentialIssuanceErrors).toBeUndefined();
            expect(result.proofErrors).toMatchInlineSnapshot(`
              Array [
                [Error: Invalid signature.],
              ]
            `);
          }
        });

        it('one of the VCs within the VP has been tampered with', async () => {
          const vc = await signVC({
            unsigned: unsignedDegreeVC,
            documentLoader,
            suite,
          });
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
            suite: holderSuite,
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          });
          const result = await verifyVP({
            vp,
            documentLoader,
            getSuite: getVerifySuite,
            schema: universityDegreeVPSchema,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.schemaErrors).toBeUndefined();
            expect(result.proofErrors).toBeUndefined();
            expect(result.credentialIssuanceErrors).toBeUndefined();
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

        it('one the VCs within the VP has an issuanceDate is in the future', async () => {
          const issuanceDate = addDays(new Date(), 1).toISOString();
          const inactive = await signVC({
            unsigned: {
              ...unsignedVC,
              issuanceDate,
            } as any,
            documentLoader,
            suite,
          });
          const vp = await signVP({
            unsigned: getUnsignedVP([inactive]),
            documentLoader,
            suite: holderSuite,
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          });

          const result = await verifyVP({
            vp,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.schemaErrors).toBeUndefined();
            expect(result.proofErrors).toBeUndefined();
            expect(result.credentialProofErrors).toBeUndefined();
            expect(result.credentialIssuanceErrors).toBeDefined();
            expect(result.credentialIssuanceErrors).toHaveLength(1);
            expect(result.credentialIssuanceErrors![0].id).toEqual(
              'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            );
            expect(result.credentialIssuanceErrors![0].errors).toHaveLength(1);
            expect(result.credentialIssuanceErrors![0].errors[0].type).toEqual(
              'inactive'
            );
            expect(result.credentialIssuanceErrors![0].errors[0].message).toEqual(
              `VC is inactive until ${issuanceDate}`
            );
          }
        });

        it("the VC's expirationDate is in the past", async () => {
          const expirationDate = subDays(new Date(), 1).toISOString();
          const expired = await signVC({
            unsigned: {
              ...unsignedVC,
              expirationDate,
            } as any,
            documentLoader,
            suite,
          });

          const vp = await signVP({
            unsigned: getUnsignedVP([expired]),
            documentLoader,
            suite: holderSuite,
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          });

          const result = await verifyVP({
            vp,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.schemaErrors).toBeUndefined();
            expect(result.proofErrors).toBeUndefined();
            expect(result.credentialProofErrors).toBeUndefined();
            expect(result.credentialIssuanceErrors).toBeDefined();
            expect(result.credentialIssuanceErrors).toHaveLength(1);
            expect(result.credentialIssuanceErrors![0].id).toEqual(
              'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
            );
            expect(result.credentialIssuanceErrors![0].errors).toHaveLength(1);
            expect(result.credentialIssuanceErrors![0].errors[0].type).toEqual(
              'expired'
            );
            expect(result.credentialIssuanceErrors![0].errors[0].message).toEqual(
              `VC expired at ${expirationDate}`
            );
          }
        });

        it("the VP doesn't match the schema", async () => {
          const vc = await signVC({
            unsigned: unsignedVC,
            documentLoader,
            suite,
          });
          type PresentationSubmission = VP & {
            presentation_submission: Record<string, unknown>;
          };
          const vp = await signVP<PresentationSubmission>({
            unsigned: {
              '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://w3id.org/security/suites/ed25519-2020/v1',
                'https://identity.foundation/presentation-exchange/submission/v1',
              ],
              id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              holder: 'did:example:holder',
              verifiableCredential: [vc],
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                descriptor_map: [],
              },
            },
            documentLoader,
            suite: holderSuite,
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          });

          const result = await verifyVP({
            vp,
            documentLoader,
            getSuite: getVerifySuite,
          });

          expect(result.success).toBeFalsy();
          if (!result.success) {
            expect(result.proofErrors).toBeUndefined();
            expect(result.credentialProofErrors).toBeUndefined();
            expect(result.credentialIssuanceErrors).toBeUndefined();
            expect(result.schemaErrors).toMatchInlineSnapshot(`
              Array [
                Object {
                  "instancePath": "",
                  "keyword": "additionalProperties",
                  "message": "must NOT have additional properties",
                  "params": Object {
                    "additionalProperty": "presentation_submission",
                  },
                  "schemaPath": "#/additionalProperties",
                },
              ]
            `);
          }
        });
      });
    })
  })
});
