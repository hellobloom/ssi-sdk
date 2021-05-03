import Ajv, {ErrorObject} from "ajv"
import addFormats from "ajv-formats"
import { JSONSchema } from "json-schema-to-ts"

import { DocumentLoader } from "./shared"
import { VP, vpSchema, VC, vcSchema } from "./core"
import { CredentialIssuancePurpose } from "./purposes"

const jsigs = require('jsonld-signatures')
const { AuthenticationProofPurpose } = jsigs.purposes

export type GetSuiteOptions = {
  verificationMethod: string
  controller: string
  proofType: string
}

export type GetSuiteFn = (options: GetSuiteOptions) => any | Promise<any>

export type GetProofPurposeOptionsOptions = {
  proofPurpose: string
  verificationMethod: string
  controller: string
}

export type GetProofPurposeOptionsFn = (
  options: GetProofPurposeOptionsOptions,
) => Record<string, unknown> | Promise<Record<string, unknown>>

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
  getProofPurposeOptions?: GetProofPurposeOptionsFn
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
    purpose: new CredentialIssuancePurpose(proofPurposeOptions || {}),
  })

  if (result.verified) {
    return {success: true}
  } else {
    return {success: false, errors: result.error.errors }
  }
}

type IssuanceError = {
  type: 'expired' | 'inactive'
  message: string
}

type VerifyVCIssuanceResponseSuccess = {
  success: true
}

type VerifyVCIssuanceResponseFailure = {
  success: false
  errors: IssuanceError[]
}

type VerifyVCIssuanceResponse = VerifyVCIssuanceResponseSuccess | VerifyVCIssuanceResponseFailure

type VerifyVCIssuance = (opts: {vc: VC}) => VerifyVCIssuanceResponse

const verifyVCIssuance: VerifyVCIssuance = ({vc}) => {
  const now = new Date()

  let errors: IssuanceError[] = []

  if (now < new Date(vc.issuanceDate)) {
    errors.push({
      type: 'inactive',
      message: `VC is inactive until ${vc.issuanceDate}`
    })
  }

  if (vc.expirationDate && now > new Date(vc.expirationDate)) {
    errors.push({
      type: 'expired',
      message: `VC expired at ${vc.expirationDate}`
    })
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors
    }
  }

  return {success: true}
}

type VerifyVPProofResponseSuccess = {
  success: true
}

type VerifyVPProofResponseFailure = {
  success: false
  errors?: ProofError[]
  credentialErrors?: {id: string, errors: ProofError[]}[]
}

type VerifyVPProofResponse = VerifyVPProofResponseSuccess | VerifyVPProofResponseFailure

type VerifyVPProof = (opts: {
  vp: VP
  documentLoader: DocumentLoader,
  getSuite: GetSuiteFn
  getProofPurposeOptions?: GetProofPurposeOptionsFn
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
  })

  if (!result.verified) {
    return {
      success: false,
      errors: result.error.errors,
    }
  }

  const credentialErrors: {id: string, errors: ProofError[]}[] = []

  await Promise.all(vp.verifiableCredential.map(async (vc) => {
    const result = await verifyVCProof({vc, documentLoader, getSuite, getProofPurposeOptions})
    if (!result.success) {
      credentialErrors.push({
        id: vc.id,
        errors: result.errors
      })
    }
  }))

  if (credentialErrors.length > 0) {
    return {
      success: false,
      credentialErrors: credentialErrors
    }
  }

  return {
    success: true,
  }
}

type VerifyVPIssuanceResponseSuccess = {
  success: true
}

type VerifyVPIssuanceResponseFailure = {
  success: false
  credentialErorrs?: {id: string, errors: IssuanceError[]}[]
}

type VerifyVPIssuanceResponse = VerifyVPIssuanceResponseSuccess | VerifyVPIssuanceResponseFailure

type VerifyVPIssuance = (opts: {vp: VP}) => VerifyVPIssuanceResponse

const verifyVPIssuance: VerifyVPIssuance = ({vp}) => {
  const credentialErorrs: {id: string, errors: IssuanceError[]}[] = []

  for (const vc of vp.verifiableCredential) {
    const result = verifyVCIssuance({vc})
    if (!result.success) {
      credentialErorrs.push({
        id: vc.id,
        errors: result.errors
      })
    }
  }

  if (credentialErorrs.length > 0) {
    return {
      success: false,
      credentialErorrs
    }
  }

  return {
    success: true
  }
}

export type VerifyVCResponseSuccess<VCType extends VC> = {
  success: true
  vc: VCType
}

export type VerifyVCResponseFailure = {
  success: false
  schemaErrors?: ErrorObject[]
  proofErrors?: ProofError[]
  issuanceErrors?: IssuanceError[]
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
  getProofPurposeOptions?: GetProofPurposeOptionsFn
  schema?: JSONSchema
  ajv?: Ajv
  schemaKey?: string
}): Promise<VerifyVCResponse<VCType>> => {
  const ajv = _ajv || addFormats(new Ajv({strictTuples: false}))
  const schema = _schema || vcSchema
  const validate = ajv.getSchema<VCType>(schemaKey) || ajv.addSchema(schema, schemaKey).getSchema<VCType>(schemaKey)!

  if (!validate(vc)) {
    return {
      success: false,
      schemaErrors: validate.errors || undefined
    }
  }

  const proofResult = await verifyVCProof({vc, documentLoader, getSuite, getProofPurposeOptions})

  if (!proofResult.success) {
    return {
      success: false,
      proofErrors: proofResult.errors
    }
  }

  const issuanceResult = verifyVCIssuance({vc})

  if (!issuanceResult.success) {
    return {
      success: false,
      issuanceErrors: issuanceResult.errors,
    }
  }

  return {
    success: true,
    vc,
  }
}

export type VerifyVPResponseSuccess<VPType extends VP> = {
  success: true
  vp: VPType
}

export type VerifyVPResponseFailure = {
  success: false
  schemaErrors?: ErrorObject[]
  proofErrors?: ProofError[]
  credentialProofErrors?: {id: string, errors: ProofError[]}[]
  credentialIssuanceErrors?: {id: string, errors: IssuanceError[]}[]
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
  getProofPurposeOptions?: GetProofPurposeOptionsFn
  schema?: JSONSchema
  ajv?: Ajv
  schemaKey?: string
}): Promise<VerifyVPResponse<VPType>> => {
  const ajv = _ajv || addFormats(new Ajv({strictTuples: false}))
  const schema = _schema || vpSchema
  const validate = ajv.getSchema<VPType>(schemaKey) || ajv.addSchema(schema, schemaKey).getSchema<VPType>(schemaKey)!

  if (!validate(vp)) {
    return {
      success: false,
      schemaErrors: validate.errors || undefined
    }
  }

  const proofResult = await verifyVPProof({vp, documentLoader, getSuite, getProofPurposeOptions})

  if (!proofResult.success) {
    return {
      success: false,
      proofErrors: proofResult.errors,
      credentialProofErrors: proofResult.credentialErrors,
    }
  }

  const issuanceResult = verifyVPIssuance({vp})

  if (!issuanceResult.success) {
    return {
      success: false,
      credentialIssuanceErrors: issuanceResult.credentialErorrs
    }
  }

  return {
    success: true,
    vp
  }
}
