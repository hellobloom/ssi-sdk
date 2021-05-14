import { VC, VP } from './core'
import { DocumentLoader } from './shared'
import { CredentialIssuancePurpose } from './purposes'

const jsigs = require('jsonld-signatures')

const { AuthenticationProofPurpose } = jsigs.purposes

export const signVC = async <VCType extends VC>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions = {},
  addSuiteContext,
}: {
  unsigned: Omit<VCType, 'proof'>
  documentLoader: DocumentLoader
  suite: any
  proofPurposeOptions?: Record<string, unknown>
  addSuiteContext?: boolean
}): Promise<VCType> =>
  jsigs.sign(
    { ...unsigned },
    {
      suite,
      documentLoader,
      purpose: new CredentialIssuancePurpose(proofPurposeOptions),
      addSuiteContext,
    },
  )

export const signVP = <VPType extends VP>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions,
  addSuiteContext,
}: {
  unsigned: Omit<VPType, 'proof'>
  documentLoader: DocumentLoader
  suite: any
  proofPurposeOptions: { challenge: string; domain: string } & Record<string, unknown>
  addSuiteContext?: boolean
}): Promise<VPType> =>
  jsigs.sign(
    { ...unsigned },
    {
      suite,
      documentLoader,
      purpose: new AuthenticationProofPurpose(proofPurposeOptions),
      addSuiteContext,
    },
  )
