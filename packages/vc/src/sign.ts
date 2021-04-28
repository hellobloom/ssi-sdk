import { UnsignedVC, VC, UnsignedVP, VP} from "./core";
import { DocumentLoader } from "./shared";

const jsigs = require('jsonld-signatures')
const { AssertionProofPurpose, AuthenticationProofPurpose } = jsigs.purposes

export const signVC = async <VCType extends VC>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions = {}
}: {
  unsigned: UnsignedVC,
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
      compactProof: false,
    },
  )

export const signVP = <VPType extends VP>({
  unsigned,
  documentLoader,
  suite,
  proofPurposeOptions
}: {
  unsigned: UnsignedVP,
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
      compactProof: false,
    },
  )
