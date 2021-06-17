import { RemoveIndex, signVC, signVP, VP } from '@bloomprotocol/vc'
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

import { PresentationDefinition, PresentationSubmission } from '../types'

import {
  documentLoader,
  getSuiteFor,
  holder1,
  issuer,
  createAddressInputDescriptor,
  createEmailInputDescriptor,
  createGoogleAccountInputDescriptor,
  createPhoneInputDescriptor,
} from './__fixtures__'

import * as vcs from './__fixtures__/vcs'

describe.skip('gen', () => {
  test('', () => {
    console.log(holder1.did)
    console.log(issuer.did)
  })

  test('gen', async () => {
    const email = await signVC<RemoveIndex<VCEmailPersonV1>>({
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
      suite: getSuiteFor(issuer),
      documentLoader,
    })

    console.log(JSON.stringify(email))

    const phone = await signVC<RemoveIndex<VCPhonePersonV1>>({
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
      suite: getSuiteFor(issuer),
      documentLoader,
    })

    console.log(JSON.stringify(phone))

    const google = await signVC<RemoveIndex<VCAccountPersonV1>>({
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
      suite: getSuiteFor(issuer),
      documentLoader,
    })

    console.log(JSON.stringify(google))

    const address = await signVC<RemoveIndex<VCAddressPersonV1>>({
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
      suite: getSuiteFor(issuer),
      documentLoader,
    })

    console.log(JSON.stringify(address))
  })
})

