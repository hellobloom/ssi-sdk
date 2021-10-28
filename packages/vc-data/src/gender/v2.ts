import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'

export type GenderPersonV2 = {
  '@type': 'GenderPerson'
  gender: string
}

export type VCGenderPersonV2Type = 'GenderCredentialPersonV2'

export const getVCGenderPersonV2ContextConfig = () => {
  const namePersonContext = createSubjectContext<GenderPersonV2>({
    type: 'GenderPerson',
    base: 'bloomSchema',
    properties: {
      gender: 'schema',
    },
  })

  return createContextConfig<VCGenderPersonV2Type>({
    type: 'GenderCredentialPersonV2',
    subjects: [namePersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCGenderPersonV2 = CreateVCType<[VCGenderPersonV2Type], GenderPersonV2>

export const getVCGenderPersonV2Context = () => {
  return createContext(getVCGenderPersonV2ContextConfig())
}
