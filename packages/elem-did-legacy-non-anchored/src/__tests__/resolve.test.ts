import { Resolver } from 'did-resolver';

import { resolve, resolverRegistry } from '../resolve';
import { profiles } from './__fixtures__';

describe('resolve', () => {
  describe('resolverRegistry', () => {
    let resolver: Resolver;

    beforeAll(() => {
      resolver = new Resolver(resolverRegistry);
    });

    test('resolves a valid legacy element DID', async () => {
      const profile = profiles['12Word'];
      const {
        didDocument,
        didDocumentMetadata,
        didResolutionMetadata,
      } = await resolver.resolve(profile.did);

      expect(didDocument).toEqual(profile.didDocument);
      expect(didDocumentMetadata).toMatchInlineSnapshot(`Object {}`);
      expect(didResolutionMetadata).toMatchInlineSnapshot(`Object {}`);
    });

    describe('returns a null document when', () => {
      test("the given DID doesn't have an initial state", async () => {
        const {
          didDocument,
          didDocumentMetadata,
          didResolutionMetadata,
        } = await resolver.resolve(profiles['12Word'].didDocument.id);

        expect(didDocument).toBeNull();
        expect(didDocumentMetadata).toMatchInlineSnapshot(`Object {}`);
        expect(didResolutionMetadata).toMatchInlineSnapshot(`
          Object {
            "error": "invalidDid",
            "message": "Element DID must have the elem:initial-state matrix parameter.",
          }
        `);
      });
    });
  });

  describe('resolve', () => {
    test('resolves a valid legacy element DID', async () => {
      const profile = profiles['12Word'];
      const didDocument = await resolve(profile.did);

      expect(didDocument).toEqual(profile.didDocument);
    });

    describe('returns null when', () => {
      test("the given DID doesn't have an initial state", async () => {
        const didDocument = await resolve(profiles['12Word'].didDocument.id);

        expect(didDocument).toBeNull();
      });
    });
  });
});
