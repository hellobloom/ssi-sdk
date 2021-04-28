import Ajv, {ErrorObject} from "ajv"
import addFormats from "ajv-formats"
import { JSONSchema } from "json-schema-to-ts"

import { DocumentLoader } from "./shared"
import { VP, vpSchema, VC, vcSchema } from "./core"

const jsigs = require('jsonld-signatures')
const { AssertionProofPurpose, AuthenticationProofPurpose } = jsigs.purposes

export type GetSuiteOptions = {
  verificationMethod: string
  controller: string
  proofType: string
}

export type GetSuiteFn = (options: GetSuiteOptions) => any | Promise<any>

export type GetVerifierProofPurposeOptionsOptions = {
  proofPurpose: string
  verificationMethod: string
  controller: string
}

export type GetVerifierProofPurposeOptionsFn = (
  options: GetVerifierProofPurposeOptionsOptions,
) => Record<string, any> | Promise<Record<string, any>>

export type ProofError = Error

type VerifyVCProofResponseSuccess = {
  success: true
}

type VerifyVCProofResponseFailure = {
  success: false
  errors: ProofError[]
}

type VerifyVCProofResponse = VerifyVCProofResponseSuccess | VerifyVCProofResponseFailure

type VerifyVCProof = (opts: {
  vc: VC
  documentLoader: DocumentLoader,
  getSuite: GetSuiteFn
  getProofPurposeOptions?: GetVerifierProofPurposeOptionsFn
}) => Promise<VerifyVCProofResponse>

const verifyVCProof: VerifyVCProof = async ({vc, documentLoader, getSuite, getProofPurposeOptions}) => {
  const [suite, proofPurposeOptions] = await Promise.all([
    getSuite({
      verificationMethod: vc.proof.verificationMethod,
      controller: typeof vc.issuer === 'string' ? vc.issuer : vc.issuer.id,
      proofType: vc.proof.type,
    }),
    (() => {
      if (typeof getProofPurposeOptions === 'undefined') return undefined

      return getProofPurposeOptions({
        verificationMethod: vc.proof.verificationMethod,
        controller: typeof vc.issuer === 'string' ? vc.issuer : vc.issuer.id,
        proofPurpose: vc.proof.proofPurpose,
      })
    })()
  ])

  const result = await jsigs.verify(vc, {
    suite,
    documentLoader,
    purpose: new AssertionProofPurpose(proofPurposeOptions || {}),
    compactProof: false,
  })

  if (result.verified) {
    return {success: true}
  } else {
    return {success: false, errors: result.error.errors }
  }
}

type VerifyVPProofResponseSuccess = {
  success: true
}

type VerifyVPProofResponseFailure = {
  success: false
  errors: ProofError[]
  credentialErrors: {id: string, errors: ProofError[]}[]
}

type VerifyVPProofResponse = VerifyVPProofResponseSuccess | VerifyVPProofResponseFailure

type VerifyVPProof = (opts: {
  vp: VP
  documentLoader: DocumentLoader,
  getSuite: GetSuiteFn
  getProofPurposeOptions?: GetVerifierProofPurposeOptionsFn
}) => Promise<VerifyVPProofResponse>

const verifyVPProof: VerifyVPProof = async ({vp, documentLoader, getSuite, getProofPurposeOptions}) => {
  const [suite, proofPurposeOptions] = await Promise.all([
    getSuite({
      verificationMethod: vp.proof.verificationMethod,
      controller: typeof vp.holder === 'string' ? vp.holder : vp.holder.id,
      proofType: vp.proof.type,
    }),
    (() => {
      if (typeof getProofPurposeOptions === 'undefined') return undefined

      return getProofPurposeOptions({
        verificationMethod: vp.proof.verificationMethod,
        controller: typeof vp.holder === 'string' ? vp.holder : vp.holder.id,
        proofPurpose: vp.proof.proofPurpose,
      })
    })()
  ])

  const result = await jsigs.verify(vp, {
    suite,
    documentLoader,
    purpose: new AuthenticationProofPurpose({
      challenge: vp.proof.challenge,
      domain: vp.proof.domain,
      ...(proofPurposeOptions || {}),
    }),
    compactProof: false,
  })

  const credentialErrors: {id: string, errors: ProofError[]}[] = []
  if (result.verified) {
    await Promise.all(vp.verifiableCredential.map(async (vc) => {
      const result = await verifyVCProof({vc, documentLoader, getSuite, getProofPurposeOptions})
      if (!result.success) {
        credentialErrors.push({
          id: vc.id,
          errors: result.errors
        })
      }
    }))

    if (credentialErrors.length === 0) {
      return {success: true}
    }
  }

  return {success: false, errors: result.error.errors, credentialErrors }
}

