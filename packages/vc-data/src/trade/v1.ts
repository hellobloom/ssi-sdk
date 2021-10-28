import { PersonEV1, OrganizationEV1, getBaseV1ContextEntries } from '../base/v1'
import {
  CreateThing,
  ExtendThing,
  ExtendableVC,
  ExtendableVCSubject,
  ExpandThing,
  OneOrMore,
  createContextEntry,
  createVCContextEntry,
  CreateExpandedThing,
} from '../util/v1'

// Helper Types

type ProductEV1Mixn = CreateThing<
  'ProductE',
  {
    hasValue?: OneOrMore<CreateExpandedThing<'MonetaryAmount'>>
  }
>

export type ProductEV1 = ExtendThing<ProductEV1Mixn, CreateThing<'Product'>>

type PortV1Mixin = CreateThing<'Port'>

export type PortV1 = ExtendThing<PortV1Mixin, CreateThing<'Place'>>

export type ShipmentV1 = CreateThing<
  'Shipment',
  {
    hasValue?: OneOrMore<CreateExpandedThing<'MonetaryAmount'>>
    shippedOn?: string // Date ISO 8601
    originAddress?: CreateExpandedThing<'PostalAddress'>
    deliveryAddress?: CreateExpandedThing<'PostalAddress'>
    orderedItem?: OneOrMore<ExpandThing<ProductEV1>>
  }
>

export type CargoReceiptV1 = CreateThing<
  'CargoReceipt',
  {
    shipper?: ExpandThing<PersonEV1> | ExpandThing<OrganizationEV1>
    recipient?: ExpandThing<PersonEV1> | ExpandThing<OrganizationEV1>
    shipment?: ShipmentV1
    portLoading?: ExpandThing<PortV1>
    portUnloading?: ExpandThing<PortV1>
  }
>

const getHelperContextEntries = () => {
  const productEEntry = createContextEntry<ProductEV1Mixn>({
    type: 'ProductE',
    typeIdBase: 'bloomSchema',
    fields: {
      hasValue: 'bloomSchema',
    },
    vocab: 'schema',
  })

  const portEntry = createContextEntry<PortV1Mixin>({
    type: 'Port',
    typeIdBase: 'bloomSchema',
    fields: {},
    vocab: 'schema',
  })

  const shipmentEntry = createContextEntry<ShipmentV1>({
    type: 'Shipment',
    typeIdBase: 'bloomSchema',
    fields: {
      hasValue: 'bloomSchema',
      shippedOn: 'bloomSchema',
      originAddress: 'bloomSchema',
      deliveryAddress: 'bloomSchema',
      orderedItem: 'bloomSchema',
    },
  })

  const cargoReceiptEntry = createContextEntry<CargoReceiptV1>({
    type: 'CargoReceipt',
    typeIdBase: 'bloomSchema',
    fields: {
      shipper: 'bloomSchema',
      recipient: 'bloomSchema',
      shipment: 'bloomSchema',
      portLoading: 'bloomSchema',
      portUnloading: 'bloomSchema',
    },
  })

  return [productEEntry, portEntry, shipmentEntry, cargoReceiptEntry]
}

// Cargo Receipt Related

export type VCSCargoReceiptV1 = ExtendableVCSubject<ExpandThing<CargoReceiptV1>>

export type VCCargoReceiptV1 = ExtendableVC<VCSCargoReceiptV1, 'CargoReceiptCredentialV1'>

export const getVCCargoReceiptV1Context = () => {
  return createVCContextEntry<VCCargoReceiptV1>({
    type: 'CargoReceiptCredentialV1',
    typeIdBase: 'bloomSchema',
    entries: [...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}

// Bill Of Lading Related

type BillOfLadingV1Mixin = CreateThing<'BillOfLading'>

export type BillOfLadingV1 = ExtendThing<BillOfLadingV1Mixin, CargoReceiptV1>

export type VCSBillOfLadingV1 = ExtendableVCSubject<ExpandThing<BillOfLadingV1>>

export type VCBillOfLadingV1 = ExtendableVC<VCSBillOfLadingV1, 'BillOfLadingCredentialV1'>

export const getVCBillOfLadingV1Context = () => {
  const billOfLadingEntry = createContextEntry<BillOfLadingV1Mixin, CargoReceiptV1>({
    type: 'BillOfLading',
    typeIdBase: 'bloomSchema',
    fields: {},
  })

  return createVCContextEntry<VCBillOfLadingV1>({
    type: 'BillOfLadingCredentialV1',
    typeIdBase: 'bloomSchema',
    entries: [billOfLadingEntry, ...getHelperContextEntries(), ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
