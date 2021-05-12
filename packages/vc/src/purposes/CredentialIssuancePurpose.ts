import { DocumentLoader } from '../shared';

const jsonld = require('jsonld');
const jsigs = require('jsonld-signatures');

export class CredentialIssuancePurpose extends jsigs.purposes
  .AssertionProofPurpose {
  constructor({
    controller,
    date,
    maxTimestampDelta,
  }: {
    controller?: Record<string, unknown>;
    date?: string | Date | number;
    maxTimestampDelta?: number;
  } = {}) {
    super({ controller, date, maxTimestampDelta });
  }

  async validate(
    proof: Record<string, unknown>,
    {
      document,
      suite,
      verificationMethod,
      documentLoader,
      expansionMap,
    }: {
      document: Record<string, unknown>;
      suite: any;
      verificationMethod: string;
      documentLoader: DocumentLoader;
      expansionMap: () => any;
    }
  ): Promise<{ valid: true } | { valid: false; error: Error }> {
    try {
      const result = await super.validate(proof, {
        document,
        suite,
        verificationMethod,
        documentLoader,
        expansionMap,
      });

      if (!result.valid) throw result.error;

      const issuer = jsonld.getValues(document, 'issuer');

      if (!issuer || issuer.length === 0) {
        throw new Error('Credential issuer is required.');
      }

      const issuerId = typeof issuer[0] === 'string' ? issuer[0] : issuer[0].id;

      if (result.controller.id !== issuerId) {
        throw new Error(
          'Credential issuer must match the verification method controller.'
        );
      }

      return { valid: true };
    } catch (error) {
      return { valid: false, error };
    }
  }
}
