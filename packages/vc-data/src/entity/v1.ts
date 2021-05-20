import { OrganizationEV1, getBaseV1ContextEntries } from '../base'
import { CreateThing, ExpandThing, ExtendThing, ExtendableVC, ExtendableVCSubject, createContextEntry, createVCContextEntry } from '../util'

// Lean Entity Related

type LeanEntityV1Mixin = CreateThing<'LeanEntityOrganization'>

export type LeanEntityV1 = ExtendThing<LeanEntityV1Mixin, OrganizationEV1>

export type VCSLeanEntityOrganizationV1 = ExtendableVCSubject<ExpandThing<LeanEntityV1>>

export type VCLeanEntityOrganizationV1 = ExtendableVC<VCSLeanEntityOrganizationV1, 'LeanEntityCredentialOrganizationV1'>

export const getVCLeanEntityOrganizationV1Context = () => {
  const leanEntityEntry = createContextEntry<LeanEntityV1Mixin, OrganizationEV1>({
    type: 'LeanEntityOrganization',
    typeIdBase: 'bloomSchema',
    fields: {},
    vocab: 'schema',
  })

  return createVCContextEntry<VCLeanEntityOrganizationV1>({
    type: 'LeanEntityCredentialOrganizationV1',
    typeIdBase: 'bloomSchema',
    entries: [leanEntityEntry, ...getBaseV1ContextEntries()],
    vocab: 'schema',
  })
}
