export const holder1Email = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      EmailCredentialPersonV1: {
        '@id': 'https://schema.bloom.co/EmailCredentialPersonV1',
        '@context': { '@version': 1.1, '@protected': true },
      },
      data: {
        '@id': 'https://schema.bloom.co/data',
        '@context': [
          null,
          {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            EmailPerson: {
              '@id': 'https://schema.bloom.co/EmailPerson',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/', email: 'https://schema.org/email' },
            },
            PersonE: {
              '@id': 'https://schema.bloom.co/PersonE',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/' },
            },
            OrganizationE: {
              '@id': 'https://schema.bloom.co/OrganizationE',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                hasCredential: 'https://schema.org/hasCredential',
                industry: 'https://schema.bloom.co/industry',
                identifiers: 'https://schema.bloom.co/identifiers',
              },
            },
            Credential: {
              '@id': 'https://schema.bloom.co/Credential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                dateRevoked: 'https://schema.bloom.co/dateRevoked',
                recognizedBy: 'https://schema.bloom.co/recognizedBy',
              },
            },
            OrganizationalCredential: {
              '@id': 'https://schema.bloom.co/OrganizationalCredential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                credentialCategory: 'https://schema.bloom.co/credentialCategory',
                organizationType: 'https://schema.bloom.co/organizationType',
                goodStanding: 'https://schema.bloom.co/goodStanding',
                active: 'https://schema.bloom.co/active',
                primaryJurisdiction: 'https://schema.bloom.co/primaryJurisdiction',
                identifier: 'https://schema.org/identifier',
              },
            },
          },
        ],
      },
    },
  ],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'EmailCredentialPersonV1'],
  issuanceDate: '2021-06-10T00:00:00.000Z',
  issuer:
    'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15WmpjMU0yRmxaakF5TVdVNU5UQmpNemMyWmpFd1lUVXlObUZsWmpBeFpXWTJZems1WmpReE9HWTFZMlprT1RZNU5XVXlZbVprTkRrMk5UWXpORFE1SWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESmtOVE0yWXpSbFpHTmxOakZqTlRabVpEZ3pZVEZtT1RRMllXRmhNRFpqWmpZM1pHRTRPRE14WVdWaU1HVTNaRGhsWWprd1l6RXlabVJpT1dObU5UaGhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiRjc5V1lobGtSd2RQQWNsdDFoXzlId21DZ2d5V0Y5aDc1cnN0Y3p4aV9vNE5mN1ItMmdOU0Y0VWhfR3lEVUw4SWFVWWFKdmw3a0FqNng3YlVrWndTdEEifQ',
  holder: { id: 'did:elem:EiB1B3mppm8QayQhNOKCMrbcGSiIbYh3E_svxaP0vGUKYA' },
  credentialSubject: { data: { '@type': ['Person', 'PersonE', 'EmailPerson'], email: 'bob.belcher@gmail.com' } },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-06-10T00:00:00Z',
    verificationMethod: 'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ#primary',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..4HYl4hH0ptZ5qQJrDnNn2Jd6UAh_ih0w2RcurcUMBRAj6JVKoka77fj7vsSboc-H3AjSa1mpgDiL049mLT_l6w',
  },
}

