import { createSubjectContext } from '../util/v2'

export type MonetaryAmountV2 = {
  '@type': 'MonetrayAmount'
  currency?: string
  value?: number | string
  availableValue?: number | string
}

export const monetaryAmountV2Context = createSubjectContext<MonetaryAmountV2>({
  type: 'MonetrayAmount',
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
  addressCountry?: string
  addressLocality?: string
  addressRegion?: string
  postOfficeBoxNumber?: string
  postalCode?: string
  streetAddress?: string
}

export const postalAddressV2Context = createSubjectContext<PostalAddressV2>({
  type: 'PostalAddress',
  base: 'schema',
  properties: {
    addressCountry: 'schema',
    addressLocality: 'schema',
    addressRegion: 'schema',
    postOfficeBoxNumber: 'schema',
    postalCode: 'schema',
    streetAddress: 'schema',
  },
})
