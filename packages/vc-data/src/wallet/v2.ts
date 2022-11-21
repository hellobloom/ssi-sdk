import { CreateVCType, createSubjectContext, createContextConfig, createContext } from '../util/v2'

export type CryptographicWallet = {
  '@type': 'CryptographicWallet'
  walletAddress: string
  blockchain?: string
  network?: string
  keyType?: string
}

export type WalletPersonV2 = {
  '@type': 'WalletPerson'
  hasCryptographicWallet: CryptographicWallet
}

export type VCWalletPersonV2Type = 'WalletCredentialPersonV2'

export const getVCWalletPersonV2ContextConfig = () => {
  const cryptoWalletContext = createSubjectContext<CryptographicWallet>({
    type: 'CryptographicWallet',
    base: 'bloomSchema',
    properties: {
      walletAddress: 'bloomSchema',
      blockchain: 'bloomSchema',
      network: 'bloomSchema',
      keyType: 'bloomSchema',
    },
  })

  const walletPersonContext = createSubjectContext<WalletPersonV2>({
    type: 'WalletPerson',
    base: 'bloomSchema',
    properties: {
      hasCryptographicWallet: 'bloomSchema',
    },
  })

  return createContextConfig<VCWalletPersonV2Type>({
    type: 'WalletCredentialPersonV2',
    subjects: [cryptoWalletContext, walletPersonContext],
  })
}

// Export a pre-built VC type and context for easier use

export type VCWalletPersonV2 = CreateVCType<[VCWalletPersonV2Type], WalletPersonV2>

export const getVCWalletPersonV2Context = () => {
  return createContext(getVCWalletPersonV2ContextConfig())
}