export const holder1Phone = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      PhoneCredentialPersonV1: {
        '@id': 'https://schema.bloom.co/PhoneCredentialPersonV1',
        '@context': { '@version': 1.1, '@protected': true },
      },
      data: {
        '@id': 'https://schema.bloom.co/data',
        '@context': [
          null,
          {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            PhonePerson: {
              '@id': 'https://schema.bloom.co/PhonePerson',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                telephone: 'https://schema.org/telephone',
              },
            },
            PersonE: {
              '@id': 'https://schema.bloom.co/PersonE',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/' },
            },
            OrganizationE: {
              '@id': 'https://schema.bloom.co/OrganizationE',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                hasCredential: 'https://schema.org/hasCredential',
                industry: 'https://schema.bloom.co/industry',
                identifiers: 'https://schema.bloom.co/identifiers',
              },
            },
            Credential: {
              '@id': 'https://schema.bloom.co/Credential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                dateRevoked: 'https://schema.bloom.co/dateRevoked',
                recognizedBy: 'https://schema.bloom.co/recognizedBy',
              },
            },
            OrganizationalCredential: {
              '@id': 'https://schema.bloom.co/OrganizationalCredential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                credentialCategory: 'https://schema.bloom.co/credentialCategory',
                organizationType: 'https://schema.bloom.co/organizationType',
                goodStanding: 'https://schema.bloom.co/goodStanding',
                active: 'https://schema.bloom.co/active',
                primaryJurisdiction: 'https://schema.bloom.co/primaryJurisdiction',
                identifier: 'https://schema.org/identifier',
              },
            },
          },
        ],
      },
    },
  ],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'PhoneCredentialPersonV1'],
  issuanceDate: '2021-06-10T00:00:00.000Z',
  issuer:
    'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15WmpjMU0yRmxaakF5TVdVNU5UQmpNemMyWmpFd1lUVXlObUZsWmpBeFpXWTJZems1WmpReE9HWTFZMlprT1RZNU5XVXlZbVprTkRrMk5UWXpORFE1SWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESmtOVE0yWXpSbFpHTmxOakZqTlRabVpEZ3pZVEZtT1RRMllXRmhNRFpqWmpZM1pHRTRPRE14WVdWaU1HVTNaRGhsWWprd1l6RXlabVJpT1dObU5UaGhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiRjc5V1lobGtSd2RQQWNsdDFoXzlId21DZ2d5V0Y5aDc1cnN0Y3p4aV9vNE5mN1ItMmdOU0Y0VWhfR3lEVUw4SWFVWWFKdmw3a0FqNng3YlVrWndTdEEifQ',
  holder: { id: 'did:elem:EiB1B3mppm8QayQhNOKCMrbcGSiIbYh3E_svxaP0vGUKYA' },
  credentialSubject: { data: { '@type': ['Person', 'PersonE', 'PhonePerson'], telephone: '+1 555 555 1234' } },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-06-10T00:00:00Z',
    verificationMethod: 'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ#primary',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..VlXYM6ZjN3icLSjFbbvlvwOwjgjO56ojDYaYKVoYjRoEwxtRZmqyF84X0HLJGWVOX-TdVIVwp6OTC5040C_u5g',
  },
}

