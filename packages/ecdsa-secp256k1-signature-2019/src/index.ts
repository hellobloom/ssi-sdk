import warning from 'tiny-warning';
import {EcdsaSecp256k1VerificationKey2019} from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'

const jsonld = require('jsonld');
const jsigs = require('jsonld-signatures');

import {context} from './context';

const SUITE_CONTEXT_URL = 'https://w3id.org/security/v2';

type EcdsaSecp256k1Signature2019Options = {
  key?: EcdsaSecp256k1VerificationKey2019,
  signer?: {sign: Function, id: string}
  verifier?: {verify: Function, id: string}
  proof?: Record<string, unknown>
  date?: Date | string
  useNativeCanonize?: boolean
}

export class EcdsaSecp256k1Signature2019 extends jsigs.suites.LinkedDataSignature {
  private requiredKeyType: string

  constructor(options: EcdsaSecp256k1Signature2019Options = {}) {
    super({
      type: 'EcdsaSecp256k1Signature2019',
      LDKeyClass: EcdsaSecp256k1VerificationKey2019,
      contextUrl: SUITE_CONTEXT_URL,
      ...options
    });

    this.requiredKeyType = 'EcdsaSecp256k1VerificationKey2019';
  }

  async sign({verifyData, proof}: {verifyData: Uint8Array, proof: Record<string, any>}) {
    if(!(this.signer && typeof this.signer.sign === 'function')) {
      throw new Error('A signer API has not been specified.');
    }

    proof.jws = await this.signer.sign({data: verifyData});

    return proof;
  }

  async verifySignature({
    verifyData,
    verificationMethod,
    proof
  }: {
    verifyData: Uint8Array,
    verificationMethod: Record<string, unknown>,
    proof: Record<string, unknown>
  }) {
    const {jws} = proof;

    if(!(jws && typeof jws === 'string')) {
      throw new TypeError('The proof does not include a valid "proofValue" property.');
    }

    let {verifier} = this;
    if(!verifier) {
      const key = await this.LDKeyClass.from(verificationMethod);
      verifier = key.verifier();
    }

    return verifier.verify({data: verifyData, signature: jws});
  }

  async assertVerificationMethod({verificationMethod}: {verificationMethod: Record<string, unknown>}) {
    if(!jsonld.hasValue(verificationMethod, 'type', this.requiredKeyType)) {
      throw new Error(
        `Invalid key type. Key type must be "${this.requiredKeyType}".`);
    }

    // ensure verification method has not been revoked
    if(verificationMethod.revoked !== undefined) {
      throw new Error('The verification method has been revoked.');
    }
  }

  async getVerificationMethod({
    proof,
    documentLoader
  }: {
    proof: Record<string, unknown>,
    documentLoader: Function
  }) {
    let {verificationMethod} = proof;


    if(verificationMethod && typeof verificationMethod === 'object' && hasOwnProperty(verificationMethod, 'id')) {
      verificationMethod = verificationMethod.id;
    }

    if(!verificationMethod) {
      throw new Error('No "verificationMethod" found in proof.');
    }

    // Note: `expansionMap` is intentionally not passed; we can safely drop
    // properties here and must allow for it
    const framed = await jsonld.frame(verificationMethod, {
      '@context': this.contextUrl,
      '@embed': '@always',
      id: verificationMethod
    }, {documentLoader, compactToRelative: false});
    if(!framed) {
      throw new Error(`Verification method ${verificationMethod} not found.`);
    }

    // ensure verification method has not been revoked
    if(framed.revoked !== undefined) {
      throw new Error('The verification method has been revoked.');
    }

    await this.assertVerificationMethod({verificationMethod: framed});

    return framed;
  }

  async matchProof({
    proof,
    document,
    purpose,
    documentLoader,
    expansionMap
  }: {
    proof: Record<string, any>
    document: Record<string, any>
    purpose: Record<string, any>
    documentLoader: Function
    expansionMap: Function
  }) {
    if(!await super.matchProof({proof, document, purpose, documentLoader, expansionMap})) {
      return false;
    }
    if(!this.key) {
      // no key specified, so assume this suite matches and it can be retrieved
      return true;
    }

    const {verificationMethod} = proof;

    // only match if the key specified matches the one in the proof
    if(typeof verificationMethod === 'object') {
      return verificationMethod.id === this.key.id;
    }
    return verificationMethod === this.key.id;
  }

  ensureSuiteContext({document, addSuiteContext}: {document: Record<string, unknown>, addSuiteContext?: boolean}) {
    const {contextUrl} = this;

    if(includesContext({document, contextUrl})) {
      // document already includes the required context
      return;
    }

    if (!addSuiteContext) {
      warning(true, `The document to be signed must contain a context that includes "EcdsaSecp256k1Signature2019". One option is ${contextUrl}`);
      return;
    }

    // enforce the suite's context by adding it to the document
    const existingContext = document['@context'] || [];

    document['@context'] = Array.isArray(existingContext) ?
      [...existingContext, contextUrl] : [existingContext, contextUrl];
  }
}

const includesContext = ({document, contextUrl}: {document: Record<string, unknown>, contextUrl: string}) => {
  const context = document['@context'];
  return context === contextUrl ||
    (Array.isArray(context) && context.includes(contextUrl));
}

const hasOwnProperty = <X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> => {
  return obj.hasOwnProperty(prop)
}

EcdsaSecp256k1Signature2019.CONTEXT_URL = SUITE_CONTEXT_URL;
EcdsaSecp256k1Signature2019.CONTEXT = context;
