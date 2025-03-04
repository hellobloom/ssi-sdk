import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'
import { PostalAddressV2, postalAddressV2Context, GeoCoordinates, geoCoordinatesContext } from '../base/v2'

export type AddressPersonV2 = {
  '@type': 'AddressPerson'
  address: string | PostalAddressV2
  geo?: GeoCoordinates
}

export type VCAddressPersonV2Type = 'AddressCredentialPersonV2'

export const getVCAddressPersonV2ContextConfig = () => {
  const addressPersonContext = createSubjectContext<AddressPersonV2>({
    type: 'AddressPerson',
    base: 'bloomSchema',
    properties: {
      address: 'schema',
      geo: 'schema',
    },
  })

  return createContextConfig<VCAddressPersonV2Type>({
    type: 'AddressCredentialPersonV2',
    subjects: [addressPersonContext, postalAddressV2Context, geoCoordinatesContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCAddressPersonV2 = CreateVCType<[VCAddressPersonV2Type], AddressPersonV2>

export const getVCAddressPersonV2Context = () => {
  return createContext(getVCAddressPersonV2ContextConfig())
}
