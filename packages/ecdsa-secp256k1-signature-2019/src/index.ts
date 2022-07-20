// @ts-nocheck
import { EcdsaSecp256k1VerificationKey2019 } from '@bloomprotocol/ecdsa-secp256k1-verification-key-2019'

import { context } from './context'

// @ts-expect-error: implicit type import; not a ts package
import jsonld from 'jsonld'
// @ts-expect-error: implicit type import; not a ts package
import jsigs from 'jsonld-signatures'

const SUITE_CONTEXT_URL = 'https://ns.did.ai/suites/secp256k1-2019/v1'

const includesContext = ({ document, contextUrl }: { document: Record<string, unknown>; contextUrl: string }) => {
  const context = document['@context']
  return context === contextUrl || (Array.isArray(context) && context.includes(contextUrl))
}

const includesCompatibleContext = ({ document }: { document: Record<string, unknown> }) => {
  const credContext = 'https://www.w3.org/2018/credentials/v1'
  const securityContext = 'https://w3id.org/security/v2'

  const hasSecp256k12019 = includesContext({
    document,
    contextUrl: SUITE_CONTEXT_URL,
  })
  const hasCred = includesContext({ document, contextUrl: credContext })
  const hasSecV2 = includesContext({ document, contextUrl: securityContext })

  if (hasSecp256k12019 && hasCred) {
    // eslint-disable-next-line no-console
    console.warn('Warning: The secp256k1-2019/v1 and credentials/v1 contexts are incompatible.')
    // eslint-disable-next-line no-console
    console.warn('For VCs using EcdsaSecp256k1Signature2019 suite, using the credentials/v1 context is sufficient.')
    return false
  }

  if (hasSecp256k12019 && hasSecV2) {
    // eslint-disable-next-line no-console
    console.warn('Warning: The secp256k1-2019/v1 and security/v2 contexts are incompatible.')
    // eslint-disable-next-line no-console
    console.warn('For VCs using EcdsaSecp256k1Signature2019 suite, using the security/v2 context is sufficient.')
    return false
  }

  return hasSecp256k12019 || hasCred || hasSecV2
}

type EcdsaSecp256k1Signature2019Options = {
  key?: EcdsaSecp256k1VerificationKey2019
  signer?: { sign: Function; id: string }
  verifier?: { verify: Function; id: string }
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
      ...options,
    })

    this.requiredKeyType = 'EcdsaSecp256k1VerificationKey2019'
  }

  async sign({ verifyData, proof }: { verifyData: Uint8Array; proof: Record<string, any> }) {
    if (!(this.signer && typeof this.signer.sign === 'function')) {
      throw new Error('A signer API has not been specified.')
    }

    const jws = await this.signer.sign({ data: verifyData })

    return {
      ...proof,
      jws,
    }
  }

  async verifySignature({
    verifyData,
    verificationMethod,
    proof,
  }: {
    verifyData: Uint8Array
    verificationMethod: Record<string, unknown>
    proof: Record<string, unknown>
  }) {
    const { jws } = proof

    if (!(jws && typeof jws === 'string')) {
      throw new TypeError('The proof does not include a valid "jws" property.')
    }

    let { verifier } = this
    if (!verifier) {
      const key = await this.LDKeyClass.from(verificationMethod)
      verifier = key.verifier()
    }

    return verifier.verify({ data: verifyData, signature: jws })
  }

  async assertVerificationMethod({ verificationMethod }: { verificationMethod: Record<string, unknown> }) {
    if (!includesCompatibleContext({ document: verificationMethod })) {
      throw new TypeError(`The verification method (key) must contain "${this.contextUrl}".`)
    }

    if (!jsonld.hasValue(verificationMethod, 'type', this.requiredKeyType)) {
      throw new Error(`Invalid key type. Key type must be "${this.requiredKeyType}".`)
    }

    if (verificationMethod.revoked !== undefined) {
      throw new Error('The verification method has been revoked.')
    }
  }

  async getVerificationMethod({
    proof,
    documentLoader,
  }: {
    proof: { verificationMethod: string | { id: string } | undefined }
    documentLoader: Function
  }) {
    if (this.key) {
      return this.key.export({ publicKey: true })
    }

    const verificationMethod = typeof proof.verificationMethod === 'object' ? proof.verificationMethod.id : proof.verificationMethod

    if (!verificationMethod) {
      throw new Error('No "verificationMethod" found in proof.')
    }

    const framed = await jsonld.frame(
      verificationMethod,
      {
        '@context': this.contextUrl,
        '@embed': '@always',
        id: verificationMethod,
      },
      { documentLoader, compactToRelative: false },
    )

    if (!framed) {
      throw new Error(`Verification method ${verificationMethod} not found.`)
    }

    if (framed.revoked !== undefined) {
      throw new Error('The verification method has been revoked.')
    }

    await this.assertVerificationMethod({ verificationMethod: framed })

    return framed
  }

  async matchProof({
    proof,
    document,
    purpose,
    documentLoader,
    expansionMap,
  }: {
    proof: Record<string, any>
    document: Record<string, any>
    purpose: Record<string, any>
    documentLoader: Function
    expansionMap: Function
  }) {
    if (!includesCompatibleContext({ document })) {
      return false
    }
    if (
      !(await super.matchProof({
        proof,
        document,
        purpose,
        documentLoader,
        expansionMap,
      }))
    ) {
      return false
    }
    if (!this.key) {
      // no key specified, so assume this suite matches and it can be retrieved
      return true
    }

    const { verificationMethod } = proof

    if (typeof verificationMethod === 'object') {
      return verificationMethod.id === this.key.id
    }
    return verificationMethod === this.key.id
  }

  ensureSuiteContext({ document, addSuiteContext }: { document: Record<string, unknown>; addSuiteContext?: boolean }) {
    if (includesCompatibleContext({ document })) {
      return
    }

    super.ensureSuiteContext({ document, addSuiteContext })
  }
}

EcdsaSecp256k1Signature2019.CONTEXT_URL = SUITE_CONTEXT_URL
EcdsaSecp256k1Signature2019.CONTEXT = context
