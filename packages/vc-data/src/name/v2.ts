import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'

export type NamePersonV2 = {
  '@type': 'NamePerson'
} & ({ name: string } | { givenName: string; familyName: string; additionalName?: string })

export type VCNamePersonV2Type = 'NameCredentialPersonV2'

export const getVCNamePersonV2ContextConfig = () => {
  const namePersonContext = createSubjectContext<NamePersonV2>({
    type: 'NamePerson',
    base: 'bloomSchema',
    properties: {
      name: 'schema',
      givenName: 'schema',
      familyName: 'schema',
      additionalName: 'schema',
    },
  })

  return createContextConfig<VCNamePersonV2Type>({
    type: 'NameCredentialPersonV2',
    subjects: [namePersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCNamePersonV2 = CreateVCType<[VCNamePersonV2Type], NamePersonV2>

export const getVCNamePersonV2Context = () => {
  return createContext(getVCNamePersonV2ContextConfig())
}
