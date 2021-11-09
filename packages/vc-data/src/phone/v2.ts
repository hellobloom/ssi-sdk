import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'

export type PhonePersonV2 = {
  '@type': 'PhonePerson'
  telephone: string
}

export type VCPhonePersonV2Type = 'PhoneCredentialPersonV2'

export const getVCPhonePersonV2ContextConfig = () => {
  const phonePersonContext = createSubjectContext<PhonePersonV2>({
    type: 'PhonePerson',
    base: 'bloomSchema',
    properties: { telephone: 'schema' },
  })

  return createContextConfig<VCPhonePersonV2Type>({
    type: 'PhoneCredentialPersonV2',
    subjects: [phonePersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCPhonePersonV2 = CreateVCType<[VCPhonePersonV2Type], PhonePersonV2>

export const getVCPhonePersonV2Context = () => {
  return createContext(getVCPhonePersonV2ContextConfig())
}
