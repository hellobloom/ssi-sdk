import { OneOrMore, createSubjectContext } from '../util/v2'

export type MonetaryAmountV2 = {
  '@type': 'MonetaryAmount'
  currency?: string
  value?: number | string
  availableValue?: number | string
}

export const monetaryAmountV2Context = createSubjectContext<MonetaryAmountV2>({
  type: 'MonetaryAmount',
  base: 'schema',
  properties: {
    currency: 'schema',
    value: 'schema',
    availableValue: 'schema',
  },
})

// Incomplete re: schema.org/PropertyValue but captures needed parts
export type PropertyValueV2 = {
  '@type': 'PropertyValue'
  maxValue?: number
  minValue?: number
  propertyID?: string
  unitCode?: string
  unitText?: string
  value?: string
}

export const propertyValueV2Context = createSubjectContext<PropertyValueV2>({
  type: 'PropertyValue',
  base: 'schema',
  properties: {
    maxValue: 'schema',
    minValue: 'schema',
    propertyID: 'schema',
    unitCode: 'schema',
    unitText: 'schema',
    value: 'schema',
  },
})

export type PostalAddressV2 = {
  '@type': 'PostalAddress'
  addressRaw?: string
  addressName?: string
  addressCountry?: string
  addressLocality?: string
  addressRegion?: string
  postOfficeBoxNumber?: string
  postalCode?: string
  streetAddress?: string
  streetAddress2?: string
}

export const postalAddressV2Context = createSubjectContext<PostalAddressV2>({
  type: 'PostalAddress',
  base: 'schema',
  properties: {
    addressRaw: 'schema',
    addressName: 'schema',
    addressCountry: 'schema',
    addressLocality: 'schema',
    addressRegion: 'schema',
    postOfficeBoxNumber: 'schema',
    postalCode: 'schema',
    streetAddress: 'schema',
    streetAddress2: 'schema',
  },
})

export type GeoCoordinates = {
  '@type': 'GeoCoordinates'
  latitude?: number
  longitude?: number
}

export const geoCoordinatesContext = createSubjectContext<GeoCoordinates>({
  type: 'GeoCoordinates',
  base: 'schema',
  properties: {
    latitude: 'schema',
    longitude: 'schema',
  },
})

export type GenericOrgType = { '@type': string; name?: string; address?: OneOrMore<string | PostalAddressV2> }

export type OrganizationV2 = {
  '@type': 'Organization'
} & Omit<GenericOrgType, '@type'>

export type CountryV2 = {
  '@type': 'Country'
} & Omit<GenericOrgType, '@type'>

export type StateV2 = {
  '@type': 'State'
} & Omit<GenericOrgType, '@type'>

export type CityV2 = {
  '@type': 'City'
} & Omit<GenericOrgType, '@type'>

export type CorporationV2 = {
  '@type': 'Corporation'
} & Omit<GenericOrgType, '@type'>

export type GovernmentOrganizationV2 = {
  '@type': 'GovernmentOrganization'
} & Omit<GenericOrgType, '@type'>

export type AdministrativeAreaV2 = {
  '@type': 'AdministrativeArea'
} & Omit<GenericOrgType, '@type'>

export type GovernmentOrgV2 =
  | CountryV2
  | StateV2
  | CityV2
  | OrganizationV2
  | CorporationV2
  | GovernmentOrganizationV2
  | AdministrativeAreaV2

export const genericOrgContext = <T extends GenericOrgType>(typeName: T['@type']) =>
  createSubjectContext<{ '@type': T['@type'] } & Omit<GenericOrgType, '@type'>>({
    type: typeName,
    base: 'schema',
    properties: {
      name: 'schema',
      address: 'schema',
    },
  })

export const organizationV2Context = genericOrgContext<OrganizationV2>('Organization')

export const countryV2Context = genericOrgContext<OrganizationV2>('Organization')

export const stateV2Context = genericOrgContext<StateV2>('State')

export const cityV2Context = genericOrgContext<CityV2>('City')

export const corporationV2Context = genericOrgContext<CorporationV2>('Corporation')

export const governmentOrganizationV2Context = genericOrgContext<GovernmentOrganizationV2>('GovernmentOrganization')

export const administrativeAreaV2Context = genericOrgContext<AdministrativeAreaV2>('AdministrativeArea')

export const governmentOrgContexts = [
  organizationV2Context,
  countryV2Context,
  stateV2Context,
  cityV2Context,
  corporationV2Context,
  governmentOrganizationV2Context,
  administrativeAreaV2Context,
]
