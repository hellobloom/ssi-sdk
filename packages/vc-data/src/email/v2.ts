import { CreateVCType, createSubjectContext, createContextConfig, createContext, OneOrMore } from '../util/v2'

export type EmailPersonV2 = {
  '@type': 'EmailPerson'
  email: OneOrMore<string>
}

export type VCEmailPersonV2Type = 'EmailCredentialPersonV2'

export const getVCEmailPersonV2ContextConfig = () => {
  const phonePersonContext = createSubjectContext<EmailPersonV2>({
    type: 'EmailPerson',
    base: 'bloomSchema',
    properties: { email: 'schema' },
  })

  return createContextConfig<VCEmailPersonV2Type>({
    type: 'EmailCredentialPersonV2',
    subjects: [phonePersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCEmailPersonV2 = CreateVCType<[VCEmailPersonV2Type], EmailPersonV2>

export const getVCEmailPersonV2Context = () => {
  return createContext(getVCEmailPersonV2ContextConfig())
}