export const holder1Google = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      AccountCredentialPersonV1: {
        '@id': 'https://schema.bloom.co/AccountCredentialPersonV1',
        '@context': { '@version': 1.1, '@protected': true },
      },
      data: {
        '@id': 'https://schema.bloom.co/data',
        '@context': [
          null,
          {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            AccountPerson: {
              '@id': 'https://schema.bloom.co/AccountPerson',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                hasAccount: 'https://schema.bloom.co/hasAccount',
              },
            },
            AccountStatement: {
              '@id': 'https://schema.bloom.co/AccountStatement',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                statementDate: 'https://schema.bloom.co/statementDate',
                dueDate: 'https://schema.bloom.co/dueDate',
              },
            },
            AccountPayment: {
              '@id': 'https://schema.bloom.co/AccountPayment',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                paymentDate: 'https://schema.bloom.co/paymentDate',
                amount: 'https://schema.bloom.co/amount',
              },
            },
            ServiceAccountStatement: {
              '@id': 'https://schema.bloom.co/ServiceAccountStatement',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                balanceAdjustments: 'https://schema.bloom.co/balanceAdjustments',
                totalBill: 'https://schema.bloom.co/totalBill',
                serviceAddress: 'https://schema.bloom.co/serviceAddress',
                billingAddress: 'https://schema.bloom.co/billingAddress',
              },
            },
            BankAccountTransaction: {
              '@id': 'https://schema.bloom.co/BankAccountTransaction',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                transactionType: 'https://schema.bloom.co/transactionType',
                value: 'https://schema.bloom.co/value',
                memo: 'https://schema.bloom.co/memo',
              },
            },
            BankAccountTransactionGroup: {
              '@id': 'https://schema.bloom.co/BankAccountTransactionGroup',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                identifier: 'https://schema.bloom.co/identifier',
                startDate: 'https://schema.bloom.co/startDate',
                endDate: 'https://schema.bloom.co/endDate',
                cashflowCategory: 'https://schema.bloom.co/cashflowCategory',
                cashflowSubcategory: 'https://schema.bloom.co/cashflowSubcategory',
                payrollAgency: 'https://schema.bloom.co/payrollAgency',
                memo: 'https://schema.bloom.co/memo',
                length: 'https://schema.bloom.co/length',
                payee: 'https://schema.bloom.co/payee',
                payer: 'https://schema.bloom.co/payer',
                rank: 'https://schema.bloom.co/rank',
                frequency: 'https://schema.bloom.co/frequency',
                periodicity: 'https://schema.bloom.co/periodicity',
                valueStddev: 'https://schema.bloom.co/valueStddev',
                valueTotal: 'https://schema.bloom.co/valueTotal',
                valueMean: 'https://schema.bloom.co/valueMean',
                valueMedian: 'https://schema.bloom.co/valueMedian',
                transactions: 'https://schema.bloom.co/transactions',
              },
            },
            OrganizationAccount: {
              '@id': 'https://schema.bloom.co/OrganizationAccount',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                serviceTypes: 'https://schema.bloom.co/serviceTypes',
                nationality: 'https://schema.bloom.co/nationality',
              },
            },
            Account: {
              '@id': 'https://schema.bloom.co/Account',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': null,
                name: 'https://schema.org/name',
                identifier: 'https://schema.bloom.co/identifier',
                description: 'https://schema.bloom.co/description',
                organization: 'https://schema.bloom.co/organization',
                startDate: 'https://schema.bloom.co/startDate',
                endDate: 'https://schema.bloom.co/endDate',
                accountType: 'https://schema.bloom.co/accountType',
                accountTypeConfidence: 'https://schema.bloom.co/accountTypeConfidence',
                accountStatements: 'https://schema.bloom.co/accountStatements',
                accountPayments: 'https://schema.bloom.co/accountPayments',
                hasValue: 'https://schema.bloom.co/hasValue',
                bankAccountCategory: 'https://schema.bloom.co/bankAccountCategory',
                hasIncome: 'https://schema.bloom.co/hasIncome',
                hasExpense: 'https://schema.bloom.co/hasExpense',
                hasTransactions: 'https://schema.bloom.co/hasTransactions',
              },
            },
            PersonE: {
              '@id': 'https://schema.bloom.co/PersonE',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/' },
            },
            OrganizationE: {
              '@id': 'https://schema.bloom.co/OrganizationE',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                hasCredential: 'https://schema.org/hasCredential',
                industry: 'https://schema.bloom.co/industry',
                identifiers: 'https://schema.bloom.co/identifiers',
              },
            },
            Credential: {
              '@id': 'https://schema.bloom.co/Credential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                dateRevoked: 'https://schema.bloom.co/dateRevoked',
                recognizedBy: 'https://schema.bloom.co/recognizedBy',
              },
            },
            OrganizationalCredential: {
              '@id': 'https://schema.bloom.co/OrganizationalCredential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                credentialCategory: 'https://schema.bloom.co/credentialCategory',
                organizationType: 'https://schema.bloom.co/organizationType',
                goodStanding: 'https://schema.bloom.co/goodStanding',
                active: 'https://schema.bloom.co/active',
                primaryJurisdiction: 'https://schema.bloom.co/primaryJurisdiction',
                identifier: 'https://schema.org/identifier',
              },
            },
          },
        ],
      },
    },
  ],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'AccountCredentialPersonV1'],
  issuanceDate: '2021-06-10T00:00:00.000Z',
  issuer:
    'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15WmpjMU0yRmxaakF5TVdVNU5UQmpNemMyWmpFd1lUVXlObUZsWmpBeFpXWTJZems1WmpReE9HWTFZMlprT1RZNU5XVXlZbVprTkRrMk5UWXpORFE1SWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESmtOVE0yWXpSbFpHTmxOakZqTlRabVpEZ3pZVEZtT1RRMllXRmhNRFpqWmpZM1pHRTRPRE14WVdWaU1HVTNaRGhsWWprd1l6RXlabVJpT1dObU5UaGhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiRjc5V1lobGtSd2RQQWNsdDFoXzlId21DZ2d5V0Y5aDc1cnN0Y3p4aV9vNE5mN1ItMmdOU0Y0VWhfR3lEVUw4SWFVWWFKdmw3a0FqNng3YlVrWndTdEEifQ',
  holder: { id: 'did:elem:EiB1B3mppm8QayQhNOKCMrbcGSiIbYh3E_svxaP0vGUKYA' },
  credentialSubject: {
    data: {
      '@type': ['Person', 'PersonE', 'AccountPerson'],
      email: 'bob.belcher@gmail.com',
      hasAccount: {
        '@type': 'Account',
        accountType: 'website',
        organization: { '@type': ['Organization', 'OrganizationE', 'OrganizationAccount'], name: 'Google' },
      },
    },
  },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-06-10T00:00:00Z',
    verificationMethod: 'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ#primary',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..z8vfrfx5NyT1BPDuPm_L5eA69De0V7pVu0dVm8zFxP8Ute5D9gsWPW9i9Nawz77xrFmgry6HHF1KJmxW7Qpjsg',
  },
}

