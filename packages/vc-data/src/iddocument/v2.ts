import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'

export type IDDocumentClassV2 =
  | 'unknown'
  | 'passport'
  | 'visa'
  | 'drivers_license'
  | 'identification_card'
  | 'permit'
  | 'currency'
  | 'residence_document'
  | 'travel_document'
  | 'birth_certificate'
  | 'vehicle_registration'
  | 'other'
  | 'weapon_license'
  | 'tribal_identification'
  | 'voter_identification'
  | 'military'

export type IDDocumentIssuerV2 = {
  '@type': 'IDDocumentIssuer'
  name?: string
  id?: string
}

export type IDDocumentV2 = {
  '@type': 'IDDocument'
  issuer: IDDocumentIssuerV2
  documentType?: string
  issueDate?: string
  issueType?: string
  expirationDate?: string
  classificationMethod?: 'automatic' | 'manual'
  idClass: IDDocumentClassV2
  idClassName?: string
  countryCode?: string
  frontImage?: string
  backImage?: string
  generic?: boolean
  keesingCode?: string
}

export type IDDocumentMatchV2 = {
  '@type': 'IDDocumentMatch'
  isMatch?: string // Recomended 'match' | 'partial_match' | 'no_match'
  score?: number
  transactionId?: string
  criteria?: string // Face, DOB, etc.
}

export type IDDocumentRoleV2 = {
  '@type': 'IDDocumentRole'
  authenticationResult?: string
  tamperResult?: string
  selfieImage?: string

  hasIDDocument: OneOrMore<IDDocumentV2>

  nameMatch?: OneOrMore<IDDocumentMatchV2>
  faceMatch?: OneOrMore<IDDocumentMatchV2>
  birthDateMatch?: OneOrMore<IDDocumentMatchV2>
  issuingCountryMatch?: OneOrMore<IDDocumentMatchV2>
  expirationDateMatch?: OneOrMore<IDDocumentMatchV2>
}

export type IDDocumentPersonV2 = {
  '@type': 'IDDocumentPerson'
  hasIDDocument: OneOrMore<IDDocumentRoleV2>
}

export type VCIDDocumentPersonV2Type = 'IDDocumentCredentialPersonV2'

export const getVCIDDocumentPersonV2ContextConfig = () => {
  const idDocPersonContext = createSubjectContext<IDDocumentPersonV2>({
    type: 'IDDocumentPerson',
    base: 'bloomSchema',
    properties: {
      hasIDDocument: 'bloomSchema',
    },
  })

  const idDocRoleContext = createSubjectContext<IDDocumentRoleV2>({
    type: 'IDDocumentRole',
    base: 'bloomSchema',
    properties: {
      authenticationResult: 'bloomSchema',
      tamperResult: 'bloomSchema',
      selfieImage: 'bloomSchema',
      hasIDDocument: 'bloomSchema',
      faceMatch: 'bloomSchema',
      birthDateMatch: 'bloomSchema',
      issuingCountryMatch: 'bloomSchema',
      expirationDateMatch: 'bloomSchema',
    },
  })

  const idDocMatchContext = createSubjectContext<IDDocumentMatchV2>({
    type: 'IDDocumentMatch',
    base: 'bloomSchema',
    properties: {
      transactionId: 'bloomSchema',
      isMatch: 'bloomSchema',
      score: 'bloomSchema',
      criteria: 'bloomSchema',
    },
  })

  const idDocContext = createSubjectContext<IDDocumentV2>({
    type: 'IDDocument',
    base: 'bloomSchema',
    properties: {
      issuer: 'bloomSchema',
      documentType: 'bloomSchema',
      issueDate: 'bloomSchema',
      issueType: 'bloomSchema',
      expirationDate: 'bloomSchema',
      classificationMethod: 'bloomSchema',
      idClass: 'bloomSchema',
      idClassName: 'bloomSchema',
      countryCode: 'bloomSchema',
      frontImage: 'bloomSchema',
      backImage: 'bloomSchema',
      generic: 'bloomSchema',
      keesingCode: 'bloomSchema',
    },
  })

  const idDocumentIssuer = createSubjectContext<IDDocumentIssuerV2>({
    type: 'IDDocumentIssuer',
    base: 'bloomSchema',
    properties: {
      id: 'bloomSchema',
      name: 'schema',
    },
  })

  return createContextConfig<VCIDDocumentPersonV2Type>({
    type: 'IDDocumentCredentialPersonV2',
    subjects: [idDocPersonContext, idDocRoleContext, idDocMatchContext, idDocContext, idDocumentIssuer],
  })
}

// Export a pre-built VC type and context for easier use

export type VCIDDocumentPersonV2 = CreateVCType<[VCIDDocumentPersonV2Type], IDDocumentPersonV2>

export const getVCIDDocumentPersonV2Context = () => {
  return createContext(getVCIDDocumentPersonV2ContextConfig())
}
