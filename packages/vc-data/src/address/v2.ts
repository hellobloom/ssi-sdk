import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import { PostalAddressV2, postalAddresscV2Context } from '../base/v2'

export type AddressPersonV2 = {
  '@type': 'AddressPerson'
  address: string | PostalAddressV2
}

export type VCAddressPersonV2Type = 'AddressCredentialPersonV2'

export const getVCAddressPersonV2ContextConfig = () => {
  const phonePersonContext = createSubjectContext<AddressPersonV2>({
    type: 'AddressPerson',
    base: 'bloomSchema',
    properties: { address: 'schema' },
  })

  return createContextConfig<VCAddressPersonV2Type>({
    type: 'AddressCredentialPersonV2',
    subjects: [phonePersonContext, postalAddresscV2Context],
  })
}

// Export a pre-built VC type and context for easier use

export type VCAddressPersonV2 = CreateVCType<[VCAddressPersonV2Type], AddressPersonV2>

export const getVCAddressPersonV2Context = () => {
  return createContext(getVCAddressPersonV2ContextConfig())
}
