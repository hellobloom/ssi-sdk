import { VC, VP} from "./core";
import { DocumentLoader } from "./shared";

const jsigs = require('jsonld-signatures')
const { AssertionProofPurpose, AuthenticationProofPurpose } = jsigs.purposes

export const signVC = async <VCType extends VC>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions = {}
}: {
  unsigned: Omit<VCType, 'proof'>,
  documentLoader: DocumentLoader,
  suite: any
  proofPurposeOptions?: Record<string, unknown>
}): Promise<VCType> =>
  jsigs.sign(
    {...unsigned},
    {
      suite,
      documentLoader,
      purpose: new AssertionProofPurpose(proofPurposeOptions),
    },
  )

export const signVP = <VPType extends VP>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions
}: {
  unsigned: Omit<VPType, 'proof'>,
  documentLoader: DocumentLoader,
  suite: any
  proofPurposeOptions: {challenge: string, domain: string} & Record<string, unknown>
}): Promise<VPType> =>
  jsigs.sign(
    {...unsigned},
    {
      suite,
      documentLoader,
      purpose: new AuthenticationProofPurpose(proofPurposeOptions),
    },
  )
