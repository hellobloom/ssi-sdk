import { R4 } from '@ahryman40k/ts-fhir-types'

import { CreateThing, ExtendableVC, ExtendableVCSubject, createContextEntry, createVCContextEntry, OneOrMore } from '../util/v1'
import { FHIRPatientE } from '../base/v1'

/// ///////////////////////////////////////////////////////////
// Accounts and beneficiaries
/// ///////////////////////////////////////////////////////////

export type CoverageEV1 = CreateThing<
  'Coverage',
  R4.ICoverage & {
    resourceType: 'Coverage'
    identifier: Array<R4.IIdentifier>

    status: string

    // TODO: Replace this with another field
    // Will need to figure out a clean way to support this, we can map one field to another name in conext
    // coverageType => fhir:type
    subscriberId?: string
    payor?: OneOrMore<R4.IReference | R4.IOrganization | R4.IPatient | R4.IRelatedPerson>
    beneficiary?: OneOrMore<R4.IReference | R4.IPatient>
    period?: R4.IPeriod
    type?: R4.ICodeableConcept
    order?: number
    policyHolder?: OneOrMore<R4.IReference | R4.IOrganization | R4.IPatient | R4.IRelatedPerson>
    dependent?: string
    relationship?: R4.ICodeableConcept
    class?: Array<R4.ICoverage_Class>
    network?: string
    costToBeneficiary?: Array<R4.ICoverage_CostToBeneficiary>
    contract?: OneOrMore<R4.IReference | R4.IContract>

    [key: string]: unknown
  }
>

export type VCSInsuranceAccountCoverageV1 = ExtendableVCSubject<CoverageEV1>
export type VCSInsuranceAccountPatientV1 = ExtendableVCSubject<FHIRPatientE>

export type VCSInsuranceAccountPersonV1 = [VCSInsuranceAccountCoverageV1, VCSInsuranceAccountPatientV1, ...VCSInsuranceAccountPatientV1[]]

export type VCInsuranceAccountPersonV1 = ExtendableVC<VCSInsuranceAccountPersonV1, 'InsuranceAccountCredentialPersonV1'>

export const getVCInsuranceAccountPersonV1Context = () => {
  const patientEntry = createContextEntry<FHIRPatientE, R4.IPatient>({
    type: 'Patient',
    typeIdBase: 'fhir',
    fields: {},
    vocab: 'fhir',
  })

  const coverageEntry = createContextEntry<CoverageEV1, R4.ICoverage>({
    type: 'Coverage',
    typeIdBase: 'fhir',
    fields: {},
    vocab: 'fhir',
  })

  return createVCContextEntry<VCInsuranceAccountPersonV1>({
    type: 'InsuranceAccountCredentialPersonV1',
    typeIdBase: 'bloomSchema',
    entries: [patientEntry, coverageEntry],
    vocab: 'fhir',
  })
}
