import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'

export type DOBPersonV2 = {
  '@type': 'DOBPerson'
  birthDate: string
}

export type VCDOBPersonV2Type = 'DOBCredentialPersonV2'

export const getVCDOBPersonV2ContextConfig = () => {
  const phonePersonContext = createSubjectContext<DOBPersonV2>({
    type: 'DOBPerson',
    base: 'bloomSchema',
    properties: { birthDate: 'schema' },
  })

  return createContextConfig<VCDOBPersonV2Type>({
    type: 'DOBCredentialPersonV2',
    subjects: [phonePersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCDOBPersonV2 = CreateVCType<[VCDOBPersonV2Type], DOBPersonV2>

export const getVCDOBPersonV2Context = () => {
  return createContext(getVCDOBPersonV2ContextConfig())
}