describe.skip('Presentation Definition', () => {
  describe('Presentation Requirements', () => {
    describe('from', () => {
      test('rule = all', () => {
        const pd: PresentationDefinition = {
          id: '32f54163-7166-48f1-93d8-ff217bdb0653',
          input_descriptors: [
            createEmailInputDescriptor({ group: ['A'] }),
            createPhoneInputDescriptor({ group: ['A'] }),
            createAddressInputDescriptor({ group: ['A'] }),
            createGoogleAccountInputDescriptor({ group: ['A'] }),
          ],
          submission_requirements: [
            {
              name: 'Contact Information',
              purpose: 'We need you to provide all forms of contact information.',
              rule: 'all',
              from: 'A',
            },
          ],
        }

        console.log(JSON.stringify(pd))
      })

      describe('rule = pick', () => {
        test('count', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['A'] }),
              createAddressInputDescriptor({ group: ['A'] }),
              createGoogleAccountInputDescriptor({ group: ['A'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide a single piece of contact information.',
                rule: 'pick',
                count: 1,
                from: 'A',
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('min', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['A'] }),
              createAddressInputDescriptor({ group: ['A'] }),
              createGoogleAccountInputDescriptor({ group: ['A'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide at least two forms of contact.',
                rule: 'pick',
                min: 2,
                from: 'A',
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('max', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['A'] }),
              createAddressInputDescriptor({ group: ['A'] }),
              createGoogleAccountInputDescriptor({ group: ['A'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide no more than 3 forms of contact.',
                rule: 'pick',
                max: 3,
                from: 'A',
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('min + max', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['A'] }),
              createAddressInputDescriptor({ group: ['A'] }),
              createGoogleAccountInputDescriptor({ group: ['A'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide some contact information, at least one but no more than 3.',
                rule: 'pick',
                min: 1,
                max: 3,
                from: 'A',
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })
      })
    })

    describe('from_nested', () => {
      test('rule = all', () => {
        const pd: PresentationDefinition = {
          id: '32f54163-7166-48f1-93d8-ff217bdb0653',
          input_descriptors: [
            createEmailInputDescriptor({ group: ['A'] }),
            createPhoneInputDescriptor({ group: ['A'] }),
            createAddressInputDescriptor({ group: ['B'] }),
            createGoogleAccountInputDescriptor({ group: ['A'] }),
          ],
          submission_requirements: [
            {
              name: 'Contact Information',
              purpose: 'We need you to provide some contact information, one physical and two electronic.',
              rule: 'all',
              from_nested: [
                {
                  name: 'Electronic Contact Information',
                  purpose: 'We need two pieces of electronic contact information.',
                  rule: 'pick',
                  count: 2,
                  from: 'A',
                },
                {
                  name: 'Physical Contact Information',
                  purpose: 'We need one piece of phyical contact information.',
                  rule: 'pick',
                  count: 1,
                  from: 'B',
                },
              ],
            },
          ],
        }

        console.log(JSON.stringify(pd))
      })

      describe('rule = pick', () => {
        test('count', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['A'] }),
              createAddressInputDescriptor({ group: ['B'] }),
              createGoogleAccountInputDescriptor({ group: ['A'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide some contact information, either one physical or two electronic.',
                rule: 'pick',
                count: 1,
                from_nested: [
                  {
                    name: 'Electronic Contact Information',
                    purpose: 'We need two pieces of electronic contact information.',
                    rule: 'pick',
                    count: 2,
                    from: 'A',
                  },
                  {
                    name: 'Physical Contact Information',
                    purpose: 'We need one piece of phyical contact information.',
                    rule: 'pick',
                    count: 1,
                    from: 'B',
                  },
                ],
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('min', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['B'] }),
              createAddressInputDescriptor({ group: ['C'] }),
              createGoogleAccountInputDescriptor({ group: ['D'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide at least two groups of contact information.',
                rule: 'pick',
                min: 2,
                from_nested: [
                  {
                    name: 'Email Address',
                    purpose: 'We need all email information.',
                    rule: 'all',
                    from: 'A',
                  },
                  {
                    name: 'Phone Number',
                    purpose: 'We need all phone number information.',
                    rule: 'all',
                    from: 'B',
                  },
                  {
                    name: 'Address',
                    purpose: 'We need all address information.',
                    rule: 'all',
                    from: 'C',
                  },
                  {
                    name: 'Google Account',
                    purpose: 'We need all google account information.',
                    rule: 'all',
                    from: 'D',
                  },
                ],
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('max', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['B'] }),
              createAddressInputDescriptor({ group: ['C'] }),
              createGoogleAccountInputDescriptor({ group: ['D'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide no more than three groups of contact information.',
                rule: 'pick',
                max: 3,
                from_nested: [
                  {
                    name: 'Email Address',
                    purpose: 'We need all email information.',
                    rule: 'all',
                    from: 'A',
                  },
                  {
                    name: 'Phone Number',
                    purpose: 'We need all phone number information.',
                    rule: 'all',
                    from: 'B',
                  },
                  {
                    name: 'Address',
                    purpose: 'We need all address information.',
                    rule: 'all',
                    from: 'C',
                  },
                  {
                    name: 'Google Account',
                    purpose: 'We need all google account information.',
                    rule: 'all',
                    from: 'D',
                  },
                ],
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })

        test('min + max', () => {
          const pd: PresentationDefinition = {
            id: '32f54163-7166-48f1-93d8-ff217bdb0653',
            input_descriptors: [
              createEmailInputDescriptor({ group: ['A'] }),
              createPhoneInputDescriptor({ group: ['B'] }),
              createAddressInputDescriptor({ group: ['C'] }),
              createGoogleAccountInputDescriptor({ group: ['D'] }),
            ],
            submission_requirements: [
              {
                name: 'Contact Information',
                purpose: 'We need you to provide at least one but no more than three groups of contact information.',
                rule: 'pick',
                min: 1,
                max: 3,
                from_nested: [
                  {
                    name: 'Email Address',
                    purpose: 'We need all email information.',
                    rule: 'all',
                    from: 'A',
                  },
                  {
                    name: 'Phone Number',
                    purpose: 'We need all phone number information.',
                    rule: 'all',
                    from: 'B',
                  },
                  {
                    name: 'Address',
                    purpose: 'We need all address information.',
                    rule: 'all',
                    from: 'C',
                  },
                  {
                    name: 'Google Account',
                    purpose: 'We need all google account information.',
                    rule: 'all',
                    from: 'D',
                  },
                ],
              },
            ],
          }

          console.log(JSON.stringify(pd))
        })
      })
    })
  })
})

describe('Presentation Submission', () => {
  describe('for PD with', () => {
    describe('from', () => {
      describe('rule = all', () => {
        test('valid', async () => {
          const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                descriptor_map: [
                  {
                    id: 'phone_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: 'email_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: 'google_account_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                  {
                    id: 'address_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[3]',
                  },
                ],
              },
              verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
            },
            documentLoader,
            suite: getSuiteFor(holder1),
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          })

          console.log(JSON.stringify(ps))
        })

        test('invalid', async () => {
          const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                descriptor_map: [
                  {
                    id: 'phone_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: 'email_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: 'google_account_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                ],
              },
              verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
            },
            documentLoader,
            suite: getSuiteFor(holder1),
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          })

          console.log(JSON.stringify(ps))
        })
      })

      describe('rule = pick', () => {
        describe('count', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('min', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('max', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: 'address_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('min + max', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: 'address_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })
      })
    })

    describe('from_nested', () => {
      describe('rule = all', () => {
        test('valid', async () => {
          const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                descriptor_map: [
                  {
                    id: 'phone_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: 'email_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: 'address_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                ],
              },
              verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Address],
            },
            documentLoader,
            suite: getSuiteFor(holder1),
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          })

          console.log(JSON.stringify(ps))
        })

        test('invalid', async () => {
          const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
            unsigned: {
              '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
              type: ['VerifiablePresentation', 'PresentationSubmission'],
              id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
              presentation_submission: {
                id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                descriptor_map: [
                  {
                    id: 'phone_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[0]',
                  },
                  {
                    id: 'email_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: 'google_account_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[1]',
                  },
                  {
                    id: 'address_input',
                    format: 'ldp_vc',
                    path: '$.verifiableCredential[2]',
                  },
                ],
              },
              verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
            },
            documentLoader,
            suite: getSuiteFor(holder1),
            proofPurposeOptions: {
              challenge: 'challenge',
              domain: 'domain',
            },
          })

          console.log(JSON.stringify(ps))
        })
      })

      describe('rule = pick', () => {
        describe('count', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'address_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Address],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('min', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('max', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: 'address_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })

        describe('min + max', () => {
          test('valid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })

          test('invalid', async () => {
            const ps = await signVP<VP & { presentation_submission: PresentationSubmission }>({
              unsigned: {
                '@context': ['https://www.w3.org/2018/credentials/v1', 'https://identity.foundation/presentation-exchange/submission/v1'],
                type: ['VerifiablePresentation', 'PresentationSubmission'],
                id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                presentation_submission: {
                  id: 'a30e3b91-fb77-4d22-95fa-871689c322e2',
                  definition_id: '32f54163-7166-48f1-93d8-ff217bdb0653',
                  descriptor_map: [
                    {
                      id: 'phone_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[0]',
                    },
                    {
                      id: 'email_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[1]',
                    },
                    {
                      id: 'google_account_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[2]',
                    },
                    {
                      id: 'address_input',
                      format: 'ldp_vc',
                      path: '$.verifiableCredential[3]',
                    },
                  ],
                },
                verifiableCredential: [vcs.holder1Phone, vcs.holder1Email, vcs.holder1Google, vcs.holder1Address],
              },
              documentLoader,
              suite: getSuiteFor(holder1),
              proofPurposeOptions: {
                challenge: 'challenge',
                domain: 'domain',
              },
            })

            console.log(JSON.stringify(ps))
          })
        })
      })
    })
  })
})
