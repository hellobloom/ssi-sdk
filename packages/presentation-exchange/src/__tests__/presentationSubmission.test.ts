import { RemoveIndex, signVC, signVP } from '@bloomprotocol/vc'
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

import { satisfiesPresentationDefinition } from '../presentationSubmission'
import { PresentationSubmission } from '../types'

import {
  documentLoader,
  getSuiteFor,
  holder1,
  issuer,
  createEmailInputDescriptor,
  createPhoneInputDescriptor,
  createPresentationDefinition,
  createAddressInputDescriptor,
  createGoogleAccountInputDescriptor,
  createTwitterAccountInputDescriptor,
  createSubmissionRequirement,
} from './__fixtures__'

describe('Presentation Submission', () => {
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

  describe('satisfiesPresentationDefinition', () => {
    describe('validates the PresentationSubmission', () => {
      test('when there are no Submission Requirements', async () => {
        const emailInputDescriptor = createEmailInputDescriptor({})
        const phoneInputDescriptor = createPhoneInputDescriptor({})
        const googleInputDescriptor = createGoogleAccountInputDescriptor({})
        const twitterInputDescriptor = createTwitterAccountInputDescriptor({})
        const addressInputDescriptor = createAddressInputDescriptor({})

        const presentationDefinition = createPresentationDefinition({
          input_descriptors: [
            emailInputDescriptor,
            phoneInputDescriptor,
            googleInputDescriptor,
            twitterInputDescriptor,
            addressInputDescriptor,
          ],
        })

        const presentationSubmission = await signVP<PresentationSubmission>({
          unsigned: {
            '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
            type: ['VerifiablePresentation', 'PresentationSubmission'],
            presentation_submission: {
              id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
              definition_id: presentationDefinition.id,
              descriptor_map: [
                {
                  id: emailInputDescriptor.id,
                  format: 'ldp_vc',
                  path: '$.verifiableCredential[0]',
                },
                {
                  id: phoneInputDescriptor.id,
                  format: 'ldp_vc',
                  path: '$.verifiableCredential[1]',
                },
                {
                  id: googleInputDescriptor.id,
                  format: 'ldp_vc',
                  path: '$.verifiableCredential[2]',
                },
                {
                  id: twitterInputDescriptor.id,
                  format: 'ldp_vc',
                  path: '$.verifiableCredential[3]',
                },
                {
                  id: addressInputDescriptor.id,
                  format: 'ldp_vc',
                  path: '$.verifiableCredential[4]',
                },
              ],
            },
            verifiableCredential: [emailVC, phoneVC, googleVC, twitterVC, addressVC],
            holder: holder1.did,
          },
          proofPurposeOptions: {
            challenge: 'challenge',
            domain: 'domain',
          },
          suite: getSuiteFor(holder1),
          documentLoader,
        })

        const result = satisfiesPresentationDefinition({
          presentationDefinition,
          presentationSubmission,
        })

        expect(result.success).toBeTruthy()
      })

      describe('when there are Submission Requirements', () => {
        describe('without nesting', () => {
          test('rule = "all"', async () => {
            const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
            const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
            const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
            const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
            const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

            const presentationDefinition = createPresentationDefinition({
              input_descriptors: [
                emailInputDescriptor,
                phoneInputDescriptor,
                googleInputDescriptor,
                twitterInputDescriptor,
                addressInputDescriptor,
              ],
              submission_requirements: [createSubmissionRequirement({ rule: 'all', from: 'A' })],
            })

            const presentationSubmission = await signVP<PresentationSubmission>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: presentationDefinition.id,
                  descriptor_map: [
                    {
                      id: emailInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: phoneInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [emailVC, phoneVC],
                holder: holder1.did,
              },
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
              suite: getSuiteFor(holder1),
              documentLoader,
            })

            const result = satisfiesPresentationDefinition({
              presentationDefinition,
              presentationSubmission,
            })

            expect(result.success).toBeTruthy()
          })

          describe('rule = "pick"', () => {
            test('count', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [emailInputDescriptor, phoneInputDescriptor],
                submission_requirements: [createSubmissionRequirement({ rule: 'pick', count: 1, from: 'A' })],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: emailInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                    ],
                  },
                  verifiableCredential: [emailVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              expect(result.success).toBeTruthy()
            })

            describe('min', () => {
              test('exact', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [emailInputDescriptor, phoneInputDescriptor, addressInputDescriptor],
                  submission_requirements: [createSubmissionRequirement({ rule: 'pick', min: 2, from: 'A' })],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                      ],
                    },
                    verifiableCredential: [emailVC, addressVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })

              test('more', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [emailInputDescriptor, phoneInputDescriptor, addressInputDescriptor],
                  submission_requirements: [createSubmissionRequirement({ rule: 'pick', min: 2, from: 'A' })],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: phoneInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[2]',
                        },
                      ],
                    },
                    verifiableCredential: [emailVC, phoneVC, addressVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })
            })

            describe('max', () => {
              test('exact', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [emailInputDescriptor, phoneInputDescriptor, addressInputDescriptor],
                  submission_requirements: [createSubmissionRequirement({ rule: 'pick', max: 2, from: 'A' })],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                      ],
                    },
                    verifiableCredential: [emailVC, addressVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })

              test('less', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [emailInputDescriptor, phoneInputDescriptor, addressInputDescriptor],
                  submission_requirements: [createSubmissionRequirement({ rule: 'pick', max: 2, from: 'A' })],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                      ],
                    },
                    verifiableCredential: [emailVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })
            })

            test('min + max', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [emailInputDescriptor, phoneInputDescriptor, addressInputDescriptor, googleInputDescriptor],
                submission_requirements: [createSubmissionRequirement({ rule: 'pick', min: 2, max: 4, from: 'A' })],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: emailInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: addressInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[2]',
                      },
                    ],
                  },
                  verifiableCredential: [emailVC, addressVC, googleVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              expect(result.success).toBeTruthy()
            })
          })

          test('multiple Submission Requirements', async () => {
            const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
            const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
            const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
            const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
            const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

            const presentationDefinition = createPresentationDefinition({
              input_descriptors: [
                emailInputDescriptor,
                phoneInputDescriptor,
                googleInputDescriptor,
                twitterInputDescriptor,
                addressInputDescriptor,
              ],
              submission_requirements: [
                createSubmissionRequirement({ rule: 'all', from: 'A' }),
                createSubmissionRequirement({ rule: 'pick', count: 3, from: 'B' }),
              ],
            })

            const presentationSubmission = await signVP<PresentationSubmission>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: presentationDefinition.id,
                  descriptor_map: [
                    {
                      id: emailInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: phoneInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: googleInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: twitterInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                    {
                      id: addressInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[4]',
                    },
                  ],
                },
                verifiableCredential: [emailVC, phoneVC, googleVC, twitterVC, addressVC],
                holder: holder1.did,
              },
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
              suite: getSuiteFor(holder1),
              documentLoader,
            })

            const result = satisfiesPresentationDefinition({
              presentationDefinition,
              presentationSubmission,
            })

            expect(result.success).toBeTruthy()
          })
        })

        describe('with nesting', () => {
          test('rule = "all"', async () => {
            const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
            const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
            const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
            const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
            const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

            const presentationDefinition = createPresentationDefinition({
              input_descriptors: [
                emailInputDescriptor,
                phoneInputDescriptor,
                googleInputDescriptor,
                twitterInputDescriptor,
                addressInputDescriptor,
              ],
              submission_requirements: [
                createSubmissionRequirement({
                  rule: 'all',
                  from_nested: [
                    {
                      rule: 'pick',
                      count: 2,
                      from: 'A',
                    },
                    {
                      rule: 'pick',
                      count: 1,
                      from: 'B',
                    },
                  ],
                }),
              ],
            })

            const presentationSubmission = await signVP<PresentationSubmission>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: presentationDefinition.id,
                  descriptor_map: [
                    {
                      id: emailInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: phoneInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: addressInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                  ],
                },
                verifiableCredential: [emailVC, phoneVC, addressVC],
                holder: holder1.did,
              },
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
              suite: getSuiteFor(holder1),
              documentLoader,
            })

            const result = satisfiesPresentationDefinition({
              presentationDefinition,
              presentationSubmission,
            })

            expect(result.success).toBeTruthy()
          })

          describe('rule = "pick"', () => {
            test('count', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [
                  createSubmissionRequirement({
                    rule: 'pick',
                    count: 1,
                    from_nested: [
                      {
                        rule: 'pick',
                        count: 2,
                        from: 'A',
                      },
                      {
                        rule: 'pick',
                        count: 1,
                        from: 'B',
                      },
                    ],
                  }),
                ],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: addressInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                    ],
                  },
                  verifiableCredential: [addressVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              expect(result.success).toBeTruthy()
            })

            describe('min', () => {
              test('exact', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
                const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [
                    emailInputDescriptor,
                    phoneInputDescriptor,
                    googleInputDescriptor,
                    twitterInputDescriptor,
                    addressInputDescriptor,
                  ],
                  submission_requirements: [
                    createSubmissionRequirement({
                      rule: 'pick',
                      min: 1,
                      from_nested: [
                        {
                          rule: 'pick',
                          count: 2,
                          from: 'A',
                        },
                        {
                          rule: 'pick',
                          count: 1,
                          from: 'B',
                        },
                      ],
                    }),
                  ],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                      ],
                    },
                    verifiableCredential: [addressVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })

              test('more', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
                const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [
                    emailInputDescriptor,
                    phoneInputDescriptor,
                    googleInputDescriptor,
                    twitterInputDescriptor,
                    addressInputDescriptor,
                  ],
                  submission_requirements: [
                    createSubmissionRequirement({
                      rule: 'pick',
                      min: 1,
                      from_nested: [
                        {
                          rule: 'pick',
                          count: 2,
                          from: 'A',
                        },
                        {
                          rule: 'pick',
                          count: 1,
                          from: 'B',
                        },
                      ],
                    }),
                  ],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: phoneInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[2]',
                        },
                      ],
                    },
                    verifiableCredential: [addressVC, phoneVC, emailVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })
            })

            describe('max', () => {
              test('exact', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
                const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [
                    emailInputDescriptor,
                    phoneInputDescriptor,
                    googleInputDescriptor,
                    twitterInputDescriptor,
                    addressInputDescriptor,
                  ],
                  submission_requirements: [
                    createSubmissionRequirement({
                      rule: 'pick',
                      max: 2,
                      from_nested: [
                        {
                          rule: 'pick',
                          count: 2,
                          from: 'A',
                        },
                        {
                          rule: 'pick',
                          count: 1,
                          from: 'B',
                        },
                      ],
                    }),
                  ],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: addressInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: phoneInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[2]',
                        },
                      ],
                    },
                    verifiableCredential: [addressVC, phoneVC, emailVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })

              test('less', async () => {
                const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
                const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
                const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
                const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
                const addressInputDescriptor = createAddressInputDescriptor({ group: ['B'] })

                const presentationDefinition = createPresentationDefinition({
                  input_descriptors: [
                    emailInputDescriptor,
                    phoneInputDescriptor,
                    googleInputDescriptor,
                    twitterInputDescriptor,
                    addressInputDescriptor,
                  ],
                  submission_requirements: [
                    createSubmissionRequirement({
                      rule: 'pick',
                      max: 2,
                      from_nested: [
                        {
                          rule: 'pick',
                          count: 2,
                          from: 'A',
                        },
                        {
                          rule: 'pick',
                          count: 1,
                          from: 'B',
                        },
                      ],
                    }),
                  ],
                })

                const presentationSubmission = await signVP<PresentationSubmission>({
                  unsigned: {
                    '@context': [
                      'https://www.w3.org/2018/credentials/v1',
                      'https://identity.foundation/presentation-exchange/submission/v1',
                    ],
                    type: ['VerifiablePresentation', 'PresentationSubmission'],
                    presentation_submission: {
                      id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                      definition_id: presentationDefinition.id,
                      descriptor_map: [
                        {
                          id: phoneInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[0]',
                        },
                        {
                          id: emailInputDescriptor.id,
                          format: 'ldp_vc',
                          path: '$.verifiableCredential[1]',
                        },
                      ],
                    },
                    verifiableCredential: [phoneVC, emailVC],
                    holder: holder1.did,
                  },
                  proofPurposeOptions: {
                    challenge: 'challenge',
                    domain: 'domain',
                  },
                  suite: getSuiteFor(holder1),
                  documentLoader,
                })

                const result = satisfiesPresentationDefinition({
                  presentationDefinition,
                  presentationSubmission,
                })

                expect(result.success).toBeTruthy()
              })
            })

            test('min + max', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['C'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [
                  createSubmissionRequirement({
                    rule: 'pick',
                    min: 1,
                    max: 3,
                    from_nested: [
                      {
                        rule: 'pick',
                        count: 2,
                        from: 'A',
                      },
                      {
                        rule: 'pick',
                        count: 1,
                        from: 'B',
                      },
                      {
                        rule: 'all',
                        from: 'C',
                      },
                    ],
                  }),
                ],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: twitterInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                      {
                        id: addressInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[2]',
                      },
                    ],
                  },
                  verifiableCredential: [googleVC, twitterVC, addressVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              expect(result.success).toBeTruthy()
            })
          })
        })
      })
    })

    describe('fails the PresentationSubmission', () => {
      describe('when there are no Submission Requirements', () => {
        test('and not all Input Descriptors are satisfied', async () => {
          const emailInputDescriptor = createEmailInputDescriptor({})
          const phoneInputDescriptor = createPhoneInputDescriptor({})
          const googleInputDescriptor = createGoogleAccountInputDescriptor({})
          const twitterInputDescriptor = createTwitterAccountInputDescriptor({})
          const addressInputDescriptor = createAddressInputDescriptor({})

          const presentationDefinition = createPresentationDefinition({
            input_descriptors: [
              emailInputDescriptor,
              phoneInputDescriptor,
              googleInputDescriptor,
              twitterInputDescriptor,
              addressInputDescriptor,
            ],
          })

          const presentationSubmission = await signVP<PresentationSubmission>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: presentationDefinition.id,
                descriptor_map: [
                  {
                    id: emailInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: phoneInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: googleInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                  {
                    id: twitterInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[3]',
                  },
                ],
              },
              verifiableCredential: [emailVC, phoneVC, googleVC, twitterVC],
              holder: holder1.did,
            },
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
            suite: getSuiteFor(holder1),
            documentLoader,
          })

          const result = satisfiesPresentationDefinition({
            presentationDefinition,
            presentationSubmission,
          })

          if (!result.success) {
            expect(result.error).toMatchInlineSnapshot(`
              Object {
                "missing": Array [
                  "address_input",
                ],
                "type": "inputDescriptors",
              }
            `)
          } else {
            expect(result.success).toBeFalsy()
          }
        })

        test('and there are unknown items in descriptor_map', async () => {
          const emailInputDescriptor = createEmailInputDescriptor({})
          const phoneInputDescriptor = createPhoneInputDescriptor({})
          const googleInputDescriptor = createGoogleAccountInputDescriptor({})
          const twitterInputDescriptor = createTwitterAccountInputDescriptor({})
          const addressInputDescriptor = createAddressInputDescriptor({})

          const presentationDefinition = createPresentationDefinition({
            input_descriptors: [emailInputDescriptor, phoneInputDescriptor, googleInputDescriptor, twitterInputDescriptor],
          })

          const presentationSubmission = await signVP<PresentationSubmission>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: presentationDefinition.id,
                descriptor_map: [
                  {
                    id: emailInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: phoneInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: googleInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                  {
                    id: twitterInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[3]',
                  },
                  {
                    id: addressInputDescriptor.id,
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[4]',
                  },
                ],
              },
              verifiableCredential: [emailVC, phoneVC, googleVC, twitterVC, addressVC],
              holder: holder1.did,
            },
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
            suite: getSuiteFor(holder1),
            documentLoader,
          })

          const result = satisfiesPresentationDefinition({
            presentationDefinition,
            presentationSubmission,
          })

          if (!result.success) {
            expect(result.error).toMatchInlineSnapshot(`
              Object {
                "errors": Array [
                  Object {
                    "error": Object {
                      "type": "notFound",
                    },
                    "id": "address_input",
                  },
                ],
                "type": "descriptorMap",
              }
            `)
          } else {
            expect(result.success).toBeFalsy()
          }
        })
      })

      describe('when there are Submission Requirements', () => {
        describe('without nesting', () => {
          test('rule = "all"', async () => {
            const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
            const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
            const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
            const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
            const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

            const presentationDefinition = createPresentationDefinition({
              input_descriptors: [
                emailInputDescriptor,
                phoneInputDescriptor,
                googleInputDescriptor,
                twitterInputDescriptor,
                addressInputDescriptor,
              ],
              submission_requirements: [createSubmissionRequirement({ rule: 'all', from: 'A' })],
            })

            const presentationSubmission = await signVP<PresentationSubmission>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: presentationDefinition.id,
                  descriptor_map: [
                    {
                      id: emailInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: phoneInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: googleInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: twitterInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [emailVC, phoneVC, googleVC, twitterVC],
                holder: holder1.did,
              },
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
              suite: getSuiteFor(holder1),
              documentLoader,
            })

            const result = satisfiesPresentationDefinition({
              presentationDefinition,
              presentationSubmission,
            })

            if (!result.success) {
              expect(result.error).toMatchInlineSnapshot(`
                Object {
                  "errors": Array [
                    Object {
                      "error": Object {
                        "missing": Array [
                          "address_input",
                        ],
                        "type": "all",
                      },
                      "submissionRequirement": Object {
                        "from": "A",
                        "name": "Submission Requirement",
                        "rule": "all",
                      },
                    },
                  ],
                  "type": "submissionRequirements",
                }
              `)
            } else {
              expect(result.success).toBeFalsy()
            }
          })

          describe('rule = "pick"', () => {
            test('count', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [createSubmissionRequirement({ rule: 'pick', count: 2, from: 'A' })],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                    ],
                  },
                  verifiableCredential: [googleVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "expected": 2,
                          "recieved": 1,
                          "subtype": "count",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "count": 2,
                          "from": "A",
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })

            test('min', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [createSubmissionRequirement({ rule: 'pick', min: 2, from: 'A' })],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                    ],
                  },
                  verifiableCredential: [googleVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "minExpected": 2,
                          "recieved": 1,
                          "subtype": "min",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "from": "A",
                          "min": 2,
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })

            test('max', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['A'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['A'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['A'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [createSubmissionRequirement({ rule: 'pick', max: 2, from: 'A' })],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: twitterInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                      {
                        id: addressInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[2]',
                      },
                    ],
                  },
                  verifiableCredential: [googleVC, twitterVC, addressVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "maxExpected": 2,
                          "recieved": 3,
                          "subtype": "max",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "from": "A",
                          "max": 2,
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })
          })
        })

        describe('with nesting', () => {
          test('rule = "all"', async () => {
            const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
            const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
            const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
            const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
            const addressInputDescriptor = createAddressInputDescriptor({ group: ['C'] })

            const presentationDefinition = createPresentationDefinition({
              input_descriptors: [
                emailInputDescriptor,
                phoneInputDescriptor,
                googleInputDescriptor,
                twitterInputDescriptor,
                addressInputDescriptor,
              ],
              submission_requirements: [
                createSubmissionRequirement({
                  rule: 'all',
                  from_nested: [
                    {
                      rule: 'pick',
                      count: 2,
                      from: 'A',
                    },
                    {
                      rule: 'all',
                      from: 'B',
                    },
                    {
                      rule: 'pick',
                      min: 1,
                      from: 'C',
                    },
                  ],
                }),
              ],
            })

            const presentationSubmission = await signVP<PresentationSubmission>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: presentationDefinition.id,
                  descriptor_map: [
                    {
                      id: phoneInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: emailInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: googleInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: twitterInputDescriptor.id,
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [phoneVC, emailVC, googleVC, twitterVC],
                holder: holder1.did,
              },
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
              suite: getSuiteFor(holder1),
              documentLoader,
            })

            const result = satisfiesPresentationDefinition({
              presentationDefinition,
              presentationSubmission,
            })

            if (!result.success) {
              expect(result.error).toMatchInlineSnapshot(`
                Object {
                  "errors": Array [
                    Object {
                      "error": Object {
                        "missing": Array [
                          Object {
                            "error": Object {
                              "minExpected": 1,
                              "recieved": 0,
                              "subtype": "min",
                              "type": "pick",
                            },
                            "submissionRequirement": Object {
                              "from": "C",
                              "min": 1,
                              "rule": "pick",
                            },
                          },
                        ],
                        "type": "all",
                      },
                      "submissionRequirement": Object {
                        "from_nested": Array [
                          Object {
                            "count": 2,
                            "from": "A",
                            "rule": "pick",
                          },
                          Object {
                            "from": "B",
                            "rule": "all",
                          },
                          Object {
                            "from": "C",
                            "min": 1,
                            "rule": "pick",
                          },
                        ],
                        "name": "Submission Requirement",
                        "rule": "all",
                      },
                    },
                  ],
                  "type": "submissionRequirements",
                }
              `)
            } else {
              expect(result.success).toBeFalsy()
            }
          })

          describe('rule = "pick"', () => {
            test('count', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['C'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [
                  createSubmissionRequirement({
                    rule: 'pick',
                    count: 2,
                    from_nested: [
                      {
                        rule: 'pick',
                        count: 2,
                        from: 'A',
                      },
                      {
                        rule: 'all',
                        from: 'B',
                      },
                      {
                        rule: 'pick',
                        min: 1,
                        from: 'C',
                      },
                    ],
                  }),
                ],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: phoneInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: emailInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                    ],
                  },
                  verifiableCredential: [phoneVC, emailVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "expected": 2,
                          "recieved": 1,
                          "subtype": "count",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "count": 2,
                          "from_nested": Array [
                            Object {
                              "count": 2,
                              "from": "A",
                              "rule": "pick",
                            },
                            Object {
                              "from": "B",
                              "rule": "all",
                            },
                            Object {
                              "from": "C",
                              "min": 1,
                              "rule": "pick",
                            },
                          ],
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })

            test('min', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['C'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [
                  createSubmissionRequirement({
                    rule: 'pick',
                    min: 2,
                    from_nested: [
                      {
                        rule: 'pick',
                        count: 2,
                        from: 'A',
                      },
                      {
                        rule: 'all',
                        from: 'B',
                      },
                      {
                        rule: 'pick',
                        min: 1,
                        from: 'C',
                      },
                    ],
                  }),
                ],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: phoneInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: emailInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                    ],
                  },
                  verifiableCredential: [phoneVC, emailVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "minExpected": 2,
                          "recieved": 1,
                          "subtype": "min",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "from_nested": Array [
                            Object {
                              "count": 2,
                              "from": "A",
                              "rule": "pick",
                            },
                            Object {
                              "from": "B",
                              "rule": "all",
                            },
                            Object {
                              "from": "C",
                              "min": 1,
                              "rule": "pick",
                            },
                          ],
                          "min": 2,
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })

            test('max', async () => {
              const emailInputDescriptor = createEmailInputDescriptor({ group: ['A'] })
              const phoneInputDescriptor = createPhoneInputDescriptor({ group: ['A'] })
              const googleInputDescriptor = createGoogleAccountInputDescriptor({ group: ['B'] })
              const twitterInputDescriptor = createTwitterAccountInputDescriptor({ group: ['B'] })
              const addressInputDescriptor = createAddressInputDescriptor({ group: ['C'] })

              const presentationDefinition = createPresentationDefinition({
                input_descriptors: [
                  emailInputDescriptor,
                  phoneInputDescriptor,
                  googleInputDescriptor,
                  twitterInputDescriptor,
                  addressInputDescriptor,
                ],
                submission_requirements: [
                  createSubmissionRequirement({
                    rule: 'pick',
                    max: 2,
                    from_nested: [
                      {
                        rule: 'pick',
                        count: 2,
                        from: 'A',
                      },
                      {
                        rule: 'all',
                        from: 'B',
                      },
                      {
                        rule: 'pick',
                        min: 1,
                        from: 'C',
                      },
                    ],
                  }),
                ],
              })

              const presentationSubmission = await signVP<PresentationSubmission>({
                unsigned: {
                  '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                  type: ['VerifiablePresentation', 'PresentationSubmission'],
                  presentation_submission: {
                    id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                    definition_id: presentationDefinition.id,
                    descriptor_map: [
                      {
                        id: phoneInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[0]',
                      },
                      {
                        id: emailInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[1]',
                      },
                      {
                        id: googleInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[2]',
                      },
                      {
                        id: twitterInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[3]',
                      },
                      {
                        id: addressInputDescriptor.id,
                        format: 'ldp_vc',
                        path: '$.verifiableCredential[4]',
                      },
                    ],
                  },
                  verifiableCredential: [phoneVC, emailVC, googleVC, twitterVC, addressVC],
                  holder: holder1.did,
                },
                proofPurposeOptions: {
                  challenge: 'challenge',
                  domain: 'domain',
                },
                suite: getSuiteFor(holder1),
                documentLoader,
              })

              const result = satisfiesPresentationDefinition({
                presentationDefinition,
                presentationSubmission,
              })

              if (!result.success) {
                expect(result.error).toMatchInlineSnapshot(`
                  Object {
                    "errors": Array [
                      Object {
                        "error": Object {
                          "maxExpected": 2,
                          "recieved": 3,
                          "subtype": "max",
                          "type": "pick",
                        },
                        "submissionRequirement": Object {
                          "from_nested": Array [
                            Object {
                              "count": 2,
                              "from": "A",
                              "rule": "pick",
                            },
                            Object {
                              "from": "B",
                              "rule": "all",
                            },
                            Object {
                              "from": "C",
                              "min": 1,
                              "rule": "pick",
                            },
                          ],
                          "max": 2,
                          "name": "Submission Requirement",
                          "rule": "pick",
                        },
                      },
                    ],
                    "type": "submissionRequirements",
                  }
                `)
              } else {
                expect(result.success).toBeFalsy()
              }
            })
          })
        })
      })
    })
  })
})