export const holder1Address = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    {
      AddressCredentialPersonV1: {
        '@id': 'https://schema.bloom.co/AddressCredentialPersonV1',
        '@context': { '@version': 1.1, '@protected': true },
      },
      data: {
        '@id': 'https://schema.bloom.co/data',
        '@context': [
          null,
          {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            AddressPerson: {
              '@id': 'https://schema.bloom.co/AddressPerson',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/', address: 'https://schema.org/address' },
            },
            PersonE: {
              '@id': 'https://schema.bloom.co/PersonE',
              '@context': { '@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/' },
            },
            OrganizationE: {
              '@id': 'https://schema.bloom.co/OrganizationE',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                hasCredential: 'https://schema.org/hasCredential',
                industry: 'https://schema.bloom.co/industry',
                identifiers: 'https://schema.bloom.co/identifiers',
              },
            },
            Credential: {
              '@id': 'https://schema.bloom.co/Credential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                dateRevoked: 'https://schema.bloom.co/dateRevoked',
                recognizedBy: 'https://schema.bloom.co/recognizedBy',
              },
            },
            OrganizationalCredential: {
              '@id': 'https://schema.bloom.co/OrganizationalCredential',
              '@context': {
                '@version': 1.1,
                '@protected': true,
                '@vocab': 'https://schema.org/',
                credentialCategory: 'https://schema.bloom.co/credentialCategory',
                organizationType: 'https://schema.bloom.co/organizationType',
                goodStanding: 'https://schema.bloom.co/goodStanding',
                active: 'https://schema.bloom.co/active',
                primaryJurisdiction: 'https://schema.bloom.co/primaryJurisdiction',
                identifier: 'https://schema.org/identifier',
              },
            },
          },
        ],
      },
    },
  ],
  id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  type: ['VerifiableCredential', 'AddressCredentialPersonV1'],
  issuanceDate: '2021-06-10T00:00:00.000Z',
  issuer:
    'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ;elem:initial-state=eyJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0poYzNObGNuUnBiMjVOWlhSb2IyUWlPbHNpSTNCeWFXMWhjbmtpWFN3aVlYVjBhR1Z1ZEdsallYUnBiMjRpT2xzaUkzQnlhVzFoY25raVhTd2ljSFZpYkdsalMyVjVJanBiZXlKcFpDSTZJaU53Y21sdFlYSjVJaXdpY0hWaWJHbGpTMlY1U0dWNElqb2lNRE15WmpjMU0yRmxaakF5TVdVNU5UQmpNemMyWmpFd1lUVXlObUZsWmpBeFpXWTJZems1WmpReE9HWTFZMlprT1RZNU5XVXlZbVprTkRrMk5UWXpORFE1SWl3aWRIbHdaU0k2SWxObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRnaUxDSjFjMkZuWlNJNkluTnBaMjVwYm1jaWZTeDdJbWxrSWpvaUkzSmxZMjkyWlhKNUlpd2ljSFZpYkdsalMyVjVTR1Y0SWpvaU1ESmtOVE0yWXpSbFpHTmxOakZqTlRabVpEZ3pZVEZtT1RRMllXRmhNRFpqWmpZM1pHRTRPRE14WVdWaU1HVTNaRGhsWWprd1l6RXlabVJpT1dObU5UaGhJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKMWMyRm5aU0k2SW5KbFkyOTJaWEo1SW4xZGZRIiwicHJvdGVjdGVkIjoiZXlKaGJHY2lPaUpGVXpJMU5rc2lMQ0pyYVdRaU9pSWpjSEpwYldGeWVTSXNJbTl3WlhKaGRHbHZiaUk2SW1OeVpXRjBaU0o5Iiwic2lnbmF0dXJlIjoiRjc5V1lobGtSd2RQQWNsdDFoXzlId21DZ2d5V0Y5aDc1cnN0Y3p4aV9vNE5mN1ItMmdOU0Y0VWhfR3lEVUw4SWFVWWFKdmw3a0FqNng3YlVrWndTdEEifQ',
  holder: { id: 'did:elem:EiB1B3mppm8QayQhNOKCMrbcGSiIbYh3E_svxaP0vGUKYA' },
  credentialSubject: {
    data: {
      '@type': ['Person', 'PersonE', 'AddressPerson'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ocean City',
        addressRegion: 'NJ',
        postalCode: '08226',
        streetAddress: '123 Ocean Avenue',
      },
    },
  },
  proof: {
    type: 'EcdsaSecp256k1Signature2019',
    created: '2021-06-10T00:00:00Z',
    verificationMethod: 'did:elem:EiAdFnno8RORaOGhfvpsbNj5vvCx8NYB4aOQBKGYO-K4eQ#primary',
    proofPurpose: 'assertionMethod',
    jws: 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..ye9BoxdblP4cGTRGKS28UxPvE209OrrMXGJIosggKoQkkq-_w3shB-fhKHHZWjm0ElSZVKiSKWMSNSORfTbTmw',
  },
}
