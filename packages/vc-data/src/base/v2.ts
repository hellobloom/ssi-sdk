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

export type PostalAddressV2 = {
  '@type': 'PostalAddress'
  addressCountry?: string
  addressLocality?: string
  addressRegion?: string
  postOfficeBoxNumber?: string
  postalCode?: string
  streetAddress?: string
}

export const postalAddresscV2Context = createSubjectContext<PostalAddressV2>({
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