export type VerifyVCResponseSuccess<VCType extends VC> = {
  success: true
  vc: VCType
}

export type VerifyVCResponseFailure = {
  success: false
  schemaErrors?: null | ErrorObject[]
  proofErrors?: ProofError[]
}

export type VerifyVCResponse<VCType extends VC> = VerifyVCResponseSuccess<VCType> | VerifyVCResponseFailure

export const verifyVC = async <VCType extends VC>({
  vc,
  documentLoader,
  getSuite,
  getProofPurposeOptions,
  schema: _schema,
  ajv: _ajv,
  schemaKey = 'vcSchema',
} : {
  vc: unknown
  documentLoader: DocumentLoader,
  getSuite: GetSuiteFn
  getProofPurposeOptions?: GetVerifierProofPurposeOptionsFn
  schema?: JSONSchema
  ajv?: Ajv
  schemaKey?: string
}): Promise<VerifyVCResponse<VCType>> => {
  const ajv = _ajv || addFormats(new Ajv({strictTuples: false}))
  const schema = _schema || vcSchema
  const validate = ajv.getSchema<VCType>(schemaKey) || ajv.addSchema(schema, schemaKey).getSchema<VCType>(schemaKey)!

  let proofErrors
  if (validate(vc)) {
    const result = await verifyVCProof({vc, documentLoader, getSuite, getProofPurposeOptions})

    if (result.success) {
      return {
        success: true,
        vc,
      }
    }

    proofErrors = result.errors
  }

  return {
    success: false,
    schemaErrors: [],
    proofErrors
  }
}

export type VerifyVPResponseSuccess<VPType extends VP> = {
  success: true
  vp: VPType
}

export type VerifyVPResponseFailure = {
  success: false
  schemaErrors?: null | ErrorObject[]
  proofErrors?: ProofError[]
  credentialProofErrors?: {id: string, errors: ProofError[]}[]
}

export type VerifyVPResponse<VPType extends VP> = VerifyVPResponseSuccess<VPType> | VerifyVPResponseFailure

export const verifyVP = async <VPType extends VP = VP>({
  vp,
  documentLoader,
  getSuite,
  getProofPurposeOptions,
  schema: _schema,
  ajv: _ajv,
  schemaKey = 'vpSchema',
}: {
  vp: unknown
  documentLoader: DocumentLoader,
  getSuite: GetSuiteFn
  getProofPurposeOptions?: GetVerifierProofPurposeOptionsFn
  schema?: JSONSchema
  ajv?: Ajv
  schemaKey?: string
}): Promise<VerifyVPResponse<VPType>> => {
  const ajv = _ajv || addFormats(new Ajv({strictTuples: false}))
  const schema = _schema || vpSchema
  const validate = ajv.getSchema<VPType>(schemaKey) || ajv.addSchema(schema, schemaKey).getSchema<VPType>(schemaKey)!

  let proofErrors
  let credentialProofErrors
  if (validate(vp)) {
    const result = await verifyVPProof({vp, documentLoader, getSuite, getProofPurposeOptions})

    if (result.success === true) {
      return {
        success: true,
        vp,
      }
    }

    proofErrors = result.errors
    credentialProofErrors = result.credentialErrors
  }

  return {
    success: false,
    schemaErrors: validate.errors,
    proofErrors,
    credentialProofErrors,
  }
}
