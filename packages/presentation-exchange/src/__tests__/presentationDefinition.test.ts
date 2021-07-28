import { RemoveIndex, signVC } from '@bloomprotocol/vc'
import {
  VCEmailPersonV1,
  getVCEmailPersonV1Context,
  VCPhonePersonV1,
  getVCPhonePersonV1Context,
  VCAccountPersonV1,
  getVCAccountPersonV1Context,
  VCAddressPersonV1,
  getVCAddressPersonV1Context,
} from '@bloomprotocol/vc-data'

import {
  findVCsForInputDescriptor,
  findVCsForSubmissionRequirement,
  isFindVCsForSubmissionRequirementFromNestedResult,
  isFindVCsForSubmissionRequirementFromResult,
} from '../presentationDefinition'

import {
  documentLoader,
  getSuiteFor,
  holder1,
  issuer,
  createEmailInputDescriptor,
  createAccountInputDescriptor,
  createSubmissionRequirement,
  createPhoneInputDescriptor,
} from './__fixtures__'

describe('Presentation Definition', () => {
  let emailVC: VCEmailPersonV1
  let phoneVC: VCPhonePersonV1
  let googleVC: VCAccountPersonV1
  let twitterVC: VCAccountPersonV1
  let addressVC: VCAddressPersonV1

  beforeAll(async () => {
    const suite = getSuiteFor(issuer)

    emailVC = await signVC<RemoveIndex<VCEmailPersonV1>>({
      unsigned: {
        '@context': ['https://www.w3.org/2018/credentials/v1', getVCEmailPersonV1Context()],
        id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        type: ['VerifiableCredential', 'EmailCredentialPersonV1'],
        issuanceDate: '2021-06-10T00:00:00.000Z',
        issuer: issuer.did,
        holder: {
          id: holder1.didDocument.id,
        },
        credentialSubject: {
          data: {
            '@type': ['Person', 'PersonE', 'EmailPerson'],
            email: 'bob.belcher@gmail.com',
          },
        },
      },
      suite,
      documentLoader,
    })

    phoneVC = await signVC<RemoveIndex<VCPhonePersonV1>>({
      unsigned: {
        '@context': ['https://www.w3.org/2018/credentials/v1', getVCPhonePersonV1Context()],
        id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        type: ['VerifiableCredential', 'PhoneCredentialPersonV1'],
        issuanceDate: '2021-06-10T00:00:00.000Z',
        issuer: issuer.did,
        holder: {
          id: holder1.didDocument.id,
        },
        credentialSubject: {
          data: {
            '@type': ['Person', 'PersonE', 'PhonePerson'],
            telephone: '+1 555 555 1234',
          },
        },
      },
      suite,
      documentLoader,
    })

    googleVC = await signVC<RemoveIndex<VCAccountPersonV1>>({
      unsigned: {
        '@context': ['https://www.w3.org/2018/credentials/v1', getVCAccountPersonV1Context()],
        id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        type: ['VerifiableCredential', 'AccountCredentialPersonV1'],
        issuanceDate: '2021-06-10T00:00:00.000Z',
        issuer: issuer.did,
        holder: {
          id: holder1.didDocument.id,
        },
        credentialSubject: {
          data: {
            '@type': ['Person', 'PersonE', 'AccountPerson'],
            email: 'bob.belcher@gmail.com',
            hasAccount: {
              '@type': 'Account',
              accountType: 'website',
              organization: {
                '@type': ['Organization', 'OrganizationE', 'OrganizationAccount'],
                name: 'Google',
              },
            },
          },
        },
      },
      suite,
      documentLoader,
    })

    twitterVC = await signVC<RemoveIndex<VCAccountPersonV1>>({
      unsigned: {
        '@context': ['https://www.w3.org/2018/credentials/v1', getVCAccountPersonV1Context()],
        id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        type: ['VerifiableCredential', 'AccountCredentialPersonV1'],
        issuanceDate: '2021-06-10T00:00:00.000Z',
        issuer: issuer.did,
        holder: {
          id: holder1.didDocument.id,
        },
        credentialSubject: {
          data: {
            '@type': ['Person', 'PersonE', 'AccountPerson'],
            name: 'Bob Belcher',
            hasAccount: {
              '@type': 'Account',
              identifier: '1234',
              name: ['Bob Belcher', 'BobBelcher'],
              accountType: 'website',
              organization: {
                '@type': ['Organization', 'OrganizationE', 'OrganizationAccount'],
                name: 'Twitter',
              },
            },
          },
        },
      },
      suite,
      documentLoader,
    })

    addressVC = await signVC<RemoveIndex<VCAddressPersonV1>>({
      unsigned: {
        '@context': ['https://www.w3.org/2018/credentials/v1', getVCAddressPersonV1Context()],
        id: 'urn:uuid:9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        type: ['VerifiableCredential', 'AddressCredentialPersonV1'],
        issuanceDate: '2021-06-10T00:00:00.000Z',
        issuer: issuer.did,
        holder: {
          id: holder1.didDocument.id,
        },
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
      },
      suite,
      documentLoader,
    })
  })

  describe('findVCsForInputDescriptor', () => {
    test('finds a single VC that matches the InputDescriptor', () => {
      const result = findVCsForInputDescriptor(createEmailInputDescriptor({}), [emailVC, phoneVC, twitterVC, googleVC, addressVC])

      expect(result).toHaveLength(1)
    })

    test('finds multiple VCs that matches the InputDescriptor', () => {
      const result = findVCsForInputDescriptor(createAccountInputDescriptor({}), [twitterVC, googleVC, emailVC, phoneVC, addressVC])

      expect(result).toHaveLength(2)
    })

    test('finds 0 VCs that matches the InputDescriptor', () => {
      const result = findVCsForInputDescriptor(createEmailInputDescriptor({}), [phoneVC, twitterVC, googleVC, addressVC])

      expect(result).toHaveLength(0)
    })
  })

  describe('findVCsForSubmissionRequirement', () => {
    test('finds the Input Descriptor and VCs that satisfy the Submission Requirement', () => {
      const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
      const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })

      const result = findVCsForSubmissionRequirement({
        submissionRequirement: createSubmissionRequirement({ rule: 'all', from: 'A' }),
        inputDescriptors: [phoneInputDescriptor, emailInputDescriptor],
        vcs: [emailVC, phoneVC, twitterVC],
      })

      if (isFindVCsForSubmissionRequirementFromResult(result)) {
        expect(result.satisfiedBy).toHaveLength(2)

        expect(result.satisfiedBy[0].vcs).toHaveLength(1)
        expect(result.satisfiedBy[0].vcs[0]).toEqual(phoneVC)
        expect(result.satisfiedBy[0].inputDescriptor).toEqual(phoneInputDescriptor)

        expect(result.satisfiedBy[1].vcs).toHaveLength(1)
        expect(result.satisfiedBy[1].vcs[0]).toEqual(emailVC)
        expect(result.satisfiedBy[1].inputDescriptor).toEqual(emailInputDescriptor)
      } else {
        expect(isFindVCsForSubmissionRequirementFromResult(result)).toBeTruthy()
      }
    })

    test('finds the Input Descriptor and VCs that satisfy the nested Submission Requirement', () => {
      const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
      const emailInputDescriptor = createEmailInputDescriptor({ group: ['B'] })

      const result = findVCsForSubmissionRequirement({
        submissionRequirement: createSubmissionRequirement({
          rule: 'all',
          from_nested: [
            {
              rule: 'pick',
              count: 1,
              from: 'A',
            },
            {
              rule: 'pick',
              count: 1,
              from: 'B',
            },
          ],
        }),
        inputDescriptors: [phoneInputDescriptor, emailInputDescriptor],
        vcs: [emailVC, phoneVC, twitterVC],
      })

      if (isFindVCsForSubmissionRequirementFromNestedResult(result)) {
        expect(result.satisfiedBy).toHaveLength(2)

        const firstNestedResult = result.satisfiedBy[0]

        if (isFindVCsForSubmissionRequirementFromResult(firstNestedResult)) {
          expect(firstNestedResult.satisfiedBy).toHaveLength(1)
          expect(firstNestedResult.satisfiedBy[0].vcs).toHaveLength(1)
          expect(firstNestedResult.satisfiedBy[0].vcs[0]).toEqual(phoneVC)
          expect(firstNestedResult.satisfiedBy[0].inputDescriptor).toEqual(phoneInputDescriptor)
        } else {
          expect(isFindVCsForSubmissionRequirementFromResult(firstNestedResult)).toBeTruthy()
        }

        const secondNestedResult = result.satisfiedBy[1]

        if (isFindVCsForSubmissionRequirementFromResult(secondNestedResult)) {
          expect(secondNestedResult.satisfiedBy).toHaveLength(1)
          expect(secondNestedResult.satisfiedBy[0].vcs).toHaveLength(1)
          expect(secondNestedResult.satisfiedBy[0].vcs[0]).toEqual(emailVC)
          expect(secondNestedResult.satisfiedBy[0].inputDescriptor).toEqual(emailInputDescriptor)
        } else {
          expect(isFindVCsForSubmissionRequirementFromResult(secondNestedResult)).toBeTruthy()
        }
      } else {
        expect(isFindVCsForSubmissionRequirementFromNestedResult(result)).toBeTruthy()
      }
    })
  })
})
